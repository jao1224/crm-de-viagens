// use server'

/**
 * @fileOverview An intelligent property recommendation AI agent.
 *
 * - propertyRecommendation - A function that handles the property recommendation process.
 * - PropertyRecommendationInput - The input type for the propertyRecommendation function.
 * - PropertyRecommendationOutput - The return type for the propertyRecommendation function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PropertyRecommendationInputSchema = z.object({
  propertyDetails: z
    .string()
    .describe(
      'Details of the property the user is currently viewing or has searched for.'
    ),
  userPreferences: z.string().optional().describe('The user preferences.'),
});
export type PropertyRecommendationInput = z.infer<typeof PropertyRecommendationInputSchema>;

const PropertyRecommendationOutputSchema = z.object({
  recommendedProperties: z
    .string()
    .describe('A list of recommended properties based on the input property details and user preferences.'),
});
export type PropertyRecommendationOutput = z.infer<typeof PropertyRecommendationOutputSchema>;

export async function propertyRecommendation(input: PropertyRecommendationInput): Promise<PropertyRecommendationOutput> {
  return propertyRecommendationFlow(input);
}

const prompt = ai.definePrompt({
  name: 'propertyRecommendationPrompt',
  input: {schema: PropertyRecommendationInputSchema},
  output: {schema: PropertyRecommendationOutputSchema},
  prompt: `You are an expert real estate agent specializing in property recommendations.

You will use the following information to recommend similar properties to the user.

Property Details: {{{propertyDetails}}}
User Preferences: {{{userPreferences}}}

Based on the property details and user preferences, recommend a list of similar properties.`,
});

const propertyRecommendationFlow = ai.defineFlow(
  {
    name: 'propertyRecommendationFlow',
    inputSchema: PropertyRecommendationInputSchema,
    outputSchema: PropertyRecommendationOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
