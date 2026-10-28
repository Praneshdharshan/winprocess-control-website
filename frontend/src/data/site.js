export const SITE_URL = "https://www.winprocess.in";

export const COMPANY = {
  name: "Win Process Control Engineering",
  shortName: "Win Process",
  tagline: "Mfg. Instrumentation Valves, Fittings and Engg. Components",
  established: "2018",
  founder: { name: "Mr. G. Manikandan", role: "Proprietor · Business Head – Technical" },
  phones: [
    { label: "+91 90032 20422", raw: "919003220422" },
    { label: "+91 90032 43440", raw: "919003243440" },
  ],
  emails: ["info@winprocess.in", "winprocess2018@gmail.com"],
  website: "www.winprocess.in",
  addresses: {
    registered: {
      title: "Registered Office",
      lines: ["E-15, 2nd Floor, Agni Estate Foundations", "Pambai Salai, ICF Colony, Athipet", "Chennai – 600 058, Tamil Nadu, India"],
      mapQuery: "Agni Estate Foundations, Pambai Salai, ICF Colony, Athipet, Chennai 600058",
    },
    works: {
      title: "Works",
      lines: ["No. 14/41, Kavarai Street, Athipet", "Ambattur", "Chennai – 600 058, Tamil Nadu, India"],
      mapQuery: "14/41 Kavarai Street, Athipet, Ambattur, Chennai 600058",
    },
  },
  whatsappText: "Hello Win Process Control Engineering, I have an enquiry for instrumentation valves / fittings.",
  profile:
    "Win Process Control Engineering was established in the year 2018 by our founder Mr. G. Manikandan, Proprietor. Win Process specialises in the design, development, production and marketing of high quality instrumentation valves and fittings in a wide variety of materials for high pressure, temperature and vacuum applications. An accent on quality combined with ongoing research and development has given the company an international reputation for excellence.",
};

export const BRANDS = [
  { id: "win-val", name: "WIN-VAL", title: "Instrumentation Valves", text: "Manifold, ball, needle, globe, gate and non-return valves in bar stock and forged construction." },
  { id: "win-lok", name: "WIN-LOK", title: "Tube & Pipe Fittings", text: "Double ferrule tube fittings, threaded pipe fittings, high pressure and valve fittings." },
  { id: "win-fit", name: "WIN-FIT", title: "Engineering Components", text: "Condensate pots, air headers, syphons, thermowells and quick release couplings." },
];

export const INDUSTRIES = ["Petrochemical", "Semiconductor", "Energy", "Food", "Biotechnology", "Pharmaceutical", "Defence", "Pulp & Paper", "Mining"];

export const MATERIALS = ["Stainless Steel", "Carbon Steel", "Alloy Steel", "Nickel Alloy", "Brass", "Bronze", "CF8M / CF8"];

export const IMAGES = {
  hero: "/images/hero-refinery.jpg",
  workshop: "/images/workshop.jpg",
  logo: "/images/brand/logo.png",
  logoMark: "/images/brand/logo-mark.png",
  brochure: "/Win-Process-Control-Engineering-Brochure.pdf",
};

export const CATEGORIES = ["All", "Valves", "Tube & Pipe Fittings", "Engineering Components"];

const SS_CS_AS_NI = ["Stainless Steel", "Carbon Steel", "Alloy Steel", "Nickel Alloy"];

