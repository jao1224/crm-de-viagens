
import type { Appointment, Quote } from './types';

export const mockAppointments: Appointment[] = [
  { id: '1', title: 'Reunião de Planejamento', customer: 'Kelly Freires Diogo Tossi', package: 'São Paulo (VCP) > Lisboa (LIS)', date: '2025-08-23T17:15:00Z', type: 'departure' },
  { id: '2', title: 'Embarque Voo JJ8130', customer: 'Herlingue Carvalho Azevedo', package: 'São Paulo (VCP) > Porto (OPO)', date: '2025-09-23T20:30:00Z', type: 'departure' },
  { id: '3', title: 'Pagamento Final', customer: 'Vitória Da Conquista (VDC)', package: 'Lisboa (LIS)', date: '2025-09-26T09:50:00Z', type: 'departure' },
  { id: '4', title: 'Lembrete: Check-in Hotel', customer: 'Sr. e Sra. Lima', package: 'Férias em Roma', date: '2024-07-25T14:00:00Z', type: 'reminder' },
  { id: '5', title: 'Reunião de Follow-up', customer: 'Mariana Costa', package: 'Viagem a Nova York', date: '2024-07-26T11:00:00Z', type: 'meeting' },
];

export const mockQuotes: Quote[] = [
  { id: '3sah1', date: '22/08', client: { name: 'Cliente não informado', avatarUrl: 'https://i.pinimg.com/564x/d9/56/9b/d9569bbed4393e2ceb1af7ba64fdf86a.jpg' }, value: 0, status: 'aguardando' },
  { id: '5chjn', date: '22/08', client: { name: 'ADEILSON', avatarUrl: 'https://i.pinimg.com/564x/d9/56/9b/d9569bbed4393e2ceb1af7ba64fdf86a.jpg' }, value: 0, status: 'aprovado' },
  { id: 'bdchj', date: '22/08', client: { name: 'JULIO VENANCIO MENEZES', avatarUrl: 'https://i.pinimg.com/564x/3b/b8/b3/3bb8b3b7e3f8b8e0a3a6a1b248f2a5e8.jpg' }, value: 18540, status: 'aprovado' },
  { id: 'cfgq3', date: '05/08', client: { name: 'Analine de Albuquerque Linhares', avatarUrl: 'https://i.pinimg.com/564x/d9/56/9b/d9569bbed4393e2ceb1af7ba64fdf86a.jpg' }, value: 23766.18, status: 'aprovado' },
  { id: '07e6b', date: '05/08', client: { name: 'Maria Brandão Silva Gaspar', avatarUrl: 'https://i.pinimg.com/564x/d9/56/9b/d9569bbed4393e2ceb1af7ba64fdf86a.jpg' }, value: 4800, status: 'aprovado' },
  { id: '8a4wl', date: '05/08', client: { name: 'Lidiane da Silva Seidenfuhss', avatarUrl: 'https://i.pinimg.com/564x/3b/b8/b3/3bb8b3b7e3f8b8e0a3a6a1b248f2a5e8.jpg' }, value: 11400, status: 'aprovado' },
];
