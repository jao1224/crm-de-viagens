
'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { UserForm } from '@/components/user-form';
import { mockUsers } from "@/lib/mock-data";
import type { User } from '@/lib/types';
import { MoreHorizontal, PlusCircle, Bell } from "lucide-react";
import { useToast } from '@/hooks/use-toast';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';

export default function AdminPage() {
  const [users, setUsers] = useState<User[]>(mockUsers.filter(u => u.role !== 'Cliente'));
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const { toast } = useToast();

  const getRoleVariant = (role: string) => {
    switch (role) {
      case 'Administrador': return 'default';
      case 'Agente de Viagem': return 'secondary';
      default: return 'outline';
    }
  };

  const getStatusVariant = (status: string) => {
    return status === 'Ativo' ? 'default' : 'destructive';
  };

  const handleAddUser = () => {
    setSelectedUser(null);
    setIsFormOpen(true);
  };

  const handleEditUser = (user: User) => {
    setSelectedUser(user);
    setIsFormOpen(true);
  };

  const handleDeleteUser = (user: User) => {
    setSelectedUser(user);
    setIsDeleteAlertOpen(true);
  };

  const confirmDelete = () => {
    if (!selectedUser) return;
    setUsers(users.filter((user) => user.id !== selectedUser.id));
    toast({ title: "Usuário Excluído", description: `O usuário ${selectedUser.name} foi removido.` });
    setIsDeleteAlertOpen(false);
    setSelectedUser(null);
  };
  
  const handleFormSubmit = (values: Omit<User, 'id' | 'avatarUrl' | 'role' | 'status'>) => {
    if (selectedUser) {
      // Edit
      const updatedUser = { ...selectedUser, ...values };
      setUsers(users.map((user) => (user.id === selectedUser.id ? updatedUser : user)));
      toast({ title: "Usuário Atualizado", description: `Os dados de ${updatedUser.name} foram atualizados.` });
    } else {
      // Add
      const newUser: User = { 
        ...values, 
        id: (users.length + 1 + Date.now()).toString(),
        avatarUrl: 'https://placehold.co/100x100',
        role: 'Agente de Viagem', // Default role for new users
        status: 'Ativo'
      };
      setUsers([newUser, ...users]);
      toast({ title: "Usuário Adicionado", description: `O usuário ${newUser.name} foi adicionado com sucesso.` });
    }
    setIsFormOpen(false);
    setSelectedUser(null);
  };

  return (
    <>
      <div className="space-y-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
                <CardTitle className="font-headline text-primary">Gerenciamento de Usuários</CardTitle>
                <CardDescription>Adicione, edite ou remova usuários do sistema.</CardDescription>
            </div>
            <Button onClick={handleAddUser}>
                <PlusCircle className="mr-2 h-4 w-4" />
                Adicionar Usuário
            </Button>
          </CardHeader>
          <CardContent>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Usuário</TableHead>
                        <TableHead>Perfil</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>
                            <span className="sr-only">Ações</span>
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {users.map((user) => (
                        <TableRow key={user.id}>
                            <TableCell>
                                <div className="flex items-center gap-3">
                                    <Avatar>
                                        <AvatarImage src={user.avatarUrl} alt={user.name} />
                                        <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <p className="font-medium">{user.name}</p>
                                        <p className="text-sm text-muted-foreground">{user.email}</p>
                                    </div>
                                </div>
                            </TableCell>
                            <TableCell>
                                <Badge variant={getRoleVariant(user.role)}>{user.role}</Badge>
                            </TableCell>
                            <TableCell>
                                <Badge variant={getStatusVariant(user.status)}>{user.status}</Badge>
                            </TableCell>
                            <TableCell>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                    <Button aria-haspopup="true" size="icon" variant="ghost">
                                        <MoreHorizontal className="h-4 w-4" />
                                        <span className="sr-only">Toggle menu</span>
                                    </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuLabel>Ações</DropdownMenuLabel>
                                        <DropdownMenuItem onSelect={() => handleEditUser(user)}>Editar</DropdownMenuItem>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem onSelect={() => handleDeleteUser(user)} className="text-destructive">Excluir</DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="font-headline text-primary">Configurações de Notificação</CardTitle>
            <CardDescription>Gerencie as notificações por e-mail para todo o sistema.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
              {/* Notifications Section */}
              <div className="space-y-4">
                  <h3 className="text-lg font-semibold flex items-center gap-2"><Bell className="w-5 h-5"/> Notificações por E-mail</h3>
                  <div className="space-y-4 pl-6 border-l-2 border-primary/20 ml-3">
                      <div className="flex items-center justify-between rounded-lg border p-3">
                          <div>
                              <Label htmlFor="news-emails" className="font-medium">Novos Leads</Label>
                              <p className="text-xs text-muted-foreground">Enviar um e-mail quando um novo lead for gerado.</p>
                          </div>
                          <Switch id="news-emails" defaultChecked/>
                      </div>
                      <div className="flex items-center justify-between rounded-lg border p-3">
                          <div>
                              <Label htmlFor="reservations-emails" className="font-medium">Reservas Confirmadas</Label>
                              <p className="text-xs text-muted-foreground">Enviar um e-mail para cada nova reserva confirmada.</p>
                          </div>
                          <Switch id="reservations-emails" />
                      </div>
                      <div className="flex items-center justify-between rounded-lg border p-3">
                          <div>
                              <Label htmlFor="support-emails" className="font-medium">Novo Chamado</Label>
                              <p className="text-xs text-muted-foreground">Enviar um e-mail quando um novo chamado for aberto.</p>
                          </div>
                          <Switch id="support-emails" />
                      </div>
                  </div>
              </div>
          </CardContent>
        </Card>
      </div>


      <UserForm
        isOpen={isFormOpen}
        onOpenChange={setIsFormOpen}
        onSubmit={handleFormSubmit}
        user={selectedUser}
        isClientForm={false}
      />

      <AlertDialog open={isDeleteAlertOpen} onOpenChange={setIsDeleteAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
            <AlertDialogDescription>
              Essa ação não pode ser desfeita. Isso excluirá permanentemente o usuário e removerá seus dados de nossos servidores.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setSelectedUser(null)}>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete}>Excluir</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
