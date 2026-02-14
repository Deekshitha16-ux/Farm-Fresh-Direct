'use server';
/**
 * @fileOverview An AI-powered blog assistant for farmers.
 *
 * - aiBlogContentAssistant - A function that suggests blog content ideas and generates draft blog posts.
 * - AiBlogContentAssistantInput - The input type for the aiBlogContentAssistant function.
 * - AiBlogContentAssistantOutput - The return type for the aiBlogContentAssistant function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AiBlogContentAssistantInputSchema = z.object({
  farmProduce: z
    .array(z.string())
    .describe("A list of produce items available from the farmer's farm."),
  customerSegments: z
    .array(z.string())
    .describe(
      "A list of target customer segments for the farm's produce (e.g., 'health-conscious families', 'local restaurants')."
    ),
  regionalEvents: z
    .array(z.string())
    .describe(
      "A list of relevant regional events or seasonal occurrences (e.g., 'local farmers market festival', 'harvest fair')."
    ),
  topicPreference: z
    .string()
    .optional()
    .describe(
      "An optional specific topic or theme the farmer would like the blog content to focus on (e.g., 'seasonal recipes', 'sustainability practices')."
    ),
});
export type AiBlogContentAssistantInput = z.infer<typeof AiBlogContentAssistantInputSchema>;

const AiBlogContentAssistantOutputSchema = z.object({
  suggestedIdeas: z
    .array(z.string())
    .describe(
      'A list of engaging blog post ideas tailored to the farm, customers, and events.'
    ),
  draftBlogPost: z
    .string()
    .describe(
      'A draft blog post, generated based on one of the suggested ideas or a general relevant topic.'
    ),
});
export type AiBlogContentAssistantOutput = z.infer<typeof AiBlogContentAssistantOutputSchema>;

const blogAssistantPrompt = ai.definePrompt({
  name: 'blogAssistantPrompt',
  input: {schema: AiBlogContentAssistantInputSchema},
  output: {schema: AiBlogContentAssistantOutputSchema},
  prompt: `You are an AI-powered blog assistant for a farmer. Your goal is to help the farmer create engaging marketing content to attract more customers.\n\nBased on the farm's produce, target customer segments, and regional events, you need to:\n1.  Suggest 3-5 relevant and attractive blog post ideas.\n2.  Generate a draft blog post for one of these ideas (or a general relevant topic).\n\nFarm Produce:\n{{#each farmProduce}}\n- {{{this}}}\n{{/each}}\n\nTarget Customer Segments:\n{{#each customerSegments}}\n- {{{this}}}\n{{/each}}\n\nRegional Events:\n{{#each regionalEvents}}\n- {{{this}}}\n{{/each}}\n\n{{#if topicPreference}}\nThe farmer has expressed a preference for content related to: {{{topicPreference}}}. Please consider this preference when generating ideas and the draft post.\n{{/if}}\n\nPlease format your response as a JSON object matching the following schema:\n\n\`\`\`json\n{{jsonSchema AiBlogContentAssistantOutputSchema}}\n\`\`\`\n`,
});

const aiBlogContentAssistantFlow = ai.defineFlow(
  {
    name: 'aiBlogContentAssistantFlow',
    inputSchema: AiBlogContentAssistantInputSchema,
    outputSchema: AiBlogContentAssistantOutputSchema,
  },
  async input => {
    const {output} = await blogAssistantPrompt(input);
    return output!;
  }
);

export async function aiBlogContentAssistant(
  input: AiBlogContentAssistantInput
): Promise<AiBlogContentAssistantOutput> {
  return aiBlogContentAssistantFlow(input);
}
