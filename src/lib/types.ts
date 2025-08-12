import type { LucideIcon } from "lucide-react";

export type Property = {
  id: string;
  title: string;
  address: string;
  price: number;
  imageUrl: string;
  type: 'Casa' | 'Apartamento' | 'Lote';
  status: 'Novo' | 'Usado' | 'Repasse';
  bedrooms: number;
  bathrooms: number;
  area: number;
  dataAiHint: string;
};

export type Kpi = {
  title: string;
  value: string;
  change: string;
  changeType: 'increase' | 'decrease';
  icon: LucideIcon;
};

export type Sale = {
  month: string;
  repasse: number;
  novo: number;
  usado: number;
};

export type Appointment = {
  id: string;
  title: string;
  time: string;
  type: 'personal' | 'team' | 'company';
  attendees: string[];
};

export type NavItem = {
  href: string;
  label: string;
  icon: LucideIcon;
};
