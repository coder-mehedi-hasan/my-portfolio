import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import matter from 'gray-matter';
import { fileURLToPath } from 'node:url';
import { contentTypes } from '../lib/content/schema.mjs';
import { createEntry, updateEntry, getEntry, listEntries, featuredEntries, readPublishedMarkdown, validateContent, groupSkills, entryIssues, readTemplate, deleteEntry, entryExists } from '../lib/content/store.mjs';

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

test('createEntry unset drops values inherited from the template', t => {
  const root = fixture(t);
  const template = readTemplate('projects', root);
  const required = { title: 'Clean', sub_title: 'A subtitle', date: '2026-01-15' };
  const optional = Object.keys(template.data).filter(key => !(key in required) && key !== 'status');
  assert.ok(optional.includes('description') && optional.includes('tools'), 'the template should carry sample optionals');
  const file = createEntry('projects', 'clean', required, 'Just this body.\n', root, { unset: optional });
  const parsed = matter(fs.readFileSync(file, 'utf8'));
  for (const key of optional) {
    assert.equal(key in parsed.data, false, `${key} should not be inherited from the template`);
  }
  assert.equal(parsed.data.title, 'Clean');
  assert.equal(parsed.content, 'Just this body.\n');
});

test('createEntry without unset still seeds the template', t => {
  const root = fixture(t);
  const file = createEntry('projects', 'seeded', { title: 'Seeded' }, undefined, root);
  const { data } = matter(fs.readFileSync(file, 'utf8'));
  assert.equal(data.title, 'Seeded');
  assert.equal(data.status, 'draft', 'new entries always start as drafts');
  assert.equal(data.date, new Date().toISOString().slice(0, 10), 'the template date is replaced by today');
  for (const [key, value] of Object.entries(readTemplate('projects', root).data)) {
    if (key === 'title' || key === 'status' || key === 'date') continue;
    assert.deepEqual(data[key], value, `${key} should come from the template`);
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
  assert.throws(() => updateEntry('experiences', 'role', { start_date: '' }, { root }), /start_date/);
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

test('entryExists answers the question a form asks before saving', t => {
  const root = fixture(t);
  assert.equal(entryExists('projects', 'fresh', { root }), false);
  createEntry('projects', 'fresh', {}, undefined, root);
  assert.equal(entryExists('projects', 'fresh', { root }), true);
  deleteEntry('projects', 'fresh', root);
  assert.equal(entryExists('projects', 'fresh', { root }), false);
  // An unusable slug is a validation problem, so it never reads as a collision.
  for (const slug of ['../secret', '_template', 'Mixed Case', '']) {
    assert.equal(entryExists('projects', slug, { root }), false, slug);
  }
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


test('entryIssues reports every field at once and keys body problems under "body"', t => {
  const root = fixture(t);
  const template = readTemplate('projects', root);
  const issues = entryIssues('projects', { ...template.data, date: '2026-02-30', live_url: 'javascript:alert(1)' }, '');
  assert.match(issues.date, /date: Use a real calendar date/);
  assert.match(issues.live_url, /live_url/);
  assert.equal(issues.body, undefined, 'a draft needs no body');

  const published = entryIssues('projects', { ...template.data, date: '2026-01-01', status: 'published' }, '   \n');
  assert.match(published.body, /Published entries need a Markdown body/);

  const ok = entryIssues('projects', { ...template.data, date: '2026-01-01', status: 'published' }, 'Body text.');
  assert.deepEqual(ok, {});

  const skill = entryIssues('skills', { ...readTemplate('skills', root).data, status: 'published' }, '');
  assert.equal(skill.body, undefined, 'skills carry no body requirement');
  assert.ok(Object.keys(entryIssues('experiences', { start_date: '' }, 'Body')).includes('start_date'));
});

test('readTemplate exposes seed frontmatter, and deleteEntry removes only the target', t => {
  const root = fixture(t);
  const template = readTemplate('blogs', root);
  assert.ok(Object.keys(template.data).length, 'templates ship seed frontmatter');
  assert.ok(template.content.trim(), 'templates ship a starter body');
  assert.throws(() => readTemplate('__proto__', root), /Unknown content type/);

  const keep = createEntry('blogs', 'keep', { title: 'Keep' }, 'Keep body\n', root);
  const drop = createEntry('blogs', 'drop', { title: 'Drop' }, 'Drop body\n', root);
  assert.equal(deleteEntry('blogs', 'drop', root), drop);
  assert.equal(fs.existsSync(drop), false);
  assert.equal(fs.readFileSync(keep, 'utf8').includes('Keep body'), true);
  assert.throws(() => deleteEntry('blogs', 'drop', root), /No blogs entry named/);
  assert.throws(() => deleteEntry('blogs', '../escape', root));
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
