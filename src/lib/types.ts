import type { LucideIcon } from "lucide-react";

export type TravelPackage = {
  id: string;
  title: string;
  destination: string;
  price: number;
  imageUrl: string;
  type: 'Praia' | 'Montanha' | 'Negócios' | 'Cidade';
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
};

export type Booking = {
  month: string;
  praia: number;
  montanha: number;
  cidade: number;
};

export type Appointment = {
  id: string;
  title: string;
  time: string;
  type: 'client' | 'team' | 'provider';
  attendees: string[];
};

export type NavItem = {
  href: string;
  label: string;
  icon: LucideIcon;
};

export type User = {
  id: string;
  name: string;
  email: string;
  role: 'Administrador' | 'Agente de Viagem' | 'Cliente';
  status: 'Ativo' | 'Inativo';
  avatarUrl: string;
}
