/* ============================================================================
 * SprinkFlow — Zero to NFPA 13D Designer: course content
 *
 * Beginner course for someone who knows NOTHING about fire sprinklers.
 * Design brief: mobile-first, interactive, ADD-friendly. One idea per screen,
 * short punchy beats, tap/drag interactions, immediate feedback.
 *
 * Ordering is JUMP-IN-FIRST: Level 1 is a hands-on spacing playground before
 * any theory. The rules are named in Level 2 *after* the learner has already
 * bumped into them.
 *
 * Content source of truth: the owner's beginner-13d-course.md outline. Any
 * number taught here (coverage, wall distances, deflector depths, omission
 * areas, temperature ranges) traces back to that outline.
 *
 * Beat kinds:
 *   say   - teaching beat: headline + short body + optional pills + optional art
 *   quiz  - multiple choice, instant feedback
 *   lab   - the spacing playground (drag real sprinklers onto a real ceiling)
 *   kf    - K-factor explorer (Q = K x sqrt(P)) with a target to hit
 *   defl  - deflector-depth slider with a listed pass band
 *   parts - tap-the-part sprinkler anatomy hotspot
 *   omit  - sprinkle-it-or-skip-it room sorter (13D omissions)
 *
 * UMD global: Course13D
 * ========================================================================== */
