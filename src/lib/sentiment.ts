// Simple lexicon-based sentiment analyzer

const positiveWords = new Set([
  'good', 'great', 'excellent', 'amazing', 'wonderful', 'fantastic', 'awesome',
  'love', 'loved', 'loving', 'beautiful', 'best', 'brilliant', 'outstanding',
  'perfect', 'superb', 'incredible', 'magnificent', 'delightful', 'pleasant',
  'happy', 'glad', 'joy', 'joyful', 'exciting', 'excited', 'impressive',
  'recommend', 'recommended', 'enjoy', 'enjoyed', 'enjoyable', 'satisfied',
  'satisfying', 'remarkable', 'exceptional', 'terrific', 'positive', 'nice',
  'fine', 'cool', 'helpful', 'useful', 'easy', 'fast', 'quick', 'smooth',
  'clean', 'clear', 'elegant', 'efficient', 'reliable', 'solid', 'strong',
  'powerful', 'comfortable', 'convenient', 'friendly', 'warm', 'bright',
  'fresh', 'innovative', 'creative', 'superior', 'premium', 'quality',
]);

const negativeWords = new Set([
  'bad', 'terrible', 'horrible', 'awful', 'worst', 'poor', 'hate', 'hated',
  'ugly', 'boring', 'dull', 'disappointing', 'disappointed', 'frustrating',
  'frustrated', 'annoying', 'annoyed', 'angry', 'sad', 'unhappy', 'useless',
  'broken', 'slow', 'difficult', 'hard', 'confusing', 'confused', 'complicated',
  'expensive', 'cheap', 'weak', 'failure', 'failed', 'fail', 'wrong', 'error',
  'problem', 'issue', 'bug', 'crash', 'crashed', 'waste', 'wasted', 'painful',
  'ridiculous', 'stupid', 'horrible', 'dreadful', 'unpleasant', 'negative',
  'worse', 'inferior', 'mediocre', 'lacking', 'missing', 'delay', 'delayed',
  'overpriced', 'unreliable', 'uncomfortable', 'inconvenient', 'rude',
]);

const negators = new Set(['not', "n't", 'no', 'never', 'neither', 'nobody', 'nothing', 'nowhere', 'nor']);
const intensifiers = new Set(['very', 'extremely', 'incredibly', 'absolutely', 'really', 'so', 'highly', 'super', 'truly']);

export interface SentimentResult {
  sentiment: 'Positive' | 'Negative' | 'Neutral';
  confidence: number;
  positiveScore: number;
  negativeScore: number;
  tokens: string[];
  highlightedTokens: { word: string; type: 'positive' | 'negative' | 'negator' | 'intensifier' | 'neutral' }[];
}

export function analyzeSentiment(text: string): SentimentResult {
  const cleaned = text.toLowerCase().replace(/[^a-z\s']/g, ' ');
  const tokens = cleaned.split(/\s+/).filter(t => t.length > 0);

  let positiveScore = 0;
  let negativeScore = 0;
  const highlightedTokens: SentimentResult['highlightedTokens'] = [];

  for (let i = 0; i < tokens.length; i++) {
    const word = tokens[i];
    const prevWord = i > 0 ? tokens[i - 1] : '';
    const isNegated = negators.has(prevWord) || prevWord.endsWith("n't");
    const isIntensified = intensifiers.has(prevWord);
    const multiplier = isIntensified ? 1.5 : 1;

    if (positiveWords.has(word)) {
      if (isNegated) {
        negativeScore += multiplier;
        highlightedTokens.push({ word, type: 'negative' });
      } else {
        positiveScore += multiplier;
        highlightedTokens.push({ word, type: 'positive' });
      }
    } else if (negativeWords.has(word)) {
      if (isNegated) {
        positiveScore += multiplier * 0.5;
        highlightedTokens.push({ word, type: 'positive' });
      } else {
        negativeScore += multiplier;
        highlightedTokens.push({ word, type: 'negative' });
      }
    } else if (negators.has(word)) {
      highlightedTokens.push({ word, type: 'negator' });
    } else if (intensifiers.has(word)) {
      highlightedTokens.push({ word, type: 'intensifier' });
    } else {
      highlightedTokens.push({ word, type: 'neutral' });
    }
  }

  const total = positiveScore + negativeScore;
  let sentiment: SentimentResult['sentiment'] = 'Neutral';
  let confidence = 0;

  if (total > 0) {
    const ratio = positiveScore / total;
    if (ratio > 0.6) {
      sentiment = 'Positive';
      confidence = Math.min(ratio * 100, 98);
    } else if (ratio < 0.4) {
      sentiment = 'Negative';
      confidence = Math.min((1 - ratio) * 100, 98);
    } else {
      sentiment = 'Neutral';
      confidence = 50 + Math.abs(0.5 - ratio) * 100;
    }
  } else {
    confidence = 30;
  }

  return {
    sentiment,
    confidence: Math.round(confidence),
    positiveScore,
    negativeScore,
    tokens,
    highlightedTokens,
  };
}

export function tokenize(text: string): string[] {
  return text.toLowerCase().replace(/[^a-z\s']/g, ' ').split(/\s+/).filter(t => t.length > 0);
}

export function removeStopwords(tokens: string[]): string[] {
  const stopwords = new Set(['the', 'is', 'at', 'which', 'on', 'a', 'an', 'and', 'or', 'but', 'in', 'with', 'to', 'for', 'of', 'it', 'this', 'that', 'was', 'are', 'be', 'has', 'had', 'have', 'do', 'does', 'did', 'will', 'would', 'could', 'should', 'may', 'might', 'can', 'shall', 'i', 'you', 'he', 'she', 'we', 'they', 'me', 'him', 'her', 'us', 'them', 'my', 'your', 'his', 'its', 'our', 'their']);
  return tokens.filter(t => !stopwords.has(t));
}

export function lemmatize(word: string): string {
  const lemmas: Record<string, string> = {
    running: 'run', runs: 'run', ran: 'run',
    loving: 'love', loves: 'love', loved: 'love',
    playing: 'play', plays: 'play', played: 'play',
    going: 'go', goes: 'go', went: 'go',
    better: 'good', best: 'good',
    worse: 'bad', worst: 'bad',
    amazing: 'amaze', amazed: 'amaze',
    disappointing: 'disappoint', disappointed: 'disappoint',
    frustrated: 'frustrate', frustrating: 'frustrate',
    excited: 'excite', exciting: 'excite',
  };
  if (lemmas[word]) return lemmas[word];
  if (word.endsWith('ing') && word.length > 4) return word.slice(0, -3);
  if (word.endsWith('ed') && word.length > 3) return word.slice(0, -2);
  if (word.endsWith('s') && !word.endsWith('ss') && word.length > 3) return word.slice(0, -1);
  return word;
}
