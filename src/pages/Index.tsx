import { useState } from "react";
import { motion } from "framer-motion";
import SentimentAnalyzer from "@/components/SentimentAnalyzer";
import PipelineDemo from "@/components/PipelineDemo";
import GranularitySection from "@/components/GranularitySection";
import ApplicationsSection from "@/components/ApplicationsSection";
import { Brain, Cpu, Layers, BarChart3, ChevronDown, Github, BookOpen, Zap, Database, GitBranch } from "lucide-react";

const navItems = [
  { id: "analyzer", label: "Analyzer", icon: Brain },
  { id: "pipeline", label: "NLP Pipeline", icon: Cpu },
  { id: "granularity", label: "Granularity", icon: Layers },
  { id: "applications", label: "Applications", icon: BarChart3 },
];

const methods = [
  { name: "Naïve Bayes", type: "ML", desc: "Probabilistic classifier based on Bayes' theorem" },
  { name: "SVM", type: "ML", desc: "Finds optimal hyperplane for classification" },
  { name: "Logistic Regression", type: "ML", desc: "Linear model for binary/multiclass tasks" },
  { name: "Lexicon-Based", type: "Rule", desc: "Uses predefined sentiment dictionaries" },
  { name: "BERT", type: "DL", desc: "Transformer-based contextual understanding" },
];

const features = [
  { name: "Bag of Words", desc: "Counts word occurrences as features" },
  { name: "TF-IDF", desc: "Weighs important words more heavily" },
  { name: "Word2Vec", desc: "Dense vector representations of words" },
  { name: "GloVe", desc: "Global word co-occurrence statistics" },
];

const Index = () => {
  const [activeSection, setActiveSection] = useState("analyzer");

  const scrollTo = (id: string) => {
    setActiveSection(id);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between h-14">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-hero flex items-center justify-center">
              <Brain className="w-4.5 h-4.5 text-primary-foreground" />
            </div>
            <span className="font-display font-bold text-sm">OpinionNLP</span>
          </div>
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  activeSection === item.id
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <item.icon className="w-3.5 h-3.5" />
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero opacity-[0.03]" />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-24 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium mb-6">
              <Zap className="w-3 h-3" />
              NLP Sentiment Analysis Project
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-display leading-[1.1] mb-4">
              Opinion Mining
              <br />
              <span className="text-gradient-hero">Using Basic NLP</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl mb-8">
              An interactive exploration of sentiment analysis techniques — from text preprocessing to classification and real-world applications.
            </p>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => scrollTo("analyzer")}
                className="px-5 py-2.5 rounded-lg bg-gradient-hero text-primary-foreground font-display font-semibold text-sm flex items-center gap-2 hover:opacity-90 transition-opacity shadow-glow-primary"
              >
                Try the Analyzer
                <ChevronDown className="w-4 h-4" />
              </button>
              <button
                onClick={() => scrollTo("pipeline")}
                className="px-5 py-2.5 rounded-lg bg-card border border-border text-foreground font-display font-semibold text-sm flex items-center gap-2 hover:bg-muted transition-colors"
              >
                <BookOpen className="w-4 h-4" />
                Explore Pipeline
              </button>
            </div>
          </motion.div>

          {/* Floating cards */}
          <div className="hidden lg:block absolute right-8 top-20">
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="p-4 rounded-xl bg-card border border-border shadow-elevated w-56"
            >
              <p className="text-xs font-mono text-muted-foreground mb-1">sentiment_result:</p>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-positive animate-pulse-glow" />
                <span className="text-sm font-bold text-positive">Positive</span>
                <span className="text-xs text-muted-foreground ml-auto">94%</span>
              </div>
            </motion.div>
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="p-4 rounded-xl bg-card border border-border shadow-elevated w-48 mt-4 ml-12"
            >
              <p className="text-xs font-mono text-muted-foreground mb-1">tokens:</p>
              <div className="flex flex-wrap gap-1">
                {["amazing", "loved", "it"].map((w) => (
                  <span key={w} className="px-2 py-0.5 rounded bg-positive/10 text-positive text-xs font-mono">{w}</span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Sentiment Analyzer Section */}
      <section id="analyzer" className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
        <SectionHeader
          badge="Interactive Demo"
          title="Sentiment Analyzer"
          subtitle="Enter any text and see real-time lexicon-based sentiment analysis with token highlighting"
        />
        <div className="max-w-3xl mx-auto">
          <SentimentAnalyzer />
        </div>
      </section>

      {/* NLP Pipeline Section */}
      <section id="pipeline" className="bg-muted/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
          <SectionHeader
            badge="Text Preprocessing"
            title="NLP Processing Pipeline"
            subtitle="Watch text get transformed step-by-step through tokenization, stopword removal, and lemmatization"
          />
          <div className="max-w-3xl mx-auto mb-16">
            <PipelineDemo />
          </div>

          {/* Feature Extraction & Classification */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* Feature Extraction */}
            <div>
              <h3 className="text-lg font-bold font-display mb-4 flex items-center gap-2">
                <Database className="w-5 h-5 text-primary" />
                Feature Extraction
              </h3>
              <div className="space-y-3">
                {features.map((f, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="p-4 rounded-lg bg-card border border-border shadow-card"
                  >
                    <h4 className="text-sm font-bold font-display">{f.name}</h4>
                    <p className="text-xs text-muted-foreground mt-1">{f.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Classification Methods */}
            <div>
              <h3 className="text-lg font-bold font-display mb-4 flex items-center gap-2">
                <GitBranch className="w-5 h-5 text-primary" />
                Classification Methods
              </h3>
              <div className="space-y-3">
                {methods.map((m, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="p-4 rounded-lg bg-card border border-border shadow-card flex items-center gap-3"
                  >
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold font-mono ${
                      m.type === 'ML' ? 'bg-primary/10 text-primary' :
                      m.type === 'DL' ? 'bg-accent/10 text-accent' :
                      'bg-secondary/10 text-secondary'
                    }`}>
                      {m.type}
                    </span>
                    <div>
                      <h4 className="text-sm font-bold font-display">{m.name}</h4>
                      <p className="text-xs text-muted-foreground">{m.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Granularity Section */}
      <section id="granularity" className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
        <SectionHeader
          badge="Analysis Levels"
          title="Levels of Granularity"
          subtitle="Opinion mining operates at document, sentence, and aspect levels for different depth of insight"
        />
        <GranularitySection />
      </section>

      {/* Applications Section */}
      <section id="applications" className="bg-muted/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
          <SectionHeader
            badge="Impact"
            title="Applications & Challenges"
            subtitle="Where opinion mining is used and the challenges it faces"
          />
          <ApplicationsSection />
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-xs text-muted-foreground">
            Opinion Mining Using Basic NLP Techniques — An interactive educational project
          </p>
        </div>
      </footer>
    </div>
  );
};

function SectionHeader({ badge, title, subtitle }: { badge: string; title: string; subtitle: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-center mb-12"
    >
      <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium mb-3">
        {badge}
      </span>
      <h2 className="text-3xl font-bold font-display mb-2">{title}</h2>
      <p className="text-muted-foreground max-w-lg mx-auto text-sm">{subtitle}</p>
    </motion.div>
  );
}

export default Index;
