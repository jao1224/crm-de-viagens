
import type { LucideIcon } from "lucide-react";

export type TravelPackage = {
  id: string;
  title: string;
  destination: string;
  price: number;
  imageUrl: string;
  type: 'Praia' | 'Montanha' | 'Negócios' | 'Cidade' | 'Família';
  status: 'Disponível' | 'Esgotado';
  duration: number;
  travelers: number;
  dataAiHint: string;
};

export type Kpi = {
  title: string;
  value: string;
  change: string;
  changeType: 'increase' | 'decrease';
  icon: LucideIcon;
  description?: string;
};

export type Booking = {
  month: string;
  monthIndex?: number;
  year?: number;
  [key: string]: number | string | undefined; // Allow dynamic keys for package types
};


export type Appointment = {
  id: string;
  title: string;
  date: string;
  type: 'meeting' | 'departure' | 'payment' | 'reminder';
  customer: string;
  package: string;
};

export type NavItem = {
  href: string;
  label: string;
  icon: LucideIcon;
};

export const travelStyles = ['Luxo', 'Aventura', 'Cultural', 'Econômica'] as const;
export type TravelStyle = typeof travelStyles[number];

export type User = {
  id: string;
  name: string;
  email: string;
  role: 'Administrador' | 'Agente de Viagem' | 'Cliente';
  status: 'Ativo' | 'Inativo';
  avatarUrl: string;
  phone?: string;
  document?: string;
  travelStyle?: TravelStyle;
  preferences?: string;
};

export type Reservation = {
  id: string;
  customerName: string;
  packageId: string;
  packageName: string;
  bookingDate: string;
  travelDate: string;
  status: 'Confirmada' | 'Pendente' | 'Cancelada';
  totalPrice: number;
  travelers: number;
  agentAvatarUrl: string;
};

export type Itinerary = {
  id: string;
  title: string;
  package: string;
  status: 'Em rascunho' | 'Publicado' | 'Arquivado';
  description: string;
};

export type Negotiation = {
    id: string;
    customerName: string;
    packageName: string;
    value: number;
    agentId: string;
    status: 'Lead' | 'Proposta Enviada' | 'Em Negociação' | 'Ganhos' | 'Perdido';
}
