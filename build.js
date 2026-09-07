/* ============================================================================
   BUILD STEP
   ----------------------------------------------------------------------------
   Run this after editing content.js:

       node build.js

   WHAT IT IS FOR. The site builds its pages in JavaScript in the browser. Google
   mostly copes with that, but link preview scrapers do not run JavaScript at
   all, so pasting the address into Slack, LinkedIn or a text message would show
   an empty page. This bakes the same markup the browser would produce straight
   into index.html, so anything reading the raw HTML sees real content.

   WHAT HAPPENS IF YOU FORGET TO RUN IT. Nothing breaks for visitors. The
   browser still rebuilds every page from content.js on load, so people see your
   edit immediately. Only scrapers and search engines would be looking at the
   older text until the next build.
   ========================================================================== */

const fs = require('fs');
const path = require('path');
const vm = require('vm');

const dir = __dirname;
const read = (f) => fs.readFileSync(path.join(dir, f), 'utf8');

// content.js and render.js are plain browser scripts. Run them in a sandbox with
// no `document` and no `module`, which is exactly how they detect that they are
// not in a browser: the page mounting and the CommonJS export both switch off.
const sandbox = {};
vm.createContext(sandbox);
vm.runInContext(
  read('content.js') + '\n' + read('render.js') + '\n;globalThis.__PAGES = PAGE_HTML;',
  sandbox,
  { filename: 'cada-site' }
);

const pages = sandbox.__PAGES;
if (!pages) {
  console.error('Build failed: render.js did not expose PAGE_HTML.');
  process.exit(1);
}

let html = read('index.html');
let count = 0;

for (const name of Object.keys(pages)) {
  const body = pages[name]();
  // Home is the page a visitor lands on, so it carries is-active in the baked
  // markup. Without it, someone with JavaScript disabled would see nothing.
  const cls = name === 'home' ? 'page is-active' : 'page';
  const re = new RegExp(
    '<section class="[^"]*" id="page-' + name + '">[\\s\\S]*?</section>\\s*(?=<section|</main>)'
  );
  if (!re.test(html)) {
    console.error('Build failed: could not find the shell for page "' + name + '" in index.html.');
    process.exit(1);
  }
  html = html.replace(re, '<section class="' + cls + '" id="page-' + name + '">' + body + '</section>\n  ');
  count++;
}

fs.writeFileSync(path.join(dir, 'index.html'), html);
console.log('Built ' + count + ' pages into index.html (' + Math.round(html.length / 1024) + ' KB).');
