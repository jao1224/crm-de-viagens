
'use client';

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Pencil, Trash2 } from 'lucide-react';
import { mockUsers } from '@/lib/mock-data';
import type { User } from '@/lib/types';

const UserCard = ({ user }: { user: User }) => {
  return (
    <Card>
      <CardContent className="p-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Avatar className="h-12 w-12">
            <AvatarImage src={user.avatarUrl} alt={user.name} />
            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="text-lg font-semibold text-foreground">{user.name}</h3>
            <p className="text-sm text-muted-foreground">{user.email}</p>
            <Badge variant="outline" className="mt-2 font-normal">{user.permission}</Badge>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Switch defaultChecked={user.status === 'active'} />
          <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary">
            <Pencil className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-destructive">
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default function UsuariosPage() {
  return (
    <div className="space-y-6">
      <header className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-primary">Usuários</h1>
        <Button>Novo</Button>
      </header>

      <Card>
        <CardContent className="p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
                <Badge variant="secondary" className="text-sm font-semibold">3 usuário(s) de 3 disponível(eis)</Badge>
            </div>
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <div className="flex-1 sm:flex-initial sm:w-48">
                  <p className="text-sm font-medium mb-1 text-muted-foreground">Situação</p>
                  <Select defaultValue="ativos">
                      <SelectTrigger>
                          <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                          <SelectItem value="ativos">Ativos</SelectItem>
                          <SelectItem value="inativos">Inativos</SelectItem>
                      </SelectContent>
                  </Select>
              </div>
              <Button className="self-end">Pesquisar</Button>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        {mockUsers.map(user => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>
    </div>
  );
}
