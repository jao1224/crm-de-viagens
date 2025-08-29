
'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Trash2, FileText, Upload } from 'lucide-react';
import Image from 'next/image';
import { useToast } from '@/hooks/use-toast';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';

interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  description: string;
  quoteCount: number;
  size: string;
  type: 'Destino' | 'Hotel' | 'Passeio';
  dataAiHint: string;
}

const initialImages: GalleryImage[] = [
  { id: '1', src: 'https://placehold.co/600x400/003366/FFFFFF/png', alt: 'Rio de Janeiro', description: '', quoteCount: 1, size: '1.11 MB', type: 'Destino', dataAiHint: 'Rio de Janeiro' },
  { id: '2', src: 'https://placehold.co/600x400/333333/FFFFFF/png', alt: 'Ponte Estaiada em São Paulo', description: '', quoteCount: 1, size: '1.11 MB', type: 'Destino', dataAiHint: 'Sao Paulo' },
  { id: '3', src: 'https://placehold.co/600x400/663399/FFFFFF/png', alt: 'Torre de Belém em Lisboa', description: '', quoteCount: 4, size: '1.08 MB', type: 'Destino', dataAiHint: 'Lisbon sunset' },
  { id: '4', src: 'https://placehold.co/600x400/990000/FFFFFF/png', alt: 'Torre de Belém em Lisboa durante o dia', description: '', quoteCount: 1, size: '1.01 MB', type: 'Destino', dataAiHint: 'Lisbon' },
  { id: '5', src: 'https://placehold.co/600x400/006633/FFFFFF/png', alt: 'Torre de Belém em Lisboa à noite', description: '', quoteCount: 1, size: '1.01 MB', type: 'Destino', dataAiHint: 'Lisbon night' },
  { id: '6', src: 'https://placehold.co/600x400/FF6600/FFFFFF/png', alt: 'Hotel Copacabana Palace', description: '', quoteCount: 2, size: '1.25 MB', type: 'Hotel', dataAiHint: 'hotel' },
  { id: '7', src: 'https://placehold.co/600x400/FFCC00/FFFFFF/png', alt: 'Passeio de barco em Angra dos Reis', description: '', quoteCount: 8, size: '0.98 MB', type: 'Passeio', dataAiHint: 'boat tour' },
];

const ImageCard = ({ image, isSelected, onSelectionChange, onDelete }: { image: GalleryImage, isSelected: boolean, onSelectionChange: (id: string, checked: boolean) => void, onDelete: (id: string) => void }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [description, setDescription] = useState(image.description);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
  };

  const handleDescriptionBlur = () => {
    setIsEditing(false);
    // Here you would typically save the description to your backend
  };
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if(e.key === 'Enter') {
          setIsEditing(false);
      }
  }

  React.useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  return (
    <Card className="overflow-hidden">
      <div className="relative">
        <Checkbox
          className="absolute top-2 left-2 z-10 bg-white"
          checked={isSelected}
          onCheckedChange={(checked) => onSelectionChange(image.id, !!checked)}
        />
        <Image src={image.src} alt={image.alt} width={600} height={400} className="aspect-video object-cover" data-ai-hint={image.dataAiHint} />
      </div>
      <CardContent className="p-3 space-y-2">
        {isEditing ? (
          <Input
            ref={inputRef}
            value={description}
            onChange={handleDescriptionChange}
            onBlur={handleDescriptionBlur}
            onKeyDown={handleKeyDown}
            placeholder="Clique para informar uma descrição"
            className="text-sm"
          />
        ) : (
          <p className="text-sm text-muted-foreground h-6 truncate cursor-pointer hover:text-foreground" onClick={() => setIsEditing(true)}>
            {description || 'Clique para informar uma descrição'}
          </p>
        )}
      </CardContent>
      <CardFooter className="p-3 flex justify-between items-center text-xs text-muted-foreground">
        <div className='flex items-center gap-2'>
            <span className="flex items-center gap-1"><FileText className="h-3 w-3" /> {image.quoteCount} orçamento(s)</span>
            <span>{image.size}</span>
        </div>
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button variant="ghost" size="icon" className="h-6 w-6 text-destructive hover:text-destructive">
                    <Trash2 className="h-4 w-4" />
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
                <AlertDialogDescription>
                    Esta ação não pode ser desfeita. Isso excluirá permanentemente a imagem.
                </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                <AlertDialogAction onClick={() => onDelete(image.id)}>Excluir</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
      </CardFooter>
    </Card>
  );
};


