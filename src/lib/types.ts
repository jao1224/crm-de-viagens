
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
  clientId: string;
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

export interface Program {
  id: string;
  nome: string;
  valorMilheiro: string;
  isActive: boolean;
}

export interface ProductService {
    id: string;
    name: string;
    value: string;
    isActive: boolean;
}

export interface RevenueExpenseCategory {
    id: string;
    type: 'receita' | 'despesa';
    name: string;
    active: boolean;
}

export interface SalesChannel {
    id: string;
    name: string;
    isActive: boolean;
}

export interface Contract {
    id: string;
    name: string;
    content: string;
    isActive: boolean;
}

export interface RejectionReason {
    id: string;
    name: string;
    isActive: boolean;
}

export interface Tag {
    id: string;
    name: string;
    type: 'Pessoa' | 'Cotação';
    color: string;
    isActive: boolean;
}

export type Flight = {
    id: string;
    dateTime: Date;
    passengers: string[];
    whatsappIcon: boolean;
    from: string;
    to: string;
    flightType: 'Ida' | 'Volta';
    airline: string;
    locator: string;
    status: 'check-in-open' | 'notify-check-in' | 'completed' | 'scheduled';
};

export type Person = {
  id: string;
  name: string;
  rating: number;
  types: string[];
  cpfCnpj: string;
  phone: string;
  email: string;
  sexo: string;
  nascimento: string;
  rg: string;
  orgaoEmissor: string;
  id_estrangeiro: string;
  nacionalidade: string;
  estadoCivil: string;
  passaporte: string;
  emissaoPassaporte: string;
  vencimentoPassaporte: string;
  nacionalidadePassaporte: string;
  visto: string;
  validadeVisto: string;
  active: boolean;
  avatarUrl: string;
};
