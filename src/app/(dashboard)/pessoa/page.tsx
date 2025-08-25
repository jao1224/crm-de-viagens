
'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Gem, Eye, Pencil, Trash2, Filter } from 'lucide-react';
import Image from 'next/image';

const mockPeople = [
    { id: 1, name: 'Aalyah Evelyn Bulhões Domingues', rating: 5, types: ['Passageiro'], cpfCnpj: '', phone: '', active: true },
    { id: 2, name: 'Aayslah Raquel Bulhões Domingues', rating: 5, types: ['Passageiro'], cpfCnpj: '', phone: '', active: true },
    { id: 3, name: 'Abdessalam bara', rating: 5, types: ['Cliente'], cpfCnpj: '', phone: '', active: true },
    { id: 4, name: 'ADEILSON', rating: 0, types: ['Cliente'], cpfCnpj: '', phone: '', active: true },
    { id: 5, name: 'ADEMIR', rating: 0, types: ['Passageiro', 'Cliente'], cpfCnpj: '', phone: '', active: true },
    { id: 6, name: 'ADEMIR', rating: 0, types: ['Passageiro', 'Cliente'], cpfCnpj: '', phone: '', active: true },
    { id: 7, name: 'ADEMIR', rating: 0, types: ['Cliente'], cpfCnpj: '', phone: '', active: true },
    { id: 8, name: 'ADEMIR CAETANO', rating: 0, types: ['Passageiro'], cpfCnpj: '', phone: '', active: true },
    { id: 9, name: 'Adriana Bulhões Vieira', rating: 5, types: ['Passageiro', 'Cliente'], cpfCnpj: '', phone: '+5519996182481', active: true },
    { id: 10, name: 'Adriana e Davi', rating: 5, types: ['Cliente'], cpfCnpj: '', phone: '', active: true },
    { id: 11, name: 'ADRIANA E JAMILLA', rating: 0, types: ['Cliente'], cpfCnpj: '', phone: '', active: true },
    { id: 12, name: 'Adriano da Conceição Carreiro', rating: 0, types: ['Passageiro'], cpfCnpj: '080.659.707-02', phone: '', active: true },
    { id: 13, name: 'adriano e jamilla', rating: 0, types: ['Cliente'], cpfCnpj: '', phone: '', active: true },
    { id: 14, name: 'Adriano e jamilla', rating: 0, types: ['Cliente'], cpfCnpj: '', phone: '', active: true },
    { id: 15, name: 'Agatha Batista Amaral', rating: 0, types: ['Passageiro', 'Cliente'], cpfCnpj: '', phone: '', active: true },
    { id: 16, name: 'Agatha Batista Amaral', rating: 0, types: ['Passageiro'], cpfCnpj: '', phone: '', active: true },
    { id: 17, name: 'AILANA CLARA LIMA BARATA', rating: 5, types: ['Passageiro', 'Cliente'], cpfCnpj: '', phone: '(85) 98828-0142', active: true },
    { id: 18, name: 'Alessandra Neris Pereira', rating: 0, types: ['Passageiro'], cpfCnpj: '282.332.928-50', phone: '(11) 93961-6954', active: true },
    { id: 19, name: 'Alessandro Cavalcante', rating: 5, types: ['Passageiro', 'Cliente'], cpfCnpj: '', phone: '(98) 99991-5130', active: true },
];

const RatingStars = ({ rating }: { rating: number }) => (
    <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
            <Gem key={i} className={`h-4 w-4 ${i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
        ))}
    </div>
);

const PhoneCell = ({ phone }: { phone: string }) => {
    if (!phone) return null;

    let flag = '';
    if (phone.includes('(85)') || phone.includes('(98)')) {
        flag = '/flags/br.svg';
    } else if (phone.startsWith('+55')) {
        flag = '/flags/br.svg';
    }

    return (
        <div className="flex items-center gap-2">
            {flag && <Image src={flag} alt="Bandeira" width={16} height={12} />}
            <span>{phone}</span>
        </div>
    );
};

export default function PessoasPage() {
    return (
        <div className="space-y-6">
            <header className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-primary">Pessoas</h1>
                <Button>Novo</Button>
            </header>

            <Card>
                <CardContent className="p-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[2fr,1fr,1fr,1fr,auto,auto] gap-4 items-end">
                        <div className="space-y-1">
                            <label className="text-sm font-medium text-muted-foreground px-1">Nome</label>
                            <Input placeholder="Nome" />
                        </div>
                        <div className="space-y-1">
                            <label className="text-sm font-medium text-muted-foreground px-1">CPF/CNPJ</label>
                            <Input placeholder="CPF/CNPJ" />
                        </div>
                        <div className="space-y-1">
                            <label className="text-sm font-medium text-muted-foreground px-1">Tipo</label>
                            <Select defaultValue="todos">
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="todos">Todos</SelectItem>
                                    <SelectItem value="cliente">Cliente</SelectItem>
                                    <SelectItem value="passageiro">Passageiro</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-1">
                            <label className="text-sm font-medium text-muted-foreground px-1">Situação</label>
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
                        <Button variant="outline" size="icon">
                            <Filter className="h-4 w-4" />
                        </Button>
                        <Button>Pesquisar</Button>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardContent className="p-0">
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-[30%]">Nome</TableHead>
                                    <TableHead>Tipo</TableHead>
                                    <TableHead>CPF/CNPJ</TableHead>
                                    <TableHead>Celular</TableHead>
                                    <TableHead>Ativo</TableHead>
                                    <TableHead className="text-right">Ações</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {mockPeople.map((person) => (
                                    <TableRow key={person.id}>
                                        <TableCell className="font-medium">
                                            <div className="flex items-center gap-2">
                                                <span>{person.name}</span>
                                                {person.rating > 0 && <RatingStars rating={person.rating} />}
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex flex-wrap gap-1">
                                                {person.types.map(type => (
                                                    <Badge key={type} variant="secondary" className="font-normal">{type}</Badge>
                                                ))}
                                            </div>
                                        </TableCell>
                                        <TableCell>{person.cpfCnpj}</TableCell>
                                        <TableCell>
                                            <PhoneCell phone={person.phone} />
                                        </TableCell>
                                        <TableCell>
                                            <Switch checked={person.active} />
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <Button variant="ghost" size="icon">
                                                    <Eye className="h-4 w-4" />
                                                </Button>
                                                <Button variant="ghost" size="icon">
                                                    <Pencil className="h-4 w-4" />
                                                </Button>
                                                <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive">
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

    