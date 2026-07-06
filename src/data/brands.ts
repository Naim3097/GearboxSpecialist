export interface Brand {
  slug: string;
  name: string;
  /** Editorial opening — specific to the brand's gearbox story in Malaysia. */
  intro: string;
  /** Transmissions actually fitted to Malaysian-market cars. */
  transmissions: { name: string; type: string; foundIn: string; note: string }[];
  /** Symptoms owners actually search for. */
  commonProblems: { title: string; detail: string }[];
  /** Indicative repair cost band in RM (diagnosis to overhaul). */
  costBand: string;
  popularModels: string[];
  faqs: { q: string; a: string }[];
}

export const brands: Brand[] = [
  {
    slug: "toyota",
    name: "Toyota",
    intro:
      "Toyota gearboxes have a deserved reputation for longevity, but 'reliable' is not 'immortal'. Malaysian Vios and Yaris CVTs routinely pass 200,000 km — when the fluid is maintained. The units that fail early are almost always the ones running original fluid in Klang Valley traffic.",
    transmissions: [
      { name: "K-series CVT (K110/K313)", type: "CVT", foundIn: "Vios, Yaris, Corolla Cross", note: "Robust belt-and-pulley design; sensitive to fluid condition past 100,000 km." },
      { name: "Direct Shift-CVT", type: "CVT with launch gear", foundIn: "Corolla, Corolla Cross (newer)", note: "A physical first gear handles launch, dramatically reducing belt wear." },
      { name: "Aisin U-series 4AT", type: "Conventional automatic", foundIn: "Older Vios, Avanza", note: "Nearly indestructible; solenoid and fluid issues only in high age." },
      { name: "Aisin 6AT/8AT (U660/UA80)", type: "Conventional automatic", foundIn: "Camry, Harrier", note: "Occasional torque-converter shudder resolved by fluid service or converter replacement." },
    ],
    commonProblems: [
      { title: "CVT whine at highway speed", detail: "A rising whine that tracks road speed usually means bearing or belt wear in the CVT — caught early, it's a repair; ignored, it's a replacement." },
      { title: "Delayed engagement when shifting to D", detail: "A pause before the car moves off points to line-pressure loss — typically degraded fluid or a worn pump on high-mileage units." },
      { title: "Torque-converter shudder at 80–110 km/h", detail: "Light vibration under gentle throttle on Camry and Harrier automatics. Often fixed with a proper flush and adaptation reset." },
    ],
    costBand: "RM 300 (diagnosis + fluid) to RM 6,500+ (full CVT overhaul)",
    popularModels: ["Vios", "Yaris", "Corolla Cross", "Camry", "Hilux", "Avanza"],
    faqs: [
      { q: "How long does a Toyota CVT last in Malaysia?", a: "With fluid changes every 40,000–60,000 km, 250,000 km is realistic. On neglected fluid, failures cluster around 120,000–160,000 km — the fluid is the wear item." },
      { q: "Should I use only Toyota CVT fluid?", a: "Use fluid meeting the exact Toyota specification (e.g. CVT FE). Generic 'multi-vehicle' CVT fluid is a gamble on a gearbox worth thousands." },
    ],
  },
  {
    slug: "honda",
    name: "Honda",
    intro:
      "Honda's Earth Dreams CVT is everywhere in Malaysia — City, Civic, HR-V, Jazz — and it is the single most common gearbox we're asked about. It's a good transmission with one well-known personality trait: judder from the start clutch when the fluid ages, which owners feel as shuddering when pulling off.",
    transmissions: [
      { name: "Earth Dreams CVT", type: "CVT", foundIn: "City, Jazz, HR-V, Civic 1.8", note: "Torque-converter launch design; judder is almost always fluid- or software-related first, hardware second." },
      { name: "CVT with 7-speed simulation", type: "CVT", foundIn: "Civic 1.5 Turbo, Accord", note: "Higher torque loading — fluid intervals matter even more." },
      { name: "5AT (older)", type: "Conventional automatic", foundIn: "Older Accord, CR-V, Odyssey", note: "Known 2nd-gear clutch wear at high mileage; rebuildable with upgraded parts." },
    ],
    commonProblems: [
      { title: "Judder / shudder when moving off", detail: "The classic Honda CVT complaint. Fresh HCF-2 fluid and a software update resolve most cases; persistent judder means the torque converter or valve body needs work." },
      { title: "Whining or groaning under acceleration", detail: "Belt-and-pulley wear, usually on units past 150,000 km or with overdue fluid. Needs teardown assessment." },
      { title: "D light blinking (older automatics)", detail: "On pre-CVT Hondas a flashing D is a stored transmission fault — often a pressure-switch or solenoid, worth diagnosing before it escalates." },
    ],
    costBand: "RM 250 (fluid service) to RM 7,000+ (CVT overhaul with converter)",
    popularModels: ["City", "Civic", "HR-V", "CR-V", "Jazz", "Accord"],
    faqs: [
      { q: "Is the Honda City CVT problematic?", a: "Not inherently. The judder issue is real but usually maintenance-related — Honda's own service bulletins call for fluid changes and software updates. Cities that get 40,000 km fluid services rarely see hardware failure before 200,000 km." },
      { q: "How much does Honda CVT repair cost in Malaysia?", a: "A fluid service is around RM 250–350. Valve body or torque converter work runs RM 2,000–3,500. A full overhaul with parts is typically RM 4,500–7,000 depending on model — still well under half the cost of a new unit from Honda." },
    ],
  },
  {
    slug: "nissan",
    name: "Nissan",
    intro:
      "Nissan committed to JATCO CVTs across its range earlier and harder than anyone, and Malaysian Almeras, Sylphys, Serenas and X-Trails all carry them. These units are more heat-sensitive than most — the difference between a JATCO that lasts and one that fails at 130,000 km is almost always cooling and fluid history.",
    transmissions: [
      { name: "JATCO CVT7 (RE0F11A)", type: "CVT", foundIn: "Almera, Note", note: "Sub-planetary gear design for small cars; sensitive to overheating in traffic." },
      { name: "JATCO CVT8 (RE0F10D/H)", type: "CVT", foundIn: "Sylphy, Serena, X-Trail", note: "Improved but still demands strict NS-3 fluid intervals." },
      { name: "JATCO RE0F10A", type: "CVT", foundIn: "Older Sylphy, Grand Livina, Latio", note: "The highest-failure-rate unit of the family; overhaul is routine work for a specialist." },
    ],
    commonProblems: [
      { title: "Shudder and RPM flare on acceleration", detail: "Belt slip from worn pulleys or low line pressure — the signature JATCO failure mode. Needs teardown; fluid alone won't recover a slipping belt." },
      { title: "Fail-safe / limp mode after highway driving", detail: "Overheat protection. The CVT locks ratio when fluid temperature spikes — a warning that the cooler circuit and fluid need attention before permanent damage." },
      { title: "Whine that rises with road speed", detail: "Bearing wear in the pulley shafts, common past 140,000 km. Repairable if caught before debris circulates." },
    ],
    costBand: "RM 300 (diagnosis) to RM 7,500+ (CVT8 overhaul)",
    popularModels: ["Almera", "Sylphy", "X-Trail", "Serena", "Grand Livina", "Navara"],
    faqs: [
      { q: "Why do Nissan CVTs fail more than others?", a: "Design margins are thinner and heat tolerance lower than Toyota or Honda equivalents. In Malaysian heat and traffic that margin disappears fast without fluid maintenance — but a properly overhauled unit with updated parts is significantly more durable than the original build." },
      { q: "Grand Livina gearbox jerking — repair or replace?", a: "Overhaul is almost always the economic answer. A quality rebuild runs a fraction of a new JATCO unit and addresses the original weak points rather than reinstalling them." },
    ],
  },
  {
    slug: "mazda",
    name: "Mazda",
    intro:
      "Mazda went its own way with SkyActiv-Drive — a conventional automatic tuned to behave like a dual-clutch, with an aggressive lock-up strategy for direct feel and fuel economy. It's one of the more dependable modern automatics, and most Mazda 'gearbox problems' we diagnose turn out to be software, mounts or the odd TCM fault rather than mechanical failure.",
    transmissions: [
      { name: "SkyActiv-Drive 6AT (FW6A-EL)", type: "Conventional automatic", foundIn: "Mazda2, Mazda3, CX-3, CX-5, Mazda6", note: "Full-range lock-up converter; robust, but the TCM has a known failure window on earlier cars." },
      { name: "SkyActiv-Drive 6AT (GW6A-EL)", type: "Conventional automatic", foundIn: "CX-5 2.5, CX-8, Mazda6 2.5", note: "Heavier-duty variant; similar character." },
    ],
    commonProblems: [
      { title: "Harsh 1–2 or 2–3 shifts when warm", detail: "Often adaptation drift or degraded fluid rather than hardware — a service and relearn resolves many cases." },
      { title: "TCM failure (early Mazda3/CX-5)", detail: "Erratic shifting, gear-position warning, sometimes no-shift. A known fault on earlier SkyActiv cars; repairable or replaceable at specialist level." },
      { title: "Clunk on take-up", detail: "Frequently engine or transmission mounts amplifying normal lock-up behaviour — worth ruling out before any gearbox work." },
    ],
    costBand: "RM 300 (diagnosis) to RM 5,500 (overhaul); TCM work typically RM 1,500–2,800",
    popularModels: ["Mazda3", "CX-5", "Mazda2", "CX-3", "Mazda6", "CX-8"],
    faqs: [
      { q: "Does the SkyActiv automatic need fluid changes?", a: "Mazda calls the fluid long-life, but the aggressive lock-up strategy works the fluid hard. We recommend a change around every 60,000 km in Malaysian conditions — cheap insurance on an otherwise excellent gearbox." },
    ],
  },
  {
    slug: "bmw",
    name: "BMW",
    intro:
      "Almost every automatic BMW in Malaysia runs a ZF gearbox — the 6HP in E-series cars and the superb 8HP from the F-series onward. These are precision units that reward correct servicing and punish neglect with mechatronic faults. The dreaded 'Transmission Malfunction' message is usually far less terminal than it looks, but it demands proper diagnosis.",
    transmissions: [
      { name: "ZF 6HP19/21 (GA6HP)", type: "Conventional automatic", foundIn: "E90 3 Series, E60 5 Series, X3", note: "Mechatronic sleeve and adapter seals are the classic leak/fault points — well-understood, fully repairable." },
      { name: "ZF 8HP45/50", type: "Conventional automatic", foundIn: "F30/G20 3 Series, F10/G30 5 Series, X1–X5", note: "One of the best automatics ever made; fluid service around 80,000–100,000 km keeps it that way." },
      { name: "7DCT (Getrag)", type: "Dual-clutch", foundIn: "Newer 1 Series, 2 Series Gran Coupé", note: "Wet-clutch DCT; smooth, but clutch and mechatronic health depend on fluid quality." },
    ],
    commonProblems: [
      { title: "'Transmission Malfunction — drive moderately'", detail: "A generic ZF fault trigger: causes range from a weak battery to a failing mechatronic sleeve to genuine clutch wear. Never accept a gearbox replacement quote without a specialist scan first." },
      { title: "Harsh downshift clunk (6HP)", detail: "Typically valve-body wear or degraded fluid on E-series cars past 150,000 km. A mechatronic repair kit is a fraction of replacement cost." },
      { title: "Fluid leaks at the pan or sleeve", detail: "The plastic oil pan and mechatronic sleeve seals age in Malaysian heat. Leaks starve the gearbox of pressure — fix them early." },
    ],
    costBand: "RM 500 (specialist diagnosis) to RM 12,000+ (8HP overhaul)",
    popularModels: ["3 Series", "5 Series", "X1", "X3", "X5", "1 Series"],
    faqs: [
      { q: "BMW says the fluid is lifetime — is it?", a: "ZF, who actually build the gearbox, recommend a fluid and filter change around every 80,000–100,000 km. 'Lifetime' fluid is the single biggest cause of avoidable ZF failures we see." },
      { q: "Is 'Transmission Malfunction' the end of my gearbox?", a: "Usually not. In our experience the majority of cases resolve with mechatronic repair, fluid service or electrical fixes rather than replacement. Diagnosis first, always." },
    ],
  },
  {
    slug: "mercedes-benz",
    name: "Mercedes-Benz",
    intro:
      "Mercedes builds its own automatics, and Malaysia is full of the 7G-Tronic (722.9) — a gearbox with one famous weak point: the conductor plate inside the valve body. Its symptoms (limp mode, missing gears, speed-sensor faults) terrify owners, but for a specialist it's routine, well-documented work.",
    transmissions: [
      { name: "7G-Tronic (722.9)", type: "Conventional automatic", foundIn: "C-Class W204/W205, E-Class W212, GLC", note: "Conductor plate and valve body are the known service items; the mechanical core is strong." },
      { name: "9G-Tronic (725.0)", type: "Conventional automatic", foundIn: "W205 facelift, W213 E-Class, newer GLC", note: "Excellent unit; strict fluid specification, unforgiving of wrong oil." },
      { name: "7G-DCT (724.0)", type: "Dual-clutch", foundIn: "A-Class, CLA, GLA", note: "Wet-clutch DCT; juddery low-speed behaviour usually traces to fluid or clutch adaptation." },
    ],
    commonProblems: [
      { title: "Limp mode / stuck in one gear (722.9)", detail: "The classic conductor-plate failure — internal speed sensors die and the gearbox protects itself. Repairable at component level without replacing the gearbox." },
      { title: "Harsh 2–3 shift or flare", detail: "Valve-body wear or degraded fluid on higher-mileage 7G units. A rebuild of the valve body restores factory shift quality." },
      { title: "A-Class/CLA judder in traffic", detail: "7G-DCT clutch judder, aggravated by heat and old fluid. Fluid service and adaptation first; clutch pack if wear is confirmed." },
    ],
    costBand: "RM 500 (diagnosis) to RM 11,000+ (full overhaul); conductor plate typically RM 2,500–4,000",
    popularModels: ["C-Class", "E-Class", "GLC", "A-Class", "CLA", "GLA"],
    faqs: [
      { q: "My W204 is stuck in limp mode. Do I need a new gearbox?", a: "Almost certainly not. Limp mode on the 722.9 is most commonly the conductor plate — a known, repairable fault. A specialist scan reads the internal sensor codes and confirms it in minutes." },
    ],
  },
  {
    slug: "volkswagen",
    name: "Volkswagen",
    intro:
      "No gearbox in Malaysia has a bigger reputation than the VW DSG — and no reputation is more misunderstood. The 7-speed dry-clutch DQ200 in Polos, Golfs and Passats genuinely did suffer mechatronic and clutch issues, especially in tropical stop-go traffic. The good news: every failure mode is now thoroughly understood and repairable well below VW's replacement pricing.",
    transmissions: [
      { name: "DQ200 7-speed dry DSG", type: "Dual-clutch (dry)", foundIn: "Polo, Vento, Golf 1.4, Jetta, Passat 1.8 (older)", note: "The famous one. Mechatronic pressure accumulator and clutch pack are the known items." },
      { name: "DQ250 6-speed wet DSG", type: "Dual-clutch (wet)", foundIn: "Golf GTI Mk6, Passat 2.0", note: "Far more heat-tolerant; needs 60,000 km fluid services." },
      { name: "DQ381 7-speed wet DSG", type: "Dual-clutch (wet)", foundIn: "Golf Mk8, Tiguan, Passat B8 facelift", note: "Current-generation unit, strong when serviced on schedule." },
    ],
    commonProblems: [
      { title: "Judder pulling away (DQ200)", detail: "Dry-clutch judder from heat cycling in traffic. Clutch pack replacement with the updated part is the lasting fix." },
      { title: "Gearbox warning + hazard-flash limp mode", detail: "Classic DQ200 mechatronic failure — often the pressure accumulator. Repairable at unit level; a full mechatronic replacement is rarely the only option." },
      { title: "Delayed or no engagement of even/odd gears", detail: "One clutch circuit failing — drive becomes jerky as the box skips gears. Diagnosis distinguishes clutch wear from mechatronic fault before parts are ordered." },
    ],
    costBand: "RM 400 (diagnosis) to RM 9,000 (mechatronic + clutch on DQ200)",
    popularModels: ["Golf", "Polo", "Passat", "Tiguan", "Vento", "Jetta"],
    faqs: [
      { q: "Should I avoid buying a used VW because of the DSG?", a: "Not if you budget for its health. A pre-purchase DSG inspection tells you the clutch and mechatronic condition; a car with documented DSG service history is a much safer buy than the price difference suggests." },
      { q: "How often should DSG oil be changed?", a: "Wet-clutch DSGs (DQ250/DQ381): every 60,000 km, non-negotiable. The dry DQ200's gear oil is separate from its hydraulic fluid — both should be checked around the same interval." },
    ],
  },
  {
    slug: "proton",
    name: "Proton",
    intro:
      "Proton's gearbox story splits cleanly in two: the Punch CVT era (Saga FLX, Iriz, Persona, Preve, Exora) and the Geely era's 7-speed wet dual-clutch (X50, X70, S70). The Punch CVT's belt-and-clutch design earned a hard reputation in Malaysian traffic; the newer 7DCT is a far stronger unit that mainly needs disciplined fluid service.",
    transmissions: [
      { name: "Punch VT2/VT3 CVT", type: "CVT", foundIn: "Saga FLX, Iriz, Persona, Preve, Exora", note: "Start-clutch design without torque converter; clutch judder and belt wear are the known issues." },
      { name: "7DCT (Geely/Volvo-derived)", type: "Dual-clutch (wet)", foundIn: "X50, X70, S70, X90", note: "Wet-clutch unit co-developed with Volvo; strong design, strict fluid intervals." },
      { name: "4AT (Mitsubishi-derived)", type: "Conventional automatic", foundIn: "Older Saga, Waja, older Persona", note: "Simple and rebuildable; parts plentiful." },
    ],
    commonProblems: [
      { title: "Judder from standstill (Punch CVT)", detail: "Start-clutch wear — the defining Punch CVT fault in stop-go traffic. Repairable with updated clutch material; fluid condition is critical." },
      { title: "'Check transmission' with loss of drive (Punch)", detail: "Often the internal speed sensors or stepper motor. Diagnosis distinguishes a RM 600 sensor job from a belt failure." },
      { title: "X70 hesitation at low speed", detail: "Early 7DCT software calibrations hunt between clutches in crawling traffic. Updates and fluid service transform most cars; genuine clutch wear is less common than owners fear." },
    ],
    costBand: "RM 200 (diagnosis) to RM 5,000 (Punch CVT overhaul); 7DCT clutch work RM 3,000–5,500",
    popularModels: ["Saga", "Persona", "Iriz", "X50", "X70", "Exora"],
    faqs: [
      { q: "Is the Proton X50 gearbox reliable?", a: "The wet 7DCT is fundamentally sound — it shares its lineage with Volvo applications. Change the fluid every 40,000–60,000 km and keep software current; most reported issues are calibration, not hardware." },
      { q: "My Persona CVT judders badly. Overhaul or replace with recond?", a: "Overhaul with updated start-clutch parts usually beats a recond unit of unknown history, and comes with a warranty. Recond only makes sense if your casing or pulleys are damaged." },
    ],
  },
  {
    slug: "perodua",
    name: "Perodua",
    intro:
      "Perodua runs Malaysia's roads — and its gearboxes are correspondingly the most common units in any workshop. The older 4-speed automatics in the Myvi and Axia are simple, tough and cheap to fix. The newer D-CVT in the Ativa, Alza and facelifted Myvi range brings Daihatsu's split-gear design, which reduces belt load but demands the right fluid.",
    transmissions: [
      { name: "4AT (Daihatsu/Aisin)", type: "Conventional automatic", foundIn: "Myvi (pre-2022), Axia, Bezza, Alza (old)", note: "Simple, proven, inexpensive to overhaul — the workhorse of Malaysian motoring." },
      { name: "D-CVT", type: "CVT with split gears", foundIn: "Ativa, Alza (new), Myvi facelift, Axia (new)", note: "Gear drive at low speed, belt drive at cruise — clever design that cuts belt wear significantly." },
    ],
    commonProblems: [
      { title: "Delayed engagement / flare between gears (4AT)", detail: "Usually degraded fluid or worn solenoids first, clutch packs second. Caught early it's a service; late, it's an overhaul — still one of the cheapest overhauls in the market." },
      { title: "Shudder on take-off (D-CVT)", detail: "Early D-CVTs are sensitive to fluid condition and software calibration. The correct Daihatsu-spec fluid matters — generic CVT oil causes exactly this complaint." },
      { title: "Whine at constant speed", detail: "On high-mileage 4ATs, differential and bearing wear inside the transaxle. Worth quoting alongside any overhaul." },
    ],
    costBand: "RM 150 (diagnosis) to RM 3,500 (4AT overhaul); D-CVT work RM 2,500–5,000",
    popularModels: ["Myvi", "Axia", "Bezza", "Ativa", "Alza", "Aruz"],
    faqs: [
      { q: "How much to repair a Myvi automatic gearbox?", a: "For the 4AT: a fluid and solenoid service runs a few hundred ringgit; a full overhaul typically RM 2,500–3,500 including parts. It's among the most economical gearboxes in Malaysia to put right." },
    ],
  },
  {
    slug: "mitsubishi",
    name: "Mitsubishi",
    intro:
      "Mitsubishi in Malaysia means two very different gearboxes: the simple, rugged 4-speed automatic in the Xpander — an old-school unit chosen deliberately for durability — and JATCO CVTs in the ASX, Outlander and older Lancer. The 4AT just needs fluid; the CVTs need the same vigilance as any JATCO.",
    transmissions: [
      { name: "4AT (INVECS-II)", type: "Conventional automatic", foundIn: "Xpander, Triton (older)", note: "Deliberately simple; hugely tolerant, cheap to service and rebuild." },
      { name: "JATCO CVT8", type: "CVT", foundIn: "ASX, Outlander", note: "Same family as Nissan's CVT8 — same heat sensitivity, same fluid discipline required." },
      { name: "INVECS-III CVT", type: "CVT", foundIn: "Lancer, Grandis (older)", note: "Aging units now; belt and bearing wear common at high mileage." },
    ],
    commonProblems: [
      { title: "Xpander harsh kickdown", detail: "Usually normal 4AT behaviour amplified by degraded fluid — a service restores smoothness. Genuine faults are rare on this unit." },
      { title: "ASX/Outlander CVT overheat in hills", detail: "JATCO heat protection engages on long climbs; fluid and cooler service is preventive, not optional, on these." },
    ],
    costBand: "RM 250 (diagnosis) to RM 6,500 (CVT overhaul); 4AT overhaul RM 3,000–4,000",
    popularModels: ["Xpander", "ASX", "Outlander", "Triton", "Lancer"],
    faqs: [
      { q: "Is the Xpander's 4-speed automatic outdated?", a: "It's old technology and that's the point — it's simple, proven and cheap to maintain. Serviced on time, it will likely outlast most CVTs in the same segment." },
    ],
  },
  {
    slug: "ford",
    name: "Ford",
    intro:
      "Ford's Malaysian gearbox story is dominated by one unit: the PowerShift DPS6 dry dual-clutch in the Fiesta and Focus — the subject of lawsuits worldwide and the most notorious dual-clutch ever sold here. Ranger owners have a much happier time with conventional 6- and 10-speed automatics.",
    transmissions: [
      { name: "PowerShift DPS6", type: "Dual-clutch (dry)", foundIn: "Fiesta, Focus (2011–2018)", note: "Chronic clutch shudder and TCM failures; permanent fixes exist but require the updated parts, not just re-adaptation." },
      { name: "6R80 / 10R80", type: "Conventional automatic", foundIn: "Ranger, Everest", note: "Strong truck automatics; fluid service and the occasional solenoid are the norm." },
    ],
    commonProblems: [
      { title: "Shudder and clutch slip (Fiesta/Focus)", detail: "The signature DPS6 fault — dry clutches glaze and seals weep onto the friction surfaces. The lasting fix is updated clutch and seal parts together, not a clutch alone." },
      { title: "TCM failure (DPS6)", detail: "Loss of drive or gear hunting from a failed transmission control module — a documented, replaceable item." },
      { title: "Ranger harsh shifting", detail: "Usually adaptive-learning drift or fluid degradation on hard-worked trucks; a service and relearn typically restores it." },
    ],
    costBand: "RM 400 (diagnosis) to RM 7,000 (DPS6 clutch + TCM + seals)",
    popularModels: ["Ranger", "Fiesta", "Focus", "Everest"],
    faqs: [
      { q: "Is a used Ford Fiesta worth buying given the gearbox?", a: "Only priced accordingly, and ideally with evidence the updated clutch kit and TCM have already been fitted. Budget for the full fix if not — then the car itself is genuinely good." },
    ],
  },
  {
    slug: "hyundai",
    name: "Hyundai",
    intro:
      "Hyundai builds its own transmissions, and the ones in Malaysia — 6-speed automatics in the Elantra and Tucson, dual-clutches in the newer turbo models — are generally solid. Most Hyundai gearbox complaints we see are heat- and fluid-related on cars past 120,000 km, plus DCT low-speed manners that owners mistake for faults.",
    transmissions: [
      { name: "A6GF1/A6MF1 6AT", type: "Conventional automatic", foundIn: "Elantra, Tucson, Sonata", note: "In-house Hyundai design; reliable with 60,000 km fluid services." },
      { name: "7DCT (D7UF1)", type: "Dual-clutch (dry)", foundIn: "Tucson 1.6T, Elantra Sport, Kona", note: "Dry-clutch unit — smooth on the move, deliberate at parking speeds; heat is its enemy." },
      { name: "8AT / 8DCT (newer)", type: "Automatic / wet DCT", foundIn: "Santa Fe, newer N-line models", note: "Stronger current-generation units." },
    ],
    commonProblems: [
      { title: "Judder in stop-go traffic (7DCT)", detail: "Dry-clutch heat buildup — partly characteristic, fully a fault when it persists cold. Clutch and fork wear are measurable and repairable." },
      { title: "Delayed reverse engagement (6AT)", detail: "Fluid degradation or valve-body wear on higher-mileage units; caught early it's a service item." },
    ],
    costBand: "RM 300 (diagnosis) to RM 6,000 (overhaul or DCT clutch job)",
    popularModels: ["Tucson", "Elantra", "Santa Fe", "Kona", "Sonata"],
    faqs: [
      { q: "My Tucson DCT feels jerky in car parks — is it failing?", a: "Some low-speed hesitancy is inherent to dry dual-clutch design. The line between character and fault is judder that persists when cold or worsens over weeks — that's when to book a diagnosis." },
    ],
  },
  {
    slug: "kia",
    name: "Kia",
    intro:
      "Kia shares Hyundai Group transmissions, so the patterns mirror its sibling: dependable in-house 6-speed automatics in the Cerato and Sportage, dry 7DCTs in turbo models with the same heat sensitivities, and strict fluid discipline as the difference between a quiet gearbox and an expensive one.",
    transmissions: [
      { name: "A6GF1/A6LF2 6AT", type: "Conventional automatic", foundIn: "Cerato, Sportage, Optima, Carnival (older)", note: "Same robust family as Hyundai's 6AT." },
      { name: "7DCT", type: "Dual-clutch (dry)", foundIn: "Sportage 1.6T, Cerato GT", note: "Same D7UF1 family — traffic heat is the main aging factor." },
      { name: "8AT", type: "Conventional automatic", foundIn: "Sorento, newer Carnival", note: "Smooth, strong unit; routine fluid service only." },
    ],
    commonProblems: [
      { title: "Harsh shifts when hot (6AT)", detail: "Degraded fluid thins when hot and line pressure suffers — a fluid service is diagnostic in itself on these units." },
      { title: "DCT creep judder", detail: "As with Hyundai's DCT: characteristic at low speed, a fault when persistent — measured clutch wear tells the truth." },
    ],
    costBand: "RM 300 (diagnosis) to RM 6,000 (overhaul)",
    popularModels: ["Sportage", "Cerato", "Sorento", "Carnival", "Picanto"],
    faqs: [
      { q: "Carnival gearbox service — how often for e-hailing use?", a: "Commercial duty halves the sensible interval: every 30,000–40,000 km for fluid on a Carnival working daily. The cost is trivial against an 8AT replacement." },
    ],
  },
  {
    slug: "lexus",
    name: "Lexus",
    intro:
      "Lexus transmissions are Toyota's best work — Aisin 6- and 8-speed automatics and the hybrid e-CVT, a gearbox with no belts, no clutches and almost nothing to wear. Failures are rare and usually age-related; the commonest job on a Malaysian Lexus is simply overdue fluid on a unit the dealer called 'sealed for life'.",
    transmissions: [
      { name: "Aisin 6AT/8AT", type: "Conventional automatic", foundIn: "ES, IS, GS, RX (non-hybrid), NX", note: "Exceptional durability; torque-converter shudder at very high mileage is the main complaint." },
      { name: "Hybrid e-CVT (power-split)", type: "Planetary power-split", foundIn: "ES 300h, NX 350h, RX 450h, UX", note: "No belt, no shifting elements — mechanically the most reliable 'gearbox' on sale. Inverter and bearing issues are the rare exceptions." },
    ],
    commonProblems: [
      { title: "Slight shudder at light throttle (AT models)", detail: "Torque-converter clutch shudder on units past 150,000 km with original fluid — a flush with correct WS fluid usually cures it." },
      { title: "Whine from hybrid transaxle", detail: "Rare bearing wear in the e-CVT transaxle; worth addressing early since debris threatens the motor-generators." },
    ],
    costBand: "RM 400 (diagnosis) to RM 8,000+ (AT overhaul); hybrid transaxle work quoted case-by-case",
    popularModels: ["ES", "NX", "RX", "IS", "UX"],
    faqs: [
      { q: "Does a Lexus hybrid have a gearbox that can fail?", a: "The e-CVT power-split unit has extraordinarily few wear parts. Fluid service every 80,000 km protects the bearings and motor windings — beyond that, it's the most trouble-free transmission architecture in Malaysia." },
    ],
  },
  {
    slug: "audi",
    name: "Audi",
    intro:
      "Audi gearboxes in Malaysia span three families: S tronic dual-clutches (the DL501 in older quattro models, DQ381 in newer ones), the old Multitronic CVT that gave 2005–2015 A4s and A6s a hard reputation, and ZF automatics in the larger cars. Each has its own known failure points — and all are repairable well below Audi's unit-replacement quotes.",
    transmissions: [
      { name: "S tronic DL501 7-speed", type: "Dual-clutch (wet)", foundIn: "A4/A5/Q5 quattro (B8/B8.5)", note: "Known mechatronic and clutch temperature-sensor faults; specialist rebuild is established work." },
      { name: "S tronic DQ381/DQ200", type: "Dual-clutch", foundIn: "A3, Q2, newer A4", note: "Same families as VW's DSGs, same known items." },
      { name: "Multitronic CVT (01J/0AW)", type: "CVT (chain)", foundIn: "A4, A5, A6 (FWD, 2005–2015)", note: "Chain and clutch wear plus ECU faults; jerking and 'gear' flare are its signatures." },
    ],
    commonProblems: [
      { title: "Multitronic jerking / limp home", detail: "Chain wear and control-unit faults on aging units. Overhaul with updated parts remains viable and far cheaper than unit replacement." },
      { title: "DL501 harsh engagement or no reverse", detail: "Classic mechatronic failure pattern on B8-era quattros — repairable at valve-body level." },
      { title: "DSG-type judder (smaller models)", detail: "As per the VW DQ200: accumulator and dry-clutch wear, fully documented fixes." },
    ],
    costBand: "RM 500 (diagnosis) to RM 12,000 (DL501 overhaul)",
    popularModels: ["A4", "A5", "Q5", "A3", "A6", "Q3"],
    faqs: [
      { q: "Should I avoid used Audis with Multitronic?", a: "Treat any 2005–2015 FWD A4/A5/A6 as needing a gearbox inspection before purchase. A healthy, serviced Multitronic drives beautifully — an unserviced one is a five-figure liability." },
    ],
  },
  {
    slug: "porsche",
    name: "Porsche",
    intro:
      "Porsche's PDK is arguably the finest dual-clutch transmission ever engineered, and the Tiptronic-badged ZF automatics in the Cayenne and Panamera are similarly excellent. Problems are rare and heavily concentrated in fluid neglect — but when a PDK does fault, only genuinely specialist diagnosis avoids catastrophic-sounding (and usually wrong) replacement quotes.",
    transmissions: [
      { name: "PDK (ZF 7DT)", type: "Dual-clutch (wet)", foundIn: "911, Boxster, Cayman, Panamera", note: "Phenomenal unit; strict fluid intervals (clutch and gear oil are separate) keep it that way." },
      { name: "Tiptronic S (ZF 8HP/Aisin)", type: "Conventional automatic", foundIn: "Cayenne, Macan (8AT variants), Panamera (older)", note: "Same ZF 8HP family as BMW — same service logic." },
    ],
    commonProblems: [
      { title: "PDK warning / reduced gears", detail: "Often sensor or fluid-related rather than mechanical. PDK internals rarely fail without warning signs in the data — proper scanning is everything." },
      { title: "Clunk in low-speed manoeuvres (Cayenne)", detail: "Frequently transfer case or driveline rather than the 8HP itself — accurate diagnosis prevents an expensive misfire." },
    ],
    costBand: "RM 800 (specialist diagnosis) to five figures for PDK internal work — quoted case-by-case",
    popularModels: ["Cayenne", "Macan", "911", "Panamera", "Boxster/Cayman"],
    faqs: [
      { q: "How often does a PDK need servicing in Malaysia?", a: "Clutch fluid around every 60,000 km and gearbox oil by 120,000 km — sooner for track use. It's cheap insurance on a transmission that costs as much as a small car to replace." },
    ],
  },
];

export function getBrand(slug: string): Brand | undefined {
  return brands.find((b) => b.slug === slug);
}
