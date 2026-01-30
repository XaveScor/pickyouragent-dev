export interface SubscriptionService {
  id: string;
  name: string;
  url: string;
  description?: string;
  pros: string[];
  cons: string[];
}

// Shared subscription service objects
export const zai: SubscriptionService = {
  id: "zai",
  name: "z.ai",
  url: "https://z.ai/subscribe?ic=9GRH0KS07Z",
  description: "Fixed price API provider with GLM Coding Plan",
  pros: [
    "Very cheap",
    "Middle quality model",
  ],
  cons: [
    "High latency",
  ],
};

export const claudeMax: SubscriptionService = {
  id: "claude-max",
  name: "Claude Max",
  url: "https://claude.com/pricing/max",
  description: "Anthropic's premium subscription",
  pros: [
    "TBD - add your pros here",
  ],
  cons: [
    "TBD - add your cons here",
  ],
};

export const openai: SubscriptionService = {
  id: "openai",
  name: "OpenAI",
  url: "https://chatgpt.com/pricing/",
  description: "OpenAI's subscription plans",
  pros: [
    "TBD - add your pros here",
  ],
  cons: [
    "TBD - add your cons here",
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
