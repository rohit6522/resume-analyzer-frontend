import { useRef, useLayoutEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import gsap from "gsap";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(".hero-badge", { y: 20, opacity: 0, duration: 0.6 })
        .from(".hero-title span", { y: 40, opacity: 0, stagger: 0.08, duration: 0.7 }, "-=0.3")
        .from(".hero-subtitle", { y: 20, opacity: 0, duration: 0.6 }, "-=0.4")
        .from(".hero-cta", { y: 20, opacity: 0, duration: 0.6 }, "-=0.4")
        .from(".hero-image", { y: 40, opacity: 0, duration: 0.8 }, "-=0.3");
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const titleWords = ["Land", "Your", "Dream", "Job", "Faster"];

  return (
    <section ref={containerRef} className="pt-40 pb-24 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <div className="hero-badge inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-accent/50 text-sm text-muted-foreground mb-6">
          <Sparkles className="h-3.5 w-3.5" />
          AI-Powered Resume Analysis
        </div>

        <h1 className="hero-title text-5xl md:text-7xl font-bold tracking-tight text-foreground mb-6">
          {titleWords.map((word, i) => (
            <span key={i} className="inline-block mr-4">
              {word}
            </span>
          ))}
        </h1>

        <p className="hero-subtitle text-lg text-muted-foreground max-w-xl mx-auto mb-8">
          Get instant ATS scores, AI-powered suggestions, and expert insights
          to make your resume stand out to recruiters and hiring systems.
        </p>

        <div className="hero-cta flex items-center justify-center gap-4">
          <Link to="/register">
            <Button size="lg" className="group">
              Analyze My Resume
              <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
          <Button size="lg" variant="outline">
            See how it works
          </Button>
        </div>

        <div className="hero-image mt-16 rounded-2xl border border-border bg-card shadow-2xl overflow-hidden">
          <div className="aspect-video bg-gradient-to-br from-accent to-background flex items-center justify-center">
            <p className="text-muted-foreground text-sm">
              [ Dashboard preview screenshot goes here ]
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}