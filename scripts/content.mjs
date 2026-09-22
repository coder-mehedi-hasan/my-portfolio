import fs from 'node:fs';
import { parseArgs } from 'node:util';
import { createEntry, updateEntry, validateContent, listEntries } from '../lib/content/store.mjs';

const usage = `Markdown content management

npm run content -- new <type> <slug> [--data '{"title":"My title"}'] [--body-file path.md]
npm run content -- update <type> <slug> --data '{"status":"published"}' [--body-file path.md] [--unset end_date]
npm run content -- list <type>
npm run content:validate

Types: projects, experiences, skills, blogs
New entries use content/<type>/_template.md and start as drafts.
Updates preserve the body unless --body-file is provided. --unset accepts comma-separated fields.
Use --data-file path.json instead of --data for large updates. No command commits or publishes a deployment.`;

try {
  const { values, positionals } = parseArgs({
    allowPositionals: true,
    options: { data: { type: 'string' }, 'data-file': { type: 'string' }, 'body-file': { type: 'string' }, unset: { type: 'string' }, help: { type: 'boolean' } },
  });
  const [command, type, slug] = positionals;
  if (values.help || !command) console.log(usage);
  else if (command === 'validate') {
    if (positionals.length !== 1 || Object.keys(values).length) throw new Error('validate takes no arguments');
    const { count, errors } = validateContent();
    if (errors.length) throw new Error(errors.join('\n'));
    console.log(`Validated ${count} content entries.`);
  } else if (command === 'list') {
    if (positionals.length !== 2 || Object.keys(values).length) throw new Error('Usage: list <type>');
    console.table(listEntries(type, { includeDrafts: true }).map(entry => ({ slug: entry.slug, status: entry.status, featured: entry.featured })));
  } else if (command === 'new' || command === 'update') {
    if (positionals.length !== 3) throw new Error(`Usage: ${command} <type> <slug>`);
    if (values.data && values['data-file']) throw new Error('Choose --data or --data-file, not both');
    if (command === 'new' && values.unset) throw new Error('--unset is only available for update');
    const data = JSON.parse(values.data ?? (values['data-file'] ? fs.readFileSync(values['data-file'], 'utf8') : '{}'));
    if (!data || Array.isArray(data) || typeof data !== 'object') throw new Error('Data must be a JSON object');
    const body = values['body-file'] ? fs.readFileSync(values['body-file'], 'utf8') : undefined;
    if (command === 'update' && !Object.keys(data).length && body === undefined && !values.unset) throw new Error('Provide --data, --data-file, --body-file, or --unset');
    const file = command === 'new' ? createEntry(type, slug, data, body) : updateEntry(type, slug, data, { body, unset: values.unset?.split(',').map(key => key.trim()) });
    console.log(`${command === 'new' ? 'Created' : 'Updated'} ${file}`);
  } else throw new Error(`Unknown command "${command}". Use --help.`);
} catch (error) {
  console.error(error.message);
  process.exitCode = 1;
}
