
'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { UserSearch } from "lucide-react";

export default function NovoUsuarioPage() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Cadastro de Usuário</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="nome">Nome <span className="text-destructive">*</span></Label>
              <Input id="nome" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="sobrenome">Sobrenome <span className="text-destructive">*</span></Label>
              <Input id="sobrenome" />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="email">E-mail <span className="text-destructive">*</span></Label>
              <Input id="email" type="email" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="celular">Celular</Label>
              <Input id="celular" />
            </div>
          </div>
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
            <Textarea id="observacao" />
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline">Cancelar</Button>
            <Button>Salvar</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
