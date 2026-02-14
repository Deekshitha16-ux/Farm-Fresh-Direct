'use server';
/**
 * @fileOverview An AI agent that generates appealing product descriptions for fresh produce.
 *
 * - aiProduceDescriptionGenerator - A function that handles the produce description generation process.
 * - ProduceDescriptionInput - The input type for the aiProduceDescriptionGenerator function.
 * - ProduceDescriptionOutput - The return type for the aiProduceDescriptionGenerator function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ProduceDescriptionInputSchema = z.object({
  produceType: z
    .string()
    .describe('The type of produce (e.g., "Organic heirloom tomatoes").'),
  origin: z
    .string()
    .describe('The origin of the produce (e.g., "Sunny Valley Farm, California").'),
  uniqueQualities: z
    .string()
    .describe(
      'Unique qualities or selling points of the produce (e.g., "Sweet and juicy, perfect for salads, hand-picked at peak ripeness").'
    ),
});
export type ProduceDescriptionInput = z.infer<typeof ProduceDescriptionInputSchema>;

const ProduceDescriptionOutputSchema = z.object({
  description: z.string().describe('The appealing and informative product description.'),
});
export type ProduceDescriptionOutput = z.infer<typeof ProduceDescriptionOutputSchema>;

export async function aiProduceDescriptionGenerator(
  input: ProduceDescriptionInput
): Promise<ProduceDescriptionOutput> {
  return produceDescriptionGeneratorFlow(input);
}

const produceDescriptionPrompt = ai.definePrompt({
  name: 'produceDescriptionPrompt',
  input: {schema: ProduceDescriptionInputSchema},
  output: {schema: ProduceDescriptionOutputSchema},
  prompt: `You are a marketing expert specializing in fresh produce. Your task is to write an appealing and informative product description for the following produce. Highlight its key features and unique qualities to entice customers.

Produce Type: {{{produceType}}}
Origin: {{{origin}}}
Unique Qualities: {{{uniqueQualities}}}

Write a compelling product description:`,
});

const produceDescriptionGeneratorFlow = ai.defineFlow(
  {
    name: 'produceDescriptionGeneratorFlow',
    inputSchema: ProduceDescriptionInputSchema,
    outputSchema: ProduceDescriptionOutputSchema,
  },
  async input => {
    const {output} = await produceDescriptionPrompt(input);
    return output!;
  }
);
