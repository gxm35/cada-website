/* ============================================================================
   CADA WEBSITE: RENDERER
   ----------------------------------------------------------------------------
   You should not need to edit this file to change any words on the site.
   All copy lives in content.js.

   What this file does, in order:
     1. Small helpers for building HTML safely.
     2. Builds each of the six pages from CONTENT.
     3. Shows one page at a time based on the address bar (#home, #team, ...).
     4. Draws the animated field behind the cover.
   ========================================================================== */

/* ============================================================================
   WEB3FORMS ACCESS KEY
   ----------------------------------------------------------------------------
   This is set and live. Messages from the contact form go to the inbox this key
   was registered to, which is claremontaerospacedefense@gmail.com.

   The destination is fixed by that registration, not by anything in this
   codebase. To change where messages land, register a new key at
   https://web3forms.com against the new inbox and replace the value below.

   The key is not a secret. It sits in the page source by design and grants only
   the right to send a message to the one inbox it belongs to. It cannot read
   mail, and it cannot be pointed anywhere else by whoever finds it.
   ========================================================================== */

const WEB3FORMS_ACCESS_KEY = "9fc8c095-1725-4640-b188-29fb64968483";

const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";

/* --- 1. Helpers ----------------------------------------------------------- */

// Escapes text so that an apostrophe or an angle bracket in a bio cannot
// break the page. Everything from content.js goes through this.
function esc(s) {
  return String(s).replace(/[&<>"']/g, function (c) {
    return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
  });
}

// Renders text, but wraps any [TO CONFIRM] marker in a visible chip so the
// gaps are obvious on the page instead of reading as finished copy.
function txt(s) {
  return esc(s).replace(/\[TO CONFIRM\]/g, '<span class="todo">TO CONFIRM</span>');
}

let C = (typeof CONTENT !== 'undefined') ? CONTENT : null;
const HAS_DOM = (typeof document !== 'undefined');
const el = (id) => document.getElementById(id);

/* --- 2. Pages ------------------------------------------------------------- */

function heroTriptych() {
  return C.practices.map(p =>
    `<div><dt>${esc(p.label)}</dt><dd>${esc(p.question)}</dd></div>`
  ).join('');
}

function practiceCards() {
  return C.practices.map(p => `
    <article class="practice">
      <p class="eyebrow on-paper">${esc(p.label)}</p>
      <h3 class="practice-q">${esc(p.question)}</h3>
      <p class="practice-lead">${txt(p.lead)}</p>
      <ul>${p.services.map(s => `<li>${txt(s)}</li>`).join('')}</ul>
    </article>`).join('');
}

function homeHTML() {
  return `
    <header class="hero">
      <canvas id="field" aria-hidden="true"></canvas>
      <div class="hero-inner">
        <img class="hero-mark" src="assets/cada-logo.jpeg" alt="${esc(C.org.name)}">
        <h1>Claremont Aerospace<br><span class="amp">&amp;</span> Defense Association</h1>
        <p class="hero-line">${txt(C.org.heroLine)}</p>
        <dl class="triptych">${heroTriptych()}</dl>
      </div>
      <p class="scroll-cue">Scroll</p>
    </header>

    <section class="band band-paper">
      <div class="wrap">
        <p class="eyebrow on-paper">Three practices, one account</p>
        <h2>A defense company has three questions. Most advisors answer one.</h2>
        <p class="lede">We staff engineering, capital, and policy against the same problem, so the technical answer, the financial case, and the path to a government buyer are built to agree with each other rather than assembled separately.</p>
        <div class="practices">${practiceCards()}</div>
      </div>
    </section>

    <section class="band band-deep">
      <div class="wrap">
        <p class="eyebrow">${txt(C.proof.caption)}</p>
        <div class="proof">
          ${C.proof.stats.map(s => `<div><p class="v">${esc(s.value)}</p><p class="l">${esc(s.label)}</p></div>`).join('')}
        </div>
      </div>
    </section>

    <section class="band band-paper">
      <div class="wrap">
        <p class="eyebrow on-paper">Scope</p>
        <h2>${txt(C.boundaries.lead)}</h2>
        <p class="lede">${txt(C.boundaries.body)}</p>
      </div>
    </section>`;
}

