import { useState, useEffect } from "react";
import { Link } from "wouter";
import { METRICS } from "@shared/metrics";
import { Input } from "@/components/ui/input";
import { ThemeToggle } from "@/components/ThemeToggle";
import { getIcon } from "@/lib/icons";
import { Search, Calculator, BookOpen, Sparkles } from "lucide-react";

const METRIC_CATEGORIES = [
  {
    id: 'growth',
    title: 'Growth & Revenue',
    description: 'How big are you and how fast are you growing?',
    metricIds: ['mrr', 'arr', 'growth-rate', 'nrr', 'churn-rate', 'rule-of-40']
  },
  {
    id: 'unit-economics',
    title: 'Unit Economics',
    description: 'Does the math work for each customer?',
    metricIds: ['cac', 'ltv', 'ltv-cac-ratio', 'unit-economics', 'cac-payback-period', 'arpu']
  },
  {
    id: 'profitability',
    title: 'Profitability & Health',
    description: 'Are you making money and surviving?',
    metricIds: ['gross-margin', 'contribution-margin', 'net-profit-margin', 'burn-rate', 'runway', 'ebitda-margin']
  }
];

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    document.title = "Startup Metrics 101 - Interactive Learning Platform";
    // Trigger animations after mount
    const timer = setTimeout(() => setIsLoaded(true), 50);
    return () => clearTimeout(timer);
  }, []);

  const filteredMetrics = METRICS.filter(metric =>
    metric.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    metric.shortDescription.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background gradient overlay */}
      <div className="fixed inset-0 bg-gradient-to-br from-blue-500/[0.07] via-transparent to-indigo-500/[0.05] dark:from-blue-600/15 dark:via-blue-900/10 dark:to-indigo-900/20 pointer-events-none" />

      {/* Secondary radial glow - both modes */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,rgba(59,130,246,0.08),transparent_50%)] dark:bg-[radial-gradient(ellipse_at_top,rgba(59,130,246,0.15),transparent_50%)] pointer-events-none" />

      {/* Bottom corner accent */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(99,102,241,0.06),transparent_50%)] dark:bg-[radial-gradient(ellipse_at_bottom_right,rgba(99,102,241,0.10),transparent_50%)] pointer-events-none" />

      {/* Subtle grid pattern */}
      <div className="fixed inset-0 bg-grid-pattern opacity-60 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        {/* Theme Toggle - Top Right */}
        <div className={`flex justify-end mb-6 transition-all duration-500 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
          <ThemeToggle />
        </div>

        {/* Hero Section */}
        <div className={`relative mb-8 sm:mb-12 lg:mb-16 transition-all duration-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {/* Hero Card with Glass Effect */}
          <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl">
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#0052CC] via-[#0066FF] to-[#0085FF] dark:from-[#0a1220] dark:via-[#0d1829] dark:to-[#101d30]" />

            {/* Decorative elements - hidden on mobile for performance */}
            <div className="hidden sm:block absolute top-0 right-0 w-64 lg:w-96 h-64 lg:h-96 bg-gradient-to-br from-white/10 to-transparent rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
            <div className="hidden sm:block absolute bottom-0 left-0 w-48 lg:w-72 h-48 lg:h-72 bg-gradient-to-tr from-blue-400/20 to-transparent rounded-full blur-3xl translate-y-1/2 -translate-x-1/4" />

            {/* Content */}
            <div className="relative z-10 px-5 py-10 sm:px-8 sm:py-14 lg:px-16 lg:py-20">
              {/* Title */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-center text-white mb-4 sm:mb-6 tracking-tight" data-testid="hero-title">
                Startup Metrics 101
              </h1>

              {/* Subtitle */}
              <p className="text-base sm:text-lg lg:text-xl text-center max-w-2xl mx-auto text-white/80 leading-relaxed mb-8 sm:mb-10 px-2">
                Master the 18 essential business metrics every startup professional should know.
              </p>

              {/* Stats Row */}
              <div className="flex justify-center gap-3 sm:gap-6 md:gap-8 lg:gap-12 mb-8 sm:mb-12">
                <div className="text-center flex-1 max-w-[110px] sm:flex-none sm:max-w-none">
                  <div className="flex items-center justify-center">
                    <Sparkles className="w-4 h-4 sm:w-6 sm:h-6 lg:w-7 lg:h-7 text-white" />
                  </div>
                  <div className="text-[10px] sm:text-sm text-white/60 mt-0.5 sm:mt-1">Free Platform</div>
                </div>
                <div className="text-center flex-1 max-w-[110px] sm:flex-none sm:max-w-none">
                  <div className="flex items-center justify-center">
                    <Calculator className="w-4 h-4 sm:w-6 sm:h-6 lg:w-7 lg:h-7 text-white" />
                  </div>
                  <div className="text-[10px] sm:text-sm text-white/60 mt-0.5 sm:mt-1">Interactive Calculators</div>
                </div>
                <div className="text-center flex-1 max-w-[110px] sm:flex-none sm:max-w-none">
                  <div className="flex items-center justify-center">
                    <BookOpen className="w-4 h-4 sm:w-6 sm:h-6 lg:w-7 lg:h-7 text-white" />
                  </div>
                  <div className="text-[10px] sm:text-sm text-white/60 mt-0.5 sm:mt-1">Clear Explanations</div>
                </div>
              </div>

              {/* Search Bar */}
              <div className="max-w-xl mx-auto px-2 sm:px-0">
                <div className="relative group">
                  <Search className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-white/50 w-4 h-4 sm:w-5 sm:h-5 transition-colors group-focus-within:text-white/70" />
                  <Input
                    type="search"
                    placeholder="Search metrics..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full h-12 sm:h-14 pl-10 sm:pl-12 pr-4 sm:pr-5 text-sm sm:text-base bg-white/10 dark:bg-white/5 border-white/20 dark:border-white/10 text-white placeholder:text-white/50 rounded-xl sm:rounded-2xl focus:border-white/40 dark:focus:border-white/20 focus:ring-2 focus:ring-white/20 transition-all duration-200"
                    data-testid="search-input"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content Area */}
        {searchQuery ? (
          // Search Results View
          <div className={`transition-all duration-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="mb-6 sm:mb-8">
              <h2 className="text-xl sm:text-2xl font-bold text-foreground">
                Results for "{searchQuery}"
              </h2>
              <p className="text-sm sm:text-base text-muted-foreground mt-1">
                {filteredMetrics.length} metric{filteredMetrics.length !== 1 ? 's' : ''} found
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
              {filteredMetrics.map((metric, index) => (
                <MetricCard key={metric.id} metric={metric} index={index} isLoaded={isLoaded} />
              ))}
            </div>

            {filteredMetrics.length === 0 && (
              <div className="text-center py-16">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-muted mb-4">
                  <Search className="w-8 h-8 text-muted-foreground" />
                </div>
                <p className="text-xl font-medium text-foreground mb-2">
                  No metrics found
                </p>
                <p className="text-muted-foreground">
                  Try searching for something like "MRR", "Churn", or "Growth"
                </p>
              </div>
            )}
          </div>
        ) : (
          // Categorized View
          <div className="space-y-12 sm:space-y-16">
            {METRIC_CATEGORIES.map((category, catIndex) => (
              <div
                key={category.id}
                className={`transition-all duration-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                style={{ transitionDelay: `${catIndex * 100}ms` }}
              >
                {/* Category Header */}
                <div className="mb-6 sm:mb-8 border-b border-border/50 pb-4">
                  <h2 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight">
                    {category.title}
                  </h2>
                  <p className="text-base sm:text-lg text-muted-foreground mt-2 max-w-3xl">
                    {category.description}
                  </p>
                </div>

                {/* Metrics Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                  {category.metricIds.map((metricId, index) => {
                    const metric = METRICS.find(m => m.id === metricId);
                    if (!metric) return null;
                    return <MetricCard key={metric.id} metric={metric} index={index} isLoaded={isLoaded} />;
                  })}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Footer */}
        <footer className={`mt-12 sm:mt-16 lg:mt-20 pt-6 sm:pt-8 border-t border-border/50 text-center transition-all duration-700 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Made with care for the startup community
          </p>
        </footer>
      </div>
    </div>
  );
}

// Extracted MetricCard component for reuse
function MetricCard({ metric, index, isLoaded }: { metric: any, index: number, isLoaded: boolean }) {
  return (
    <Link href={`/metric/${metric.id}`} data-testid={`link-metric-${metric.id}`}>
      <div
        className={`group relative overflow-hidden rounded-2xl transition-all duration-500 h-full ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        style={{ transitionDelay: `${150 + index * 50}ms` }}
        data-testid={`metric-card-${metric.id}`}
      >
        {/* Glass Card */}
        <div className="relative h-full p-5 sm:p-6 lg:p-7 glass-card rounded-xl sm:rounded-2xl hover:border-primary/30 transition-all duration-300 sm:hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(59,130,246,0.15)] dark:hover:shadow-[0_0_40px_rgba(59,130,246,0.18)] flex flex-col">
          {/* Hover gradient overlay */}
          <div className="absolute inset-0 rounded-xl sm:rounded-2xl bg-gradient-to-br from-primary/0 to-primary/0 group-hover:from-primary/[0.06] group-hover:to-primary/[0.03] dark:group-hover:from-primary/15 dark:group-hover:to-primary/5 transition-all duration-300 pointer-events-none" />

          {/* Content */}
          <div className="relative space-y-3 sm:space-y-4 flex-grow">
            {/* Icon */}
            <div
              className="inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-primary/10 dark:bg-primary/20 text-primary transition-all duration-300 group-hover:scale-110 group-hover:bg-primary/15 dark:group-hover:bg-primary/25"
              data-testid={`metric-icon-${metric.id}`}
            >
              {getIcon(metric.iconName, "w-5 h-5 sm:w-6 sm:h-6")}
            </div>

            {/* Title */}
            <h3
              className="text-base sm:text-lg font-semibold text-foreground group-hover:text-primary transition-colors duration-200"
              data-testid={`metric-name-${metric.id}`}
            >
              {metric.name}
            </h3>

            {/* Description */}
            <p
              className="text-sm sm:text-[0.925rem] text-muted-foreground leading-relaxed"
              data-testid={`metric-description-${metric.id}`}
            >
              {metric.shortDescription}
            </p>
          </div>

          {/* Arrow indicator - hidden on mobile */}
          <div className="hidden sm:block absolute bottom-5 right-5 sm:bottom-6 sm:right-6 lg:bottom-7 lg:right-7 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
            <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </div>
        </div>
      </div>
    </Link>
  );
}
