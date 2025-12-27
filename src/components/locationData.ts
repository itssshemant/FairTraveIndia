// Comprehensive location and pricing data for India
export interface LocationData {
  city: string;
  state: string;
  services: ServicePricing[];
}

export interface ServicePricing {
  name: string;
  category: 'Rides' | 'Food' | 'Tickets' | 'Accommodation';
  priceRange: string;
  avgPrice: number;
  icon: string;
  rating: number;
  reports: number;
  verified: boolean;
}

export const locationDatabase: LocationData[] = [
  {
    city: 'Delhi',
    state: 'Delhi',
    services: [
      { name: 'Auto Rickshaw (3km)', category: 'Rides', priceRange: '₹40-60', avgPrice: 50, icon: '🛺', rating: 4.7, reports: 1248, verified: true },
      { name: 'Metro Single Trip', category: 'Rides', priceRange: '₹20-60', avgPrice: 40, icon: '🚇', rating: 4.9, reports: 2341, verified: true },
      { name: 'Taxi (10km)', category: 'Rides', priceRange: '₹180-250', avgPrice: 215, icon: '🚕', rating: 4.5, reports: 856, verified: true },
      { name: 'Street Food Meal', category: 'Food', priceRange: '₹50-100', avgPrice: 75, icon: '🍽️', rating: 4.6, reports: 945, verified: true },
      { name: 'Mid-Range Restaurant', category: 'Food', priceRange: '₹300-600', avgPrice: 450, icon: '🍴', rating: 4.4, reports: 678, verified: true },
      { name: 'Red Fort Entry', category: 'Tickets', priceRange: '₹35-50', avgPrice: 35, icon: '🏛️', rating: 4.8, reports: 567, verified: true },
      { name: 'Budget Hotel (per night)', category: 'Accommodation', priceRange: '₹800-1500', avgPrice: 1200, icon: '🏨', rating: 4.3, reports: 423, verified: true },
    ]
  },
  {
    city: 'Mumbai',
    state: 'Maharashtra',
    services: [
      { name: 'Auto Rickshaw (3km)', category: 'Rides', priceRange: '₹45-70', avgPrice: 58, icon: '🛺', rating: 4.5, reports: 1567, verified: true },
      { name: 'Local Train', category: 'Rides', priceRange: '₹10-40', avgPrice: 25, icon: '🚆', rating: 4.7, reports: 3456, verified: true },
      { name: 'Taxi (10km)', category: 'Rides', priceRange: '₹200-300', avgPrice: 250, icon: '🚕', rating: 4.4, reports: 1234, verified: true },
      { name: 'Vada Pav', category: 'Food', priceRange: '₹20-40', avgPrice: 30, icon: '🥙', rating: 4.8, reports: 1890, verified: true },
      { name: 'Restaurant Meal', category: 'Food', priceRange: '₹400-800', avgPrice: 600, icon: '🍴', rating: 4.5, reports: 876, verified: true },
      { name: 'Gateway of India Entry', category: 'Tickets', priceRange: '₹0-0', avgPrice: 0, icon: '🏛️', rating: 4.9, reports: 789, verified: true },
      { name: 'Budget Hotel (per night)', category: 'Accommodation', priceRange: '₹1200-2000', avgPrice: 1600, icon: '🏨', rating: 4.2, reports: 543, verified: true },
    ]
  },
  {
    city: 'Bangalore',
    state: 'Karnataka',
    services: [
      { name: 'Auto Rickshaw (3km)', category: 'Rides', priceRange: '₹35-55', avgPrice: 45, icon: '🛺', rating: 4.6, reports: 1123, verified: true },
      { name: 'Metro Single Trip', category: 'Rides', priceRange: '₹15-50', avgPrice: 30, icon: '🚇', rating: 4.8, reports: 2234, verified: true },
      { name: 'Taxi (10km)', category: 'Rides', priceRange: '₹150-220', avgPrice: 185, icon: '🚕', rating: 4.5, reports: 987, verified: true },
      { name: 'Dosa Breakfast', category: 'Food', priceRange: '₹40-80', avgPrice: 60, icon: '🥞', rating: 4.7, reports: 1456, verified: true },
      { name: 'Restaurant Meal', category: 'Food', priceRange: '₹300-600', avgPrice: 450, icon: '🍴', rating: 4.5, reports: 765, verified: true },
      { name: 'Cubbon Park Entry', category: 'Tickets', priceRange: '₹0-0', avgPrice: 0, icon: '🌳', rating: 4.8, reports: 543, verified: true },
      { name: 'Budget Hotel (per night)', category: 'Accommodation', priceRange: '₹1000-1800', avgPrice: 1400, icon: '🏨', rating: 4.3, reports: 456, verified: true },
    ]
  },
  {
    city: 'Agra',
    state: 'Uttar Pradesh',
    services: [
      { name: 'Auto Rickshaw (3km)', category: 'Rides', priceRange: '₹40-65', avgPrice: 52, icon: '🛺', rating: 4.4, reports: 876, verified: true },
      { name: 'Taxi (10km)', category: 'Rides', priceRange: '₹170-240', avgPrice: 205, icon: '🚕', rating: 4.3, reports: 654, verified: true },
      { name: 'Street Food', category: 'Food', priceRange: '₹40-80', avgPrice: 60, icon: '🍽️', rating: 4.6, reports: 789, verified: true },
      { name: 'Restaurant Meal', category: 'Food', priceRange: '₹250-500', avgPrice: 375, icon: '🍴', rating: 4.4, reports: 543, verified: true },
      { name: 'Taj Mahal Entry (Foreigner)', category: 'Tickets', priceRange: '₹1100-1100', avgPrice: 1100, icon: '🕌', rating: 4.9, reports: 2345, verified: true },
      { name: 'Taj Mahal Entry (Indian)', category: 'Tickets', priceRange: '₹50-50', avgPrice: 50, icon: '🕌', rating: 4.9, reports: 3456, verified: true },
      { name: 'Budget Hotel (per night)', category: 'Accommodation', priceRange: '₹700-1200', avgPrice: 950, icon: '🏨', rating: 4.2, reports: 567, verified: true },
    ]
  },
  {
    city: 'Jaipur',
    state: 'Rajasthan',
    services: [
      { name: 'Auto Rickshaw (3km)', category: 'Rides', priceRange: '₹35-60', avgPrice: 48, icon: '🛺', rating: 4.5, reports: 967, verified: true },
      { name: 'Taxi (10km)', category: 'Rides', priceRange: '₹160-230', avgPrice: 195, icon: '🚕', rating: 4.4, reports: 765, verified: true },
      { name: 'Dal Baati Thali', category: 'Food', priceRange: '₹80-150', avgPrice: 115, icon: '🍛', rating: 4.7, reports: 876, verified: true },
      { name: 'Restaurant Meal', category: 'Food', priceRange: '₹280-550', avgPrice: 415, icon: '🍴', rating: 4.5, reports: 654, verified: true },
      { name: 'Amber Fort Entry', category: 'Tickets', priceRange: '₹200-500', avgPrice: 200, icon: '🏰', rating: 4.8, reports: 1234, verified: true },
      { name: 'Budget Hotel (per night)', category: 'Accommodation', priceRange: '₹800-1400', avgPrice: 1100, icon: '🏨', rating: 4.3, reports: 543, verified: true },
    ]
  },
  {
    city: 'Kolkata',
    state: 'West Bengal',
    services: [
      { name: 'Auto Rickshaw (3km)', category: 'Rides', priceRange: '₹30-50', avgPrice: 40, icon: '🛺', rating: 4.6, reports: 1098, verified: true },
      { name: 'Metro Single Trip', category: 'Rides', priceRange: '₹10-30', avgPrice: 20, icon: '🚇', rating: 4.8, reports: 1987, verified: true },
      { name: 'Taxi (10km)', category: 'Rides', priceRange: '₹140-200', avgPrice: 170, icon: '🚕', rating: 4.4, reports: 876, verified: true },
      { name: 'Street Food', category: 'Food', priceRange: '₹30-70', avgPrice: 50, icon: '🍽️', rating: 4.7, reports: 1234, verified: true },
      { name: 'Bengali Thali', category: 'Food', priceRange: '₹200-400', avgPrice: 300, icon: '🍛', rating: 4.6, reports: 765, verified: true },
      { name: 'Victoria Memorial Entry', category: 'Tickets', priceRange: '₹30-30', avgPrice: 30, icon: '🏛️', rating: 4.7, reports: 987, verified: true },
      { name: 'Budget Hotel (per night)', category: 'Accommodation', priceRange: '₹700-1300', avgPrice: 1000, icon: '🏨', rating: 4.2, reports: 456, verified: true },
    ]
  },
  {
    city: 'Goa',
    state: 'Goa',
    services: [
      { name: 'Auto Rickshaw (3km)', category: 'Rides', priceRange: '₹40-70', avgPrice: 55, icon: '🛺', rating: 4.3, reports: 765, verified: true },
      { name: 'Taxi (10km)', category: 'Rides', priceRange: '₹200-300', avgPrice: 250, icon: '🚕', rating: 4.4, reports: 654, verified: true },
      { name: 'Bike Rental (per day)', category: 'Rides', priceRange: '₹300-500', avgPrice: 400, icon: '🏍️', rating: 4.6, reports: 987, verified: true },
      { name: 'Beach Shack Meal', category: 'Food', priceRange: '₹250-500', avgPrice: 375, icon: '🍽️', rating: 4.5, reports: 1234, verified: true },
      { name: 'Fine Dining', category: 'Food', priceRange: '₹800-1500', avgPrice: 1150, icon: '🍴', rating: 4.6, reports: 543, verified: true },
      { name: 'Water Sports Package', category: 'Tickets', priceRange: '₹500-1200', avgPrice: 850, icon: '🏄', rating: 4.7, reports: 876, verified: true },
      { name: 'Beach Resort (per night)', category: 'Accommodation', priceRange: '₹2000-4000', avgPrice: 3000, icon: '🏖️', rating: 4.5, reports: 678, verified: true },
    ]
  },
  {
    city: 'Chennai',
    state: 'Tamil Nadu',
    services: [
      { name: 'Auto Rickshaw (3km)', category: 'Rides', priceRange: '₹35-55', avgPrice: 45, icon: '🛺', rating: 4.6, reports: 1123, verified: true },
      { name: 'Metro Single Trip', category: 'Rides', priceRange: '₹20-60', avgPrice: 40, icon: '🚇', rating: 4.8, reports: 1876, verified: true },
      { name: 'Taxi (10km)', category: 'Rides', priceRange: '₹150-220', avgPrice: 185, icon: '🚕', rating: 4.5, reports: 876, verified: true },
      { name: 'Idli/Dosa Breakfast', category: 'Food', priceRange: '₹30-70', avgPrice: 50, icon: '🥞', rating: 4.7, reports: 1456, verified: true },
      { name: 'Restaurant Meal', category: 'Food', priceRange: '₹300-600', avgPrice: 450, icon: '🍴', rating: 4.5, reports: 678, verified: true },
      { name: 'Marina Beach Entry', category: 'Tickets', priceRange: '₹0-0', avgPrice: 0, icon: '🏖️', rating: 4.6, reports: 765, verified: true },
      { name: 'Budget Hotel (per night)', category: 'Accommodation', priceRange: '₹900-1600', avgPrice: 1250, icon: '🏨', rating: 4.3, reports: 456, verified: true },
    ]
  },
  {
    city: 'Udaipur',
    state: 'Rajasthan',
    services: [
      { name: 'Auto Rickshaw (3km)', category: 'Rides', priceRange: '₹40-65', avgPrice: 52, icon: '🛺', rating: 4.4, reports: 543, verified: true },
      { name: 'Taxi (10km)', category: 'Rides', priceRange: '₹170-250', avgPrice: 210, icon: '🚕', rating: 4.3, reports: 456, verified: true },
      { name: 'Boat Ride (Pichola Lake)', category: 'Rides', priceRange: '₹200-400', avgPrice: 300, icon: '⛵', rating: 4.8, reports: 987, verified: true },
      { name: 'Street Food', category: 'Food', priceRange: '₹50-100', avgPrice: 75, icon: '🍽️', rating: 4.6, reports: 654, verified: true },
      { name: 'Rajasthani Thali', category: 'Food', priceRange: '₹300-600', avgPrice: 450, icon: '🍛', rating: 4.7, reports: 765, verified: true },
      { name: 'City Palace Entry', category: 'Tickets', priceRange: '₹300-300', avgPrice: 300, icon: '🏰', rating: 4.8, reports: 876, verified: true },
      { name: 'Budget Hotel (per night)', category: 'Accommodation', priceRange: '₹1000-1800', avgPrice: 1400, icon: '🏨', rating: 4.4, reports: 423, verified: true },
    ]
  },
  {
    city: 'Varanasi',
    state: 'Uttar Pradesh',
    services: [
      { name: 'Auto Rickshaw (3km)', category: 'Rides', priceRange: '₹30-55', avgPrice: 42, icon: '🛺', rating: 4.5, reports: 876, verified: true },
      { name: 'Boat Ride (Ganges)', category: 'Rides', priceRange: '₹100-300', avgPrice: 200, icon: '🚤', rating: 4.9, reports: 1234, verified: true },
      { name: 'Taxi (10km)', category: 'Rides', priceRange: '₹140-210', avgPrice: 175, icon: '🚕', rating: 4.4, reports: 654, verified: true },
      { name: 'Street Food', category: 'Food', priceRange: '₹40-80', avgPrice: 60, icon: '🍽️', rating: 4.7, reports: 987, verified: true },
      { name: 'Restaurant Meal', category: 'Food', priceRange: '₹200-400', avgPrice: 300, icon: '🍴', rating: 4.5, reports: 543, verified: true },
      { name: 'Sarnath Museum Entry', category: 'Tickets', priceRange: '₹20-20', avgPrice: 20, icon: '🏛️', rating: 4.6, reports: 456, verified: true },
      { name: 'Budget Hotel (per night)', category: 'Accommodation', priceRange: '₹600-1200', avgPrice: 900, icon: '🏨', rating: 4.2, reports: 345, verified: true },
    ]
  },
];

