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
      id: "tree-basics",
      title: "Tree Systems And Flow Accumulation",
      outcome: "Learner can trace a non-looped system from remote sprinklers back to the source.",
      unlockScore: 70,
      concept:
        "A tree system has one hydraulic path from each flowing sprinkler back to the supply. Pipe flow accumulates as branches combine. The calculation can be walked from the most remote outlets toward the riser because there are no parallel paths that require loop balancing.",
      sections: [
        {
          id: "tree-what-it-is",
          title: "What the computer is modeling",
          body:
            "A tree system is a directed network with no closed hydraulic loops. Each operating sprinkler has exactly one route back to the source. The program can start at the remote sprinklers and move upstream, adding each outlet flow to the pipe segments that feed it.",
          keyPoints: [
            "Each active sprinkler contributes discharge at one node.",
            "Each upstream pipe carries the sum of all downstream outlets.",
            "There is no need to decide how water splits between parallel feed paths.",
          ],
        },
        {
          id: "tree-node-rule",
          title: "The node rule",
          body:
            "Every junction still has to balance. The total flow entering a node must equal the flow leaving the node plus any sprinkler, hose, or other outlet discharge at that same node.",
          formula: "flow in = flow out + local discharge",
          example:
            "If 150 gpm enters a tee and a sprinkler at that tee discharges 42 gpm, the remaining pipe leaving the tee carries 108 gpm.",
          keyPoints: [
            "This is conservation of mass.",
            "A junction with no outlet has equal total inflow and outflow.",
            "A sprinkler node removes flow from the pipe network.",
          ],
        },
        {
          id: "tree-calculation-order",
          title: "Calculation order",
          body:
            "A tree calculation can be solved in a stable order: determine active sprinkler flows, add flows into branch segments, combine branches into mains, then calculate pressure loss from the remote area back to the supply.",
          keyPoints: [
            "The farthest active outlets are usually calculated first.",
            "Pipe flow increases as branches combine toward the source.",
            "The supply must provide the total accumulated demand plus required pressure.",
          ],
        },
      ],
      questions: [
        {
          id: "tree-001",
          level: "tree-basics",
          difficulty: "apprentice",
          prompt:
            "In a tree sprinkler layout, why can the program usually add flows as it moves back toward the riser?",
          choices: [
            "Because each flowing sprinkler has only one path back to the supply.",
            "Because every sprinkler in a tree has the same pressure.",
            "Because friction loss is ignored until the riser.",
            "Because the largest pipe always controls all branch flow.",
          ],
          answerIndex: 0,
          explanation:
            "A tree system has no closed hydraulic loops. Once the active sprinklers are known, flow in each downstream pipe is the sum of the outlets beyond that pipe.",
          teaches: ["single path", "flow accumulation"],
        },
        {
          id: "tree-002",
          level: "tree-basics",
          difficulty: "designer",
          prompt:
            "Three sprinklers on a branch discharge 31 gpm, 34 gpm, and 37 gpm. What flow is carried by the branch segment immediately upstream of all three?",
          choices: ["37 gpm", "68 gpm", "102 gpm", "Cannot be known in a tree system"],
          answerIndex: 2,
          explanation:
            "In a tree branch, the upstream segment carries the sum of all downstream discharge: 31 + 34 + 37 = 102 gpm.",
          calculationNote: "31 + 34 + 37 = 102 gpm",
          teaches: ["segment flow", "upstream accumulation"],
        },
        {
          id: "tree-003",
          level: "tree-basics",
          difficulty: "designer",
          prompt:
            "A main receives 80 gpm from Branch A and 120 gpm from Branch B. There are no additional outlets between those branches and the riser. What flow continues toward the riser?",
          choices: ["40 gpm", "100 gpm", "120 gpm", "200 gpm"],
          answerIndex: 3,
          explanation:
            "At a junction, continuity applies. Flow entering from both branches combines, so 80 + 120 = 200 gpm toward the riser.",
          calculationNote: "80 + 120 = 200 gpm",
          teaches: ["node continuity", "combining branches"],
        },
        {
          id: "tree-004",
          level: "tree-basics",
          difficulty: "solver",
          prompt:
            "Which condition would make a simple backward tree calculation invalid without additional network solving?",
          choices: [
            "A branch pipe changes from 2 inch to 2.5 inch.",
            "Two branch lines are tied together at their far ends.",
            "One sprinkler has a different K-factor.",
            "A fitting adds equivalent length.",
          ],
          answerIndex: 1,
          explanation:
            "A tie between branch lines creates a loop. Flow can split and return through multiple paths, so a simple one-path accumulation pass is no longer enough.",
          teaches: ["loop detection", "grid transition"],
        },
        {
          id: "tree-005",
          level: "tree-basics",
          difficulty: "designer",
          prompt:
            "At a junction, 150 gpm enters from one pipe. One connected sprinkler discharges 42 gpm and the remaining flow leaves through another pipe. What is the leaving pipe flow?",
          choices: ["42 gpm", "108 gpm", "150 gpm", "192 gpm"],
          answerIndex: 1,
          explanation:
            "Continuity requires inflow to equal outflow plus discharge. The leaving pipe carries 150 - 42 = 108 gpm.",
          calculationNote: "150 - 42 = 108 gpm",
          teaches: ["node balance", "local discharge"],
        },
      ],
    },
    {
      id: "sprinkler-discharge",
      title: "Sprinkler Discharge And Density",
      outcome: "Learner can distinguish minimum design demand from actual pressure-driven discharge.",
      unlockScore: 75,
      concept:
        "A density-area design establishes minimum required sprinkler flow. A sprinkler's actual discharge is pressure-driven by Q = K sqrt(P). Final calculated flow may exceed the density minimum when node pressure is higher than the minimum pressure.",
      sections: [
        {
          id: "sprinkler-minimum-demand",
          title: "Minimum demand comes from density",
          body:
            "The design density and sprinkler coverage area set the minimum required flow for each operating sprinkler. This is a design floor, not necessarily the exact final flow.",
          formula: "minimum sprinkler flow = density x coverage area",
          example:
            "At 0.20 gpm/ft2 over 130 ft2, minimum flow is 0.20 x 130 = 26 gpm.",
          keyPoints: [
            "Density is usually in gpm per square foot.",
            "Coverage area is the floor area assigned to that sprinkler.",
            "The result is the minimum acceptable sprinkler discharge.",
          ],
        },
        {
          id: "sprinkler-pressure-driven",
          title: "Actual discharge comes from pressure",
          body:
            "Once the network pressure at a sprinkler node is known, the actual sprinkler flow is calculated from its K-factor. Higher pressure produces higher flow, but the relationship uses the square root of pressure.",
          formula: "Q = K x sqrt(P)",
          example:
            "A K8.0 sprinkler at 25 psi flows 8.0 x sqrt(25) = 40 gpm.",
          keyPoints: [
            "Two sprinklers with the same K-factor can flow differently if node pressures differ.",
            "Actual flow must be at least the density-based minimum.",
            "Large K sprinklers can produce significant flow at relatively low pressure.",
          ],
        },
        {
          id: "sprinkler-invert-formula",
          title: "Finding minimum pressure",
          body:
            "The program can invert the discharge equation to find the pressure needed to produce a required minimum flow.",
          formula: "P = (Q / K)^2",
          example:
            "A K22.4 sprinkler needing 26 gpm requires (26 / 22.4)^2 = 1.35 psi minimum theoretical pressure.",
          keyPoints: [
            "This pressure only proves the individual sprinkler can meet minimum flow.",
            "The full system may require more pressure because of pipe friction and elevation.",
            "Final actual flow may be much higher than the minimum.",
          ],
        },
      ],
      questions: [
        {
          id: "sprinkler-001",
          level: "sprinkler-discharge",
          difficulty: "apprentice",
          prompt: "Which equation gives sprinkler discharge from K-factor and pressure?",
          choices: ["Q = K / sqrt(P)", "Q = K x sqrt(P)", "P = K x Q", "Q = P / K"],
          answerIndex: 1,
          explanation:
            "Sprinkler discharge is Q = K x sqrt(P), with Q in gpm and P in psi.",
          teaches: ["K-factor", "pressure-driven discharge"],
        },
        {
          id: "sprinkler-002",
          level: "sprinkler-discharge",
          difficulty: "designer",
          prompt:
            "A sprinkler has K = 8.0 and node pressure = 25 psi. What is its discharge?",
          choices: ["32 gpm", "40 gpm", "64 gpm", "200 gpm"],
          answerIndex: 1,
          explanation:
            "sqrt(25) = 5. The sprinkler flow is 8.0 x 5 = 40 gpm.",
          calculationNote: "Q = 8.0 x sqrt(25) = 40 gpm",
          teaches: ["K-factor math", "square root pressure"],
        },
        {
          id: "sprinkler-003",
          level: "sprinkler-discharge",
          difficulty: "designer",
          prompt:
            "Density is 0.20 gpm/ft2 and the sprinkler coverage area is 130 ft2. What is the minimum required sprinkler flow?",
          choices: ["13 gpm", "20 gpm", "26 gpm", "65 gpm"],
          answerIndex: 2,
          explanation:
            "Minimum flow from density is density times area: 0.20 x 130 = 26 gpm.",
          calculationNote: "0.20 x 130 = 26 gpm",
          teaches: ["density", "coverage area"],
        },
        {
          id: "sprinkler-004",
          level: "sprinkler-discharge",
          difficulty: "solver",
          prompt:
            "A K22.4 sprinkler has a minimum required flow of 26 gpm. Which pressure is the minimum theoretical pressure for that sprinkler to meet 26 gpm?",
          choices: ["1.35 psi", "7.0 psi", "13.5 psi", "33.5 psi"],
          answerIndex: 0,
          explanation:
            "Rearrange Q = K sqrt(P) to P = (Q / K)^2. P = (26 / 22.4)^2 = about 1.35 psi.",
          calculationNote: "P = (26 / 22.4)^2 = 1.35 psi",
          teaches: ["minimum pressure", "formula inversion"],
        },
        {
          id: "sprinkler-005",
          level: "sprinkler-discharge",
          difficulty: "solver",
          prompt:
            "Why might a final calculation show sprinklers flowing 60 gpm even though the density minimum is only 26 gpm?",
          choices: [
            "Because actual discharge follows node pressure and K-factor, not only the density minimum.",
            "Because all design calculations must double the density demand.",
            "Because grid systems ignore K-factor.",
            "Because the water supply curve replaces sprinkler equations.",
          ],
          answerIndex: 0,
          explanation:
            "The density minimum is a floor. If the system pressure needed to satisfy the network is higher, the pressure-driven sprinkler discharge can be much higher than the minimum.",
          teaches: ["actual vs minimum flow", "overdischarge"],
        },
        {
          id: "sprinkler-006",
          level: "sprinkler-discharge",
          difficulty: "designer",
          prompt:
            "Two sprinklers have the same K-factor. Sprinkler A has 9 psi and Sprinkler B has 16 psi. Which statement is correct?",
          choices: [
            "B flows 16/9 times as much as A.",
            "B flows 4/3 times as much as A.",
            "Both flow the same because K-factor is the same.",
            "A flows more because lower pressure means less friction.",
          ],
          answerIndex: 1,
          explanation:
            "Flow follows the square root of pressure. sqrt(16) / sqrt(9) = 4 / 3.",
          calculationNote: "Q_B / Q_A = sqrt(16) / sqrt(9) = 4/3",
          teaches: ["pressure ratio", "square root behavior"],
        },
      ],
    },
    {
      id: "friction-loss",
      title: "Pipe Friction, Elevation, And Resistance",
      outcome: "Learner can reason about why flow chooses lower resistance paths.",
      unlockScore: 75,
      concept:
        "Pipe friction is nonlinear. In Hazen-Williams form, loss grows approximately with Q^1.85 and decreases strongly as inside diameter increases. Elevation and fittings add additional pressure requirements.",
      sections: [
        {
          id: "friction-why-it-matters",
          title: "Why resistance controls flow",
          body:
            "Water follows pressure differences, but the amount of flow through a pipe is limited by resistance. Resistance is created by pipe length, actual inside diameter, roughness, fittings, and elevation change.",
          keyPoints: [
            "Longer pipe creates more friction loss.",
            "Smaller inside diameter creates much more friction loss.",
            "Fittings are usually converted to equivalent pipe length.",
          ],
        },
        {
          id: "friction-hazen-williams",
          title: "Hazen-Williams behavior",
          body:
            "For sprinkler calculations, Hazen-Williams is commonly used. The important learning point is not just the formula, but how strongly friction responds to flow and diameter.",
          formula: "friction loss = 4.52 x L x Q^1.85 / (C^1.85 x d^4.87)",
          example:
            "If flow doubles in the same pipe, friction increases by about 2^1.85 = 3.6 times.",
          keyPoints: [
            "Friction increases faster than flow.",
            "Diameter has a very strong effect because it is raised to about the 4.87 power.",
            "C-factor represents pipe roughness or internal condition.",
          ],
        },
        {
          id: "friction-elevation",
          title: "Elevation pressure",
          body:
            "Elevation is separate from pipe friction. Moving water upward consumes pressure. Moving water downward adds available pressure.",
          formula: "elevation pressure = 0.433 psi x vertical feet",
          example:
            "A 12 ft rise consumes 12 x 0.433 = 5.2 psi before friction is even considered.",
          keyPoints: [
            "Elevation loss is based only on vertical height difference.",
            "Friction loss depends on flow, length, diameter, and roughness.",
            "Both effects are included in total pressure required.",
          ],
        },
      ],
      questions: [
        {
          id: "friction-001",
          level: "friction-loss",
          difficulty: "apprentice",
          prompt:
            "In Hazen-Williams sprinkler calculations, friction loss changes approximately with which power of flow?",
          choices: ["Q^0.50", "Q^1.00", "Q^1.85", "Q^4.87"],
          answerIndex: 2,
          explanation:
            "For a given pipe, Hazen-Williams friction is proportional to Q^1.85.",
          teaches: ["Hazen-Williams", "nonlinear friction"],
        },
        {
          id: "friction-002",
          level: "friction-loss",
          difficulty: "designer",
          prompt:
            "If flow in the same pipe doubles, about how much does friction loss increase?",
          choices: ["2.0 times", "2.4 times", "3.6 times", "7.4 times"],
          answerIndex: 2,
          explanation:
            "2^1.85 is about 3.6. Friction rises faster than flow.",
          calculationNote: "2^1.85 = 3.61",
          teaches: ["flow exponent", "resistance feedback"],
        },
        {
          id: "friction-003",
          level: "friction-loss",
          difficulty: "designer",
          prompt:
            "Which change most strongly reduces friction loss for the same flow and pipe length?",
          choices: [
            "Increasing inside diameter.",
            "Increasing elevation.",
            "Adding a tee outlet.",
            "Lowering the C-factor.",
          ],
          answerIndex: 0,
          explanation:
            "Diameter has a very strong effect because Hazen-Williams loss varies approximately with 1 / d^4.87.",
          teaches: ["diameter effect", "pipe sizing"],
        },
        {
          id: "friction-004",
          level: "friction-loss",
          difficulty: "designer",
          prompt:
            "Water flows upward 12 ft between two nodes. What pressure is consumed by elevation alone?",
          choices: ["2.8 psi", "5.2 psi", "12.0 psi", "27.7 psi"],
          answerIndex: 1,
          explanation:
            "Water pressure changes by about 0.433 psi per vertical foot. 12 x 0.433 = 5.196 psi.",
          calculationNote: "12 x 0.433 = 5.2 psi",
          teaches: ["elevation loss", "static pressure"],
        },
        {
          id: "friction-005",
          level: "friction-loss",
          difficulty: "solver",
          prompt:
            "A pipe segment has 40 ft physical length and 18 ft equivalent fitting length. What length should be used in the friction equation?",
          choices: ["18 ft", "40 ft", "58 ft", "720 ft"],
          answerIndex: 2,
          explanation:
            "Equivalent fitting length is added to physical length. The effective friction length is 40 + 18 = 58 ft.",
          calculationNote: "40 + 18 = 58 ft",
          teaches: ["equivalent length", "minor losses"],
        },
        {
          id: "friction-006",
          level: "friction-loss",
          difficulty: "solver",
          prompt:
            "Two parallel paths feed the same node. Path A is shorter and larger. Path B is longer and smaller. What will generally happen?",
          choices: [
            "Path A carries more flow, but not necessarily all of it.",
            "Both paths always carry exactly half the flow.",
            "Path B carries more flow because it has more friction.",
            "Only the path drawn first carries flow.",
          ],
          answerIndex: 0,
          explanation:
            "Lower resistance paths carry more flow, but friction increases as flow increases, so some flow may still be forced into the alternate path until pressures balance.",
          teaches: ["parallel resistance", "flow split"],
        },
      ],
    },
    {
      id: "loop-balancing",
      title: "Loops And Pressure Balance",
      outcome: "Learner can explain why looped systems require iterative balancing.",
      unlockScore: 80,
      concept:
        "A looped system has more than one route between nodes. The same node cannot have two different pressures, so parallel paths feeding that node must settle into a flow split where energy losses are compatible.",
      sections: [
        {
          id: "loop-multiple-routes",
          title: "Multiple routes change the problem",
          body:
            "In a loop, water can reach the same node through more than one path. The program can no longer simply add flows backward, because the flow in each route depends on how much pressure is lost through the alternate routes.",
          keyPoints: [
            "A tied branch line creates a closed hydraulic loop.",
            "Parallel paths do not automatically split flow equally.",
            "The lower-resistance route carries more flow until friction balances the system.",
          ],
        },
        {
          id: "loop-energy-rule",
          title: "The loop energy rule",
          body:
            "If a calculation starts at a node, travels around a closed loop, and returns to the same node, the final pressure must equal the starting pressure. Therefore the signed sum of pressure losses and gains around the loop must be zero.",
          formula: "sum of signed pressure changes around a closed loop = 0",
          example:
            "If one path predicts a node pressure of 18 psi and another predicts 15 psi at the same node, the assumed flow split is not balanced.",
          keyPoints: [
            "A node can have only one pressure.",
            "Different routes to that node must be pressure-compatible.",
            "Loop imbalance tells the solver how to shift flow.",
          ],
        },
        {
          id: "loop-flow-correction",
          title: "How flow shifts",
          body:
            "When one path carries too much flow, its friction loss rises faster than the flow itself. The solver reduces flow in that path and increases flow in an alternate path until the loop energy error becomes acceptably small.",
          keyPoints: [
            "The Q^1.85 friction relationship helps prevent one path from taking all flow.",
            "A pipe may calculate with negative flow if actual flow is opposite the model's arbitrary pipe direction.",
            "Balanced loop flow is a result of pressure compatibility, not equal division.",
          ],
        },
      ],
      questions: [
        {
          id: "loop-001",
          level: "loop-balancing",
          difficulty: "apprentice",
          prompt:
            "What must be true around a closed hydraulic loop after the calculation converges?",
          choices: [
            "The algebraic sum of pressure changes around the loop is zero.",
            "Every pipe in the loop has the same flow.",
            "Every pipe in the loop has the same diameter.",
            "The longest path must carry no water.",
          ],
          answerIndex: 0,
          explanation:
            "A closed loop returns to the same pressure where it started, so the signed pressure losses and gains around the loop must sum to zero.",
          teaches: ["loop energy", "pressure balance"],
        },
        {
          id: "loop-002",
          level: "loop-balancing",
          difficulty: "designer",
          prompt:
            "Two different paths connect Node 10 to Node 20. What must be true about the final pressure at Node 20?",
          choices: [
            "It must be one value, regardless of which path is used to reach it.",
            "It must be higher through the shorter path.",
            "It must be lower through the smaller pipe path.",
            "It is not calculated in loop systems.",
          ],
          answerIndex: 0,
          explanation:
            "A node has one pressure. If two paths predict different arrival pressures, the flow split is not balanced yet.",
          teaches: ["single node pressure", "parallel route compatibility"],
        },
        {
          id: "loop-003",
          level: "loop-balancing",
          difficulty: "solver",
          prompt:
            "An assumed flow split sends too much flow through Path A. What usually indicates this in a loop calculation?",
          choices: [
            "Path A has excessive friction loss compared with the alternate route.",
            "Path A has zero elevation loss.",
            "Path A has a higher C-factor than expected.",
            "The sprinkler K-factor becomes negative.",
          ],
          answerIndex: 0,
          explanation:
            "Too much flow creates too much friction in that route. The solver reduces Path A flow and increases alternate path flow until loop losses balance.",
          teaches: ["flow correction", "loop residual"],
        },
        {
          id: "loop-004",
          level: "loop-balancing",
          difficulty: "designer",
          prompt:
            "Why does friction increasing with Q^1.85 help stabilize flow split in parallel paths?",
          choices: [
            "A path carrying extra flow becomes disproportionately more resistant.",
            "All paths become frictionless at high flow.",
            "Friction becomes independent of pipe diameter.",
            "Sprinkler discharge stops depending on pressure.",
          ],
          answerIndex: 0,
          explanation:
            "The nonlinear friction increase penalizes overloading one path, making alternate paths more attractive until equilibrium is reached.",
          teaches: ["nonlinear feedback", "flow distribution"],
        },
        {
          id: "loop-005",
          level: "loop-balancing",
          difficulty: "solver",
          prompt:
            "In a looped network, which statement best describes a pipe with negative calculated flow?",
          choices: [
            "The pipe is flowing opposite the arbitrary direction used in the model.",
            "The pipe has impossible hydraulic behavior.",
            "The pipe must be removed from the system.",
            "The sprinkler attached to that pipe is closed.",
          ],
          answerIndex: 0,
          explanation:
            "Programs assign each pipe an arbitrary positive direction. Negative flow simply means actual flow is in the opposite direction.",
          teaches: ["signed flow", "flow reversal"],
        },
        {
          id: "loop-006",
          level: "loop-balancing",
          difficulty: "solver",
          prompt:
            "Which pair of equations is most fundamental to looped hydraulic calculations?",
          choices: [
            "Node continuity and loop energy balance.",
            "Coverage area and ceiling slope.",
            "Nominal diameter and pipe color.",
            "Static pressure and drawing scale.",
          ],
          answerIndex: 0,
          explanation:
            "The calculation must conserve mass at nodes and conserve energy around loops.",
          teaches: ["mass balance", "energy balance"],
        },
      ],
    },
    {
      id: "grid-solving",
      title: "Computer Solver Behavior",
      outcome: "Learner can describe the iterative process used by a hydraulic engine.",
      unlockScore: 80,
      concept:
        "A computer calculates a grid as a simultaneous nonlinear network. It guesses pressures and flows, computes sprinkler discharge and pipe friction, checks residuals, corrects the guess, and repeats until node and loop errors are acceptably small.",
      sections: [
        {
          id: "solver-network",
          title: "The network model",
          body:
            "A computer stores the system as nodes and pipes. Nodes have elevations, pressures, and possible outlet demand. Pipes connect two nodes and have size, length, equivalent length, C-factor, and calculated flow.",
          keyPoints: [
            "Sprinklers are pressure-driven outlets at nodes.",
            "Pipes calculate resistance between nodes.",
            "The source node supplies whatever flow and pressure the solved network requires.",
          ],
        },
        {
          id: "solver-iteration",
          title: "The iterative cycle",
          body:
            "The solver starts with a reasonable guess, calculates flows from pressures, calculates sprinkler discharge from node pressures, checks the remaining imbalance, and then corrects the pressures or flows. It repeats this cycle until the residuals are small.",
          formula:
            "guess pressures -> calculate flows -> calculate residuals -> correct pressures -> repeat",
          keyPoints: [
            "A residual is the remaining error in node continuity or loop balance.",
            "Convergence means the errors are within tolerance.",
            "The final pipe flows are the balanced result, not manually assigned route flows.",
          ],
        },
        {
          id: "solver-reporting",
          title: "Reports are a view of the solution",
          body:
            "Calculation reports often present route tables because they are readable. The actual grid solution is still simultaneous. Route tables show the solved pressures, flows, friction losses, elevations, and added flows in a human-checkable sequence.",
          keyPoints: [
            "Do not confuse report route order with solver order.",
            "Flow added from another route means a connected path contributes at that node.",
            "Negative or low flow in a grid pipe may be valid if the network balances.",
          ],
        },
      ],
      questions: [
        {
          id: "solver-001",
          level: "grid-solving",
          difficulty: "designer",
          prompt:
            "What is a residual in a hydraulic network solver?",
          choices: [
            "The remaining imbalance after applying the current guessed pressures and flows.",
            "The total physical pipe length in the remote area.",
            "The water supply static pressure.",
            "The number of sprinklers not selected.",
          ],
          answerIndex: 0,
          explanation:
            "A residual measures how wrong the current iteration is, such as a node flow imbalance or loop pressure imbalance.",
          teaches: ["solver residual", "iteration"],
        },
        {
          id: "solver-002",
          level: "grid-solving",
          difficulty: "solver",
          prompt:
            "At a junction node with no sprinkler, the solver computes 210 gpm entering and 206 gpm leaving. What does this mean?",
          choices: [
            "The current iteration has a 4 gpm continuity residual.",
            "The node has passed exactly.",
            "The missing 4 gpm is hose stream demand.",
            "The pipe C-factor must be zero.",
          ],
          answerIndex: 0,
          explanation:
            "For a no-discharge junction, inflow should equal outflow. The 4 gpm mismatch is an error to be corrected.",
          calculationNote: "210 - 206 = 4 gpm residual",
          teaches: ["node residual", "continuity tolerance"],
        },
        {
          id: "solver-003",
          level: "grid-solving",
          difficulty: "solver",
          prompt:
            "Which sequence best describes a pressure-based network solver iteration?",
          choices: [
            "Guess node pressures, compute pipe flows and sprinkler flows, compute residuals, correct pressures.",
            "Sort pipes alphabetically, assign equal flow, ignore residuals, print report.",
            "Choose the largest pipe, force all flow through it, close all loops.",
            "Calculate water supply first and skip node pressures.",
          ],
          answerIndex: 0,
          explanation:
            "Modern solvers usually iterate: pressures produce flows, flows produce residuals, residuals drive pressure corrections.",
          teaches: ["solver cycle", "pressure unknowns"],
        },
        {
          id: "solver-004",
          level: "grid-solving",
          difficulty: "solver",
          prompt:
            "Why does a hydraulic engine need actual inside diameter rather than only nominal pipe size?",
          choices: [
            "Friction loss depends strongly on actual inside diameter.",
            "Nominal size is used only for drawing text height.",
            "Actual diameter determines sprinkler K-factor.",
            "Inside diameter only affects elevation loss.",
          ],
          answerIndex: 0,
          explanation:
            "Hazen-Williams uses inside diameter in the denominator with a high exponent, so small ID differences can materially affect loss.",
          teaches: ["actual ID", "friction coefficient"],
        },
        {
          id: "solver-005",
          level: "grid-solving",
          difficulty: "designer",
          prompt:
            "What does convergence mean in a grid hydraulic calculation?",
          choices: [
            "The remaining node and loop imbalances are within allowed tolerances.",
            "The first guessed flow split was accepted.",
            "All pipes have equal flow.",
            "The supply pressure equals zero.",
          ],
          answerIndex: 0,
          explanation:
            "Convergence means the equations are satisfied closely enough for engineering reporting.",
          teaches: ["convergence", "tolerance"],
        },
        {
          id: "solver-006",
          level: "grid-solving",
          difficulty: "solver",
          prompt:
            "Why are route tables in calculation reports not the same thing as the actual solving method?",
          choices: [
            "The solver balances the network simultaneously; routes are a readable reporting view of the solved result.",
            "Route tables are only for pipe labels and contain no hydraulic data.",
            "The solver ignores all loops and uses only the route table.",
            "Route tables replace the Hazen-Williams equation.",
          ],
          answerIndex: 0,
          explanation:
            "Reports often present paths so humans can inspect the result, but the grid solution itself is simultaneous and iterative.",
          teaches: ["report interpretation", "simultaneous solve"],
        },
      ],
    },
    {
      id: "system-demand",
      title: "System Demand And Water Supply",
      outcome: "Learner can connect calculated remote-area demand to available supply and safety margin.",
      unlockScore: 80,
      concept:
        "After the network converges, the program sums sprinkler and allowance flows, determines required source pressure, compares that demand to the water supply curve, and reports safety margin.",
      sections: [
        {
          id: "demand-total-flow",
          title: "Total demand flow",
          body:
            "After the hydraulic network converges, the program sums the actual calculated discharge from active sprinklers. It then adds hose allowance or other external demand at the required location.",
          formula: "total demand = sum(actual sprinkler flows) + hose allowance + other demand",
          example:
            "Twelve sprinklers at 60 gpm each plus 250 gpm hose demand equals 970 gpm total.",
          keyPoints: [
            "Use actual calculated sprinkler flow, not only minimum density flow.",
            "Hose demand may be added at the source or another specified node.",
            "The final demand point is flow at required source pressure.",
          ],
        },
        {
          id: "demand-supply-curve",
          title: "Available supply pressure",
          body:
            "The water supply curve estimates available pressure at the calculated system flow using static pressure, residual pressure, and test flow. The pressure drop from static is scaled using the Hazen-Williams exponent.",
          formula:
            "P_available = P_static - (P_static - P_residual) x (Q_demand / Q_test)^1.85",
          keyPoints: [
            "At zero flow, available pressure is static pressure.",
            "At the test flow, available pressure is residual pressure.",
            "At smaller demand than test flow, available pressure is between static and residual.",
          ],
        },
        {
          id: "demand-margin",
          title: "Safety margin",
          body:
            "The calculation passes the water supply comparison when available pressure at the system demand exceeds required source pressure. The difference is the safety margin.",
          formula: "safety margin = available pressure - required pressure",
          example:
            "If available pressure is 82 psi and required pressure is 64 psi, safety margin is 18 psi.",
          keyPoints: [
            "Positive margin means available supply exceeds demand.",
            "Negative margin means the system is short on pressure at the calculated flow.",
            "A converged network can still fail if sprinkler minimums or supply margin are not satisfied.",
          ],
        },
      ],
      questions: [
        {
          id: "demand-001",
          level: "system-demand",
          difficulty: "designer",
          prompt:
            "After solving all active sprinklers, how is total sprinkler demand found?",
          choices: [
            "Sum the actual calculated discharge of all active sprinklers.",
            "Use only the most demanding sprinkler flow.",
            "Multiply static pressure by pipe diameter.",
            "Use the number of pipes in the grid.",
          ],
          answerIndex: 0,
          explanation:
            "Total sprinkler demand is the sum of actual pressure-driven discharge from each operating sprinkler.",
          teaches: ["total demand", "actual sprinkler flow"],
        },
        {
          id: "demand-002",
          level: "system-demand",
          difficulty: "designer",
          prompt:
            "Twelve sprinklers each discharge 60 gpm and there is a 250 gpm hose allowance at the source. What is total system flow?",
          choices: ["310 gpm", "720 gpm", "970 gpm", "3000 gpm"],
          answerIndex: 2,
          explanation:
            "Sprinklers require 12 x 60 = 720 gpm. Add 250 gpm hose allowance for 970 gpm total.",
          calculationNote: "12 x 60 + 250 = 970 gpm",
          teaches: ["hose allowance", "source demand"],
        },
        {
          id: "demand-003",
          level: "system-demand",
          difficulty: "solver",
          prompt:
            "Water supply has 90 psi static, 70 psi residual at 3000 gpm. At a system demand of 750 gpm, what is the correct conceptual behavior?",
          choices: [
            "Available pressure should be between 90 psi and 70 psi, closer to 90 psi.",
            "Available pressure must equal 70 psi.",
            "Available pressure must equal 90 psi.",
            "Available pressure is unrelated to demand flow.",
          ],
          answerIndex: 0,
          explanation:
            "At less than the test flow, pressure loss from static is smaller, so available pressure lies between static and residual and is closer to static.",
          teaches: ["supply curve", "residual pressure"],
        },
        {
          id: "demand-004",
          level: "system-demand",
          difficulty: "solver",
          prompt:
            "Which formula best represents available pressure from a hydrant test using Hazen-Williams behavior?",
          choices: [
            "P_available = P_static - (P_static - P_residual) x (Q_demand / Q_test)^1.85",
            "P_available = P_residual - Q_demand",
            "P_available = Q_test / P_static",
            "P_available = K x sqrt(P)",
          ],
          answerIndex: 0,
          explanation:
            "The supply curve usually applies the 1.85 exponent to scale pressure drop from the hydrant test point.",
          teaches: ["water supply curve", "1.85 exponent"],
        },
        {
          id: "demand-005",
          level: "system-demand",
          difficulty: "designer",
          prompt:
            "If available pressure at the calculated demand is 82 psi and required source pressure is 64 psi, what is the safety margin?",
          choices: ["18 psi", "64 psi", "82 psi", "146 psi"],
          answerIndex: 0,
          explanation:
            "Safety margin is available pressure minus required pressure: 82 - 64 = 18 psi.",
          calculationNote: "82 - 64 = 18 psi",
          teaches: ["safety margin", "pass/fail comparison"],
        },
        {
          id: "demand-006",
          level: "system-demand",
          difficulty: "solver",
          prompt:
            "A calculation converges hydraulically but one active sprinkler is below its minimum required flow. What is the correct result?",
          choices: [
            "The design fails until pressure, pipe sizing, layout, or design assumptions are changed.",
            "The system passes because convergence alone is sufficient.",
            "The lowest sprinkler flow should be deleted from the report.",
            "The water supply curve automatically increases K-factor.",
          ],
          answerIndex: 0,
          explanation:
            "Convergence only means the equations balance. The design must also satisfy minimum sprinkler flow and pressure requirements.",
          teaches: ["minimum compliance", "convergence vs pass"],
        },
      ],
    },
  ];
  
  var COURSE_VERSION = "2026-06-26";

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
