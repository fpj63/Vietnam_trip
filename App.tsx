import React, { useState } from 'react';
import { Hero } from './components/Hero';
import { ItineraryList } from './components/ItineraryList';
import { FlightDetails } from './components/FlightDetails';
import { CostAnalysis } from './components/CostAnalysis';
import { generateVietnamTrip } from './services/geminiService';
import { TripData } from './types';
import { Link, ExternalLink } from 'lucide-react';

export default function App() {
  const [selectedMonth, setSelectedMonth] = useState<string>('April');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [tripData, setTripData] = useState<TripData | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await generateVietnamTrip(selectedMonth);
      setTripData(data);
    } catch (err) {
      setError("Failed to generate trip plan. Please try again.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen pb-12">
      <Hero 
        selectedMonth={selectedMonth}
        onMonthChange={setSelectedMonth}
        onGenerate={handleGenerate}
        isLoading={isLoading}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
        {error && (
            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded shadow-sm" role="alert">
                <p className="font-bold">Error</p>
                <p>{error}</p>
            </div>
        )}

        {tripData && (
          <div className="space-y-8 animate-fade-in-up">
            {/* Top Grid: Flights and Costs */}
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                 <FlightDetails 
                   flights={tripData.flights} 
                   transportAdvice={tripData.transportationAdvice} 
                 />
              </div>
              <div className="lg:col-span-1">
                 <CostAnalysis costs={tripData.costs} />
              </div>
            </div>

            {/* Itinerary Section */}
            <ItineraryList days={tripData.itinerary} />

            {/* Sources / Grounding */}
            {tripData.groundingLinks.length > 0 && (
                <div className="mt-12 border-t pt-6">
                    <h4 className="text-sm font-semibold text-gray-500 mb-3 flex items-center gap-2">
                        <Link className="w-4 h-4" />
                        Sources & Flight Data
                    </h4>
                    <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                        {tripData.groundingLinks.map((link, idx) => (
                            <li key={idx}>
                                <a 
                                    href={link.url} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="text-xs text-teal-600 hover:text-teal-800 hover:underline flex items-center gap-1 truncate"
                                >
                                    <ExternalLink className="w-3 h-3 flex-shrink-0" />
                                    {link.title}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
          </div>
        )}
        
        {!tripData && !isLoading && !error && (
             <div className="text-center mt-20 text-gray-400">
                <p className="text-lg">Select a month and click "Plan Trip" to see your customized itinerary.</p>
             </div>
        )}
      </div>
    </div>
  );
}