function capabilitiesHTML() {
  return `
    <section class="band band-paper">
      <div class="wrap">
        <p class="eyebrow on-paper">Capabilities</p>
        <h2>What each practice does</h2>
        <p class="lede">${txt(C.org.canonical)}</p>
        <div class="practices">${practiceCards()}</div>
      </div>
    </section>

    <section class="band band-ink">
      <div class="wrap">
        <p class="eyebrow">How an engagement works</p>
        <h2>Scope first, then propose.</h2>
        <div class="steps">
          ${C.engagementModel.map(s => `
            <div class="step"><p class="k">${esc(s.step)}</p><p class="d">${txt(s.detail)}</p></div>`).join('')}
        </div>
      </div>
    </section>`;
}

function engagementsHTML() {
  // Anything marked "withheld" in content.js never reaches the page.
  const shown = C.engagements.filter(e => e.disclosure !== 'withheld');

  const body = shown.length === 0
    ? `<p class="lede">No engagements are cleared for publication yet.</p>`
    : shown.map(e => {
        const named = e.disclosure === 'named';
        const title = named ? e.client : e.sector;
        return `
          <article class="engagement">
            <div class="engagement-head">
              <h3>${esc(title)}</h3>
              ${e.note ? `<span class="chip chip-mark">${esc(e.note)}</span>` : ''}
              <span class="chip">${txt(e.period)}</span>
              ${named ? '' : '<span class="chip">Client name withheld</span>'}
            </div>
            <p class="lede">${txt(e.summary)}</p>
            ${e.work.map(w => `
              <div class="workrow"><p class="k">${esc(w.practice)}</p><p class="d">${txt(w.detail)}</p></div>`).join('')}
          </article>`;
      }).join('');

  return `
    <section class="band band-paper">
      <div class="wrap">
        <p class="eyebrow on-paper">Engagements</p>
        <h2>Selected work</h2>
        <p class="lede">Named with each client's permission.</p>
        ${body}
      </div>
    </section>`;
}

function teamHTML() {
  // Every member gets an index so the dialog can find them again on click.
  C.members.forEach((m, i) => { m._i = i; });

  const groups = C.practices.map(p => {
    const people = C.members.filter(m => m.practice === p.key);
    return `
      <section class="team-group">
        <header class="team-head">
          <p class="eyebrow on-paper">${esc(p.label)}</p>
          <p class="team-q">${esc(p.question)}</p>
          <p class="team-n">${people.length}</p>
        </header>
        <div class="roster">
          ${people.map(m => `
            <button class="pcard" type="button" data-member="${m._i}">
              <span class="pcard-frame">
                <img src="${esc(m.photo)}" alt="${esc(m.name)}" loading="lazy">
              </span>
              <span class="pcard-name">${esc(m.name)}</span>
              <span class="pcard-meta">${esc(m.school)} ${esc(m.year)}${m.role ? ' · ' + esc(m.role) : ''}</span>
            </button>`).join('')}
        </div>
      </section>`;
  }).join('');

  return `
    <section class="band band-paper">
      <div class="wrap">
        <p class="eyebrow on-paper">${esc(C.org.memberCount)} members · ${esc(C.org.colleges)}</p>
        <h2>The team</h2>
        <p class="lede">Grouped by practice, because the practice is what a client is buying. Select anyone to read their background.</p>
        ${groups}
      </div>
    </section>`;

}

/* --- The member dialog ----------------------------------------------------- */

let lastFocused = null;

