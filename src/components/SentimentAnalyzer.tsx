import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { analyzeSentiment, type SentimentResult } from "@/lib/sentiment";
import { Smile, Frown, Meh, Sparkles, ArrowRight } from "lucide-react";

const exampleTexts = [
  "The movie was absolutely fantastic! I loved every moment of it.",
  "Terrible service, the food was cold and the waiter was rude.",
  "The product is okay, nothing special but it works fine.",
  "Great battery life, but the camera is really poor and disappointing.",
  "Great, another delay! This is absolutely ridiculous.",
];

export default function SentimentAnalyzer() {
  const [text, setText] = useState("");
  const [result, setResult] = useState<SentimentResult | null>(null);

  const handleAnalyze = () => {
    if (!text.trim()) return;
    setResult(analyzeSentiment(text));
  };

  const sentimentConfig = {
    Positive: { icon: Smile, colorClass: "text-positive", bgClass: "bg-positive/10", borderClass: "border-positive/30" },
    Negative: { icon: Frown, colorClass: "text-negative", bgClass: "bg-negative/10", borderClass: "border-negative/30" },
    Neutral: { icon: Meh, colorClass: "text-neutral", bgClass: "bg-neutral/10", borderClass: "border-neutral/30" },
  };

  return (
    <div className="space-y-6">
      <div className="relative">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter text to analyze sentiment..."
          className="w-full min-h-[140px] p-4 rounded-lg bg-card border border-border font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all"
        />
        <button
          onClick={handleAnalyze}
          disabled={!text.trim()}
          className="absolute bottom-4 right-4 bg-gradient-hero text-primary-foreground px-5 py-2.5 rounded-lg font-display font-semibold text-sm flex items-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-40"
        >
          <Sparkles className="w-4 h-4" />
          Analyze
        </button>
      </div>

      {/* Example texts */}
      <div className="flex flex-wrap gap-2">
        <span className="text-xs text-muted-foreground font-medium">Try:</span>
        {exampleTexts.map((ex, i) => (
          <button
            key={i}
            onClick={() => { setText(ex); setResult(analyzeSentiment(ex)); }}
            className="text-xs px-3 py-1.5 rounded-full bg-muted hover:bg-primary/10 text-muted-foreground hover:text-primary transition-colors truncate max-w-[200px]"
          >
            {ex.slice(0, 40)}...
          </button>
        ))}
      </div>

      {/* Results */}
      <AnimatePresence mode="wait">
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-5"
          >
            {/* Sentiment Badge */}
            <div className={`flex items-center gap-4 p-5 rounded-xl border ${sentimentConfig[result.sentiment].bgClass} ${sentimentConfig[result.sentiment].borderClass}`}>
              {(() => {
                const Icon = sentimentConfig[result.sentiment].icon;
                return <Icon className={`w-10 h-10 ${sentimentConfig[result.sentiment].colorClass}`} />;
              })()}
              <div>
                <p className={`text-2xl font-bold font-display ${sentimentConfig[result.sentiment].colorClass}`}>
                  {result.sentiment}
                </p>
                <p className="text-sm text-muted-foreground">
                  Confidence: {result.confidence}%
                </p>
              </div>
              <div className="ml-auto text-right">
                <div className="flex items-center gap-3 text-sm">
                  <span className="text-positive font-mono">+{result.positiveScore.toFixed(1)}</span>
                  <span className="text-muted-foreground">/</span>
                  <span className="text-negative font-mono">-{result.negativeScore.toFixed(1)}</span>
                </div>
              </div>
            </div>

            {/* Confidence Bar */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Negative</span>
                <span>Neutral</span>
                <span>Positive</span>
              </div>
              <div className="h-3 rounded-full bg-muted overflow-hidden flex">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(result.negativeScore / Math.max(result.positiveScore + result.negativeScore, 1)) * 100}%` }}
                  className="bg-negative rounded-l-full"
                  transition={{ duration: 0.6, ease: "easeOut" }}
                />
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(result.positiveScore / Math.max(result.positiveScore + result.negativeScore, 1)) * 100}%` }}
                  className="bg-positive rounded-r-full"
                  transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
                />
              </div>
            </div>

            {/* Token Highlighting */}
            <div className="p-4 rounded-lg bg-code">
              <p className="text-xs text-muted-foreground mb-2 font-mono">Token Analysis</p>
              <div className="flex flex-wrap gap-1.5">
                {result.highlightedTokens.map((t, i) => {
                  const colors = {
                    positive: "bg-positive/20 text-positive border-positive/30",
                    negative: "bg-negative/20 text-negative border-negative/30",
                    negator: "bg-primary/20 text-primary border-primary/30",
                    intensifier: "bg-secondary/20 text-secondary border-secondary/30",
                    neutral: "text-muted-foreground",
                  };
                  return (
                    <motion.span
                      key={i}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.03 }}
                      className={`px-2 py-0.5 rounded text-xs font-mono ${colors[t.type]} ${t.type !== 'neutral' ? 'border' : ''}`}
                    >
                      {t.word}
                    </motion.span>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
