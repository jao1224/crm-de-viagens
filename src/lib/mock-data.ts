
import type { Appointment, Quote, Project, User, Flight, Person, TravelPackage } from './types';

export const currentUser: User = {
    id: 'user-lima',
    name: 'Lima',
    email: 'nomeiodomundoviagens@gmail.com',
    avatarUrl: 'https://i.pinimg.com/736x/a2/3c/9f/a23c9f18b0d355639f041530c345129c.jpg',
    status: 'active',
    permission: 'Admin',
};

export const mockPeople: Person[] = [
    { id: '1', name: 'Aalyah Evelyn Bulhões Domingues', rating: 5, types: ['Passageiro'], cpfCnpj: '123.456.789-00', phone: '+55 85 91234-5678', email: 'aalyah@email.com', sexo: 'Feminino', nascimento: '2004-07-13', rg: '2004123456789', orgaoEmissor: 'SSP/CE', id_estrangeiro: '', nacionalidade: 'Brasil', estadoCivil: 'Solteira', passaporte: 'GJ407853', emissaoPassaporte: '2024-05-21', vencimentoPassaporte: '2034-05-20', nacionalidadePassaporte: 'Brasil', visto: '', validadeVisto: '', active: true, avatarUrl: 'https://i.pinimg.com/736x/a2/3c/9f/a23c9f18b0d355639f041530c345129c.jpg' },
    { id: '2', name: 'Aayslah Raquel Bulhões Domingues', rating: 5, types: ['Passageiro'], cpfCnpj: '', phone: '', email: '', sexo: 'Feminino', nascimento: '', rg: '', orgaoEmissor: '', id_estrangeiro: '', nacionalidade: 'Brasil', estadoCivil: '', passaporte: '', emissaoPassaporte: '', vencimentoPassaporte: '', nacionalidadePassaporte: '', visto: '', validadeVisto: '', active: true, avatarUrl: 'https://placehold.co/32x32.png' },
    { id: '3', name: 'Abdessalam bara', rating: 5, types: ['Cliente'], cpfCnpj: '', phone: '', email: '', sexo: 'Masculino', nascimento: '', rg: '', orgaoEmissor: '', id_estrangeiro: '', nacionalidade: 'Marrocos', estadoCivil: '', passaporte: '', emissaoPassaporte: '', vencimentoPassaporte: '', nacionalidadePassaporte: '', visto: '', validadeVisto: '', active: true, avatarUrl: 'https://placehold.co/32x32.png' },
    { id: '4', name: 'ADEILSON', rating: 0, types: ['Cliente'], cpfCnpj: '', phone: '', email: '', sexo: '', nascimento: '', rg: '', orgaoEmissor: '', id_estrangeiro: '', nacionalidade: 'Brasil', estadoCivil: '', passaporte: '', emissaoPassaporte: '', vencimentoPassaporte: '', nacionalidadePassaporte: '', visto: '', validadeVisto: '', active: true, avatarUrl: 'https://placehold.co/32x32.png' },
    { id: '5', name: 'ADEMIR', rating: 0, types: ['Passageiro', 'Cliente'], cpfCnpj: '', phone: '', email: '', sexo: '', nascimento: '', rg: '', orgaoEmissor: '', id_estrangeiro: '', nacionalidade: 'Brasil', estadoCivil: '', passaporte: '', emissaoPassaporte: '', vencimentoPassaporte: '', nacionalidadePassaporte: '', visto: '', validadeVisto: '', active: true, avatarUrl: 'https://placehold.co/32x32.png' },
    { id: '6', name: 'Cliente não informado', rating: 0, types: [], cpfCnpj: '', phone: '', email: '', sexo: '', nascimento: '', rg: '', orgaoEmissor: '', id_estrangeiro: '', nacionalidade: '', estadoCivil: '', passaporte: '', emissaoPassaporte: '', vencimentoPassaporte: '', nacionalidadePassaporte: '', visto: '', validadeVisto: '', active: true, avatarUrl: 'https://placehold.co/32x32.png' },
    { id: '7', name: 'João Silva', rating: 4, types: ['Cliente'], cpfCnpj: '111.222.333-44', phone: '', email: '', sexo: 'Masculino', nascimento: '', rg: '', orgaoEmissor: '', id_estrangeiro: '', nacionalidade: 'Brasil', estadoCivil: '', passaporte: '', emissaoPassaporte: '', vencimentoPassaporte: '', nacionalidadePassaporte: '', visto: '', validadeVisto: '', active: true, avatarUrl: 'https://placehold.co/32x32.png' },
    { id: '8', name: 'Maria Pereira', rating: 3, types: ['Cliente'], cpfCnpj: '222.333.444-55', phone: '', email: '', sexo: 'Feminino', nascimento: '', rg: '', orgaoEmissor: '', id_estrangeiro: '', nacionalidade: 'Brasil', estadoCivil: '', passaporte: '', emissaoPassaporte: '', vencimentoPassaporte: '', nacionalidadePassaporte: '', visto: '', validadeVisto: '', active: true, avatarUrl: 'https://placehold.co/32x32.png' },
    { id: '9', name: 'Carlos Souza', rating: 5, types: ['Cliente', 'Passageiro'], cpfCnpj: '333.444.555-66', phone: '', email: '', sexo: 'Masculino', nascimento: '', rg: '', orgaoEmissor: '', id_estrangeiro: '', nacionalidade: 'Brasil', estadoCivil: '', passaporte: '', emissaoPassaporte: '', vencimentoPassaporte: '', nacionalidadePassaporte: '', visto: '', validadeVisto: '', active: true, avatarUrl: 'https://placehold.co/32x32.png' },
    { id: '10', name: 'JULIO VENANCIO MENEZES', rating: 4, types: ['Cliente'], cpfCnpj: '444.555.666-77', phone: '', email: '', sexo: 'Masculino', nascimento: '', rg: '', orgaoEmissor: '', id_estrangeiro: '', nacionalidade: 'Brasil', estadoCivil: '', passaporte: '', emissaoPassaporte: '', vencimentoPassaporte: '', nacionalidadePassaporte: '', visto: '', validadeVisto: '', active: true, avatarUrl: 'https://placehold.co/32x32.png' },
    { id: '11', name: 'Analine de Albuquerque Linhares', rating: 5, types: ['Cliente'], cpfCnpj: '555.666.777-88', phone: '', email: '', sexo: 'Feminino', nascimento: '', rg: '', orgaoEmissor: '', id_estrangeiro: '', nacionalidade: 'Brasil', estadoCivil: '', passaporte: '', emissaoPassaporte: '', vencimentoPassaporte: '', nacionalidadePassaporte: '', visto: '', validadeVisto: '', active: true, avatarUrl: 'https://placehold.co/32x32.png' },
    { id: '12', name: 'Maria Brandão Silva Gaspar', rating: 3, types: ['Cliente'], cpfCnpj: '666.777.888-99', phone: '', email: '', sexo: 'Feminino', nascimento: '', rg: '', orgaoEmissor: '', id_estrangeiro: '', nacionalidade: 'Brasil', estadoCivil: '', passaporte: '', emissaoPassaporte: '', vencimentoPassaporte: '', nacionalidadePassaporte: '', visto: '', validadeVisto: '', active: true, avatarUrl: 'https://placehold.co/32x32.png' },
    { id: '13', name: 'Lidiane da Silva Seidenfuhss', rating: 4, types: ['Cliente'], cpfCnpj: '777.888.999-00', phone: '', email: '', sexo: 'Feminino', nascimento: '', rg: '', orgaoEmissor: '', id_estrangeiro: '', nacionalidade: 'Brasil', estadoCivil: '', passaporte: '', emissaoPassaporte: '', vencimentoPassaporte: '', nacionalidadePassaporte: '', visto: '', validadeVisto: '', active: true, avatarUrl: 'https://placehold.co/32x32.png' },
    { id: '14', name: 'Kelly Freires Diogo Tossi', rating: 5, types: ['Passageiro'], cpfCnpj: '', phone: '', email: '', sexo: 'Feminino', nascimento: '', rg: '', orgaoEmissor: '', id_estrangeiro: '', nacionalidade: 'Brasil', estadoCivil: '', passaporte: '', emissaoPassaporte: '', vencimentoPassaporte: '', nacionalidadePassaporte: '', visto: '', validadeVisto: '', active: true, avatarUrl: 'https://i.pinimg.com/736x/a2/3c/9f/a23c9f18b0d355639f041530c345129c.jpg' },
    { id: '15', name: 'Herlingue Carvalho Azevedo', rating: 4, types: ['Passageiro'], cpfCnpj: '', phone: '', email: '', sexo: 'Masculino', nascimento: '', rg: '', orgaoEmissor: '', id_estrangeiro: '', nacionalidade: 'Brasil', estadoCivil: '', passaporte: '', emissaoPassaporte: '', vencimentoPassaporte: '', nacionalidadePassaporte: '', visto: '', validadeVisto: '', active: true, avatarUrl: 'https://i.pinimg.com/736x/a2/3c/9f/a23c9f18b0d355639f041530c345129c.jpg' },
];


