import { useState, useEffect } from "react";
import { Link } from "wouter";
import { METRICS } from "@shared/metrics";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ThemeToggle } from "@/components/ThemeToggle";
import { getIcon } from "@/lib/icons";
import { Search } from "lucide-react";

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    document.title = "Startup Metrics 101 - Interactive Learning Platform";
  }, []);

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
        <div className="relative overflow-hidden bg-gradient-to-br from-[#0052CC] via-[#0066FF] to-[#0085FF] dark:from-[#0a1628] dark:via-[#0d1b2e] dark:to-[#0f2239] text-white py-16 px-8 rounded-2xl shadow-2xl mb-12 border border-white/10 dark:border-white/5">
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent dark:from-white/[0.03] dark:to-transparent pointer-events-none"></div>
          <div className="relative z-10">
            <h1 className="text-6xl font-bold text-center mb-5 tracking-tight" data-testid="hero-title">
              Startup Metrics 101
            </h1>
            <p className="text-xl text-center max-w-3xl mx-auto opacity-95 leading-relaxed font-normal">
              Master the 15 essential business metrics every startup professional should know.
              Interactive calculators and clear explanations make learning easy.
            </p>

            {/* Search Bar */}
            <div className="mt-10 max-w-2xl mx-auto relative">
              <div className="relative">
                <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 w-5 h-5" />
                <Input
                  type="search"
                  placeholder="Search metrics (e.g., MRR, Churn, CAC...)"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-14 pr-5 py-4 text-base border border-white/20 dark:border-white/10 focus:border-white/40 dark:focus:border-white/20 bg-white/10 dark:bg-white/5 text-white placeholder:text-white/60 dark:placeholder:text-white/40 rounded-xl shadow-lg transition-all duration-200 focus:ring-2 focus:ring-white/20"
                  data-testid="search-input"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {filteredMetrics.map((metric) => (
            <Link key={metric.id} href={`/metric/${metric.id}`} data-testid={`link-metric-${metric.id}`}>
              <Card
                className="group relative p-7 cursor-pointer transition-all duration-300 ease-out hover:-translate-y-2 hover:shadow-xl border border-card-border dark:border-border bg-card dark:bg-card backdrop-blur-sm"
                data-testid={`metric-card-${metric.id}`}
              >
                <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-primary/0 to-primary/0 group-hover:from-primary/5 group-hover:to-primary/10 transition-all duration-300 pointer-events-none"></div>
                <div className="relative space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="text-primary transition-all duration-300 group-hover:scale-110" data-testid={`metric-icon-${metric.id}`}>
                      {getIcon(metric.iconName, "w-11 h-11")}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors duration-200" data-testid={`metric-name-${metric.id}`}>
                    {metric.name}
                  </h3>
                  <p className="text-muted-foreground text-[0.95rem] leading-relaxed" data-testid={`metric-description-${metric.id}`}>
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
