import { useState } from "react";
import { Link } from "wouter";
import { METRICS } from "@shared/metrics";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ThemeToggle } from "@/components/ThemeToggle";
import { getIcon } from "@/lib/icons";
import { Search } from "lucide-react";

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredMetrics = METRICS.filter(metric =>
    metric.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    metric.shortDescription.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Theme Toggle */}
        <div className="flex justify-end mb-4">
          <ThemeToggle />
        </div>

        {/* Hero Section */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-12 px-8 rounded-xl shadow-lg mb-12">
          <h1 className="text-5xl font-bold text-center mb-4" data-testid="hero-title">
            Startup Metrics 101
          </h1>
          <p className="text-xl text-center max-w-3xl mx-auto opacity-90 leading-relaxed">
            Master the 15 essential business metrics every startup professional should know. 
            Interactive calculators and clear explanations make learning easy.
          </p>
          
          {/* Search Bar */}
          <div className="mt-8 max-w-2xl mx-auto relative">
            <div className="relative">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="search"
                placeholder="Search metrics (e.g., MRR, Churn, CAC...)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-14 pr-5 py-4 text-base border-2 border-gray-200 focus:border-white bg-white text-gray-900 placeholder:text-gray-500"
                data-testid="search-input"
              />
            </div>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-12">
          {filteredMetrics.map((metric) => (
            <Link key={metric.id} href={`/metric/${metric.id}`} data-testid={`link-metric-${metric.id}`}>
              <Card
                className="p-6 cursor-pointer transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-lg hover:border-primary border-2 border-transparent hover-elevate"
                data-testid={`metric-card-${metric.id}`}
              >
                <div className="space-y-3">
                  <div className="text-primary" data-testid={`metric-icon-${metric.id}`}>
                    {getIcon(metric.iconName, "w-10 h-10")}
                  </div>
                  <h3 className="text-xl font-bold text-primary" data-testid={`metric-name-${metric.id}`}>
                    {metric.name}
                  </h3>
                  <p className="text-gray-600 text-[0.95rem] leading-relaxed" data-testid={`metric-description-${metric.id}`}>
                    {metric.shortDescription}
                  </p>
                </div>
              </Card>
            </Link>
          ))}
        </div>

        {filteredMetrics.length === 0 && (
          <div className="text-center py-12">
            <p className="text-xl text-gray-500">
              No metrics found matching "{searchQuery}"
            </p>
            <p className="text-gray-400 mt-2">
              Try a different search term
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