export const PRODUCTS = [
  {
    id: "manifold-valves",
    name: "Manifold Valves",
    brand: "WIN-VAL",
    category: "Valves",
    image: "/images/products/manifold-valves.jpg",
    description: "2-way, 3-way and 5-way instrumentation manifolds for pressure and differential pressure transmitter hook-ups.",
    overview:
      "Our manifold valves combine block, equalise and vent functions in a single compact body, reducing leak paths and installation time for pressure and DP transmitters. Available in direct and remote mounting styles across a wide range of materials.",
    specs: [
      ["Type", "2 Way / 3 Way / 5 Way"],
      ["M.O.C", SS_CS_AS_NI.join(" / ")],
      ["Size", '1/4" to 1/2"'],
      ["End Connections", "NPT / BSP / BSPT / SW / Metric"],
      ["Pressure Rating", "3000 / 6000 / 9000 PSI"],
    ],
    applications: ["Pressure & DP transmitters", "Flow orifice metering", "Level measurement", "Gauge isolation"],
  },
  {
    id: "ball-valves",
    name: "Ball Valves",
    brand: "WIN-VAL",
    category: "Valves",
    image: "/images/products/ball-valves.jpg",
    description: "Bar stock and investment cast ball valves in 2-piece and 3-piece designs for quarter-turn shut-off.",
    overview:
      "Quarter-turn ball valves offering bubble-tight shut-off for gas and liquid service. Bar stock and IC body options in 2PC / 3PC designs, with lever handles and a wide choice of end connections including tube OD.",
    specs: [
      ["Type", "Bar Stock & IC, 2PC / 3PC Design"],
      ["M.O.C", "Stainless Steel / Carbon Steel / Alloy Steel / Brass / CF8M / CF8"],
      ["Size", '1/4" to 2"'],
      ["End Connections", "NPT / BSP / BSPT / Tube OD / SW"],
      ["Pressure Rating", "1000 PSI to 10000 PSI"],
    ],
    applications: ["Instrument isolation", "Sampling systems", "Utility lines", "Skid-mounted systems"],
  },
  {
    id: "needle-valves",
    name: "Needle Valves",
    brand: "WIN-VAL",
    category: "Valves",
    image: "/images/products/needle-valves.jpg",
    description: "Bar stock needle valves for fine flow regulation and positive shut-off in high pressure instrument lines.",
    overview:
      "Precision bar stock needle valves for throttling and shut-off duty on instrumentation, sampling and gauge lines. Straight and angle patterns, available in imperial and metric tube OD sizes with multiple thread standards.",
    specs: [
      ["Type", "Bar Stock"],
      ["M.O.C", "Stainless Steel / Carbon Steel / Alloy Steel / Brass / Nickel Alloy"],
      ["Size", '1/8" to 1" OD & 4 mm to 25 mm OD'],
      ["End Connections", "NPT / BSP / BSPT / SW / Tube OD / UNF / Metric"],
      ["Pressure Rating", "15000 PSI"],
    ],
    applications: ["Gauge & transmitter isolation", "Flow regulation", "Sampling & drain lines", "Hydraulic test rigs"],
  },
  {
    id: "globe-valve",
    name: "Globe Valve",
    brand: "WIN-VAL",
    category: "Valves",
    image: "/images/products/globe-valve.jpg",
    description: "Forged body globe valves with screwed bonnet and OS&Y bonnet for regulating and isolation duty.",
    overview:
      "Forged body globe valves in screwed bonnet and outside-screw-and-yoke (OS&Y) bonnet constructions. Offered in screwed, socket weld and butt weld ends across pressure classes from #800 to #4500.",
    specs: [
      ["Type", "Forged Body – Screwed Bonnet & OS&Y Bonnet"],
      ["M.O.C", SS_CS_AS_NI.join(" / ")],
      ["Size", "15 NB to 50 NB"],
      ["End Connections", "Screwed / Socket Welded / Butt Welded"],
      ["Pressure Rating", "Class #800 to #4500"],
    ],
    applications: ["Steam & condensate lines", "Process piping", "Boiler feed", "High pressure utilities"],
  },
  {
    id: "gate-valve",
    name: "Gate Valve",
    brand: "WIN-VAL",
    category: "Valves",
    image: "/images/products/gate-valve.jpg",
    description: "Cast body screwed bonnet gate valves for full-bore on/off isolation.",
    overview:
      "Casting body gate valves with screwed bonnet and rising stem for full-bore, low pressure-drop isolation. Available in stainless steel, carbon steel and bronze with screwed, socket weld or butt weld ends.",
    specs: [
      ["Type", "Casting Body – Screwed Bonnet"],
      ["M.O.C", "Stainless Steel / Carbon Steel / Bronze"],
      ["Size", "15 NB to 50 NB"],
      ["End Connections", "Screwed / Socket Welded / Butt Welded"],
      ["Pressure Rating", "Class #800"],
    ],
    applications: ["Water & utility isolation", "Process piping", "Fire water lines", "Plant utilities"],
  },
  {
    id: "non-return-valve",
    name: "Non Return Valve",
    brand: "WIN-VAL",
    category: "Valves",
    image: "/images/products/non-return-valve.jpg",
    description: "Inline non-return (check) valves preventing reverse flow in high pressure instrumentation lines.",
    overview:
      "Compact inline check valves that allow flow in one direction and close automatically against reverse flow. Suitable for very high pressure duty with a low cracking pressure.",
    specs: [
      ["Type", "Online (Inline)"],
      ["M.O.C", "Stainless Steel / Carbon Steel / Alloy Steel / Brass"],
      ["Size", '1/4" to 2"'],
      ["End Connections", "NPT / BSP / BSPT / Tube OD / SW"],
      ["Pressure Rating", "20000 PSI · Cracking Pressure 1 kg/cm²"],
    ],
    applications: ["Pump discharge protection", "Compressor lines", "Sampling systems", "Hydraulic circuits"],
  },
  {
    id: "tube-fittings",
    name: "Tube Fittings",
    brand: "WIN-LOK",
    category: "Tube & Pipe Fittings",
    image: "/images/products/tube-fittings.jpg",
    description: "Double ferrule compression tube fittings – connectors, unions, elbows, tees, crosses, plugs and caps.",
    overview:
      "WIN-LOK double ferrule tube fittings provide a leak-tight, torque-free seal on instrumentation tubing. The complete range covers male and female connectors, unions, bulkhead unions, crosses, elbows, tees, tube plugs and caps.",
    specs: [
      ["Type", "Male / Female Connectors, Union, Bulkhead Union, Cross, Elbow, Tee, Tube Plug & Tube Cap"],
      ["M.O.C", SS_CS_AS_NI.join(" / ")],
      ["Size", '1/8" to 1"'],
      ["End Connections", "NPT / BSP / BSPT / UNF / Metric"],
      ["Pressure Rating", "Up to 9000 PSI"],
    ],
    applications: ["Instrument impulse lines", "Analyzer sampling systems", "Hydraulic & pneumatic tubing", "Gas distribution panels"],
  },
  {
    id: "pipe-fittings",
    name: "Pipe Fittings",
    brand: "WIN-LOK",
    category: "Tube & Pipe Fittings",
    image: "/images/products/pipe-fittings.jpg",
    description: "Threaded and socket weld pipe fittings – couplings, elbows, tees, crosses, unions, nipples and adaptors.",
    overview:
      "High pressure pipe fittings machined from certified bar stock: half and full couplings, elbows, tees, crosses, unions, pipe nipples and adaptors, in all common thread forms.",
    specs: [
      ["Type", "Half / Full Coupling, Elbow, Tee, Cross, Union, Pipe Nipples & Adaptor"],
      ["M.O.C", SS_CS_AS_NI.join(" / ")],
      ["Size", '1/8" to 2"'],
      ["End Connections", "NPT / BSP / BSPT / UNF / Metric"],
      ["Pressure Rating", "Up to 10000 PSI"],
    ],
    applications: ["Process piping", "Instrument hook-ups", "Utility headers", "OEM equipment"],
  },
  {
    id: "high-pressure-fittings",
    name: "High Pressure Fittings",
    brand: "WIN-LOK",
    category: "Tube & Pipe Fittings",
    image: "/images/products/high-pressure-fittings.jpg",
    description: "Coned-and-threaded elbows, tees and crosses for ultra high pressure tube connections.",
    overview:
      "Block-style elbows, tees and crosses with UNF coned-and-threaded connections for ultra high pressure service up to 60000 PSI, suitable for tube connections from 1/4\" to 3/4\".",
    specs: [
      ["Type", "Elbow / Tee / Cross"],
      ["M.O.C", "Stainless Steel / Carbon Steel / Brass"],
      ["Size", '1/4" to 3/4" (suitable for tube connection)'],
      ["End Connections", "UNF"],
      ["Pressure Rating", "10000 PSI to 60000 PSI"],
    ],
    applications: ["Hydrostatic test systems", "Water-jet & intensifier lines", "Research & defence labs", "Chemical injection"],
  },
  {
    id: "valve-fittings",
    name: "Valve Fittings",
    brand: "WIN-LOK",
    category: "Tube & Pipe Fittings",
    image: "/images/products/valve-fittings.jpg",
    description: "Sealant injectors, check valves and drain plugs for valve maintenance and high pressure service.",
    overview:
      "Valve accessories for maintenance and protection: sealant injection fittings, inline check valves and drain plugs, machined in stainless, carbon, alloy and nickel alloy steels for 10000 PSI service.",
    specs: [
      ["Type", "Sealant Injector / Check Valve / Drain Plug"],
      ["M.O.C", SS_CS_AS_NI.join(" / ")],
      ["Size", '1/8" to 1"'],
      ["End Connections", "NPT / BSP / BSPT / UNF / Metric"],
      ["Pressure Rating", "10000 PSI"],
    ],
    applications: ["Valve sealant injection", "Body cavity drains", "Pipeline valve maintenance", "Wellhead equipment"],
  },
  {
    id: "quick-release-coupling",
    name: "Quick Release Coupling",
    brand: "WIN-FIT",
    category: "Tube & Pipe Fittings",
    image: "/images/products/quick-release-coupling.jpg",
    description: "Single check and double check quick release couplings for fast, tool-free line connection.",
    overview:
      "Quick release couplings in single check and double check configurations allow rapid connection and disconnection of fluid lines without tools or spillage.",
    specs: [
      ["Type", "Single Check / Double Check"],
      ["M.O.C", "Stainless Steel / Carbon Steel / Brass"],
      ["Size", '1/8" to 2"'],
      ["End Connections", "NPT / BSP / Socket Weld"],
      ["Pressure Rating", "150 PSI to 6000 PSI"],
    ],
    applications: ["Hydraulic equipment", "Test benches", "Pneumatic tooling", "Fluid transfer"],
  },
  {
    id: "condensate-seal-pot",
    name: "Condensate / Seal Pot",
    brand: "WIN-FIT",
    category: "Engineering Components",
    image: "/images/products/condensate-seal-pot.jpg",
    description: "3-way and 4-way condensate pots and seal pots for steam and DP flow measurement installations.",
    overview:
      "Condensate pots and seal pots maintain a constant liquid head in impulse lines on steam and condensing vapour services, protecting transmitters from high temperature and ensuring accurate DP measurement.",
    specs: [
      ["Type", "3 Way / 4 Way"],
      ["M.O.C", SS_CS_AS_NI.join(" / ")],
      ["Size", '2" to 6"'],
      ["End Connections", "NPT / BSP / BSPT / SW"],
      ["Pressure Rating", "SCH 40 to SCH XXS"],
    ],
    applications: ["Steam flow measurement", "Boiler drum level", "DP transmitter hook-ups", "Condensing vapour service"],
  },
  {
    id: "air-header",
    name: "Air Header",
    brand: "WIN-FIT",
    category: "Engineering Components",
    image: "/images/products/air-header.jpg",
    description: "Instrument air distribution headers from bar stock or seamless pipe with needle or ball valve outlets.",
    overview:
      "Instrument air headers distribute clean, dry air to multiple field instruments from a single supply. Built from bar stock or seamless pipe with threaded, socket welded or flanged inlets and needle or ball valve outlets and drains.",
    specs: [
      ["Type", "Bar Stock & Seamless Pipe"],
      ["M.O.C", "Stainless Steel / Carbon Steel"],
      ["Inlet Size", '1/4" to 2" – Threaded / Socket Welded / Flanged – Needle Valve / Ball Valve'],
      ["Outlet Size & Drain", '1/4" to 1" – Threaded / Socket Welded – Needle Valve / Ball Valve'],
    ],
    applications: ["Instrument air distribution", "Control valve actuator supply", "Analyzer shelters", "Pneumatic panels"],
  },
  {
    id: "syphon",
    name: "Syphon",
    brand: "WIN-FIT",
    category: "Engineering Components",
    image: "/images/products/syphon.jpg",
    description: "U-bend and Q-bend (pigtail) syphons to protect pressure gauges from steam and hot media.",
    overview:
      "Gauge syphons trap condensate to isolate pressure gauges and switches from high temperature steam and hot vapours. Available in U-bend and Q-bend (pigtail) forms from seamless pipe.",
    specs: [
      ["Type", "U Bend / Q Bend"],
      ["M.O.C", SS_CS_AS_NI.join(" / ")],
      ["Size", '1/8" to 1/2"'],
      ["End Connections", "NPT / BSP / BSPT / SW"],
      ["Pressure Rating", "SCH 40 to SCH XXS"],
    ],
    applications: ["Steam pressure gauges", "Boilers", "Hot water systems", "Pressure switches"],
  },
  {
    id: "thermowells",
    name: "Thermowells",
    brand: "WIN-FIT",
    category: "Engineering Components",
    image: "/images/products/thermowells.jpg",
    description: "Threaded, flanged and weld-in thermowells protecting temperature sensors in process streams.",
    overview:
      "Thermowells are tubular fittings used to protect temperature sensors installed in industrial processes. A thermowell consists of a tube closed at one end and mounted in the process stream; the thermometer, thermocouple or RTD is inserted into the open end. Manufactured to customer drawings in threaded, flanged and weld-in styles.",
    specs: [
      ["Type", "Threaded / Flanged / Weld-in – Straight, Tapered & Stepped"],
      ["M.O.C", SS_CS_AS_NI.join(" / ")],
      ["Insertion Length", "As per customer drawing"],
      ["End Connections", "Threaded / Flanged / Socket Welded"],
    ],
    applications: ["Reactors & vessels", "Pipelines", "Boilers & furnaces", "Heat exchangers"],
  },
];

