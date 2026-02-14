
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
      'A list of 3-5 engaging blog post ideas tailored to the farm, customers, and events.'
    ),
  draftBlogPost: z
    .string()
    .describe(
      'A draft blog post of at least 3 paragraphs, generated based on one of the suggested ideas or a general relevant topic.'
    ),
});
export type AiBlogContentAssistantOutput = z.infer<typeof AiBlogContentAssistantOutputSchema>;

const blogAssistantPrompt = ai.definePrompt({
  name: 'blogAssistantPrompt',
  input: {schema: AiBlogContentAssistantInputSchema},
  output: {
    schema: AiBlogContentAssistantOutputSchema,
  },
  prompt: `You are an expert blog assistant for farmers. Your task is to generate blog content based on the provided farm details. You MUST output a valid JSON object that strictly follows the provided output schema.

Farm Details:
- Farm Produce: {{#if farmProduce}} {{#each farmProduce}} {{{this}}}{{#unless @last}}, {{/unless}}{{/each}} {{else}} Not provided {{/if}}
- Target Customers: {{#if customerSegments}} {{#each customerSegments}} {{{this}}}{{#unless @last}}, {{/unless}}{{/each}} {{else}} Not provided {{/if}}
- Regional Events: {{#if regionalEvents}} {{#each regionalEvents}} {{{this}}}{{#unless @last}}, {{/unless}}{{/each}} {{else}} Not provided {{/if}}
{{#if topicPreference}}- Topic Preference: {{{topicPreference}}}{{/if}}

Your Tasks:
1.  Generate an array of 3 to 5 engaging blog post titles and store it in the 'suggestedIdeas' field.
2.  Select the most compelling idea (or use the topic preference) and write a complete, well-structured draft blog post of at least three paragraphs. Store this draft in the 'draftBlogPost' field.`,
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
