
import type { Appointment, Quote, Project, User } from './types';

export const mockAppointments: Appointment[] = [
  { id: '1', title: 'Embarque Voo 7XIE9', customer: 'Kelly Freires Diogo Tossi', package: 'São Paulo (VCP) > Lisboa (LIS)', date: '2025-08-23T17:15:00Z', type: 'departure' },
  { id: '2', title: 'Embarque Voo T196W', customer: 'Herlingue Carvalho Azevedo', package: 'São Paulo (VCP) > Porto (OPO)', date: '2025-09-10T20:30:00Z', type: 'departure' },
  { id: '3', title: 'Pagamento Entrada Pacote Disney', customer: 'Família Souza', package: 'Férias em Orlando', date: '2025-08-15T10:00:00Z', type: 'payment' },
  { id: '4', title: 'Lembrete: Check-in Hotel Roma', customer: 'Sr. e Sra. Lima', package: 'Férias em Roma', date: '2025-08-20T14:00:00Z', type: 'reminder' },
  { id: '5', title: 'Reunião de Follow-up', customer: 'Mariana Costa', package: 'Viagem a Nova York', date: '2025-08-20T11:00:00Z', type: 'meeting' },
  { id: '6', title: 'Pagamento Final Cruzeiro', customer: 'Carlos Andrade', package: 'Cruzeiro Caribe', date: '2025-08-20T15:30:00Z', type: 'payment' },
  { id: '7', title: 'Embarque Voo SN5EY', customer: 'Vitória Da Conquista (VDC)', package: 'Lisboa (LIS)', date: '2025-09-26T09:50:00Z', type: 'departure' },
  { id: '8', title: 'Futuro Evento de Teste', customer: 'Cliente Teste', package: 'Pacote Futuro', date: '2025-10-05T18:00:00Z', type: 'meeting' },
];

export const mockQuotes: Quote[] = [
  { id: '3sah1', date: '22/08', client: { name: 'Cliente não informado', avatarUrl: 'https://placehold.co/32x32.png' }, value: 0, status: 'aguardando' },
  { id: '1b2j3', date: '22/08', client: { name: 'João Silva', avatarUrl: 'https://placehold.co/32x32.png' }, value: 1500, status: 'em-cotacao' },
  { id: '4k5l6', date: '21/08', client: { name: 'Maria Pereira', avatarUrl: 'https://placehold.co/32x32.png' }, value: 3200, status: 'aguardando-cliente' },
  { id: '5chjn', date: '22/08', client: { name: 'ADEILSON', avatarUrl: 'https://placehold.co/32x32.png' }, value: 0, status: 'aprovado' },
  { id: 'bdchj', date: '22/08', client: { name: 'JULIO VENANCIO MENEZES', avatarUrl: 'https://placehold.co/32x32.png' }, value: 18540, status: 'aprovado' },
  { id: 'cfgq3', date: '05/08', client: { name: 'Analine de Albuquerque Linhares', avatarUrl: 'https://placehold.co/32x32.png' }, value: 23766.18, status: 'aprovado' },
  { id: '07e6b', date: '05/08', client: { name: 'Maria Brandão Silva Gaspar', avatarUrl: 'https://placehold.co/32x32.png' }, value: 4800, status: 'aprovado' },
  { id: '8a4wl', date: '05/08', client: { name: 'Lidiane da Silva Seidenfuhss', avatarUrl: 'https://placehold.co/32x32.png' }, value: 11400, status: 'aprovado' },
  { id: '9p8o7', date: '19/08', client: { name: 'Carlos Souza', avatarUrl: 'https://placehold.co/32x32.png' }, value: 5000, status: 'reprovado' },
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
