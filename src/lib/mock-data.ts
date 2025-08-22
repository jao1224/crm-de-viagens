
import type { TravelPackage, Kpi, Booking, Appointment, User, Reservation, Itinerary, Negotiation } from './types';
import { DollarSign, Package, Wallet, CalendarCheck } from 'lucide-react';

export const mockTravelPackages: TravelPackage[] = [
  { id: '1', title: 'Resort Tropical em Cancún', destination: 'Cancún, México', price: 4500, imageUrl: 'https://placehold.co/600x400', type: 'Praia', status: 'Disponível', duration: 7, travelers: 10, dataAiHint: 'beach resort' },
  { id: '2', title: 'Aventura nos Alpes Suíços', destination: 'Interlaken, Suíça', price: 7200, imageUrl: 'https://placehold.co/600x400', type: 'Montanha', status: 'Disponível', duration: 10, travelers: 8, dataAiHint: 'swiss alps' },
  { id: '3', title: 'Tour Cultural em Quioto', destination: 'Quioto, Japão', price: 6800, imageUrl: 'https://placehold.co/600x400', type: 'Cidade', status: 'Esgotado', duration: 8, travelers: 0, dataAiHint: 'kyoto temple' },
  { id: '4', title: 'Viagem de Negócios a Nova York', destination: 'Nova York, EUA', price: 5300, imageUrl: 'https://placehold.co/600x400', type: 'Negócios', status: 'Disponível', duration: 5, travelers: 20, dataAiHint: 'new york' },
  { id: '5', title: 'Safari na Tanzânia', destination: 'Serengeti, Tanzânia', price: 12500, imageUrl: 'https://placehold.co/600x400', type: 'Montanha', status: 'Disponível', duration: 12, travelers: 4, dataAiHint: 'safari tanzania' },
  { id: '6', title: 'Férias em Roma e Vaticano', destination: 'Roma, Itália', price: 5900, imageUrl: 'https://placehold.co/600x400', type: 'Cidade', status: 'Disponível', duration: 7, travelers: 15, dataAiHint: 'rome city' },
  { id: '7', title: 'Diversão em Família em Orlando', destination: 'Orlando, EUA', price: 3750, imageUrl: 'https://placehold.co/600x400', type: 'Família', status: 'Disponível', duration: 10, travelers: 10, dataAiHint: 'amusement park' },
  { id: '8', title: 'Combo Cultural: Rio e Salvador', destination: 'Rio de Janeiro & Salvador, Brasil', price: 6200, imageUrl: 'https://placehold.co/600x400', type: 'Cidade', status: 'Disponível', duration: 14, travelers: 6, dataAiHint: 'brazil culture' },
];

export const mockKpis: Kpi[] = [
  { title: 'Faturamento Total', value: 'R$250k', change: '+12.5%', changeType: 'increase', icon: DollarSign },
  { title: 'Pacotes Ativos', value: '45', change: '+5', changeType: 'increase', icon: Package },
  { title: 'Ticket Médio', value: 'R$6.5k', change: '-2.1%', changeType: 'decrease', icon: Wallet },
  { title: 'Reservas Fechadas', value: '38', change: '+10', changeType: 'increase', icon: CalendarCheck },
];

// This is now generated dynamically on the dashboard page
export const mockSalesData: Booking[] = [];


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
  { id: '3', name: 'Carla Dias', email: 'carla.dias@email.com', role: 'Cliente', status: 'Ativo', avatarUrl: 'https://placehold.co/100x100', phone: '+55 31 99876-5432', document: '123.456.789-00', travelStyle: 'Luxo', preferences: 'Prefere hotéis com spa e boa gastronomia. Gosta de viajar na primavera.' },
  { id: '4', name: 'Daniel Alves', email: 'daniel.alves@travelflow.com', role: 'Agente de Viagem', status: 'Inativo', avatarUrl: 'https://placehold.co/100x100', phone: '+55 41 98765-1234' },
  { id: '5', name: 'Eduarda Souza', email: 'eduarda.souza@email.com', role: 'Cliente', status: 'Ativo', avatarUrl: 'https://placehold.co/100x100', phone: '+55 51 91122-3344', document: '987.654.321-00', travelStyle: 'Aventura', preferences: 'Busca atividades ao ar livre como trekking e rafting. Orçamento flexível.' },
  { id: '6', name: 'Fábio Martins', email: 'fabio.martins@email.com', role: 'Cliente', status: 'Ativo', avatarUrl: 'https://placehold.co/100x100', phone: '+55 61 95566-7788', document: '111.222.333-44', travelStyle: 'Cultural', preferences: 'Interesse em museus, história e gastronomia local.' },
];

