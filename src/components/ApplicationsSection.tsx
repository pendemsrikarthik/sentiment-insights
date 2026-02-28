import { motion } from "framer-motion";
import { MessageSquare, TrendingUp, ShoppingCart, Globe, AlertTriangle, Lightbulb } from "lucide-react";

const apps = [
  { icon: MessageSquare, title: "Customer Feedback", desc: "Identify product strengths & weaknesses from reviews" },
  { icon: TrendingUp, title: "Brand Monitoring", desc: "Track public sentiment across social platforms" },
  { icon: Globe, title: "Public Opinion", desc: "Political research and forecasting analysis" },
  { icon: ShoppingCart, title: "Market Research", desc: "Understand consumer behavior patterns" },
  { icon: AlertTriangle, title: "Crisis Detection", desc: "Real-time detection of brand crises" },
  { icon: Lightbulb, title: "Product Insights", desc: "Drive improvements from aspect-level analysis" },
];

const challenges = [
  { title: "Sarcasm & Irony", example: '"Great, another delay!"', note: "Actually negative" },
  { title: "Context Sensitivity", example: '"Sick" = negative (health) vs positive (slang)', note: "Domain-dependent" },
  { title: "Mixed Sentiment", example: '"Great battery, terrible camera"', note: "Multiple opinions" },
];

export default function ApplicationsSection() {
  return (
    <div className="space-y-16">
      {/* Applications Grid */}
      <div>
        <h3 className="text-xl font-bold font-display mb-6">Real-World Applications</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {apps.map((app, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="flex items-start gap-3 p-4 rounded-lg bg-card border border-border hover:border-primary/30 transition-colors"
            >
              <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <app.icon className="w-4.5 h-4.5 text-primary" />
              </div>
              <div>
                <h4 className="text-sm font-bold">{app.title}</h4>
                <p className="text-xs text-muted-foreground mt-0.5">{app.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Challenges */}
      <div>
        <h3 className="text-xl font-bold font-display mb-6">Key Challenges</h3>
        <div className="grid md:grid-cols-3 gap-4">
          {challenges.map((c, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-5 rounded-xl bg-negative/5 border border-negative/15"
            >
              <h4 className="text-sm font-bold text-negative mb-2">{c.title}</h4>
              <p className="text-xs font-mono text-muted-foreground mb-1">{c.example}</p>
              <p className="text-xs text-negative/70">{c.note}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
