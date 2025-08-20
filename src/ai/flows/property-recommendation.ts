
'use server';

/**
 * @fileOverview An intelligent travel package recommendation AI agent.
 *
 * - recommendPackages - A function that handles the travel package recommendation process.
 * - RecommendPackagesInput - The input type for the recommendPackages function.
 * - RecommendPackagesOutput - The return type for the recommendPackages function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import { mockTravelPackages } from '@/lib/mock-data';
import type { TravelPackage } from '@/lib/types';


// Serialize only essential package information for the prompt
const packageInfoForPrompt = mockTravelPackages.map(p => ({
  id: p.id,
  title: p.title,
  destination: p.destination,
  type: p.type,
  duration: p.duration,
  price: p.price,
  status: p.status,
}) satisfies Partial<TravelPackage>);


const RecommendPackagesInputSchema = z.object({
  clientRequest: z.string().describe('The full text of the client\'s travel request, including destination, budget, interests, duration, etc.'),
});
export type RecommendPackagesInput = z.infer<typeof RecommendPackagesInputSchema>;


const RecommendedPackageSchema = z.object({
    packageId: z.string().describe('The unique ID of the recommended travel package.'),
    justification: z.string().describe('A brief explanation of why this package is a good fit for the client.'),
});

const RecommendPackagesOutputSchema = z.object({
  recommendedPackages: z.array(RecommendedPackageSchema).describe('A list of 2-3 recommended package IDs with justifications.'),
  proposalText: z.string().describe('A friendly and persuasive draft text to send to the client, presenting the recommended options. Use Markdown for light formatting (e.g., bold). Start with a greeting and end with a call to action.'),
});
export type RecommendPackagesOutput = z.infer<typeof RecommendPackagesOutputSchema>;

export async function recommendPackages(input: RecommendPackagesInput): Promise<RecommendPackagesOutput> {
  return recommendPackagesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'recommendPackagesPrompt',
  input: {schema: RecommendPackagesInputSchema},
  output: {schema: RecommendPackagesOutputSchema},
  prompt: `Você é um assistente de vendas especialista em uma agência de viagens de luxo. Sua tarefa é analisar a solicitação de um cliente e recomendar os 2 ou 3 melhores pacotes de viagem da nossa lista, além de criar um rascunho de proposta para enviar ao cliente.

**INSTRUÇÕES:**

1.  **Analise a Solicitação:** Leia atentamente a solicitação do cliente para entender suas necessidades, desejos, orçamento e restrições.
2.  **Consulte os Pacotes Disponíveis:** Analise a lista de pacotes JSON abaixo. Considere título, destino, tipo, duração, preço e status (apenas pacotes 'Disponível').
3.  **Selecione os Melhores Pacotes:** Escolha os 2 ou 3 pacotes que melhor correspondem à solicitação. Para cada pacote escolhido, forneça o \`packageId\` e uma \`justification\` clara e concisa do porquê ele é uma boa opção.
4.  **Crie o Texto da Proposta:** Escreva um texto amigável e persuasivo (\`proposalText\`) para ser enviado ao cliente.
    *   O texto deve ser limpo, coeso e profissional, pronto para ser copiado e colado.
    *   **NÃO** inclua o "packageId" ou qualquer outra informação técnica no texto da proposta. Apenas o nome do pacote e a justificativa.
    *   Use Markdown para formatação leve (negrito para os nomes dos pacotes, por exemplo), mas evite excessos como '***'.
    *   Comece com uma saudação calorosa.
    *   Mencione que você analisou a solicitação dele.
    *   Apresente os pacotes recomendados de forma atraente, usando as justificativas que você criou.
    *   Termine com uma chamada para ação, convidando o cliente a conversar sobre as opções.

---

**PACOTES DISPONÍVEIS (JSON):**
\`\`\`json
{{{json packages}}}
\`\`\`

---

**SOLICITAÇÃO DO CLIENTE:**
"{{{clientRequest}}}"
`,
});

const recommendPackagesFlow = ai.defineFlow(
  {
    name: 'recommendPackagesFlow',
    inputSchema: RecommendPackagesInputSchema,
    outputSchema: RecommendPackagesOutputSchema,
  },
  async input => {
    const {output} = await prompt({
        ...input,
        packages: packageInfoForPrompt,
    });
    return output!;
  }
);
