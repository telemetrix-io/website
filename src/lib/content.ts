/**
 * Marketing copy. Every claim here must match what the app does today (see internal-docs/STATUS.md) and the
 * public docs. Use the app's own words for screens and labels.
 */

export type Screen = {
  id: string;
  label: string;
  title: string;
  body: string;
  src: string;
  alt: string;
};

/** Real screenshots, taken from the app's built-in simulator (a simulated BMW M2 G87). */
export const screens: Screen[] = [
  {
    id: 'overview',
    label: 'Overview',
    title: 'Vehicle Overview',
    body: 'Who the car is, how it is connected, and how healthy it is, on one screen. The VIN is cross-checked, and the odometer is display-only.',
    src: '/screens/overview.webp',
    alt: 'Vehicle Overview screen for a simulated BMW M2 G87: VIN, model year, engine, module and fault-code counts, battery voltage and vehicle health.',
  },
  {
    id: 'diagnostics',
    label: 'Diagnostics',
    title: 'Diagnostics',
    body: 'One scan reads every module. Each step is reported as it happens, and "not supported" is kept apart from "no response".',
    src: '/screens/diagnostics.webp',
    alt: 'Diagnostics screen after a completed scan: 17 of 17 steps, 16 modules scanned, 14 successful, with a table of module results.',
  },
  {
    id: 'modules',
    label: 'Modules',
    title: 'Modules',
    body: 'Every control unit Telemetrix found, with part numbers, hardware and software versions, addressing and the data it reported.',
    src: '/screens/modules.webp',
    alt: 'Modules screen: a grid of control units with their software versions, and the detail panel for the DME engine module.',
  },
  {
    id: 'fault-codes',
    label: 'Fault codes',
    title: 'Fault Codes',
    body: 'Each code with its decoded description, status bits, freeze frame and lifecycle. Codes without a definition say Unknown.',
    src: '/screens/fault-codes.webp',
    alt: 'Fault Codes screen grouped by module, with code 480A11 open: decoded description, status bits and freeze-frame values.',
  },
  {
    id: 'live-data',
    label: 'Live data',
    title: 'Live Data',
    body: 'Gauges and time-series charts at the rate you choose. Every value shows whether it is live, delayed or stale. Record a session and replay it later.',
    src: '/screens/live-data.webp',
    alt: 'Live Data screen with RPM, speed, coolant, load and battery gauges above a time-series chart of RPM, speed and boost.',
  },
  {
    id: 'history',
    label: 'History',
    title: 'History',
    body: 'Every scan is kept on your computer. Compare two scans, follow fault-code trends and module versions, and export a report.',
    src: '/screens/history.webp',
    alt: 'History screen with a timeline of three scans and the fault codes and module results of the latest one.',
  },
  {
    id: 'dyno',
    label: 'Dyno log',
    title: 'Dyno Sessions',
    body: 'Telemetrix spots rolling-road sessions and keeps dyno and road distance apart. The car’s mileage is never modified.',
    src: '/screens/dyno.webp',
    alt: 'Dyno Sessions screen: automatic detection at 82% confidence, the road and dyno distance tally, and an open session.',
  },
];

export const specs = [
  { value: '3', label: 'vehicle profiles' },
  { value: '8', label: 'workstation screens' },
  { value: '1', label: 'guarded write' },
  { value: '0', label: 'odometer changes, ever' },
] as const;

export type Feature = {
  id: string;
  kicker: string;
  title: string;
  body: string;
  points?: string[];
  image?: { src: string; alt: string; position: string };
};

export const features: Feature[] = [
  {
    id: 'scan',
    kicker: 'Full-vehicle scan',
    title: 'Read every module in one pass',
    body: 'Telemetrix identifies the car, sweeps the bus and reads identification and fault codes from every control unit it finds.',
    points: [
      'Progress comes from the scan itself, so the bar never runs ahead',
      '“Not supported” is never mixed up with “no response”',
      'Manufacturer modules and standard OBD-II in the same scan',
    ],
    image: { src: '/screens/diagnostics.webp', alt: 'Scan steps and module results', position: '48% 16%' },
  },
  {
    id: 'codes',
    kicker: 'Fault codes',
    title: 'Every code, fully decoded',
    body: 'Status bits, freeze-frame values and lifecycle (stored, pending, intermittent) for each code, plus how many scans it has appeared in.',
    points: [
      'Grouped by module, searchable and filterable',
      'A code missing from the dictionary is labelled Unknown, never guessed',
      'Add your own definitions, with their source',
    ],
    image: { src: '/screens/fault-codes.webp', alt: 'A decoded fault code with status bits and freeze frame', position: '100% 30%' },
  },
  {
    id: 'live',
    kicker: 'Live data',
    title: 'Live values you can trust',
    body: 'Gauges and time-series charts at the rate you choose. Each value says whether it is live, delayed, stale or unsupported.',
  },
  {
    id: 'history',
    kicker: 'History',
    title: 'Every scan, kept',
    body: 'A timeline of scans, side-by-side comparison, fault-code trends and module versions. Export JSON or an HTML report.',
  },
  {
    id: 'dyno',
    kicker: 'Dyno log',
    title: 'Dyno distance, logged honestly',
    body: 'Detects rolling-road sessions from engine speed, wheel speed and stability control, and records each one in a tamper-evident ledger you can export.',
  },
  {
    id: 'ai',
    kicker: 'AI, if you ask',
    title: 'Plain-language explanations',
    body: 'Optional, through EgoZ. Built only from decoded fields, never raw bytes or the VIN, and always labelled “Not an ECU response”.',
  },
  {
    id: 'clear',
    kicker: 'Guarded clearing',
    title: 'One write, five safeguards',
    body: 'Clearing fault codes needs a per-install switch, typed arming, a saved scan, the VIN’s last six characters and a write-ahead log.',
  },
  {
    id: 'sim',
    kicker: 'Simulator',
    title: 'Try it without a car',
    body: 'Built-in simulated BMW, VW and generic cars, plus replays of recorded sessions. Every screen works the same.',
  },
];