export const mockAppointments: Appointment[] = [
  { id: '1', title: 'Embarque Voo 7XIE9', customer: 'Kelly Freires Diogo Tossi', package: 'São Paulo (VCP) > Lisboa (LIS)', date: '2025-08-23T17:15:00Z', type: 'departure' },
  { id: '2', title: 'Embarque Voo T196W', customer: 'Herlingue Carvalho Azevedo', package: 'São Paulo (VCP) > Porto (OPO)', date: '2025-09-10T20:30:00Z', type: 'departure' },
  { id: '3', title: 'Pagamento Entrada Pacote Disney', customer: 'Família Souza', package: 'Férias em Orlando', date: '2025-08-15T10:00:00Z', type: 'payment' },
  { id: '4', title: 'Lembrete: Check-in Hotel Roma', customer: 'Sr. e Sra. Lima', package: 'Férias em Roma', date: '2025-08-20T14:00:00Z', type: 'reminder' },
  { id: '5', title: 'Reunião de Follow-up', customer: 'Mariana Costa', package: 'Viagem a Nova York', date: '2025-08-20T11:00:00Z', type: 'meeting' },
  { id: '6', title: 'Pagamento Final Cruzeiro', customer: 'Carlos Andrade', package: 'Cruzeiro Caribe', date: '2025-08-20T15:30:00Z', type: 'payment' },
  { id: '7', title: 'Embarque Voo SN5EY', customer: 'Vitória Da Conquista (VDC)', package: 'Lisboa (LIS)', date: '2025-09-26T09:50:00Z', type: 'departure' },
  { id: '8', title: 'Tarefa: Ligar para fornecedor', customer: 'Interno', package: 'N/A', date: '2025-08-01T09:00:00Z', type: 'task' },
  { id: '9', title: 'Aniversário de João Silva', customer: 'João Silva', package: 'N/A', date: '2025-08-05T00:00:00Z', type: 'birthday' },
  { id: '10', title: 'Voo de Ida - Paris', customer: 'Ana Clara', package: 'Lua de Mel em Paris', date: '2025-08-12T08:00:00Z', type: 'flight' },
  { id: '11', title: 'Check-in Hotel Le Meurice', customer: 'Ana Clara', package: 'Lua de Mel em Paris', date: '2025-08-12T15:00:00Z', type: 'hotel' },
  { id: '12', title: 'Transfer Aeroporto > Hotel', customer: 'Ana Clara', package: 'Lua de Mel em Paris', date: '2025-08-12T13:30:00Z', type: 'transport' },
  { id: '13', title: 'Tour Torre Eiffel', customer: 'Ana Clara', package: 'Lua de Mel em Paris', date: '2025-08-13T10:00:00Z', type: 'tour' },
  { id: '14', title: 'Embarque Cruzeiro no Mediterrâneo', customer: 'Família Andrade', package: 'Cruzeiro Grécia e Itália', date: '2025-09-05T16:00:00Z', type: 'cruise' },
  { id: '15', title: 'Futuro Evento de Teste', customer: 'Cliente Teste', package: 'Pacote Futuro', date: '2025-10-05T18:00:00Z', type: 'meeting' },
  { id: '16', title: 'Passeio de Gôndola em Veneza', customer: 'Casal Ferreira', package: 'Itália Romântica', date: '2025-10-10T16:00:00Z', type: 'tour' },
  { id: '17', title: 'Aniversário da Agência', customer: 'Equipe NoMeioDoMundo', package: 'N/A', date: '2025-11-01T09:00:00Z', type: 'birthday' },
  { id: '18', title: 'Voo para Cancún', customer: 'Grupo de Amigos', package: 'Férias no México', date: '2025-11-15T11:30:00Z', type: 'flight' },
  { id: '19', title: 'Check-in no Resort Paradisus', customer: 'Grupo de Amigos', package: 'Férias no México', date: '2025-11-15T18:00:00Z', type: 'hotel' },
];