function openMember(i, trigger) {
  const m = C.members[i];
  const practice = C.practices.find(p => p.key === m.practice);
  lastFocused = trigger || null;

  el('modal-body').innerHTML = `
    <div class="modal-portrait"><img src="${esc(m.photo)}" alt="${esc(m.name)}"></div>
    <div class="modal-text">
      <p class="eyebrow">${esc(practice ? practice.label : '')}${m.role ? ' · ' + esc(m.role) : ''}</p>
      <h3>${esc(m.name)}</h3>
      <p class="modal-meta">${esc(m.school)} ${esc(m.year)}</p>
      <blockquote class="modal-why">${txt(m.why)}</blockquote>
      <p class="modal-bio">${txt(m.bio)}</p>
    </div>`;

  const modal = el('modal');
  modal.hidden = false;
  document.body.style.overflow = 'hidden';
  requestAnimationFrame(() => modal.classList.add('is-open'));
  el('modal-close').focus();
}

function closeMember() {
  const modal = el('modal');
  if (modal.hidden) return;
  modal.classList.remove('is-open');
  document.body.style.overflow = '';
  // Wait for the transition before hiding, so the card animates out.
  setTimeout(() => { modal.hidden = true; }, 220);
  if (lastFocused) lastFocused.focus();
}

function joinHTML() {
  return `
    <section class="band band-ink">
      <div class="wrap">
        <p class="eyebrow">Join CADA</p>
        <h2>${txt(C.recruitment.lead)}</h2>
        <div class="steps">
          <div class="step"><p class="k">Timeline</p><p class="d">${txt(C.recruitment.timeline)}</p></div>
          <div class="step"><p class="k">Eligibility</p><p class="d">${txt(C.recruitment.eligibility)}</p></div>
          <div class="step"><p class="k">Process</p><p class="d">${txt(C.recruitment.process)}</p></div>
        </div>
      </div>
    </section>

    <section class="band band-paper">
      <div class="wrap">
        <p class="eyebrow on-paper">Training</p>
        <h2>${txt(C.recruitment.training.title)}</h2>
        <p class="lede">${txt(C.recruitment.training.body)}</p>
        <p class="eyebrow on-paper" style="margin-top:3rem">Who we look for</p>
        <ul class="plainlist">${C.recruitment.looking.map(l => `<li>${txt(l)}</li>`).join('')}</ul>
      </div>
    </section>`;
}


/* --- Contact --------------------------------------------------------------- */

function contactHTML() {
  const f = C.contact.fields;

  return `
    <section class="band band-ink">
      <div class="wrap">
        <p class="eyebrow">Contact</p>
        <h2>${txt(C.contact.heading)}</h2>
        <p class="lede">${txt(C.contact.lede)}</p>

        <form class="cform" id="cform" novalidate
              action="${esc(WEB3FORMS_ENDPOINT)}" method="POST">

          <input type="hidden" name="access_key" value="${esc(WEB3FORMS_ACCESS_KEY)}">

          <!-- Honeypot. Hidden from sight and taken out of the tab order, so a
               person never meets it. Web3Forms discards anything that fills it. -->
          <label class="hp" aria-hidden="true">
            <input type="checkbox" name="botcheck" tabindex="-1" autocomplete="off">
          </label>

          <div class="cgrid">
            <label class="cfield">
              <span>${esc(f.name)}</span>
              <input type="text" name="name" id="c-name" autocomplete="name"
                     required aria-describedby="c-err-name">
              <em class="cfield-error" id="c-err-name" hidden></em>
            </label>
            <label class="cfield">
              <span>${esc(f.org)}</span>
              <input type="text" name="organization" id="c-org" autocomplete="organization">
            </label>
          </div>

          <label class="cfield">
            <span>${esc(f.email)}</span>
            <input type="email" name="email" id="c-email" autocomplete="email"
                   required aria-describedby="c-err-email">
            <em class="cfield-error" id="c-err-email" hidden></em>
          </label>

          <label class="cfield">
            <span>${esc(f.message)}</span>
            <textarea name="message" id="c-message" rows="5"
                      required aria-describedby="c-err-message"></textarea>
            <em class="cfield-error" id="c-err-message" hidden></em>
          </label>

          <p class="cerror" id="c-error" hidden></p>

          <div class="crow">
            <button class="cbtn" type="submit" id="c-submit">Send Message</button>
            <p class="cnote">Goes straight to the CADA inbox. We read everything.</p>
          </div>
        </form>
      </div>
    </section>`;

}

