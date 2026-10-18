// Prepare the known original release without changing any Git refs or working files.
import { execFileSync } from 'node:child_process';
import { mkdir, writeFile, readFile, readdir } from 'node:fs/promises';
import { dirname } from 'node:path';
import { createHash } from 'node:crypto';
import assert from 'node:assert/strict';
const baseline = '91a68d2bcaa9e42aace2a28a5176858a720e3f08';
const target = '.artifacts/rollback';
const names = execFileSync(
  'git',
  [
    'ls-tree',
    '-r',
    '--name-only',
    baseline,
    '--',
    'index.html',
    'styles.css',
    'script.js',
    'assets',
    'CNAME',
  ],
  { encoding: 'utf8' },
)
  .trim()
  .split('\n');
const hashes = {};
for (const name of names) {
  assert(
    /^(index\.html|styles\.css|script\.js|CNAME|assets\/[a-zA-Z0-9._-]+)$/.test(
      name,
    ),
  );
  const bytes = execFileSync('git', ['show', `${baseline}:${name}`]);
  await mkdir(dirname(`${target}/${name}`), { recursive: true });
  await writeFile(`${target}/${name}`, bytes);
  assert.deepEqual(await readFile(`${target}/${name}`), bytes);
  hashes[name] = createHash('sha256').update(bytes).digest('hex');
}
await writeFile(`${target}/.nojekyll`, '');
const actual = (await readdir(target, { recursive: true, withFileTypes: true }))
  .filter((entry) => !entry.isDirectory())
  .map((entry) => `${entry.parentPath}/${entry.name}`.slice(target.length + 1))
  .sort();
assert.deepEqual(
  actual,
  [...names, '.nojekyll'].sort(),
  'Unexpected files in rollback artifact; inspect before publishing.',
);
const html = await readFile(`${target}/index.html`, 'utf8');
for (const id of ['top', 'about', 'scope', 'licensing', 'contact'])
  assert(html.includes(`id="${id}"`));
assert(html.includes('mailto:licensing@arkiveglobal.com'));
assert.equal(
  (await readFile(`${target}/CNAME`, 'utf8')).trim(),
  'arkiveglobal.com',
);
await writeFile(
  '.artifacts/rollback-manifest.json',
  JSON.stringify({ baseline, files: hashes }, null, 2),
);
console.log(
  `Rollback prepared and byte-verified: ${names.length} original files + .nojekyll. No Git refs changed.`,
);
