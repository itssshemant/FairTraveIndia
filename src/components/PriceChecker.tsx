import { useState } from "react";
import {
  Search,
  TrendingUp,
  Clock,
  MapPin,
  Sliders,
  Save,
  Flag,
  Users,
  Star,
  CheckCircle,
} from "lucide-react";
import { Input } from "./ui/input";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";
import { getServicesForCity } from "./locationData";
import { PriceDetailModal } from "./PriceDetailModal";
import { fairPrices } from "../data/prices";

interface PriceCheckerProps {
  onNavigate: (
    screen: "home" | "explore" | "report" | "saved" | "profile" | "cultural"
  ) => void;
  isDarkMode?: boolean;
}

export function PriceChecker({
  onNavigate,
  isDarkMode = false,
}: PriceCheckerProps) {
  const [selectedTab, setSelectedTab] = useState("Rides");
  const [distance, setDistance] = useState(3);
  const [timeOfDay, setTimeOfDay] = useState("Afternoon (10-4 PM)");
  const [askedPrice, setAskedPrice] = useState<number | null>(null);
  const [verdict, setVerdict] = useState<null | {
    status: "fair" | "high" | "low";
    message: string;
  }>(null);

  const [selectedCity] = useState("Delhi");
  const [detailModal, setDetailModal] = useState<any>(null);

  const tabs = ["Rides", "Food", "Tickets", "Accommodation"];

  const allPriceData = getServicesForCity(selectedCity);
  const priceData = allPriceData.filter(
    (service) => service.category === selectedTab
  );

  const chartData = [
    { name: "Min", value: 40 },
    { name: "Avg", value: 50 },
    { name: "Max", value: 60 },
  ];

  const trendData = [
    { month: "Jan", price: 45 },
    { month: "Feb", price: 48 },
    { month: "Mar", price: 50 },
    { month: "Apr", price: 52 },
    { month: "May", price: 50 },
    { month: "Jun", price: 50 },
  ];

  // 🔥 KILLER LOGIC
  const checkFairPrice = () => {
    if (!askedPrice) return;

    const key = `${selectedCity.toLowerCase()}-${selectedTab.toLowerCase()}`;
    const fair = fairPrices[key];

    if (!fair) {
      setVerdict({
        status: "low",
        message: "No community data available yet for this service.",
      });
      return;
    }

    if (askedPrice > fair.max) {
      setVerdict({
        status: "high",
        message: `You may be overcharged. Expected ₹${fair.min}–₹${fair.max}.`,
      });
    } else if (askedPrice < fair.min) {
      setVerdict({
        status: "low",
        message:
          "Price seems unusually low. Double-check service quality or distance.",
      });
    } else {
      setVerdict({
        status: "fair",
        message: "Price looks fair based on community data.",
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Tabs */}
      <div className="flex gap-3 overflow-x-auto pb-2">
        {tabs.map((tab) => (
          <Button
            key={tab}
            variant={selectedTab === tab ? "default" : "outline"}
            onClick={() => {
              setSelectedTab(tab);
              setVerdict(null);
            }}
            className="rounded-full px-6 font-semibold"
          >
            {tab}
          </Button>
        ))}
      </div>

      {/* Price Listings */}
      <div className="space-y-4">
        <h3 className="font-bold text-lg">
          Available Prices ({priceData.length})
        </h3>

        {priceData.map((item, index) => (
          <Card
            key={index}
            className="hover:shadow-lg transition cursor-pointer"
          >
            <CardContent className="p-5 flex gap-4">
              <div className="text-4xl">{item.icon}</div>
              <div className="flex-1">
                <h4 className="font-bold">{item.name}</h4>
                <div className="flex items-center gap-3 mt-1">
                  <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                  <span className="text-sm">{item.rating}</span>
                  <Users className="w-4 h-4" />
                  <span className="text-sm">{item.reports} reports</span>
                </div>

                <p className="mt-3 text-2xl font-bold text-green-600">
                  {item.priceRange}
                </p>

                <Button
                  size="sm"
                  className="mt-3"
                  onClick={() => setDetailModal(item)}
                >
                  View Details
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Fair Price Checker */}
      <Card className="border-orange-200 bg-orange-50">
        <CardContent className="p-6 space-y-4">
          <h4 className="font-bold text-lg">Check Fair Price</h4>

          <Input
            type="number"
            placeholder="Price you were asked (₹)"
            onChange={(e) => {
              setAskedPrice(Number(e.target.value));
              setVerdict(null);
            }}
          />

          <Button
            onClick={checkFairPrice}
            className="w-full bg-orange-600 hover:bg-orange-700"
          >
            Check Price
          </Button>

          {verdict && (
            <div
              className={`p-4 rounded-xl border-2 text-center font-semibold ${
                verdict.status === "fair"
                  ? "bg-green-50 border-green-500 text-green-700"
                  : verdict.status === "high"
                  ? "bg-red-50 border-red-500 text-red-700"
                  : "bg-yellow-50 border-yellow-500 text-yellow-700"
              }`}
            >
              {verdict.status === "fair" && "✅ Fair Price"}
              {verdict.status === "high" && "⚠️ Possible Overcharge"}
              {verdict.status === "low" && "🤔 Unusually Cheap"}
              <p className="text-sm mt-1">{verdict.message}</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Charts */}
      <Card>
        <CardContent className="p-6">
          <h4 className="font-bold mb-3">Price Distribution</h4>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#fb923c" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <h4 className="font-bold mb-3">6-Month Trend</h4>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line dataKey="price" stroke="#10b981" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="grid grid-cols-2 gap-4">
        <Button variant="outline" className="gap-2">
          <Save className="w-4 h-4" /> Save
        </Button>
        <Button
          className="gap-2 bg-orange-600 hover:bg-orange-700"
          onClick={() => onNavigate("report")}
        >
          <Flag className="w-4 h-4" /> Report Overcharge
        </Button>
      </div>

      {detailModal && (
        <PriceDetailModal
          isOpen={!!detailModal}
          service={detailModal}
          onClose={() => setDetailModal(null)}
          isDarkMode={isDarkMode}
          onNavigate={onNavigate}
        />
      )}
    </div>
  );
}
