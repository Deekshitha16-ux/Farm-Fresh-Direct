'use server';
/**
 * @fileOverview An AI-powered blog assistant for farmers.
 *
 * - aiBlogContentAssistant - A function that suggests blog content ideas and generates draft blog posts.
 * - AiBlogContentAssistantInput - The input type for the aiBlogContentAssistant function.
 * - AiBlogContentAssistantOutput - The return type for the aiBlogContent-assistant function.
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
  output: {
    schema: AiBlogContentAssistantOutputSchema,
  },
  prompt: `You are an AI-powered blog assistant for a farmer. Your task is to generate blog content ideas and a draft post.

First, you will be given information about the farm's produce, target customers, and regional events.
Analyze this information carefully.

Based on your analysis, you must perform two tasks:
1.  Suggest three to five engaging blog post ideas that are relevant and appealing.
2.  Choose one of your suggested ideas (or the farmer's preferred topic if provided) and write a complete, well-structured draft blog post of at least 3 paragraphs.

The provided information is:
-   **Farm Produce:**
    {{#each farmProduce}}
    -   {{{this}}}
    {{/each}}

-   **Target Customer Segments:**
    {{#each customerSegments}}
    -   {{{this}}}
    {{/each}}

-   **Regional Events:**
    {{#each regionalEvents}}
    -   {{{this}}}
    {{/each}}

{{#if topicPreference}}
-   **Farmer's Topic Preference:** {{{topicPreference}}}. You should prioritize this topic for the draft blog post.
{{/if}}

IMPORTANT: Your final output must be a single, valid JSON object that strictly adheres to the following structure. Do not add any text or formatting outside of this JSON object.
{
  "suggestedIdeas": [
    "string"
  ],
  "draftBlogPost": "string"
}`,
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
