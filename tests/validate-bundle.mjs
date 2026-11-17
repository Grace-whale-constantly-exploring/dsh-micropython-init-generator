import { existsSync, readFileSync } from 'node:fs';

const root = new URL('../', import.meta.url);
const pkg = JSON.parse(readFileSync(new URL('package.json', root), 'utf8'));
const files = ['index.js', 'client.js', 'cordis.patch.yml', 'locale/en.json', 'locale/zh.json', 'icon.svg', 'README.md'];
for (const file of files) {
  if (!existsSync(new URL(file, root))) throw new Error('missing ' + file);
}
if (pkg.dsh.bundle.patch !== './cordis.patch.yml') throw new Error('bundle patch');
if (pkg.dsh.client.platform !== 'web') throw new Error('client platform');
if (!pkg.dsh.client.inject.includes('@deepseek-ai/dsh-client-ui-layout')) throw new Error('client activation order');
for (const key of ['.', './client', './locale/*.json', './icon']) {
  if (!pkg.exports[key]) throw new Error('missing export ' + key);
}
const patch = readFileSync(new URL('cordis.patch.yml', root), 'utf8');
if (!patch.includes(`name: '${pkg.name}'`)) throw new Error('patch package name');
const client = readFileSync(new URL('client.js', root), 'utf8');
if (!client.includes(`id: '${pkg.name}'`)) throw new Error('client module id');
if (/@deepseek-ai\/dsh-client/.test(client)) throw new Error('imports a Harness client package');
const host = readFileSync(new URL('index.js', root), 'utf8');
if (!host.includes("inject = ['llm', 'webServer']")) throw new Error('host llm/webServer injection');
if (!host.includes("'/micropython/generate'")) throw new Error('host route path');
if (!client.includes("'/micropython/generate'")) throw new Error('client route path');
if (!host.includes('ctx.llm.stream')) throw new Error('host must call ctx.llm.stream');
if (/\blocalCode\b/.test(client)) throw new Error('client must not send generated code to the model');
const en = JSON.parse(readFileSync(new URL('locale/en.json', root), 'utf8'));
const zh = JSON.parse(readFileSync(new URL('locale/zh.json', root), 'utf8'));
if (!en.meta.title || !en.meta.description || !zh.meta.title || !zh.meta.description) throw new Error('locale meta');
console.log('manifest validation passed');
console.log('exports:', Object.keys(pkg.exports).join(', '));