export const mockQuotes: Quote[] = [
  { id: '3sah1', date: '22/08', clientId: '6', value: 0, status: 'aguardando' },
  { id: '1b2j3', date: '22/08', clientId: '7', value: 1500, status: 'em-cotacao' },
  { id: '4k5l6', date: '21/08', clientId: '8', value: 3200, status: 'aguardando-cliente' },
  { id: '5chjn', date: '22/08', clientId: '4', value: 0, status: 'aprovado' },
  { id: 'bdchj', date: '22/08', clientId: '10', value: 18540, status: 'aprovado' },
  { id: 'cfgq3', date: '05/08', clientId: '11', value: 23766.18, status: 'aprovado' },
  { id: '07e6b', date: '05/08', clientId: '12', value: 4800, status: 'aprovado' },
  { id: '8a4wl', date: '05/08', clientId: '13', value: 11400, status: 'aprovado' },
  { id: '9p8o7', date: '19/08', clientId: '9', value: 5000, status: 'reprovado' },
];


export const mockProjects: Project[] = [
    {
        id: 'proj1',
        title: 'Casal em Coimbra',
        description: 'Roteiro Portugal',
        members: [
            { avatarUrl: 'https://i.pinimg.com/736x/a2/3c/9f/a23c9f18b0d355639f041530c345129c.jpg', name: 'User 1' },
            { avatarUrl: 'https://placehold.co/32x32.png', name: 'User 2' },
        ],
        progress: 75,
    },
    {
        id: 'proj2',
        title: 'Conexões',
        description: 'Grupo Canada',
        members: [
            { avatarUrl: 'https://placehold.co/32x32.png', name: 'User 3' },
            { avatarUrl: 'https://placehold.co/32x32.png', name: 'User 4' },
            { avatarUrl: 'https://placehold.co/32x32.png', name: 'User 5' },
        ],
        progress: 40,
    },
    {
        id: 'proj3',
        title: 'Aventura na Patagônia',
        description: 'Expedição Chile/Argentina',
        members: [
            { avatarUrl: 'https://i.pinimg.com/736x/a2/3c/9f/a23c9f18b0d355639f041530c345129c.jpg', name: 'User 1' },
        ],
        progress: 90,
    },
];

