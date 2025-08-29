
'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import type { Contract } from '@/lib/types';
import { Info } from 'lucide-react';
import RichTextEditor from '@/components/rich-text-editor';

const defaultContractTemplate = `Contrato de Prestação de Serviços de Turismo


Pelo presente instrumento particular, de um lado:

{DADOS_CLIENTE}, doravante denominada simplesmente ("CLIENTE");

{DADOS_AGENCIA}, doravante denominada simplesmente ("AGÊNCIA");

Resolvem assinar o presente contrato, que foi elaborado de acordo com a Lei n° 8.078, de 11 de setembro de 1990 (Código de Defesa do Consumidor), a Deliberação Normativa da Embratur nº. 161/85 e as normas da Associação Brasileira das Agências de Viagem, que contêm as cláusulas e condições seguintes:

PRIMEIRA – OBJETO DESTE CONTRATO – AQUISIÇÃO DE PACOTE TURÍSTICO OU PRODUTO AFIM

1.1. Os serviços ora adquiridos pelo CLIENTE encontram-se especificados no anexo Informações da Reserva, partes integrantes deste Contrato. A elaboração do mesmo tem o propósito de tornar transparente a relação de consumo que se estabelece entre as partes, e trazer ao CLIENTE, na forma do art. 31 do Código de Defesa do Consumidor, informações corretas, claras precisas e ostensivas sobre o produto e serviços, com suas características, como datas de partida e chegada, destino, roteiro, passeios, meios de transporte, hospedagem, classificação de acomodações, refeições, translados ("transfers"), preços e prazos de pagamento.

1.2. O contrato e as Informações da Reserva deverão ser lidos atentamente pelo CLIENTE para que o mesmo se certifique sobre o que está e não está incluído no preço. Consideram-se serviços integrantes do pacote turístico ou produto apenas aqueles que estejam expressamente mencionados como serviços inclusos e discriminados no anexo Informações da Reserva.

SEGUNDA - DOS SERVIÇOS E DESPESAS NÃO CONTRATADOS E QUE NÃO INTEGRAM O PRODUTO ADQUIRIDO

2.1. O produto ou pacote turístico ora adquirido não inclui taxa pró-turismo, despesas com expedição de passaportes e obtenção de vistos consulares, custo de vacinas, taxas com expedição e carregamento de bagagens e malas, atrativos como filmes de vídeo e TV a cabo, utilização e gastos em cassinos, despesas de caráter pessoal (cabeleireiro, massagista e manicura em hotéis, embarcações e outros locais, telefonemas, bebidas e produtos do frigobar, despesas extraordinárias em restaurantes, além das refeições previstas, quando incluídas no pacote), serviços de quarto, despesas decorrentes de diárias, refeições e deslocamentos, quando excedentes às incluídas no programa.

2.2. O preço do pacote, ajustado neste contrato, também não engloba passeios não expressamente mencionados no anexo Informações da Reserva, gorjetas, serviços de cofre, lavanderia em hotéis, pousadas, navios e cidades, dentre outras, que serão de responsabilidade exclusiva do CLIENTE e por ele diretamente pagas ao estabelecimento ou empresa prestador ou fornecedor, sem a responsabilidade da AGÊNCIA.

2.3 Exceto se expressamente mencionado no voucher ou contrato, os passeios opcionais não estão inclusos no preço contratado, não tendo a AGÊNCIA qualquer responsabilidade quanto sua contratação e execução.

TERCEIRA - DO PREÇO, DAS CONDIÇÕES DE PAGAMENTO, DAS CONSEQUÊNCIAS DA NÃO QUITAÇÃO

3.1. Os direitos e as obrigações que as partes estão mutuamente assumindo neste contrato começam a prevalecer a partir da data de sua assinatura e se efetivam no momento da confirmação da reserva, quando será feito o pagamento do preço do pacote turístico ou do produto discriminado.

3.2. A falta de pagamento de qualquer parcela do preço, quando divido, independentemente do motivo alegado, ensejará a cobrança de juros moratórios de 2% ao mês, correção pro rata tempore pelo Índice Geral de Preços (IGP), despesas com cobranças, honorários advocatícios e custas judiciais, quando necessária a propositura de ação. O mesmo direito vale também ao CLIENTE, caso este tenha algum valor para receber.

QUARTA – DAS OBRIGAÇÕES DA AGÊNCIA

4.1. Obriga-se a AGÊNCIA a:
a) Prestar informações claras e precisas ao CLIENTE, sobre o produto adquirido (dados do local de destino, passagens, hospedagens, refeições, traslados, preços, taxas e custos adicionais, dentre outros), que serão documentadas no anexo Informações da Reserva.

b) Restituir o valor até então pago pelo CLIENTE, em caso de cancelamento da viagem ou do fornecimento do produto, por iniciativa da AGÊNCIA ou da Operadora cujo pacote esteja intermediando. Esta restituição poderá ser compensada, integral ou parcialmente, pela concessão de crédito em outro(s) pacote(s), observado o limite do seu crédito.

c) Comunicar por escrito e com antecedência de até dois dias do início dos serviços ao CLIENTE, as eventuais alterações de dias ou horários de partida e chegada das viagens; modificações de categoria de apartamentos, acomodações, quartos, cabines ou assemelhados, hotéis, pousadas e estabelecimentos afins; mudanças de preço e de quaisquer outras informações constantes do anexo Informações da Reserva, permitindo-lhe(s) optar por escrito pela aceitação dessas alterações – com a adequação de preço, quando for o caso - ou cancelar sua reserva, com o reembolso ou compensação de crédito, observadas as cláusulas e exceções previstas neste contrato.

d) cumprir e fazer cumprir as cláusulas deste contrato e do anexo Informações da Reserva, que traz as especificações dos serviços contratados.

e) respeitar os direitos que o Código de Defesa do Consumidor reconhece ao CLIENTE, como consumidores de seus serviços.

QUINTA – DAS OBRIGAÇÕES DO CLIENTE

5.1. Conferir detalhadamente as informações constantes deste contrato e do anexo Informações da Reserva, tais como: data e local da saída e retorno, condições de pagamento, formas de transporte, tipo e categoria do meio de hospedagem e das acomodações (individual, duplo, triplo etc.), taxas extras, translados, roteiros, número de refeições, utilização de guias, entre outras.

5.2. Deixar de assinar este contrato e de adquirir o produto ou serviço oferecido pela AGÊNCIA caso as informações, especificações e dados, definidos de forma clara, transparente e objetiva neste instrumento e no anexo Informações da Reserva não corresponderem ao que ele, pretende comprar e usufruir.

5.3. Esclarecer suas dúvidas sobre qualquer especificação do produto ora adquirido diretamente junto à AGÊNCIA, solicitando explicações preferencialmente por escrito, para sua maior segurança.

5.4. Comunicar por escrito à AGÊNCIA, com a antecedência possível e mediante protocolo ou comprovante de recebimento, a ocasional desistência de adquirir o produto, no todo ou em parte, ficando desde logo ciente(s) de que a AGÊNCIA - ou a operadora, companhia aérea, rede hoteleira ou outra prestadora de serviços por ela intermediada - poderá reter e descontar, dos valores que serão restituídos ao(s), os percentuais relativos a despesas administrativas ou já comprovadamente, na forma prevista neste contrato.

5.5. Cumprir as cláusulas deste contrato e as instruções do anexo Informações da Reserva, quanto aos dias e horários de embarque, hospedagem, refeições, regulamentos, dentre outras, sob pena de vir a ser responsabilizado pessoalmente pelos prejuízos que ele próprio, CLIENTE, venha a sofrer e sob pena de arcar diretamente com a obrigação de ressarcir os danos materiais ou morais causados à AGÊNCIA, aos demais passageiros e a terceiros.

5.6. Abster de causar perturbação ou praticar atos que ofereçam risco a saúde, integridade física ou moral de quem quer que seja, sob pena de ser excluído da viagem, sem qualquer redução ou devolução do preço pago. Os desligamentos poderão ser feitos por prepostos da AGÊNCIA, da OPERADORA ou pelas autoridades competentes (motoristas de ônibus, comandantes de navio, avião, seguranças de hotéis e outros).

5.7. Efetuar o pagamento complementar em caso de não ser viabilizada a acomodação adquirida. Ex: Casos específicos de pacotes adquiridos em apartamento quádruplo ou triplo que não foi possível fechar na acomodação desejada.

5.8. Providenciar toda a documentação para viagem, como obtenção de passaporte, vistos consulares, vacinação, entre outros, junto aos órgãos responsáveis como a Polícia Federal, Consulados ou Embaixadas, ANAC etc.

5.9. O CLIENTE e seus acompanhantes devem identificar todas as suas malas, sacolas ou bolsas de mão com etiquetas que contenham seu(s) nome(s), endereço(s) completo(s) e telefone(s).

5.10. Caso o CLIENTE esteja adquirindo produtos e/ou serviços para si próprio e/ou seus familiares, empregados ou terceiros em geral que não estejam presentes no momento da assinatura do presente contrato, ficará ele, CLIENTE, responsável por dar ciência do presente contrato a todos eles, se responsabilizando pessoalmente pelo cumprimento de todas as normas, obrigações e deveres aqui presentes.

SEXTA – DO CANCELAMENTO E REEMBOLSOS

6.1. Entende-se por cancelamento a desistência da viagem e/ou do SERVIÇO contratado, bem como alteração de datas.

6.2. O cancelamento, ou alteração de data, deverá ser solicitado à AGÊNCIA por escrito (e-mail) e ser devidamente assinado pelo CLIENTE.

6.3. Na hipótese de não utilização dos SERVIÇOS já aprovados tendo sido as respectivas compras ou reservas já concluídas, como por exemplo: passagem aérea, hospedagem, aluguel de carro e outros, o CLIENTE deverá solicitar à AGÊNCIA seu reembolso, que seguirá as normas tarifárias e prazos estabelecidos pelos respectivos fornecedores dos serviços. O CLIENTE declara-se ciente de que há determinadas emissões ou reservas de serviços de viagem que não admitem reembolso pelos fornecedores, por razões diversas, como: tarifas, no-show, antecipação da reserva, etc., os quais serão previamente informados pela AGÊNCIA quando da apresentação do orçamento para aprovação do CLIENTE.

6.4. O reembolso dos serviços de viagem contratados emitidos através de cartões de crédito ocorrerá em crédito nas faturas emitidas pelas administradoras dos cartões, de acordo com os prazos, normas e procedimentos estabelecidos pelos fornecedores.
Na hipótese de cancelamento dos SERVIÇOS já concluídos de acordo com a aprovação do CLIENTE, haverá cobrança de taxa administrativa da AGÊNCIA.

6.5. A alteração de datas, com utilização do crédito dos serviços de viagem emitidos na data anterior, seguirá as normas tarifárias e prazos estabelecidos pelos respectivos fornecedores. O CLIENTE declara-se ciente de que há determinadas emissões ou reservas de serviços de viagens que não admitem alteração pelos fornecedores, por razões diversas, tais como: tarifas, no-show, antecipação da reserva, etc., os quais serão expressamente informados pela AGÊNCIA quando da apresentação do orçamento para aprovação do CLIENTE.

SÉTIMA – DA OCORRÊNCIA DE CASOS FORTUITOS E FORÇA MAIOR

7.1. Ocorrendo caso fortuito, assim entendidos aqueles não previstos e não possíveis de serem evitados pela AGÊNCIA e pela OPERADORA ou eventos de força maior (fenômenos da natureza, como tempestades, tufões, ciclones, enchentes, entre outros), que coloquem em risco a vida e a segurança do(s) CLIENTE, ou ainda situação de calamidade pública, perturbação da ordem, acidentes ou greves prejudiciais aos serviços de viagem, poderá a AGÊNCIA ou a OPERADORA cancelar a viagem, antes do seu início ou em seu curso, restituindo ao CLIENTE os valores correspondentes aos serviços não utilizados, sem acréscimo de multa, juros, correção ou pagamento de indenização a qualquer título.

7.2. Os atrasos e os cancelamentos de trajetos aéreos motivados por razões técnicas, operacionais, mecânicas ou meteorológicas, sobre os quais a AGÊNCIA ou a OPERADORA não possuam poder de previsão ou controle, estão incluídos nos casos fortuitos ou de força maior, que a isentam de responsabilidade civil ou criminal, na forma prevista no item anterior.

OITAVA – DOS MEIOS DE TRANSPORTE – CONDIÇÕES GERAIS

8.1. Os meios de transporte específicos que serão utilizados pelo CLIENTE, na viagem ou produto que está adquirindo através deste contrato, encontram-se devida e claramente definidos e especificados no anexo Informações da Reserva.

8.2. Podem ocorrer alterações no número do voo, horários, rotas e conexões, aeroportos de origem ou destino, inclusive alteração de aeronaves, de voo fretado para regular ou vice-versa, que são de responsabilidade da companhia área, quer por razões técnicas, operacionais ou climáticas.

8.3. Quando se tratar de avião fretado, não se admitirá o aproveitamento, desdobramento, transferência, reembolso de trecho não voado ou extensão do trecho original, em razão das condições específicas da contratação entre a AGÊNCIA, a OPERADORA e a companhia aérea.

8.4. O CLIENTE declara-se ciente, por este contrato, de que a responsabilidade civil e criminal que decorra do contrato de transporte aéreo, marítimo ou terrestre é da empresa de transporte.

8.5. Em viagens de avião, nacionais ou internacionais, há franquia para transporte de bagagem, é variável segundo cada companhia, cabendo ao CLIENTE conferir as condições de franquia no bilhete da passagem.

8.6. A AGÊNCIA não é responsável, na forma da lei, pelo eventual extravio de bagagens, nem pelo pagamento de excesso de peso.

8.7. Uma vez feito o check-in da passagem, a empresa aérea torna-se responsável pela bagagem do(s) passageiro(s) e deve indenizá-lo(s) em caso de extravio ou danos.

8.8. A AGÊNCIA limita-se a contratar empresas idôneas para que prestem ao(s) seu(s) CLIENTE(S) transportes por via aérea, rodoviária, ferroviária, marítima, pluvial ou lacustre, na categoria turística, com o emprego de aeronaves, navios, veículos, vagões, barcos etc. que devem estar em boas condições de funcionamento.

8.9. Essas empresas têm responsabilidade objetiva pela segurança dos passageiros e de suas bagagens, nos termos das leis e normas específicas, obrigando-se a dispor de apólice de seguro obrigatório para o eventual ressarcimento de danos materiais e físicos.

8.10. Na hipótese de voo fretado, o mesmo não deve ser utilizado para a realização de negócios, passeios ou visitas fora do roteiro da parte terrestre, pois as datas e horários, tanto da chegada, como da partida, podem ser alterados.

NONA – DA DOCUMENTAÇÃO DE VIAGEM.

9.1. O CLIENTE é o responsável e deve providenciar toda sua documentação de viagem nos termos das cláusulas seguintes.

9.1.1. Portar sempre seu documento pessoal, assim entendido o documento de identidade (RG) expedido por Secretaria de Segurança Pública Estadual e Passaporte (quando o destino for país estrangeiro), além de atestados de vacina (quando exigidos pelas autoridades do local de destino), não sendo aceitas cópias autenticadas, nem documentos de validade ou prazo de visto vencidos, ou rasgados e rasurados, carteiras de entidades classistas e certidões de nascimento ou casamento.

9.1.2. O passageiro se compromete a obter maiores informações sobre a documentação necessária junto à Polícia federal (www.dpf.gov.br) ou junto ao site do Tribunal de Justiça de cada Estado, especialmente com relação à autorização para menores de idade, tendo em vista que as normas sobre a matéria tem sido alteradas constantemente.

9.2. Se a documentação do CLIENTE não for apresentada na forma e com a procedência exigida pelas autoridades competentes, poderá haver proibição de embarque ou de ingresso no destino de origem, sem que caiba responsabilidade alguma à AGÊNCIA, que está cumprindo sua obrigação de informar o(s) seu(s) CLIENTE(S) sobre essas exigências, isentando-se de culpa caso ele(s) as descumpram por ação ou omissão.

DÉCIMA – DA HOSPEDAGEM EM GERAL

10.1. Os horários de ocupação e saídas dos apartamentos nos hotéis deverão ser rigorosamente cumpridos, estando sujeitos a variação segundo o local. Os horários de entrada e saída nos apartamentos dos hotéis, não podem deixar de ser respeitados em função dos horários de vôo (chegada ou partida). Caso o CLIENTE antecipe sua chegada ou retarde(m) sua saída, assumirá(ão) ele(s) próprio(s), às suas expensas exclusivas, as diferenças de preço e encargos e o eventual pagamento de diárias adicionais, junto ao estabelecimento hoteleiro, sem qualquer responsabilidade solidária ou subsidiária da AGÊNCIA.

10.2. Quando surgirem situações extraordinárias ou de cunho operacional, inicialmente não previstas e devidamente motivadas, que obriguem ou recomendem que a AGÊNCIA ou a OPERADORA altere os hotéis inicialmente indicados, para garantir a execução dos serviços contratados ou a segurança do(s) CLIENTE, estará ela autorizada a promover essa mudança, cabendo-lhe acomodar o(s) passageiro(s) em hotel de categoria similar ou superior ao contratado, com o que concorda(m) desde logo o(s) CLIENTE(S), não lhe(s) cabendo, nessa hipótese, qualquer direito a indenização ou cancelamento da viagem, a que título for.

10.3. A AGÊNCIA aconselha aos seus clientes para que mantenham, nos cofres dos hotéis, quantias em dinheiro superiores àquelas necessárias ao uso diário, documentos importantes, e demais objetos de alta estima ou valor. Na impossibilidade de uso dos cofres (em função do tamanho ou características do objeto), deverá o cliente informar ao hotel, por escrito, a existência de tal objeto, inclusive suas características, acessórios e valor, para que lhe seja facultada outra possibilidade de guarda, estando a CONTRATADA exonerada de qualquer responsabilidade.

DÉCIMA PRIMEIRA – DA ALIMENTAÇÃO EM GERAL

11.1. A alimentação do(s) CLIENTE(S) durante as viagens e hospedagens obedecerá a quantidade e a modalidade contratada, definidas no anexo Informações da Reserva.

DÉCIMA SEGUNDA – SEGUROS DE VIAGENS NÃO INCLUÍDOS NO PACOTE DE VIAGEM.

12.1. Caso o CLIENTE necessite de assistência médica ambulatorial ou hospitalar ou da ministração de remédios ou tratamentos durante a viagem, deverá suportar as despesas deles decorrentes às suas próprias expensas.

12.2. Na hipótese de o CLIENTE optar pela feitura de apólices de seguro que acobertem esses casos especiais, que vigorem pelo tempo de duração da viagem, poderá adquiri-los junto às empresas especializadas no ramo, mesmo com a intermediação da AGÊNCIA.

12.3. A AGÊNCIA recomenda ao CLIENTE a aquisição de seguro de viagem. Os passageiros que, no decorrer da viagem, necessitarem de assistência médica ou remédios, e que não possuírem seguro saúde e/ou assistência médica, deverão suportar tais encargos. A CONTRATADA orienta para que os titulares de seguro de saúde ou assistência médica portem, sempre, os documentos necessários para atendimento fora do domicílio habitual.

DÉCIMA TERCEIRA – OPERAÇÕES COM CARTÃO DE CRÉDITO

13.1. O CLIENTE, por sua livre conta e ordem, concorda em outorgar um mandato irrevogável à AGÊNCIA, para que esta faça uso do cartão de crédito do CLIENTE para comprar os produtos e/ou serviços acordados por escrito ou por e-mail.

13.2. É de inteira responsabilidade da AGÊNCIA somente executar as ordens recebidas pelo cliente na forma acima e manter em sigilo e segurança os dados recebidos do cliente.


E por estarem assim justas e contratadas firmam o presente contrato em duas vias de igual teor e o seu Anexo I (Informações da Reserva), que o integra, juntamente com as testemunhas infra-assinadas, a tudo presentes.




{DATA_VENDA}






____________________________________________________
{NOME_CLIENTE}	

____________________________________________________
{NOME_AGENCIA}






____________________________________________________
Testemunha

	


____________________________________________________
Testemunha
`;