(function (global) {
  "use strict";

  var LEVELS = [
    /* ---------------------------------------------------------------- L1 */
    {
      id: "l1-hands-on",
      icon: "🎯",
      title: "Drop Your First Sprinklers",
      tag: "Hands on",
      blurb: "No theory. Here is a ceiling — cover it.",
      beats: [
        {
          k: "say", id: "l1-b1",
          h: "Skip the theory.",
          p: "You are going to lay out sprinklers in the next 30 seconds. We will explain what you did afterwards.",
          pills: ["Drag → place", "Green = good", "Red = fix it"]
        },
        {
          k: "lab", id: "l1-lab1",
          name: "Bedroom", w: 12, h: 15, s: 16, max: 1,
          brief: "Drag the sprinkler off the tray and cover the whole room."
        },
        {
          k: "say", id: "l1-b2",
          h: "That was the job.",
          p: "The square around your head is the area it is listed to protect — 16 ft by 16 ft. The room fit inside one.",
          art: "square",
          pills: ["1 head", "16 × 16 coverage"]
        },
        {
          k: "lab", id: "l1-lab2",
          name: "Living room", w: 14, h: 18, s: 16, max: 2,
          brief: "18 ft is longer than the 16 ft coverage. One head cannot reach. Use two."
        },
        {
          k: "say", id: "l1-b3",
          h: "Notice what it stopped you doing.",
          p: "It went red when you slid the two heads close together. There is a minimum gap. Level 2 explains why.",
          pills: ["Min gap: 8 ft", "Why? Level 2"]
        },
        {
          k: "lab", id: "l1-lab3",
          name: "Long room", w: 13, h: 22, s: 16, max: 2,
          brief: "Narrow and long. Two heads down the middle — keep them 8 ft apart."
        },
        {
          k: "say", id: "l1-b4",
          h: "You just did head layout.",
          p: "Every sprinkler job on earth starts with that exact question: where do the heads go?",
          pills: ["3 rooms done", "Now the rules"]
        }
      ]
    },

    /* ---------------------------------------------------------------- L2 */
    {
      id: "l2-rules",
      icon: "📏",
      title: "The 3 Rules You Just Used",
      tag: "Core rules",
      blurb: "Names for the things the playground was checking.",
      beats: [
        {
          k: "say", id: "l2-b1",
          h: "Rule 1: half to the wall.",
          p: "Max distance from a head to a wall is HALF its listed spacing.",
          art: "halfwall",
          pills: ["16 × 16 → 8 ft max", "20 × 20 → 10 ft max"]
        },
        {
          k: "quiz", id: "l2-q1",
          q: "A sprinkler is applied at 18 ft × 18 ft. Max distance to a wall?",
          a: ["18 ft", "12 ft", "9 ft", "6 ft"],
          correct: 2,
          why: "Half the applied spacing. 18 ÷ 2 = 9 ft."
        },
        {
          k: "say", id: "l2-b2",
          h: "Rule 2: 4 inches minimum.",
          p: "Never closer than 4 in to a wall. Any tighter and the wall wrecks the spray before it forms.",
          pills: ["4 in minimum", "Too close = bad pattern"]
        },
        {
          k: "say", id: "l2-b3",
          h: "Rule 3: 8 feet apart.",
          p: "Residential heads stay at least 8 ft from each other.",
          art: "coldsolder",
          pills: ["8 ft minimum", "Fix: a baffle"]
        },
        {
          k: "say", id: "l2-b4",
          h: "The reason is cold soldering.",
          p: "The first head to open sprays its neighbour, cools that bulb, and the neighbour never opens.",
          pills: ["Spray cools the bulb", "Neighbour stays shut"]
        },
        {
          k: "quiz", id: "l2-q2",
          q: "Why is there a minimum distance between residential sprinklers?",
          a: [
            "To save money on heads",
            "Cold soldering — one head's spray cools the next head's bulb",
            "So the spray patterns never overlap"
          ],
          correct: 1,
          why: "Spray from an operating head wets and cools an adjacent bulb, delaying or preventing it. 8 ft apart, or a baffle between."
        },
        {
          k: "say", id: "l2-b5",
          h: "Where does 16 × 16 come from?",
          p: "Not from a code table. From the sprinkler's own listing. Each residential head is listed for a set of coverage areas.",
          pills: ["12 × 12", "16 × 16", "up to 20 × 20"]
        },
        {
          k: "say", id: "l2-b6",
          h: "The listing is the law.",
          p: "The data sheet gives a minimum flow and pressure for each coverage. Bigger coverage = more water needed.",
          pills: ["Pick head", "Pick coverage", "Place", "Check"]
        },
        {
          k: "quiz", id: "l2-q3",
          q: "A room is 13 ft × 22 ft. At 16 × 16 coverage, how many sprinklers?",
          a: ["One", "Two", "Three", "Four"],
          correct: 1,
          why: "13 ft fits under 16. 22 ft does not — so the long direction takes two heads, each within 8 ft of its wall and at least 8 ft apart. You built this one in Level 1."
        }
      ]
    },

    /* ---------------------------------------------------------------- L3 */
    {
      id: "l3-what-is-it",
      icon: "🔥",
      title: "What A Sprinkler Actually Is",
      tag: "Basics",
      blurb: "It is a heat-activated valve. That is the whole trick.",
      beats: [
        {
          k: "say", id: "l3-b1",
          h: "It is a plug in a pipe.",
          p: "Water sits behind a plug. A heat-sensitive glass bulb holds the plug in. Heat breaks the bulb, the plug drops, water sprays.",
          art: "sprinkler",
          pills: ["Water waiting", "Bulb holds it", "Heat releases it"]
        },
        {
          k: "quiz", id: "l3-q1",
          q: "What sets a sprinkler off?",
          a: ["Smoke", "Heat", "A signal from the alarm panel", "All of them fire together"],
          correct: 1,
          why: "Only heat at the sprinkler's rated temperature. Smoke never does it, and each head operates on its own."
        },
        {
          k: "say", id: "l3-b2",
          h: "Kill the movie myth.",
          p: "They do not all go off at once. Only heads actually heated by the fire open. In home fires one head usually does the job.",
          pills: ["One head, usually", "Never all at once"]
        },
        {
          k: "parts", id: "l3-parts" },
        {
          k: "quiz", id: "l3-q2",
          q: "Which part decides whether a head is a pendent, an upright, or a sidewall?",
          a: ["The frame", "The orifice", "The deflector", "The glass bulb"],
          correct: 2,
          why: "The deflector's shape is what throws the water into its pattern. Change the deflector, change the sprinkler type."
        }
      ]
    },

    /* ---------------------------------------------------------------- L4 */
    {
      id: "l4-orientation",
      icon: "🔻",
      title: "Which Way Does It Point?",
      tag: "Terminology",
      blurb: "Pendent, upright, sidewall, concealed — and how deep the deflector sits.",
      beats: [
        {
          k: "say", id: "l4-b1",
          h: "Pendent hangs down.",
          p: "Deflector below the pipe, spraying down. The standard pick under a finished ceiling — most of a house.",
          art: "pendent",
          pills: ["Hangs below", "Finished ceilings"]
        },
        {
          k: "say", id: "l4-b2",
          h: "Upright sits on top.",
          p: "Deflector above the pipe, throwing down and out. Used where the pipe runs below an exposed deck.",
          art: "upright",
          pills: ["Sits above", "Unfinished spaces"]
        },
        {
          k: "say", id: "l4-b3",
          h: "Sidewall comes off the wall.",
          p: "Mounted on a wall near the ceiling, throwing water out across the room. Handy when you cannot get pipe into the ceiling.",
          art: "sidewall",
          pills: ["Wall mounted", "Throws across"]
        },
        {
          k: "say", id: "l4-b4",
          h: "Concealed is a hidden pendent.",
          p: "A flat cover plate hides it. The plate drops off at a temperature BELOW the sprinkler's rating so the head can do its job.",
          pills: ["Cover plate", "Plate drops first", "Popular in homes"]
        },
        {
          k: "quiz", id: "l4-q1",
          q: "Finished drywall ceiling in a bedroom. Which orientation is the default?",
          a: ["Upright", "Pendent", "Sidewall"],
          correct: 1,
          why: "Pendent — it hangs below the ceiling with the deflector pointing down. That is most of a house."
        },
        {
          k: "quiz", id: "l4-q2",
          q: "You cannot get pipe into the ceiling of a small bathroom. What now?",
          a: [
            "Sidewall off the wall near the ceiling",
            "Upright below the ceiling",
            "Install a pendent upside down"
          ],
          correct: 0,
          why: "A sidewall serves the room from one wall. And never install a head in an orientation it is not listed for — the pattern fails."
        },
        {
          k: "say", id: "l4-b5",
          h: "Height matters too.",
          p: "The deflector needs the right vertical spot, not just the right x and y.",
          pills: ["Too low = late", "Too low = bad pattern"]
        },
        {
          k: "defl", id: "l4-d1",
          kind: "Pendent", lo: 1, hi: 4,
          brief: "Set a residential pendent deflector below the ceiling. Typical listed range is 1 to 4 in."
        },
        {
          k: "defl", id: "l4-d2",
          kind: "Sidewall", lo: 4, hi: 6,
          brief: "Now a sidewall. These sit deeper — typically 4 to 6 in below the ceiling."
        },
        {
          k: "say", id: "l4-b6",
          h: "Hang it too low and it is late.",
          p: "Hot gas pools above the deflector instead of hitting it, so the head is slow. Common plan-review comment.",
          pills: ["Deep escutcheons", "Soffits", "Check the data sheet"]
        }
      ]
    },

    /* ---------------------------------------------------------------- L5 */
    {
      id: "l5-kfactor",
      icon: "🧮",
      title: "K-Factor: Your First Formula",
      tag: "Numbers",
      blurb: "One equation connects pressure to flow.",
      beats: [
        {
          k: "say", id: "l5-b1",
          h: "Q = K × √P",
          p: "Flow in gpm equals the sprinkler's K-factor times the square root of the pressure at the head in psi.",
          art: "kformula",
          pills: ["Q = gpm", "K = the orifice", "P = psi"]
        },
        {
          k: "kf", id: "l5-kf1",
          K: 4.9, targetQ: 19.6,
          brief: "K = 4.9 residential pendent. Drag the pressure until it flows 19.6 gpm."
        },
        {
          k: "say", id: "l5-b2",
          h: "Bigger K, more water.",
          p: "Same pressure, bigger orifice, more gpm. Common residential K-factors run about 3.0 to 5.8.",
          pills: ["K 3.0 – 5.8", "Straight off the data sheet"]
        },
        {
          k: "quiz", id: "l5-q1",
          q: "K = 5.6 and 25 psi at the head. What is the flow?",
          a: ["14 gpm", "28 gpm", "140 gpm", "5.6 gpm"],
          correct: 1,
          why: "Q = K × √P = 5.6 × √25 = 5.6 × 5 = 28 gpm."
        },
        {
          k: "kf", id: "l5-kf2",
          K: 5.6, targetQ: 28,
          brief: "Prove it. K = 5.6 — find the pressure that gives 28 gpm."
        },
        {
          k: "say", id: "l5-b3",
          h: "That is your bridge.",
          p: "K-factor is where layout hands off to hydraulics. Your heads pick the demand; the water supply has to meet it.",
          pills: ["Layout → demand", "Demand → supply check"],
          /* CFC 6.2.4 (new): shared domestic + fire supply adds 5 gpm */
          ca: {
            p: "K-factor is where layout hands off to hydraulics. In California, a supply shared with domestic adds 5 gpm to your sprinkler demand at the connection point.",
            pills: ["Layout → demand", "CA: +5 gpm on a shared supply", "Multipurpose: splittable 2.5 + 2.5"]
          }
        }
      ]
    },

    /* ---------------------------------------------------------------- L6 */
    {
      id: "l6-alphabet",
      icon: "📕",
      title: "13, 13R or 13D?",
      tag: "The alphabet",
      blurb: "Three standards in one family. Know which one you are in.",
      beats: [
        {
          k: "say", id: "l6-b1",
          h: "Same family, different jobs.",
          p: "NFPA 13 is the big general standard. 13R covers low-rise residential occupancies. 13D covers houses.",
          art: "alphabet",
          pills: ["13 = everything else", "13R = low-rise residential", "13D = houses"]
        },
        {
          k: "say", id: "l6-b2",
          h: "13D is one- and two-family.",
          p: "One- and two-family dwellings, and manufactured homes. That is the scope of this whole course.",
          pills: ["1 & 2 family dwellings", "Manufactured homes"]
        },
        {
          k: "say", id: "l6-b3",
          h: "13D is a life-safety standard.",
          p: "The goal is that people get out alive. Saving the building is a bonus, not the mission.",
          pills: ["Get people out", "Property = bonus"]
        },
        {
          k: "quiz", id: "l6-q1",
          q: "What is the primary goal of an NFPA 13D system?",
          a: [
            "Protecting the building's structure",
            "Replacing smoke alarms",
            "Life safety — giving occupants time to escape",
            "Eliminating fire department response"
          ],
          correct: 2,
          why: "13D is life safety. Residential sprinklers are designed to hold off flashover long enough for people to get out."
        },
        {
          k: "quiz", id: "l6-q2",
          q: "You are designing sprinklers for a single-family house. Which standard?",
          a: ["NFPA 13", "NFPA 13R", "NFPA 13D"],
          correct: 2,
          why: "13D. And do not carry 13D habits into 13R or 13 work — those are stricter."
        },
        {
          k: "say", id: "l6-b4",
          h: "13D uses residential sprinklers.",
          p: "That is a specific listing category. Fast-response, and the pattern deliberately wets the walls high to stop flashover.",
          pills: ["Fast response", "Wets walls high", "A listing, not a style"]
        },
        {
          k: "say", id: "l6-b5",
          h: "Temperature ratings.",
          p: "Most heads are ordinary temperature, 135 to 170 °F. Near a heat source you step up to intermediate, 175 to 225 °F.",
          pills: ["Ordinary 135–170 °F", "Intermediate 175–225 °F"]
        },
        {
          k: "quiz", id: "l6-q3",
          q: "A head goes right beside a skylight above a kitchen range. Which rating?",
          a: [
            "Ordinary, 135–170 °F",
            "Intermediate, 175–225 °F",
            "Rating does not matter near heat"
          ],
          correct: 1,
          why: "Ranges, fireplaces, skylights and attic-adjacent spaces run hot. Step up to intermediate so normal heat does not trip the head."
        }
      ]
    },

    /* ---------------------------------------------------------------- L7 */
    {
      id: "l7-omissions",
      icon: "🚪",
      title: "Sprinkle It Or Skip It",
      tag: "13D only",
      blurb: "13D lets you leave some spaces bare. Know exactly which.",
      beats: [
        {
          k: "say", id: "l7-b1",
          h: "13D lets you skip rooms.",
          p: "Because the mission is life safety, several spaces can go without a head. This is a big 13D-versus-13 difference.",
          pills: ["Verify your edition", "AHJ can strike these"],
          ca: {
            h: "California trims the skip list.",
            p: "Most base 13D omissions still stand, but California amends several of them. The one that catches people out is garages.",
            pills: ["CFC amendments ON", "Detached ≠ attached", "AHJ still wins"]
          }
        },
        { k: "omit", id: "l7-omit" },
        {
          /* Owner-critical: base 13D omits garages outright; the CFC amendment
             exempts only DETACHED garages, so an attached garage gets heads. */
          k: "quiz", id: "l7-qgarage",
          q: "A two-car garage attached to the house, nothing habitable above. Sprinklers?",
          a: [
            "No — garages are on the 13D omission list",
            "Yes — an attached garage still gets heads",
            "Only if there is a bedroom above it"
          ],
          correct: 0,
          why: "Base NFPA 13D permits omitting sprinklers in garages, carports and open attached porches. Attached or detached, the base standard treats them the same.",
          ca: {
            q: "California job. A two-car garage ATTACHED to the house, nothing habitable above. Sprinklers?",
            a: [
              "No — garages are exempt in California too",
              "Yes — California exempts only DETACHED garages",
              "Only if there is a bedroom above it"
            ],
            correct: 1,
            why: "The California amendment reads: sprinklers shall not be required in detached garages, open attached porches, carports with no habitable space above, and similar structures. An attached garage is not on that list — so it gets sprinklers."
          }
        },
        {
          k: "say", id: "l7-b2",
          h: "Two warnings.",
          p: "These are 13D allowances only — 13R and 13 are stricter. And local amendments can delete them.",
          pills: ["Do not reuse on 13R/13", "When AHJ differs, AHJ wins"],
          /* CFC 8.3.11 / 8.3.11.1 (new): solar PV omissions */
          ca: {
            h: "California gives one back.",
            p: "The amendments cut the garage exemption down to detached only — but they also let you omit sprinklers under solar PV structures with no use underneath, and under arrays with enough unobstructed opening for heat and gas to escape.",
            pills: ["Detached garages only", "Solar PV omissions", "Signage per the AHJ"]
          }
        },
        {
          k: "quiz", id: "l7-q1",
          q: "Which space can typically go without a sprinkler under NFPA 13D?",
          a: ["A kitchen", "A bedroom", "A 50 sq ft bathroom", "A hallway serving bedrooms"],
          correct: 2,
          why: "13D permits omitting bathrooms of 55 sq ft or less. Kitchens, bedrooms and hallways are always protected."
        }
      ]
    },

    /* ---------------------------------------------------------------- L8 */
    {
      id: "l8-obstructions",
      icon: "🪵",
      title: "Beams, Fans & Slopes",
      tag: "Real houses",
      blurb: "Real ceilings are not flat empty boxes.",
      beats: [
        {
          k: "say", id: "l8-b1",
          h: "Build one reflex.",
          p: "Anything hanging below the ceiling is an obstruction until proven otherwise.",
          art: "beam",
          pills: ["Beams", "Soffits", "Cabinet runs", "Fans"]
        },
        {
          k: "say", id: "l8-b2",
          h: "Obstructions are geometry.",
          p: "The rules trade depth against horizontal distance. The farther the head sits from the obstruction, the deeper the obstruction may be.",
          pills: ["Depth vs distance", "It is a table, not a vibe"]
        },
        {
          k: "quiz", id: "l8-q1",
          q: "A deep beam crosses a family room ceiling. Correct beginner move?",
          a: [
            "Ignore it if it looks small",
            "Always add a head each side of any beam",
            "Check its depth and distance against the obstruction rules before finalising",
            "Move every head to the walls as sidewalls"
          ],
          correct: 2,
          why: "Sometimes the beam is fine, sometimes you relocate or add a head. Check, do not guess."
        },
        {
          k: "say", id: "l8-b3",
          h: "Sloped ceilings.",
          p: "Many standard residential listings cover slopes up to 8:12. Steeper needs a specifically listed sprinkler.",
          art: "slope",
          pills: ["Up to 8:12, typically", "Measure along the ceiling"]
        },
        {
          k: "say", id: "l8-b4",
          h: "Heat collects at the ridge.",
          p: "On a slope, spacing is measured along the ceiling plane, and the high point gets extra attention.",
          pills: ["Ridge = hot", "Most listing-dependent area there is"]
        },
        {
          k: "quiz", id: "l8-q2",
          q: "The homeowner wants a ceiling fan under a sprinkler. What do you do?",
          a: [
            "Ignore it — fans are always exempt",
            "Treat it as a check-the-table moment; the allowance is edition-dependent",
            "Refuse the fan"
          ],
          correct: 1,
          why: "There is a common allowance for limited paddle diameters under certain conditions, but the specifics move between editions. Check it."
        }
      ]
    },

    /* ---------------------------------------------------------------- L9 */
    {
      id: "l9-final",
      icon: "🏆",
      title: "Final: Lay Out The Big Room",
      tag: "Finale",
      blurb: "Everything at once. Pass this and you are done.",
      beats: [
        {
          k: "say", id: "l9-b1",
          h: "The rhythm of every layout.",
          p: "Pick the head. Pick the coverage. Place it. Check the minimums. Check the height. Scan for obstructions. Hand off to calcs.",
          pills: ["Pick", "Cover", "Place", "Check", "Hand off"]
        },
        {
          k: "lab", id: "l9-lab1",
          name: "Great room", w: 20, h: 24, s: 16, max: 4,
          brief: "Both directions beat 16 ft. You need a grid — four heads, no violations."
        },
        {
          k: "say", id: "l9-b2",
          h: "Now change the sprinkler.",
          p: "Same style of room, but a head listed for 20 × 20. Bigger coverage reaches 10 ft to a wall — and demands more water.",
          pills: ["20 × 20 listed", "10 ft to a wall", "More flow needed"]
        },
        {
          k: "lab", id: "l9-lab2",
          name: "Great room, bigger head", w: 24, h: 26, s: 20, max: 4,
          brief: "A bigger room, but a longer reach. Still four heads — and still 8 ft apart minimum."
        },
        {
          k: "say", id: "l9-b3",
          h: "You can answer question one.",
          p: "Where do the heads go? You have the vocabulary, the spacing rules, the vertical rule and the obstruction reflex.",
          pills: ["Question 1: solved"]
        }
      ]
    }
  ];

  /* ---- sprinkler anatomy hotspot (Level 3) ---------------------------- */
  var PARTS = [
    { id: "deflector", label: "Deflector", ask: "the deflector", why: "The shaped plate that breaks the stream into a spray pattern. Its design is what makes a head pendent, upright or sidewall." },
    { id: "bulb", label: "Thermal element", ask: "the thermal element", why: "The glass bulb (or fusible link) that holds everything shut until it hits its rated temperature." },
    { id: "orifice", label: "Orifice", ask: "the orifice", why: "The opening water discharges through. Its size is what the K-factor describes." },
    { id: "frame", label: "Frame", ask: "the frame", why: "The metal body that threads into the pipe fitting and carries the whole assembly." }
  ];

  /* ---- 13D omission sorter (Level 7) ---------------------------------- */
  var OMIT_ROOMS = [
    { name: "Bathroom", detail: "45 sq ft, no tub", omit: true,
      why: "13D permits omitting bathrooms of 55 sq ft or less." },
    { name: "Bedroom", detail: "11 × 12", omit: false,
      why: "Bedrooms are always protected — people sleep there. That is the whole point of 13D." },
    { name: "Linen closet", detail: "18 sq ft, 2 ft 6 in deep", omit: true,
      why: "Small closets and pantries of 24 sq ft or less with the least dimension not over 3 ft can be omitted (surface conditions apply)." },
    { name: "Attached garage", detail: "2 car, no living space above", omit: true,
      why: "Garages, carports and open attached porches are on the 13D omission list.",
      /* CFC amendment: only DETACHED garages are exempt in California */
      ca: { omit: false,
        why: "California exempts only DETACHED garages, open attached porches and carports with no habitable space above. An attached garage is not on that list, so it gets sprinklers." } },
    { name: "Kitchen", detail: "12 × 14", omit: false,
      why: "Kitchens get sprinklers. Watch the temperature rating near the range." },
    { name: "Hallway", detail: "Serves the bedrooms", omit: false,
      why: "That hallway is the escape route out of the bedrooms. Always protected." },
    { name: "Attic", detail: "Unused, no fuel-fired equipment", omit: true,
      why: "Attics, crawl spaces and concealed spaces not used for living and with no fuel-fired equipment can be omitted." },
    { name: "Walk-in pantry", detail: "40 sq ft", omit: false,
      why: "Over the 24 sq ft closet/pantry limit, so it gets a head. Measure before you assume." }
  ];

  /* ---- California Fire Code amendment overlay --------------------------
   * Any beat (or omission room) carrying a `ca` block has a California
   * variant. With the toggle ON the `ca` fields shallow-override the base
   * fields; with it OFF the learner sees pure NFPA 13D. The beat COUNT never
   * changes with the toggle, so progress accounting stays stable either way.
   * -------------------------------------------------------------------- */
  function applyCA(obj, on) {
    if (!on || !obj || !obj.ca) return obj;
    var out = {}, k;
    for (k in obj) if (Object.prototype.hasOwnProperty.call(obj, k)) out[k] = obj[k];
    for (k in obj.ca) if (Object.prototype.hasOwnProperty.call(obj.ca, k)) out[k] = obj.ca[k];
    return out;
  }
  function isCA(obj) { return !!(obj && obj.ca); }
  function caRooms(on) {
    return OMIT_ROOMS.map(function (r) { return applyCA(r, on); });
  }
  /* every beat the toggle rewrites, for reporting/verification */
  function caBeatIds() {
    var out = [];
    LEVELS.forEach(function (l) {
      l.beats.forEach(function (b) {
        if (b.ca) out.push(b.id);
        else if (b.k === "omit" && OMIT_ROOMS.some(isCA)) out.push(b.id);
      });
    });
    return out;
  }

  /* ---- progress helpers ------------------------------------------------ */
  function levelById(id) {
    for (var i = 0; i < LEVELS.length; i++) if (LEVELS[i].id === id) return LEVELS[i];
    return null;
  }
  function totalBeats() {
    var n = 0;
    for (var i = 0; i < LEVELS.length; i++) n += LEVELS[i].beats.length;
    return n;
  }
  function levelDone(level, done) {
    for (var i = 0; i < level.beats.length; i++) if (!done[level.beats[i].id]) return false;
    return true;
  }
  function levelCount(level, done) {
    var n = 0;
    for (var i = 0; i < level.beats.length; i++) if (done[level.beats[i].id]) n++;
    return n;
  }
  function courseDone(done) {
    for (var i = 0; i < LEVELS.length; i++) if (!levelDone(LEVELS[i], done)) return false;
    return true;
  }

  global.Course13D = {
    version: 1,
    courseId: "beginner-design-13d",
    levels: LEVELS,
    parts: PARTS,
    omitRooms: OMIT_ROOMS,
    applyCA: applyCA,
    isCA: isCA,
    caRooms: caRooms,
    caBeatIds: caBeatIds,
    levelById: levelById,
    totalBeats: totalBeats,
    levelDone: levelDone,
    levelCount: levelCount,
    courseDone: courseDone
  };
  if (typeof module !== "undefined" && module.exports) module.exports = global.Course13D;
})(typeof self !== "undefined" ? self : (typeof globalThis !== "undefined" ? globalThis : this));
