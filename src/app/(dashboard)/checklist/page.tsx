import { Checklist, type ChecklistItem } from '@/components/checklist';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const checklistItems: ChecklistItem[] = [
    { module: 'Módulo Core', task: 'Dashboard de KPIs e Gráficos', status: 'done' },
    { module: 'Módulo Core', task: 'Gerenciamento de Pacotes de Viagem (com filtros)', status: 'done' },
    { module: 'Módulo Core', task: 'Página de Detalhes dos Pacotes', status: 'done' },
    { module: 'Módulo Core', task: 'Gerenciamento de Reservas (CRUD)', status: 'done' },
    { module: 'Módulo Core', task: 'Gerenciamento de Itinerários (com localStorage)', status: 'done' },
    { module: 'Módulo Core', task: 'Visualização de Agenda/Calendário', status: 'done' },
    
    { module: 'Funcionalidades de IA', task: 'IA para Recomendar Pacotes e gerar Proposta', status: 'done' },
    { module: 'Funcionalidades de IA', task: 'IA para Gerar Descrição de Itinerários', status: 'done' },
    
    { module: 'Gestão de Usuários e Clientes', task: 'Módulo de Cadastro de Clientes (básico)', status: 'done' },
    { module: 'Gestão de Usuários e Clientes', task: 'Módulo de Permissões de Admin (básico)', status: 'done' },
    { module: 'Gestão de Usuários e Clientes', task: 'Expandir Cadastro de Clientes (documentos, preferências)', status: 'todo' },
    { module: 'Gestão de Usuários e Clientes', task: 'Implementar Segmentação e Etiquetas Inteligentes', status: 'todo' },
    
    { module: 'Pipeline e Vendas', task: 'Visualização de Vendas em Kanban', status: 'todo' },
    { module: 'Pipeline e Vendas', task: 'Templates de Propostas e Orçamentos', status: 'todo' },
    { module: 'Pipeline e Vendas', task: 'Integração com gateway de pagamento', status: 'todo' },

    { module: 'Pós-Venda e Fidelização', task: 'Checklist da Viagem para o cliente', status: 'todo' },
    { module: 'Pós-Venda e Fidelização', task: 'Pesquisas de Satisfação (NPS)', status: 'todo' },
    { module: 'Pós-Venda e Fidelização', task: 'Programa de Pontos e Fidelidade', status: 'todo' },
    
    { module: 'Relatórios e Módulos Faltantes', task: 'Expandir Módulo de Relatórios e Financeiro', status: 'todo' },
    { module: 'Relatórios e Módulos Faltantes', task: 'Módulo de Captação de Leads (formulários, etc.)', status: 'todo' },
    
    { module: 'Infraestrutura', task: 'Conectar a um banco de dados real (Firebase Firestore)', status: 'todo' },
  ];

export default function ChecklistPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline text-primary">Checklist de Desenvolvimento</CardTitle>
        <CardDescription>
          Nosso progresso e os próximos passos para construir o CRM de viagens completo.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Checklist items={checklistItems} />
      </CardContent>
    </Card>
  );
}
