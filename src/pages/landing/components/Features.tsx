import { motion } from "framer-motion";
import { Sparkles, Target, FileCheck, TrendingUp, Zap, Shield } from "lucide-react";
import type { Variants } from "framer-motion";

const features = [
  {
    icon: Sparkles,
    title: "AI-Powered Analysis",
    description: "Get instant, intelligent feedback on your resume powered by advanced AI models.",
  },
  {
    icon: Target,
    title: "ATS Score Breakdown",
    description: "See exactly how applicant tracking systems will score your resume, section by section.",
  },
  {
    icon: FileCheck,
    title: "Smart Parsing",
    description: "Automatically extract your skills, experience, and contact details with high accuracy.",
  },
  {
    icon: TrendingUp,
    title: "Actionable Suggestions",
    description: "Get specific, prioritized recommendations to improve your resume's impact.",
  },
  {
    icon: Zap,
    title: "Instant Results",
    description: "No waiting around — upload your resume and get a full analysis in seconds.",
  },
  {
    icon: Shield,
    title: "Privacy First",
    description: "Your resume data is encrypted and never shared with third parties.",
  },
];

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function Features() {
  return (
    <section id="features" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Everything you need to land more interviews
          </h2>
          <p className="text-muted-foreground text-lg">
            Powerful tools designed to give your resume every possible edge.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {features.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={i}
                variants={item}
                className="p-6 rounded-2xl border border-border bg-card hover:border-foreground/20 transition-colors"
              >
                <div className="h-11 w-11 rounded-xl bg-accent flex items-center justify-center mb-4">
                  <Icon className="h-5 w-5 text-foreground" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}