export const mockReservations: Reservation[] = [
    { id: '1', customerName: 'Carla Dias', packageId: '1', packageName: 'Resort Tropical em Cancún', bookingDate: '2024-08-01', travelDate: '2024-09-15', status: 'Confirmada', totalPrice: 9000, travelers: 2, agentAvatarUrl: 'https://placehold.co/100x100' },
    { id: '2', customerName: 'Eduarda Souza', packageId: '2', packageName: 'Aventura nos Alpes Suíços', bookingDate: '2024-08-05', travelDate: '2024-09-05', status: 'Pendente', totalPrice: 14400, travelers: 2, agentAvatarUrl: 'https://placehold.co/100x100' },
    { id: '3', customerName: 'Fábio Martins', packageId: '6', packageName: 'Férias em Roma e Vaticano', bookingDate: '2024-08-10', travelDate: '2024-10-20', status: 'Confirmada', totalPrice: 11800, travelers: 2, agentAvatarUrl: 'https://placehold.co/100x100' },
    { id: '4', customerName: 'Carla Dias', packageId: '4', packageName: 'Viagem de Negócios a Nova York', bookingDate: '2024-08-15', travelDate: '2024-08-30', status: 'Cancelada', totalPrice: 5300, travelers: 1, agentAvatarUrl: 'https://placehold.co/100x100' },
    { id: '5', customerName: 'Eduarda Souza', packageId: '5', packageName: 'Safari na Tanzânia', bookingDate: '2024-08-20', travelDate: '2024-11-10', status: 'Confirmada', totalPrice: 25000, travelers: 2, agentAvatarUrl: 'https://placehold.co/100x100' },
    { id: '6', customerName: 'Fábio Martins', packageId: '7', packageName: 'Diversão em Família em Orlando', bookingDate: '2024-11-25', travelDate: '2024-12-15', status: 'Confirmada', totalPrice: 15000, travelers: 4, agentAvatarUrl: 'https://placehold.co/100x100' },
    { id: '7', customerName: 'Carla Dias', packageId: '8', packageName: 'Combo Cultural: Rio e Salvador', bookingDate: '2024-11-10', travelDate: '2025-01-20', status: 'Confirmada', totalPrice: 12400, travelers: 2, agentAvatarUrl: 'https://placehold.co/100x100' },
    { id: '8', customerName: 'Carla Dias', packageId: '2', packageName: 'Aventura nos Alpes Suíços', bookingDate: '2025-01-20', travelDate: '2025-03-10', status: 'Confirmada', totalPrice: 7200, travelers: 1, agentAvatarUrl: 'https://placehold.co/100x100' },
    { id: '9', customerName: 'Fábio Martins', packageId: '1', packageName: 'Resort Tropical em Cancún', bookingDate: '2025-02-15', travelDate: '2025-04-05', status: 'Pendente', totalPrice: 9000, travelers: 2, agentAvatarUrl: 'https://placehold.co/100x100' },
];

export const mockItineraries: Itinerary[] = [
    { id: '1', title: 'Roteiro Gastronômico na Toscana', package: 'Férias em Roma e Vaticano', status: 'Publicado', description: 'Este é um espaço para a descrição completa do itinerário. Detalhe o dia a dia da viagem, incluindo atividades, passeios, dicas de restaurantes e informações sobre os locais a serem visitados.\n\n**Dia 1:** Chegada em Roma, traslado para o hotel e jantar de boas-vindas.\n**Dia 2:** Tour guiado pelo Coliseu, Fórum Romano e Monte Palatino.\n**Dia 3:** Visita ao Vaticano: Basílica de São Pedro, Museus do Vaticano e Capela Sistina.\n**Dia 4:** Dia livre para explorar a cidade ou fazer um tour gastronômico opcional.' },
    { id: '2', title: 'Trilhas e Lagos Alpinos', package: 'Aventura nos Alpes Suíços', status: 'Publicado', description: 'Um roteiro para amantes da nature/za, com caminhadas por trilhas cênicas, passeios de barco em lagos de água cristalina e vistas deslumbrantes dos Alpes Suíços.' },
    { id: '3', title: 'Mergulho e Ruínas Maias', package: 'Resort Tropical em Cancún', status: 'Em rascunho', description: 'Combine relaxamento nas praias de Cancún com a aventura de explorar recifes de corais e as misteriosas ruínas da civilização maia na Península de Yucatán.' },
    { id: '4', title: 'Itinerário de Negócios e Lazer', package: 'Viagem de Negócios a Nova York', status: 'Arquivado', description: 'Otimize sua viagem de negócios com um roteiro que inclui tempo para reuniões importantes, mas também para descobrir os principais pontos turísticos, restaurantes e shows da Big Apple.' },
    { id: '5', title: 'Descobrindo Templos Antigos', package: 'Tour Cultural em Quioto', status: 'Em rascunho', description: 'Uma imersão na cultura japonesa, visitando os mais belos templos e jardins de Quioto, participando de uma cerimônia do chá e explorando o bairro das gueixas, Gion.' },
  ];

  export const mockNegotiations: Negotiation[] = [
    { id: '1', customerName: 'Eduarda Souza', packageName: 'Aventura nos Alpes Suíços', value: 14400, agentId: '2', status: 'Lead' },
    { id: '2', customerName: 'Fábio Martins', packageName: 'Safari na Tanzânia', value: 25000, agentId: '2', status: 'Proposta Enviada' },
    { id: '3', customerName: 'Carla Dias', packageName: 'Combo Cultural: Rio e Salvador', value: 12400, agentId: '4', status: 'Em Negociação' },
    { id: '4', customerName: 'Eduarda Souza', packageName: 'Resort Tropical em Cancún', value: 9000, agentId: '2', status: 'Ganhos' },
    { id: '5', customerName: 'Fábio Martins', packageName: 'Férias em Roma e Vaticano', value: 5900, agentId: '2', status: 'Proposta Enviada' },
    { id: '6', customerName: 'Carla Dias', packageName: 'Diversão em Família em Orlando', value: 15000, agentId: '4', status: 'Lead' },
  ];

    
