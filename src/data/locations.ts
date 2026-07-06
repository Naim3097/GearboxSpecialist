export interface LocationArea {
  slug: string;
  name: string;
  state: string;
  /** Editorial intro paragraph — must read naturally, not templated. */
  intro: string;
  /** Neighbourhoods / suburbs covered, for on-page substance and long-tail queries. */
  areas: string[];
  faqs: { q: string; a: string }[];
}

export const locations: LocationArea[] = [
  {
    slug: "kuala-lumpur",
    name: "Kuala Lumpur",
    state: "Wilayah Persekutuan",
    intro:
      "Kuala Lumpur traffic is a gearbox stress test. Daily stop-go crawls along the MRR2, Jalan Cheras and the DUKE keep automatic transmissions hot and working hard, which is why CVT judder and overheating-related faults show up earlier in KL cars than almost anywhere else in Malaysia.",
    areas: ["Cheras", "Ampang", "Setapak", "Kepong", "Sri Petaling", "Bangsar", "Mont Kiara", "Wangsa Maju"],
    faqs: [
      {
        q: "Where can I get my gearbox checked in Kuala Lumpur?",
        a: "Our partner workshop in KL handles diagnosis for all makes — CVT, conventional automatic and dual-clutch. A proper diagnosis involves a road test and fault-code scan before any repair is quoted.",
      },
      {
        q: "Does KL traffic really damage gearboxes faster?",
        a: "Sustained stop-go driving raises transmission fluid temperature and accelerates wear on clutch packs and CVT belts. Cars driven mainly in the city benefit from shorter gearbox oil service intervals — every 40,000 km rather than the 'lifetime fluid' many manuals claim.",
      },
    ],
  },
  {
    slug: "petaling-jaya",
    name: "Petaling Jaya",
    state: "Selangor",
    intro:
      "Between the LDP, Federal Highway and SPRINT, Petaling Jaya drivers spend more time in crawling traffic than most — and it shows in the gearboxes we see. PJ's mix of older sections and newer townships also means everything from 20-year-old 4-speed automatics to the latest dual-clutch units on the same street.",
    areas: ["PJ Old Town", "Damansara Jaya", "Bandar Utama", "Kelana Jaya", "SS2", "Section 17", "Mutiara Damansara"],
    faqs: [
      {
        q: "Is there a gearbox specialist near Petaling Jaya?",
        a: "Yes — our PJ partner workshop covers the whole Damansara–Kelana Jaya corridor and handles CVT, automatic and DSG repairs with warranty.",
      },
      {
        q: "How long does a gearbox repair usually take in PJ?",
        a: "A diagnosis takes under an hour. Valve body or solenoid work is typically 1–2 days; a full overhaul usually runs 3–5 working days depending on parts availability.",
      },
    ],
  },
  {
    slug: "shah-alam",
    name: "Shah Alam",
    state: "Selangor",
    intro:
      "Shah Alam's wide federal roads and highway commutes are kinder to gearboxes than KL's crawl, but the daily KESAS and Federal Highway runs put serious mileage on transmissions fast. High-mileage commuter cars here often need attention at the 150,000–200,000 km mark, when belts, clutch packs and torque converters reach the end of their design life.",
    areas: ["Seksyen 7", "Seksyen 13", "Setia Alam", "Kota Kemuning", "Bukit Jelutong", "Glenmarie"],
    faqs: [
      {
        q: "My car jerks on the Federal Highway commute — is that the gearbox?",
        a: "Jerking under light throttle at cruising speed is a classic sign of torque-converter clutch shudder or CVT belt wear. A diagnosis will confirm it — sometimes the fix is as simple as a proper fluid service.",
      },
    ],
  },
  {
    slug: "subang-jaya",
    name: "Subang Jaya",
    state: "Selangor",
    intro:
      "Subang Jaya and USJ sit at the junction of three of the Klang Valley's busiest highways. The short-hop school runs and mall traffic that define daily driving here are exactly the duty cycle that shortens CVT life — lots of heat, little airflow, constant ratio changes.",
    areas: ["USJ", "SS15", "SS12", "Putra Heights", "Bandar Sunway", "UEP Subang Jaya"],
    faqs: [
      {
        q: "Which workshop covers Subang Jaya for gearbox problems?",
        a: "Our Petaling Jaya partner workshop covers Subang Jaya, USJ and Putra Heights. Book a diagnosis and mention your area — they'll schedule you at the nearest bay.",
      },
    ],
  },
  {
    slug: "klang",
    name: "Klang",
    state: "Selangor",
    intro:
      "Klang's mix of port traffic, older roads and long-serving family cars means the gearboxes we see here have usually worked hard. Proton and Perodua automatics with well over 200,000 km are the daily bread — and with the right overhaul they'll happily do another 200,000.",
    areas: ["Bandar Bukit Tinggi", "Kapar", "Port Klang", "Bandar Botanic", "Meru", "Bukit Raja"],
    faqs: [
      {
        q: "Is it worth overhauling an old gearbox in Klang or should I buy a used unit?",
        a: "A properly overhauled gearbox with new soft parts and a warranty almost always outlasts a used half-cut unit of unknown history. Used units make sense only when the casing or hard parts are damaged.",
      },
    ],
  },
  {
    slug: "puchong",
    name: "Puchong",
    state: "Selangor",
    intro:
      "Puchong's LDP corridor is one of the most congested stretches in the Klang Valley, and the constant crawl between IOI and Bandar Puteri is hard on automatic transmissions. CVT-equipped city cars — Myvi, City, Vios — make up most of what we diagnose from this area.",
    areas: ["Bandar Puteri", "Puchong Jaya", "Bandar Kinrara", "Puchong Utama", "Taman Putra Perdana"],
    faqs: [
      {
        q: "My Myvi hesitates before moving off — common in Puchong traffic?",
        a: "Very. Delayed engagement in Perodua automatics is often a fluid or solenoid issue caught cheaply if diagnosed early. Left alone, it progresses to clutch-pack wear and a much bigger bill.",
      },
    ],
  },
  {
    slug: "cheras",
    name: "Cheras",
    state: "Kuala Lumpur / Selangor",
    intro:
      "Straddling KL and Selangor, Cheras combines steep township roads with some of the region's heaviest traffic on the MRR2 and Grand Saga. Hill starts in stop-go traffic are a punishing combination for dual-clutch gearboxes in particular — clutch temperatures spike exactly when airflow is lowest.",
    areas: ["Taman Connaught", "Bandar Mahkota Cheras", "Taman Midah", "Alam Damai", "Batu 9", "Sungai Long"],
    faqs: [
      {
        q: "Why does my DSG shudder on Cheras hill starts?",
        a: "Dry-clutch DSGs modulate the clutch on hill starts, and in heavy traffic that builds heat quickly, causing shudder. If it persists when the gearbox is cool, the clutch pack or mechatronic unit needs assessment.",
      },
    ],
  },
  {
    slug: "ampang",
    name: "Ampang",
    state: "Kuala Lumpur / Selangor",
    intro:
      "Ampang's dense commercial streets and the MRR2 interchange keep cars in low-speed, high-heat operation for long stretches. We also see a strong continental population here — BMW and Mercedes owners dealing with mechatronic and conductor-plate faults that generic workshops misdiagnose.",
    areas: ["Ampang Jaya", "Pandan Indah", "Taman Melawati", "Ukay Perdana", "Ampang Point"],
    faqs: [
      {
        q: "My BMW shows 'Transmission Malfunction' around Ampang — who should look at it?",
        a: "ZF automatics in BMWs throw this warning for anything from a low-voltage event to a failing mechatronic sleeve. It needs a specialist scan with proper software, not a generic OBD reader — book a diagnosis before assuming the worst.",
      },
    ],
  },
  {
    slug: "kajang",
    name: "Kajang",
    state: "Selangor",
    intro:
      "Kajang's rapid growth means long commutes on the SILK and Grand Saga highways, and the town's famous hills add load that flatland drivers never see. Towing, hill climbs and full family loads all raise transmission temperatures — maintenance intervals matter more here.",
    areas: ["Bandar Kajang", "Sungai Chua", "Taman Prima Saujana", "Semenyih", "Bangi", "Kajang 2"],
    faqs: [
      {
        q: "Does hilly driving around Kajang wear out gearboxes faster?",
        a: "Sustained climbs raise fluid temperature and make the gearbox work in its highest-load ratios. It's not a problem for a healthy unit, but it exposes marginal ones — and it makes regular fluid service genuinely important rather than optional.",
      },
    ],
  },
  {
    slug: "seri-kembangan",
    name: "Seri Kembangan",
    state: "Selangor",
    intro:
      "Sitting between the Besraya and SKVE, Seri Kembangan mixes industrial traffic with dense residential streets. Vans and light commercial vehicles from this area arrive with hard-worked automatics — high idle hours and heavy loads are a different wear pattern from commuter cars, and they need a workshop that recognises it.",
    areas: ["Taman Equine", "The Mines", "Balakong", "Taman Universiti Indah", "Serdang"],
    faqs: [
      {
        q: "My delivery van slips between gears — can it be repaired quickly?",
        a: "Slipping under load usually means worn clutch packs or low line pressure. For working vehicles our partner workshops prioritise turnaround — diagnosis same-day, and most repairs within the week.",
      },
    ],
  },
  {
    slug: "putrajaya",
    name: "Putrajaya & Cyberjaya",
    state: "Wilayah Persekutuan / Selangor",
    intro:
      "Putrajaya and Cyberjaya driving is mostly smooth boulevards and highway runs — gentle on gearboxes, which means problems here are more often age- and mileage-related than abuse-related. The typical case is a well-kept car whose 'lifetime' transmission fluid has quietly degraded past 100,000 km.",
    areas: ["Presint 9", "Presint 11", "Cyberjaya", "Dengkil", "Presint 14"],
    faqs: [
      {
        q: "My car has 120,000 km and the gearbox has never been serviced. Is that bad?",
        a: "'Lifetime fluid' means the fluid lasts the warranty, not the car. At 120,000 km a fluid and filter service is overdue but usually still worthwhile — book an inspection so the fluid condition can be assessed before deciding.",
      },
    ],
  },
  {
    slug: "rawang",
    name: "Rawang",
    state: "Selangor",
    intro:
      "Rawang commuters clock serious highway mileage on the LATAR and PLUS routes, and the town's older workshops rarely touch modern CVTs or dual-clutch units. Cars from this corridor often arrive after one or two failed repair attempts elsewhere — which makes accurate diagnosis the first job, every time.",
    areas: ["Bandar Country Homes", "Emerald West", "Batu Arang", "Serendah", "Bukit Beruntung"],
    faqs: [
      {
        q: "A workshop in Rawang already replaced parts but the problem is still there. Now what?",
        a: "Parts-swapping without diagnosis is the most expensive way to fix a gearbox. Bring the car and the previous invoices — a proper road test and scan will establish what's actually failing before anything else is replaced.",
      },
    ],
  },
];

export function getLocation(slug: string): LocationArea | undefined {
  return locations.find((l) => l.slug === slug);
}
