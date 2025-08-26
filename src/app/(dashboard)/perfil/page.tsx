
'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User, Shield, FileSignature, Trash2 } from 'lucide-react';
import { currentUser } from '@/lib/mock-data';
import { Logo } from '@/components/logo';

const ProfileForm = () => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
    <div className="md:col-span-1 flex flex-col items-center gap-4">
      <Avatar className="h-40 w-40 border-4 border-primary/20">
        <AvatarImage src={currentUser.avatarUrl} alt={currentUser.name} />
        <AvatarFallback>{currentUser.name.charAt(0)}</AvatarFallback>
      </Avatar>
      <Button variant="destructive">
        <Trash2 className="mr-2 h-4 w-4" />
        Remover
      </Button>
    </div>
    <div className="md:col-span-2 space-y-6">
      <div className="space-y-2">
        <Label htmlFor="nome">Nome <span className="text-destructive">*</span></Label>
        <Input id="nome" defaultValue={currentUser.name.split(' ')[0]} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="sobrenome">Sobrenome <span className="text-destructive">*</span></Label>
        <Input id="sobrenome" defaultValue={currentUser.name.split(' ').slice(1).join(' ')} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="celular">Celular <span className="text-destructive">*</span></Label>
        <Input id="celular" defaultValue="(85) 99436-2280" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">E-mail <span className="text-destructive">*</span></Label>
        <div className="flex items-center gap-2">
          <Input id="email" defaultValue={currentUser.email} readOnly className="bg-muted" />
          <Button variant="outline">Alterar e-mail</Button>
        </div>
      </div>
       <div className="flex justify-end">
         <Button>Salvar</Button>
      </div>
    </div>
  </div>
);

const PasswordForm = () => (
    <Card>
        <CardHeader>
            <CardTitle>Alterar Senha</CardTitle>
            <CardDescription>Para sua segurança, recomendamos o uso de senhas fortes.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
            <div className="space-y-2">
                <Label htmlFor="current-password">Senha Atual</Label>
                <Input id="current-password" type="password" />
            </div>
            <div className="space-y-2">
                <Label htmlFor="new-password">Nova Senha</Label>
                <Input id="new-password" type="password" />
            </div>
            <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirmar Nova Senha</Label>
                <Input id="confirm-password" type="password" />
            </div>
            <div className="flex justify-end">
                <Button>Salvar Nova Senha</Button>
            </div>
        </CardContent>
    </Card>
);

const SignatureForm = () => (
     <Card>
        <CardHeader>
            <CardTitle>Assinatura de E-mail</CardTitle>
            <CardDescription>Personalize a assinatura que aparecerá nos seus e-mails.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
             <div className="p-4 border-dashed border-2 rounded-md text-center text-muted-foreground">
                <FileSignature className="mx-auto h-12 w-12" />
                <p className="mt-2">Funcionalidade de assinatura em breve.</p>
            </div>
        </CardContent>
    </Card>
);


export default function PerfilPage() {
  const [isClient, setIsClient] = React.useState(false);

  React.useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null; // Ou um skeleton
  }

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-bold text-primary">Perfil</h1>
      </header>
      
        <Tabs defaultValue="meus-dados" className="w-full">
            <TabsList className="grid w-full grid-cols-3 max-w-md">
            <TabsTrigger value="meus-dados">
                <User className="mr-2 h-4 w-4" />
                Meus Dados
            </TabsTrigger>
            <TabsTrigger value="senha">
                <Shield className="mr-2 h-4 w-4" />
                Senha
            </TabsTrigger>
            <TabsTrigger value="assinatura">
                <FileSignature className="mr-2 h-4 w-4" />
                Assinatura
            </TabsTrigger>
            </TabsList>
            <TabsContent value="meus-dados" className="mt-6">
                <Card>
                    <CardContent className="p-6">
                        <ProfileForm />
                    </CardContent>
                </Card>
            </TabsContent>
            <TabsContent value="senha" className="mt-6">
            <PasswordForm />
            </TabsContent>
            <TabsContent value="assinatura" className="mt-6">
            <SignatureForm />
            </TabsContent>
        </Tabs>
    </div>
  );
}
