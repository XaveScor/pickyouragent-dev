export interface TierLimits {
  tier: string;           // e.g., "Pro", "Max", "Plus"
  fiveHours: string;      // limit per 5 hours, e.g., "100 messages", "1M tokens"
  oneWeek: string;        // limit per 1 week, e.g., "500 messages", "10M tokens"
}

export interface SubscriptionService {
  id: string;
  name: string;
  url: string;
  description?: string;
  pros: string[];
  cons: string[];
  limits?: TierLimits[];  // array of tier limits
}

// Shared subscription service objects
export const zai: SubscriptionService = {
  id: "zai",
  name: "z.ai",
  url: "https://z.ai/subscribe?ic=9GRH0KS07Z",
  description: "Creator of the <a href=\"https://z.ai/blog/glm-4.7\" target=\"_blank\" rel=\"noopener noreferrer\">GLM model family<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"12\" height=\"12\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6\"></path><polyline points=\"15 3 21 3 21 9\"></polyline><line x1=\"10\" y1=\"14\" x2=\"21\" y2=\"3\"></line></svg></a>. Offers all GLM models via OpenAI/Anthropic-compatible APIs. Subscription includes web-search and web-parse MCPs.",
  pros: [
    "Very generous token limits (up to ~800M tokens)",
    "Strong coding capabilities (73.8% SWE-bench)",
  ],
  cons: [
    "Model slightly weaker than Opus 4.5/GPT-5.2",
    "Higher latency (3-10s to first token)",
  ],
  limits: [
    { tier: "Lite", fiveHours: "40M tokens", oneWeek: "unlimited" },
    { tier: "Pro", fiveHours: "200M tokens", oneWeek: "unlimited" },
    { tier: "Max", fiveHours: "800M tokens", oneWeek: "unlimited" },
  ],
};

export const claudeMax: SubscriptionService = {
  id: "claude-max",
  name: "Claude Max",
  url: "https://claude.com/pricing/max",
  description: "Creator of SOTA Opus/Sonnet models. Offers <a href=\"https://she-llac.com/claude-limits\" target=\"_blank\" rel=\"noopener noreferrer\">generous limits<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"12\" height=\"12\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6\"></path><polyline points=\"15 3 21 3 21 9\"></polyline><line x1=\"10\" y1=\"14\" x2=\"21\" y2=\"3\"></line></svg></a> compared to API token costs.",
  pros: [
    "SOTA models (Opus 4.5, Sonnet 4)",
    "~80% cheaper than API usage",
  ],
  cons: [
    "Restricted to Claude Code only",
  ],
  limits: [
    { tier: "Pro", fiveHours: "550K credits (1×)", oneWeek: "5M credits (1×)" },
    { tier: "Max 5×", fiveHours: "3.3M credits (6×)", oneWeek: "41.7M credits (8.3×)" },
    { tier: "Max 20×", fiveHours: "11M credits (20×)", oneWeek: "83.3M credits (16.7×)" },
  ],
};

export const openai: SubscriptionService = {
  id: "openai",
  name: "OpenAI",
  url: "https://chatgpt.com/pricing/",
  description: "Creator of SOTA GPT-family models. Offers generous limits compared to API costs.",
  pros: [
    "Works with any agent",
    "Specialized coding model (Codex)",
    "~80% cheaper than API usage",
  ],
  cons: [
    "No $100 tier — only $20 or $200 plans",
  ],
};

export const copilot: SubscriptionService = {
  id: "copilot",
  name: "GitHub Copilot",
  url: "https://github.com/features/copilot/plans",
  description: "GitHub's AI coding assistant",
  pros: [
    "TBD - add your pros here",
  ],
  cons: [
    "TBD - add your cons here",
  ],
};

// Backward compatibility alias
export type SubscriptionLink = SubscriptionService;
