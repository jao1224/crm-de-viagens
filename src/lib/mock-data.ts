import type { TravelPackage, Kpi, Booking, Appointment, User, Reservation, Itinerary } from './types';
import { DollarSign, Package, Wallet, CalendarCheck } from 'lucide-react';

export const mockTravelPackages: TravelPackage[] = [
  { id: '1', title: 'Resort Tropical em Cancún', destination: 'Cancún, México', price: 4500, imageUrl: 'https://placehold.co/600x400', type: 'Praia', status: 'Disponível', duration: 7, travelers: 2, dataAiHint: 'beach resort' },
  { id: '2', title: 'Aventura nos Alpes Suíços', destination: 'Interlaken, Suíça', price: 7200, imageUrl: 'https://placehold.co/600x400', type: 'Montanha', status: 'Disponível', duration: 10, travelers: 2, dataAiHint: 'swiss alps' },
  { id: '3', title: 'Tour Cultural em Quioto', destination: 'Quioto, Japão', price: 6800, imageUrl: 'https://placehold.co/600x400', type: 'Cidade', status: 'Esgotado', duration: 8, travelers: 2, dataAiHint: 'kyoto temple' },
  { id: '4', title: 'Viagem de Negócios a Nova York', destination: 'Nova York, EUA', price: 5300, imageUrl: 'https://placehold.co/600x400', type: 'Negócios', status: 'Disponível', duration: 5, travelers: 1, dataAiHint: 'new york' },
  { id: '5', title: 'Safari na Tanzânia', destination: 'Serengeti, Tanzânia', price: 12500, imageUrl: 'https://placehold.co/600x400', type: 'Montanha', status: 'Disponível', duration: 12, travelers: 2, dataAiHint: 'safari tanzania' },
  { id: '6', title: 'Férias em Roma e Vaticano', destination: 'Roma, Itália', price: 5900, imageUrl: 'https://placehold.co/600x400', type: 'Cidade', status: 'Disponível', duration: 7, travelers: 2, dataAiHint: 'rome city' },
  { id: '7', title: 'Diversão em Família em Orlando', destination: 'Orlando, EUA', price: 15000, imageUrl: 'https://placehold.co/600x400', type: 'Família', status: 'Disponível', duration: 10, travelers: 4, dataAiHint: 'amusement park' },
  { id: '8', title: 'Combo Cultural: Rio e Salvador', destination: 'Rio de Janeiro & Salvador, Brasil', price: 6200, imageUrl: 'https://placehold.co/600x400', type: 'Cidade', status: 'Disponível', duration: 14, travelers: 2, dataAiHint: 'brazil culture' },
];

export const mockKpis: Kpi[] = [
  { title: 'Faturamento Total', value: 'R$250k', change: '+12.5%', changeType: 'increase', icon: DollarSign },
  { title: 'Pacotes Ativos', value: '45', change: '+5', changeType: 'increase', icon: Package },
  { title: 'Ticket Médio', value: 'R$6.5k', change: '-2.1%', changeType: 'decrease', icon: Wallet },
  { title: 'Reservas Fechadas', value: '38', change: '+10', changeType: 'increase', icon: CalendarCheck },
];

export const mockSalesData: Booking[] = [
    { month: 'Jan', praia: 5, montanha: 2, cidade: 3 },
    { month: 'Fev', praia: 7, montanha: 3, cidade: 4 },
    { month: 'Mar', praia: 10, montanha: 4, cidade: 5 },
    { month: 'Abr', praia: 8, montanha: 5, cidade: 6 },
    { month: 'Mai', praia: 12, montanha: 6, cidade: 7 },
    { month: 'Jun', praia: 15, montanha: 7, cidade: 8 },
];

export const mockAppointments: Appointment[] = [
  { id: '1', title: 'Reunião de Planejamento', customer: 'Família Silva', package: 'Resort em Cancún', date: 'Hoje, 10:00', type: 'meeting' },
  { id: '2', title: 'Embarque Voo JJ8130', customer: 'Carlos Pereira', package: 'Aventura nos Alpes', date: 'Amanhã, 08:30', type: 'departure' },
  { id: '3', title: 'Pagamento Final', customer: 'Ana Beatriz', package: 'Tour em Quioto', date: 'Amanhã, 18:00', type: 'payment' },
  { id: '4', title: 'Lembrete: Check-in Hotel', customer: 'Sr. e Sra. Lima', package: 'Férias em Roma', date: '25/07, 14:00', type: 'reminder' },
  { id: '5', title: 'Reunião de Follow-up', customer: 'Mariana Costa', package: 'Viagem a Nova York', date: '26/07, 11:00', type: 'meeting' },
  { id: '6', title: 'Embarque Voo EK262', customer: 'Jorge Martins', package: 'Safari na Tanzânia', date: '28/07, 22:00', type: 'departure' },
];