// Search function
export function searchLocationsAndServices(query: string): Array<{
  name: string;
  price: string;
  location: string;
  category: string;
  icon: string;
  service: ServicePricing;
}> {
  const results: Array<{
    name: string;
    price: string;
    location: string;
    category: string;
    icon: string;
    service: ServicePricing;
  }> = [];

  const lowerQuery = query.toLowerCase();

  for (const location of locationDatabase) {
    // Search in city names
    if (location.city.toLowerCase().includes(lowerQuery) || 
        location.state.toLowerCase().includes(lowerQuery)) {
      // Return all services for this location
      for (const service of location.services) {
        results.push({
          name: service.name,
          price: service.priceRange,
          location: location.city,
          category: service.category,
          icon: service.icon,
          service: service
        });
      }
    } else {
      // Search in service names
      for (const service of location.services) {
        if (service.name.toLowerCase().includes(lowerQuery) || 
            service.category.toLowerCase().includes(lowerQuery)) {
          results.push({
            name: service.name,
            price: service.priceRange,
            location: location.city,
            category: service.category,
            icon: service.icon,
            service: service
          });
        }
      }
    }
  }

  // Limit to 15 results
  return results.slice(0, 15);
}

// Get services for a specific city
export function getServicesForCity(cityName: string): ServicePricing[] {
  const location = locationDatabase.find(loc => 
    loc.city.toLowerCase() === cityName.toLowerCase()
  );
  return location?.services || [];
}

// Get all cities
export function getAllCities(): string[] {
  return locationDatabase.map(loc => loc.city);
}
