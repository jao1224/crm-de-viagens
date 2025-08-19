import type { TravelPackage, Kpi, Booking, Appointment } from './types';
import { DollarSign, Package, Wallet, CalendarCheck } from 'lucide-react';

export const mockTravelPackages: TravelPackage[] = [
  { id: '1', title: 'Resort Tropical em Cancún', destination: 'Cancún, México', price: 4500, imageUrl: 'https://placehold.co/600x400', type: 'Praia', status: 'Disponível', duration: 7, travelers: 2, dataAiHint: 'beach resort' },
  { id: '2', title: 'Aventura nos Alpes Suíços', destination: 'Interlaken, Suíça', price: 7200, imageUrl: 'https://placehold.co/600x400', type: 'Montanha', status: 'Disponível', duration: 10, travelers: 2, dataAiHint: 'swiss alps' },
  { id: '3', title: 'Tour Cultural em Quioto', destination: 'Quioto, Japão', price: 6800, imageUrl: 'https://placehold.co/600x400', type: 'Cidade', status: 'Esgotado', duration: 8, travelers: 2, dataAiHint: 'kyoto temple' },
  { id: '4', title: 'Viagem de Negócios a Nova York', destination: 'Nova York, EUA', price: 5300, imageUrl: 'https://placehold.co/600x400', type: 'Negócios', status: 'Disponível', duration: 5, travelers: 1, dataAiHint: 'new york' },
  { id: '5', title: 'Safari na Tanzânia', destination: 'Serengeti, Tanzânia', price: 12500, imageUrl: 'https://placehold.co/600x400', type: 'Montanha', status: 'Disponível', duration: 12, travelers: 2, dataAiHint: 'safari tanzania' },
  { id: '6', title: 'Férias em Roma e Vaticano', destination: 'Roma, Itália', price: 5900, imageUrl: 'https://placehold.co/600x400', type: 'Cidade', status: 'Disponível', duration: 7, travelers: 2, dataAiHint: 'rome city' },
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
  { id: '1', title: 'Reunião com Família Silva', time: '10:00 - 11:00', type: 'client', attendees: ['João Silva', 'Maria Costa'] },
  { id: '2', title: 'Alinhamento com Fornecedor', time: '14:00 - 15:00', type: 'provider', attendees: ['Hotel Palace'] },
  { id: '3', title: 'Almoço com Cliente VIP', time: '12:30 - 13:30', type: 'client', attendees: ['Carlos Pereira'] },
  { id: '4', title: 'Reunião de Equipe Semanal', time: '16:00 - 16:30', type: 'team', attendees: ['Todos'] },
  { id: '5', title: 'Call de Fechamento - Viagem Japão', time: '09:00 - 09:30', type: 'client', attendees: ['Ana Beatriz', 'Cliente Y'] },
];