export default function ImagensPage() {
    const [images, setImages] = useState(initialImages);
    const [selectedImages, setSelectedImages] = useState<string[]>([]);
    const { toast } = useToast();

    const handleSelectionChange = (id: string, checked: boolean) => {
        setSelectedImages(prev =>
            checked ? [...prev, id] : prev.filter(imgId => imgId !== id)
        );
    };

    const handleSelectAll = (checked: boolean) => {
        if (checked) {
            setSelectedImages(images.map(img => img.id));
        } else {
            setSelectedImages([]);
        }
    };
    
    const handleDeleteSelected = () => {
        setImages(prev => prev.filter(img => !selectedImages.includes(img.id)));
        setSelectedImages([]);
        toast({
            title: "Sucesso!",
            description: `${selectedImages.length} imagem(ns) excluída(s).`
        });
    };
    
    const handleDeleteSingle = (id: string) => {
        setImages(prev => prev.filter(img => img.id !== id));
        setSelectedImages(prev => prev.filter(imgId => imgId !== id));
        toast({
            title: "Sucesso!",
            description: `Imagem excluída.`
        });
    }

  return (
    <div className="space-y-6">
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-3xl font-bold text-primary">Galeria de Imagens</h1>
        <Button>
          <Upload className="mr-2 h-4 w-4" />
          Incluir
        </Button>
      </header>

      <Card>
        <CardContent className="p-4 space-y-4">
           <div className="flex flex-col sm:flex-row items-end gap-4">
                 <div className="flex-1 space-y-1.5">
                    <label htmlFor="tipo-filtro" className="text-sm font-medium text-muted-foreground">Tipo</label>
                    <Select>
                        <SelectTrigger id="tipo-filtro">
                            <SelectValue placeholder="Todos" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="todos">Todos</SelectItem>
                            <SelectItem value="destino">Destino</SelectItem>
                            <SelectItem value="hotel">Hotel</SelectItem>
                            <SelectItem value="passeio">Passeio</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="flex-1 space-y-1.5">
                     <label htmlFor="descricao-filtro" className="text-sm font-medium text-muted-foreground">Descrição</label>
                    <Input id="descricao-filtro" placeholder="Pesquisar por descrição..." />
                </div>
                 <Button>Pesquisar</Button>
           </div>
           <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                    <Checkbox
                        id="marcar-todos"
                        checked={selectedImages.length === images.length && images.length > 0}
                        onCheckedChange={handleSelectAll}
                    />
                    <label htmlFor="marcar-todos" className="text-sm font-medium">Marcar Todos</label>
                </div>
                 <AlertDialog>
                    <AlertDialogTrigger asChild>
                         <Button variant="destructive" disabled={selectedImages.length === 0}>
                            Excluir ({selectedImages.length})
                        </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                        <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
                        <AlertDialogDescription>
                            Esta ação não pode ser desfeita. Isso excluirá permanentemente as {selectedImages.length} imagens selecionadas.
                        </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                        <AlertDialogAction onClick={handleDeleteSelected}>Excluir</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
           </div>
        </CardContent>
      </Card>
      
      {images.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {images.map(image => (
            <ImageCard
                key={image.id}
                image={image}
                isSelected={selectedImages.includes(image.id)}
                onSelectionChange={handleSelectionChange}
                onDelete={handleDeleteSingle}
            />
            ))}
        </div>
      ) : (
        <Card>
            <CardContent className="h-60 flex flex-col items-center justify-center text-center text-muted-foreground p-6">
                <ImageIcon className="h-12 w-12 mb-4 text-primary/30" />
                <p className="text-lg font-medium">Nenhuma imagem encontrada.</p>
                <p className="text-sm">Clique em "Incluir" para adicionar sua primeira imagem.</p>
            </CardContent>
        </Card>
      )}

      <div className="flex justify-end">
        <Button size="icon" variant="default">1</Button>
      </div>
    </div>
  );
}
