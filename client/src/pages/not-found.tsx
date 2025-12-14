import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Home, AlertCircle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden flex items-center justify-center">
      {/* Background gradient overlay */}
      <div className="fixed inset-0 bg-gradient-to-br from-blue-500/[0.07] via-transparent to-indigo-500/[0.05] dark:from-blue-600/15 dark:via-blue-900/10 dark:to-indigo-900/20 pointer-events-none" />
      
      {/* Secondary radial glow - both modes */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,rgba(59,130,246,0.08),transparent_50%)] dark:bg-[radial-gradient(ellipse_at_top,rgba(59,130,246,0.15),transparent_50%)] pointer-events-none" />
      
      {/* Subtle grid pattern */}
      <div className="fixed inset-0 bg-grid-pattern opacity-60 pointer-events-none" />

      <div className="relative z-10 text-center px-4">
        {/* Icon */}
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-red-500/10 dark:bg-red-500/20 mb-8">
          <AlertCircle className="w-10 h-10 text-red-500" />
        </div>

        {/* Title */}
        <h1 className="text-6xl font-bold text-foreground mb-4">404</h1>
        <p className="text-xl text-muted-foreground mb-8">
          Page not found
        </p>

        {/* Description */}
        <p className="text-muted-foreground max-w-md mx-auto mb-10">
          The page you're looking for doesn't exist or has been moved.
        </p>

        {/* Back Button */}
        <Link href="/">
          <Button size="lg" className="gap-2">
            <Home className="w-4 h-4" />
            Back to Home
          </Button>
        </Link>
      </div>
    </div>
  );
}
