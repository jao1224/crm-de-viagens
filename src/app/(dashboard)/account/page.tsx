
'use client';

import { useState, useEffect, useRef } from 'react';
import { useTheme } from "next-themes"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { useToast } from '@/hooks/use-toast';
import { Camera, Shield, Bell, Palette } from 'lucide-react';

const ThemeSwitcher = () => {
    const { theme, setTheme } = useTheme();
    const [isDark, setIsDark] = useState(theme === 'dark');

    useEffect(() => {
        setIsDark(theme === 'dark');
    }, [theme]);

    const handleThemeChange = (checked: boolean) => {
        const newTheme = checked ? 'dark' : 'light';
        setTheme(newTheme);
    }
    
    // Avoid rendering on the server to prevent hydration mismatch
    const [mounted, setMounted] = useState(false)
    useEffect(() => setMounted(true), [])

    if (!mounted) {
        return null
    }

    return (
        <div className="flex items-center justify-between rounded-lg border p-3">
            <div>
                <Label htmlFor="theme-mode" className="font-medium">Modo Escuro (Dark Mode)</Label>
                <p className="text-xs text-muted-foreground">Alterne entre o tema claro e escuro da interface.</p>
            </div>
            <Switch 
                id="theme-mode"
                checked={isDark}
                onCheckedChange={handleThemeChange}
            />
        </div>
    );
};


export default function AccountPage() {
    const { toast } = useToast();
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Mock user data - in a real app, this would come from an auth context
    const [user, setUser] = useState({
        name: 'Agente de Viagens',
        email: 'agente@estateflow.com',
        phone: '+55 11 91234-5678',
        avatarUrl: 'https://placehold.co/100x100'
    });

    const handleProfileUpdate = (e: React.FormEvent) => {
        e.preventDefault();
        toast({
            title: "Perfil Atualizado!",
            description: "Suas informações foram salvas com sucesso."
        });
    }
    
    const handlePasswordChange = (e: React.FormEvent) => {
        e.preventDefault();
        toast({
            title: "Senha Alterada!",
            description: "Sua senha foi atualizada com segurança."
        });
    }

    const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setUser(prevUser => ({ ...prevUser, avatarUrl: reader.result as string }));
                toast({
                  title: 'Foto alterada!',
                  description: 'Sua nova foto de perfil está pronta. Clique em "Salvar Alterações" para mantê-la.',
                });
            };
            reader.readAsDataURL(file);
        }
    };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline text-primary">Minha Conta</CardTitle>
          <CardDescription>Gerencie suas informações pessoais, configurações de segurança e preferências.</CardDescription>
        </CardHeader>
        <CardContent>
            {/* Profile Section */}
            <div className="space-y-4">
                <h3 className="text-lg font-semibold flex items-center gap-2"><Camera className="w-5 h-5"/> Perfil</h3>
                <form onSubmit={handleProfileUpdate} className="space-y-4 pl-6 border-l-2 border-primary/20 ml-3">
                    <div className="flex items-center gap-4">
                        <Avatar className="h-20 w-20">
                            <AvatarImage src={user.avatarUrl} alt={user.name} />
                            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <input 
                            type="file" 
                            ref={fileInputRef} 
                            onChange={handleAvatarChange}
                            className="hidden"
                            accept="image/png, image/jpeg, image/jpg"
                        />
                        <Button type="button" variant="outline" onClick={() => fileInputRef.current?.click()}>Alterar Foto</Button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <Label htmlFor="name">Nome</Label>
                            <Input id="name" defaultValue={user.name} />
                        </div>
                        <div className="space-y-1">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" type="email" defaultValue={user.email} />
                        </div>
                         <div className="space-y-1">
                            <Label htmlFor="phone">Telefone</Label>
                            <Input id="phone" type="tel" defaultValue={user.phone} />
                        </div>
                    </div>
                     <Button type="submit">Salvar Alterações</Button>
                </form>
            </div>

            <Separator className="my-6" />

            {/* Security Section */}
            <div className="space-y-4">
                <h3 className="text-lg font-semibold flex items-center gap-2"><Shield className="w-5 h-5"/> Segurança</h3>
                <form onSubmit={handlePasswordChange} className="space-y-4 pl-6 border-l-2 border-primary/20 ml-3">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <Label htmlFor="current-password">Senha Atual</Label>
                            <Input id="current-password" type="password" />
                        </div>
                        <div className="space-y-1">
                            <Label htmlFor="new-password">Nova Senha</Label>
                            <Input id="new-password" type="password" />
                        </div>
                    </div>
                    <Button type="submit">Alterar Senha</Button>
                </form>
            </div>
            
            <Separator className="my-6" />

            {/* Preferences Section */}
            <div className="space-y-4">
                <h3 className="text-lg font-semibold flex items-center gap-2"><Palette className="w-5 h-5"/> Preferências</h3>
                 <div className="space-y-4 pl-6 border-l-2 border-primary/20 ml-3">
                    <ThemeSwitcher />
                 </div>
            </div>
            
            <Separator className="my-6" />

            {/* Notifications Section */}
            <div className="space-y-4">
                <h3 className="text-lg font-semibold flex items-center gap-2"><Bell className="w-5 h-5"/> Notificações</h3>
                 <div className="space-y-4 pl-6 border-l-2 border-primary/20 ml-3">
                    <div className="flex items-center justify-between rounded-lg border p-3">
                        <div>
                            <Label htmlFor="news-emails" className="font-medium">Novos Leads</Label>
                            <p className="text-xs text-muted-foreground">Receber um e-mail quando um novo lead for gerado.</p>
                        </div>
                        <Switch id="news-emails" defaultChecked/>
                    </div>
                    <div className="flex items-center justify-between rounded-lg border p-3">
                         <div>
                            <Label htmlFor="reservations-emails" className="font-medium">Reservas Confirmadas</Label>
                            <p className="text-xs text-muted-foreground">Receber um e-mail para cada nova reserva confirmada.</p>
                        </div>
                        <Switch id="reservations-emails" />
                    </div>
                 </div>
            </div>

        </CardContent>
      </Card>
    </div>
  );
}
