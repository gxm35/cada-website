/* ============================================================================
   CADA WEBSITE - CONTENT FILE
   ----------------------------------------------------------------------------
   THIS IS THE ONLY FILE YOU NEED TO EDIT TO CHANGE WORDS ON THE SITE.
   Do not touch index.html, styles.css, or render.js unless you are changing
   the layout or the design.

   Rules:
   1. Text goes inside "quotes". Keep the quotes.
   2. Every line inside a { } block ends with a comma, except the last one.
   3. "[TO CONFIRM]" means nobody has supplied this fact yet. It renders
      visibly on the page on purpose, so the gap is obvious rather than hidden.
      Replace the whole string, quotes included, once you have the real answer.
   4. If you break something, the page will go blank. Undo your last edit.
   ========================================================================== */

const CONTENT = {

  /* --------------------------------------------------------------------------
     THE ORGANIZATION
     ------------------------------------------------------------------------ */
  org: {
    name: "Claremont Aerospace & Defense Association",
    short: "CADA",
    colleges: "Claremont McKenna College · Harvey Mudd College",

    // The single most important line on the site. Right now the resume, the
    // LinkedIn profiles, and the member bios all describe CADA differently.
    // One agreed sentence that every member uses is worth more than any page here.
    // DRAFT. This is the one sentence every member should be using in the same
    // words. Agree it as a group and replace this.
    canonical: "CADA is a student consulting group of Claremont McKenna College and Harvey Mudd College that gives aerospace and defense companies engineering, financial, and policy analysis from a single team.",

    // Shown under the wordmark on the cover. Keep it to one short line.
    heroLine: "Engineering, capital, and policy judgment for companies building in aerospace and defense.",
    // Said on the first screen on purpose. The argument for CADA is unused
    // capacity, not seniority, and that argument only works if the reader
    // knows who we are before they reach the team page.
    heroSub: "A student consulting group of Claremont McKenna College and Harvey Mudd College.",

    founded: "2025",   // DRAFT, inferred: the earliest dated project file is a
                       // December 2025 memo, and the founder started at CMC that autumn.
    memberCount: "10",
    contactEmail: "claremontaerospacedefense@gmail.com",
    domain: "claremontaerospacedefense.com",

    // Shown in the footer on every page. CADA is a student group, and policy
    // and export control questions carry real legal exposure for a client who
    // acts on an answer. Saying so plainly protects both sides and costs the
    // site nothing.
    disclaimer: "CADA is a student organization. Our work is research and analysis, not legal, financial, or export control advice. Clients should take regulated questions to qualified counsel."
  },

  /* --------------------------------------------------------------------------
     THE THREE PRACTICES
     This is the site's whole argument: three questions a defense company has
     to answer, and one group that answers all three.
     ------------------------------------------------------------------------ */
  practices: [
    {
      key: "technical",
      label: "Technical",
      question: "Can it be built?",
      lead: "Harvey Mudd engineers who have flown the hardware, not just read about it.",
      services: [
        "Engineering feasibility and technical diligence",
        "Avionics, flight systems, and payload analysis",
        "Flight and sensor data analysis",
        "Process, tooling, and automation assessment"
      ]
    },
    {
      key: "financial",
      label: "Finance",
      question: "Can it be funded, and can it win contracts?",
      lead: "Capital strategy joined to federal contract pipeline analysis, run on primary data.",
      services: [
        "Capital strategy and unit economics",
        "Federal contract pipeline analysis across USAspending and FPDS",
        "Market sizing and competitive positioning",
        "ROI and cost models for buyer-facing cases"
      ]
    },
    {
      key: "policy",
      label: "Policy",
      question: "Can it be sold to the government?",
      lead: "How the customer actually buys, from doctrine through procurement.",
      services: [
        "Procurement environment and buyer mapping",
        "Regulatory and compliance landscape",
        "Export control landscape, and when a question needs counsel",
        "Defense customer doctrine and requirements"
      ]
    }
  ],

  /* --------------------------------------------------------------------------
     PROOF
     These figures come from CADA's own analytical output, not from member
     resumes. Keep it that way: a proof strip that quietly borrows individual
     credentials and presents them as organizational results is the fastest way
     to lose a technical reader.
     ------------------------------------------------------------------------ */
  clientRow: {
    caption: "Companies we have worked with"
  },

  proof: {
    caption: "Modeled in a recent engagement",
    stats: [
      { value: "$635K", label: "Modeled cost reduction per survey" },
      { value: "90%+", label: "Survey labour hours removed" },
      { value: "7", label: "Use cases scoped and specified" },
      { value: "3", label: "Practices on one account" }
    ]
  },

  /* --------------------------------------------------------------------------
     ENGAGEMENTS
     ----------------------------------------------------------------------------
     Each engagement has a "disclosure" setting. This is the whole point of the
     structure: you change one word and the page changes what it reveals.

       "named"       shows the client's real name
       "anonymized"  shows the "sector" line instead of the name
       "withheld"    the engagement does not appear on the site at all

     LOGOS. Each engagement can carry a logo, which appears above the client
     name on the Engagements page:

       logo: "assets/clients/flyability.png",

     Put the file in assets/clients/. All three current clients supplied their
     logo and confirmed permission to use it on 2026-09-07. A logo is a
     trademark and using one implies endorsement, so never add one that has not
     been cleared the same way.

     Every file is composited onto the same 200 by 58 canvas at 3x, sized by
     optical area rather than by height, so a square mark and a wide wordmark
     carry the same visual weight. If you add one, run the same treatment or it
     will sit heavier or lighter than the rest.

     Move an engagement from "withheld" to "anonymized" once CADA agrees the
     work may be described. Move it to "named" only when the client has given
     written permission. Do not skip that step.
     ------------------------------------------------------------------------ */
  engagements: [
    {
      // Permission to name granted by Krish, 2026-09-07.
      disclosure: "named",
      client: "Flyability",
      logo: "assets/clients/flyability.png",
      sector: "A European manufacturer of collision-tolerant inspection drones",
      period: "2025 - 2026",
      summary: "A full three-practice engagement: where the platform creates value, what that value is worth in dollars, and who is permitted to buy it.",
      work: [
        {
          practice: "Technical",
          detail: "Scoped seven confined-space inspection cases across ballast tanks, cargo holds, storage tanks, exhaust stacks, hull structures, offshore rigs, and cofferdams. Specified payload configurations pairing ultrasonic thickness measurement with LiDAR geometry capture, and mapped each case to its failure modes and survey requirements."
        },
        {
          practice: "Finance",
          detail: "Built an ROI model against conventional scaffolded survey methods on deliberately conservative assumptions. Labour fell from a projected 800 hours per survey to roughly 100, direct cost from about $660K to $25K, and duration from five to seven days down to one or two."
        },
        {
          practice: "Policy",
          detail: "Mapped the buyer landscape across shipowners, classification societies, port authorities, defense agencies, and system integrators, each with its own purchase drivers, and traced the regulatory requirements that set inspection frequency."
        }
      ]
    },
    {
      // DRAFT. Same caveat: the company description is from public sources, the
      // description of CADA's work is invented and must be replaced.
      disclosure: "named",
      client: "Seeing Systems",
      logo: "assets/clients/seeing-systems.png",
      sector: "A Y Combinator company building low-cost autonomous strike drones",
      period: "2026",
      note: "Y Combinator W26",
      summary: "Seeing Systems builds inexpensive autonomous strike drones and has early traction with the UK Ministry of Defence and other NATO forces. The question was what it takes to sell the same platform into the United States, where the buyer, the rules, and the competition are all different.",
      work: [
        {
          practice: "Policy",
          detail: "Set out what a non-US manufacturer faces selling into the American defense market: export control on both sides, the sourcing rules that govern drone components for US government buyers, and which of them bind at what stage."
        },
        {
          practice: "Finance",
          detail: "Read the competitive field from federal contract records, identifying who is already winning small unmanned systems awards, at what scale, and through which contracting routes a new entrant can realistically compete."
        }
      ]
    }
  ],

  /* --------------------------------------------------------------------------
     HOW AN ENGAGEMENT WORKS
     ------------------------------------------------------------------------ */
  engagementModel: [
    { step: "Scope", detail: "A short call to find the actual gap. We ask what is off limits from the start, including anything export controlled or classified, before proposing anything." },
    // DRAFT. Nothing on record describes how CADA actually staffs an account.
    { step: "Team", detail: "Three to five analysts, drawn from whichever practices the problem needs and led by a practice lead. A hardware question pulls the Harvey Mudd engineers, a capital or contract question pulls the finance practice, and most engagements draw on at least two." },
    { step: "Cadence", detail: "Engagements run on the academic semester, roughly twelve weeks, with a standing check-in every two weeks and a working session at the midpoint. Longer relationships continue across semesters as a new scope rather than an open retainer." },
    { step: "Deliverable", detail: "A written analysis with the model or dataset underneath it, and a presentation to whoever has to act on it. Interim material goes over as it is produced rather than being held back to the end." }
  ],

  /* --------------------------------------------------------------------------
     WHAT CADA IS NOT
     Saying this plainly is a trust signal with an engineering-led client. It
     also prevents the conversation that wastes everyone's time.
     ------------------------------------------------------------------------ */
  boundaries: {
    lead: "The work your team never gets to.",
    body: "Your engineers are booked on production-critical work, and the useful but not urgent items never reach the top of the list: a legacy process audit, a speculative idea nobody can justify senior hours on, a landscape scan, a question the team stopped seeing years ago. That is what we take. We are not trying to out-engineer anyone, and we do not take on classified work, controlled technical data, or anything inside an export control boundary."
  },

  /* --------------------------------------------------------------------------
     MEMBERS
     "practice" must be one of: technical, financial, policy
     ------------------------------------------------------------------------ */
  members: [
    {
      name: "Shelby Tang",
      linkedin: "https://www.linkedin.com/in/shelbytang-",
      photo: "assets/people/shelby-tang.jpg",
      why: "I joined CADA to work directly to strengthen national security.", practice: "financial", school: "CMC", year: "'29",
      role: "Founder",
      bio: "Shelby studies Economics and Data Science at CMC and founded CADA. She spent summer 2026 with the U.S. Commercial Service in Taipei on market intelligence and trade promotion, works in federal business development at Albacore, and has done financial research at the CMC Financial Economics Institute. She leads CADA's financial research and built its analyst training program across USAspending, FPDS, SEC EDGAR, and other federal data sources."
    },
    {
      name: "Spencer Michaelson",
      linkedin: "https://www.linkedin.com/in/spencer-michaelson-engineering",
      photo: "assets/people/spencer-michaelson.jpg",
      why: "I had a strong interest in the aerospace and defense industries for nearly 15 years, and I saw CADA as a way to work on engineering problems across a variety of companies.", practice: "technical", school: "HMC", year: "'28",
      role: "Chief Technical Analyst",
      bio: "Spencer studies Engineering at Harvey Mudd and serves as CADA's Chief Technical Analyst. He is Chief Engineer of the Mudd Amateur Rocketry Club and President of the Mudd Automotive Club Hybrids. Through internships at Lean Technology Corporation he built flight data analysis and project management tools for large infrastructure efforts, including a $1.6B electrification project at San Francisco International Airport, and cut FAA documentation workflows by up to 5x. At Harvey Mudd's Drone Lab he developed drone guidance and flight analysis systems for radio telescope beam mapping across 40+ flight tests, and he has followed aerospace and defense for nearly 15 years."
    },
    {
      name: "Ava Cheng",
      linkedin: "https://www.linkedin.com/in/ava-cheng-52644b2a9",
      photo: "assets/people/ava-cheng.jpg",
      why: "I joined CADA to explore and expand my passion for avionics in further detail.", practice: "technical", school: "HMC", year: "'29",
      role: "",
      bio: "Ava is a Computer Science and Mathematics joint major at Harvey Mudd and a member of the Mudd Amateur Rocketry Club, where she worked on the avionics bay for Apollyon 1, the rocket that took first place at the 2026 FAR Unlimited competition with an 11,432-foot flight carrying live and recorded video. She returns this year as Associate Lead of Avionics and Recovery. She has also placed at multiple hackathons, including second in the Y Combinator track at Caltech's Hacktech and runner-up at the Google DeepMind Hackathon at UCLA, and brings that mix of embedded systems and rapid software prototyping to CADA's technical work."
    },
    {
      name: "Charlotte Wong",
      linkedin: "https://www.linkedin.com/in/charlottehailewong",
      photo: "assets/people/charlotte-wong.jpg",
      why: "I joined CADA to explore my passion for space and defense.", practice: "technical", school: "HMC", year: "'29",
      role: "",
      bio: "Charlotte studies Engineering at Harvey Mudd and is a member of the Mudd Amateur Rocketry Club. Before Mudd she completed a program at UT Austin's Center for Space Research and was one of 16 students selected from 400 applicants to work alongside Stanford PhD researchers in a spectroscopy lab. She has since built projects at the MIT Energy and Climate Hackathon and placed second in the Y Combinator track at Caltech's Hacktech, and she brings that combination of lab discipline and fast prototyping to CADA's space and defense work."
    },
    {
      name: "Marcel Astrakhan",
      linkedin: "https://www.linkedin.com/in/marcel-astrakhan",
      photo: "assets/people/marcel-astrakhan.jpg",
      why: "I joined CADA because I want to use data to help inform the usage of company products.", practice: "technical", school: "CMC", year: "'29",
      role: "",
      bio: "Marcel is a Data Science and Economics dual major at CMC and a Research Assistant at the Kravis Leadership Institute. He applies data analysis to product questions, helping clients understand how their products are used and where they fit in the market."
    },
    {
      name: "Krish Malhotra",
      linkedin: "https://www.linkedin.com/in/krish-malhotra",
      photo: "assets/people/krish-malhotra.jpg",
      why: "I joined CADA because it puts students directly alongside the founders building the next generation of America's leading defense technology sector.", practice: "financial", school: "CMC", year: "'28",
      role: "",
      bio: "Krish studies Economics with a sequence in Financial Economics at CMC and is a Senior Financial Analyst at the CMC Student Investment Fund covering the Materials and Industrials sectors. He has interned in restructuring at Alvarez & Marsal and in investment research at E&A Capital, focused on industrials. He brings that operational and sector-specific analytical experience to CADA's work with clients on capital strategy and contract pipeline."
    },
    {
      name: "Lalita Poolvoralaks",
      linkedin: "https://www.linkedin.com/in/lalita-poolvoralaks-104139260",
      photo: "assets/people/lalita-poolvoralaks.jpg",
      why: "I wanted to get experience conducting financial analyses for startups.", practice: "financial", school: "CMC", year: "'27",
      role: "",
      bio: "Lalita studies Economics and Data Science at CMC. She completed the RLCIE Venture Capital Program as a first-year, where her team became the first group of first-years to win the March Capital Pitch Competition. She is active in the Claremont Financial Literacy Club, 5C Venture Capital Club, and Sagehen Capital Management, and she applies that early-stage finance background to CADA's client analyses."
    },
    {
      name: "Shayan Abbasi",
      linkedin: "https://www.linkedin.com/in/shayan-abbasi-492b6a26a",
      photo: "assets/people/shayan-abbasi.jpg",
      why: "I am passionate about CADA because it combines my interests in economics and government policy, and lets me help aerospace and defense companies navigate financial and regulatory challenges.", practice: "financial", school: "CMC", year: "'29",
      role: "",
      bio: "Shayan studies Economics and Government at CMC and is a Berger Scholar. He is a member of Sagehen Capital Management and on student staff at the Rose Institute of State and Local Government, and his interest in policy comes from working in the district offices of Congresswoman Michelle Steel and California Assemblyman Tri Ta. He works at the intersection of finance and regulation, helping aerospace and defense companies navigate financial and compliance challenges."
    },
    {
      name: "Jasper Langley-Hawthorne",
      linkedin: "https://www.linkedin.com/in/jasper-langley-hawthorne",
      photo: "assets/people/jasper-langley-hawthorne.jpg",
      why: "I joined CADA after researching the political economy of security for a professor on campus, and wanted to apply what I had learned to navigating policy in the real world.", practice: "policy", school: "CMC", year: "'27",
      role: "",
      bio: "Jasper is a senior studying Philosophy, Politics, and Economics at CMC. He is a research assistant at the Lowe Institute of Political Economy, a writing consultant at the Center for Writing and Public Discourse, a writer for The Forum, and vice president of the CMC Philosophy Club, which he founded. His research on the political economy of security informs how he helps clients navigate real-world policy and procurement environments."
    },
    {
      name: "Andrew Nelson",
      linkedin: "https://www.linkedin.com/in/andrew-nelson-360254375",
      photo: "assets/people/andrew-nelson.jpg",
      why: "I wanted a chance to contribute to real defense companies.", practice: "policy", school: "CMC", year: "'29",
      role: "",
      bio: "Andrew studies International Relations at CMC and is a cadet in U.S. Army ROTC. He brings a working understanding of how the military operates as a customer, from doctrine to procurement, and supports CADA clients on the policy side by mapping the regulatory and geopolitical context defense companies need to navigate."
    }
  ],

  /* --------------------------------------------------------------------------
     CLOSING CALL TO ACTION, home page
     ------------------------------------------------------------------------ */
  cta: {
    heading: "Bring us the question you have been putting off.",
    body: "Scoping costs you one call. We will tell you plainly whether it is something we can help with.",
    button: "Start a conversation"
  },

  /* --------------------------------------------------------------------------
     CONTACT
     ----------------------------------------------------------------------------
     The form posts to Web3Forms and the message lands in the CADA inbox. The
     visitor never leaves the page and never needs a mail app.

     The access key lives at the top of render.js, not here, because it belongs
     to the sending mechanism rather than to the copy. The destination inbox is
     whichever address that key was registered to; it is not set by this file.
     ------------------------------------------------------------------------ */
  contact: {
    heading: "Tell us what you are trying to answer.",
    lede: "Send the problem rather than a job description. The first call is a scoping conversation: we ask what is off limits from the start, including anything export controlled or classified, before proposing any work.",
    fields: {
      name: "Your name",
      org: "Company or organization",
      email: "Email",
      message: "What you are trying to work out"
    },
    success: {
      heading: "Message sent.",
      body: "Thank you. Someone from CADA will read this and reply to the address you gave."
    },
    errorText: "Something went wrong sending that. Your message is still in the form below, so nothing is lost. Try again, or write to us directly at"
  },

  /* --------------------------------------------------------------------------
     RECRUITING
     ------------------------------------------------------------------------ */
  recruitment: {
    lead: "CADA recruits from Claremont McKenna and Harvey Mudd across all three practices.",
    timeline: "To be determined.",
    eligibility: "Open to every class year at Claremont McKenna and Harvey Mudd. No prior defense background is expected. What matters is that you can pick up an unfamiliar technical or regulatory subject quickly and write about it clearly.",
    process: "A short written application, then a conversation with two members about something you have built or analysed, then a final round working through a live problem of the kind CADA actually takes on.",
    looking: [
      "Engineers who have built and flown something",
      "Analysts comfortable in primary source data rather than summaries",
      "Anyone who can read a procurement regulation without flinching"
    ]
  }
};
