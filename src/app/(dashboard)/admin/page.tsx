'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { UserForm } from "@/components/user-form";
import { mockUsers } from "@/lib/mock-data";
import type { User } from '@/lib/types';
import { MoreHorizontal, PlusCircle } from "lucide-react";
import { useToast } from '@/hooks/use-toast';

export default function AdminPage() {
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const { toast } = useToast();

  const getRoleVariant = (role: string) => {
    switch (role) {
      case 'Administrador': return 'default';
      case 'Agente de Viagem': return 'secondary';
      case 'Cliente': return 'outline';
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
  
  const handleFormSubmit = (values: Omit<User, 'id' | 'avatarUrl'>) => {
    if (selectedUser) {
      // Edit
      const updatedUser = { ...selectedUser, ...values };
      setUsers(users.map((user) => (user.id === selectedUser.id ? updatedUser : user)));
      toast({ title: "Usuário Atualizado", description: `Os dados de ${updatedUser.name} foram atualizados.` });
    } else {
      // Add
      const newUser = { 
        ...values, 
        id: (users.length + 1).toString(),
        avatarUrl: 'https://placehold.co/100x100'
      };
      setUsers([...users, newUser]);
      toast({ title: "Usuário Adicionado", description: `O usuário ${newUser.name} foi adicionado com sucesso.` });
    }
    setIsFormOpen(false);
    setSelectedUser(null);
  };

  return (
    <>
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

      <UserForm
        isOpen={isFormOpen}
        onOpenChange={setIsFormOpen}
        onSubmit={handleFormSubmit}
        user={selectedUser}
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