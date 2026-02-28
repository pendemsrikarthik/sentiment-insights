import { motion } from "framer-motion";
import { FileText, AlignLeft, Target } from "lucide-react";

const levels = [
  {
    icon: FileText,
    title: "Document Level",
    description: "One overall sentiment for the entire document",
    example: '"I absolutely loved this restaurant. The food was incredible and the service was top notch."',
    result: "→ Positive",
    color: "primary" as const,
  },
  {
    icon: AlignLeft,
    title: "Sentence Level",
    description: "Sentiment analyzed sentence by sentence",
    example: '"The food was great. But the service was terrible."',
    results: ["Sentence 1 → Positive", "Sentence 2 → Negative"],
    color: "secondary" as const,
  },
  {
    icon: Target,
    title: "Aspect Level",
    description: "Sentiment toward specific features/aspects",
    example: '"The battery life is excellent, but the camera is poor."',
    aspects: [
      { aspect: "Battery life", sentiment: "Positive" },
      { aspect: "Camera", sentiment: "Negative" },
    ],
    color: "accent" as const,
  },
];

export default function GranularitySection() {
  return (
    <div className="grid md:grid-cols-3 gap-6">
      {levels.map((level, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.15 }}
          className="p-6 rounded-xl bg-card border border-border shadow-card hover:shadow-elevated transition-shadow group"
        >
          <div className={`w-10 h-10 rounded-lg bg-${level.color}/10 flex items-center justify-center mb-4`}>
            <level.icon className={`w-5 h-5 text-${level.color}`} />
          </div>
          <h3 className="text-lg font-bold font-display mb-2">{level.title}</h3>
          <p className="text-sm text-muted-foreground mb-4">{level.description}</p>
          <div className="p-3 rounded-lg bg-code text-xs font-mono">
            <p className="text-muted-foreground mb-2">{level.example}</p>
            {'result' in level && (
              <p className="text-positive font-semibold">{level.result}</p>
            )}
            {'results' in level && level.results?.map((r, j) => (
              <p key={j} className={j === 0 ? "text-positive" : "text-negative"}>{r}</p>
            ))}
            {'aspects' in level && level.aspects?.map((a, j) => (
              <p key={j} className={a.sentiment === 'Positive' ? "text-positive" : "text-negative"}>
                {a.aspect} → {a.sentiment}
              </p>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  );
}
