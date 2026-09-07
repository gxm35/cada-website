# CADA Website

A five-page site for the Claremont Aerospace and Defense Association. No build
step, no dependencies, no internet connection required. Open `index.html` and it
runs.

## Editing the words

**Everything you would want to change is in `content.js`.** Open it in any text
editor. Do not touch the other files unless you are changing the layout.

Rules that will save you an hour:

1. Text goes inside `"quotes"`. Keep the quotes.
2. If your text contains a quotation mark, put a backslash before it: `\"`.
3. Lines inside a `{ }` block end with a comma, except the last one.
4. If the page goes blank after an edit, you broke rule 1, 2, or 3. Undo it.

## The `[TO CONFIRM]` markers

Anywhere the site says **TO CONFIRM** in a dashed box, nobody has supplied that
fact yet. They are visible on purpose. An empty gap is honest; an invented fact
is worse than useless on the public face of a defense organization.

Replace the whole string `"[TO CONFIRM] ..."` with the real text once you have
it. As of this writing the open ones are the founding date, the canonical
description of CADA, the recruiting timeline and process, the engagement model
details, and the summaries for Chariot Defense and Seeing Systems.

## Client disclosure

Each entry in `engagements` has a `disclosure` field:

| Value | What the page shows |
|---|---|
| `"named"` | The client's real name |
| `"anonymized"` | The `sector` line instead of the name |
| `"withheld"` | Nothing. The engagement does not appear at all |

Change the one word to change what is public. **Only set `"named"` for a client
who has actually given permission**, and only for work that has actually been
contracted. An organization listed as a client after a single introductory call
is a misrepresentation that a defense company will notice.

## Photographs

Member photos live in `assets/people/` as square JPEGs named after each member.
To replace one, save a new square image over the existing file using the same
filename. Nothing else needs to change.

The site holds every portrait in a navy duotone that resolves to full colour on
hover. That is a deliberate choice: it makes ten photographs taken in ten
different places at ten different qualities read as one set. It is a treatment,
not a substitute for consistent headshots.

## The contact form

The form posts to Web3Forms and the message lands in the CADA inbox. The visitor
stays on the page and never needs a mail app.

### The access key

**Set and live**, at `render.js` line 29. Messages go to the inbox that key was
registered to, `claremontaerospacedefense@gmail.com`.

    const WEB3FORMS_ACCESS_KEY = "9fc8c095-1725-4640-b188-29fb64968483";

**That registration is what decides where the mail goes.** Nothing in this
codebase sets the destination, so if messages ever arrive somewhere unexpected,
the key was registered to the wrong inbox. To move the destination, register a
new key at https://web3forms.com against the new address and replace the value
on that line.

The key is not a secret. It sits in the page source by design and grants only
the right to send a message to the one inbox it belongs to. It cannot read mail,
and whoever finds it cannot redirect it.

### What gets sent

| Field | Value |
|---|---|
| Subject | `CADA Website Inquiry from [name]` |
| From name | `CADA Website` |
| Reply-To | The visitor's own address |
| Body | Name, organization, email, and their message |

The visitor's address goes in Reply-To, never in From. Replying from the inbox
reaches them directly, and the message is not forged as coming from them, which
is what gets mail marked as spam.

### Spam

A hidden checkbox named `botcheck` sits in the form, positioned off-screen and
removed from the keyboard tab order, so a person never encounters it. Web3Forms
discards any submission that arrives with it filled in.

### States

Idle reads **Send Message**. While sending, the button is disabled and reads
**Sending**, so the form cannot be submitted twice. On success the form is
replaced by a short confirmation. On failure every entered value stays exactly
where it was, an error appears, and the CADA address is shown as a direct
fallback, so a visitor is never left with no way to make contact.

## Files

| File | What it is |
|---|---|
| `index.html` | The page shell, navigation, and dialog markup |
| `content.js` | **All copy.** The only file you need for text changes |
| `styles.css` | The visual system: colour, type, layout |
| `render.js` | Builds the pages from `content.js`, handles tabs and the dialog |
| `assets/` | The logo and the member photographs |

## Design notes for whoever inherits this

**Colour.** Every value is the logo's indigo `#070A51`, a tint or shade of it, or
white. It was sampled from the mark directly. There is no other colour in the
system. Adding one will make the site look cheaper, not richer.

**Type.** Three faces, each with one job. Futura for display, the face on the
Apollo 11 lunar plaque. DIN Condensed for labels, the German industrial standard
used on machine dataplates and technical drawings. Charter for body text, because
a serif says this organization writes analysis.

These are macOS system fonts, chosen so the site runs with no internet. If it is
ever hosted, self-host the free equivalents instead: Jost for Futura, Oswald or
Barlow Condensed for DIN, Bitstream Charter for Charter.

**Known limitation.** The logo is a 200 by 200 pixel JPEG. That is enough for the
navigation mark and the cover badge and not enough for anything larger. Get a
vector version, or an export at 1000 pixels or more, before scaling it up.

## If the site is ever hosted

Content is rendered by JavaScript, which search engines index less well than
plain HTML. That does not matter while this runs from a laptop. If it goes live,
add a small build script that writes static pages out of the same `content.js`.
The content model does not need to change.
