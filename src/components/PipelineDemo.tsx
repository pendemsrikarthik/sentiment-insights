import { useState } from "react";
import { motion } from "framer-motion";
import { tokenize, removeStopwords, lemmatize } from "@/lib/sentiment";
import { ArrowDown, Play } from "lucide-react";

const defaultText = "The movie was absolutely amazing and I really loved the exciting performances!";

export default function PipelineDemo() {
  const [input, setInput] = useState(defaultText);
  const [step, setStep] = useState(0);

  const tokens = tokenize(input);
  const lowered = tokens; // already lowered in tokenize
  const filtered = removeStopwords(tokens);
  const lemmatized = filtered.map(lemmatize);

  const steps = [
    { title: "1. Raw Input", data: [input], description: "Original text before any processing" },
    { title: "2. Tokenization", data: tokens, description: "Split into individual word tokens" },
    { title: "3. Stopword Removal", data: filtered, description: "Common words removed (the, is, and...)" },
    { title: "4. Lemmatization", data: lemmatized, description: "Words reduced to base form" },
  ];

  return (
    <div className="space-y-4">
      <div className="flex gap-3 items-end">
        <div className="flex-1">
          <label className="text-xs font-medium text-muted-foreground mb-1 block">Input Text</label>
          <input
            value={input}
            onChange={(e) => { setInput(e.target.value); setStep(0); }}
            className="w-full px-3 py-2 rounded-lg bg-card border border-border font-mono text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
          />
        </div>
        <button
          onClick={() => setStep(Math.min(step + 1, steps.length - 1))}
          className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-semibold flex items-center gap-1.5 hover:opacity-90 transition-opacity"
        >
          <Play className="w-3.5 h-3.5" />
          {step < steps.length - 1 ? "Next Step" : "Done"}
        </button>
      </div>

      <div className="space-y-3">
        {steps.slice(0, step + 1).map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            {i > 0 && (
              <div className="flex justify-center py-1">
                <ArrowDown className="w-4 h-4 text-muted-foreground" />
              </div>
            )}
            <div className="p-4 rounded-lg bg-card border border-border shadow-card">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-sm font-bold font-display text-foreground">{s.title}</h4>
                <span className="text-xs text-muted-foreground">{s.description}</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {s.data.map((token, j) => (
                  <motion.span
                    key={j}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: j * 0.03 }}
                    className="px-2.5 py-1 rounded bg-primary/10 text-primary text-xs font-mono border border-primary/20"
                  >
                    {token}
                  </motion.span>
                ))}
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                {s.data.length} token{s.data.length !== 1 ? 's' : ''}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
