
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
  type: 'meeting' | 'departure' | 'payment' | 'reminder' | 'task' | 'birthday' | 'flight' | 'hotel' | 'transport' | 'tour' | 'cruise';
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

export type User = {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
  status: 'active' | 'inactive';
  permission: string;
}

export type CreditCard = {
  id: string;
  descricao: string;
  ultimosDigitos: string;
  fechamento: string;
  vencimento: string;
  limite: string;
  anuidade: string;
  observacao: string;
  isActive: boolean;
};

export type BankAccount = {
  id: string;
  name: string;
  agency: string;
  accountNumber: string;
  initialBalance: string;
  balanceDate: string;
  isActive: boolean;
};

export interface PersonLink {
    id: string;
    description: string;
    instructions: string;
    personType: string;
    isActive: boolean;
}

export interface QuoteLink {
    id: string;
    description: string;
    affiliate?: string;
    salesChannel?: string;
    isPrincipal: boolean;
}

export interface PaymentMethod {
    id: string;
    nome: string;
    numeroParcelas: number;
    intervaloDias: number;
    desconto: string;
    acrescimo: string;
    observacao: string;
    isActive: boolean;
}
