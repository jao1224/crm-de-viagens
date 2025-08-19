'use server'

/**
 * @fileOverview An intelligent travel package recommendation AI agent.
 *
 * - travelPackageRecommendation - A function that handles the travel package recommendation process.
 * - TravelPackageRecommendationInput - The input type for the travelPackageRecommendation function.
 * - TravelPackageRecommendationOutput - The return type for the travelPackageRecommendation function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const TravelPackageRecommendationInputSchema = z.object({
  packageDetails: z
    .string()
    .describe(
      'Details of the travel package the user is currently viewing or has searched for.'
    ),
  userPreferences: z.string().optional().describe('The user preferences for travel.'),
});
export type TravelPackageRecommendationInput = z.infer<typeof TravelPackageRecommendationInputSchema>;

const TravelPackageRecommendationOutputSchema = z.object({
  recommendedPackages: z
    .string()
    .describe('A list of recommended travel packages based on the input package details and user preferences.'),
});
export type TravelPackageRecommendationOutput = z.infer<typeof TravelPackageRecommendationOutputSchema>;

export async function travelPackageRecommendation(input: TravelPackageRecommendationInput): Promise<TravelPackageRecommendationOutput> {
  return travelPackageRecommendationFlow(input);
}

const prompt = ai.definePrompt({
  name: 'travelPackageRecommendationPrompt',
  input: {schema: TravelPackageRecommendationInputSchema},
  output: {schema: TravelPackageRecommendationOutputSchema},
  prompt: `You are an expert travel agent specializing in personalized travel package recommendations.

You will use the following information to recommend similar travel packages to the user.

Package Details: {{{packageDetails}}}
User Preferences: {{{userPreferences}}}

Based on the package details and user preferences, recommend a list of similar travel packages.`,
});

const travelPackageRecommendationFlow = ai.defineFlow(
  {
    name: 'travelPackageRecommendationFlow',
    inputSchema: TravelPackageRecommendationInputSchema,
    outputSchema: TravelPackageRecommendationOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