export type Profile = {
  make: string;
  name: string;
  cars: string;
  reads: string[];
  note?: string;
};

export const profiles: Profile[] = [
  {
    make: 'BMW',
    name: 'BMW G-series',
    cars: 'First: M2 (G87)',
    reads: [
      'Manufacturer modules and their fault codes',
      'Snapshot data and module versions',
      'Partial coding snapshots (read-only)',
      'All the OBD-II data',
    ],
    note: 'Turn on diagnostic mode before a scan. Set the M2’s model once with Edit identity.',
  },
  {
    make: 'VW',
    name: 'Volkswagen (VAG)',
    cars: 'Golf Mk7 and Mk7.5',
    reads: [
      'Modules through the car’s gateway',
      'Their fault codes and versions',
      'Partial coding snapshots (read-only)',
      'All the OBD-II data',
    ],
    note: 'The Mk8’s stricter gateway means some modules may not answer.',
  },
  {
    make: 'OBD',
    name: 'Generic OBD-II',
    cars: 'Cars on CAN (ISO 15765-4)',
    reads: ['Emissions fault codes', 'Live values', 'Freeze frames', 'Readiness monitors'],
    note: 'Most cars built since 2008 use CAN.',
  },
];

export const requirements = [
  { label: 'Computer', value: 'A Windows PC with a free USB port' },
  { label: 'Adapter', value: 'OBDLink EX (USB)' },
  { label: 'Car', value: 'An OBD-II port on CAN, 11- or 29-bit at 500 kbit/s' },
  { label: 'Internet', value: 'Not needed to read your car' },
  { label: 'AI (optional)', value: 'An EgoZ project' },
] as const;

export const notYet = [
  'macOS and Linux',
  'Adapters other than the OBDLink EX',
  'Older OBD-II buses (K-line, J1850)',
] as const;

export const never = [
  'Flash or reprogram a module',
  'Change coding',
  'Change, freeze or correct the odometer',
  'Unlock security access',
  'Guess what an unknown code means',
  'Send raw data or your VIN to the AI',
] as const;

export const reads = [
  'Identification and versions of every module',
  'Fault codes, status bits and freeze frames',
  'Live data, recordings and replays',
  'Readiness monitors and partial coding snapshots',
] as const;

export const principles = [
  {
    title: 'Code decodes. AI explains.',
    body: 'Every value comes from decoding what the car sent. AI explains decoded fields only when you ask, and its answers are labelled as not coming from the car.',
  },
  {
    title: 'Read-only by design',
    body: 'Telemetrix reads. Its one write, clearing fault codes, sits behind five separate safeguards and is never presented as a repair.',
  },
  {
    title: 'Unknown stays unknown',
    body: 'A missing value shows a dash, never a zero. A code without a definition says Unknown. Nothing is filled in to look complete.',
  },
  {
    title: 'Your data stays yours',
    body: 'No account. Scans, recordings and the dyno log stay on your computer. Nothing leaves it unless you ask for an AI explanation.',
  },
  {
    title: 'Mileage is sacred',
    body: 'Telemetrix never changes, suppresses, freezes or corrects a car’s mileage. Dyno distance lives in its own log.',
  },
] as const;

export const milestones = [
  {
    title: 'Read',
    body: 'Identification, module map, fault codes, live data, recordings and history.',
    state: 'Built · verified on the simulator',
  },
  {
    title: 'Decode and AI',
    body: 'Snapshot data, the unknown-code inbox, trends and AI explanations through EgoZ.',
    state: 'Built · AI checked live with EgoZ',
  },
  {
    title: 'Dyno log',
    body: 'Detection, road and dyno tallies, a versioned configuration and the tamper-evident ledger.',
    state: 'Built · verified on the simulator',
  },
  {
    title: 'Guarded clearing',
    body: 'Clearing fault codes, the only write, behind five safeguards and a read-back.',
    state: 'Built · verified on the simulator',
  },
  {
    title: 'Real-car validation',
    body: 'Confirming every profile on real cars, then the first public Windows release.',
    state: 'In progress',
    current: true,
  },
] as const;

export const topics = [
  { value: 'licence', label: 'Buying a licence' },
  { value: 'early-access', label: 'Early access' },
  { value: 'workshop', label: 'Workshops and fleets' },
  { value: 'support', label: 'Help with the app' },
  { value: 'partnership', label: 'Partnerships' },
  { value: 'press', label: 'Press' },
  { value: 'other', label: 'Something else' },
] as const;

export type TopicValue = (typeof topics)[number]['value'];