export const mockUsers: User[] = [
    currentUser,
    {
        id: '1',
        name: 'Casal em Coimbra Franquia',
        email: 'casalemcoimbra@nomeiodomundoviagens.com',
        avatarUrl: '/logo.png',
        status: 'active',
        permission: 'Acessa somente suas cotações',
    },
    {
        id: '2',
        name: 'Conexões Franquia',
        email: 'conexoes@nomeiodomundoviagens.com',
        avatarUrl: '/logo.png',
        status: 'active',
        permission: 'Acessa somente suas cotações',
    },
    {
        id: '3',
        name: 'É o Nosso Quintal Franquia',
        email: 'eonossoquintal@nomeiodomundoviagens.com',
        avatarUrl: '/logo.png',
        status: 'active',
        permission: 'Acessa somente suas cotações',
    }
]

export const mockFlights: Flight[] = [
    { id: '1', dateTime: new Date('2025-08-23T17:15:00Z'), passengers: ['Kelly Freires Diogo Tossi'], whatsappIcon: true, from: 'São Paulo (VCP)', to: 'Lisboa (LIS)', flightType: 'Ida', airline: 'Latam', locator: '7XIE9', status: 'notify-check-in' },
    { id: '2', dateTime: new Date('2025-09-10T20:30:00Z'), passengers: ['Herlingue Carvalho Azevedo', 'Acompanhante 1'], whatsappIcon: false, from: 'São Paulo (VCP)', to: 'Porto (OPO)', flightType: 'Ida', airline: 'TAP', locator: 'T196W', status: 'scheduled' },
    { id: '3', dateTime: new Date('2025-07-31T20:30:00Z'), passengers: ['João da Silva'], whatsappIcon: true, from: 'Rio de Janeiro (GIG)', to: 'Salvador (SSA)', flightType: 'Ida', airline: 'GOL', locator: 'G3H4J', status: 'completed' },
     { id: '4', dateTime: new Date('2025-08-22T10:00:00Z'), passengers: ['Maria Antônia', 'José Carlos', 'Pedro Antunes'], whatsappIcon: false, from: 'Belo Horizonte (CNF)', to: 'São Paulo (CGH)', flightType: 'Volta', airline: 'Azul', locator: 'AZ25B', status: 'check-in-open' },
];

