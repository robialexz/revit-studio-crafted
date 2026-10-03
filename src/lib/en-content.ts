/**
 * Conținutul paginilor EN (/en/...) — separat de markup ca aceleași texte să
 * alimenteze și pagina HTML, și varianta markdown pentru agenți (agent-content).
 */

export const enOutsourcing = {
  h1: "Revit MEP outsourcing for engineering teams",
  description:
    "Revit MEP outsourcing for MEP consultancies and engineering teams: modelling and drawings in your template, delivered as RVT, DWG and PDF. NDA available.",
  facts: [
    ["Disciplines", "HVAC · heating · electrical"],
    ["Software", "Revit MEP · AutoCAD"],
    ["Deliverables", "RVT · DWG · PDF"],
    ["Collaboration", "Remote · English · NDA available"],
  ],
  useCases: [
    [
      "Overflow capacity",
      "Your team has the design but not the hours. External Revit MEP production covers the peak without hiring.",
    ],
    [
      "2D design to Revit model",
      "Your engineers issue layouts, markups or DWG drawings; I build the Revit MEP model and the drawing set from them.",
    ],
    [
      "Taking over a model",
      "A model started by someone else needs to be checked, cleaned up and brought to issue.",
    ],
    [
      "Drawings and revisions",
      "Sheets, sections, schedules and annotation for an issue, or a revision round after comments.",
    ],
  ],
  process: [
    {
      n: "01",
      title: "What you send",
      body: "The engineering input the model is built from. Your design decisions stay yours.",
      items: [
        "architectural background (RVT, DWG or PDF)",
        "MEP layouts, markups or schematics",
        "your Revit template, families and BIM standards",
        "scope, level of detail and target date",
      ],
    },
    {
      n: "02",
      title: "What I do",
      body: "Model and document to the agreed scope, inside your standards.",
      items: [
        "Revit MEP modelling: ducts, pipes, equipment, electrical layouts",
        "views, sections and sheets set up in your template",
        "tags, annotation and schedules",
        "model and sheet checks before issue",
      ],
    },
    {
      n: "03",
      title: "What you receive",
      body: "Files your team can continue working on, not just prints.",
      items: [
        "editable RVT model",
        "DWG exports to your layer standards",
        "PDF drawing set ready for issue",
        "a short issue note: what was modelled and any open questions",
      ],
    },
    {
      n: "04",
      title: "How we collaborate",
      body: "Remote, in English, with one point of contact who also does the work.",
      items: [
        "written scope, timeline and price before work starts",
        "NDA signed before you share files, on request",
        "files via your shared folder, cloud platform or transfer link",
        "progress updates at agreed milestones",
      ],
    },
  ],
  standards: [
    "your project template and view templates",
    "your families and type naming",
    "your sheet sizes, title blocks and numbering",
    "your DWG export and layer settings",
    "your file naming and folder structure",
  ],
  responsibility: [
    "Scope, deliverables, timeline and price agreed in writing before work starts.",
    "The number of revision rounds is defined in the estimate; extra scope is quoted before it is done.",
    "Engineering design, calculations, checking and sign-off remain with your responsible engineer.",
  ],
  faq: [
    [
      "Do you provide engineering design or calculations?",
      "No. The service is BIM production: modelling, drawings and documentation based on the design your engineers provide. Sizing, calculations, checking and sign-off remain with your team.",
    ],
    [
      "Can you work in our Revit template, with our families and BIM standards?",
      "Yes. Send the template, families and any BIM execution plan or modelling guide at the start, and the model and sheets are produced to them.",
    ],
    [
      "Which Revit version do you use?",
      "The version is confirmed in the estimate so the model matches your project. Revit files cannot be saved back to an older version, so this is agreed before work starts.",
    ],
    [
      "Will you sign an NDA?",
      "Yes. An NDA can be signed before you share any project files. Files are not published or passed on.",
    ],
    [
      "How is the price set?",
      "After reviewing the files, you receive a fixed price for the agreed scope, with the timeline and number of revision rounds included. Extra scope is quoted before it is done.",
    ],
    [
      "What time zone do you work in?",
      "Romania (EET, UTC+2 / UTC+3 in summer), which overlaps with UK and central European working hours.",
    ],
    [
      "Which disciplines do you cover?",
      "HVAC, heating and electrical. Plumbing and drainage are not currently included.",
    ],
    [
      "How is the work contracted?",
      "Scope, deliverables, timeline and price are confirmed in writing before work starts. Contracting and invoicing details are agreed together with the estimate.",
    ],
  ],
} satisfies EnPage;

