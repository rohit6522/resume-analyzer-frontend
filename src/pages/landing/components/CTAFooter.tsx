import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, FileText } from "lucide-react";

export default function CTAFooter() {
  return (
    <>
      {/* Final CTA */}
      <section className="py-24 px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center rounded-3xl border border-border bg-card p-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Ready to improve your resume?
          </h2>
          <p className="text-muted-foreground text-lg mb-8">
            Join thousands of job seekers who've boosted their interview rate with AI-powered insights.
          </p>
          <Link to="/register">
            <Button size="lg" className="group">
              Get Started for Free
              <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-10 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 font-semibold">
            <div className="h-7 w-7 rounded-lg bg-foreground flex items-center justify-center">
              <FileText className="h-3.5 w-3.5 text-background" />
            </div>
            ResumeAI
          </div>
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} ResumeAI. All rights reserved.
          </p>
        </div>
      </footer>
    </>
  );
}