export const mockUsers: User[] = [
  { id: '1', name: 'Ana Costa', email: 'ana.costa@travelflow.com', role: 'Administrador', status: 'Ativo', avatarUrl: 'https://placehold.co/100x100', phone: '+55 11 98765-4321' },
  { id: '2', name: 'Bruno Lima', email: 'bruno.lima@travelflow.com', role: 'Agente de Viagem', status: 'Ativo', avatarUrl: 'https://placehold.co/100x100', phone: '+55 21 91234-5678' },
  { id: '3', name: 'Carla Dias', email: 'carla.dias@email.com', role: 'Cliente', status: 'Ativo', avatarUrl: 'https://placehold.co/100x100', phone: '+55 31 99876-5432', travelStyle: 'Luxo' },
  { id: '4', name: 'Daniel Alves', email: 'daniel.alves@travelflow.com', role: 'Agente de Viagem', status: 'Inativo', avatarUrl: 'https://placehold.co/100x100', phone: '+55 41 98765-1234' },
  { id: '5', name: 'Eduarda Souza', email: 'eduarda.souza@email.com', role: 'Cliente', status: 'Ativo', avatarUrl: 'https://placehold.co/100x100', phone: '+55 51 91122-3344', travelStyle: 'Aventura' },
  { id: '6', name: 'Fábio Martins', email: 'fabio.martins@email.com', role: 'Cliente', status: 'Ativo', avatarUrl: 'https://placehold.co/100x100', phone: '+55 61 95566-7788', travelStyle: 'Cultural' },
];

export const mockReservations: Reservation[] = [
    { id: '1', customerName: 'João Silva', packageName: 'Resort Tropical em Cancún', travelDate: '2024-08-15', status: 'Confirmada', totalPrice: 9000, agentAvatarUrl: 'https://placehold.co/100x100' },
    { id: '2', customerName: 'Maria Garcia', packageName: 'Aventura nos Alpes Suíços', travelDate: '2024-09-05', status: 'Pendente', totalPrice: 14400, agentAvatarUrl: 'https://placehold.co/100x100' },
    { id: '3', customerName: 'Pedro Martins', packageName: 'Férias em Roma e Vaticano', travelDate: '2024-10-20', status: 'Confirmada', totalPrice: 11800, agentAvatarUrl: 'https://placehold.co/100x100' },
    { id: '4', customerName: 'Ana Rodrigues', packageName: 'Viagem de Negócios a Nova York', travelDate: '2024-07-30', status: 'Cancelada', totalPrice: 5300, agentAvatarUrl: 'https://placehold.co/100x100' },
    { id: '5', customerName: 'Lucas Almeida', packageName: 'Safari na Tanzânia', travelDate: '2024-11-10', status: 'Confirmada', totalPrice: 25000, agentAvatarUrl: 'https://placehold.co/100x100' },
    { id: '6', customerName: 'Família Oliveira', packageName: 'Diversão em Família em Orlando', travelDate: '2024-12-15', status: 'Confirmada', totalPrice: 15000, agentAvatarUrl: 'https://placehold.co/100x100' },
  ];

export const mockItineraries: Itinerary[] = [
    { id: '1', title: 'Roteiro Gastronômico na Toscana', package: 'Férias em Roma e Vaticano', status: 'Publicado', description: 'Este é um espaço para a descrição completa do itinerário. Detalhe o dia a dia da viagem, incluindo atividades, passeios, dicas de restaurantes e informações sobre os locais a serem visitados.\n\n**Dia 1:** Chegada em Roma, traslado para o hotel e jantar de boas-vindas.\n**Dia 2:** Tour guiado pelo Coliseu, Fórum Romano e Monte Palatino.\n**Dia 3:** Visita ao Vaticano: Basílica de São Pedro, Museus do Vaticano e Capela Sistina.\n**Dia 4:** Dia livre para explorar a cidade ou fazer um tour gastronômico opcional.' },
    { id: '2', title: 'Trilhas e Lagos Alpinos', package: 'Aventura nos Alpes Suíços', status: 'Publicado', description: 'Um roteiro para amantes da natureza, com caminhadas por trilhas cênicas, passeios de barco em lagos de água cristalina e vistas deslumbrantes dos Alpes Suíços.' },
    { id: '3', title: 'Mergulho e Ruínas Maias', package: 'Resort Tropical em Cancún', status: 'Em rascunho', description: 'Combine relaxamento nas praias de Cancún com a aventura de explorar recifes de corais e as misteriosas ruínas da civilização maia na Península de Yucatán.' },
    { id: '4', title: 'Itinerário de Negócios e Lazer', package: 'Viagem de Negócios a Nova York', status: 'Arquivado', description: 'Otimize sua viagem de negócios com um roteiro que inclui tempo para reuniões importantes, mas também para descobrir os principais pontos turísticos, restaurantes e shows da Big Apple.' },
    { id: '5', title: 'Descobrindo Templos Antigos', package: 'Tour Cultural em Quioto', status: 'Em rascunho', description: 'Uma imersão na cultura japonesa, visitando os mais belos templos e jardins de Quioto, participando de uma cerimônia do chá e explorando o bairro das gueixas, Gion.' },
  ];