export const WHY_US = [
  { title: "Wide Material Range", text: "Stainless, carbon, alloy and nickel alloy steels, brass and bronze – matched to your pressure, temperature and media." },
  { title: "High Pressure Capability", text: "Needle valves to 15000 PSI, check valves to 20000 PSI and high pressure fittings up to 60000 PSI." },
  { title: "Design & Development", text: "In-house design, development and production with an accent on quality and continuous R&D." },
  { title: "Built to Drawing", text: "Thermowells, headers, pots and special components manufactured to your specifications." },
];

export const FAQS = [
  { q: "What products does Win Process Control Engineering manufacture?", a: "We manufacture instrumentation valves (manifold, ball, needle, globe, gate and non-return valves), tube and pipe fittings, high pressure fittings, valve fittings, quick release couplings, condensate / seal pots, air headers, syphons and thermowells." },
  { q: "Which materials are available?", a: "Products are offered in stainless steel, carbon steel, alloy steel, nickel alloy, brass and bronze, with CF8M / CF8 castings for ball valves." },
  { q: "Where is Win Process Control Engineering located?", a: "Our works are at No. 14/41, Kavarai Street, Athipet, Ambattur, Chennai – 600 058, and our registered office is at E-15, 2nd Floor, Agni Estate Foundations, Pambai Salai, ICF Colony, Athipet, Chennai." },
  { q: "Which industries do you serve?", a: "Our products are used across petrochemical, semiconductor, energy, food, biotechnology, pharmaceutical, defence, pulp & paper and mining industries." },
];
