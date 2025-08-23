
import type { Appointment } from './types';

export const mockAppointments: Appointment[] = [
  { id: '1', title: 'Reunião de Planejamento', customer: 'Kelly Freires Diogo Tossi', package: 'São Paulo (VCP) > Lisboa (LIS)', date: '2025-08-23T17:15:00Z', type: 'departure' },
  { id: '2', title: 'Embarque Voo JJ8130', customer: 'Herlingue Carvalho Azevedo', package: 'São Paulo (VCP) > Porto (OPO)', date: '2025-09-23T20:30:00Z', type: 'departure' },
  { id: '3', title: 'Pagamento Final', customer: 'Vitória Da Conquista (VDC)', package: 'Lisboa (LIS)', date: '2025-09-26T09:50:00Z', type: 'departure' },
  { id: '4', title: 'Lembrete: Check-in Hotel', customer: 'Sr. e Sra. Lima', package: 'Férias em Roma', date: '2024-07-25T14:00:00Z', type: 'reminder' },
  { id: '5', title: 'Reunião de Follow-up', customer: 'Mariana Costa', package: 'Viagem a Nova York', date: '2024-07-26T11:00:00Z', type: 'meeting' },
];
