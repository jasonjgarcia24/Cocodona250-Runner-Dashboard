import { useState, useEffect } from "react";

// ─── Data ────────────────────────────────────────────────────────
const AID_STATIONS = [
  { name: "Start Line – Deep Canyon Ranch", mile: 0,     cutoff: "Mon 5:00 AM",  crew: true,  pacer: false, dropBag: true,  sleep: null,      shower: false, medic: false, gearCheck: "4L Cap",  food: "Mad Honey Food Truck & Coffee" },
  { name: "Cottonwood Creek",               mile: 7.4,   cutoff: "Mon 9:50 AM",  crew: false, pacer: false, dropBag: false, sleep: null,      shower: false, medic: false, gearCheck: "4L",      food: "Traditional offerings" },
  { name: "Water Station",                  mile: 10.4,  cutoff: null,           crew: false, pacer: false, dropBag: false, sleep: null,      shower: false, medic: false, gearCheck: null,      food: "1 liter per person only" },
  { name: "Water Station",                  mile: 24.6,  cutoff: null,           crew: false, pacer: false, dropBag: false, sleep: null,      shower: false, medic: false, gearCheck: null,      food: "1 liter per person only" },
  { name: "Lane Mtn by UltrAspire",         mile: 32.5,  cutoff: "Mon 10:45 PM", crew: false, pacer: false, dropBag: false, sleep: null,      shower: false, medic: true,  gearCheck: null,      food: "Watermelon" },
  { name: "Crown King by Tailwind",         mile: 36.6,  cutoff: "Mon 11:55 PM", crew: true,  pacer: false, dropBag: true,  sleep: null,      shower: false, medic: true,  gearCheck: "Yes",     food: "Pulled pork & Black Bean Burgers, Potato soup, Tailwind slushies" },
  { name: "Arrastra Creek",                 mile: 51,    cutoff: "Tue 7:00 AM",  crew: false, pacer: false, dropBag: false, sleep: null,      shower: false, medic: false, gearCheck: null,      food: "Rollups, Grilled cheese, Potato soup, Spring rolls" },
  { name: "Kamp Kipa",                      mile: 60.8,  cutoff: "Tue 2:00 PM",  crew: false, pacer: false, dropBag: true,  sleep: "Indoor",  shower: false, medic: false, gearCheck: null,      food: "Scrambled eggs, pancakes, bacon, potato soup" },
  { name: "Camp Wamatochick",               mile: 67.4,  cutoff: "Tue 4:45 PM",  crew: false, pacer: false, dropBag: true,  sleep: "Indoor",  shower: true,  medic: false, gearCheck: null,      food: "Burgers, Pancakes, bacon" },
  { name: "Whiskey Row",                    mile: 75.7,  cutoff: "Tue 10:00 PM", crew: true,  pacer: true,  dropBag: true,  sleep: "Indoor",  shower: false, medic: true,  gearCheck: null,      food: "Pizza, soup, quesadillas" },
  { name: "Watson Lake",                    mile: 82.8,  cutoff: "Wed 3:30 AM",  crew: true,  pacer: true,  dropBag: false, sleep: null,      shower: false, medic: false, gearCheck: null,      food: "Mashed potato bar w/ sloppy joe, tomato soup" },
  { name: "Fain Ranch by Satisfy",          mile: 94.5,  cutoff: "Wed 6:00 AM",  crew: true,  pacer: true,  dropBag: true,  sleep: null,      shower: false, medic: false, gearCheck: "Yes",     food: "Potatoes/veggies/chicken, french toast, pancakes" },
  { name: "Mingus Mountain",                mile: 106.8, cutoff: "Wed 1:00 PM",  crew: true,  pacer: true,  dropBag: true,  sleep: "Indoor",  shower: true,  medic: true,  gearCheck: null,      food: "Lasagna, Salad, pasta bake, Bread, Pancakes" },
  { name: "Jerome",                         mile: 123.8, cutoff: "Wed 8:30 PM",  crew: true,  pacer: true,  dropBag: false, sleep: null,      shower: false, medic: false, gearCheck: null,      food: "Chicken tacos, pancakes" },
  { name: "Dead Horse",                     mile: 132.5, cutoff: "Thu 12:00 AM", crew: true,  pacer: true,  dropBag: true,  sleep: "Outdoor", shower: true,  medic: true,  gearCheck: null,      food: "Burritos, potato soup, oatmeal" },
  { name: "Deer Pass",                      mile: 146.5, cutoff: "Thu 4:45 AM",  crew: false, pacer: false, dropBag: true,  sleep: null,      shower: false, medic: false, gearCheck: null,      food: "Hot dogs, tomato soup, Sandwiches, Pancakes" },
  { name: "Water Station",                  mile: 153.2, cutoff: null,           crew: false, pacer: false, dropBag: false, sleep: null,      shower: false, medic: false, gearCheck: null,      food: "Water only" },
  { name: "Sedona Posse Grounds",           mile: 158.8, cutoff: "Thu 12:00 PM", crew: true,  pacer: true,  dropBag: true,  sleep: "Indoor",  shower: false, medic: true,  gearCheck: "Yes",     food: "Burgers, scrambled eggs, tofu, bacon, pancakes" },
  { name: "Water Station",                  mile: 170.0, cutoff: null,           crew: false, pacer: false, dropBag: false, sleep: null,      shower: false, medic: false, gearCheck: null,      food: "Water only" },
  { name: "Schnebly Hill",                  mile: 175.7, cutoff: "Thu 9:00 PM",  crew: true,  pacer: false, dropBag: true,  sleep: null,      shower: false, medic: true,  gearCheck: null,      food: "Chili and pasta, Oatmeal",                       pacerNote: "NO PACERS" },
  { name: "Munds Park",                     mile: 189.6, cutoff: "Fri 2:45 AM",  crew: true,  pacer: true,  dropBag: true,  sleep: "Outdoor", shower: false, medic: true,  gearCheck: "Yes",     food: "BLT sandwiches, Tomato soup, eggs, pancakes" },
  { name: "Kelly Canyon",                   mile: 202.3, cutoff: "Fri 8:00 AM",  crew: false, pacer: false, dropBag: false, sleep: null,      shower: false, medic: false, gearCheck: null,      food: "Chicken tacos, potato soup, grits" },
  { name: "Fort Tuthill",                   mile: 210.6, cutoff: "Fri 12:45 PM", crew: true,  pacer: true,  dropBag: true,  sleep: "Indoor",  shower: false, medic: true,  gearCheck: "Yes",     food: "Pasta, salad, bread, oatmeal" },
  { name: "Walnut Canyon",                  mile: 226.8, cutoff: "Fri 7:45 PM",  crew: true,  pacer: true,  dropBag: true,  sleep: null,      shower: false, medic: true,  gearCheck: null,      food: "Breakfast burritos, potato soup, fruit" },
  { name: "Wildcat Hill",                   mile: 233.7, cutoff: "Fri 10:45 PM", crew: true,  pacer: false, dropBag: true,  sleep: null,      shower: false, medic: false, gearCheck: "Yes",     food: "Burgers, potato soup, pancakes",                 pacerNote: "NO PACERS" },
  { name: "Trinity Heights",                mile: 249.0, cutoff: "Sat 8:15 AM",  crew: false, pacer: false, dropBag: false, sleep: null,      shower: false, medic: false, gearCheck: null,      food: "Grilled cheese, quesadillas, tomato soup" },
  { name: "FINISH – Heritage Square",       mile: 252.9, cutoff: "Sat 10:00 AM", crew: true,  pacer: true,  dropBag: true,  sleep: null,      shower: false, medic: true,  gearCheck: null,      food: "Burgers, tomato soup, scrambled eggs, bacon, pancakes" },
];

const SCHEDULE = [
  { day: "Sun May 3",  events: ["12:45 PM – Deep Canyon Ranch gates open", "1:00–5:00 PM – Packet pickup & merch sales", "5:30 PM – Race Briefing / Q&A (highly recommended)"] },
  { day: "Mon May 4",  events: ["3:45–4:45 AM – 4L capacity check & SPOT Trackers issued", "5:00 AM – RACE START (mass) at Deep Canyon Ranch"] },
  { day: "Sat May 9",  events: ["6:00 AM – Final finisher celebration, Heritage Square", "DFL Award Ceremony (typically 6:00–10:00 AM)"] },
];

const REQUIRED_GEAR = [
  { item: "Cell Phone",          desc: "Emergency communication" },
  { item: "GPS Enabled Device",  desc: "With course file loaded (smartphone in airplane mode recommended)" },
  { item: "Headlamp",            desc: "With extra batteries or charging method" },
  { item: "Collapsible Cup",     desc: "Cupless event for cold drinks – carry your own" },
  { item: "Space Blanket",       desc: "Emergency thermal protection" },
  { item: "Whistle",             desc: "Signaling device" },
];

const COLD_WEATHER_GEAR = [
  { item: "4L Water Capacity",          desc: "Required leaving Start Line & Cottonwood Creek" },
  { item: "Gloves",                     desc: "Required on cold sections" },
  { item: "Warm Hat / Neck Gaiter",     desc: "Required on cold sections" },
  { item: "Long Sleeve",                desc: "Required on cold sections" },
  { item: "Insulating Upper Layer",     desc: "Fleece, puffy, or mid-weight" },
  { item: "Waterproof Jacket w/ Hood",  desc: "Only required if rain or snow" },
];

const TABS = ["Map", "Aid Stations", "Schedule", "Required Gear", "Key Rules", "Course Info"];

