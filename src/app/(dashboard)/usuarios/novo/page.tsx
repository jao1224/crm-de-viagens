
'use client';

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { UserSearch, ArrowLeft } from "lucide-react";
import { cn } from '@/lib/utils';

const funcionalidades = [
    'Dashboard', 'Orçamentos', 'Comprovante de Pagamento', 'Voos', 'Financeiro', 'Agência', 'Pessoas', 'Cartão de Crédito', 'Programas', 'Tipos de Receita/Despesa', 'Conta Bancária', 'Mensagem', 'Faturas', 'Canal de Venda', 'Comunicação por E-mail', 'Contrato', 'Avaliação de Clientes', 'Motivo de Reprovação', 'Configurar Painel de Cotações', 'Calendário', 'Etiquetas', 'Automação de Tarefas', 'Link de Cotação', 'Link de Pessoa', 'Produto/Serviço', 'Galeria de Imagens', 'Comunicação por Whatsapp', 'Forma de Pagamento'
];

const steps = [
  { id: 1, title: 'Informações Pessoais', description: 'Dados básicos do novo usuário.' },
  { id: 2, title: 'Configurações de Acesso', description: 'Defina as regras e comissões.' },
  { id: 3, title: 'Permissões Detalhadas', description: 'Controle o acesso a cada módulo.' },
];

export default function NovoUsuarioPage() {
  const [currentStep, setCurrentStep] = useState(1);

  const goToNextStep = () => setCurrentStep(prev => Math.min(prev + 1, steps.length));
  const goToPreviousStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
        {/* Header com Steps */}
        <div className="space-y-2">
            <div className="flex items-center gap-4">
                {currentStep > 1 && (
                    <Button variant="ghost" size="icon" onClick={goToPreviousStep}>
                        <ArrowLeft className="h-5 w-5" />
                    </Button>
                )}
                <h1 className="text-2xl font-bold text-primary">Cadastro de Novo Usuário</h1>
            </div>
            
            <div className="flex items-center justify-between p-2 rounded-lg">
                {steps.map((step, index) => (
                    <React.Fragment key={step.id}>
                        <div className="flex flex-col items-center text-center">
                             <div
                                className={cn(
                                    "w-10 h-10 rounded-full flex items-center justify-center font-bold border-2 transition-all",
                                    currentStep > step.id ? "bg-primary border-primary text-primary-foreground" :
                                    currentStep === step.id ? "bg-primary/20 border-primary text-primary" :
                                    "bg-muted border-border text-muted-foreground"
                                )}
                            >
                                {currentStep > step.id ? '✓' : step.id}
                            </div>
                            <p className={cn(
                                "text-xs mt-2 font-semibold",
                                currentStep >= step.id ? "text-foreground" : "text-muted-foreground"
                            )}>
                                {step.title}
                            </p>
                        </div>
                        {index < steps.length - 1 && (
                            <div className={cn(
                                "flex-1 h-0.5 mx-4 transition-colors",
                                currentStep > index + 1 ? "bg-primary" : "bg-border"
                            )} />
                        )}
                    </React.Fragment>
                ))}
            </div>
        </div>

      {/* Step Content */}
      <Card>
        <CardHeader>
          <CardTitle>{steps[currentStep - 1].title}</CardTitle>
          <CardDescription>{steps[currentStep - 1].description}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
            {currentStep === 1 && (
                 <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                        <Label htmlFor="nome">Nome <span className="text-destructive">*</span></Label>
                        <Input id="nome" placeholder="Digite o primeiro nome"/>
                        </div>
                        <div className="space-y-2">
                        <Label htmlFor="sobrenome">Sobrenome <span className="text-destructive">*</span></Label>
                        <Input id="sobrenome" placeholder="Digite o sobrenome"/>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                        <Label htmlFor="email">E-mail <span className="text-destructive">*</span></Label>
                        <Input id="email" type="email" placeholder="exemplo@email.com"/>
                        </div>
                        <div className="space-y-2">
                        <Label htmlFor="celular">Celular</Label>
                        <Input id="celular" placeholder="(00) 00000-0000"/>
                        </div>
                    </div>
                </div>
            )}

            {currentStep === 2 && (
                <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="space-y-2">
                        <Label htmlFor="tipo-usuario">Tipo de Usuário</Label>
                        <Select>
                            <SelectTrigger id="tipo-usuario">
                            <SelectValue placeholder="Acessa somente suas cotações" />
                            </SelectTrigger>
                            <SelectContent>
                            <SelectItem value="acessa-cotacoes">Acessa somente suas cotações</SelectItem>
                            </SelectContent>
                        </Select>
                        </div>
                        <div className="space-y-2">
                        <Label htmlFor="tarefas">Tarefas</Label>
                        <Select>
                            <SelectTrigger id="tarefas">
                            <SelectValue placeholder="Visualizar somente suas tarefas" />
                            </SelectTrigger>
                            <SelectContent>
                            <SelectItem value="visualizar-tarefas">Visualizar somente suas tarefas</SelectItem>
                            </SelectContent>
                        </Select>
                        </div>
                        <div className="space-y-2">
                        <Label htmlFor="acompanhamentos">Acompanhamentos da Cotação</Label>
                        <Select>
                            <SelectTrigger id="acompanhamentos">
                            <SelectValue placeholder="Somente das cotações que possui acesso" />
                            </SelectTrigger>
                            <SelectContent>
                            <SelectItem value="somente-acesso">Somente das cotações que possui acesso</SelectItem>
                            </SelectContent>
                        </Select>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                        <Label htmlFor="comissao">Comissão</Label>
                        <Input id="comissao" placeholder="%" />
                        </div>
                        <div className="space-y-2">
                        <Label htmlFor="pessoa">Pessoa</Label>
                        <div className="flex items-center gap-2">
                            <Input id="pessoa" value="Não informado" readOnly className="bg-muted" />
                            <Button size="icon" variant="default">
                            <UserSearch className="h-4 w-4" />
                            </Button>
                        </div>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="observacao">Observação</Label>
                        <Textarea id="observacao" placeholder="Alguma observação importante sobre este usuário?" />
                    </div>
                </div>
            )}

            {currentStep === 3 && (
                 <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[40%]">Funcionalidade</TableHead>
                            <TableHead className="text-center">Consulta</TableHead>
                            <TableHead className="text-center">Edição</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {funcionalidades.map((func) => (
                            <TableRow key={func}>
                                <TableCell className="font-medium">{func}</TableCell>
                                <TableCell className="text-center">
                                    <Switch defaultChecked />
                                </TableCell>
                                <TableCell className="text-center">
                                    <Switch defaultChecked />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            )}

        </CardContent>
      </Card>

      <div className="flex justify-end gap-2">
        <Button variant="outline">Cancelar</Button>
        {currentStep < steps.length && (
            <Button onClick={goToNextStep}>Próximo</Button>
        )}
        {currentStep === steps.length && (
            <Button>Salvar Usuário</Button>
        )}
      </div>
    </div>
  );
}
