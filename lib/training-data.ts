export interface TrainingModule {
  id: string;
  title: string;
  category: "ground-school" | "flight-maneuvers" | "checkride-prep" | "weather" | "regulations";
  description: string;
  topics: string[];
  estimatedMinutes: number;
}

export const trainingModules: TrainingModule[] = [
  {
    id: "aerodynamics",
    title: "Principles of Aerodynamics",
    category: "ground-school",
    description: "Four forces of flight, airfoil theory, angle of attack, stalls, and load factors.",
    topics: ["Lift", "Drag", "Thrust", "Weight", "Bernoulli's Principle", "Angle of Attack", "Stall Speed", "Load Factor"],
    estimatedMinutes: 45,
  },
  {
    id: "weather-theory",
    title: "Aviation Weather Theory",
    category: "weather",
    description: "Atmospheric pressure, fronts, cloud types, turbulence, icing, and thunderstorms.",
    topics: ["Pressure Systems", "Frontal Systems", "Cloud Types", "Visibility", "Turbulence", "Icing", "Thunderstorms", "METARs", "TAFs"],
    estimatedMinutes: 60,
  },
  {
    id: "navigation",
    title: "Navigation & Flight Planning",
    category: "ground-school",
    description: "Pilotage, dead reckoning, VOR/GPS navigation, sectional charts, and weight & balance.",
    topics: ["Pilotage", "Dead Reckoning", "VOR Navigation", "GPS", "Sectional Charts", "Weight & Balance", "Fuel Planning"],
    estimatedMinutes: 55,
  },
  {
    id: "far-aim",
    title: "Federal Aviation Regulations",
    category: "regulations",
    description: "FAR Part 61, 91, airspace classifications, right-of-way rules, and pilot certificates.",
    topics: ["FAR Part 61", "FAR Part 91", "Airspace Classes", "Right-of-Way", "Minimum Altitudes", "VFR Minimums", "Medical Certificates"],
    estimatedMinutes: 50,
  },
  {
    id: "maneuvers-basic",
    title: "Basic Flight Maneuvers",
    category: "flight-maneuvers",
    description: "Straight and level flight, climbs, descents, turns, and slow flight.",
    topics: ["Straight & Level", "Climbs", "Descents", "Standard Rate Turns", "Steep Turns", "Slow Flight", "Power-Off Stalls", "Power-On Stalls"],
    estimatedMinutes: 40,
  },
  {
    id: "maneuvers-advanced",
    title: "Advanced Flight Maneuvers",
    category: "flight-maneuvers",
    description: "Ground reference maneuvers, emergency procedures, and cross-country techniques.",
    topics: ["Turns Around a Point", "S-Turns", "Rectangular Course", "Emergency Descent", "Engine Failure", "Simulated Instrument", "Diversion"],
    estimatedMinutes: 50,
  },
  {
    id: "checkride-oral",
    title: "Checkride Oral Exam Prep",
    category: "checkride-prep",
    description: "Common DPE questions covering airworthiness, weather decision-making, and aeronautical knowledge.",
    topics: ["ARROW Documents", "IMSAFE Checklist", "ADM/CRM", "Weather Minimums", "Lost Procedures", "Emergency Procedures", "Aeromedical Factors"],
    estimatedMinutes: 90,
  },
  {
    id: "checkride-practical",
    title: "Checkride Practical Test Prep",
    category: "checkride-prep",
    description: "ACS standards review, maneuver tolerances, and practical test scenarios.",
    topics: ["ACS Standards", "Tolerances", "Preflight", "Takeoff/Landing", "Performance Maneuvers", "Navigation", "Emergency Operations", "Postflight"],
    estimatedMinutes: 75,
  },
];

export function getModulesByCategory(category: TrainingModule["category"]) {
  return trainingModules.filter((m) => m.category === category);
}

export const categoryLabels: Record<TrainingModule["category"], string> = {
  "ground-school": "Ground School",
  "flight-maneuvers": "Flight Maneuvers",
  "checkride-prep": "Checkride Prep",
  weather: "Weather",
  regulations: "Regulations",
};
