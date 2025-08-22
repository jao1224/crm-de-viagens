
'use client';

import { useState, useRef, useEffect } from 'react';
import { useTheme } from "next-themes"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useToast } from '@/hooks/use-toast';
import { Camera, Shield, Info, Palette } from 'lucide-react';
import { Switch } from '@/components/ui/switch';


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
        name: 'Ana Costa',
        email: 'ana.costa@travelflow.com',
        phone: '+55 11 98765-4321',
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
          <CardTitle className="font-headline text-primary">Meu Perfil</CardTitle>
          <CardDescription>Gerencie suas informações pessoais e configurações de segurança.</CardDescription>
        </CardHeader>
        <CardContent>
            {/* Profile Section */}
            <div className="space-y-4">
                <h3 className="text-lg font-semibold flex items-center gap-2"><Camera className="w-5 h-5"/> Informações Pessoais</h3>
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
                            <Input id="name" defaultValue={user.name} readOnly />
                        </div>
                        <div className="space-y-1">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" type="email" defaultValue={user.email} readOnly />
                        </div>
                         <div className="space-y-1">
                            <Label htmlFor="phone">Telefone</Label>
                            <Input id="phone" type="tel" defaultValue={user.phone} />
                        </div>
                    </div>
                    <div className="text-xs text-muted-foreground flex items-center gap-1.5 p-2 bg-muted/50 rounded-md">
                        <Info className="w-4 h-4" />
                        <span>Para alterar seu nome ou e-mail, entre em contato com um administrador.</span>
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

        </CardContent>
      </Card>
      
      <Card>
          <CardHeader>
            <CardTitle className="font-headline text-primary">Preferências de Aparência</CardTitle>
            <CardDescription>Gerencie a aparência da interface.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
              {/* Preferences Section */}
              <div className="space-y-4">
                  <h3 className="text-lg font-semibold flex items-center gap-2"><Palette className="w-5 h-5"/> Aparência</h3>
                  <div className="space-y-4 pl-6 border-l-2 border-primary/20 ml-3">
                      <ThemeSwitcher />
                  </div>
              </div>
          </CardContent>
        </Card>
    </div>
  );
}
