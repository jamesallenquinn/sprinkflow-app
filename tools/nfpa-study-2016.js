/*
 * NFPA 13 2016 — the OLD (pre-2019-reorganization) structure, plus the
 * editions map. Loads AFTER nfpa-study-questions.js (which defines the
 * reorganized 2019/2022/2025 bank).
 * 27 chapters: sprinkler installation consolidated in Ch 8, hangers+seismic
 * combined in Ch 9, water supplies back in Ch 24, dedicated tire (18) and
 * roll-paper (19) chapters.  James to vet.
 */
window.NFPA_STUDY_CHAPTERS_2016 = [
  { n: 1, t: "Administration" },
  { n: 2, t: "Referenced Publications" },
  { n: 3, t: "Definitions" },
  { n: 4, t: "General Requirements" },
  { n: 5, t: "Classification of Occupancies and Commodities" },
  { n: 6, t: "System Components and Hardware" },
  { n: 7, t: "System Requirements" },
  { n: 8, t: "Installation Requirements" },
  { n: 9, t: "Hanging, Bracing, and Restraint of System Piping" },
  { n: 10, t: "Underground Requirements" },
  { n: 11, t: "Design Approaches" },
  { n: 12, t: "General Requirements for Storage" },
  { n: 13, t: "Protection of Miscellaneous and Low-Piled Storage" },
  { n: 14, t: "Palletized, Solid-Piled, Bin Box, Shelf or Back-to-Back Shelf — Class I-IV" },
  { n: 15, t: "Palletized, Solid-Piled, Bin Box, Shelf — Plastic and Rubber Commodities" },
  { n: 16, t: "Rack Storage of Class I Through Class IV Commodities" },
  { n: 17, t: "Rack Storage of Plastic and Rubber Commodities" },
  { n: 18, t: "Protection of Rubber Tire Storage" },
  { n: 19, t: "Protection of Roll Paper" },
  { n: 20, t: "Special Designs of Storage Protection" },
  { n: 21, t: "Alternative Sprinkler System Designs for Chapters 12 Through 20" },
  { n: 22, t: "Special Occupancy Requirements" },
  { n: 23, t: "Plans and Calculations" },
  { n: 24, t: "Water Supplies" },
  { n: 25, t: "Systems Acceptance" },
  { n: 26, t: "Marine Systems" },
  { n: 27, t: "System Inspection, Testing, and Maintenance" },
  { n: "A", t: "Annex A — Explanatory Material" },
  { n: "B", t: "Annex B — Miscellaneous Topics" },
  { n: "C", t: "Annex C — Rack Storage Test Data & Procedures" },
  { n: "D", t: "Annex D — Sprinkler Info from the 2012 Life Safety Code" },
  { n: "E", t: "Annex E — Design Approach & SEI/ASCE 7" },
  { n: "F", t: "Annex F — Informational References" },
];

