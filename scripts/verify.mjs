import {readFile,readdir} from 'node:fs/promises';
import assert from 'node:assert/strict';
import {load} from 'cheerio';
const base='https://arkiveglobal.com';
async function files(dir){const entries=await readdir(dir,{withFileTypes:true});return (await Promise.all(entries.map(e=>e.isDirectory()?files(`${dir}/${e.name}`):`${dir}/${e.name}`))).flat();}
const all=await files('dist');const html=all.filter(f=>f.endsWith('.html'));let links=0;
const expected=['','about/','technology/','licensing/','contact/','privacy/'];
for(const lang of ['en','ko'])for(const path of expected)assert(all.includes(`dist/${lang}/${path}index.html`),`Missing ${lang}/${path}`);
const titles=new Set();
for(const file of html){const $=load(await readFile(file,'utf8'));assert.equal($('h1').length,1,`${file}: one h1`);assert($('html').attr('lang'));assert($('meta[name=description]').attr('content'));assert($('link[rel=canonical]').attr('href')?.startsWith(base));assert($('meta[property="og:image"]').attr('content'));assert.equal($('form').length,0,'No fake form');assert(!$('script[src^="http"]').length,'No third-party scripts');
 if(file.includes('/en/')||file.includes('/ko/')){assert(!titles.has($('title').text()),`Duplicate title ${file}`);titles.add($('title').text());assert.equal($('link[hreflang]').length,3);const lang=file.includes('/ko/')?'ko':'en';assert.equal($('html').attr('lang'),lang);assert.equal($('link[rel=canonical]').attr('href'),base+file.replace(/^dist/,'').replace(/index.html$/,''));}
 $('script[type="application/ld+json"]').each((_,e)=>JSON.parse($(e).text()));
 for(const el of $('a[href],img[src],script[src],link[href]').toArray()){const attr=el.tagName==='img'||el.tagName==='script'?'src':'href';const link=$(el).attr(attr);if(!link||/^(mailto:|https?:|data:)/.test(link))continue;links++;const url=new URL(link,base+file.replace(/^dist/,'').replace(/index.html$/,''));let target=`dist${url.pathname}`;if(url.pathname.endsWith('/'))target+='index.html';assert(all.includes(target),`${file}: broken link ${link}`);if(url.hash&&target.endsWith('.html')){const targetDoc=load(await readFile(target,'utf8'));const id=decodeURIComponent(url.hash.slice(1));assert(targetDoc('[id]').toArray().some(e=>targetDoc(e).attr('id')===id),`Missing ${id} in ${target}`);}}
}
const root=load(await readFile('dist/index.html','utf8'));for(const id of ['top','about','scope','licensing','contact'])assert.equal(root(`[id=${id}]`).length,1);
const sitemap=load(await readFile('dist/sitemap.xml','utf8'),{xmlMode:true});assert.equal(sitemap('url').length,12);for(const loc of sitemap('loc').toArray()){const path=sitemap(loc).text().replace(base,'');assert(all.includes(`dist${path}index.html`));}
assert.equal((await readFile('dist/CNAME','utf8')).trim(),'arkiveglobal.com');assert(all.includes('dist/.nojekyll'));assert((await readFile('dist/robots.txt','utf8')).includes(`${base}/sitemap.xml`));assert(!all.some(f=>f.includes('/legacy/')));
console.log(`PASS: ${html.length} HTML pages, 12 localized URLs, ${links} local links/assets, sitemap, metadata, legacy anchors and CNAME.`);
