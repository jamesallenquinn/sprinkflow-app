/* ============================================================================
 * SprinkFlow — Learn Hydraulic Calcs: course content + quiz engine
 * Ported from the Codex TypeScript module (hydraulicCalcCourse.ts +
 * hydraulicQuizEngine.ts). Content is the single source of truth; scoring and
 * unlock logic are preserved exactly. Each lesson has teaching `sections`
 * (lesson-first flow) plus its quiz `questions`. UMD global `HydraulicCourse`.
 * ========================================================================== */
(function (global) {
  "use strict";
  
  var LESSONS = [
    {
      "id": "tree-basics",
      "title": "Tree Systems And Flow Accumulation",
      "outcome": "Learner can trace a non-looped system from remote sprinklers back to the source.",
      "unlockScore": 70,
      "concept": "Meet the four-head system we calculate together through this whole course, and learn the one property that makes its calc walkable: every sprinkler has exactly one path back to the supply.",
      "sections": [
        {
                "id": "meet-the-system",
                "title": "Meet the system we'll calculate",
                "body": "This is the exact system we calculate together through this whole course: four sprinklers (H1-H4) on two branch lines, a cross main, a riser, and the water supply. By the last level you'll have followed a complete hydraulic calc through it, number by number.",
                "keyPoints": [
                        "H1 is the sprinkler farthest from the supply - keep an eye on it.",
                        "Every level of this course works on this same system.",
                        "Nothing here is abstract: every rule gets applied to these pipes."
                ],
                "diagram": {
                        "labels": {
                                "t-h1": "most remote",
                                "t-riser": "from supply"
                        },
                        "caption": "Our example: 4 heads, 2 branch lines, one cross main, one riser."
                },
                "checkQuestionIds": []
        },
        {
                "id": "tree-what-it-is",
                "title": "It's a tree: one path back to the supply",
                "body": "Trace from any sprinkler back to the riser - there is exactly one route. That makes this a tree system. Because water can't take two parallel paths, the calc never has to decide how flow splits. It can simply start at the far end and add flows together while walking toward the supply.",
                "diagram": {
                        "focus": [
                                "n-h1"
                        ],
                        "flow": [
                                "p-b1a",
                                "p-b1b",
                                "p-cm2",
                                "p-cm1"
                        ],
                        "labels": {
                                "t-h1": "start here"
                        },
                        "caption": "H1's only route to the supply - highlighted. Every head has exactly one."
                },
                "keyPoints": [
                        "One route per sprinkler = a tree.",
                        "Flows simply accumulate as branches join.",
                        "No loops means no balancing - yet."
                ],
                "checkQuestionIds": [
                        "tree-001",
                        "tree-002"
                ]
        },
        {
                "id": "tree-node-rule",
                "title": "The node rule (water is bookkeeping)",
                "body": "Every junction has to balance: what flows in must equal what flows out plus whatever discharges there. Stand at the tee where H2 meets the branch line: if 150 gpm arrived and a sprinkler at that tee discharged 42 gpm, the pipe continuing on carries exactly 108 gpm. The whole calc is this bookkeeping, repeated.",
                "formula": "flow in = flow out + discharge at the node",
                "diagram": {
                        "focus": [
                                "n-h2"
                        ],
                        "flow": [
                                "p-b1a",
                                "p-b1b"
                        ],
                        "labels": {
                                "t-h2": "a junction must balance"
                        },
                        "caption": "At H2's tee: inflow = outflow + H2's own discharge."
                },
                "keyPoints": [
                        "Conservation of mass - nothing more.",
                        "A junction with no outlet: inflow equals outflow.",
                        "A sprinkler node removes its discharge from the pipe."
                ],
                "checkQuestionIds": [
                        "tree-003",
                        "tree-005"
                ]
        },
        {
                "id": "tree-calculation-order",
                "title": "Why the calc starts at H1 and walks backward",
                "body": "The calc begins at the most remote sprinkler - H1 - because that head needs the most help: every foot of pipe between it and the supply costs pressure. Starting there and walking toward the riser, each segment's flow is just the running total of the heads behind it. That backward walk only works because this is a tree.",
                "diagram": {
                        "focus": [
                                "n-h1",
                                "n-riser"
                        ],
                        "flow": [
                                "p-b1a",
                                "p-b1b",
                                "p-cm2",
                                "p-cm1"
                        ],
                        "labels": {
                                "t-h1": "calc starts here",
                                "t-riser": "ends here"
                        },
                        "caption": "Remote head to riser: the direction every tree calc walks."
                },
                "keyPoints": [
                        "Most remote head = hydraulically most demanding.",
                        "Each pipe carries the sum of all heads downstream of it.",
                        "Add a loop and this simple walk breaks - that's Level 4."
                ],
                "checkQuestionIds": [
                        "tree-004"
                ]
        },
        {
                "id": "tree-ready",
                "title": "Ready: next we put real numbers on H1",
                "body": "You now know the shape of the calc: start remote, respect the node rule, accumulate toward the supply. In the next level we stop talking and start calculating - H1 gets a pressure, a flow, and the first row of a real calc sheet.",
                "diagram": {
                        "focus": [
                                "n-h1"
                        ],
                        "labels": {
                                "t-h1": "next: Q = K x sqrt(P)"
                        },
                        "caption": "Level 2 computes this head's actual discharge."
                },
                "keyPoints": [
                        "Level 2: sprinkler discharge, with our system's real numbers.",
                        "Checkpoints along the way earn this level's badge."
                ],
                "checkQuestionIds": []
        }
],
      "questions": [
        {
          "id": "tree-001",
          "level": "tree-basics",
          "difficulty": "apprentice",
          "prompt": "In a tree sprinkler layout, why can the program usually add flows as it moves back toward the riser?",
          "choices": [
            "Because each flowing sprinkler has only one path back to the supply.",
            "Because every sprinkler in a tree has the same pressure.",
            "Because friction loss is ignored until the riser.",
            "Because the largest pipe always controls all branch flow."
          ],
          "answerIndex": 0,
          "explanation": "A tree system has no closed hydraulic loops. Once the active sprinklers are known, flow in each downstream pipe is the sum of the outlets beyond that pipe.",
          "teaches": [
            "single path",
            "flow accumulation"
          ]
        },
        {
          "id": "tree-002",
          "level": "tree-basics",
          "difficulty": "designer",
          "prompt": "Three sprinklers on a branch discharge 31 gpm, 34 gpm, and 37 gpm. What flow is carried by the branch segment immediately upstream of all three?",
          "choices": [
            "37 gpm",
            "68 gpm",
            "102 gpm",
            "Cannot be known in a tree system"
          ],
          "answerIndex": 2,
          "explanation": "In a tree branch, the upstream segment carries the sum of all downstream discharge: 31 + 34 + 37 = 102 gpm.",
          "calculationNote": "31 + 34 + 37 = 102 gpm",
          "teaches": [
            "segment flow",
            "upstream accumulation"
          ]
        },
        {
          "id": "tree-003",
          "level": "tree-basics",
          "difficulty": "designer",
          "prompt": "A main receives 80 gpm from Branch A and 120 gpm from Branch B. There are no additional outlets between those branches and the riser. What flow continues toward the riser?",
          "choices": [
            "40 gpm",
            "100 gpm",
            "120 gpm",
            "200 gpm"
          ],
          "answerIndex": 3,
          "explanation": "At a junction, continuity applies. Flow entering from both branches combines, so 80 + 120 = 200 gpm toward the riser.",
          "calculationNote": "80 + 120 = 200 gpm",
          "teaches": [
            "node continuity",
            "combining branches"
          ]
        },
        {
          "id": "tree-004",
          "level": "tree-basics",
          "difficulty": "solver",
          "prompt": "Which condition would make a simple backward tree calculation invalid without additional network solving?",
          "choices": [
            "A branch pipe changes from 2 inch to 2.5 inch.",
            "Two branch lines are tied together at their far ends.",
            "One sprinkler has a different K-factor.",
            "A fitting adds equivalent length."
          ],
          "answerIndex": 1,
          "explanation": "A tie between branch lines creates a loop. Flow can split and return through multiple paths, so a simple one-path accumulation pass is no longer enough.",
          "teaches": [
            "loop detection",
            "grid transition"
          ]
        },
        {
          "id": "tree-005",
          "level": "tree-basics",
          "difficulty": "designer",
          "prompt": "At a junction, 150 gpm enters from one pipe. One connected sprinkler discharges 42 gpm and the remaining flow leaves through another pipe. What is the leaving pipe flow?",
          "choices": [
            "42 gpm",
            "108 gpm",
            "150 gpm",
            "192 gpm"
          ],
          "answerIndex": 1,
          "explanation": "Continuity requires inflow to equal outflow plus discharge. The leaving pipe carries 150 - 42 = 108 gpm.",
          "calculationNote": "150 - 42 = 108 gpm",
          "teaches": [
            "node balance",
            "local discharge"
          ]
        }
      ]
    },
    {
      "id": "sprinkler-discharge",
      "title": "Sprinkler Discharge And Density",
      "outcome": "Learner can distinguish minimum design demand from actual pressure-driven discharge.",
      "unlockScore": 75,
      "concept": "A density-area design establishes minimum required sprinkler flow. A sprinkler's actual discharge is pressure-driven by Q = K sqrt(P). Final calculated flow may exceed the density minimum when node pressure is higher than the minimum pressure.",
      "sections": [
        {
                "id": "sprinkler-minimum-demand",
                "title": "What H1 is required to deliver",
                "body": "Our example building is Light Hazard: the design density is 0.10 gpm per square foot, and H1 covers 130 square feet. Multiply them and H1 must deliver at least 13.0 gpm. That's the code floor - the calc's first real number.",
                "formula": "minimum flow = density x coverage area = 0.10 x 130 = 13.0 gpm",
                "diagram": {
                        "focus": [
                                "n-h1"
                        ],
                        "labels": {
                                "t-h1": "must deliver >= 13.0 gpm"
                        },
                        "caption": "The design basis sets H1's minimum - not its actual - flow."
                },
                "keyPoints": [
                        "Density x area = minimum required flow at the head.",
                        "This is a floor. The actual discharge will be higher.",
                        "Every head in the design area gets this same check."
                ],
                "checkQuestionIds": [
                        "sprinkler-003"
                ]
        },
        {
                "id": "sprinkler-pressure-driven",
                "title": "What H1 actually delivers: Q = K x sqrt(P)",
                "body": "A sprinkler is just an orifice: push harder and more water comes out. The K-factor is the size of that orifice in calc terms. Our heads are K5.6, so at any pressure P the discharge is 5.6 times the square root of P. The sprinkler doesn't know the code minimum - it only knows the pressure at its inlet.",
                "formula": "Q = K x sqrt(P)   ->   our heads: Q = 5.6 x sqrt(P)",
                "diagram": {
                        "focus": [
                                "n-h1"
                        ],
                        "labels": {
                                "t-h1": "K = 5.6"
                        },
                        "caption": "Same head, more pressure, more water. Always."
                },
                "keyPoints": [
                        "K-factor: gpm per sqrt(psi) - the orifice constant.",
                        "Discharge is driven by pressure, not by the design minimum.",
                        "K5.6 is the standard 1/2-inch orifice."
                ],
                "checkQuestionIds": [
                        "sprinkler-001",
                        "sprinkler-002"
                ]
        },
        {
                "id": "sprinkler-invert-formula",
                "title": "Picking H1's starting pressure",
                "body": "Flip the formula: to push 13.0 gpm through a K5.6 head takes (13.0 / 5.6)^2 = 5.4 psi. But NFPA 13 also sets an absolute floor of 7 psi operating pressure at any sprinkler. 7.0 beats 5.4, so the calc starts H1 at 7.0 psi - whichever requirement is higher wins.",
                "formula": "P = (Q / K)^2 = (13.0 / 5.6)^2 = 5.4 psi  ->  7 psi code minimum governs",
                "diagram": {
                        "focus": [
                                "n-h1"
                        ],
                        "labels": {
                                "t-h1": "start at 7.0 psi"
                        },
                        "caption": "The higher of 'pressure for required flow' and the 7 psi floor."
                },
                "keyPoints": [
                        "Invert Q = K x sqrt(P) to get P = (Q/K)^2.",
                        "NFPA 13 minimum operating pressure: 7 psi.",
                        "The governing value is always the HIGHER one."
                ],
                "checkQuestionIds": [
                        "sprinkler-004"
                ]
        },
        {
                "id": "sprinkler-first-row",
                "title": "The first row of the calc sheet",
                "body": "Now compute it: Q = 5.6 x sqrt(7.0) = 14.8 gpm. H1 starts at 7.0 psi and discharges 14.8 gpm - more than the 13.0 required, exactly as it should be. That pair of numbers is the first row of the calc sheet below, and every remaining row of this course builds on it.",
                "formula": "Q1 = 5.6 x sqrt(7.0) = 14.8 gpm",
                "diagram": {
                        "focus": [
                                "n-h1"
                        ],
                        "labels": {
                                "t-h1": "14.8 gpm @ 7.0 psi"
                        },
                        "caption": "H1, calculated. The calc sheet just gained its first row."
                },
                "calcRow": {
                        "node": "H1",
                        "p": "7.0",
                        "qAdd": "14.8",
                        "qTotal": "14.8",
                        "pipe": "1\" Sch 40 x 12 ft",
                        "pf": "0.9"
                },
                "keyPoints": [
                        "14.8 gpm actual vs 13.0 gpm required - the floor is met.",
                        "The 12 ft of 1-inch pipe to H2 will cost 0.9 psi (Level 3 shows how).",
                        "A calc sheet is just these rows, walked to the supply."
                ],
                "checkQuestionIds": []
        },
        {
                "id": "sprinkler-pressure-ratio",
                "title": "Why H2 flows MORE than H1",
                "body": "Water reaching H1 first had to get past H2's tee, losing 0.9 psi of friction in that 12 ft of pipe. So the pressure AT H2 is higher: 7.0 + 0.9 = 7.9 psi. And a K5.6 head at 7.9 psi discharges 5.6 x sqrt(7.9) = 15.7 gpm. Upstream heads always flow more than the remote head - the calc must use each head's real pressure, never copy-paste the minimum.",
                "formula": "P2 = 7.0 + 0.9 = 7.9 psi  ->  Q2 = 5.6 x sqrt(7.9) = 15.7 gpm",
                "diagram": {
                        "focus": [
                                "n-h2"
                        ],
                        "flow": [
                                "p-b1a"
                        ],
                        "labels": {
                                "t-h1": "14.8 gpm @ 7.0",
                                "t-h2": "15.7 gpm @ 7.9"
                        },
                        "caption": "Higher pressure upstream = more discharge. Branch now carries 30.6 gpm."
                },
                "calcRow": {
                        "node": "H2",
                        "p": "7.9",
                        "qAdd": "15.7",
                        "qTotal": "30.6",
                        "pipe": "1-1/4\" x 10 ft",
                        "pf": "0.8"
                },
                "keyPoints": [
                        "Pressure grows as you walk upstream; so does discharge.",
                        "The branch line now carries 14.8 + 15.7 = 30.6 gpm.",
                        "Sixteen psi at a head flows 4/3 what nine psi does - sqrt scaling."
                ],
                "checkQuestionIds": [
                        "sprinkler-006"
                ]
        },
        {
                "id": "sprinkler-design-vs-actual",
                "title": "Design minimum vs. what the sheet shows",
                "body": "So the finished calc will show every head flowing above its 13.0 gpm minimum - H1 at 14.8, H2 at 15.7, and the heads nearer the supply higher still. That's not an error and not waste; it's hydraulics. The minimum lives in the design criteria; the actual flows live on the calc sheet - and the supply has to carry the actuals.",
                "diagram": {
                        "flow": [
                                "p-b1a",
                                "p-b1b"
                        ],
                        "labels": {
                                "t-h1": "14.8",
                                "t-h2": "15.7",
                                "t-cm": "30.6 gpm heads to the main"
                        },
                        "caption": "Actual discharges, accumulating toward the supply - Level 3 follows them."
                },
                "keyPoints": [
                        "Minimums come from density x area; actuals come from Q = K x sqrt(P).",
                        "A sheet showing flows above minimum is a calc working correctly.",
                        "Total demand is the sum of ACTUAL discharges - never the minimums."
                ],
                "checkQuestionIds": [
                        "sprinkler-005"
                ]
        }
],
      "questions": [
        {
          "id": "sprinkler-001",
          "level": "sprinkler-discharge",
          "difficulty": "apprentice",
          "prompt": "Which equation gives sprinkler discharge from K-factor and pressure?",
          "choices": [
            "Q = K / sqrt(P)",
            "Q = K x sqrt(P)",
            "P = K x Q",
            "Q = P / K"
          ],
          "answerIndex": 1,
          "explanation": "Sprinkler discharge is Q = K x sqrt(P), with Q in gpm and P in psi.",
          "teaches": [
            "K-factor",
            "pressure-driven discharge"
          ]
        },
        {
          "id": "sprinkler-002",
          "level": "sprinkler-discharge",
          "difficulty": "designer",
          "prompt": "A sprinkler has K = 8.0 and node pressure = 25 psi. What is its discharge?",
          "choices": [
            "32 gpm",
            "40 gpm",
            "64 gpm",
            "200 gpm"
          ],
          "answerIndex": 1,
          "explanation": "sqrt(25) = 5. The sprinkler flow is 8.0 x 5 = 40 gpm.",
          "calculationNote": "Q = 8.0 x sqrt(25) = 40 gpm",
          "teaches": [
            "K-factor math",
            "square root pressure"
          ]
        },
        {
          "id": "sprinkler-003",
          "level": "sprinkler-discharge",
          "difficulty": "designer",
          "prompt": "Density is 0.20 gpm/ft2 and the sprinkler coverage area is 130 ft2. What is the minimum required sprinkler flow?",
          "choices": [
            "13 gpm",
            "20 gpm",
            "26 gpm",
            "65 gpm"
          ],
          "answerIndex": 2,
          "explanation": "Minimum flow from density is density times area: 0.20 x 130 = 26 gpm.",
          "calculationNote": "0.20 x 130 = 26 gpm",
          "teaches": [
            "density",
            "coverage area"
          ]
        },
        {
          "id": "sprinkler-004",
          "level": "sprinkler-discharge",
          "difficulty": "solver",
          "prompt": "A K22.4 sprinkler has a minimum required flow of 26 gpm. Which pressure is the minimum theoretical pressure for that sprinkler to meet 26 gpm?",
          "choices": [
            "1.35 psi",
            "7.0 psi",
            "13.5 psi",
            "33.5 psi"
          ],
          "answerIndex": 0,
          "explanation": "Rearrange Q = K sqrt(P) to P = (Q / K)^2. P = (26 / 22.4)^2 = about 1.35 psi.",
          "calculationNote": "P = (26 / 22.4)^2 = 1.35 psi",
          "teaches": [
            "minimum pressure",
            "formula inversion"
          ]
        },
        {
          "id": "sprinkler-005",
          "level": "sprinkler-discharge",
          "difficulty": "solver",
          "prompt": "Why might a final calculation show sprinklers flowing 60 gpm even though the density minimum is only 26 gpm?",
          "choices": [
            "Because actual discharge follows node pressure and K-factor, not only the density minimum.",
            "Because all design calculations must double the density demand.",
            "Because grid systems ignore K-factor.",
            "Because the water supply curve replaces sprinkler equations."
          ],
          "answerIndex": 0,
          "explanation": "The density minimum is a floor. If the system pressure needed to satisfy the network is higher, the pressure-driven sprinkler discharge can be much higher than the minimum.",
          "teaches": [
            "actual vs minimum flow",
            "overdischarge"
          ]
        },
        {
          "id": "sprinkler-006",
          "level": "sprinkler-discharge",
          "difficulty": "designer",
          "prompt": "Two sprinklers have the same K-factor. Sprinkler A has 9 psi and Sprinkler B has 16 psi. Which statement is correct?",
          "choices": [
            "B flows 16/9 times as much as A.",
            "B flows 4/3 times as much as A.",
            "Both flow the same because K-factor is the same.",
            "A flows more because lower pressure means less friction."
          ],
          "answerIndex": 1,
          "explanation": "Flow follows the square root of pressure. sqrt(16) / sqrt(9) = 4 / 3.",
          "calculationNote": "Q_B / Q_A = sqrt(16) / sqrt(9) = 4/3",
          "teaches": [
            "pressure ratio",
            "square root behavior"
          ]
        }
      ]
    },
    {
      "id": "friction-loss",
      "title": "Pipe Friction, Elevation, And Resistance",
      "outcome": "Learner can reason about why flow chooses lower resistance paths.",
      "unlockScore": 75,
      "concept": "Pipe friction is nonlinear. In Hazen-Williams form, loss grows approximately with Q^1.85 and decreases strongly as inside diameter increases. Elevation and fittings add additional pressure requirements.",
      "sections": [
        {
          "id": "friction-why-it-matters",
          "title": "Why resistance controls flow",
          "body": "Water follows pressure differences, but the amount of flow through a pipe is limited by resistance. Resistance is created by pipe length, actual inside diameter, roughness, fittings, and elevation change.",
          "keyPoints": [
            "Longer pipe creates more friction loss.",
            "Smaller inside diameter creates much more friction loss.",
            "Fittings are usually converted to equivalent pipe length."
          ],
          "checkQuestionIds": [
            "friction-005",
            "friction-006"
          ]
        },
        {
          "id": "friction-hazen-williams",
          "title": "Hazen-Williams behavior",
          "body": "For sprinkler calculations, Hazen-Williams is commonly used. The important learning point is not just the formula, but how strongly friction responds to flow and diameter.",
          "formula": "friction loss = 4.52 x L x Q^1.85 / (C^1.85 x d^4.87)",
          "example": "If flow doubles in the same pipe, friction increases by about 2^1.85 = 3.6 times.",
          "keyPoints": [
            "Friction increases faster than flow.",
            "C-factor represents pipe roughness or internal condition.",
            "The same pipe becomes much more restrictive as flow increases."
          ],
          "checkQuestionIds": [
            "friction-001",
            "friction-002"
          ]
        },
        {
          "id": "friction-diameter",
          "title": "Diameter has a large effect",
          "body": "Pipe diameter is one of the strongest variables in the friction equation. A small increase in actual inside diameter can produce a large reduction in pressure loss for the same flow.",
          "formula": "friction loss is proportional to 1 / d^4.87",
          "keyPoints": [
            "Use actual inside diameter, not just nominal pipe size.",
            "Larger pipe lowers velocity and friction.",
            "Diameter changes can matter more than modest length changes."
          ],
          "checkQuestionIds": [
            "friction-003"
          ]
        },
        {
          "id": "friction-elevation",
          "title": "Elevation pressure",
          "body": "Elevation is separate from pipe friction. Moving water upward consumes pressure. Moving water downward adds available pressure.",
          "formula": "elevation pressure = 0.433 psi x vertical feet",
          "example": "A 12 ft rise consumes 12 x 0.433 = 5.2 psi before friction is even considered.",
          "keyPoints": [
            "Elevation loss is based only on vertical height difference.",
            "Friction loss depends on flow, length, diameter, and roughness.",
            "Both effects are included in total pressure required."
          ],
          "checkQuestionIds": [
            "friction-004"
          ]
        }
      ],
      "questions": [
        {
          "id": "friction-001",
          "level": "friction-loss",
          "difficulty": "apprentice",
          "prompt": "In Hazen-Williams sprinkler calculations, friction loss changes approximately with which power of flow?",
          "choices": [
            "Q^0.50",
            "Q^1.00",
            "Q^1.85",
            "Q^4.87"
          ],
          "answerIndex": 2,
          "explanation": "For a given pipe, Hazen-Williams friction is proportional to Q^1.85.",
          "teaches": [
            "Hazen-Williams",
            "nonlinear friction"
          ]
        },
        {
          "id": "friction-002",
          "level": "friction-loss",
          "difficulty": "designer",
          "prompt": "If flow in the same pipe doubles, about how much does friction loss increase?",
          "choices": [
            "2.0 times",
            "2.4 times",
            "3.6 times",
            "7.4 times"
          ],
          "answerIndex": 2,
          "explanation": "2^1.85 is about 3.6. Friction rises faster than flow.",
          "calculationNote": "2^1.85 = 3.61",
          "teaches": [
            "flow exponent",
            "resistance feedback"
          ]
        },
        {
          "id": "friction-003",
          "level": "friction-loss",
          "difficulty": "designer",
          "prompt": "Which change most strongly reduces friction loss for the same flow and pipe length?",
          "choices": [
            "Increasing inside diameter.",
            "Increasing elevation.",
            "Adding a tee outlet.",
            "Lowering the C-factor."
          ],
          "answerIndex": 0,
          "explanation": "Diameter has a very strong effect because Hazen-Williams loss varies approximately with 1 / d^4.87.",
          "teaches": [
            "diameter effect",
            "pipe sizing"
          ]
        },
        {
          "id": "friction-004",
          "level": "friction-loss",
          "difficulty": "designer",
          "prompt": "Water flows upward 12 ft between two nodes. What pressure is consumed by elevation alone?",
          "choices": [
            "2.8 psi",
            "5.2 psi",
            "12.0 psi",
            "27.7 psi"
          ],
          "answerIndex": 1,
          "explanation": "Water pressure changes by about 0.433 psi per vertical foot. 12 x 0.433 = 5.196 psi.",
          "calculationNote": "12 x 0.433 = 5.2 psi",
          "teaches": [
            "elevation loss",
            "static pressure"
          ]
        },
        {
          "id": "friction-005",
          "level": "friction-loss",
          "difficulty": "solver",
          "prompt": "A pipe segment has 40 ft physical length and 18 ft equivalent fitting length. What length should be used in the friction equation?",
          "choices": [
            "18 ft",
            "40 ft",
            "58 ft",
            "720 ft"
          ],
          "answerIndex": 2,
          "explanation": "Equivalent fitting length is added to physical length. The effective friction length is 40 + 18 = 58 ft.",
          "calculationNote": "40 + 18 = 58 ft",
          "teaches": [
            "equivalent length",
            "minor losses"
          ]
        },
        {
          "id": "friction-006",
          "level": "friction-loss",
          "difficulty": "solver",
          "prompt": "Two parallel paths feed the same node. Path A is shorter and larger. Path B is longer and smaller. What will generally happen?",
          "choices": [
            "Path A carries more flow, but not necessarily all of it.",
            "Both paths always carry exactly half the flow.",
            "Path B carries more flow because it has more friction.",
            "Only the path drawn first carries flow."
          ],
          "answerIndex": 0,
          "explanation": "Lower resistance paths carry more flow, but friction increases as flow increases, so some flow may still be forced into the alternate path until pressures balance.",
          "teaches": [
            "parallel resistance",
            "flow split"
          ]
        }
      ]
    },
    {
      "id": "loop-balancing",
      "title": "Loops And Pressure Balance",
      "outcome": "Learner can explain why looped systems require iterative balancing.",
      "unlockScore": 80,
      "concept": "A looped system has more than one route between nodes. The same node cannot have two different pressures, so parallel paths feeding that node must settle into a flow split where energy losses are compatible.",
      "sections": [
        {
          "id": "loop-multiple-routes",
          "title": "Multiple routes change the problem",
          "body": "In a loop, water can reach the same node through more than one path. The program can no longer simply add flows backward, because the flow in each route depends on how much pressure is lost through the alternate routes.",
          "keyPoints": [
            "A tied branch line creates a closed hydraulic loop.",
            "Parallel paths do not automatically split flow equally.",
            "The lower-resistance route carries more flow until friction balances the system."
          ],
          "checkQuestionIds": [
            "loop-002",
            "loop-006"
          ]
        },
        {
          "id": "loop-energy-rule",
          "title": "The loop energy rule",
          "body": "If a calculation starts at a node, travels around a closed loop, and returns to the same node, the final pressure must equal the starting pressure. Therefore the signed sum of pressure losses and gains around the loop must be zero.",
          "formula": "sum of signed pressure changes around a closed loop = 0",
          "example": "If one path predicts a node pressure of 18 psi and another predicts 15 psi at the same node, the assumed flow split is not balanced.",
          "keyPoints": [
            "A node can have only one pressure.",
            "Different routes to that node must be pressure-compatible.",
            "Loop imbalance tells the solver how to shift flow."
          ],
          "checkQuestionIds": [
            "loop-001",
            "loop-003"
          ]
        },
        {
          "id": "loop-flow-correction",
          "title": "How flow shifts",
          "body": "When one path carries too much flow, its friction loss rises faster than the flow itself. The solver reduces flow in that path and increases flow in an alternate path until the loop energy error becomes acceptably small.",
          "keyPoints": [
            "The Q^1.85 friction relationship helps prevent one path from taking all flow.",
            "A pipe may calculate with negative flow if actual flow is opposite the model's arbitrary pipe direction.",
            "Balanced loop flow is a result of pressure compatibility, not equal division."
          ],
          "checkQuestionIds": [
            "loop-004",
            "loop-005"
          ]
        }
      ],
      "questions": [
        {
          "id": "loop-001",
          "level": "loop-balancing",
          "difficulty": "apprentice",
          "prompt": "What must be true around a closed hydraulic loop after the calculation converges?",
          "choices": [
            "The algebraic sum of pressure changes around the loop is zero.",
            "Every pipe in the loop has the same flow.",
            "Every pipe in the loop has the same diameter.",
            "The longest path must carry no water."
          ],
          "answerIndex": 0,
          "explanation": "A closed loop returns to the same pressure where it started, so the signed pressure losses and gains around the loop must sum to zero.",
          "teaches": [
            "loop energy",
            "pressure balance"
          ]
        },
        {
          "id": "loop-002",
          "level": "loop-balancing",
          "difficulty": "designer",
          "prompt": "Two different paths connect Node 10 to Node 20. What must be true about the final pressure at Node 20?",
          "choices": [
            "It must be one value, regardless of which path is used to reach it.",
            "It must be higher through the shorter path.",
            "It must be lower through the smaller pipe path.",
            "It is not calculated in loop systems."
          ],
          "answerIndex": 0,
          "explanation": "A node has one pressure. If two paths predict different arrival pressures, the flow split is not balanced yet.",
          "teaches": [
            "single node pressure",
            "parallel route compatibility"
          ]
        },
        {
          "id": "loop-003",
          "level": "loop-balancing",
          "difficulty": "solver",
          "prompt": "An assumed flow split sends too much flow through Path A. What usually indicates this in a loop calculation?",
          "choices": [
            "Path A has excessive friction loss compared with the alternate route.",
            "Path A has zero elevation loss.",
            "Path A has a higher C-factor than expected.",
            "The sprinkler K-factor becomes negative."
          ],
          "answerIndex": 0,
          "explanation": "Too much flow creates too much friction in that route. The solver reduces Path A flow and increases alternate path flow until loop losses balance.",
          "teaches": [
            "flow correction",
            "loop residual"
          ]
        },
        {
          "id": "loop-004",
          "level": "loop-balancing",
          "difficulty": "designer",
          "prompt": "Why does friction increasing with Q^1.85 help stabilize flow split in parallel paths?",
          "choices": [
            "A path carrying extra flow becomes disproportionately more resistant.",
            "All paths become frictionless at high flow.",
            "Friction becomes independent of pipe diameter.",
            "Sprinkler discharge stops depending on pressure."
          ],
          "answerIndex": 0,
          "explanation": "The nonlinear friction increase penalizes overloading one path, making alternate paths more attractive until equilibrium is reached.",
          "teaches": [
            "nonlinear feedback",
            "flow distribution"
          ]
        },
        {
          "id": "loop-005",
          "level": "loop-balancing",
          "difficulty": "solver",
          "prompt": "In a looped network, which statement best describes a pipe with negative calculated flow?",
          "choices": [
            "The pipe is flowing opposite the arbitrary direction used in the model.",
            "The pipe has impossible hydraulic behavior.",
            "The pipe must be removed from the system.",
            "The sprinkler attached to that pipe is closed."
          ],
          "answerIndex": 0,
          "explanation": "Programs assign each pipe an arbitrary positive direction. Negative flow simply means actual flow is in the opposite direction.",
          "teaches": [
            "signed flow",
            "flow reversal"
          ]
        },
        {
          "id": "loop-006",
          "level": "loop-balancing",
          "difficulty": "solver",
          "prompt": "Which pair of equations is most fundamental to looped hydraulic calculations?",
          "choices": [
            "Node continuity and loop energy balance.",
            "Coverage area and ceiling slope.",
            "Nominal diameter and pipe color.",
            "Static pressure and drawing scale."
          ],
          "answerIndex": 0,
          "explanation": "The calculation must conserve mass at nodes and conserve energy around loops.",
          "teaches": [
            "mass balance",
            "energy balance"
          ]
        }
      ]
    },
    {
      "id": "grid-solving",
      "title": "Computer Solver Behavior",
      "outcome": "Learner can describe the iterative process used by a hydraulic engine.",
      "unlockScore": 80,
      "concept": "A computer calculates a grid as a simultaneous nonlinear network. It guesses pressures and flows, computes sprinkler discharge and pipe friction, checks residuals, corrects the guess, and repeats until node and loop errors are acceptably small.",
      "sections": [
        {
          "id": "solver-network",
          "title": "The network model",
          "body": "A computer stores the system as nodes and pipes. Nodes have elevations, pressures, and possible outlet demand. Pipes connect two nodes and have size, length, equivalent length, C-factor, and calculated flow.",
          "keyPoints": [
            "Sprinklers are pressure-driven outlets at nodes.",
            "Pipes calculate resistance between nodes.",
            "The source node supplies whatever flow and pressure the solved network requires."
          ],
          "checkQuestionIds": [
            "solver-004"
          ]
        },
        {
          "id": "solver-iteration",
          "title": "The iterative cycle",
          "body": "The solver starts with a reasonable guess, calculates flows from pressures, calculates sprinkler discharge from node pressures, checks the remaining imbalance, and then corrects the pressures or flows. It repeats this cycle until the residuals are small.",
          "formula": "guess pressures -> calculate flows -> calculate residuals -> correct pressures -> repeat",
          "keyPoints": [
            "A residual is the remaining error in node continuity or loop balance.",
            "Node residuals show whether inflow and outflow balance.",
            "The solver uses residuals to decide what to correct."
          ],
          "checkQuestionIds": [
            "solver-001",
            "solver-002"
          ]
        },
        {
          "id": "solver-convergence",
          "title": "Convergence is the stopping point",
          "body": "After each correction, the solver recalculates flows and residuals. It stops when the remaining errors are small enough to meet the program's tolerance.",
          "formula": "guess pressures -> calculate flows -> calculate residuals -> correct pressures -> repeat",
          "keyPoints": [
            "Convergence means the calculation has balanced closely enough.",
            "The final pipe flows are the balanced result, not manually assigned route flows.",
            "A converged calculation still must pass sprinkler minimums and water supply checks."
          ],
          "checkQuestionIds": [
            "solver-003",
            "solver-005"
          ]
        },
        {
          "id": "solver-reporting",
          "title": "Reports are a view of the solution",
          "body": "Calculation reports often present route tables because they are readable. The actual grid solution is still simultaneous. Route tables show the solved pressures, flows, friction losses, elevations, and added flows in a human-checkable sequence.",
          "keyPoints": [
            "Do not confuse report route order with solver order.",
            "Flow added from another route means a connected path contributes at that node.",
            "Negative or low flow in a grid pipe may be valid if the network balances."
          ],
          "checkQuestionIds": [
            "solver-006"
          ]
        }
      ],
      "questions": [
        {
          "id": "solver-001",
          "level": "grid-solving",
          "difficulty": "designer",
          "prompt": "What is a residual in a hydraulic network solver?",
          "choices": [
            "The remaining imbalance after applying the current guessed pressures and flows.",
            "The total physical pipe length in the remote area.",
            "The water supply static pressure.",
            "The number of sprinklers not selected."
          ],
          "answerIndex": 0,
          "explanation": "A residual measures how wrong the current iteration is, such as a node flow imbalance or loop pressure imbalance.",
          "teaches": [
            "solver residual",
            "iteration"
          ]
        },
        {
          "id": "solver-002",
          "level": "grid-solving",
          "difficulty": "solver",
          "prompt": "At a junction node with no sprinkler, the solver computes 210 gpm entering and 206 gpm leaving. What does this mean?",
          "choices": [
            "The current iteration has a 4 gpm continuity residual.",
            "The node has passed exactly.",
            "The missing 4 gpm is hose stream demand.",
            "The pipe C-factor must be zero."
          ],
          "answerIndex": 0,
          "explanation": "For a no-discharge junction, inflow should equal outflow. The 4 gpm mismatch is an error to be corrected.",
          "calculationNote": "210 - 206 = 4 gpm residual",
          "teaches": [
            "node residual",
            "continuity tolerance"
          ]
        },
        {
          "id": "solver-003",
          "level": "grid-solving",
          "difficulty": "solver",
          "prompt": "Which sequence best describes a pressure-based network solver iteration?",
          "choices": [
            "Guess node pressures, compute pipe flows and sprinkler flows, compute residuals, correct pressures.",
            "Sort pipes alphabetically, assign equal flow, ignore residuals, print report.",
            "Choose the largest pipe, force all flow through it, close all loops.",
            "Calculate water supply first and skip node pressures."
          ],
          "answerIndex": 0,
          "explanation": "Modern solvers usually iterate: pressures produce flows, flows produce residuals, residuals drive pressure corrections.",
          "teaches": [
            "solver cycle",
            "pressure unknowns"
          ]
        },
        {
          "id": "solver-004",
          "level": "grid-solving",
          "difficulty": "solver",
          "prompt": "Why does a hydraulic engine need actual inside diameter rather than only nominal pipe size?",
          "choices": [
            "Friction loss depends strongly on actual inside diameter.",
            "Nominal size is used only for drawing text height.",
            "Actual diameter determines sprinkler K-factor.",
            "Inside diameter only affects elevation loss."
          ],
          "answerIndex": 0,
          "explanation": "Hazen-Williams uses inside diameter in the denominator with a high exponent, so small ID differences can materially affect loss.",
          "teaches": [
            "actual ID",
            "friction coefficient"
          ]
        },
        {
          "id": "solver-005",
          "level": "grid-solving",
          "difficulty": "designer",
          "prompt": "What does convergence mean in a grid hydraulic calculation?",
          "choices": [
            "The remaining node and loop imbalances are within allowed tolerances.",
            "The first guessed flow split was accepted.",
            "All pipes have equal flow.",
            "The supply pressure equals zero."
          ],
          "answerIndex": 0,
          "explanation": "Convergence means the equations are satisfied closely enough for engineering reporting.",
          "teaches": [
            "convergence",
            "tolerance"
          ]
        },
        {
          "id": "solver-006",
          "level": "grid-solving",
          "difficulty": "solver",
          "prompt": "Why are route tables in calculation reports not the same thing as the actual solving method?",
          "choices": [
            "The solver balances the network simultaneously; routes are a readable reporting view of the solved result.",
            "Route tables are only for pipe labels and contain no hydraulic data.",
            "The solver ignores all loops and uses only the route table.",
            "Route tables replace the Hazen-Williams equation."
          ],
          "answerIndex": 0,
          "explanation": "Reports often present paths so humans can inspect the result, but the grid solution itself is simultaneous and iterative.",
          "teaches": [
            "report interpretation",
            "simultaneous solve"
          ]
        }
      ]
    },
    {
      "id": "system-demand",
      "title": "System Demand And Water Supply",
      "outcome": "Learner can connect calculated remote-area demand to available supply and safety margin.",
      "unlockScore": 80,
      "concept": "After the network converges, the program sums sprinkler and allowance flows, determines required source pressure, compares that demand to the water supply curve, and reports safety margin.",
      "sections": [
        {
          "id": "demand-total-flow",
          "title": "Total demand flow",
          "body": "After the hydraulic network converges, the program sums the actual calculated discharge from active sprinklers. It then adds hose allowance or other external demand at the required location.",
          "formula": "total demand = sum(actual sprinkler flows) + hose allowance + other demand",
          "example": "Twelve sprinklers at 60 gpm each plus 250 gpm hose demand equals 970 gpm total.",
          "keyPoints": [
            "Use actual calculated sprinkler flow, not only minimum density flow.",
            "Hose demand may be added at the source or another specified node.",
            "The final demand point is flow at required source pressure."
          ],
          "checkQuestionIds": [
            "demand-001",
            "demand-002"
          ]
        },
        {
          "id": "demand-supply-curve",
          "title": "Available supply pressure",
          "body": "The water supply curve estimates available pressure at the calculated system flow using static pressure, residual pressure, and test flow. The pressure drop from static is scaled using the Hazen-Williams exponent.",
          "formula": "P_available = P_static - (P_static - P_residual) x (Q_demand / Q_test)^1.85",
          "keyPoints": [
            "At zero flow, available pressure is static pressure.",
            "At the test flow, available pressure is residual pressure.",
            "At smaller demand than test flow, available pressure is between static and residual."
          ],
          "checkQuestionIds": [
            "demand-003",
            "demand-004"
          ]
        },
        {
          "id": "demand-margin",
          "title": "Safety margin",
          "body": "The calculation passes the water supply comparison when available pressure at the system demand exceeds required source pressure. The difference is the safety margin.",
          "formula": "safety margin = available pressure - required pressure",
          "example": "If available pressure is 82 psi and required pressure is 64 psi, safety margin is 18 psi.",
          "keyPoints": [
            "Positive margin means available supply exceeds demand.",
            "Negative margin means the system is short on pressure at the calculated flow.",
            "A converged network can still fail if sprinkler minimums or supply margin are not satisfied."
          ],
          "checkQuestionIds": [
            "demand-005",
            "demand-006"
          ]
        }
      ],
      "questions": [
        {
          "id": "demand-001",
          "level": "system-demand",
          "difficulty": "designer",
          "prompt": "After solving all active sprinklers, how is total sprinkler demand found?",
          "choices": [
            "Sum the actual calculated discharge of all active sprinklers.",
            "Use only the most demanding sprinkler flow.",
            "Multiply static pressure by pipe diameter.",
            "Use the number of pipes in the grid."
          ],
          "answerIndex": 0,
          "explanation": "Total sprinkler demand is the sum of actual pressure-driven discharge from each operating sprinkler.",
          "teaches": [
            "total demand",
            "actual sprinkler flow"
          ]
        },
        {
          "id": "demand-002",
          "level": "system-demand",
          "difficulty": "designer",
          "prompt": "Twelve sprinklers each discharge 60 gpm and there is a 250 gpm hose allowance at the source. What is total system flow?",
          "choices": [
            "310 gpm",
            "720 gpm",
            "970 gpm",
            "3000 gpm"
          ],
          "answerIndex": 2,
          "explanation": "Sprinklers require 12 x 60 = 720 gpm. Add 250 gpm hose allowance for 970 gpm total.",
          "calculationNote": "12 x 60 + 250 = 970 gpm",
          "teaches": [
            "hose allowance",
            "source demand"
          ]
        },
        {
          "id": "demand-003",
          "level": "system-demand",
          "difficulty": "solver",
          "prompt": "Water supply has 90 psi static, 70 psi residual at 3000 gpm. At a system demand of 750 gpm, what is the correct conceptual behavior?",
          "choices": [
            "Available pressure should be between 90 psi and 70 psi, closer to 90 psi.",
            "Available pressure must equal 70 psi.",
            "Available pressure must equal 90 psi.",
            "Available pressure is unrelated to demand flow."
          ],
          "answerIndex": 0,
          "explanation": "At less than the test flow, pressure loss from static is smaller, so available pressure lies between static and residual and is closer to static.",
          "teaches": [
            "supply curve",
            "residual pressure"
          ]
        },
        {
          "id": "demand-004",
          "level": "system-demand",
          "difficulty": "solver",
          "prompt": "Which formula best represents available pressure from a hydrant test using Hazen-Williams behavior?",
          "choices": [
            "P_available = P_static - (P_static - P_residual) x (Q_demand / Q_test)^1.85",
            "P_available = P_residual - Q_demand",
            "P_available = Q_test / P_static",
            "P_available = K x sqrt(P)"
          ],
          "answerIndex": 0,
          "explanation": "The supply curve usually applies the 1.85 exponent to scale pressure drop from the hydrant test point.",
          "teaches": [
            "water supply curve",
            "1.85 exponent"
          ]
        },
        {
          "id": "demand-005",
          "level": "system-demand",
          "difficulty": "designer",
          "prompt": "If available pressure at the calculated demand is 82 psi and required source pressure is 64 psi, what is the safety margin?",
          "choices": [
            "18 psi",
            "64 psi",
            "82 psi",
            "146 psi"
          ],
          "answerIndex": 0,
          "explanation": "Safety margin is available pressure minus required pressure: 82 - 64 = 18 psi.",
          "calculationNote": "82 - 64 = 18 psi",
          "teaches": [
            "safety margin",
            "pass/fail comparison"
          ]
        },
        {
          "id": "demand-006",
          "level": "system-demand",
          "difficulty": "solver",
          "prompt": "A calculation converges hydraulically but one active sprinkler is below its minimum required flow. What is the correct result?",
          "choices": [
            "The design fails until pressure, pipe sizing, layout, or design assumptions are changed.",
            "The system passes because convergence alone is sufficient.",
            "The lowest sprinkler flow should be deleted from the report.",
            "The water supply curve automatically increases K-factor."
          ],
          "answerIndex": 0,
          "explanation": "Convergence only means the equations balance. The design must also satisfy minimum sprinkler flow and pressure requirements.",
          "teaches": [
            "minimum compliance",
            "convergence vs pass"
          ]
        }
      ]
    }
  ];
  
  var COURSE_VERSION = "2026-06-27";

  // ---- quiz engine (ported from hydraulicQuizEngine.ts; logic preserved exactly) ----
  function getLessonById(id) { for (var i = 0; i < LESSONS.length; i++) if (LESSONS[i].id === id) return LESSONS[i]; }
  function getQuestionById(qid) { for (var i = 0; i < LESSONS.length; i++) { var qs = LESSONS[i].questions; for (var j = 0; j < qs.length; j++) if (qs[j].id === qid) return qs[j]; } }
  function gradeAnswer(qid, sel) { var q = getQuestionById(qid); if (!q) throw new Error("Unknown hydraulic learning question: " + qid); return { questionId: qid, selectedIndex: sel, correct: sel === q.answerIndex }; }
  function lessonProgress(id, results) {
    var lesson = getLessonById(id); if (!lesson) throw new Error("Unknown hydraulic learning lesson: " + id);
    var ids = {}; lesson.questions.forEach(function (q) { ids[q.id] = 1; });
    var latest = {}; results.forEach(function (r) { if (ids[r.questionId]) latest[r.questionId] = r; });
    var keys = Object.keys(latest), answered = keys.length;
    var correct = keys.filter(function (k) { return latest[k].correct; }).length;
    var scorePercent = answered === 0 ? 0 : Math.round((correct / answered) * 100);
    return { lessonId: id, answered: answered, correct: correct, scorePercent: scorePercent, passed: answered === lesson.questions.length && scorePercent >= lesson.unlockScore };
  }
  function courseProgress(results) {
    var lp = LESSONS.map(function (l) { return lessonProgress(l.id, results); });
    var latest = {}; results.forEach(function (r) { latest[r.questionId] = r; });
    var keys = Object.keys(latest), totalAnswered = keys.length;
    var totalCorrect = keys.filter(function (k) { return latest[k].correct; }).length;
    var totalScorePercent = totalAnswered === 0 ? 0 : Math.round((totalCorrect / totalAnswered) * 100);
    var unlocked = [];
    for (var i = 0; i < LESSONS.length; i++) { var prev = i === 0 ? null : lp[i - 1]; if (i === 0 || (prev && prev.passed)) unlocked.push(LESSONS[i].id); }
    return { lessons: lp, totalAnswered: totalAnswered, totalCorrect: totalCorrect, totalScorePercent: totalScorePercent, unlockedLessonIds: unlocked };
  }

  var HydraulicCourse = { lessons: LESSONS, version: COURSE_VERSION, gradeAnswer: gradeAnswer, lessonProgress: lessonProgress, courseProgress: courseProgress, getLessonById: getLessonById, getQuestionById: getQuestionById };
  global.HydraulicCourse = HydraulicCourse;
  if (typeof module !== "undefined" && module.exports) module.exports = HydraulicCourse;
})(typeof self !== "undefined" ? self : (typeof globalThis !== "undefined" ? globalThis : this));
