import { Header } from "./Header";
import { BottomNav } from "./BottomNav";
import { Card, CardContent } from "./ui/card";
import {
  BookOpen,
  MessageCircle,
  Lightbulb,
  Info,
  Star,
  TrendingUp,
  MapPin,
} from "lucide-react";
import { Badge } from "./ui/badge";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface CulturalTipsScreenProps {
  onNavigate: (
    screen:
      | "home"
      | "explore"
      | "report"
      | "saved"
      | "profile"
      | "cultural",
  ) => void;
  isLoggedIn: boolean;
  userName: string;
  onShowLogin: () => void;
  onLogout: () => void;
}

export function CulturalTipsScreen({
  onNavigate,
  isLoggedIn,
  userName,
  onShowLogin,
  onLogout,
}: CulturalTipsScreenProps) {
  const tips = [
    {
      category: "Bargaining Etiquette",
      icon: MessageCircle,
      color: "from-blue-500 to-indigo-600",
      bgColor: "bg-blue-50",
      items: [
        {
          tip: "Start at 60-70% of asking price",
          importance: "high",
        },
        {
          tip: "Always smile and remain polite",
          importance: "high",
        },
        {
          tip: "Walk away if too high - they often call back",
          importance: "medium",
        },
        {
          tip: "Fixed price stores: bargaining not expected",
          importance: "medium",
        },
      ],
    },
    {
      category: "Transportation Tips",
      icon: Info,
      color: "from-orange-500 to-red-600",
      bgColor: "bg-orange-50",
      items: [
        {
          tip: "Auto rickshaws: Insist on meter or agree price before",
          importance: "high",
        },
        {
          tip: "Avoid touts at stations and airports",
          importance: "high",
        },
        {
          tip: "Use official prepaid taxi counters",
          importance: "high",
        },
        {
          tip: "Peak hours cost 10-20% more",
          importance: "medium",
        },
      ],
    },
    {
      category: "Cultural Customs",
      icon: BookOpen,
      color: "from-purple-500 to-pink-600",
      bgColor: "bg-purple-50",
      items: [
        {
          tip: "Remove shoes before entering temples",
          importance: "high",
        },
        {
          tip: "Dress modestly at religious sites",
          importance: "high",
        },
        {
          tip: "Ask permission before taking photos",
          importance: "medium",
        },
        {
          tip: "Respect local customs and traditions",
          importance: "high",
        },
      ],
    },
    {
      category: "Money & Safety",
      icon: Lightbulb,
      color: "from-green-500 to-emerald-600",
      bgColor: "bg-green-50",
      items: [
        {
          tip: "Always carry small denominations",
          importance: "high",
        },
        {
          tip: "Check currency before accepting change",
          importance: "high",
        },
        {
          tip: "Tourist areas charge 2-3x normal prices",
          importance: "medium",
        },
        {
          tip: "Street food: ₹30-100, Restaurant: ₹200-500",
          importance: "medium",
        },
      ],
    },
  ];

  const commonPhrases = [
    {
      english: "How much?",
      hindi: "Kitna hai?",
      pronunciation: "Kit-naa hai",
    },
    {
      english: "Too expensive",
      hindi: "Bahut mehenga hai",
      pronunciation: "Ba-hut meh-en-gaa hai",
    },
    {
      english: "Final price?",
      hindi: "Last price kya hai?",
      pronunciation: "Last price kyaa hai",
    },
    {
      english: "No thank you",
      hindi: "Nahi, shukriya",
      pronunciation: "Na-hee, shuk-ri-yaa",
    },
  ];

  const regionalTips = [
    {
      region: "Delhi NCR",
      icon: "🏛️",
      tips: [
        "Metro is cheapest transport",
        "Avoid Old Delhi touts",
        "Government emporiums for fixed prices",
      ],
      avgDaily: "₹1,500-3,000",
    },
    {
      region: "Mumbai",
      icon: "🌆",
      tips: [
        "Use local trains",
        "Taxis more expensive",
        "Street food excellent value",
      ],
      avgDaily: "₹2,000-4,000",
    },
    {
      region: "Jaipur",
      icon: "🕌",
      tips: [
        "Bargain at bazaars",
        "Auto rates negotiable",
        "Combo tickets save money",
      ],
      avgDaily: "₹1,200-2,500",
    },
  ];

  return (
    <div className="min-h-screen pb-20">
      <Header
        isLoggedIn={isLoggedIn}
        userName={userName}
        onShowLogin={onShowLogin}
        onNavigate={onNavigate}
        onLogout={onLogout}
      />

      <main className="max-w-5xl mx-auto px-4 py-6 space-y-8">
        {/* Hero Section */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-600 p-8 shadow-2xl">
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                <BookOpen className="w-7 h-7 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-white">
                Cultural Tips & Etiquette
              </h2>
            </div>
            <p className="text-purple-100 text-lg">
              Navigate India like a local with insider knowledge
              from experienced travelers
            </p>
          </div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full -ml-24 -mb-24"></div>
        </div>

        {/* Tips Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {tips.map((section, index) => {
            const Icon = section.icon;
            // Get the text color based on the gradient
            const iconColorMap: Record<string, string> = {
              "from-blue-500 to-indigo-600": "text-blue-600",
              "from-orange-500 to-red-600": "text-orange-600",
              "from-purple-500 to-pink-600": "text-purple-600",
              "from-green-500 to-emerald-600": "text-green-600",
            };
            const iconColor =
              iconColorMap[section.color] || "text-gray-600";

            return (
              <Card
                key={index}
                className="border-gray-200 hover:shadow-xl transition-all group"
              >
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-12 h-12 ${section.bgColor} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-md`}
                    >
                      <Icon
                        className={`w-6 h-6 ${iconColor}`}
                      />
                    </div>
                    <h3 className="font-bold text-lg text-gray-900">
                      {section.category}
                    </h3>
                  </div>
                  <ul className="space-y-3">
                    {section.items.map((item, idx) => (
                      <li
                        key={idx}
                        className="flex gap-3 items-start"
                      >
                        <div
                          className={`mt-1 flex-shrink-0 ${
                            item.importance === "high"
                              ? "text-orange-500"
                              : "text-gray-400"
                          }`}
                        >
                          {item.importance === "high"
                            ? "⭐"
                            : "•"}
                        </div>
                        <span className="text-gray-700 leading-relaxed">
                          {item.tip}
                        </span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Common Phrases */}
        <Card className="border-gray-200 shadow-lg">
          <CardContent className="p-6 space-y-5">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center shadow-md">
                <MessageCircle className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-xl text-gray-900">
                  Essential Hindi Phrases
                </h3>
                <p className="text-sm text-gray-600">
                  Master these for better bargaining
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {commonPhrases.map((phrase, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-br from-orange-50 to-amber-50 p-4 rounded-xl border border-orange-200"
                >
                  <div className="flex justify-between items-start mb-2">
                    <p className="font-semibold text-gray-900">
                      {phrase.english}
                    </p>
                    <Star className="w-4 h-4 text-orange-500" />
                  </div>
                  <p className="text-lg font-bold text-orange-600 mb-1">
                    {phrase.hindi}
                  </p>
                  <p className="text-xs text-gray-600 italic">
                    ({phrase.pronunciation})
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Regional Tips */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-gray-900">
            Regional Travel Guides
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {regionalTips.map((region, index) => (
              <Card
                key={index}
                className="border-gray-200 hover:shadow-xl transition-all group"
              >
                <CardContent className="p-5 space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="text-3xl">
                      {region.icon}
                    </span>
                    <div className="flex-1">
                      <h4 className="font-bold text-gray-900">
                        {region.region}
                      </h4>
                      <Badge className="bg-green-100 text-green-700 border-green-200 text-xs mt-1 font-semibold">
                        {region.avgDaily}/day
                      </Badge>
                    </div>
                  </div>
                  <ul className="space-y-2 text-sm">
                    {region.tips.map((tip, idx) => (
                      <li
                        key={idx}
                        className="flex gap-2 items-start text-gray-700"
                      >
                        <span className="text-green-500 mt-0.5">
                          ✓
                        </span>
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Pro Tips */}
        <Card className="border-indigo-200 bg-gradient-to-br from-indigo-50 to-blue-50 shadow-md">
          <CardContent className="p-6 space-y-4">
            <div className="flex items-center gap-2">
              <Lightbulb className="w-6 h-6 text-indigo-600" />
              <h4 className="font-bold text-lg text-gray-900">
                Pro Travel Hacks
              </h4>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="bg-white p-4 rounded-xl border border-indigo-200">
                <p className="font-semibold text-gray-900 mb-2">
                  🕐 Best Time to Visit
                </p>
                <p className="text-gray-700">
                  October to March for pleasant weather and
                  lower prices
                </p>
              </div>
              <div className="bg-white p-4 rounded-xl border border-indigo-200">
                <p className="font-semibold text-gray-900 mb-2">
                  💳 Payment Methods
                </p>
                <p className="text-gray-700">
                  UPI widely accepted, cash still king in rural
                  areas
                </p>
              </div>
              <div className="bg-white p-4 rounded-xl border border-indigo-200">
                <p className="font-semibold text-gray-900 mb-2">
                  🍽️ Food Safety
                </p>
                <p className="text-gray-700">
                  Eat where locals eat, avoid pre-cut fruits,
                  drink bottled water
                </p>
              </div>
              <div className="bg-white p-4 rounded-xl border border-indigo-200">
                <p className="font-semibold text-gray-900 mb-2">
                  🚨 Emergency Numbers
                </p>
                <p className="text-gray-700">
                  Police: 100, Ambulance: 102, Tourist Helpline:
                  1363
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Final Note */}
        <Card className="border-green-200 bg-green-50 shadow-md">
          <CardContent className="p-6">
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                  <Star className="w-6 h-6 text-white fill-white" />
                </div>
              </div>
              <div>
                <h4 className="font-bold text-gray-900 mb-2 text-lg">
                  Remember
                </h4>
                <p className="text-gray-700 leading-relaxed">
                  Most Indians are genuinely warm and helpful.
                  While it's important to be aware of common
                  scams, don't let fear prevent you from
                  experiencing India's incredible hospitality.
                  Travel with an open heart, use common sense,
                  verify prices beforehand, and embrace the
                  adventure! 🇮🇳
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>

      <BottomNav
        currentScreen="cultural"
        onNavigate={onNavigate}
        isLoggedIn={isLoggedIn}
        onShowLogin={onShowLogin}
      />
    </div>
  );
}