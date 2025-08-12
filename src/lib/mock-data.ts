import type { Property, Kpi, Sale, Appointment } from './types';
import { DollarSign, Building2, Wallet, Handshake, TrendingUp, TrendingDown } from 'lucide-react';

export const mockProperties: Property[] = [
  { id: '1', title: 'Vila Moderna com Piscina', address: 'R. das Flores, 123, São Paulo', price: 1200000, imageUrl: 'https://placehold.co/600x400', type: 'Casa', status: 'Novo', bedrooms: 4, bathrooms: 5, area: 320, dataAiHint: 'modern villa' },
  { id: '2', title: 'Apartamento Aconchegante no Centro', address: 'Av. Principal, 456, Rio de Janeiro', price: 750000, imageUrl: 'https://placehold.co/600x400', type: 'Apartamento', status: 'Usado', bedrooms: 2, bathrooms: 2, area: 90, dataAiHint: 'cozy apartment' },
  { id: '3', title: 'Lote Amplo em Condomínio Fechado', address: 'Alameda dos Pinheiros, 789, Curitiba', price: 450000, imageUrl: 'https://placehold.co/600x400', type: 'Lote', status: 'Novo', bedrooms: 0, bathrooms: 0, area: 1000, dataAiHint: 'spacious lot' },
  { id: '4', title: 'Casa de Repasse com Vista para o Mar', address: 'Av. Beira Mar, 101, Fortaleza', price: 980000, imageUrl: 'https://placehold.co/600x400', type: 'Casa', status: 'Repasse', bedrooms: 3, bathrooms: 3, area: 210, dataAiHint: 'house sea' },
  { id: '5', title: 'Apartamento de Luxo Duplex', address: 'R. Oscar Freire, 202, São Paulo', price: 3500000, imageUrl: 'https://placehold.co/600x400', type: 'Apartamento', status: 'Novo', bedrooms: 3, bathrooms: 4, area: 250, dataAiHint: 'luxury apartment' },
  { id: '6', title: 'Casa Térrea com Jardim', address: 'R. da Tranquilidade, 303, Belo Horizonte', price: 850000, imageUrl: 'https://placehold.co/600x400', type: 'Casa', status: 'Usado', bedrooms: 3, bathrooms: 2, area: 180, dataAiHint: 'house garden' },
];

export const mockKpis: Kpi[] = [
  { title: 'Vendas Totais', value: 'R$1.2M', change: '+15.2%', changeType: 'increase', icon: DollarSign },
  { title: 'Imóveis Ativos', value: '78', change: '-2.1%', changeType: 'decrease', icon: Building2 },
  { title: 'Comissão Média', value: 'R$15k', change: '+5.8%', changeType: 'increase', icon: Wallet },
  { title: 'Negócios Fechados', value: '12', change: '+20%', changeType: 'increase', icon: Handshake },
];

export const mockSalesData: Sale[] = [
    { month: 'Jan', repasse: 1, novo: 2, usado: 2 },
    { month: 'Fev', repasse: 2, novo: 3, usado: 1 },
    { month: 'Mar', repasse: 2, novo: 4, usado: 3 },
    { month: 'Abr', repasse: 3, novo: 5, usado: 2 },
    { month: 'Mai', repasse: 4, novo: 6, usado: 4 },
    { month: 'Jun', repasse: 3, novo: 5, usado: 5 },
];

export const mockAppointments: Appointment[] = [
  { id: '1', title: 'Visita - Vila Moderna', time: '10:00 - 11:00', type: 'team', attendees: ['João Silva', 'Maria Costa'] },
  { id: '2', title: 'Reunião de Alinhamento', time: '14:00 - 15:00', type: 'company', attendees: ['Todos'] },
  { id: '3', title: 'Almoço com Cliente', time: '12:30 - 13:30', type: 'personal', attendees: ['Carlos Pereira'] },
  { id: '4', title: 'Assinatura de Contrato', time: '16:00 - 16:30', type: 'team', attendees: ['Ana Beatriz', 'Cliente X'] },
  { id: '5', title: 'Treinamento CRM', time: '09:00 - 11:00', type: 'company', attendees: ['Equipe Vendas'] },
];
