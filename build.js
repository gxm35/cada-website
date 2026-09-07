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
   older text until the next build. Netlify also runs this on every deploy, so
   editing content.js on GitHub is enough on its own.

   Running it twice in a row produces the same file. If that ever stops being
   true, something is appending rather than replacing, and the file will grow on
   every build until somebody notices.
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

// Replace the whole <main> block in one go, rather than each <section>
// individually. The generated markup contains its own <section> tags, so a
// per-section match cannot tell where one page's markup ends and the next
// begins: it stops early, leaves the tail behind, and the file grows on every
// build. Rewriting the entire block is idempotent by construction.
const MAIN = /<main>[\s\S]*<\/main>/;
if (!MAIN.test(html)) {
  console.error('Build failed: index.html has no <main> block to write into.');
  process.exit(1);
}

const sections = Object.keys(pages).map(name => {
  // Home is the page a visitor lands on, so it carries is-active in the baked
  // markup. Without it, someone with JavaScript disabled would see nothing.
  const cls = name === 'home' ? 'page is-active' : 'page';
  return '    <section class="' + cls + '" id="page-' + name + '">' +
         pages[name]() + '</section>';
});

html = html.replace(MAIN, '<main>\n' + sections.join('\n') + '\n  </main>');

fs.writeFileSync(path.join(dir, 'index.html'), html);
console.log('Built ' + sections.length + ' pages into index.html (' +
            Math.round(html.length / 1024) + ' KB).');
