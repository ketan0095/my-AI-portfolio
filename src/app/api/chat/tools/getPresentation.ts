import { tool } from 'ai';
import { z } from 'zod';

export const getPresentation = tool({
  description:
    'This tool returns a concise personal introduction of Ketan Shetye. It is used to answer the question "Who are you?" or "Tell me about yourself"',
  parameters: z.object({}),
  execute: async () => {
    return {
      presentation:
        "I'm Ketan Shetye, a 21-year-old developer specializing in AI at 42 Paris. Formerly a high-level mountain biker, I now intern at LightOn AI in Paris. I'm passionate about AI, tech, Entrepreneurship and SaaS tech.",
    };
  },
});
