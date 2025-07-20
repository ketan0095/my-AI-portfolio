import { tool } from 'ai';
import { z } from 'zod';

export const getPresentation = tool({
  description:
    'This tool returns a concise personal introduction of Ketan Shetye. It is used to answer the question "Who are you?" or "Tell me about yourself"',
  parameters: z.object({}),
  execute: async () => {
    return {
      presentation:
        "I'm Ketan Shetye, a 25-year-old AI engineer from Melbourne, Australia. I'm deep into building real-time voice AI (currently at Sophiie, formerly Askgalore). I’m all about AI, automation, cool tech, and making SaaS products that turn wild ideas into reality.",
    };
  },
});
