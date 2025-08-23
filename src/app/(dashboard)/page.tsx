
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { mockAppointments } from "@/lib/mock-data";
import { ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import { DollarSign, Plane, ListTodo, Users, PieChart as PieChartIcon, UserCheck, Donut, TrendingUp, TrendingDown } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";

const COLORS = ['hsl(var(--chart-1))', 'hsl(var(--muted))'];
const COLORS_REVENUE = ['hsl(var(--chart-1))', 'hsl(var(--chart-4))', 'hsl(var(--chart-2))'];

const budgetData = [
    { name: 'Aprovado', value: 85.7 },
    { name: 'Aguardando', value: 14.3 }
];
const revenueByCategoryData = [
    { name: 'Venda de Passagem', value: 72.7 },
    { name: 'VISTO PROC. TRABALHO', value: 26.0 },
    { name: 'passaporte', value: 1.3 },
];
const expensesByCategoryData = [
    { name: 'Pagamento Fornecedor', value: 100 },
];


export default function DashboardPage() {

  return (
    <div className="p-4 sm:p-6 grid grid-cols-1 xl:grid-cols-3 gap-6">
      
      {/* Coluna Esquerda */}
      <div className="col-span-1 flex flex-col gap-6">
        {/* Próximos voos */}
        <Card>
            <CardHeader>
                <CardTitle className="text-base">Próximos voos</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                {mockAppointments.filter(a => a.type === 'departure').map(flight => (
                    <div key={flight.id} className="grid grid-cols-[auto,1fr] items-center gap-4">
                        <span className="text-sm font-semibold">{new Date(flight.date).toLocaleTimeString('pt-BR', {hour: '2-digit', minute: '2-digit', timeZone: 'UTC'})}</span>
                        <div>
                            <p className="font-semibold text-sm">{flight.customer}</p>
                            <p className="text-xs text-muted-foreground">{flight.package}</p>
                        </div>
                    </div>
                ))}
                <div className="flex gap-2">
                    <Badge variant="destructive">2 em período de check-in</Badge>
                    <Badge variant="secondary">46 voos pendentes</Badge>
                </div>
            </CardContent>
        </Card>
        
        {/* Orçamentos */}
        <Card>
            <CardHeader>
                <CardTitle className="text-base">Orçamentos</CardTitle>
            </CardHeader>
            <CardContent>
                <div style={{ width: '100%', height: 200 }}>
                    <ResponsiveContainer>
                        <PieChart>
                            <Pie data={budgetData} dataKey="value" cx="50%" cy="50%" outerRadius={80} strokeWidth={0}>
                                {budgetData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Legend formatter={(value, entry) => <span className="text-foreground text-sm">{value}</span>} />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>

        {/* Vendas Agentes */}
        <Card>
             <CardContent className="pt-6 space-y-4">
                 <div className="flex items-center justify-between">
                     <div className="flex items-center gap-2">
                         <Avatar className="w-10 h-10">
                            <AvatarImage src="https://i.pinimg.com/736x/c6/33/91/c633913aa268fe47d9dede01ca38eba7.jpg" />
                            <AvatarFallback>CC</AvatarFallback>
                         </Avatar>
                         <div>
                            <p className="text-sm font-semibold">Casal em Coimbra</p>
                            <p className="text-xs font-semibold text-green-500">100.00 %</p>
                         </div>
                     </div>
                     <div className="text-right">
                         <Badge variant="default" className="bg-blue-100 text-blue-600">4 orçamentos</Badge>
                         <p className="text-sm font-bold mt-1">R$ 48.666,18</p>
                         <Badge variant="default" className="bg-green-100 text-green-600 mt-1">4 aprovados</Badge>
                         <p className="text-sm font-bold mt-1">R$ 48.666,18</p>
                     </div>
                 </div>
                 <div className="flex items-center justify-between">
                     <div className="flex items-center gap-2">
                         <Avatar className="w-10 h-10">
                            <AvatarImage src="https://i.pinimg.com/736x/c6/33/91/c633913aa268fe47d9dede01ca38eba7.jpg" />
                            <AvatarFallback>CD</AvatarFallback>
                         </Avatar>
                         <div>
                            <p className="text-sm font-semibold">Comissões</p>
                         </div>
                     </div>
                     <div className="text-right">
                         <Badge variant="default" className="bg-blue-100 text-blue-600">0 orçamentos</Badge>
                         <p className="text-sm font-bold mt-1">R$ 0,00</p>
                         <Badge variant="default" className="bg-green-100 text-green-600 mt-1">0 aprovados</Badge>
                         <p className="text-sm font-bold mt-1">R$ 0,00</p>
                     </div>
                 </div>
            </CardContent>
        </Card>
        
        {/* Receitas por Categoria */}
        <Card>
            <CardHeader>
                <CardTitle className="text-base">Receitas por Categoria</CardTitle>
            </CardHeader>
            <CardContent>
                <div style={{ width: '100%', height: 200 }}>
                    <ResponsiveContainer>
                        <PieChart>
                            <Pie data={revenueByCategoryData} dataKey="value" cx="50%" cy="50%" innerRadius={50} outerRadius={80} strokeWidth={0} paddingAngle={5}>
                                {revenueByCategoryData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS_REVENUE[index % COLORS_REVENUE.length]} />
                                ))}
                            </Pie>
                            <Legend formatter={(value, entry) => <span className="text-foreground text-sm">{value}</span>} />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>

        {/* Receitas para hoje */}
        <Card>
             <CardHeader>
                <CardTitle className="text-base">Receitas para hoje, dia {new Date().getDate()}</CardTitle>
            </CardHeader>
             <CardContent className="flex flex-col items-center justify-center text-center text-muted-foreground py-8">
                <DollarSign className="w-8 h-8 mb-2" />
                <p>Nenhuma receita para o dia de hoje.</p>
            </CardContent>
        </Card>

      </div>
      
      {/* Coluna Direita */}
      <div className="col-span-1 xl:col-span-2 flex flex-col gap-6">
        
        {/* Tarefas */}
        <Card>
             <CardHeader>
                <CardTitle className="text-base">Tarefas para hoje, dia {new Date().getDate()}</CardTitle>
            </CardHeader>
             <CardContent className="flex flex-col items-center justify-center text-center text-muted-foreground py-8">
                <ListTodo className="w-8 h-8 mb-2" />
                <p>Você não possui nenhuma tarefa para o dia de hoje.</p>
            </CardContent>
        </Card>

        {/* Top 10 Clientes */}
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-base">Top 10 Clientes</CardTitle>
                <Button size="sm">Faturamento</Button>
            </CardHeader>
            <CardContent>
                <div className="space-y-2 text-sm">
                    <div className="flex justify-between"><span>1) Aneline de Albuquerque Linhares</span> <span className="font-semibold">1 venda(s) <span className="ml-4">18.570,00</span></span></div>
                    <div className="flex justify-between"><span>2) JULIO VENANCIO MENEZES</span> <span className="font-semibold">1 venda(s) <span className="ml-4">13.440,00</span></span></div>
                    <div className="flex justify-between"><span>3) Lidiane da Silva Seidentules</span> <span className="font-semibold">1 venda(s) <span className="ml-4">11.400,00</span></span></div>
                    <div className="flex justify-between"><span>4) Gerson Wilson de Siqueira Campos</span> <span className="font-semibold">1 venda(s) <span className="ml-4">8.700,00</span></span></div>
                    <div className="flex justify-between"><span>5) Marla Brandão Silva Gaspar</span> <span className="font-semibold">1 venda(s) <span className="ml-4">4.800,00</span></span></div>
                </div>
            </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Vendas por agente */}
            <Card>
                 <CardContent className="pt-6 space-y-4">
                     <div className="flex items-center justify-between">
                         <div className="flex items-center gap-2">
                             <Avatar className="w-10 h-10">
                                <AvatarImage src="https://placehold.co/100x100" />
                                <AvatarFallback>E</AvatarFallback>
                             </Avatar>
                             <div>
                                <p className="text-sm font-semibold">É o Nosso Quintal</p>
                                <p className="text-xs font-semibold text-green-500">100.00 %</p>
                             </div>
                         </div>
                         <div className="text-right">
                             <Badge variant="default" className="bg-blue-100 text-blue-600">1 orçamentos</Badge>
                             <p className="text-sm font-bold mt-1">R$ 18.450,00</p>
                             <Badge variant="default" className="bg-green-100 text-green-600 mt-1">1 aprovados</Badge>
                             <p className="text-sm font-bold mt-1">R$ 18.450,00</p>
                         </div>
                     </div>
                </CardContent>
            </Card>
             <Card>
                 <CardContent className="pt-6 space-y-4">
                     <div className="flex items-center justify-between">
                         <div className="flex items-center gap-2">
                             <Avatar className="w-10 h-10">
                                <AvatarImage src="https://placehold.co/100x100" />
                                <AvatarFallback>M</AvatarFallback>
                             </Avatar>
                             <div>
                                <p className="text-sm font-semibold">Maxshuel</p>
                                <p className="text-xs font-semibold text-green-500">50.00 %</p>
                             </div>
                         </div>
                         <div className="text-right">
                             <Badge variant="default" className="bg-blue-100 text-blue-600">2 orçamentos</Badge>
                             <p className="text-sm font-bold mt-1">R$ 0,00</p>
                             <Badge variant="default" className="bg-green-100 text-green-600 mt-1">1 aprovados</Badge>
                             <p className="text-sm font-bold mt-1">R$ 0,00</p>
                         </div>
                     </div>
                </CardContent>
            </Card>
        </div>

        {/* Métricas Financeiras */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="col-span-1 md:col-span-2">
                <CardHeader>
                    <CardTitle className="text-base text-muted-foreground">Recebido (R$)</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-3xl font-bold">67.206,18</p>
                </CardContent>
            </Card>
            <Card className="col-span-1 md:col-span-2">
                <CardHeader>
                    <CardTitle className="text-base text-muted-foreground">Pago (R$)</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-3xl font-bold">60.582,30</p>
                </CardContent>
            </Card>
             <Card>
                <CardHeader>
                    <CardTitle className="text-base text-muted-foreground">Faturamento (R$)</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-2xl font-bold">67.206,18</p>
                </CardContent>
            </Card>
             <Card>
                <CardHeader>
                    <CardTitle className="text-base text-muted-foreground">Lucro (R$)</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-2xl font-bold">6.623,88</p>
                </CardContent>
            </Card>
             <Card>
                <CardHeader>
                    <CardTitle className="text-base text-muted-foreground">Ticket Médio (R$)</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-2xl font-bold">11.186,03</p>
                </CardContent>
            </Card>
        </div>
        
        {/* Despesas por categoria */}
         <Card>
            <CardHeader>
                <CardTitle className="text-base">Despesas por Categoria</CardTitle>
            </CardHeader>
            <CardContent>
                <div style={{ width: '100%', height: 200 }}>
                    <ResponsiveContainer>
                        <PieChart>
                            <Pie data={expensesByCategoryData} dataKey="value" cx="50%" cy="50%" innerRadius={50} outerRadius={80} strokeWidth={0}>
                                <Cell fill={'hsl(var(--chart-1))'} />
                            </Pie>
                             <Legend formatter={(value, entry) => <span className="text-foreground text-sm">{value}</span>} />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
        
        {/* Despesas para hoje */}
         <Card>
             <CardHeader>
                <CardTitle className="text-base">Despesas para hoje, dia {new Date().getDate()}</CardTitle>
            </CardHeader>
             <CardContent className="flex flex-col items-center justify-center text-center text-muted-foreground py-8">
                <DollarSign className="w-8 h-8 mb-2" />
                <p>Nenhuma despesa para o dia de hoje.</p>
            </CardContent>
        </Card>

      </div>
    </div>
  );
}

    