export default function NovoContratoPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { toast } = useToast();
    const contractId = searchParams.get('id');

    const [name, setName] = useState('');
    const [content, setContent] = useState('');
    const [isActive, setIsActive] = useState(true);

    useEffect(() => {
        if (contractId) {
            const storedContracts = JSON.parse(localStorage.getItem('contracts') || '[]') as Contract[];
            const contractToEdit = storedContracts.find(c => c.id === contractId);
            if (contractToEdit) {
                setName(contractToEdit.name);
                setContent(contractToEdit.content);
                setIsActive(contractToEdit.isActive);
            }
        }
    }, [contractId]);

    const handleSave = () => {
        if (!name) {
            toast({
                title: "Erro de Validação",
                description: "O campo 'Nome' é obrigatório.",
                variant: "destructive",
            });
            return;
        }

        const storedContracts = JSON.parse(localStorage.getItem('contracts') || '[]') as Contract[];

        const newContract: Contract = {
            id: contractId || Date.now().toString(),
            name,
            content,
            isActive,
        };

        let updatedContracts: Contract[];
        if (contractId) {
            updatedContracts = storedContracts.map(c => c.id === contractId ? newContract : c);
        } else {
            updatedContracts = [...storedContracts, newContract];
        }

        localStorage.setItem('contracts', JSON.stringify(updatedContracts));
        toast({
            title: "Sucesso!",
            description: `Modelo de Contrato ${contractId ? 'atualizado' : 'salvo'} com sucesso.`,
        });
        router.push('/contrato');
    };

    const handleImportDefault = () => {
        setContent(defaultContractTemplate);
    };

    return (
        <div className="space-y-6 max-w-4xl mx-auto">
            <header>
                <h1 className="text-3xl font-bold text-primary">{contractId ? 'Editar' : 'Cadastro de'} Modelo de Contrato</h1>
            </header>

            <Card>
                <CardContent className="p-6 space-y-6">
                     <div className="space-y-2">
                        <Label htmlFor="nome">Nome <span className="text-destructive">*</span></Label>
                        <Input id="nome" value={name} onChange={e => setName(e.target.value)} placeholder="-" />
                    </div>
                    <div className="space-y-2">
                         <div className="flex justify-between items-center">
                            <Label htmlFor="content">Modelo <span className="text-destructive">*</span></Label>
                            <Button variant="link" size="sm" className="p-0 h-auto" onClick={handleImportDefault}>Importar modelo padrão</Button>
                         </div>
                         <Button variant="default" size="sm" className="h-auto py-1">
                             <Info className="mr-2 h-4 w-4" />
                            Palavras Reservadas
                        </Button>
                        <RichTextEditor
                            value={content}
                            onChange={setContent}
                         />
                    </div>
                    <div className="flex items-center space-x-2">
                        <Switch id="ativo" checked={isActive} onCheckedChange={setIsActive} />
                        <Label htmlFor="ativo">Ativo</Label>
                    </div>
                </CardContent>
            </Card>

            <div className="flex justify-start gap-2">
                <Button variant="outline" asChild>
                    <Link href="/contrato">Cancelar</Link>
                </Button>
                <Button onClick={handleSave}>Salvar</Button>
            </div>
        </div>
    );
}
