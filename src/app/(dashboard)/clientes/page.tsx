
'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { UserForm } from "@/components/user-form";
import { mockUsers } from "@/lib/mock-data";
import type { User } from '@/lib/types';
import { MoreHorizontal, PlusCircle, User as UserIcon, Mail, Phone, FileText, Heart, Info, X } from "lucide-react";
import { useToast } from '@/hooks/use-toast';
import { Separator } from '@/components/ui/separator';

const ClientDetailsDialog = ({ user, isOpen, onOpenChange }: { user: User | null, isOpen: boolean, onOpenChange: (isOpen: boolean) => void }) => {
    if (!user) return null;
    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 font-headline text-primary">
                        <Avatar>
                           <AvatarImage src={user.avatarUrl} alt={user.name} />
                           <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        {user.name}
                    </DialogTitle>
                    <DialogDescription>Detalhes completos do cliente.</DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-2">
                    <div className="flex items-center gap-3">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{user.email}</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{user.phone || 'Não informado'}</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <FileText className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{user.document || 'Não informado'}</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <Heart className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{user.travelStyle ? <Badge variant="outline">{user.travelStyle}</Badge> : 'Não informado'}</span>
                    </div>
                    <Separator />
                     <div className="space-y-2">
                        <h4 className="flex items-center gap-2 text-sm font-semibold">
                            <Info className="h-4 w-4 text-muted-foreground" />
                            Preferências e Observações
                        </h4>
                        <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                            {user.preferences || 'Nenhuma observação registrada.'}
                        </p>
                    </div>
                </div>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="outline">Fechar</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default function ClientsPage() {
  const [users, setUsers] = useState<User[]>(mockUsers.filter(u => u.role === 'Cliente'));
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const { toast } = useToast();

  const handleAddUser = () => {
    setSelectedUser(null);
    setIsFormOpen(true);
  };
  
  const handleDetailsUser = (user: User) => {
    setSelectedUser(user);
    setIsDetailsOpen(true);
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
    toast({ title: "Cliente Excluído", description: `O cliente ${selectedUser.name} foi removido.` });
    setIsDeleteAlertOpen(false);
    setSelectedUser(null);
  };
  
  const handleFormSubmit = (values: Partial<Omit<User, 'id' | 'role' | 'status' | 'avatarUrl'>>) => {
    if (selectedUser) {
      // Edit
      const updatedUser = { ...selectedUser, ...values };
      setUsers(users.map((user) => (user.id === selectedUser.id ? updatedUser : user)));
      toast({ title: "Cliente Atualizado", description: `Os dados de ${updatedUser.name} foram atualizados.` });
    } else {
      // Add
      const newUser: User = { 
        ...values,
        id: (users.length + 1 + Date.now()).toString(),
        avatarUrl: 'https://placehold.co/100x100',
        role: 'Cliente',
        status: 'Ativo'
      };
      setUsers([newUser, ...users]);
      toast({ title: "Cliente Adicionado", description: `O cliente ${newUser.name} foi adicionado com sucesso.` });
    }
    setIsFormOpen(false);
    setSelectedUser(null);
  };

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
              <CardTitle className="font-headline text-primary">Gerenciamento de Clientes</CardTitle>
              <CardDescription>Adicione, edite ou remova clientes da sua base.</CardDescription>
          </div>
          <Button onClick={handleAddUser}>
              <PlusCircle className="mr-2 h-4 w-4" />
              Adicionar Cliente
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
              <TableHeader>
                  <TableRow>
                      <TableHead>Cliente</TableHead>
                      <TableHead>Contato</TableHead>
                      <TableHead>Documento</TableHead>
                      <TableHead>Estilo de Viagem</TableHead>
                      <TableHead>
                          <span className="sr-only">Ações</span>
                      </TableHead>
                  </TableRow>
              </TableHeader>
              <TableBody>
                  {users.map((user) => (
                      <TableRow key={user.id} className="cursor-pointer" onClick={() => handleDetailsUser(user)}>
                          <TableCell>
                              <div className="flex items-center gap-3">
                                  <Avatar>
                                      <AvatarImage src={user.avatarUrl} alt={user.name} />
                                      <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                                  </Avatar>
                                  <div>
                                      <p className="font-medium">{user.name}</p>
                                  </div>
                              </div>
                          </TableCell>
                          <TableCell>
                                <p className="text-sm text-muted-foreground">{user.email}</p>
                                <p className="text-xs text-muted-foreground">{user.phone}</p>
                          </TableCell>
                           <TableCell>
                                {user.document ? (
                                    <span className="text-sm text-muted-foreground">{user.document}</span>
                                ) : (
                                    <span className="text-xs text-muted-foreground">N/A</span>
                                )}
                          </TableCell>
                          <TableCell>
                            {user.travelStyle ? (
                              <Badge variant="outline">{user.travelStyle}</Badge>
                            ) : (
                              <span className="text-xs text-muted-foreground">N/A</span>
                            )}
                          </TableCell>
                          <TableCell onClick={(e) => e.stopPropagation()}>
                              <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                  <Button aria-haspopup="true" size="icon" variant="ghost">
                                      <MoreHorizontal className="h-4 w-4" />
                                      <span className="sr-only">Toggle menu</span>
                                  </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end">
                                      <DropdownMenuLabel>Ações</DropdownMenuLabel>
                                      <DropdownMenuItem onSelect={() => handleDetailsUser(user)}>Ver Detalhes</DropdownMenuItem>
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
        isClientForm={true}
      />
      
      <ClientDetailsDialog 
        user={selectedUser}
        isOpen={isDetailsOpen}
        onOpenChange={setIsDetailsOpen}
      />

      <AlertDialog open={isDeleteAlertOpen} onOpenChange={setIsDeleteAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
            <AlertDialogDescription>
              Essa ação não pode ser desfeita. Isso excluirá permanentemente o cliente e removerá seus dados de nossos servidores.
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
