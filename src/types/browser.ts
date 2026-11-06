export type SearchEngine = 'walow-ai' | 'google' | 'bing' | 'duckduckgo';

export interface Tab {
  id: string;
  title: string;
  url: string;
  isLoading: boolean;
  history: string[];
  historyIndex: number;
  isIncognito: boolean;
}

export interface Bookmark {
  id: string;
  title: string;
  url: string;
}

export interface HistoryItem {
  id: string;
  title: string;
  url: string;
  timestamp: number;
}

export const SEARCH_ENGINES: Record<SearchEngine, { name: string; buildUrl: (q: string) => string }> = {
  'walow-ai': { name: 'Walow AI', buildUrl: (q) => `https://www.google.com/search?igu=1&q=${encodeURIComponent(q)}` },
  google: { name: 'Google', buildUrl: (q) => `https://www.google.com/search?igu=1&q=${encodeURIComponent(q)}` },
  bing: { name: 'Bing', buildUrl: (q) => `https://www.bing.com/search?q=${encodeURIComponent(q)}` },
  duckduckgo: { name: 'DuckDuckGo', buildUrl: (q) => `https://duckduckgo.com/?q=${encodeURIComponent(q)}` },
};