/* Validation ---------------------------------------------------------------- */

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

function setFieldError(id, message) {
  const box = el(id);
  box.textContent = message || '';
  box.hidden = !message;
  const input = el(id.replace('c-err-', 'c-'));
  if (input) input.classList.toggle('is-invalid', Boolean(message));
  return !message;
}

function validateContact() {
  const name = el('c-name').value.trim();
  const email = el('c-email').value.trim();
  const message = el('c-message').value.trim();

  let ok = true;
  ok = setFieldError('c-err-name', name ? '' : 'Please add your name.') && ok;
  ok = setFieldError('c-err-email',
        !email ? 'Please add your email address.'
        : !EMAIL_RE.test(email) ? 'That email address does not look right.'
        : '') && ok;
  ok = setFieldError('c-err-message', message ? '' : 'Please tell us what you are trying to work out.') && ok;

  if (!ok) {
    const first = document.querySelector('.cfield-error:not([hidden])');
    if (first) first.closest('.cfield').querySelector('input, textarea').focus();
  }
  return ok;
}

/* Submission ---------------------------------------------------------------- */

async function submitContact(e) {
  e.preventDefault();
  if (!validateContact()) return;

  const btn = el('c-submit');
  const banner = el('c-error');
  banner.hidden = true;

  if (WEB3FORMS_ACCESS_KEY === 'REPLACE_ME') {
    showSendError('This form is not connected yet. Its access key has not been set.');
    return;
  }

  const name = el('c-name').value.trim();
  const org = el('c-org').value.trim();
  const email = el('c-email').value.trim();
  const message = el('c-message').value.trim();

  btn.disabled = true;
  btn.textContent = 'Sending';

  try {
    const res = await fetch(WEB3FORMS_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify({
        access_key: WEB3FORMS_ACCESS_KEY,
        subject: 'CADA Website Inquiry from ' + name,
        // from_name is the display name on the message. The visitor's own
        // address goes in replyto, never in from, so the mail is not forged.
        from_name: 'CADA Website',
        replyto: email,
        name: name,
        organization: org || 'Not given',
        email: email,
        message: message,
        botcheck: el('cform').botcheck.checked
      })
    });
    const data = await res.json().catch(() => ({}));

    if (res.ok && data.success) showSendSuccess();
    else showSendError(data.message || null);
  } catch (err) {
    showSendError(null);
  }
}

function showSendSuccess() {
  const s = C.contact.success;
  el('cform').outerHTML = `
    <div class="csuccess" role="status">
      <p class="csuccess-head">${txt(s.heading)}</p>
      <p class="csuccess-body">${txt(s.body)}</p>
    </div>`;
}

// Leaves every entered value exactly where it was, and always gives the visitor
// an address they can write to instead.
function showSendError(detail) {
  const btn = el('c-submit');
  btn.disabled = false;
  btn.textContent = 'Send Message';

  const banner = el('c-error');
  banner.innerHTML = `${txt(C.contact.errorText)}
    <a href="mailto:${esc(C.org.contactEmail)}">${esc(C.org.contactEmail)}</a>.
    ${detail ? `<span class="cerror-detail">${esc(detail)}</span>` : ''}`;
  banner.hidden = false;
  banner.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
}

/* --- The page map ----------------------------------------------------------
   Used by the browser to fill the shell, and by build.js to bake the same
   markup into index.html so that link previews and search engines see real
   content instead of an empty page. Keep the keys in nav order.            */