export const enDrafting = {
  h1: "AutoCAD drafting for engineering offices",
  description:
    "AutoCAD drafting support for engineering and design offices: PDF and scan to DWG redrafting, drawing cleanup to your CAD standards, markups and revisions. Remote, in English.",
  facts: [
    ["Input", "PDF · scans · DWG · markups"],
    ["Output", "DWG · PDF"],
    ["Standards", "Your layers, blocks and title blocks"],
    ["Collaboration", "Remote · English · NDA available"],
  ],
  services: [
    {
      title: "PDF and scan to DWG",
      body: "Legacy drawings that only exist as PDFs or scans are redrafted as clean, editable DWG. Vector PDFs can be converted and then corrected; scans are redrafted to scale.",
      items: [
        "redrafting to scale",
        "dimensions and text",
        "hatches and linetypes",
        "checked against the source",
      ],
    },
    {
      title: "Cleanup and standardisation",
      body: "Drawings received from third parties are brought into a state your team can work with: consistent layers, blocks, text styles and xrefs.",
      items: [
        "layer mapping to your standard",
        "block and text cleanup",
        "xref and image repair",
        "purge and audit",
      ],
    },
    {
      title: "Markups and revisions",
      body: "Redline markups from your engineers are incorporated into existing drawings, with revision clouds and title block updates where your process needs them.",
      items: [
        "redline incorporation",
        "revision clouds and tables",
        "title block updates",
        "batch updates across sheets",
      ],
    },
    {
      title: "Layouts and plot setup",
      body: "Paper space layouts, viewports, scales and plot settings prepared so the set prints the same way every time.",
      items: ["layouts and viewports", "annotation scales", "plot styles", "PDF sets for issue"],
    },
  ],
  received: [
    "editable DWG files to your CAD standard",
    "PDF set ready for issue",
    "a short note of assumptions and open questions",
  ],
  faq: [
    [
      "Can you work to our CAD standards?",
      "Yes. Send your template, layer standard, blocks and title blocks at the start and the drawings are produced to them.",
    ],
    [
      "Can you convert any PDF to DWG?",
      "A vector PDF can be converted and then corrected. A scan or image is redrafted manually, so the estimate depends on the number and complexity of the drawings.",
    ],
    [
      "Do you also model in Revit?",
      "Yes. For MEP projects that need a model and coordinated sheets, see Revit MEP outsourcing. AutoCAD drafting suits 2D-only work and existing DWG sets.",
    ],
    [
      "Will you sign an NDA?",
      "Yes. An NDA can be signed before you share any drawings. Files are not published or passed on.",
    ],
    [
      "How is the price set?",
      "After reviewing the files, you receive a fixed price for the agreed scope and timeline. Extra scope is quoted before it is done.",
    ],
    [
      "Do you check the engineering content?",
      "No. Drafting follows the information you provide; engineering design, calculations and sign-off remain with your team.",
    ],
  ],
} satisfies EnPage;

export const enAbout = {
  h1: "BIM and CAD production support for engineering teams",
  description:
    "NOD BIM is the brand of an installations engineer providing Revit MEP modelling and AutoCAD drafting for engineering teams, working to your standards with an NDA on request.",
  facts: [
    ["Education", "Building services (installations) engineering degree"],
    ["Professional background", "MEP design and coordination"],
    ["Software", "Revit MEP · AutoCAD"],
    ["Disciplines", "HVAC · heating · electrical"],
    ["Deliverables", "RVT · DWG · PDF"],
    ["Collaboration", "Remote · English or Romanian · NDA available"],
  ],
  howIWork: [
    "Scope, deliverables, timeline and a fixed price agreed in writing before work starts.",
    "Work in your Revit template, families and CAD standards; NDA on request.",
    "Modelling and drafting only: engineering design, checking and sign-off remain with your responsible engineer.",
    "A limited number of projects at a time, with availability confirmed before a scope is accepted.",
  ],
} satisfies EnPage;

type EnPage = Record<
  string,
  | string
  | string[]
  | [string, string][]
  | { n?: string; title: string; body: string; items: string[] }[]
>;
