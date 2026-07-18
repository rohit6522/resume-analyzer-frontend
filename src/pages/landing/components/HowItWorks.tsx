import { motion } from "framer-motion";
import { Upload, Cpu, TrendingUp } from "lucide-react";

const steps = [
  {
    icon: Upload,
    number: "01",
    title: "Upload your resume",
    description: "Drag and drop your PDF or DOCX resume — it takes just a few seconds.",
  },
  {
    icon: Cpu,
    number: "02",
    title: "AI analyzes it",
    description: "Our AI extracts your info and evaluates it against real ATS criteria.",
  },
  {
    icon: TrendingUp,
    number: "03",
    title: "Get your results",
    description: "See your score, strengths, weaknesses, and exactly what to improve.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 px-6 bg-accent/30">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            How it works
          </h2>
          <p className="text-muted-foreground text-lg">
            Three simple steps to a better resume.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="relative"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="h-16 w-16 rounded-2xl bg-background border border-border flex items-center justify-center mb-5 shadow-sm">
                    <Icon className="h-7 w-7 text-foreground" />
                  </div>
                  <span className="text-xs font-mono text-muted-foreground mb-2">
                    STEP {step.number}
                  </span>
                  <h3 className="font-semibold text-lg mb-2">{step.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}