const PAGE_HTML = {
  home: homeHTML,
  capabilities: capabilitiesHTML,
  engagements: engagementsHTML,
  team: teamHTML,
  join: joinHTML,
  contact: contactHTML
};

// Exported when this file is loaded by Node, ignored in the browser.
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { PAGE_HTML: PAGE_HTML, setContent: (c) => { C = c; } };
}

/* --- 3. Routing ----------------------------------------------------------- */

const PAGES = ['home', 'capabilities', 'engagements', 'team', 'join', 'contact'];

function route() {
  const name = PAGES.includes(location.hash.slice(1)) ? location.hash.slice(1) : 'home';
  PAGES.forEach(p => el('page-' + p).classList.toggle('is-active', p === name));
  document.querySelectorAll('.nav-links a').forEach(a => {
    if (a.getAttribute('href') === '#' + name) a.setAttribute('aria-current', 'page');
    else a.removeAttribute('aria-current');
  });
  window.scrollTo(0, 0);
  if (name === 'home') startField();
}

/* --- 4. The cover field ---------------------------------------------------- */
/* A fine coordinate grid with a slow scan passing down it. The reference is the
   LiDAR and ultrasonic survey work the technical practice actually does: a
   structure that only resolves as the instrument passes over it.            */

let fieldStarted = false;

function startField() {
  const cv = document.getElementById('field');
  if (!cv || fieldStarted) return;
  fieldStarted = true;

  const ctx = cv.getContext('2d');
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const GAP = 34;
  let w = 0, h = 0, dots = [];

  function layout() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = cv.clientWidth; h = cv.clientHeight;
    cv.width = w * dpr; cv.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    dots = [];
    for (let y = GAP / 2; y < h; y += GAP)
      for (let x = GAP / 2; x < w; x += GAP)
        dots.push({ x: x, y: y });
  }

  function frame(t) {
    ctx.clearRect(0, 0, w, h);
    // Scan position: a full pass takes about eleven seconds.
    const scan = reduced ? h * 0.42 : ((t / 11000) % 1.35 - 0.175) * h;

    for (const d of dots) {
      const near = Math.max(0, 1 - Math.abs(d.y - scan) / 120);
      const a = 0.075 + near * near * 0.62;
      ctx.fillStyle = 'rgba(255,255,255,' + a.toFixed(3) + ')';
      ctx.fillRect(d.x, d.y, near > 0.55 ? 2 : 1, near > 0.55 ? 2 : 1);
    }

    if (!reduced) {
      const g = ctx.createLinearGradient(0, scan - 130, 0, scan + 12);
      g.addColorStop(0, 'rgba(155,166,230,0)');
      g.addColorStop(1, 'rgba(155,166,230,0.30)');
      ctx.fillStyle = g;
      ctx.fillRect(0, scan - 130, w, 142);
      requestAnimationFrame(frame);
    }
  }

  layout();
  requestAnimationFrame(frame);
  window.addEventListener('resize', () => { layout(); if (reduced) requestAnimationFrame(frame); });
}

/* --- Boot ------------------------------------------------------------------ */

function mountPages() {
  PAGES.forEach(name => {
    const node = el('page-' + name);
    // Skip anything the build step already baked in and that has not changed.
    node.innerHTML = PAGE_HTML[name]();
  });

  el('page-team').querySelectorAll('.pcard').forEach(b => {
    b.addEventListener('click', () => openMember(Number(b.dataset.member), b));
  });
  el('cform').addEventListener('submit', submitContact);
}

if (HAS_DOM) {
  mountPages();
  el('foot-colleges').innerHTML = txt(C.org.colleges);
  el('foot-contact').textContent = C.org.contactEmail;
  el('modal-close').addEventListener('click', closeMember);
  el('modal-scrim').addEventListener('click', closeMember);
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMember(); });
  window.addEventListener('hashchange', () => { closeMember(); route(); });
  route();
}
