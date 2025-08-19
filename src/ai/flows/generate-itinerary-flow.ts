'use server';
/**
 * @fileOverview An intelligent itinerary generation AI agent.
 *
 * - generateItinerary - A function that handles the itinerary generation process.
 * - GenerateItineraryInput - The input type for the generateItinerary function.
 * - GenerateItineraryOutput - The return type for the generateItinerary function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateItineraryInputSchema = z.object({
  title: z.string().describe('The title of the itinerary.'),
  packageTitle: z.string().describe('The title of the travel package associated with the itinerary.'),
});
export type GenerateItineraryInput = z.infer<typeof GenerateItineraryInputSchema>;

const GenerateItineraryOutputSchema = z.object({
  description: z.string().describe('A detailed day-by-day itinerary description, including activities, tours, and suggestions. Use Markdown for formatting, especially for titles (e.g., **Dia 1:**).'),
});
export type GenerateItineraryOutput = z.infer<typeof GenerateItineraryOutputSchema>;

export async function generateItinerary(input: GenerateItineraryInput): Promise<GenerateItineraryOutput> {
  return generateItineraryFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateItineraryPrompt',
  input: {schema: GenerateItineraryInputSchema},
  output: {schema: GenerateItineraryOutputSchema},
  prompt: `Você é um especialista em criar roteiros de viagem detalhados e envolventes.

Sua tarefa é criar uma descrição de roteiro de viagem com base no título e no pacote de viagem fornecido.

A descrição deve ser detalhada, organizada por dias (ex: **Dia 1:**, **Dia 2:**, etc.) e incluir sugestões de atividades, passeios e dicas relevantes para o destino. A formatação deve usar Markdown para negrito nos títulos dos dias.

Título do Roteiro: {{{title}}}
Pacote de Viagem: {{{packageTitle}}}

Gere a descrição do roteiro.`,
});

const generateItineraryFlow = ai.defineFlow(
  {
    name: 'generateItineraryFlow',
    inputSchema: GenerateItineraryInputSchema,
    outputSchema: GenerateItineraryOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