window.NFPA_STUDY_QUESTIONS_2016 = [
  // ===== General / front matter (Ch 1-5) =====
  { q: "In the 2016 edition, occupancy hazard classifications (Light, Ordinary, Extra) are found in which chapter?", c: ["Chapter 11 — Design Approaches", "Chapter 5 — Classification of Occupancies and Commodities", "Chapter 4 — General Requirements", "Chapter 12 — General Requirements for Storage"], a: 1, topic: "General", why: "In 2016, Chapter 5 classifies BOTH occupancies and commodities. (In the 2019+ reorganization, commodity classification moves to the storage chapters.)" },
  { q: "In 2016, COMMODITY classification (Class I-IV, Group A/B/C plastics) is found in which chapter?", c: ["Chapter 12 — General Requirements for Storage", "Chapter 5 — Classification of Occupancies and Commodities", "Chapter 3 — Definitions", "Chapter 14 — Class I-IV Storage"], a: 1, topic: "General", why: "2016 puts commodity classification together with occupancy classification in Chapter 5 — a key difference from the reorganized editions, where it lives in Chapter 20." },
  { q: "Defined terms are in which chapter (2016)?", c: ["Chapter 3 — Definitions", "Chapter 5 — Classification", "Chapter 1 — Administration", "Chapter 4 — General Requirements"], a: 0, topic: "General", why: "Chapter 3 holds the definitions in every edition." },
  { q: "Scope, purpose, and application of the standard are in which 2016 chapter?", c: ["Chapter 4 — General Requirements", "Chapter 1 — Administration", "Chapter 2 — Referenced Publications", "Chapter 11 — Design Approaches"], a: 1, topic: "General", why: "Chapter 1 (Administration) covers scope/purpose/application in every edition." },
  { q: "The list of referenced documents and their editions is in which 2016 chapter?", c: ["Chapter 3 — Definitions", "Chapter 2 — Referenced Publications", "Chapter 1 — Administration", "Annex F"], a: 1, topic: "General", why: "Chapter 2 lists referenced publications in every edition." },

  // ===== Components & Systems (Ch 6, 7) =====
  { q: "Acceptable pipe, fittings, valves, and sprinkler listings are in which 2016 chapter?", c: ["Chapter 8 — Installation Requirements", "Chapter 6 — System Components and Hardware", "Chapter 7 — System Requirements", "Chapter 4 — General Requirements"], a: 1, topic: "Components & Systems", why: "Chapter 6 (System Components and Hardware) lists acceptable components in 2016 — the same role Chapter 7 plays in the reorganized editions." },
  { q: "Wet-pipe, dry-pipe, preaction, and deluge system requirements are in which 2016 chapter?", c: ["Chapter 6 — System Components and Hardware", "Chapter 7 — System Requirements", "Chapter 8 — Installation Requirements", "Chapter 11 — Design Approaches"], a: 1, topic: "Components & Systems", why: "Chapter 7 (System Requirements) covers the system types in 2016 — the role Chapter 8 plays in the reorganized editions." },
  { q: "Antifreeze system requirements are in which 2016 chapter?", c: ["Chapter 7 — System Requirements", "Chapter 6 — System Components and Hardware", "Chapter 8 — Installation Requirements", "Chapter 24 — Water Supplies"], a: 0, topic: "Components & Systems", why: "Antifreeze systems are a system type, so they're in Chapter 7 in 2016." },
  { q: "A dry-pipe system's water delivery time requirement is part of which 2016 chapter?", c: ["Chapter 8 — Installation Requirements", "Chapter 7 — System Requirements", "Chapter 24 — Water Supplies", "Chapter 25 — Systems Acceptance"], a: 1, topic: "Components & Systems", why: "Dry-pipe system rules are in Chapter 7 (System Requirements) in 2016." },
  { q: "Listing/use limits of CPVC and other pipe materials are addressed in which 2016 chapter?", c: ["Chapter 6 — System Components and Hardware", "Chapter 8 — Installation Requirements", "Chapter 10 — Underground Requirements", "Chapter 7 — System Requirements"], a: 0, topic: "Components & Systems", why: "Acceptable piping materials are components — Chapter 6 in 2016." },

  // ===== Sprinklers — the big Chapter 8 (2016) =====
  { q: "In 2016, sprinkler position, location, and spacing rules are in which chapter?", c: ["Chapter 9 — Hanging and Bracing", "Chapter 8 — Installation Requirements", "Chapter 11 — Design Approaches", "Chapter 6 — System Components and Hardware"], a: 1, topic: "Sprinklers", why: "In 2016 everything about installing sprinklers — location, spacing, clearance, obstructions — is in Chapter 8. (The 2019 reorganization moved general location to Chapter 9.)" },
  { q: "The beam rule and obstruction-to-discharge criteria are in which 2016 chapter?", c: ["Chapter 8 — Installation Requirements", "Chapter 11 — Design Approaches", "Chapter 6 — System Components and Hardware", "Chapter 4 — General Requirements"], a: 0, topic: "Sprinklers", why: "Obstruction rules are part of Chapter 8 (Installation Requirements) in 2016." },
  { q: "Installation rules for standard pendent, upright, and sidewall spray sprinklers are in which 2016 chapter?", c: ["Chapter 8 — Installation Requirements", "Chapter 6 — System Components and Hardware", "Chapter 7 — System Requirements", "Chapter 11 — Design Approaches"], a: 0, topic: "Sprinklers", why: "In 2016, ALL sprinkler types are installed per Chapter 8. (The 2019 reorganization gave each sprinkler family its own chapter, 10-15.)" },
  { q: "ESFR sprinkler installation requirements are in which 2016 chapter?", c: ["Chapter 14 — Class I-IV Storage", "Chapter 8 — Installation Requirements", "Chapter 17 — Rack Storage of Plastics", "Chapter 7 — System Requirements"], a: 1, topic: "Sprinklers", why: "ESFR sprinkler installation is in Chapter 8 in 2016 (with ESFR storage application within the storage chapters). In 2019+ ESFR install moved to its own Chapter 14." },
  { q: "Residential sprinkler installation requirements are in which 2016 chapter?", c: ["Chapter 8 — Installation Requirements", "Chapter 6 — System Components and Hardware", "Chapter 22 — Special Occupancy", "Chapter 11 — Design Approaches"], a: 0, topic: "Sprinklers", why: "Residential sprinklers (e.g., §8.10 in 2016) are part of Chapter 8. In 2019+ they got their own Chapter 12." },
  { q: "CMSA (control mode specific application / large-drop) sprinkler installation is in which 2016 chapter?", c: ["Chapter 8 — Installation Requirements", "Chapter 6 — System Components and Hardware", "Chapter 16 — Rack Storage Class I-IV", "Chapter 7 — System Requirements"], a: 0, topic: "Sprinklers", why: "All sprinkler-type installation is consolidated in Chapter 8 in 2016." },
  { q: "Temperature ratings and clearance to storage for sprinklers are part of which 2016 chapter?", c: ["Chapter 6 — System Components and Hardware", "Chapter 8 — Installation Requirements", "Chapter 12 — General Requirements for Storage", "Chapter 5 — Classification"], a: 1, topic: "Sprinklers", why: "Temperature selection and clearance are sprinkler installation items — Chapter 8 in 2016." },
  { q: "The single biggest structural feature of the 2016 edition: ALL sprinkler types and ALL location/spacing/obstruction rules are consolidated into which one chapter?", c: ["Chapter 6", "Chapter 8 — Installation Requirements", "Chapter 11 — Design Approaches", "Chapter 7 — System Requirements"], a: 1, topic: "Sprinklers", why: "Chapter 8 in 2016 is one giant 'Installation Requirements' chapter. The 2019 reorganization broke it into the location chapter (9) and a chapter per sprinkler family (10-15)." },

  // ===== Water & piping (Ch 9, 10, 24) =====
  { q: "Hanger types and maximum hanger spacing are in which 2016 chapter?", c: ["Chapter 8 — Installation Requirements", "Chapter 9 — Hanging, Bracing, and Restraint of System Piping", "Chapter 10 — Underground Requirements", "Chapter 6 — System Components and Hardware"], a: 1, topic: "Water & Piping", why: "Chapter 9 covers hanging in 2016 — and it ALSO covers seismic bracing." },
  { q: "Seismic sway bracing is in which 2016 chapter?", c: ["Chapter 18 — Seismic", "Chapter 9 — Hanging, Bracing, and Restraint of System Piping", "Chapter 8 — Installation Requirements", "Chapter 10 — Underground Requirements"], a: 1, topic: "Water & Piping", why: "In 2016, hangers AND seismic bracing share one chapter (9). The 2019 reorganization split them into Chapter 17 (hanging) and Chapter 18 (seismic)." },
  { q: "In 2016, hangers and earthquake bracing are combined into a single chapter — which one?", c: ["Chapter 9 — Hanging, Bracing, and Restraint of System Piping", "Chapter 17 — Hanging and Support", "Chapter 18 — Seismic Protection", "Chapter 8 — Installation Requirements"], a: 0, topic: "Water & Piping", why: "Chapter 9 (Hanging, Bracing, and Restraint of System Piping) does both in 2016." },
  { q: "Requirements for installing buried (underground) piping are in which 2016 chapter?", c: ["Chapter 6 — System Components", "Chapter 10 — Underground Requirements", "Chapter 24 — Water Supplies", "Chapter 8 — Installation Requirements"], a: 1, topic: "Water & Piping", why: "Chapter 10 (Underground Requirements) in 2016 — which became Chapter 6 in the reorganized editions." },
  { q: "Thrust restraint and depth of cover for buried mains are in which 2016 chapter?", c: ["Chapter 10 — Underground Requirements", "Chapter 8 — Installation Requirements", "Chapter 24 — Water Supplies", "Chapter 9 — Hanging and Bracing"], a: 0, topic: "Water & Piping", why: "Underground installation details are in Chapter 10 in 2016." },
  { q: "Water supply requirements (capacity, sources, duration) are in which 2016 chapter?", c: ["Chapter 5 — Classification", "Chapter 24 — Water Supplies", "Chapter 11 — Design Approaches", "Chapter 7 — System Requirements"], a: 1, topic: "Water & Piping", why: "Water Supplies is Chapter 24 in 2016 — near the BACK of the book. The 2019 reorganization moved it to Chapter 5, near the front." },
  { q: "A flow (hydrant) test result supports the requirement in which 2016 chapter?", c: ["Chapter 24 — Water Supplies", "Chapter 23 — Plans and Calculations", "Chapter 11 — Design Approaches", "Chapter 25 — Systems Acceptance"], a: 0, topic: "Water & Piping", why: "Demonstrating an adequate supply is a Chapter 24 (Water Supplies) requirement in 2016." },
  { q: "Aboveground piping, valves, drains, gauges, and the fire department connection are installed per which 2016 chapter?", c: ["Chapter 6 — System Components and Hardware", "Chapter 8 — Installation Requirements", "Chapter 16 — Installation of Piping", "Chapter 10 — Underground Requirements"], a: 1, topic: "Water & Piping", why: "In 2016, system installation — including piping, valves, drains, gauges, and the FDC — is part of the broad Chapter 8. The 2019 reorg moved aboveground piping install to Chapter 16." },

  // ===== Design & storage (Ch 11-21) =====
  { q: "The density/area design method and room design method are in which 2016 chapter?", c: ["Chapter 12 — General Requirements for Storage", "Chapter 11 — Design Approaches", "Chapter 8 — Installation Requirements", "Chapter 23 — Plans and Calculations"], a: 1, topic: "Storage", why: "Chapter 11 (Design Approaches) covers density/area and room design in 2016 — the role Chapter 19 plays in the reorganized editions." },
  { q: "Hose stream allowance and water supply duration tables (for non-storage design) are tied to which 2016 chapter?", c: ["Chapter 24 — Water Supplies", "Chapter 11 — Design Approaches", "Chapter 23 — Plans and Calculations", "Chapter 5 — Classification"], a: 1, topic: "Storage", why: "The density/area design tables with hose/duration are in Chapter 11 (Design Approaches) in 2016." },
  { q: "General storage rules — clearance to storage, idle pallets, and provisions common to all storage — are in which 2016 chapter?", c: ["Chapter 11 — Design Approaches", "Chapter 12 — General Requirements for Storage", "Chapter 13 — Misc and Low-Piled Storage", "Chapter 5 — Classification"], a: 1, topic: "Storage", why: "Chapter 12 (General Requirements for Storage) is the storage umbrella in 2016." },
  { q: "Miscellaneous and low-piled storage is its own chapter in 2016 — which one?", c: ["Chapter 12 — General Requirements for Storage", "Chapter 13 — Protection of Miscellaneous and Low-Piled Storage", "Chapter 20 — Special Designs", "Chapter 14 — Class I-IV Storage"], a: 1, topic: "Storage", why: "Chapter 13 covers misc and low-piled storage in 2016. (In the reorganized editions it folds into Chapter 20.)" },
  { q: "Protection of palletized/solid-piled/shelf storage of Class I through IV commodities is in which 2016 chapter?", c: ["Chapter 16 — Rack Storage Class I-IV", "Chapter 14 — Palletized/Solid-Piled Class I-IV", "Chapter 12 — General Requirements for Storage", "Chapter 15 — Plastics"], a: 1, topic: "Storage", why: "Chapter 14 covers non-rack Class I-IV storage in 2016." },
  { q: "Protection of palletized/solid-piled storage of plastic and rubber commodities is in which 2016 chapter?", c: ["Chapter 14 — Class I-IV", "Chapter 15 — Plastic and Rubber Commodities", "Chapter 17 — Rack Storage of Plastics", "Chapter 20 — Special Designs"], a: 1, topic: "Storage", why: "Chapter 15 covers non-rack plastic/rubber storage in 2016." },
  { q: "Protection of rack storage of Class I through IV commodities is in which 2016 chapter?", c: ["Chapter 14 — Palletized Class I-IV", "Chapter 16 — Rack Storage of Class I-IV", "Chapter 17 — Rack Storage of Plastics", "Chapter 12 — General Storage"], a: 1, topic: "Storage", why: "Chapter 16 covers Class I-IV rack storage in 2016." },
  { q: "Protection of rack storage of plastic and rubber commodities is in which 2016 chapter?", c: ["Chapter 15 — Palletized Plastics", "Chapter 17 — Rack Storage of Plastic and Rubber Commodities", "Chapter 16 — Rack Storage Class I-IV", "Chapter 20 — Special Designs"], a: 1, topic: "Storage", why: "Chapter 17 covers plastic/rubber rack storage in 2016." },
  { q: "In 2016, in-rack sprinkler requirements are found:", c: ["In their own dedicated chapter", "Within the rack-storage chapters (16 and 17)", "In Chapter 8 — Installation Requirements", "In Chapter 11 — Design Approaches"], a: 1, topic: "Storage", why: "2016 has no standalone in-rack chapter — in-rack design is within the rack-storage chapters (16, 17). The reorganized editions created a dedicated in-rack chapter (25)." },
  { q: "Rubber tire storage has its OWN chapter in the 2016 edition — which one?", c: ["Chapter 20 — Special Designs of Storage Protection", "Chapter 18 — Protection of Rubber Tire Storage", "Chapter 16 — Rack Storage Class I-IV", "Chapter 13 — Misc Storage"], a: 1, topic: "Storage", why: "2016 dedicates Chapter 18 to rubber tires. (In 2025 tires fold into special designs.)" },
  { q: "Roll paper storage has its OWN chapter in the 2016 edition — which one?", c: ["Chapter 18 — Rubber Tire Storage", "Chapter 19 — Protection of Roll Paper", "Chapter 20 — Special Designs", "Chapter 14 — Class I-IV Storage"], a: 1, topic: "Storage", why: "2016 dedicates Chapter 19 to roll paper." },
  { q: "Special designs of storage protection are in which 2016 chapter?", c: ["Chapter 20 — Special Designs of Storage Protection", "Chapter 21 — Alternative Designs", "Chapter 13 — Misc Storage", "Chapter 12 — General Storage"], a: 0, topic: "Storage", why: "Chapter 20 (Special Designs of Storage Protection) in 2016." },
  { q: "Alternative sprinkler system designs that can replace the Chapter 12-20 storage schemes are in which 2016 chapter?", c: ["Chapter 20 — Special Designs", "Chapter 21 — Alternative Sprinkler System Designs", "Chapter 11 — Design Approaches", "Chapter 22 — Special Occupancy"], a: 1, topic: "Storage", why: "Chapter 21 gathers alternative storage designs in 2016 (the role Chapter 24 plays in the reorganized editions)." },
  { q: "ESFR protection criteria for rack storage of plastics are found in which 2016 chapter?", c: ["Chapter 8 — Installation Requirements", "Chapter 17 — Rack Storage of Plastic and Rubber Commodities", "Chapter 23 — ESFR for Storage", "Chapter 20 — Special Designs"], a: 1, topic: "Storage", why: "In 2016, each storage chapter contains its CMDA/CMSA/ESFR criteria — plastics rack ESFR is in Chapter 17. (The reorganized editions created a standalone ESFR storage chapter, 23.)" },

  // ===== Plans, acceptance, special occupancy, marine, ITM (Ch 22-27) =====
  { q: "Requirements unique to special occupancies are in which 2016 chapter?", c: ["Chapter 20 — Special Designs of Storage", "Chapter 22 — Special Occupancy Requirements", "Chapter 11 — Design Approaches", "Chapter 5 — Classification"], a: 1, topic: "Plans & Acceptance", why: "Chapter 22 (Special Occupancy Requirements) in 2016 — the role Chapter 27 plays in the reorganized editions." },
  { q: "Working plans and hydraulic calculation requirements are in which 2016 chapter?", c: ["Chapter 11 — Design Approaches", "Chapter 23 — Plans and Calculations", "Chapter 25 — Systems Acceptance", "Chapter 24 — Water Supplies"], a: 1, topic: "Plans & Acceptance", why: "Chapter 23 (Plans and Calculations) in 2016 — the role Chapter 28 plays in the reorganized editions." },
  { q: "The Hazen-Williams calculation procedure and the hydraulic calc forms are part of which 2016 chapter?", c: ["Chapter 23 — Plans and Calculations", "Chapter 24 — Water Supplies", "Chapter 11 — Design Approaches", "Chapter 25 — Systems Acceptance"], a: 0, topic: "Plans & Acceptance", why: "Hydraulic calculation procedures are in Chapter 23 in 2016." },
  { q: "The hydrostatic test (200 psi / 2 hr) and the contractor's material & test certificate are in which 2016 chapter?", c: ["Chapter 23 — Plans and Calculations", "Chapter 25 — Systems Acceptance", "Chapter 27 — Inspection, Testing, and Maintenance", "Chapter 8 — Installation Requirements"], a: 1, topic: "Plans & Acceptance", why: "Acceptance testing is in Chapter 25 (Systems Acceptance) in 2016 — the role Chapter 29 plays in the reorganized editions." },
  { q: "Final acceptance and forward-flow testing steps are documented under which 2016 chapter?", c: ["Chapter 25 — Systems Acceptance", "Chapter 24 — Water Supplies", "Chapter 23 — Plans and Calculations", "Chapter 27 — ITM"], a: 0, topic: "Plans & Acceptance", why: "Acceptance procedures are in Chapter 25 in 2016." },
  { q: "Sprinkler systems on marine vessels are addressed in which 2016 chapter?", c: ["Chapter 22 — Special Occupancy", "Chapter 26 — Marine Systems", "Chapter 20 — Special Designs", "Chapter 27 — ITM"], a: 1, topic: "Plans & Acceptance", why: "Chapter 26 (Marine Systems) in 2016 — the role Chapter 31 plays in the reorganized editions." },
  { q: "Inspection, testing, and maintenance provisions within NFPA 13 are in which 2016 chapter (with ongoing ITM governed by NFPA 25)?", c: ["Chapter 25 — Systems Acceptance", "Chapter 27 — System Inspection, Testing, and Maintenance", "Chapter 22 — Special Occupancy", "Chapter 4 — General Requirements"], a: 1, topic: "Plans & Acceptance", why: "Chapter 27 carries ITM in 2016 (Chapter 32 in the reorganized editions); routine in-service ITM is governed by NFPA 25." },

  // ===== Edition-contrast orientation =====
  { q: "Compared with the single 2016 Chapter 8, the 2019 reorganization split sprinkler installation into:", c: ["A location chapter plus one chapter per sprinkler family (Ch 9-15)", "A single bigger chapter", "The storage chapters", "Chapter 5"], a: 0, topic: "Sprinklers", why: "The 2019 reorganization broke the monolithic 2016 Chapter 8 into Chapter 9 (Sprinkler Location) and Chapters 10-15 (one per sprinkler family)." },
  { q: "Water supplies moved from Chapter 24 (2016) to which chapter in the reorganized editions?", c: ["Chapter 5", "Chapter 24", "Chapter 19", "Chapter 8"], a: 0, topic: "Water & Piping", why: "Water Supplies moved from the back (Ch 24, 2016) to the front (Ch 5) in the 2019+ reorganization." },
  { q: "In 2016 hangers and seismic share Chapter 9; in the reorganized editions they became:", c: ["Chapter 17 (hanging) and Chapter 18 (seismic)", "One combined chapter", "Chapter 9 still", "Chapter 8"], a: 0, topic: "Water & Piping", why: "The reorganization split 2016 Chapter 9 into Chapter 17 (Hanging and Support) and Chapter 18 (Seismic Protection)." },
];

/* Editions map — 2019/2022/2025 share the reorganized bank; 2016 is its own. */
window.NFPA_STUDY_EDITIONS = {
  "2025": { label: "NFPA 13, 2025 edition", chapters: window.NFPA_STUDY_CHAPTERS, questions: window.NFPA_STUDY_QUESTIONS },
  "2022": { label: "NFPA 13, 2022 edition", chapters: window.NFPA_STUDY_CHAPTERS, questions: window.NFPA_STUDY_QUESTIONS },
  "2019": { label: "NFPA 13, 2019 edition", chapters: window.NFPA_STUDY_CHAPTERS, questions: window.NFPA_STUDY_QUESTIONS },
  "2016": { label: "NFPA 13, 2016 edition", chapters: window.NFPA_STUDY_CHAPTERS_2016, questions: window.NFPA_STUDY_QUESTIONS_2016 },
};
