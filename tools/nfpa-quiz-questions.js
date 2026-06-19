/*
 * SprinkFlow — NFPA 13 Speed Round question bank
 * ------------------------------------------------
 * Edit freely. Each question:
 *   q   : question text
 *   c   : array of EXACTLY four choices [A, B, C, D]
 *   a   : index (0-3) of the CORRECT choice
 *   ref : short citation shown after answering (vet/adjust as needed)
 *
 * "Who-wants-to-be-a-millionaire" style: one choice in each item is an
 * obvious throwaway. References are approximate and based on recent NFPA 13
 * (2022/2025) — James to vet before public launch.
 */
window.NFPA_QUIZ_QUESTIONS = [
  // ---- Occupancy hazard classification & design density ----
  { q: "What is the design density for a Light Hazard occupancy (density/area method)?", c: ["0.05 gpm/ft²", "0.10 gpm/ft²", "0.20 gpm/ft²", "Whatever the sprinkler feels like that day"], a: 1, ref: "NFPA 13 — Light Hazard design (≈0.10 gpm/ft²)" },
  { q: "Ordinary Hazard Group 1 is most commonly designed at which density?", c: ["0.10 gpm/ft²", "0.15 gpm/ft²", "0.30 gpm/ft²", "0.99 gpm/ft²"], a: 1, ref: "NFPA 13 — OH1 ≈0.15 gpm/ft²" },
  { q: "Ordinary Hazard Group 2 design density is typically:", c: ["0.15 gpm/ft²", "0.20 gpm/ft²", "0.40 gpm/ft²", "0.02 gpm/ft²"], a: 1, ref: "NFPA 13 — OH2 ≈0.20 gpm/ft²" },
  { q: "Extra Hazard Group 1 is generally designed at a density of:", c: ["0.20 gpm/ft²", "0.30 gpm/ft²", "0.10 gpm/ft²", "0.05 gpm/ft²"], a: 1, ref: "NFPA 13 — EH1 ≈0.30 gpm/ft²" },
  { q: "Extra Hazard Group 2 carries the highest standard density at:", c: ["0.30 gpm/ft²", "0.40 gpm/ft²", "0.25 gpm/ft²", "4.0 gpm/ft²"], a: 1, ref: "NFPA 13 — EH2 ≈0.40 gpm/ft²" },
  { q: "A typical office building is classified as which occupancy hazard?", c: ["Light Hazard", "Extra Hazard 2", "Ordinary Hazard 2", "Nuclear Hazard"], a: 0, ref: "NFPA 13 — Light Hazard examples include offices" },
  { q: "An auto repair garage is most commonly classified as:", c: ["Light Hazard", "Ordinary Hazard 2", "Special Hazard", "Featherweight Hazard"], a: 1, ref: "NFPA 13 — OH2 examples include repair garages" },
  { q: "Which is generally classified as Extra Hazard Group 2?", c: ["Library reading room", "Flammable liquid spraying / coating", "Hotel guest room", "A quiet meadow"], a: 1, ref: "NFPA 13 — EH2 includes flammable liquid operations" },
  { q: "Light Hazard occupancies are characterized by combustibles with:", c: ["Low quantity and low combustibility", "High quantity and high heat release", "Explosive potential", "A mind of their own"], a: 0, ref: "NFPA 13 — Light Hazard definition" },

  // ---- Coverage area & spacing ----
  { q: "Maximum protection area per standard spray sprinkler in Light Hazard (smooth ceiling) is generally:", c: ["100 ft²", "130 ft²", "225 ft²", "10,000 ft²"], a: 2, ref: "NFPA 13 — LH max ≈225 ft²" },
  { q: "Maximum protection area per sprinkler in Ordinary Hazard is generally:", c: ["100 ft²", "130 ft²", "225 ft²", "1 ft²"], a: 1, ref: "NFPA 13 — OH max ≈130 ft²" },
  { q: "Maximum protection area per sprinkler in Extra Hazard (density/area) is generally:", c: ["90/100 ft²", "130 ft²", "225 ft²", "500 ft²"], a: 0, ref: "NFPA 13 — EH max ≈100 ft² (90 ft² hydraulic)" },
  { q: "Maximum spacing between standard spray sprinklers in Light and Ordinary Hazard is:", c: ["12 ft", "15 ft", "20 ft", "1 mile"], a: 1, ref: "NFPA 13 — LH/OH max spacing 15 ft" },
  { q: "Maximum spacing between standard spray sprinklers in Extra Hazard is:", c: ["12 ft", "15 ft", "8 ft", "100 ft"], a: 0, ref: "NFPA 13 — EH max spacing 12 ft" },
  { q: "Maximum distance from a sprinkler to a wall is limited to:", c: ["The full max spacing", "One-half the allowable spacing", "One-quarter the spacing", "There is no limit"], a: 1, ref: "NFPA 13 — wall distance ≤ ½ allowable spacing" },
  { q: "What is the minimum distance between two standard spray sprinklers (without a baffle)?", c: ["6 ft", "3 ft", "10 ft", "6 inches"], a: 0, ref: "NFPA 13 — min spacing 6 ft (cold-soldering)" },
  { q: "The minimum spacing rule between sprinklers primarily prevents:", c: ["Cold soldering (wetting/cooling adjacent sprinklers)", "Pipe corrosion", "Excess water flow", "Sprinklers from getting lonely"], a: 0, ref: "NFPA 13 — minimum spacing prevents cold soldering" },

  // ---- Deflector position / clearances ----
  { q: "For standard upright/pendent sprinklers under an unobstructed ceiling, the deflector distance below the ceiling must be between:", c: ["1 in and 12 in", "4 in and 24 in", "12 in and 36 in", "0 in and 0 in"], a: 0, ref: "NFPA 13 — deflector 1–12 in below unobstructed ceiling" },
  { q: "Minimum clearance from a sprinkler deflector to the top of storage is generally:", c: ["6 in", "18 in", "36 in", "0 in"], a: 1, ref: "NFPA 13 — ≥18 in clearance to storage" },
  { q: "Sidewall sprinkler deflectors are typically positioned how far below the ceiling?", c: ["1 to 6 in", "4 to 6 in", "12 to 18 in", "It doesn't matter"], a: 1, ref: "NFPA 13 — sidewall deflector ≈4–6 in below ceiling" },
  { q: "The '18 in rule' refers to the clearance maintained below sprinkler deflectors and:", c: ["The floor", "The top of storage / obstructions affecting spray", "The nearest wall", "The lunchroom"], a: 1, ref: "NFPA 13 — 18 in clearance below deflectors to storage" },

  // ---- Obstructions ----
  { q: "The 'three-times rule' for obstructions says a sprinkler should be located away from an obstruction a distance at least:", c: ["3 times the obstruction's max dimension", "3 ft regardless of size", "3 in", "3 times your shoe size"], a: 0, ref: "NFPA 13 — obstruction 'three-times' rule" },
  { q: "Beams and obstructions are evaluated for spray pattern using primarily:", c: ["A coin flip", "The beam rule table (distance vs. deflector height)", "Pipe schedule tables", "The fire marshal's mood"], a: 1, ref: "NFPA 13 — beam rule / obstruction tables" },
  { q: "An obstruction wider than 4 ft (e.g., wide duct) generally requires:", c: ["Nothing extra", "Sprinklers installed beneath it", "Larger pipe only", "A warning sign"], a: 1, ref: "NFPA 13 — sprinklers required under obstructions >4 ft wide" },

  // ---- Temperature ratings & colors ----
  { q: "The ordinary temperature rating range for sprinklers is:", c: ["100–134°F", "135–170°F", "175–225°F", "500–600°F"], a: 1, ref: "NFPA 13 — Ordinary 135–170°F" },
  { q: "The intermediate temperature rating range is:", c: ["135–170°F", "175–225°F", "250–300°F", "0–32°F"], a: 1, ref: "NFPA 13 — Intermediate 175–225°F" },
  { q: "Maximum expected ceiling temperature for selecting an ORDINARY-rated sprinkler is about:", c: ["100°F", "150°F", "200°F", "1000°F"], a: 0, ref: "NFPA 13 — ordinary rating up to ~100°F ambient" },
  { q: "A glass-bulb sprinkler with a RED liquid bulb is rated at approximately:", c: ["135°F (orange)", "155°F", "200°F", "Strawberry"], a: 1, ref: "NFPA 13 — red bulb ≈155°F" },
  { q: "Which glass-bulb color indicates an approximately 135°F rating?", c: ["Orange", "Green", "Blue", "Plaid"], a: 0, ref: "NFPA 13 — orange bulb ≈135°F" },
  { q: "On a solder-link sprinkler, the ordinary temperature rating is identified by frame-arm color:", c: ["White", "Uncolored / black", "Blue", "Neon pink"], a: 1, ref: "NFPA 13 — ordinary = uncolored/black frame" },
  { q: "An intermediate-temperature solder sprinkler has frame arms colored:", c: ["White", "Red", "Green", "Camouflage"], a: 0, ref: "NFPA 13 — intermediate = white frame" },

  // ---- Sprinkler types & K-factors ----
  { q: "The K-factor of a standard 1/2 in orifice spray sprinkler is nominally:", c: ["2.8", "5.6", "8.0", "560"], a: 1, ref: "NFPA 13 — K5.6 standard 1/2 in" },
  { q: "A nominal K8.0 sprinkler corresponds to which orifice size family?", c: ["1/2 in", "17/32 in (≈3/4 in)", "1/4 in", "Garden hose"], a: 1, ref: "NFPA 13 — K8.0 large-orifice" },
  { q: "Flow from a sprinkler is calculated as:", c: ["Q = K√P", "Q = P/K", "Q = K + P", "Q = vibes × pressure"], a: 0, ref: "NFPA 13 — Q = K√P" },
  { q: "ESFR stands for:", c: ["Early Suppression Fast Response", "Extra Safe Fire Response", "Engineered Storage Flow Rate", "Extremely Squirty Fire Ruiner"], a: 0, ref: "NFPA 13 — ESFR definition" },
  { q: "Which is a common ESFR sprinkler K-factor?", c: ["5.6", "8.0", "14.0 / 16.8 / 25.2", "1.0"], a: 2, ref: "NFPA 13 — ESFR K14, K16.8, K22.4, K25.2" },
  { q: "CMSA sprinklers are also historically known as:", c: ["Large-drop sprinklers", "Residential sprinklers", "Sidewall sprinklers", "Squirt cannons"], a: 0, ref: "NFPA 13 — CMSA (formerly large-drop)" },
  { q: "A 'quick-response' (QR) sprinkler is distinguished by its:", c: ["Larger orifice", "Lower thermal sensitivity (RTI)", "Low RTI / fast thermal response", "Faster paperwork"], a: 2, ref: "NFPA 13 — QR = low RTI/fast response" },
  { q: "Residential sprinklers are listed primarily to provide:", c: ["Property protection only", "Life safety / tenability for egress", "Maximum density", "Background music"], a: 1, ref: "NFPA 13 — residential sprinklers focus on tenability" },
  { q: "A dry-pendent sprinkler is most commonly used to:", c: ["Increase density", "Protect areas subject to freezing from a wet system", "Reduce pipe size", "Stay dry on purpose for no reason"], a: 1, ref: "NFPA 13 — dry pendents extend into freezing areas" },

  // ---- System types ----
  { q: "A wet-pipe sprinkler system contains:", c: ["Water at all times under pressure", "Pressurized air only", "Nitrogen only", "Lemonade"], a: 0, ref: "NFPA 13 — wet-pipe = water-filled" },
  { q: "A dry-pipe system holds the piping under:", c: ["Water", "Pressurized air or nitrogen", "Vacuum", "Pure hope"], a: 1, ref: "NFPA 13 — dry-pipe held with air/nitrogen" },
  { q: "A preaction system typically requires:", c: ["Only a sprinkler to open", "Detection AND a sprinkler to operate (for some types)", "No water source", "A secret handshake"], a: 1, ref: "NFPA 13 — preaction uses detection + sprinkler" },
  { q: "A deluge system uses which type of sprinklers?", c: ["Closed (heat-activated)", "Open (no operating element)", "Residential only", "Imaginary"], a: 1, ref: "NFPA 13 — deluge uses open sprinklers" },
  { q: "Dry-pipe systems are limited in volume largely to control:", c: ["Cost", "Water delivery time after a sprinkler opens", "Pipe color", "Noise"], a: 1, ref: "NFPA 13 — dry-pipe water delivery time limits" },
  { q: "A common maximum water delivery time to the inspector's test connection on a dry system is:", c: ["15 seconds", "60 seconds", "Within the listed/required limit (e.g., ~60 s)", "1 hour"], a: 2, ref: "NFPA 13 — dry-pipe delivery-time requirement" },

  // ---- Water supply / hydraulics ----
  { q: "A hose stream allowance is ADDED to the sprinkler demand at the:", c: ["Most remote sprinkler", "Base of the riser / point of connection", "Roof", "Coffee machine"], a: 1, ref: "NFPA 13 — hose allowance added at base of riser/supply" },
  { q: "The hydraulically most demanding area is also called the:", c: ["Remote area / design area", "Closest area", "Average area", "Comfort zone"], a: 0, ref: "NFPA 13 — design (remote) area" },
  { q: "Friction loss in piping is most commonly computed using the:", c: ["Hazen-Williams formula", "Bernoulli lottery", "Ohm's law", "Pythagorean theorem"], a: 0, ref: "NFPA 13 — Hazen-Williams for friction loss" },
  { q: "In the Hazen-Williams equation, 'C' represents the:", c: ["Pipe diameter", "Pipe roughness/friction coefficient", "Water cost", "Ceiling height"], a: 1, ref: "NFPA 13 — C = friction loss coefficient" },
  { q: "A typical Hazen-Williams C-value for new steel (dry/black) pipe used in design is around:", c: ["100 (steel) / 150 (copper)", "10", "300", "42"], a: 0, ref: "NFPA 13 — C≈100–120 steel, 150 copper/plastic" },
  { q: "Pressure loss due to elevation change is approximately:", c: ["0.433 psi per ft of height", "1 psi per ft", "0.1 psi per ft", "Negligible always"], a: 0, ref: "NFPA 13 — 0.433 psi/ft elevation" },
  { q: "Velocity pressure is generally:", c: ["Required in all calculations", "Permitted to be neglected (normally not included)", "Larger than total pressure", "The main design driver"], a: 1, ref: "NFPA 13 — velocity pressure normally neglected" },
  { q: "The minimum operating pressure for most standard spray sprinklers is generally:", c: ["7 psi", "0 psi", "50 psi", "175 psi"], a: 0, ref: "NFPA 13 — min ≈7 psi standard spray" },

  // ---- Pipe, fittings, valves ----
  { q: "A hydrostatic test of a sprinkler system is generally performed at:", c: ["50 psi for 30 min", "200 psi for 2 hours (or 50 psi above max where >150)", "10 psi for 1 min", "Until something breaks"], a: 1, ref: "NFPA 13 — 200 psi / 2 hr hydrostatic test" },
  { q: "Which is NOT an acceptable underground-to-aboveground transition concern addressed by NFPA 13/24?", c: ["Corrosion protection", "Thrust restraint", "Proper backfill", "Pipe horoscope"], a: 3, ref: "NFPA 13/24 — underground requirements" },
  { q: "CPVC pipe in sprinkler systems is limited primarily by:", c: ["Temperature/listing limitations", "Color", "Weight only", "Nothing at all"], a: 0, ref: "NFPA 13 — CPVC per listing/temperature limits" },
  { q: "The main control valve on a system must be:", c: ["Hidden", "Supervised (locked open / tamper switch)", "Painted green", "Removed after install"], a: 1, ref: "NFPA 13 — control valves supervised" },
  { q: "A waterflow alarm device on a wet system is typically a:", c: ["Pressure reducing valve", "Waterflow (vane) switch / alarm check valve", "Backflow preventer", "Doorbell"], a: 1, ref: "NFPA 13 — waterflow alarm devices" },

  // ---- Hangers, bracing, seismic ----
  { q: "Maximum spacing of hangers on 1 in steel branch-line pipe is generally:", c: ["12 ft", "15 ft", "10 ft", "100 ft"], a: 0, ref: "NFPA 13 — hanger spacing table (≈12 ft for 1 in)" },
  { q: "Seismic bracing on sprinkler systems is intended to:", c: ["Lower water cost", "Resist differential movement / keep piping intact in earthquakes", "Increase density", "Look cool"], a: 1, ref: "NFPA 13 — seismic protection of piping" },
  { q: "The two main types of sway braces are:", c: ["Lateral and longitudinal", "Up and sideways", "Hot and cold", "Real and fake"], a: 0, ref: "NFPA 13 — lateral & longitudinal sway bracing" },
  { q: "A 4-way brace resists movement in:", c: ["One direction", "Both lateral and longitudinal directions", "Only vertical", "Time"], a: 1, ref: "NFPA 13 — 4-way bracing (lateral + longitudinal)" },

  // ---- Storage protection ----
  { q: "Which NFPA 13 commodity class generally represents the LOWEST fire challenge?", c: ["Class I", "Class IV", "Group A plastics", "Class XII"], a: 0, ref: "NFPA 13 — Class I lowest of I–IV" },
  { q: "Group A plastics are significant because they:", c: ["Burn slowly", "Have a high heat release rate", "Cannot be stored", "Are fireproof"], a: 1, ref: "NFPA 13 — Group A plastics = high heat release" },
  { q: "In-rack sprinklers (IRAS) are used primarily to:", c: ["Replace ceiling sprinklers always", "Provide protection within the rack storage array", "Cool the building", "Decorate the rack"], a: 1, ref: "NFPA 13 — in-rack sprinklers" },
  { q: "CMDA stands for:", c: ["Control Mode Density/Area", "Ceiling Mounted Deluge Array", "Common Material Data Analysis", "Cool Misting Device Apparatus"], a: 0, ref: "NFPA 13 — CMDA (control mode density/area)" },
  { q: "CMSA stands for:", c: ["Control Mode Specific Application", "Ceiling Mount Spray Action", "Combined Multi-Story Application", "Casual Mist Spraying Allowance"], a: 0, ref: "NFPA 13 — CMSA definition" },
  { q: "ESFR sprinklers aim to do what to a storage fire?", c: ["Control it only", "Suppress (extinguish/knock down) it early", "Ignore it", "Spread it evenly"], a: 1, ref: "NFPA 13 — ESFR suppresses, not just controls" },
  { q: "Encapsulated storage refers to product that is:", c: ["Wrapped in plastic on top and sides (or fully)", "Stored outdoors", "Frozen", "In a time capsule"], a: 0, ref: "NFPA 13 — encapsulation definition" },
  { q: "Idle wood pallets stored indoors are a concern because they:", c: ["Are non-combustible", "Present a severe fire challenge (large surface area)", "Cannot be stacked", "Smell nice"], a: 1, ref: "NFPA 13 — idle pallets are a high hazard" },
  { q: "For storage, the ceiling sprinkler protection is selected based on commodity, storage height, and:", c: ["Ceiling/roof height", "Floor color", "Number of employees", "Day of the week"], a: 0, ref: "NFPA 13 — storage criteria vary with ceiling height" },
  { q: "Solid shelving in racks affects protection because it:", c: ["Helps water reach the fire", "Blocks vertical water penetration", "Has no effect", "Increases C-factor"], a: 1, ref: "NFPA 13 — solid shelves obstruct water penetration" },

  // ---- Misc design ----
  { q: "Sprinklers are generally required below ductwork or platforms wider than:", c: ["2 ft", "4 ft", "10 ft", "0.5 in"], a: 1, ref: "NFPA 13 — obstructions/platforms >4 ft" },
  { q: "Concealed spaces of combustible construction generally:", c: ["Never need sprinklers", "May require sprinklers unless an exception applies", "Always use ESFR", "Are filled with water"], a: 1, ref: "NFPA 13 — concealed-space rules & exceptions" },
  { q: "A sprinkler that has operated in a fire should be:", c: ["Reused after drying", "Replaced", "Painted", "Promoted"], a: 1, ref: "NFPA 13 — operated sprinklers are replaced" },
  { q: "Painting of sprinklers (except factory finish) is:", c: ["Encouraged", "Not permitted (only the manufacturer may coat them)", "Required annually", "A fun weekend project"], a: 1, ref: "NFPA 13 — field painting prohibited" },
  { q: "A spare sprinkler cabinet must contain spares and a:", c: ["Fire extinguisher", "Sprinkler wrench (and list)", "Spare pump", "Snack"], a: 1, ref: "NFPA 13 — spare sprinklers + wrench + list" },
  { q: "The minimum number of spare sprinklers required for systems with 300–1000 sprinklers is:", c: ["2", "6", "12", "300"], a: 2, ref: "NFPA 13 — 6/12/24 spare tiers" },
  { q: "Antifreeze solutions in sprinkler systems are now restricted to:", c: ["Any concentration", "Listed antifreeze solutions (e.g., listed/factory-premixed)", "Pure water", "Maple syrup"], a: 1, ref: "NFPA 13 — listed antifreeze requirements" },
  { q: "The primary purpose of an inspector's test connection is to:", c: ["Drain the system", "Simulate the flow of one sprinkler to test the alarm", "Fill the system", "Test the inspector"], a: 1, ref: "NFPA 13 — inspector's test connection" },
  { q: "An auxiliary drain (drum drip) is provided in dry systems to:", c: ["Add air", "Remove trapped condensate/water from low points", "Increase pressure", "Drip dramatically"], a: 1, ref: "NFPA 13 — low-point auxiliary drains" },

  // ---- Definitions & general ----
  { q: "The 'design area' in a density/area calculation is the:", c: ["Whole building", "Area of operating sprinklers assumed in the calculation", "Mechanical room", "Parking lot"], a: 1, ref: "NFPA 13 — design/remote area" },
  { q: "A 'small room' rule can reduce the number of design sprinklers in rooms of light hazard up to:", c: ["800 ft²", "Approximately 800 ft² (per the small-room provision)", "10,000 ft²", "1 ft²"], a: 1, ref: "NFPA 13 — small-room provision (~800 ft²)" },
  { q: "Standard coverage vs. extended coverage sprinklers differ mainly in:", c: ["Color", "Maximum coverage area/spacing they're listed for", "Pipe material", "Brand loyalty"], a: 1, ref: "NFPA 13 — EC sprinklers listed for larger areas" },
  { q: "The maximum floor area protected by a single system riser (Light/Ordinary Hazard) is generally:", c: ["12,000 ft²", "52,000 ft²", "100,000 ft²", "Unlimited"], a: 1, ref: "NFPA 13 — ≈52,000 ft² per system (LH/OH)" },
  { q: "The maximum floor area per system for Extra Hazard and high-piled storage is generally:", c: ["52,000 ft²", "40,000 ft²", "5,000 ft²", "1,000,000 ft²"], a: 1, ref: "NFPA 13 — ≈40,000 ft² (EH/storage)" },
  { q: "A fire department connection (FDC) allows:", c: ["The system to drain", "The fire department to pump water into the system", "Sprinklers to be removed", "Pizza delivery"], a: 1, ref: "NFPA 13 — FDC supplements supply" },
  { q: "Listing of a sprinkler component means it has been:", c: ["Sold once", "Evaluated/approved by a recognized testing lab for its use", "Painted", "Mentioned in a magazine"], a: 1, ref: "NFPA 13 — 'listed' definition" },
  { q: "Which document covers the INSTALLATION of sprinkler systems (vs. inspection/testing)?", c: ["NFPA 25", "NFPA 13", "NFPA 72", "NFPA 0"], a: 1, ref: "NFPA 13 = installation; NFPA 25 = ITM" },
  { q: "Inspection, testing, and maintenance of existing water-based systems is governed by:", c: ["NFPA 13", "NFPA 25", "NFPA 101", "NFPA 13D"], a: 1, ref: "NFPA 25 — ITM standard" },
  { q: "NFPA 13D applies to sprinkler systems in:", c: ["High-rise offices", "One- and two-family dwellings and manufactured homes", "Warehouses", "Stadiums"], a: 1, ref: "NFPA 13D — one/two-family dwellings" },
  { q: "NFPA 13R applies to:", c: ["Residential occupancies up to four stories (low-rise)", "Single-family homes only", "Nuclear plants", "Treehouses"], a: 0, ref: "NFPA 13R — low-rise residential occupancies" },

  // ---- More design facts ----
  { q: "Pipe schedule design (vs. hydraulic calc) is generally limited to:", c: ["All new systems", "Light and Ordinary Hazard within certain limits / existing systems", "Extra Hazard only", "Storage only"], a: 1, ref: "NFPA 13 — pipe schedule limitations" },
  { q: "Branch lines are the pipes that:", c: ["Feed the cross mains", "Directly supply the sprinklers", "Connect to the city main", "Branch into the parking lot"], a: 1, ref: "NFPA 13 — branch line definition" },
  { q: "A cross main:", c: ["Supplies the branch lines", "Supplies a single sprinkler", "Is the city water main", "Crosses the street"], a: 0, ref: "NFPA 13 — cross main feeds branch lines" },
  { q: "A feed main:", c: ["Supplies the cross mains/risers", "Supplies one sprinkler", "Is always 1 in", "Feeds the dog"], a: 0, ref: "NFPA 13 — feed main definition" },
  { q: "The riser is the:", c: ["Horizontal branch line", "Vertical supply pipe / system riser assembly", "Drain only", "Morning alarm"], a: 1, ref: "NFPA 13 — riser definition" },
  { q: "Drainage of system piping must be arranged so pipe:", c: ["Holds water permanently", "Can be drained (pitched / equipped with drains)", "Is never drained", "Drains onto the roof"], a: 1, ref: "NFPA 13 — drainage provisions" },
  { q: "An air compressor or nitrogen generator on a dry/preaction system maintains:", c: ["Water pressure", "Supervisory air/gas pressure", "Density", "Room temperature"], a: 1, ref: "NFPA 13 — dry/preaction gas supervision" },
  { q: "Corrosion in dry/preaction systems is increasingly mitigated using:", c: ["Salt water", "Nitrogen instead of compressed air", "More steel", "Prayer"], a: 1, ref: "NFPA 13 — nitrogen reduces corrosion" },

  // ---- Sprinkler position / special locations ----
  { q: "Sprinklers in coolers/freezers are typically protected by:", c: ["Wet pipe", "Dry systems / dry sprinklers (freeze protection)", "Open sprinklers", "Nothing"], a: 1, ref: "NFPA 13 — freeze protection in cold spaces" },
  { q: "A sprinkler installed near a heat source (unit heater, skylight) may need a:", c: ["Lower temperature rating", "Higher (intermediate/high) temperature rating", "Larger orifice", "Sun hat"], a: 1, ref: "NFPA 13 — higher temp ratings near heat sources" },
  { q: "Sprinklers under open gratings or stairs are addressed because spray can be:", c: ["Improved", "Obstructed or pass through to lower levels", "Eliminated", "Reflected to space"], a: 1, ref: "NFPA 13 — obstructions & multi-level spaces" },
  { q: "Skylights and large unsprinklered ceiling pockets are limited in:", c: ["Color", "Size/area before sprinklers are required", "Cost", "Number of windows"], a: 1, ref: "NFPA 13 — ceiling pocket / skylight allowances" },

  // ---- A few 'gimme' / fun ones ----
  { q: "What color are most fire sprinkler system identification signs/placards expected to be legible and:", c: ["Permanent / durable", "Temporary", "Invisible", "Edible"], a: 0, ref: "NFPA 13 — permanent identification signage" },
  { q: "The fundamental goal of NFPA 13 sprinkler design is to:", c: ["Maximize water use", "Control or suppress a fire to protect life and property", "Cool the building in summer", "Make noise"], a: 1, ref: "NFPA 13 — purpose/scope" },
  { q: "A sprinkler 'activates' when:", c: ["The building is occupied", "Its heat-responsive element reaches its rated temperature", "The alarm is silenced", "Someone claps"], a: 1, ref: "NFPA 13 — thermal element operation" },
  { q: "Each sprinkler in a wet system operates:", c: ["All at once together", "Individually, only where heat is sufficient", "Never", "On a timer"], a: 1, ref: "NFPA 13 — sprinklers operate individually" },
  { q: "The 'remote area' is located where in the system?", c: ["Hydraulically most demanding location", "Closest to the riser", "Center of the building", "Break room"], a: 0, ref: "NFPA 13 — remote/design area selection" },
  { q: "Which is a recognized method to demonstrate adequate water supply?", c: ["A flow test (hydrant test) plotted on graph paper / N1.85", "Guessing", "Asking a neighbor", "Counting hydrants"], a: 0, ref: "NFPA 13 — water supply from flow test data" },
  { q: "A pressure-reducing valve may be required where system pressures exceed:", c: ["175 psi", "100 psi", "50 psi", "5 psi"], a: 0, ref: "NFPA 13 — components rated 175 psi; PRVs above" },
  { q: "Standard sprinkler system components are typically rated for a working pressure of at least:", c: ["50 psi", "175 psi", "500 psi", "12 psi"], a: 1, ref: "NFPA 13 — 175 psi component rating" },
  { q: "The K-factor of a sprinkler is determined by its:", c: ["Color", "Orifice size and internal geometry", "Length of pipe", "Brand name"], a: 1, ref: "NFPA 13 — K-factor reflects orifice characteristics" },
  { q: "Extended-coverage sprinklers must be installed:", c: ["Any way you like", "Per their specific listing (spacing, pressure, deflector)", "Only upright", "Upside down"], a: 1, ref: "NFPA 13 — install EC per listing" },
  { q: "Quick-response sprinklers are generally required in:", c: ["All warehouses", "Light hazard occupancies (with exceptions)", "Only freezers", "Nowhere"], a: 1, ref: "NFPA 13 — QR generally in light hazard" },
  { q: "Where sprinklers are subject to mechanical damage, the protection is a:", c: ["Listed guard / cage", "Bigger orifice", "Lower temperature", "Caution cone"], a: 0, ref: "NFPA 13 — listed sprinkler guards" },
  { q: "The minimum water supply duration for Light Hazard is commonly:", c: ["30 minutes", "60–90 minutes", "5 minutes", "24 hours"], a: 0, ref: "NFPA 13 — LH ≈30 min (with hose/area tables)" },
  { q: "A density/area curve trade-off generally allows:", c: ["Higher density → smaller area, lower density → larger area", "More density and more area always", "No trade-offs", "Free pizza"], a: 0, ref: "NFPA 13 — density/area design curves" },
  { q: "Obstructions to sprinkler discharge are categorized as obstructing either the development of the spray pattern OR:", c: ["The water supply", "Sprinklers from reaching the floor/protected hazard", "The alarm", "The view"], a: 1, ref: "NFPA 13 — two obstruction categories" },
  { q: "When storage exceeds the limits of the ceiling-only criteria, the designer typically adds:", c: ["Paint", "In-rack sprinklers or upgrades the ceiling system (e.g., ESFR)", "More aisles only", "A taller roof"], a: 1, ref: "NFPA 13 — in-rack / ESFR for tall storage" },
  { q: "The aisle width between storage racks can affect:", c: ["Nothing", "Fire spread and the required protection scheme", "Pipe color", "Hanger spacing only"], a: 1, ref: "NFPA 13 — aisle width factors into storage protection" },
  { q: "Dry-pipe and preaction systems generally require their water delivery be verified by a:", c: ["Trip test", "Color test", "Taste test", "Vibe check"], a: 0, ref: "NFPA 13 / 25 — dry-pipe trip test" },
];