// ─── GPS Data from CalTopo ────────────────────────────────────────
// Route: RDP-simplified from 55,293 → 349 points (epsilon=0.002°)
// Coords: [lon, lat]
const ROUTE_COORDS = [[-112.1573,34.08283],[-112.15788,34.08031],[-112.16259,34.08182],[-112.16214,34.0792],[-112.16531,34.07922],[-112.16952,34.05792],[-112.18009,34.05344],[-112.18325,34.04856],[-112.18534,34.05109],[-112.19076,34.03992],[-112.19094,34.03188],[-112.20476,34.03749],[-112.2133,34.02967],[-112.22606,34.02706],[-112.23269,34.03465],[-112.23133,34.03932],[-112.22573,34.04053],[-112.22665,34.05348],[-112.2238,34.05984],[-112.21403,34.06004],[-112.22345,34.06574],[-112.22562,34.0706],[-112.2283,34.0811],[-112.22386,34.08259],[-112.22212,34.09357],[-112.22573,34.09573],[-112.22601,34.10047],[-112.23474,34.10111],[-112.23414,34.10498],[-112.24783,34.11481],[-112.24375,34.12442],[-112.24723,34.12779],[-112.25761,34.12353],[-112.27658,34.12289],[-112.28791,34.11692],[-112.29192,34.11045],[-112.30516,34.11326],[-112.31109,34.12158],[-112.31819,34.12456],[-112.32506,34.13689],[-112.3122,34.15319],[-112.31896,34.15545],[-112.31599,34.16263],[-112.32303,34.16848],[-112.32824,34.16889],[-112.32893,34.17546],[-112.3358,34.18512],[-112.33255,34.19632],[-112.33811,34.19511],[-112.33981,34.19891],[-112.33655,34.20423],[-112.36176,34.20638],[-112.36899,34.2133],[-112.3666,34.22321],[-112.3694,34.22698],[-112.37985,34.22731],[-112.38362,34.23305],[-112.39004,34.23445],[-112.38101,34.26018],[-112.38336,34.26733],[-112.37852,34.27393],[-112.38012,34.2872],[-112.37566,34.29245],[-112.37323,34.30531],[-112.37635,34.30973],[-112.36973,34.31555],[-112.36679,34.32407],[-112.37709,34.34098],[-112.37379,34.35591],[-112.38482,34.35878],[-112.39645,34.37776],[-112.39517,34.38689],[-112.40091,34.38849],[-112.40334,34.39451],[-112.39922,34.39977],[-112.40009,34.41338],[-112.40814,34.41544],[-112.41849,34.41135],[-112.41851,34.41585],[-112.4272,34.42331],[-112.42541,34.42574],[-112.42847,34.42856],[-112.43421,34.4272],[-112.43331,34.44431],[-112.43685,34.44945],[-112.43283,34.45428],[-112.43973,34.45412],[-112.44251,34.46023],[-112.4382,34.45952],[-112.44744,34.46432],[-112.4432,34.4737],[-112.44702,34.47513],[-112.44381,34.48395],[-112.46355,34.49922],[-112.46156,34.50696],[-112.46814,34.52063],[-112.46258,34.52633],[-112.46334,34.54],[-112.47033,34.5401],[-112.46993,34.55563],[-112.4772,34.55679],[-112.47681,34.57083],[-112.461,34.56936],[-112.44422,34.57365],[-112.43274,34.57137],[-112.42372,34.58837],[-112.41947,34.58907],[-112.42083,34.59215],[-112.41723,34.59733],[-112.41072,34.59704],[-112.40972,34.60306],[-112.40312,34.60769],[-112.39311,34.60422],[-112.3883,34.60942],[-112.37539,34.61213],[-112.36669,34.60669],[-112.36013,34.60704],[-112.34009,34.61716],[-112.33433,34.62243],[-112.33367,34.62749],[-112.30705,34.62877],[-112.28953,34.64506],[-112.2794,34.6451],[-112.28022,34.65297],[-112.2484,34.66365],[-112.22959,34.66414],[-112.21123,34.66878],[-112.1951,34.66415],[-112.19402,34.67613],[-112.17435,34.67786],[-112.16867,34.68593],[-112.16097,34.69034],[-112.14912,34.69166],[-112.13874,34.69801],[-112.12689,34.69692],[-112.1246,34.69959],[-112.1209,34.69593],[-112.12166,34.70055],[-112.11536,34.70379],[-112.11161,34.71455],[-112.11833,34.71418],[-112.12357,34.7233],[-112.13466,34.72319],[-112.13167,34.72629],[-112.1358,34.72973],[-112.14344,34.72758],[-112.15736,34.73458],[-112.14656,34.73453],[-112.155,34.74258],[-112.1492,34.74289],[-112.15176,34.74578],[-112.14828,34.74887],[-112.14364,34.74699],[-112.14124,34.75063],[-112.1386,34.74964],[-112.14258,34.75409],[-112.15001,34.75476],[-112.15379,34.75854],[-112.15199,34.76242],[-112.1426,34.76313],[-112.14069,34.75891],[-112.12739,34.7592],[-112.13001,34.75797],[-112.11589,34.75082],[-112.11858,34.75398],[-112.11177,34.75419],[-112.11508,34.75313],[-112.11115,34.74797],[-112.08726,34.76101],[-112.07526,34.76155],[-112.0725,34.76633],[-112.06245,34.77074],[-112.04806,34.77245],[-112.0367,34.76461],[-112.02276,34.76863],[-112.01899,34.76055],[-112.02175,34.75588],[-112.01675,34.75594],[-112.01667,34.76276],[-112.01223,34.76411],[-112.01576,34.77106],[-112.00996,34.77519],[-112.0084,34.77349],[-112.0084,34.77764],[-112.00099,34.78658],[-111.99446,34.78068],[-111.9933,34.77005],[-111.98783,34.76872],[-111.9887,34.76626],[-111.98506,34.76742],[-111.97121,34.77695],[-111.96962,34.78319],[-111.95114,34.78775],[-111.93934,34.80583],[-111.91804,34.81254],[-111.91502,34.81043],[-111.89619,34.81345],[-111.88882,34.81782],[-111.88456,34.8277],[-111.86297,34.81984],[-111.84625,34.82244],[-111.84474,34.82944],[-111.83034,34.84113],[-111.82659,34.84976],[-111.81722,34.84574],[-111.80572,34.85404],[-111.79576,34.85548],[-111.79553,34.864],[-111.78327,34.86275],[-111.78543,34.87057],[-111.78328,34.86275],[-111.77148,34.86837],[-111.76202,34.86201],[-111.75772,34.86586],[-111.74396,34.86784],[-111.74129,34.86554],[-111.72838,34.87051],[-111.73478,34.87075],[-111.73967,34.87604],[-111.72664,34.87637],[-111.72737,34.87429],[-111.7168,34.87769],[-111.71106,34.87075],[-111.70756,34.87396],[-111.71032,34.8852],[-111.70275,34.88406],[-111.70277,34.88978],[-111.6951,34.89094],[-111.69682,34.8836],[-111.68211,34.88649],[-111.67344,34.89478],[-111.67408,34.8987],[-111.664,34.89952],[-111.66044,34.89693],[-111.65097,34.89994],[-111.6424,34.91221],[-111.62191,34.89936],[-111.61556,34.90058],[-111.60819,34.8973],[-111.59893,34.89977],[-111.5727,34.88907],[-111.5622,34.89153],[-111.55551,34.90561],[-111.56181,34.9128],[-111.56194,34.91753],[-111.58976,34.93564],[-111.60061,34.93599],[-111.6068,34.94043],[-111.63675,34.93853],[-111.65266,34.94258],[-111.65792,34.93944],[-111.67837,34.95045],[-111.67441,34.95283],[-111.67703,34.95619],[-111.67337,34.95732],[-111.68043,34.96682],[-111.67687,34.96932],[-111.68054,34.97144],[-111.68389,34.98292],[-111.68208,34.98722],[-111.68542,34.99132],[-111.68156,34.99743],[-111.67211,34.99722],[-111.67578,35.00738],[-111.67405,35.01326],[-111.66885,35.01705],[-111.66199,35.01523],[-111.65851,35.02935],[-111.66334,35.04397],[-111.67986,35.06008],[-111.67551,35.06016],[-111.67234,35.065],[-111.67573,35.06811],[-111.67834,35.08241],[-111.6832,35.0872],[-111.67515,35.09958],[-111.67973,35.11037],[-111.67854,35.11864],[-111.68533,35.12489],[-111.69323,35.12612],[-111.6981,35.13345],[-111.6921,35.14303],[-111.6821,35.14601],[-111.67979,35.15161],[-111.66868,35.14766],[-111.65641,35.15441],[-111.64506,35.14848],[-111.64101,35.15021],[-111.63356,35.14704],[-111.61858,35.15611],[-111.60648,35.15553],[-111.59852,35.15087],[-111.60005,35.15437],[-111.59725,35.15725],[-111.59547,35.1537],[-111.58523,35.15503],[-111.5793,35.15199],[-111.57798,35.15536],[-111.56664,35.14883],[-111.55725,35.16278],[-111.55216,35.16441],[-111.55279,35.16178],[-111.54856,35.16381],[-111.54585,35.16099],[-111.54693,35.16632],[-111.54155,35.1666],[-111.53886,35.1779],[-111.53229,35.17995],[-111.53745,35.18391],[-111.52913,35.19047],[-111.53346,35.19338],[-111.52461,35.19565],[-111.53032,35.19739],[-111.52623,35.21234],[-111.52996,35.21993],[-111.54681,35.22565],[-111.55257,35.23076],[-111.5584,35.22371],[-111.55441,35.22806],[-111.55806,35.2333],[-111.55649,35.2373],[-111.56584,35.24521],[-111.56389,35.25032],[-111.56781,35.25551],[-111.57304,35.25809],[-111.57841,35.25493],[-111.57634,35.26099],[-111.58073,35.26365],[-111.57807,35.26567],[-111.58728,35.26058],[-111.58824,35.26263],[-111.59327,35.25768],[-111.5977,35.26273],[-111.59673,35.26619],[-111.60248,35.25778],[-111.60292,35.24786],[-111.59791,35.24056],[-111.5931,35.24335],[-111.59305,35.24056],[-111.585,35.2394],[-111.58748,35.23005],[-111.5928,35.22661],[-111.60478,35.22841],[-111.6142,35.2247],[-111.62757,35.22985],[-111.63269,35.21726],[-111.63952,35.21104],[-111.64452,35.21081],[-111.64795,35.19869]];

// Aid station coords matched from CalTopo markers [lon, lat]
const STATION_COORDS = {
  0:     [-112.15727, 34.08288],  // Start
  7.4:   [-112.19723, 34.03480],
  10.4:  [-112.23212, 34.03565],
  24.6:  [-112.28794, 34.11681],
  32.5:  [-112.32366, 34.16878],
  36.6:  [-112.33912, 34.20596],
  51:    [-112.37084, 34.32838],
  60.8:  [-112.41629, 34.41311],
  67.4:  [-112.43790, 34.45881],
  75.7:  [-112.47037, 34.54071],
  82.8:  [-112.42065, 34.59056],
  94.5:  [-112.27940, 34.64511],
  106.8: [-112.12420, 34.69944],
  123.8: [-112.11078, 34.75354],
  132.5: [-112.02003, 34.75501],
  146.5: [-111.90050, 34.81329],
  153.2: [-111.82858, 34.84609],
  158.8: [-111.78554, 34.87032],
  170.0: [-111.70301, 34.88962],
  175.7: [-111.64311, 34.91167],
  189.6: [-111.65531, 34.94154],
  202.3: [-111.67836, 35.05685],
  210.6: [-111.69317, 35.14106],
  226.8: [-111.53248, 35.18041],
  233.7: [-111.55745, 35.22393],
  249.0: [-111.61387, 35.22462],
  252.9: [-111.64796, 35.19865],  // Finish
};

// ─── Design tokens ───────────────────────────────────────────────
// Background: aged parchment / topographic map paper
// Cards: slightly darker warm beige / linen
// Accent: terracotta #b03a10
// Text: dark ink #1e100a

const T = {
  accent:       "#b03a10",   // terracotta ink
  accentLight:  "#c85a28",   // lighter terracotta
  accentMuted:  "#7a2808",   // deep ember
  bgPage:       "linear-gradient(170deg, #e8d9b8 0%, #dfd0a0 30%, #e2cfa0 60%, #d8c898 100%)",
  cardBg:       "rgba(210, 190, 150, 0.60)",
  cardBorder:   "rgba(140, 95, 45, 0.40)",
  cardBgSolid:  "#c8b080",
  innerCard:    "rgba(195, 172, 120, 0.75)",
  innerBorder:  "rgba(140, 90, 40, 0.35)",
  textPrimary:  "#1e100a",   // dark ink brown
  textSecondary:"#4a2e18",   // mid ink
  textMuted:    "#7a5a38",   // faded ink
  green:        "#2d6e30",
  greenDark:    "rgba(45,110,48,0.20)",
  teal:         "#1a6060",
  tealDark:     "rgba(26,96,96,0.20)",
  sky:          "#1a4a70",
  skyDark:      "rgba(26,74,112,0.18)",
  violet:       "#4a2878",
  violetDark:   "rgba(74,40,120,0.18)",
  sandy:        "#7a5010",
  sandyDark:    "rgba(122,80,16,0.20)",
  red:          "#9a1a08",
  redDark:      "rgba(154,26,8,0.18)",
  orange:       "#a04010",
  orangeDark:   "rgba(160,64,16,0.20)",
};

// Topographic SVG lines pattern (inline, so no external deps)
const TOPO_PATTERN = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Cg fill='none' stroke='rgba(140%2C95%2C40%2C0.18)' stroke-width='1'%3E%3Cellipse cx='200' cy='200' rx='60' ry='30'/%3E%3Cellipse cx='200' cy='200' rx='90' ry='50'/%3E%3Cellipse cx='200' cy='200' rx='120' ry='70'/%3E%3Cellipse cx='200' cy='200' rx='150' ry='90'/%3E%3Cellipse cx='200' cy='200' rx='180' ry='110'/%3E%3Cellipse cx='200' cy='200' rx='210' ry='130'/%3E%3Cellipse cx='200' cy='200' rx='240' ry='155'/%3E%3Cellipse cx='200' cy='200' rx='270' ry='175'/%3E%3Cellipse cx='200' cy='200' rx='300' ry='195'/%3E%3Cellipse cx='80' cy='320' rx='50' ry='25'/%3E%3Cellipse cx='80' cy='320' rx='80' ry='45'/%3E%3Cellipse cx='80' cy='320' rx='110' ry='65'/%3E%3Cellipse cx='320' cy='80' rx='45' ry='22'/%3E%3Cellipse cx='320' cy='80' rx='75' ry='42'/%3E%3Cellipse cx='320' cy='80' rx='105' ry='62'/%3E%3C/g%3E%3C/svg%3E")`;

// Grain texture
const GRAIN = `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`;

