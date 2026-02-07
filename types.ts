export interface DayPlan {
  day: number;
  location: string;
  title: string;
  description: string;
  activities: string[];
  hotel: string;
}

export interface FlightOption {
  airline: string;
  route: string;
  schedule: string;
  priceEconomy: number;
  pricePremiumEconomy: number;
  duration: string;
}

export interface CostBreakdown {
  flightsEco: number;
  flightsPremium: number;
  transportationLocal: number;
  hotels: number;
  visits: number;
  dailyExpenses: number;
  totalEco: number;
  totalPremium: number;
}

export interface TripData {
  itinerary: DayPlan[];
  flights: FlightOption[];
  transportationAdvice: string;
  costs: CostBreakdown;
  groundingLinks: { title: string; url: string }[];
}

export const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June', 
  'July', 'August', 'September', 'October', 'November', 'December'
];