export const mockTravelPackages: TravelPackage[] = [
    // Pacotes de Praia
    {
      id: 'praia001',
      title: 'Semana Relax em Cancún',
      destination: 'Cancún, México',
      price: 4500,
      imageUrl: 'https://placehold.co/600x400/0077be/FFFFFF/png',
      type: 'Praia',
      status: 'Disponível',
      duration: 7,
      travelers: 2,
      dataAiHint: 'Cancun beach'
    },
    {
      id: 'praia002',
      title: 'Aventura em Fernando de Noronha',
      destination: 'Fernando de Noronha, Brasil',
      price: 6800,
      imageUrl: 'https://placehold.co/600x400/008080/FFFFFF/png',
      type: 'Praia',
      status: 'Disponível',
      duration: 5,
      travelers: 2,
      dataAiHint: 'Noronha Brazil'
    },
    // Pacotes de Montanha
    {
      id: 'montanha001',
      title: 'Esqui em Bariloche',
      destination: 'Bariloche, Argentina',
      price: 5200,
      imageUrl: 'https://placehold.co/600x400/4682b4/FFFFFF/png',
      type: 'Montanha',
      status: 'Disponível',
      duration: 8,
      travelers: 2,
      dataAiHint: 'Bariloche snow'
    },
    {
      id: 'montanha002',
      title: 'Trekking nos Alpes Suíços',
      destination: 'Interlaken, Suíça',
      price: 8500,
      imageUrl: 'https://placehold.co/600x400/2e8b57/FFFFFF/png',
      type: 'Montanha',
      status: 'Esgotado',
      duration: 10,
      travelers: 2,
      dataAiHint: 'Swiss Alps'
    },
    // Pacotes de Negócios
    {
      id: 'negocios001',
      title: 'Business Trip para São Paulo',
      destination: 'São Paulo, Brasil',
      price: 2200,
      imageUrl: 'https://placehold.co/600x400/333333/FFFFFF/png',
      type: 'Negócios',
      status: 'Disponível',
      duration: 3,
      travelers: 1,
      dataAiHint: 'Sao Paulo business'
    },
    // Pacotes de Cidade
    {
      id: 'cidade001',
      title: 'Cultura em Roma',
      destination: 'Roma, Itália',
      price: 7300,
      imageUrl: 'https://placehold.co/600x400/ff4500/FFFFFF/png',
      type: 'Cidade',
      status: 'Disponível',
      duration: 7,
      travelers: 2,
      dataAiHint: 'Rome colosseum'
    },
    {
      id: 'cidade002',
      title: 'Luzes de Tóquio',
      destination: 'Tóquio, Japão',
      price: 9800,
      imageUrl: 'https://placehold.co/600x400/ff1493/FFFFFF/png',
      type: 'Cidade',
      status: 'Disponível',
      duration: 10,
      travelers: 2,
      dataAiHint: 'Tokyo neon'
    },
     // Pacotes para Família
    {
      id: 'familia001',
      title: 'Magia na Disney',
      destination: 'Orlando, EUA',
      price: 12500,
      imageUrl: 'https://placehold.co/600x400/1e90ff/FFFFFF/png',
      type: 'Família',
      status: 'Disponível',
      duration: 10,
      travelers: 4,
      dataAiHint: 'Disney castle'
    },
    {
      id: 'familia002',
      title: 'Resorts All-Inclusive na Bahia',
      destination: 'Porto Seguro, Brasil',
      price: 8800,
      imageUrl: 'https://placehold.co/600x400/32cd32/FFFFFF/png',
      type: 'Família',
      status: 'Disponível',
      duration: 7,
      travelers: 4,
      dataAiHint: 'Bahia resort'
    },
];