// ─── Icons ───────────────────────────────────────────────────────
const Icon = ({ name, size = 14 }) => {
  const s = { width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" };
  const icons = {
    crew:    <svg {...s}><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
    pacer:   <svg {...s}><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
    bag:     <svg {...s}><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>,
    sleep:   <svg {...s}><path d="M2 4v16"/><path d="M2 8h18a2 2 0 0 1 2 2v10"/><path d="M2 17h20"/><path d="M6 8v9"/></svg>,
    shower:  <svg {...s}><path d="M4 4h3a2 2 0 0 1 2 2v3.5h0A5.5 5.5 0 0 1 16 15v1h1"/><line x1="8" y1="18" x2="8" y2="21"/><line x1="12" y1="18" x2="12" y2="21"/><line x1="16" y1="18" x2="16" y2="21"/></svg>,
    medic:   <svg {...s}><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>,
    check:   <svg {...s} strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>,
    xmark:   <svg {...s}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
    alert:   <svg {...s}><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>,
    food:    <svg {...s}><path d="M18 8h1a4 4 0 0 1 0 8h-1"/><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/><line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/></svg>,
    gear:    <svg {...s}><circle cx="12" cy="12" r="3"/><path d="M19.07 4.93l-1.41 1.41M5.34 18.66l-1.41 1.41M22 12h-2M4 12H2M19.07 19.07l-1.41-1.41M5.34 5.34L3.93 3.93M12 22v-2M12 4V2"/></svg>,
    chevron: <svg {...s} strokeWidth="2.5"><polyline points="9 18 15 12 9 6"/></svg>,
  };
  return icons[name] || null;
};

// ─── Amenity legend config ────────────────────────────────────────
const AMENITY_LEGEND = [
  { icon: "crew",   color: T.sky,    label: "Crew" },
  { icon: "pacer",  color: T.violet, label: "Pacer" },
  { icon: "bag",    color: T.sandy,  label: "Drop Bag" },
  { icon: "sleep",  color: T.green,  label: "Sleep (Indoor)" },
  { icon: "sleep",  color: T.orange, label: "Sleep (Outdoor)" },
  { icon: "shower", color: T.teal,   label: "Shower" },
  { icon: "medic",  color: T.red,    label: "Medic" },
];

// ─── Accordion detail panel ───────────────────────────────────────
// Cumulative distance fractions for each route point (0.0 = start, 1.0 = finish)
// Pre-computed via haversine; multiply by 252.9 to get miles
const ROUTE_FRACS = [0.0,0.00084,0.00221,0.00308,0.00394,0.01102,0.01424,0.01606,0.01706,0.02101,0.02365,0.02783,0.03129,0.03486,0.03793,0.03951,0.04108,0.04533,0.04756,0.05021,0.05338,0.05508,0.0586,0.0599,0.06353,0.06474,0.06629,0.06867,0.06995,0.07487,0.07821,0.07966,0.08281,0.08796,0.09161,0.09399,0.0977,0.10087,0.10303,0.10748,0.11387,0.11584,0.11833,0.12104,0.12246,0.12462,0.12829,0.13207,0.13363,0.13496,0.13691,0.14379,0.14679,0.1501,0.15155,0.15438,0.15653,0.15833,0.16711,0.16954,0.17207,0.17644,0.17854,0.18281,0.18449,0.18711,0.19001,0.19622,0.20119,0.20432,0.2113,0.21431,0.21595,0.21803,0.22008,0.22455,0.22683,0.22994,0.23141,0.2348,0.23574,0.23698,0.23859,0.24421,0.24615,0.24807,0.24993,0.25207,0.25326,0.25621,0.2595,0.26063,0.26365,0.27096,0.27356,0.27838,0.28078,0.28526,0.28715,0.29225,0.29425,0.29885,0.30315,0.30789,0.31108,0.31716,0.31833,0.3194,0.32136,0.32312,0.32511,0.32745,0.33038,0.33253,0.33612,0.33907,0.34084,0.34719,0.34951,0.35118,0.35838,0.36551,0.36824,0.37083,0.3801,0.38517,0.39035,0.39496,0.3989,0.40423,0.40729,0.40982,0.41304,0.41653,0.41974,0.42082,0.42238,0.42391,0.42591,0.42958,0.43139,0.4347,0.43769,0.43899,0.44057,0.44275,0.44714,0.45005,0.45354,0.4551,0.45628,0.45766,0.45905,0.46041,0.46119,0.463,0.46501,0.46662,0.46798,0.47052,0.47199,0.47558,0.47639,0.48086,0.48212,0.48396,0.48492,0.48691,0.49464,0.49788,0.49961,0.50268,0.50659,0.51059,0.51457,0.51741,0.51911,0.52046,0.52269,0.52397,0.52644,0.5285,0.5292,0.53056,0.53411,0.53672,0.54022,0.54176,0.5426,0.54365,0.54852,0.55061,0.5558,0.56253,0.56867,0.56974,0.5749,0.57735,0.58078,0.58714,0.59172,0.59405,0.5995,0.60251,0.60535,0.60947,0.61219,0.61499,0.61831,0.62094,0.62357,0.62724,0.63053,0.63224,0.636,0.63704,0.64088,0.6426,0.64478,0.64828,0.64899,0.65205,0.6548,0.65621,0.65997,0.66204,0.66391,0.66601,0.66846,0.67253,0.67611,0.67741,0.68013,0.68141,0.68414,0.68878,0.69572,0.69747,0.69972,0.70234,0.71022,0.71316,0.71811,0.72102,0.72257,0.73212,0.73503,0.73724,0.74532,0.7498,0.75155,0.75812,0.75944,0.76075,0.7618,0.76545,0.76671,0.76791,0.77178,0.77327,0.77489,0.77715,0.77968,0.78316,0.78514,0.78701,0.78895,0.79367,0.79864,0.80553,0.8067,0.8085,0.80987,0.81461,0.81665,0.82125,0.82499,0.82772,0.83046,0.83262,0.83535,0.83888,0.84174,0.84367,0.84692,0.85089,0.8545,0.85572,0.85797,0.86297,0.86622,0.86884,0.87006,0.87127,0.87253,0.87531,0.87718,0.87834,0.88206,0.88728,0.88875,0.88963,0.89094,0.89212,0.89389,0.89533,0.89911,0.90099,0.90289,0.90599,0.90749,0.90997,0.91161,0.91663,0.91931,0.9242,0.92648,0.92927,0.93105,0.93302,0.9344,0.93801,0.93976,0.94176,0.9434,0.94517,0.94723,0.9487,0.94967,0.95265,0.95336,0.95547,0.95751,0.95867,0.96183,0.96509,0.96783,0.96941,0.97033,0.97251,0.97565,0.97747,0.98073,0.98353,0.98749,0.99184,0.99458,0.99592,1.0];

// Given a mile 0–252.9, find the interpolated [lon, lat] on the route polyline
const mileToRoutePoint = mile => {
  const frac = Math.max(0, Math.min(1, mile / TOTAL_MILES));
  // Binary search for the segment
  let lo = 0, hi = ROUTE_FRACS.length - 1;
  while (lo < hi - 1) {
    const mid = (lo + hi) >> 1;
    if (ROUTE_FRACS[mid] <= frac) lo = mid; else hi = mid;
  }
  const t = (frac - ROUTE_FRACS[lo]) / (ROUTE_FRACS[hi] - ROUTE_FRACS[lo] || 1);
  const [lon0, lat0] = ROUTE_COORDS[lo];
  const [lon1, lat1] = ROUTE_COORDS[hi];
  return [lon0 + t * (lon1 - lon0), lat0 + t * (lat1 - lat0)];
};
// Elevations from published race data, USGS, and known course characteristics.
// Profile shape is accurate; total gain/loss (40,667' / 35,674') reflects
// cumulative micro-terrain not visible at this resolution.
const ELEV_PTS = [[0,2230],[5,1600],[7.4,1750],[10.4,1640],[24.6,2100],[28,3000],[32.5,3800],[36.6,5400],[42,4800],[51,4200],[55,3800],[60.8,5100],[67.4,5300],[75.7,5400],[80,5800],[82.8,5100],[94.5,4900],[100,6000],[106.8,7700],[110,7800],[115,6500],[120,5800],[123.8,5100],[128,4500],[132.5,3600],[138,3500],[142,3800],[146.5,4200],[153.2,4000],[158.8,4200],[162,4000],[168,4400],[170,4600],[172,4800],[175.7,5400],[178,5800],[183,6400],[189.6,6900],[195,7100],[202.3,7000],[207,7100],[210.6,7000],[218,7000],[226.8,7100],[233.7,7200],[240,7300],[245,7200],[249,7100],[252.9,6900]];

const TOTAL_MILES = 252.9;
const ELEV_MIN = 1600, ELEV_MAX = 7800;

// ─── Elevation Profile SVG ───────────────────────────────────────
const ElevationProfile = ({ onSelectStation, hoveredMile, onHoverMile }) => {
  const [hoveredStation, setHoveredStation] = useState(null);

  const W = 800, H = 200;
  const PAD_L = 44, PAD_R = 12, PAD_T = 14, PAD_B = 36;
  const chartW = W - PAD_L - PAD_R;
  const chartH = H - PAD_T - PAD_B;

  const mileToX = m  => PAD_L + (m / TOTAL_MILES) * chartW;
  const elevToY = el => PAD_T + (1 - (el - ELEV_MIN) / (ELEV_MAX - ELEV_MIN)) * chartH;

  // Build smooth SVG path using cubic bezier through control points
  const pathD = (() => {
    const pts = ELEV_PTS.map(([m, e]) => ({ x: mileToX(m), y: elevToY(e) }));
    if (pts.length < 2) return "";
    let d = `M ${pts[0].x.toFixed(1)},${pts[0].y.toFixed(1)}`;
    for (let i = 1; i < pts.length; i++) {
      const prev = pts[i - 1], curr = pts[i];
      const cp1x = prev.x + (curr.x - prev.x) * 0.4;
      const cp2x = curr.x - (curr.x - prev.x) * 0.4;
      d += ` C ${cp1x.toFixed(1)},${prev.y.toFixed(1)} ${cp2x.toFixed(1)},${curr.y.toFixed(1)} ${curr.x.toFixed(1)},${curr.y.toFixed(1)}`;
    }
    return d;
  })();

  // Fill path (area under curve)
  const fillD = pathD + ` L ${mileToX(TOTAL_MILES).toFixed(1)},${(PAD_T + chartH).toFixed(1)} L ${PAD_L},${(PAD_T + chartH).toFixed(1)} Z`;

  // Interpolate elevation at a given mile
  const interpElev = mile => {
    for (let i = 1; i < ELEV_PTS.length; i++) {
      if (ELEV_PTS[i][0] >= mile) {
        const [m0, e0] = ELEV_PTS[i - 1], [m1, e1] = ELEV_PTS[i];
        const t = (mile - m0) / (m1 - m0);
        return e0 + t * (e1 - e0);
      }
    }
    return ELEV_PTS[ELEV_PTS.length - 1][1];
  };

  // Y-axis tick elevations
  const yTicks = [2000, 3000, 4000, 5000, 6000, 7000];

  // X-axis mile markers
  const xTicks = [0, 50, 100, 150, 200, 252.9];

  // Notable terrain labels
  const landmarks = [
    { mile: 36.6,  label: "Crown King",   dy: -8  },
    { mile: 110,   label: "Mingus Mtn",   dy: -8  },
    { mile: 132.5, label: "Verde Valley", dy: 14  },
    { mile: 175.7, label: "Schnebly Hill",dy: -8  },
    { mile: 252.9, label: "Flagstaff",    dy: -8  },
  ];

  const handleMouseMove = e => {
    const svgEl = e.currentTarget;
    const rect  = svgEl.getBoundingClientRect();
    const rawX  = (e.clientX - rect.left) * (W / rect.width);
    const clampX = Math.max(PAD_L, Math.min(W - PAD_R, rawX));
    const mile  = ((clampX - PAD_L) / chartW) * TOTAL_MILES;
    onHoverMile && onHoverMile(mile);
  };

  // Derive cursor position from shared hoveredMile prop
  const cursor = hoveredMile != null ? {
    x: mileToX(hoveredMile),
    mile: hoveredMile,
    elev: interpElev(hoveredMile),
  } : null;

  return (
    <div className="mt-4">
      <div className="mb-2 flex items-center justify-between font-sans">
        <div className="text-xs font-bold uppercase tracking-widest" style={{ color: T.accentLight }}>
          Elevation Profile
        </div>
        <div className="text-xs italic" style={{ color: T.textMuted }}>
          40,667' gain · 35,674' loss · approx. profile
        </div>
      </div>
      <div className="rounded-xl overflow-hidden relative"
        style={{ border: `1.5px solid ${T.cardBorder}`, background: "rgba(215,195,155,0.5)" }}>
        <svg width="100%" viewBox={`0 0 ${W} ${H}`} style={{ display: "block" }}
          onMouseMove={handleMouseMove}
          onMouseLeave={() => onHoverMile && onHoverMile(null)}>

          {/* Gradient fill definition */}
          <defs>
            <linearGradient id="elevGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%"   stopColor={T.accent}      stopOpacity="0.45" />
              <stop offset="100%" stopColor={T.accentMuted}  stopOpacity="0.08" />
            </linearGradient>
            <linearGradient id="elevLine" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%"   stopColor={T.green} />
              <stop offset="40%"  stopColor={T.accent} />
              <stop offset="100%" stopColor={T.accentLight} />
            </linearGradient>
          </defs>

          {/* Y-axis gridlines + labels */}
          {yTicks.map(el => {
            const y = elevToY(el);
            return (
              <g key={el}>
                <line x1={PAD_L} y1={y} x2={W - PAD_R} y2={y}
                  stroke="rgba(140,95,45,0.18)" strokeWidth={0.5} strokeDasharray="3,3" />
                <text x={PAD_L - 4} y={y + 3.5} textAnchor="end" fontSize={7.5}
                  fill={T.textMuted} style={{ fontFamily: "sans-serif" }}>
                  {(el / 1000).toFixed(0)}k
                </text>
              </g>
            );
          })}

          {/* Axes */}
          <line x1={PAD_L} y1={PAD_T} x2={PAD_L} y2={PAD_T + chartH}
            stroke={T.cardBorder} strokeWidth={1} />
          <line x1={PAD_L} y1={PAD_T + chartH} x2={W - PAD_R} y2={PAD_T + chartH}
            stroke={T.cardBorder} strokeWidth={1} />

          {/* X-axis mile ticks */}
          {xTicks.map(m => {
            const x = mileToX(m);
            return (
              <g key={m}>
                <line x1={x} y1={PAD_T + chartH} x2={x} y2={PAD_T + chartH + 4}
                  stroke={T.cardBorder} strokeWidth={1} />
                <text x={x} y={PAD_T + chartH + 13} textAnchor="middle" fontSize={7.5}
                  fill={T.textMuted} style={{ fontFamily: "sans-serif" }}>
                  {m === 252.9 ? "253" : m}
                </text>
              </g>
            );
          })}

          {/* X-axis label */}
          <text x={PAD_L + chartW / 2} y={H - 2} textAnchor="middle" fontSize={7}
            fill={T.textMuted} style={{ fontFamily: "sans-serif" }}>miles</text>

          {/* Y-axis label */}
          <text x={10} y={PAD_T + chartH / 2} textAnchor="middle" fontSize={7}
            fill={T.textMuted} transform={`rotate(-90, 10, ${PAD_T + chartH / 2})`}
            style={{ fontFamily: "sans-serif" }}>elevation (ft)</text>

          {/* Area fill */}
          <path d={fillD} fill="url(#elevGrad)" />

          {/* Profile line */}
          <path d={pathD} fill="none" stroke="url(#elevLine)" strokeWidth={2}
            strokeLinecap="round" strokeLinejoin="round" />

          {/* Landmark labels */}
          {landmarks.map(({ mile, label, dy }) => {
            const x = mileToX(mile);
            const el = interpElev(mile);
            const y = elevToY(el);
            return (
              <g key={label}>
                <line x1={x} y1={y + (dy > 0 ? 3 : -3)} x2={x} y2={y + dy * 0.7}
                  stroke={T.textMuted} strokeWidth={0.5} strokeDasharray="2,2" />
                <text x={x} y={y + dy + (dy > 0 ? 8 : 0)} textAnchor="middle" fontSize={7}
                  fill={T.textSecondary} fontStyle="italic"
                  style={{ fontFamily: "Georgia, serif" }}>
                  {label}
                </text>
              </g>
            );
          })}

          {/* Aid station tick marks on x-axis */}
          {AID_STATIONS.map((s, i) => {
            const x = mileToX(s.mile);
            const isStart = i === 0, isFinish = i === AID_STATIONS.length - 1;
            const isMajor = s.crew || s.sleep || s.medic;
            const color = isStart ? T.green : isFinish ? T.accent : isMajor ? T.accentLight : "rgba(140,95,45,0.4)";
            const tickH = isStart || isFinish ? 8 : isMajor ? 5 : 3;
            const el = interpElev(s.mile);
            const y  = elevToY(el);
            return (
              <g key={`${s.name}-${s.mile}`} style={{ cursor: "pointer" }}
                onMouseEnter={() => setHoveredStation(i)}
                onMouseLeave={() => setHoveredStation(null)}
                onClick={() => onSelectStation && onSelectStation(i)}>
                {/* Dot on profile line */}
                <circle cx={x} cy={y} r={isStart || isFinish ? 4 : isMajor ? 2.5 : 1.5}
                  fill={color}
                  stroke={isStart || isFinish ? "rgba(30,16,10,0.5)" : "none"}
                  strokeWidth={1} />
                {/* Bottom tick */}
                <line x1={x} y1={PAD_T + chartH} x2={x} y2={PAD_T + chartH + tickH}
                  stroke={color} strokeWidth={isStart || isFinish ? 1.5 : 1} />
              </g>
            );
          })}

          {/* Cursor scrubber */}
          {cursor && (
            <g pointerEvents="none">
              <line x1={cursor.x} y1={PAD_T} x2={cursor.x} y2={PAD_T + chartH}
                stroke={T.accent} strokeWidth={1} strokeDasharray="3,2" opacity={0.7} />
              <circle cx={cursor.x} cy={elevToY(cursor.elev)} r={4}
                fill={T.accent} stroke="white" strokeWidth={1.5} />
              {/* Cursor tooltip bubble */}
              {(() => {
                const bw = 90, bh = 30, bx = Math.min(cursor.x + 8, W - PAD_R - bw - 4);
                const by = PAD_T + 6;
                return (
                  <g>
                    <rect x={bx} y={by} width={bw} height={bh} rx={4}
                      fill="rgba(228,210,170,0.95)" stroke={T.accent} strokeWidth={0.8} opacity={0.95} />
                    <text x={bx + bw/2} y={by + 11} textAnchor="middle" fontSize={8.5} fontWeight="bold"
                      fill={T.textPrimary} style={{ fontFamily: "sans-serif" }}>
                      Mi {cursor.mile.toFixed(1)}
                    </text>
                    <text x={bx + bw/2} y={by + 23} textAnchor="middle" fontSize={8}
                      fill={T.textSecondary} style={{ fontFamily: "sans-serif" }}>
                      {Math.round(cursor.elev).toLocaleString()}' elev
                    </text>
                  </g>
                );
              })()}
            </g>
          )}

          {/* Hovered station tooltip */}
          {hoveredStation !== null && (() => {
            const s = AID_STATIONS[hoveredStation];
            const x = mileToX(s.mile);
            const el = interpElev(s.mile);
            const y = elevToY(el);
            const isStart = hoveredStation === 0, isFinish = hoveredStation === AID_STATIONS.length - 1;
            const bw = 130, bh = 36;
            const bx = Math.min(x - bw/2, W - PAD_R - bw - 4);
            const by = Math.max(PAD_T + 4, y - bh - 10);
            return (
              <g pointerEvents="none">
                <rect x={bx} y={by} width={bw} height={bh} rx={4}
                  fill="rgba(228,210,170,0.97)" stroke={T.accent} strokeWidth={0.8} />
                <text x={bx + bw/2} y={by + 12} textAnchor="middle" fontSize={8} fontWeight="bold"
                  fill={isStart ? T.green : isFinish ? T.accent : T.textPrimary}
                  style={{ fontFamily: "Georgia, serif" }}>
                  {s.name.length > 22 ? s.name.slice(0, 22) + "…" : s.name}
                </text>
                <text x={bx + bw/2} y={by + 24} textAnchor="middle" fontSize={7.5}
                  fill={T.textSecondary} style={{ fontFamily: "sans-serif" }}>
                  Mi {s.mile} · {Math.round(el).toLocaleString()}' · {s.cutoff || "no cutoff"}
                </text>
              </g>
            );
          })()}
        </svg>
      </div>
      <div className="flex flex-wrap gap-x-5 gap-y-1 mt-2 text-xs font-sans px-1" style={{ color: T.textMuted, fontStyle: "italic" }}>
        <span>Hover to read elevation · Click station markers to jump to aid station details</span>
      </div>
    </div>
  );
};

// ─── Course Map (SVG rendered from real GPS data) ────────────────
const CourseMap = ({ onSelectStation, hoveredMile, onHoverMile }) => {
  const [hoveredIdx, setHoveredIdx] = useState(null);
  const [tooltip, setTooltip]       = useState(null);

  // Map bounds from route bounding box with small padding
  const LON_MIN = -112.52, LON_MAX = -111.48;
  const LAT_MIN =  34.00,  LAT_MAX =  35.32;

  const W = 800, H = 560;
  const PAD = 24;

  // Mercator-ish projection (simple linear for this scale — negligible distortion)
  const project = (lon, lat) => ({
    x: PAD + ((lon - LON_MIN) / (LON_MAX - LON_MIN)) * (W - PAD * 2),
    y: PAD + ((LAT_MAX - lat) / (LAT_MAX - LAT_MIN)) * (H - PAD * 2),
  });

  // Build polyline points string from route
  const routePoints = ROUTE_COORDS.map(([lon, lat]) => {
    const { x, y } = project(lon, lat);
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  }).join(" ");

  // Render station dots
  const stationDots = AID_STATIONS.map((s, i) => {
    const coords = STATION_COORDS[s.mile];
    if (!coords) return null;
    const { x, y } = project(coords[0], coords[1]);
    const isStart  = i === 0;
    const isFinish = i === AID_STATIONS.length - 1;
    const isMajor  = s.crew || s.sleep || s.medic;
    const isWater  = s.name === "Water Station";
    const isHovered = hoveredIdx === i;

    const r     = isStart || isFinish ? 7 : isMajor ? 5 : isWater ? 3 : 4;
    const color = isStart ? T.green : isFinish ? T.accent
                : isWater ? T.teal
                : isMajor ? T.accentLight : T.textMuted;

    return (
      <g key={`${s.name}-${s.mile}`}
        style={{ cursor: "pointer" }}
        onMouseEnter={e => { setHoveredIdx(i); setTooltip({ x, y, s, i }); }}
        onMouseLeave={() => { setHoveredIdx(null); setTooltip(null); }}
        onClick={() => onSelectStation && onSelectStation(i)}>
        {/* Hit area */}
        <circle cx={x} cy={y} r={12} fill="transparent" />
        {/* Glow for hovered */}
        {isHovered && <circle cx={x} cy={y} r={r + 5} fill={color} opacity={0.25} />}
        {/* Dot */}
        <circle cx={x} cy={y} r={r}
          fill={isHovered ? color : color}
          stroke={isStart || isFinish ? "#fff" : isHovered ? "#fff" : "rgba(30,16,10,0.4)"}
          strokeWidth={isStart || isFinish ? 2 : isHovered ? 1.5 : 1} />
        {/* Labels for major stations */}
        {(isStart || isFinish || (isMajor && !isWater && isHovered)) && (
          <text x={x} y={y - r - 4}
            fontSize={isStart || isFinish ? 9 : 8}
            fontWeight={isStart || isFinish ? "bold" : "normal"}
            fill={isStart || isFinish ? color : T.textPrimary}
            textAnchor="middle"
            style={{ fontFamily: "Georgia, serif", pointerEvents: "none" }}>
            {isStart ? "START" : isFinish ? "FINISH" : ""}
          </text>
        )}
      </g>
    );
  });

  return (
    <div className="relative">
      {/* Map container */}
      <div className="rounded-xl overflow-hidden" style={{ border: `1.5px solid ${T.cardBorder}`, background: "rgba(215,195,155,0.5)" }}>
        <svg width="100%" viewBox={`0 0 ${W} ${H}`} style={{ display: "block" }}
          onMouseMove={e => {
            // Find nearest route point to cursor and emit the corresponding mile
            const rect = e.currentTarget.getBoundingClientRect();
            const mx = (e.clientX - rect.left) * (W / rect.width);
            const my = (e.clientY - rect.top)  * (H / rect.height);
            // Find closest route point
            let bestIdx = 0, bestDist = Infinity;
            for (let i = 0; i < ROUTE_COORDS.length; i++) {
              const { x, y } = project(ROUTE_COORDS[i][0], ROUTE_COORDS[i][1]);
              const d = (x - mx) ** 2 + (y - my) ** 2;
              if (d < bestDist) { bestDist = d; bestIdx = i; }
            }
            onHoverMile && onHoverMile(ROUTE_FRACS[bestIdx] * TOTAL_MILES);
          }}
          onMouseLeave={() => onHoverMile && onHoverMile(null)}>
          {/* Subtle grid lines (like map graticules) */}
          {[-112.5,-112,-111.5].map(lon => {
            const { x } = project(lon, LAT_MIN);
            return <line key={lon} x1={x} y1={PAD} x2={x} y2={H-PAD} stroke="rgba(140,95,45,0.15)" strokeWidth={0.5} strokeDasharray="4,4" />;
          })}
          {[34,34.5,35,35.5].map(lat => {
            const { y } = project(LON_MIN, lat);
            return <line key={lat} x1={PAD} y1={y} x2={W-PAD} y2={y} stroke="rgba(140,95,45,0.15)" strokeWidth={0.5} strokeDasharray="4,4" />;
          })}

          {/* Route glow (shadow) */}
          <polyline points={routePoints} fill="none"
            stroke="rgba(176,58,16,0.18)" strokeWidth={6} strokeLinecap="round" strokeLinejoin="round" />
          {/* Route line */}
          <polyline points={routePoints} fill="none"
            stroke={T.accent} strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"
            strokeDasharray="none" />

          {/* Station dots (rendered last so they're on top) */}
          {stationDots}

          {/* Direction arrow mid-route */}
          {(() => {
            const mid = Math.floor(ROUTE_COORDS.length / 2);
            const p1 = project(ROUTE_COORDS[mid-3][0], ROUTE_COORDS[mid-3][1]);
            const p2 = project(ROUTE_COORDS[mid][0],   ROUTE_COORDS[mid][1]);
            const angle = Math.atan2(p2.y - p1.y, p2.x - p1.x) * 180 / Math.PI;
            return (
              <polygon points="-6,-4 6,0 -6,4"
                fill={T.accent} opacity={0.8}
                transform={`translate(${p2.x.toFixed(1)},${p2.y.toFixed(1)}) rotate(${angle.toFixed(1)})`} />
            );
          })()}

          {/* Crosshair dot — synced to hoveredMile from elevation profile */}
          {hoveredMile != null && (() => {
            const [lon, lat] = mileToRoutePoint(hoveredMile);
            const { x, y } = project(lon, lat);
            const elev = (() => {
              for (let i = 1; i < ELEV_PTS.length; i++) {
                if (ELEV_PTS[i][0] >= hoveredMile) {
                  const [m0,e0]=ELEV_PTS[i-1],[m1,e1]=ELEV_PTS[i];
                  const t=(hoveredMile-m0)/(m1-m0); return Math.round(e0+t*(e1-e0));
                }
              }
              return ELEV_PTS[ELEV_PTS.length-1][1];
            })();
            return (
              <g pointerEvents="none">
                {/* Outer pulse ring */}
                <circle cx={x} cy={y} r={14} fill="none" stroke={T.accent} strokeWidth={1} opacity={0.4} />
                {/* Inner glow */}
                <circle cx={x} cy={y} r={8}  fill={T.accent} opacity={0.25} />
                {/* Center dot */}
                <circle cx={x} cy={y} r={5}  fill={T.accent} stroke="white" strokeWidth={1.5} />
                {/* Mini tooltip */}
                {(() => {
                  const bw = 100, bh = 30;
                  const bx = x + 12 + bw > W - PAD ? x - bw - 12 : x + 12;
                  const by = Math.max(PAD, Math.min(y - bh/2, H - PAD - bh));
                  return (
                    <g>
                      <rect x={bx} y={by} width={bw} height={bh} rx={4}
                        fill="rgba(228,210,170,0.95)" stroke={T.accent} strokeWidth={0.8} />
                      <text x={bx+bw/2} y={by+11} textAnchor="middle" fontSize={8} fontWeight="bold"
                        fill={T.textPrimary} style={{fontFamily:"sans-serif"}}>
                        Mi {hoveredMile.toFixed(1)}
                      </text>
                      <text x={bx+bw/2} y={by+23} textAnchor="middle" fontSize={7.5}
                        fill={T.textSecondary} style={{fontFamily:"sans-serif"}}>
                        {elev.toLocaleString()}' elev
                      </text>
                    </g>
                  );
                })()}
              </g>
            );
          })()}

          {/* Compass rose */}
          <g transform={`translate(${W - 44}, ${H - 44})`}>
            <circle r={18} fill="rgba(215,195,155,0.8)" stroke={T.cardBorder} strokeWidth={1} />
            <polygon points="0,-13 3,-3 -3,-3" fill={T.accent} />
            <polygon points="0,13 3,3 -3,3"   fill={T.textMuted} />
            <text y={-15} textAnchor="middle" fontSize={7} fontWeight="bold" fill={T.accent} style={{ fontFamily:"Georgia,serif" }}>N</text>
          </g>

          {/* Scale bar (rough — at ~35° lat, 1° lon ≈ 91km) */}
          {(() => {
            const sx = PAD + 8, sy = H - PAD - 6;
            const deg50km = 50 / 91;
            const { x: ex } = project(LON_MIN + deg50km, LAT_MIN);
            const barW = ex - (PAD + 8);
            return (
              <g>
                <line x1={sx} y1={sy} x2={sx + barW} y2={sy} stroke={T.textSecondary} strokeWidth={1.5} />
                <line x1={sx} y1={sy-3} x2={sx} y2={sy+3} stroke={T.textSecondary} strokeWidth={1.5} />
                <line x1={sx+barW} y1={sy-3} x2={sx+barW} y2={sy+3} stroke={T.textSecondary} strokeWidth={1.5} />
                <text x={sx + barW/2} y={sy - 5} textAnchor="middle" fontSize={7} fill={T.textMuted} style={{ fontFamily:"sans-serif" }}>50 km</text>
              </g>
            );
          })()}
        </svg>
      </div>

      {/* Hover tooltip */}
      {tooltip && (() => {
        const { s, i } = tooltip;
        const isStart = i === 0, isFinish = i === AID_STATIONS.length - 1;
        return (
          <div className="absolute z-20 rounded-lg px-3 py-2 pointer-events-none shadow-lg"
            style={{
              left: `${(tooltip.x / W * 100).toFixed(1)}%`,
              top:  `${(tooltip.y / H * 100).toFixed(1)}%`,
              transform: "translate(-50%, calc(-100% - 12px))",
              background: "rgba(228,210,170,0.97)",
              border: `1px solid ${T.accent}80`,
              minWidth: 160,
            }}>
            <div className="text-xs font-bold" style={{ color: isStart ? T.green : isFinish ? T.accent : T.textPrimary }}>
              {isStart ? "START · " : isFinish ? "FINISH · " : `Mi ${s.mile} · `}{s.name}
            </div>
            {s.cutoff && <div className="text-xs mt-0.5" style={{ color: T.textSecondary }}>Cutoff: {s.cutoff}</div>}
            <div className="flex gap-2 mt-1 flex-wrap">
              {s.crew    && <span className="text-xs font-semibold" style={{ color: T.sky }}>Crew</span>}
              {s.pacer   && <span className="text-xs font-semibold" style={{ color: T.violet }}>Pacer</span>}
              {s.dropBag && <span className="text-xs font-semibold" style={{ color: T.sandy }}>Drop Bag</span>}
              {s.sleep   && <span className="text-xs font-semibold" style={{ color: T.green }}>Sleep</span>}
              {s.medic   && <span className="text-xs font-semibold" style={{ color: T.red }}>Medic</span>}
            </div>
          </div>
        );
      })()}

      {/* Legend */}
      <div className="flex flex-wrap gap-x-5 gap-y-1.5 mt-3 text-xs font-sans px-1" style={{ color: T.textSecondary }}>
        <span className="flex items-center gap-1.5">
          <span className="inline-block w-3 h-1.5 rounded-full" style={{ background: T.accent }} />
          Course route
        </span>
        <span className="flex items-center gap-1.5">
          <span className="inline-block w-3 h-3 rounded-full border-2" style={{ background: T.green, borderColor: "white" }} />
          Start
        </span>
        <span className="flex items-center gap-1.5">
          <span className="inline-block w-3 h-3 rounded-full border-2" style={{ background: T.accent, borderColor: "white" }} />
          Finish
        </span>
        <span className="flex items-center gap-1.5">
          <span className="inline-block w-2.5 h-2.5 rounded-full" style={{ background: T.accentLight }} />
          Major aid station
        </span>
        <span className="flex items-center gap-1.5">
          <span className="inline-block w-2 h-2 rounded-full" style={{ background: T.textMuted }} />
          Minor / water
        </span>
        <span style={{ color: T.textMuted, fontStyle: "italic" }}>Hover dots for details · Click to jump to aid station</span>
      </div>
    </div>
  );
};

// ─── Planning section sub-components ────────────────────────────

const PlanLabel = ({ children, color }) => (
  <div className="text-xs font-bold uppercase tracking-wider mb-1.5 flex items-center gap-1.5"
    style={{ color: color || T.accentLight }}>
    {children}
  </div>
);

const PlanInput = ({ value, onChange, placeholder, multiline, rows = 3 }) => {
  const shared = {
    value,
    onChange: e => onChange(e.target.value),
    placeholder,
    className: "w-full rounded-lg px-2.5 py-2 text-sm focus:outline-none resize-none font-sans",
    style: {
      background: "rgba(235,215,170,0.9)",
      border: `1px solid ${T.cardBorder}`,
      color: T.textPrimary,
    },
  };
  return multiline
    ? <textarea {...shared} rows={rows} />
    : <input {...shared} type="text" />;
};

// Small "Add item" packing list component
const PackingList = ({ items, onChange }) => {
  const add    = ()         => onChange([...items, ""]);
  const update = (i, val)   => { const n=[...items]; n[i]=val; onChange(n); };
  const remove = (i)        => onChange(items.filter((_,j) => j!==i));
  return (
    <div className="space-y-1.5">
      {items.map((item, i) => (
        <div key={i} className="flex gap-1.5 items-center">
          <span style={{ color: T.accentLight }} className="shrink-0 text-sm">•</span>
          <input
            type="text"
            value={item}
            onChange={e => update(i, e.target.value)}
            placeholder={`Item ${i + 1}`}
            className="flex-1 rounded-md px-2 py-1 text-sm focus:outline-none font-sans"
            style={{ background: "rgba(235,215,170,0.9)", border: `1px solid ${T.cardBorder}`, color: T.textPrimary }}
          />
          <button onClick={() => remove(i)}
            className="shrink-0 rounded px-1.5 py-0.5 text-xs font-bold"
            style={{ color: T.red, background: T.redDark }}>
            ✕
          </button>
        </div>
      ))}
      <button onClick={add}
        className="text-xs font-bold px-2.5 py-1 rounded-lg mt-1"
        style={{ background: T.accentLight + "25", border: `1px dashed ${T.accentLight}60`, color: T.accentLight }}>
        + Add item
      </button>
    </div>
  );
};

// Crew member row
const CrewRow = ({ person, onChange, onRemove }) => (
  <div className="rounded-lg p-2.5 space-y-2"
    style={{ background: "rgba(235,215,170,0.6)", border: `1px solid ${T.cardBorder}` }}>
    <div className="flex gap-2 items-center">
      <input type="text" value={person.name} onChange={e => onChange({ ...person, name: e.target.value })}
        placeholder="Name" className="flex-1 rounded-md px-2 py-1 text-sm focus:outline-none font-sans"
        style={{ background: "rgba(235,215,170,0.9)", border: `1px solid ${T.cardBorder}`, color: T.textPrimary }} />
      <button onClick={onRemove} className="shrink-0 rounded px-1.5 py-0.5 text-xs font-bold"
        style={{ color: T.red, background: T.redDark }}>✕</button>
    </div>
    <div className="flex gap-2">
      {["Drop off", "Pick up", "Both"].map(role => (
        <button key={role} onClick={() => onChange({ ...person, role })}
          className="text-xs px-2 py-0.5 rounded-full font-semibold transition-all"
          style={person.role === role
            ? { background: T.sky, color: "#fff" }
            : { background: "rgba(26,74,112,0.12)", color: T.sky, border: `1px solid ${T.sky}50` }}>
          {role}
        </button>
      ))}
    </div>
    <input type="text" value={person.vehicle || ""} onChange={e => onChange({ ...person, vehicle: e.target.value })}
      placeholder="Vehicle description (optional)" className="w-full rounded-md px-2 py-1 text-xs focus:outline-none font-sans"
      style={{ background: "rgba(235,215,170,0.9)", border: `1px solid ${T.cardBorder}`, color: T.textSecondary }} />
  </div>
);

// Pacer row
const PacerRow = ({ pacer, onChange, onRemove }) => (
  <div className="rounded-lg p-2.5 space-y-2"
    style={{ background: "rgba(235,215,170,0.6)", border: `1px solid ${T.cardBorder}` }}>
    <div className="flex gap-2 items-center">
      <input type="text" value={pacer.name} onChange={e => onChange({ ...pacer, name: e.target.value })}
        placeholder="Pacer name" className="flex-1 rounded-md px-2 py-1 text-sm focus:outline-none font-sans"
        style={{ background: "rgba(235,215,170,0.9)", border: `1px solid ${T.cardBorder}`, color: T.textPrimary }} />
      <button onClick={onRemove} className="shrink-0 rounded px-1.5 py-0.5 text-xs font-bold"
        style={{ color: T.red, background: T.redDark }}>✕</button>
    </div>
    <div className="flex gap-2">
      {["Joining here", "Leaving here", "Both"].map(action => (
        <button key={action} onClick={() => onChange({ ...pacer, action })}
          className="text-xs px-2 py-0.5 rounded-full font-semibold transition-all"
          style={pacer.action === action
            ? { background: T.violet, color: "#fff" }
            : { background: "rgba(74,40,120,0.12)", color: T.violet, border: `1px solid ${T.violet}50` }}>
          {action}
        </button>
      ))}
    </div>
    <input type="text" value={pacer.runningTo || ""} onChange={e => onChange({ ...pacer, runningTo: e.target.value })}
      placeholder="Running to / from station (e.g. Mingus Mountain)" className="w-full rounded-md px-2 py-1 text-xs focus:outline-none font-sans"
      style={{ background: "rgba(235,215,170,0.9)", border: `1px solid ${T.cardBorder}`, color: T.textSecondary }} />
  </div>
);

// Default empty plan
const EMPTY_PLAN = {
  targetArrival: "",
  targetDeparture: "",
  timeNotes: "",
  dropBagItems: [],
  crew: [],
  pacers: [],
  sleepDuration: "",
  sleepNotes: "",
  // Leaving-with kit
  leavingHydration: "",   // e.g. "2× 500ml soft flasks + 1L bladder"
  leavingElectrolytes: "",// e.g. "2× SaltStick caps, 1× Tailwind sachet"
  leavingCalories: "",    // e.g. "4× gels, 2× bars, 1 bag chews"
  leavingOther: [],       // misc items (packing list)
  generalNotes: "",
};

// ─── Aid station detail + planning panel ────────────────────────
const AidStationDetail = ({ station, stationKey, plans, onPlanChange, isStart, isFinish }) => {
  const [planOpen, setPlanOpen] = useState(false);
  const plan = plans[stationKey] || EMPTY_PLAN;

  const update = patch => {
    const updated = { ...plan, ...patch };
    onPlanChange(stationKey, updated);
  };

  const hasPlanning = plan.targetArrival || plan.targetDeparture || plan.dropBagItems.length ||
    plan.crew.length || plan.pacers.length || plan.sleepDuration || plan.sleepNotes ||
    plan.leavingHydration || plan.leavingElectrolytes || plan.leavingCalories ||
    (plan.leavingOther||[]).length || plan.generalNotes;

  // What sections to show
  const showArrival     = !isStart;
  const showDeparture   = !isFinish;
  const showDropBag     = station.dropBag && !isFinish;
  const showCrew        = station.crew;                        // crew at finish = who's meeting you ✓
  const showPacers      = station.pacer && !isStart && !isFinish;
  const showSleep       = !!station.sleep && !isStart && !isFinish;
  const showLeavingWith = !isFinish;                           // no point packing out at the finish

  return (
    <div style={{ background: "#c8ae78", borderColor: T.accent + "60", borderWidth: 1, borderTopWidth: 0 }}
      className="rounded-b-lg overflow-hidden mb-1">
      <div className="px-4 py-4 space-y-3">

        {/* ── Race info (existing) ── */}
        {station.gearCheck && (
          <div className="flex items-start gap-2 rounded-lg px-3 py-2.5"
            style={{ background: T.redDark, border: `1px solid ${T.red}60` }}>
            <span style={{ color: T.red }} className="mt-0.5 shrink-0"><Icon name="alert" size={14} /></span>
            <p className="text-sm" style={{ color: T.textPrimary }}>
              <span className="font-bold">Gear Check: </span>{station.gearCheck} — Required gear will be verified before you leave this station.
            </p>
          </div>
        )}

        {station.pacerNote && (
          <div className="flex items-start gap-2 rounded-lg px-3 py-2.5"
            style={{ background: T.orangeDark, border: `1px solid ${T.orange}60` }}>
            <span style={{ color: T.orange }} className="mt-0.5 shrink-0"><Icon name="alert" size={14} /></span>
            <p className="text-sm font-bold" style={{ color: T.textPrimary }}>{station.pacerNote} at this aid station</p>
          </div>
        )}

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {[
            { label: "Crew Access",  val: station.crew,     icon: "crew",  col: T.sky },
            { label: "Pacer Access", val: station.pacer,    icon: "pacer", col: T.violet },
            { label: "Drop Bag",     val: station.dropBag,  icon: "bag",   col: T.sandy },
            { label: "Medic",        val: station.medic,    icon: "medic", col: T.red },
          ].map(({ label, val, icon, col }) => (
            <div key={label} className="flex items-center gap-2 rounded-lg px-2.5 py-2"
              style={{ background: val ? "rgba(200,175,120,0.7)" : "rgba(185,160,105,0.35)", border: `1px solid ${val ? T.cardBorder : "rgba(140,95,45,0.2)"}` }}>
              <span style={{ color: val ? col : T.textMuted }}><Icon name={icon} size={13} /></span>
              <span className="text-xs font-semibold" style={{ color: val ? T.textPrimary : T.textMuted, textDecoration: val ? "none" : "line-through" }}>{label}</span>
              <span className="ml-auto shrink-0" style={{ color: val ? T.green : T.textMuted }}>
                <Icon name={val ? "check" : "xmark"} size={11} />
              </span>
            </div>
          ))}
        </div>

        {(station.sleep || station.shower) && (
          <div className="flex flex-wrap gap-2">
            {station.sleep && (
              <div className="flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-sm font-semibold"
                style={{ background: station.sleep === "Indoor" ? T.greenDark : T.orangeDark, color: station.sleep === "Indoor" ? T.green : T.orange, border: `1px solid ${station.sleep === "Indoor" ? T.green : T.orange}50` }}>
                <Icon name="sleep" size={13} />{station.sleep} Sleep Station
              </div>
            )}
            {station.shower && (
              <div className="flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-sm font-semibold"
                style={{ background: T.tealDark, color: T.teal, border: `1px solid ${T.teal}50` }}>
                <Icon name="shower" size={13} />Showers Available
              </div>
            )}
          </div>
        )}

        {station.food && (
          <div className="rounded-lg px-3 py-3" style={{ background: "rgba(200,175,120,0.7)", border: `1px solid ${T.accent}40` }}>
            <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider mb-2" style={{ color: T.accentLight }}>
              <Icon name="food" size={12} /><span>Food</span>
            </div>
            <p className="text-sm leading-relaxed" style={{ color: T.textPrimary }}>{station.food}</p>
            <p className="text-xs mt-2 italic" style={{ color: T.textMuted }}>
              + traditional offerings: PB&J, pretzels, chips, bananas, Coke, Tailwind, broth, ramen, oatmeal
            </p>
          </div>
        )}

        {/* ── My Plan toggle ── */}
        <div style={{ borderTop: `1px solid ${T.cardBorder}` }} className="pt-3">
          <button onClick={() => setPlanOpen(o => !o)}
            className="w-full flex items-center justify-between rounded-lg px-3 py-2.5 font-sans transition-all"
            style={{
              background: planOpen ? "rgba(176,58,16,0.12)" : "rgba(176,58,16,0.07)",
              border: `1px solid ${T.accent}50`,
            }}>
            <div className="flex items-center gap-2">
              <span style={{ color: T.accent }} className="text-base">✏</span>
              <span className="text-sm font-bold" style={{ color: T.accent }}>My Plan</span>
              {hasPlanning && !planOpen && (
                <span className="text-xs px-1.5 py-0.5 rounded-full font-semibold"
                  style={{ background: T.accent, color: "#f5efe0" }}>saved</span>
              )}
            </div>
            <span style={{ color: T.accent, transform: planOpen ? "rotate(90deg)" : "none", transition: "transform 0.2s" }}>
              <Icon name="chevron" size={13} />
            </span>
          </button>

          {planOpen && (
            <div className="mt-3 space-y-5 font-sans">

              {/* ── Target Time ── */}
              <div className="rounded-lg p-3 space-y-3"
                style={{ background: "rgba(195,170,115,0.4)", border: `1px solid ${T.cardBorder}` }}>
                <PlanLabel>🕐 Target Time</PlanLabel>

                {isStart ? (
                  /* Start: departure only, locked to race start */
                  <div>
                    <div className="text-xs mb-1" style={{ color: T.textSecondary }}>Race start time</div>
                    <div className="rounded-lg px-2.5 py-2 text-sm font-bold font-sans"
                      style={{ background: "rgba(235,215,170,0.5)", border: `1px solid ${T.cardBorder}`, color: T.green }}>
                      Mon May 4 · 5:00 AM — Mass start
                    </div>
                    <div className="text-xs mt-2 mb-1" style={{ color: T.textSecondary }}>Pre-race notes</div>
                    <PlanInput value={plan.timeNotes} onChange={v => update({ timeNotes: v })}
                      placeholder="e.g. Arrive by 4:00 AM for gear check, pick up SPOT tracker" />
                  </div>
                ) : isFinish ? (
                  /* Finish: arrival only */
                  <div>
                    <div className="text-xs mb-1" style={{ color: T.textSecondary }}>Goal finish time</div>
                    <PlanInput value={plan.targetArrival} onChange={v => update({ targetArrival: v })}
                      placeholder="e.g. Fri 6:00 PM (cutoff Sat 10:00 AM)" />
                    <div className="text-xs mt-2 mb-1" style={{ color: T.textSecondary }}>Time notes</div>
                    <PlanInput value={plan.timeNotes} onChange={v => update({ timeNotes: v })}
                      placeholder="e.g. Aiming for sub-100 hrs, leave buffer from Trinity Heights" />
                  </div>
                ) : (
                  /* Normal station: arrival + departure + notes */
                  <>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <div className="text-xs mb-1" style={{ color: T.textSecondary }}>Target arrival</div>
                        <PlanInput value={plan.targetArrival} onChange={v => update({ targetArrival: v })}
                          placeholder="e.g. Wed 10:30 AM" />
                      </div>
                      <div>
                        <div className="text-xs mb-1" style={{ color: T.textSecondary }}>Target departure</div>
                        <PlanInput value={plan.targetDeparture} onChange={v => update({ targetDeparture: v })}
                          placeholder="e.g. Wed 11:00 AM" />
                      </div>
                    </div>
                    <div>
                      <div className="text-xs mb-1" style={{ color: T.textSecondary }}>Time notes / buffer</div>
                      <PlanInput value={plan.timeNotes} onChange={v => update({ timeNotes: v })}
                        placeholder="e.g. Allow 30 min, cutoff is Wed 1:00 PM" />
                    </div>
                  </>
                )}
              </div>

              {/* ── Drop Bag ── */}
              {showDropBag && (
                <div className="rounded-lg p-3 space-y-2"
                  style={{ background: "rgba(195,170,115,0.4)", border: `1px solid ${T.cardBorder}` }}>
                  <PlanLabel color={T.sandy}>🎒 Drop Bag Contents</PlanLabel>
                  <PackingList
                    items={plan.dropBagItems}
                    onChange={v => update({ dropBagItems: v })}
                  />
                </div>
              )}

              {/* ── Crew ── */}
              {showCrew && (
                <div className="rounded-lg p-3 space-y-2"
                  style={{ background: "rgba(195,170,115,0.4)", border: `1px solid ${T.cardBorder}` }}>
                  <PlanLabel color={T.sky}>👥 {isFinish ? "Crew / People Meeting You" : "Crew"}</PlanLabel>
                  <div className="space-y-2">
                    {plan.crew.map((person, i) => (
                      <CrewRow key={i} person={person}
                        onChange={p => { const c=[...plan.crew]; c[i]=p; update({ crew: c }); }}
                        onRemove={() => update({ crew: plan.crew.filter((_,j)=>j!==i) })} />
                    ))}
                  </div>
                  <button
                    onClick={() => update({ crew: [...plan.crew, { name: "", role: "Both", vehicle: "" }] })}
                    className="text-xs font-bold px-2.5 py-1 rounded-lg"
                    style={{ background: T.sky + "20", border: `1px dashed ${T.sky}60`, color: T.sky }}>
                    + Add crew member
                  </button>
                </div>
              )}

              {/* ── Pacers ── */}
              {showPacers && (
                <div className="rounded-lg p-3 space-y-2"
                  style={{ background: "rgba(195,170,115,0.4)", border: `1px solid ${T.cardBorder}` }}>
                  <PlanLabel color={T.violet}>🏃 Pacers</PlanLabel>
                  <div className="space-y-2">
                    {plan.pacers.map((pacer, i) => (
                      <PacerRow key={i} pacer={pacer}
                        onChange={p => { const ps=[...plan.pacers]; ps[i]=p; update({ pacers: ps }); }}
                        onRemove={() => update({ pacers: plan.pacers.filter((_,j)=>j!==i) })} />
                    ))}
                  </div>
                  <button
                    onClick={() => update({ pacers: [...plan.pacers, { name: "", action: "Joining here", runningTo: "" }] })}
                    className="text-xs font-bold px-2.5 py-1 rounded-lg"
                    style={{ background: T.violet + "20", border: `1px dashed ${T.violet}60`, color: T.violet }}>
                    + Add pacer
                  </button>
                </div>
              )}

              {/* ── Sleep ── */}
              {showSleep && (
                <div className="rounded-lg p-3 space-y-3"
                  style={{ background: "rgba(195,170,115,0.4)", border: `1px solid ${T.cardBorder}` }}>
                  <PlanLabel color={T.green}>😴 Sleep Strategy</PlanLabel>
                  <div>
                    <div className="text-xs mb-1" style={{ color: T.textSecondary }}>Planned sleep duration</div>
                    <PlanInput value={plan.sleepDuration} onChange={v => update({ sleepDuration: v })}
                      placeholder="e.g. 20 min nap, or skip" />
                  </div>
                  <div>
                    <div className="text-xs mb-1" style={{ color: T.textSecondary }}>Sleep notes / routine</div>
                    <PlanInput value={plan.sleepNotes} onChange={v => update({ sleepNotes: v })}
                      placeholder="e.g. Ask for wake-up call, bring ear plugs, lay flat before continuing" multiline rows={2} />
                  </div>
                </div>
              )}

              {/* ── Leaving With ── */}
              {showLeavingWith && (
              <div className="rounded-lg p-3 space-y-3"
                style={{ background: "rgba(195,170,115,0.4)", border: `1px solid ${T.cardBorder}` }}>
                <PlanLabel color={T.teal}>🎽 Leaving With</PlanLabel>
                <p className="text-xs italic -mt-1" style={{ color: T.textMuted }}>
                  {isStart ? "What you're carrying from the start line." : "Plan what you'll carry out of this station to the next."}
                </p>

                {/* Hydration */}
                <div className="rounded-lg p-2.5 space-y-1.5"
                  style={{ background: "rgba(26,96,96,0.10)", border: `1px solid ${T.teal}40` }}>
                  <div className="flex items-center gap-1.5 text-xs font-bold" style={{ color: T.teal }}>
                    💧 Hydration
                  </div>
                  <PlanInput
                    value={plan.leavingHydration}
                    onChange={v => update({ leavingHydration: v })}
                    placeholder={`e.g. 2× 500 ml flasks + 1 L bladder (total 2 L)`}
                  />
                </div>

                {/* Electrolytes */}
                <div className="rounded-lg p-2.5 space-y-1.5"
                  style={{ background: "rgba(122,80,16,0.10)", border: `1px solid ${T.sandy}40` }}>
                  <div className="flex items-center gap-1.5 text-xs font-bold" style={{ color: T.sandy }}>
                    🧂 Electrolytes
                  </div>
                  <PlanInput
                    value={plan.leavingElectrolytes}
                    onChange={v => update({ leavingElectrolytes: v })}
                    placeholder="e.g. 4× SaltStick caps, 1× Tailwind sachet, 1× LMNT stick"
                  />
                </div>

                {/* Calories */}
                <div className="rounded-lg p-2.5 space-y-1.5"
                  style={{ background: "rgba(154,26,8,0.09)", border: `1px solid ${T.red}35` }}>
                  <div className="flex items-center gap-1.5 text-xs font-bold" style={{ color: T.red }}>
                    🔥 Calories
                  </div>
                  <PlanInput
                    value={plan.leavingCalories}
                    onChange={v => update({ leavingCalories: v })}
                    placeholder="e.g. 4× gels, 2× bars, 1 bag chews (~800 kcal)"
                  />
                </div>

                {/* Other gear */}
                <div>
                  <div className="text-xs font-bold mb-1.5" style={{ color: T.textSecondary }}>
                    Other items
                  </div>
                  <PackingList
                    items={plan.leavingOther || []}
                    onChange={v => update({ leavingOther: v })}
                  />
                </div>
              </div>
              )}{/* end showLeavingWith */}

              {/* ── General Notes ── */}
              <div className="rounded-lg p-3"
                style={{ background: "rgba(195,170,115,0.4)", border: `1px solid ${T.cardBorder}` }}>
                <PlanLabel>📝 Notes</PlanLabel>
                <PlanInput value={plan.generalNotes} onChange={v => update({ generalNotes: v })}
                  placeholder="Any other notes for this station — gear swaps, medical checks, food priorities, mental cues…"
                  multiline rows={3} />
              </div>

            </div>
          )}
        </div>

      </div>
    </div>
  );
};

// ─── Aid station row ─────────────────────────────────────────────
const AidStationRow = ({ station, idx, isOpen, onClick, plans, onPlanChange }) => {
  const isStart  = idx === 0;
  const isFinish = idx === AID_STATIONS.length - 1;
  const progress = (station.mile / 252.9) * 100;
  const stationKey = `station:${station.mile}:${station.name.replace(/\s+/g,"-")}`;
  const planForRow = plans?.[stationKey] || null;
  const hasPlan = plans && plans[stationKey] && (
    plans[stationKey].targetArrival || plans[stationKey].targetDeparture ||
    (plans[stationKey].dropBagItems||[]).length || (plans[stationKey].crew||[]).length ||
    (plans[stationKey].pacers||[]).length || plans[stationKey].sleepDuration ||
    plans[stationKey].leavingHydration || plans[stationKey].leavingElectrolytes ||
    plans[stationKey].leavingCalories || (plans[stationKey].leavingOther||[]).length ||
    plans[stationKey].sleepNotes || plans[stationKey].generalNotes
  );

  return (
    <div className="mb-0.5">
      <button onClick={onClick} className="w-full text-left relative overflow-hidden transition-all duration-150 font-sans"
        style={{
          background: isOpen ? "rgba(176,58,16,0.12)" : T.cardBg,
          border: `1px solid ${isOpen ? T.accent + "70" : T.cardBorder}`,
          borderBottomWidth: isOpen ? 0 : 1,
          borderRadius: isOpen ? "8px 8px 0 0" : 8,
        }}>
        <div className="absolute bottom-0 left-0 h-0.5 rounded-full"
          style={{ width: `${progress}%`, background: `linear-gradient(90deg, ${T.accentMuted}, ${T.accentLight})` }} />

        <div className="px-3 py-2.5 flex items-center gap-3">
          {/* Mile marker */}
          <div className="text-xs font-mono font-bold w-12 text-right shrink-0"
            style={{ color: isStart ? T.green : isFinish ? T.accentLight : T.textSecondary }}>
            {isStart ? "START" : isFinish ? "FINISH" : station.mile}
          </div>

          {/* Middle: name + personal target times */}
          <div className="flex-1 min-w-0">
            <div className="text-sm font-semibold truncate"
              style={{ color: isFinish ? T.accentLight : isStart ? T.green : T.textPrimary }}>
              {station.name}
            </div>
            <div className="mt-0.5 overflow-hidden"
              style={{ fontFamily: "ui-monospace, monospace", fontSize: "11px", lineHeight: "1.4" }}>
              {isStart ? (
                <span style={{ color: T.green }}>5:00 AM start</span>
              ) : (planForRow?.targetArrival || planForRow?.targetDeparture) ? (
                <span className="flex items-baseline gap-2">
                  {planForRow?.targetArrival && (
                    <span style={{ color: T.sky }}>
                      <span style={{ color: T.textMuted }}>{isFinish ? "goal " : "arr "}</span>{planForRow.targetArrival}
                    </span>
                  )}
                  {planForRow?.targetDeparture && !isFinish && (
                    <span style={{ color: T.accentLight }}>
                      <span style={{ color: T.textMuted }}>dep </span>{planForRow.targetDeparture}
                    </span>
                  )}
                </span>
              ) : (
                <span style={{ color: T.textMuted, fontStyle: "italic" }}>no target set</span>
              )}
            </div>
          </div>

          {/* Right column: icons top row, cutoff bottom row — share same right edge */}
          <div className="shrink-0 flex flex-col items-end gap-0.5">
            <div className="flex gap-1.5 items-center">
              {hasPlan && (
                <span className="text-xs px-1 py-0.5 rounded font-bold"
                  style={{ background: T.accent + "20", color: T.accent, border: `1px solid ${T.accent}40` }}>
                  ✏
                </span>
              )}
              {station.crew    && <span style={{ color: T.sky }}><Icon name="crew"   size={12} /></span>}
              {station.pacer   && <span style={{ color: T.violet }}><Icon name="pacer" size={12} /></span>}
              {station.dropBag && <span style={{ color: T.sandy }}><Icon name="bag"   size={12} /></span>}
              {station.sleep   && <span style={{ color: station.sleep === "Indoor" ? T.green : T.orange }}><Icon name="sleep" size={12} /></span>}
              {station.shower  && <span style={{ color: T.teal }}><Icon name="shower" size={12} /></span>}
              {station.medic   && <span style={{ color: T.red }}><Icon name="medic"  size={12} /></span>}
            </div>
            <div style={{ fontFamily: "ui-monospace, monospace", fontSize: "11px", lineHeight: "1.4" }}>
              {station.cutoff
                ? <span style={{ color: T.textSecondary }}>
                    <span style={{ color: T.textMuted }}>cutoff </span>{station.cutoff}
                  </span>
                : <span style={{ color: T.textMuted, fontStyle: "italic" }}>no cutoff</span>
              }
            </div>
          </div>

          {/* Chevron */}
          <span className="shrink-0 transition-transform duration-200"
            style={{ color: isOpen ? T.accentLight : T.textMuted, transform: isOpen ? "rotate(90deg)" : "none" }}>
            <Icon name="chevron" size={14} />
          </span>
        </div>
      </button>
      {isOpen && (
        <AidStationDetail
          station={station}
          stationKey={stationKey}
          plans={plans}
          onPlanChange={onPlanChange}
          isStart={isStart}
          isFinish={isFinish}
        />
      )}
    </div>
  );
};

// ─── Shared card wrapper ─────────────────────────────────────────
const Card = ({ children, className = "" }) => (
  <div className={`rounded-xl ${className}`}
    style={{ background: T.cardBg, border: `1px solid ${T.cardBorder}` }}>
    {children}
  </div>
);

const SectionLabel = ({ children }) => (
  <div className="text-xs font-bold tracking-widest uppercase mb-3 font-sans" style={{ color: T.accentLight }}>{children}</div>
);

// ─── Root ────────────────────────────────────────────────────────
export default function Cocodona250() {
  const [activeTab,   setActiveTab]   = useState("Aid Stations");
  const [openIdx,     setOpenIdx]     = useState(null);
  const [filter,      setFilter]      = useState("all");
  const [search,      setSearch]      = useState("");
  const [mounted,     setMounted]     = useState(false);
  const [hoveredMile, setHoveredMile] = useState(null);
  const [plans,       setPlans]       = useState({});
  const [saveStatus,  setSaveStatus]  = useState("idle"); // "idle" | "saving" | "saved" | "error"

  // Load plans from cross-device storage on mount
  useEffect(() => {
    setMounted(true);
    const load = async () => {
      try {
        const result = await window.storage.get("cocodona250:plans");
        if (result?.value) setPlans(JSON.parse(result.value));
      } catch (_) {
        // No saved plans yet — start fresh
      }
    };
    load();
  }, []);

  // Debounced save whenever plans change
  useEffect(() => {
    if (!mounted || Object.keys(plans).length === 0) return;
    setSaveStatus("saving");
    const t = setTimeout(async () => {
      try {
        await window.storage.set("cocodona250:plans", JSON.stringify(plans));
        setSaveStatus("saved");
        setTimeout(() => setSaveStatus("idle"), 2000);
      } catch (_) {
        setSaveStatus("error");
      }
    }, 800);
    return () => clearTimeout(t);
  }, [plans, mounted]);

  const handlePlanChange = (key, planData) => {
    setPlans(prev => ({ ...prev, [key]: planData }));
  };

  const filteredStations = AID_STATIONS.filter(s => {
    if (search && !s.name.toLowerCase().includes(search.toLowerCase())) return false;
    if (filter === "crew")  return s.crew;
    if (filter === "pacer") return s.pacer;
    if (filter === "drop")  return s.dropBag;
    if (filter === "sleep") return s.sleep;
    if (filter === "medic") return s.medic;
    return true;
  });

  return (
    <div className="min-h-screen" style={{ background: T.bgPage, fontFamily: "'Georgia','Times New Roman',serif", color: T.textPrimary }}>

      {/* Topo pattern layer */}
      <div className="fixed inset-0 pointer-events-none z-0" style={{ backgroundImage: TOPO_PATTERN, backgroundSize: "400px", opacity: 1 }} />
      {/* Grain layer */}
      <div className="fixed inset-0 pointer-events-none z-0" style={{ backgroundImage: GRAIN, backgroundSize: "200px", opacity: 0.04 }} />

      <div className="relative z-10 max-w-3xl mx-auto px-4 py-6">

        {/* ── Header ─────────────────────────────────────── */}
        <div className={`mb-8 transition-all duration-700 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          <div className="flex items-start justify-between flex-wrap gap-4">
            <div>
              <div className="text-xs font-bold tracking-[0.3em] uppercase mb-1 font-sans" style={{ color: T.accentLight }}>
                Aravaipa Running · Arizona · May 2026
              </div>
              <h1 className="text-5xl font-bold" style={{ fontFamily: "'Georgia',serif", letterSpacing: "-0.02em", lineHeight: 1 }}>
                <span style={{ color: T.accentLight }}>Cocodona</span>{" "}
                <span style={{ color: T.textPrimary }}>250</span>
              </h1>
              <p className="text-sm mt-2 font-sans" style={{ color: T.textSecondary }}>
                Black Canyon City → Flagstaff ·{" "}
                <span style={{ color: T.textPrimary }} className="font-semibold">252.9 miles</span> ·{" "}
                <span style={{ color: T.textPrimary }} className="font-semibold">40,667' gain</span>
              </p>
            </div>
            <div className="flex gap-3">
              {[{ v: "125h", l: "Cutoff" }, { v: "27", l: "Aid Stations" }].map(({ v, l }) => (
                <div key={l} className="text-center rounded-xl px-4 py-3" style={{ background: T.cardBg, border: `1px solid ${T.cardBorder}` }}>
                  <div className="text-2xl font-bold" style={{ color: T.accentLight, fontFamily: "Georgia,serif" }}>{v}</div>
                  <div className="text-xs uppercase tracking-wider mt-0.5 font-sans" style={{ color: T.textSecondary }}>{l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Progress bar */}
          <div className="mt-5 flex items-center gap-3 font-sans">
            <span className="text-xs font-bold" style={{ color: T.green }}>START</span>
            <div className="flex-1 h-2 rounded-full overflow-hidden" style={{ background: "rgba(160,120,60,0.35)", border: `1px solid ${T.cardBorder}` }}>
              <div className="h-full rounded-full" style={{ background: `linear-gradient(90deg, ${T.green}, ${T.accentLight}, ${T.accent})`, width: "100%" }} />
            </div>
            <span className="text-xs font-bold" style={{ color: T.accentLight }}>FINISH</span>
          </div>
          <div className="flex justify-between text-xs font-sans mt-1 px-8" style={{ color: T.textSecondary }}>
            <span>Mi 0 · Deep Canyon Ranch</span>
            <span>Mi 252.9 · Heritage Square</span>
          </div>
        </div>

        {/* ── Tabs ───────────────────────────────────────── */}
        <div className={`flex gap-1 mb-6 p-1 rounded-xl overflow-x-auto font-sans transition-all duration-700 delay-100 ${mounted ? "opacity-100" : "opacity-0"}`}
          style={{ background: "rgba(180, 150, 90, 0.5)", border: `1px solid ${T.cardBorder}` }}>
          {TABS.map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              className="px-3 py-1.5 rounded-lg text-xs font-bold tracking-wide whitespace-nowrap transition-all duration-150"
              style={activeTab === tab
                ? { background: T.accent, color: "#f5efe0" }
                : { color: T.textPrimary, background: "transparent" }}>
              {tab}
            </button>
          ))}
        </div>

        {/* ══ MAP ═══════════════════════════════════════════ */}
        {activeTab === "Map" && (
          <div>
            <div className="mb-4">
              <p className="text-sm font-sans" style={{ color: T.textSecondary }}>
                Course route from real CalTopo GPS data · 252.9 miles · Black Canyon City → Flagstaff
              </p>
            </div>
            <CourseMap
              hoveredMile={hoveredMile}
              onHoverMile={setHoveredMile}
              onSelectStation={idx => {
                setActiveTab("Aid Stations");
                setOpenIdx(idx);
              }} />
            <ElevationProfile
              hoveredMile={hoveredMile}
              onHoverMile={setHoveredMile}
              onSelectStation={idx => {
                setActiveTab("Aid Stations");
                setOpenIdx(idx);
              }} />
          </div>
        )}

        {/* ══ AID STATIONS ════════════════════════════════ */}
        {activeTab === "Aid Stations" && (
          <div>
            {/* Filter bar */}
            <div className="flex flex-wrap gap-1.5 mb-3 font-sans">
              <input type="text" placeholder="Search aid stations…" value={search}
                onChange={e => { setSearch(e.target.value); setOpenIdx(null); }}
                className="flex-1 min-w-0 px-2.5 py-1.5 rounded-lg text-sm focus:outline-none"
                style={{ background: "rgba(210,185,130,0.8)", border: `1px solid ${T.cardBorder}`, color: T.textPrimary, "::placeholder": { color: T.textMuted } }} />
              {[
                { k: "all",   l: "All",       bg: "#5a3020" },
                { k: "crew",  l: "Crew",      bg: T.skyDark },
                { k: "pacer", l: "Pacer",     bg: T.violetDark },
                { k: "drop",  l: "Drop Bags", bg: T.sandyDark },
                { k: "sleep", l: "Sleep",     bg: T.greenDark },
                { k: "medic", l: "Medic",     bg: T.redDark },
              ].map(({ k, l, bg }) => (
                <button key={k} onClick={() => { setFilter(k); setOpenIdx(null); }}
                  className="px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all"
                  style={filter === k
                    ? { background: T.accent, color: "#f5efe0", border: "1px solid transparent" }
                    : { background: "rgba(200,175,120,0.7)", color: T.textPrimary, border: `1px solid ${T.cardBorder}` }}>
                  {l}
                </button>
              ))}
            </div>

            {/* Legend */}
            <div className="flex flex-wrap gap-x-4 gap-y-1 mb-4 text-xs font-sans">
              {AMENITY_LEGEND.map(({ icon, color, label }) => (
                <span key={label} className="flex items-center gap-1">
                  <span style={{ color }}><Icon name={icon} size={11} /></span>
                  <span style={{ color: T.textSecondary }}>{label}</span>
                </span>
              ))}
            </div>

            {/* List */}
            <div>
              {filteredStations.map(station => {
                const realIdx = AID_STATIONS.indexOf(station);
                return (
                  <AidStationRow key={`${station.name}-${station.mile}`}
                    station={station} idx={realIdx}
                    isOpen={openIdx === realIdx}
                    onClick={() => setOpenIdx(prev => prev === realIdx ? null : realIdx)}
                    plans={plans}
                    onPlanChange={handlePlanChange} />
                );
              })}
            </div>

            {/* Save status */}
            {saveStatus !== "idle" && (
              <div className="mt-3 text-xs text-right font-sans transition-all"
                style={{ color: saveStatus === "saved" ? T.green : saveStatus === "error" ? T.red : T.textMuted }}>
                {saveStatus === "saving" && "⏳ Saving…"}
                {saveStatus === "saved"  && "✓ Plans saved across devices"}
                {saveStatus === "error"  && "⚠ Save failed — check connection"}
              </div>
            )}
          </div>
        )}

        {/* ══ SCHEDULE ════════════════════════════════════ */}
        {activeTab === "Schedule" && (
          <div className="max-w-2xl font-sans">
            <div className="mb-4 p-3 rounded-xl text-sm" style={{ background: "rgba(176,100,30,0.15)", border: `1px solid ${T.accentLight}60`, color: T.textPrimary }}>
              <strong style={{ color: T.accentLight }}>Note:</strong> In May, Arizona is on Pacific Time (same as California).
            </div>
            {SCHEDULE.map(({ day, events }) => (
              <div key={day} className="mb-6">
                <SectionLabel>{day}</SectionLabel>
                <div className="space-y-2">
                  {events.map((ev, i) => (
                    <div key={i} className="flex gap-3 rounded-lg px-3 py-2.5" style={{ background: T.cardBg, border: `1px solid ${T.cardBorder}` }}>
                      <span style={{ color: T.accent }} className="mt-0.5 shrink-0">›</span>
                      <span className="text-sm" style={{ color: T.textPrimary }}>{ev}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
            <div className="mt-2 pt-5" style={{ borderTop: `1px solid ${T.cardBorder}` }}>
              <div className="text-sm font-bold mb-3" style={{ color: T.textPrimary }}>Packet Pick-up</div>
              <Card className="p-4 mb-5 space-y-2">
                <p className="text-sm" style={{ color: T.textPrimary }}><strong style={{ color: T.accentLight }}>Sunday May 3:</strong> 1–5 PM, Deep Canyon Ranch — All distances</p>
                <p className="text-xs font-bold" style={{ color: T.red }}>⚠ No race morning packet pick-up for any distance.</p>
              </Card>
              <div className="text-sm font-bold mb-3" style={{ color: T.textPrimary }}>Runner Shuttles</div>
              <div className="space-y-2">
                {[
                  { l: "Phoenix → Start Line",   c: "$50", d: "Sun May 3 · Departs Phoenix Airport 11:00 AM" },
                  { l: "Flagstaff → Start Line", c: "$50", d: "Sun May 3 · Departs Flagstaff 2:30 PM · Leave car near finish" },
                ].map(({ l, c, d }) => (
                  <Card key={l} className="px-3 py-2.5">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold" style={{ color: T.textPrimary }}>{l}</span>
                      <span className="text-sm font-bold" style={{ color: T.accentLight }}>{c}</span>
                    </div>
                    <div className="text-xs mt-0.5" style={{ color: T.textSecondary }}>{d}</div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ══ REQUIRED GEAR ═══════════════════════════════ */}
        {activeTab === "Required Gear" && (
          <div className="max-w-2xl space-y-6 font-sans">
            <div className="rounded-xl p-4" style={{ background: T.redDark, border: `1px solid ${T.red}60` }}>
              <p className="text-sm font-bold mb-1" style={{ color: T.red }}>Gear checks are mandatory</p>
              <p className="text-sm" style={{ color: T.textPrimary }}>Runners AND pacers must carry required gear at all times. You will be checked at specific aid stations and refused entry without it.</p>
            </div>
            <div>
              <SectionLabel>Required Gear — All Times</SectionLabel>
              <div className="space-y-2">
                {REQUIRED_GEAR.map(({ item, desc }) => (
                  <div key={item} className="flex items-start gap-3 rounded-lg px-3 py-2.5" style={{ background: T.cardBg, border: `1px solid ${T.cardBorder}` }}>
                    <span style={{ color: T.green }} className="mt-0.5 shrink-0"><Icon name="check" size={14} /></span>
                    <div>
                      <div className="text-sm font-bold" style={{ color: T.textPrimary }}>{item}</div>
                      <div className="text-xs" style={{ color: T.textSecondary }}>{desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <SectionLabel>Cold Weather Gear — Required on Some Sections</SectionLabel>
              <div className="space-y-2">
                {COLD_WEATHER_GEAR.map(({ item, desc }) => (
                  <div key={item} className="flex items-start gap-3 rounded-lg px-3 py-2.5" style={{ background: T.cardBg, border: `1px solid ${T.cardBorder}` }}>
                    <span style={{ color: T.sky }} className="mt-0.5 shrink-0"><Icon name="gear" size={14} /></span>
                    <div>
                      <div className="text-sm font-bold" style={{ color: T.textPrimary }}>{item}</div>
                      <div className="text-xs" style={{ color: T.textSecondary }}>{desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-xl p-4" style={{ background: "rgba(176,100,30,0.15)", border: `1px solid ${T.accentLight}60` }}>
              <p className="text-sm font-bold mb-1" style={{ color: T.accentLight }}>⚠ Critical: The 4-Liter Water Section</p>
              <p className="text-sm" style={{ color: T.textPrimary }}>You MUST leave Cottonwood Creek (mi 7.4) with AT LEAST 4 liters. The next 25 miles is the hottest, hardest section — 10–13+ hours for most runners. Two water stations exist, each providing only 1 liter.</p>
            </div>
          </div>
        )}

        {/* ══ KEY RULES ════════════════════════════════════ */}
        {activeTab === "Key Rules" && (
          <div className="max-w-2xl space-y-3 font-sans">
            {[
              { t: "No Outside Aid",         c: "red",    b: "Runners may only receive aid within ¼-mile of aid stations. Pacers may NOT carry items for their runner. No parking along the course to support runners." },
              { t: "One Crew Vehicle",       c: "sandy",  b: "ONE crew vehicle per runner at aid stations. No vehicles over 25' and NO vehicles towing trailers." },
              { t: "Pacing Rules",           c: "violet", b: "Pacers must be 18+, human, on foot. Must sign waiver and get a pacer bib at the starting aid station. No pacers at Schnebly Hill or Wildcat Hill." },
              { t: "SPOT Trackers",          c: "sky",    b: "Do not alter, adjust, or turn off your SPOT Tracker. It must stay on your person for the entire race." },
              { t: "Dropping from the Race", c: "base",   b: "You may only drop at an aid station. Fill out a drop form and turn in your SPOT tracker. You can re-enter if you return before the cutoff or sweepers pass." },
              { t: "IVs = Automatic DQ",     c: "red",    b: "Any runner who receives an IV at any time during the race will be automatically disqualified, no exceptions." },
              { t: "Cutting the Course",     c: "red",    b: "Cutting or deviating from the course = disqualification. If you go off course, retrace to the last known marker." },
              { t: "GPS Device Required",    c: "green",  b: "All runners AND pacers must carry a GPS device with the course file loaded at all times. Smartphone in airplane mode is recommended as backup." },
              { t: "Leave No Trace",         c: "green",  b: "Littering on course will not be tolerated. Step 30' off trail for bathroom use, dig a 6\" hole, and pack out all TP in a ziplock." },
            ].map(({ t, c, b }) => {
              const cfg = {
                red:    { bg: T.redDark,    border: T.red + "60",    title: T.red },
                sandy:  { bg: T.sandyDark,  border: T.sandy + "60",  title: T.sandy },
                violet: { bg: T.violetDark, border: T.violet + "60", title: T.violet },
                sky:    { bg: T.skyDark,    border: T.sky + "60",    title: T.sky },
                base:   { bg: T.cardBgSolid,border: T.cardBorder,    title: T.accentLight },
                green:  { bg: T.greenDark,  border: T.green + "60",  title: T.green },
              }[c];
              return (
                <div key={t} className="rounded-xl px-4 py-3" style={{ background: cfg.bg, border: `1px solid ${cfg.border}` }}>
                  <div className="text-sm font-bold mb-1" style={{ color: cfg.title }}>{t}</div>
                  <p className="text-sm" style={{ color: T.textPrimary }}>{b}</p>
                </div>
              );
            })}
          </div>
        )}

        {/* ══ COURSE INFO ══════════════════════════════════ */}
        {activeTab === "Course Info" && (
          <div className="max-w-2xl space-y-6 font-sans">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[{ l:"Total Miles",v:"252.9"},{l:"Total Gain",v:"40,667'"},{l:"Total Loss",v:"35,674'"},{l:"Cutoff Time",v:"125 hrs"}].map(({ l, v }) => (
                <div key={l} className="rounded-xl p-3 text-center" style={{ background: T.cardBg, border: `1px solid ${T.cardBorder}` }}>
                  <div className="text-xl font-bold" style={{ color: T.accentLight, fontFamily: "Georgia,serif" }}>{v}</div>
                  <div className="text-xs uppercase tracking-wider mt-1" style={{ color: T.textSecondary }}>{l}</div>
                </div>
              ))}
            </div>

            <div>
              <SectionLabel>The Journey</SectionLabel>
              <Card className="p-4">
                <div className="text-sm space-y-3 leading-relaxed" style={{ color: T.textPrimary }}>
                  <p>Starting in the <strong style={{ color: T.accentLight }}>Sonoran Desert</strong> at Deep Canyon Ranch (Black Canyon City), the course winds through towering Saguaro cacti in extreme desert heat before climbing dramatically into the Bradshaw Mountains.</p>
                  <p>Through the historic mining town of <strong style={{ color: T.accentLight }}>Crown King</strong>, along ridgelines and remote single-track, into <strong style={{ color: T.accentLight }}>Prescott</strong> (Whiskey Row), past the iconic Watson Lake formations, and up over <strong style={{ color: T.accentLight }}>Mingus Mountain</strong>.</p>
                  <p>Into the copper mining ghost town of <strong style={{ color: T.accentLight }}>Jerome</strong>, down into the Verde Valley, through <strong style={{ color: T.accentLight }}>Sedona's</strong> famous red rock landscapes, up through Schnebly Hill, and into the cool Ponderosa Pine forests surrounding <strong style={{ color: T.accentLight }}>Flagstaff</strong>.</p>
                  <p>Finishing at <strong style={{ color: T.accent }}>Heritage Square in Flagstaff</strong> — cutoff Saturday May 9, 10:00 AM.</p>
                </div>
              </Card>
            </div>

            <div>
              <SectionLabel>Elevation Range</SectionLabel>
              <div className="space-y-2">
                {[
                  { l:"Low Desert Sections",               r:"2,000'–4,000'", n:"Extremely hot during day",       c: T.red },
                  { l:"Mid Elevation (Prescott area)",     r:"5,000'–6,000'", n:"Comfortable, variable",          c: T.sandy },
                  { l:"High Elevation (Mingus / Flagstaff)",r:"7,000'–9,000'", n:"Can be extremely cold at night", c: T.sky },
                ].map(({ l, r, n, c }) => (
                  <div key={l} className="flex items-center gap-3 rounded-lg px-3 py-2.5" style={{ background: T.cardBg, border: `1px solid ${T.cardBorder}` }}>
                    <div className="font-bold font-mono text-sm shrink-0" style={{ color: c }}>{r}</div>
                    <div>
                      <div className="text-sm font-semibold" style={{ color: T.textPrimary }}>{l}</div>
                      <div className="text-xs" style={{ color: T.textSecondary }}>{n}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <SectionLabel>Western States Qualifier</SectionLabel>
              <div className="rounded-xl p-4" style={{ background: T.greenDark, border: `1px solid ${T.green}50` }}>
                <p className="text-sm" style={{ color: T.textPrimary }}>Completing within the 125-hour cutoff earns an automatic qualifier for the <strong style={{ color: T.green }}>2027 Western States Endurance Run</strong>. No submission required — it's automatic.</p>
                <p className="mt-2 text-xs" style={{ color: T.textSecondary }}>ITRA and UTMB points also awarded automatically within 60 days of the race.</p>
              </div>
            </div>

            <div>
              <SectionLabel>Emergency Contact</SectionLabel>
              <div className="rounded-xl p-4 text-center" style={{ background: T.redDark, border: `1px solid ${T.red}60` }}>
                <div className="text-xl font-bold font-mono tracking-wide" style={{ color: T.red }}>(602) 830-4526</div>
                <div className="text-sm mt-1" style={{ color: T.textPrimary }}>TEXT ONLY — Race Command. Program into your phone before race day.</div>
                <div className="text-xs mt-1" style={{ color: T.textSecondary }}>Provide bib number, location, and description of the issue.</div>
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="mt-10 pt-4 text-center font-sans" style={{ borderTop: `1px solid ${T.cardBorder}` }}>
          <p className="text-sm" style={{ color: T.textSecondary }}>
            Cocodona 250 · May 4–9, 2026 · Organized by{" "}
            <span style={{ color: T.textPrimary, fontWeight: 600 }}>Aravaipa Running</span>
          </p>
        </div>
      </div>
    </div>
  );
}
