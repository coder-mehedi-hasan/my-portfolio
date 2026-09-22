import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { contentTypes } from '../lib/content/schema.mjs';
import { createEntry, updateEntry, getEntry, listEntries, featuredEntries, readPublishedMarkdown, validateContent, groupSkills } from '../lib/content/store.mjs';

const repository = fileURLToPath(new URL('../', import.meta.url));
function fixture(t) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'portfolio-content-'));
  for (const type of contentTypes) {
    fs.mkdirSync(path.join(root, type));
    fs.copyFileSync(path.join(repository, 'content', type, '_template.md'), path.join(root, type, '_template.md'));
  }
  t.after(() => fs.rmSync(root, { recursive: true, force: true }));
  return root;
}

test('each template creates a valid draft; publishing exposes it', t => {
  const root = fixture(t);
  for (const type of contentTypes) {
    createEntry(type, 'example', {}, undefined, root);
    assert.equal(getEntry(type, 'example', { root }), null);
    assert.equal(readPublishedMarkdown(type, 'example', root), null);
    assert.equal(listEntries(type, { root }).length, 0);
    assert.equal(listEntries(type, { root, includeDrafts: true }).length, 1);
    updateEntry(type, 'example', { status: 'published' }, { root });
    assert.equal(getEntry(type, 'example', { root }).status, 'published');
    assert.ok(readPublishedMarkdown(type, 'example', root));
    assert.equal(listEntries(type, { root }).length, 1);
  }
});

test('create refuses overwrite; invalid update preserves original bytes', t => {
  const root = fixture(t);
  const file = createEntry('projects', 'sample', {}, 'Original body\n', root);
  const original = fs.readFileSync(file, 'utf8');
  assert.throws(() => createEntry('projects', 'sample', {}, undefined, root), /EEXIST/);
  for (const patch of [{ date: '2026-02-30' }, { status: 'live' }, { live_url: 'javascript:alert(1)' }, { unknown_field: true }, { sort_index: -1 }]) {
    assert.throws(() => updateEntry('projects', 'sample', patch, { root }));
    assert.equal(fs.readFileSync(file, 'utf8'), original);
  }
});

test('updates preserve the body and support optional field removal', t => {
  const root = fixture(t);
  createEntry('experiences', 'role', { start_date: '2024-01-01', end_date: '2025-01-01' }, 'Keep this body.\n', root);
  updateEntry('experiences', 'role', { company_name: 'Updated company' }, { root, unset: ['end_date'] });
  const entry = getEntry('experiences', 'role', { root, includeDrafts: true });
  assert.equal(entry.company_name, 'Updated company');
  assert.equal(entry.end_date, undefined);
  assert.match(entry.body, /Keep this body/);
  assert.throws(() => updateEntry('experiences', 'role', { end_date: '2023-01-01' }, { root }), /End date/);
  assert.throws(() => updateEntry('experiences', 'role', {}, { root, unset: ['company_name'] }), /company_name/);
});

test('drafts stay hidden from featured lists and URLs; ordering is deterministic', t => {
  const root = fixture(t);
  createEntry('projects', 'second', { status: 'published', featured: true, featured_order: 2 }, undefined, root);
  createEntry('projects', 'first', { status: 'published', featured: true, featured_order: 1 }, undefined, root);
  createEntry('projects', 'hidden', { featured: true, featured_order: 0 }, undefined, root);
  assert.deepEqual(featuredEntries('projects', 2, { root }).map(entry => entry.slug), ['first', 'second']);
  assert.equal(getEntry('projects', 'hidden', { root }), null);
  assert.equal(readPublishedMarkdown('projects', 'hidden', root), null);
  createEntry('blogs', 'older', { status: 'published', date: '2024-01-01' }, undefined, root);
  createEntry('blogs', 'newer', { status: 'published', date: '2025-01-01' }, undefined, root);
  assert.deepEqual(listEntries('blogs', { root }).map(entry => entry.slug), ['newer', 'older']);
});

test('invalid paths, reserved slugs and unknown types are rejected', t => {
  const root = fixture(t);
  for (const slug of ['../secret', '_template', 'Mixed Case', 'a/b', '']) {
    assert.equal(getEntry('blogs', slug, { root }), null);
    assert.throws(() => createEntry('blogs', slug, {}, undefined, root));
  }
  assert.throws(() => listEntries('__proto__', { root }), /Unknown content type/);
});

test('validation aggregates file-specific errors including drafts', t => {
  const root = fixture(t);
  createEntry('skills', 'valid', {}, undefined, root);
  fs.writeFileSync(path.join(root, 'skills', 'bad.md'), '---\ntitle: Bad\nsub_title: 42\n---\n');
  fs.writeFileSync(path.join(root, 'blogs', 'empty.md'), '---\ntitle: Empty\nexcerpt: Empty\ndate: 2026-01-01\n---\n');
  const result = validateContent(root);
  assert.equal(result.count, 1);
  assert.equal(result.errors.length, 2);
  assert.ok(result.errors.some(error => error.includes('bad.md') && error.includes('sub_title')));
  assert.ok(result.errors.some(error => error.includes('empty.md') && error.includes('Markdown body')));
});

test('CLI creates, updates, lists and validates files in a temporary workspace', t => {
  const root = fixture(t);
  const cwd = fs.mkdtempSync(path.join(os.tmpdir(), 'portfolio-cli-'));
  t.after(() => fs.rmSync(cwd, { recursive: true, force: true }));
  fs.renameSync(root, path.join(cwd, 'content'));
  const run = args => spawnSync(process.execPath, [path.join(repository, 'scripts/content.mjs'), ...args], { cwd, encoding: 'utf8' });
  assert.equal(run(['new', 'blogs', 'cli-post', '--data', '{"title":"CLI post"}']).status, 0);
  assert.equal(run(['new', 'blogs', 'cli-post']).status, 1);
  assert.equal(run(['update', 'blogs', 'cli-post', '--data', '{"status":"published"}']).status, 0);
  assert.match(run(['list', 'blogs']).stdout, /published/);
  assert.equal(run(['validate']).status, 0);
  assert.equal(run(['update', 'blogs', 'cli-post', '--data', '{"date":"bad"}']).status, 1);
  assert.equal(run(['new', 'blogs', '../escape']).status, 1);
});


test('skills retain individual bodies and group by category without duplication', t => {
  const root = fixture(t);
  createEntry('skills', 'react', { title: 'React', category: 'Frontend', status: 'published', sort_index: 1 }, '## Notes\n\nMy React notes.', root);
  createEntry('skills', 'nextjs', { title: 'Next.js', category: 'Frontend', status: 'published', sort_index: 2 }, '', root);
  createEntry('skills', 'nodejs', { title: 'Node.js', category: 'Backend', status: 'published', sort_index: 3 }, '', root);
  createEntry('skills', 'draft-skill', { category: 'Frontend' }, undefined, root);
  const groups = groupSkills(listEntries('skills', { root }));
  assert.deepEqual(groups.map(group => [group.category, group.skills.map(skill => skill.slug)]), [
    ['Frontend', ['react', 'nextjs']], ['Backend', ['nodejs']],
  ]);
  assert.match(getEntry('skills', 'react', { root }).body, /My React notes/);
  assert.throws(() => updateEntry('skills', 'react', {}, { root, unset: ['category'] }), /category/);
  updateEntry('skills', 'react', { category: 'Web development' }, { root });
  assert.equal(getEntry('skills', 'react', { root }).category, 'Web development');
});
