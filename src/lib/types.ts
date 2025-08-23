
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
  badge?: number;
  external?: boolean;
};

export type Quote = {
  id: string;
  date: string;
  client: {
    name: string;
    avatarUrl: string;
  };
  value: number;
  status: 'aguardando' | 'em-cotacao' | 'aguardando-cliente' | 'aprovado' | 'reprovado';
};

export type Project = {
  id: string;
  title: string;
  description: string;
  members: {
    avatarUrl: string;
    name: string;
  }[];
  progress: number;
};
