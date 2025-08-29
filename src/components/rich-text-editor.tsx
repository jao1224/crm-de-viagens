
'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import TextStyle from '@tiptap/extension-text-style';
import { Color } from '@tiptap/extension-color';
import Highlight from '@tiptap/extension-highlight';
import React from 'react';

import {
  Bold,
  Italic,
  Strikethrough,
  Underline as UnderlineIcon,
  List,
  ListOrdered,
  Undo,
  Redo,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Palette,
  Highlighter,
  RemoveFormatting,
  ChevronDown,
  Paintbrush,
  Check,
} from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

const RichTextEditor = ({ value, onChange }: { value: string; onChange: (value: string) => void }) => {
  const [activeTextColor, setActiveTextColor] = React.useState<string | undefined>(undefined);
  const [activeHighlightColor, setActiveHighlightColor] = React.useState<string | undefined>(undefined);

  const editor = useEditor({
    extensions: [
        StarterKit.configure({
            heading: {
                levels: [1, 2, 3],
            },
        }),
        Underline,
        TextAlign.configure({
            types: ['heading', 'paragraph'],
        }),
        TextStyle,
        Color,
        Highlight.configure({ 
            multicolor: true,
            HTMLAttributes: {
                'data-color': '',
            },
        }),
    ],
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
      setActiveTextColor(editor.getAttributes('textStyle').color);
      const highlightAttrs = editor.getAttributes('highlight');
      setActiveHighlightColor(highlightAttrs.color);
    },
     onSelectionUpdate: ({ editor }) => {
      setActiveTextColor(editor.getAttributes('textStyle').color);
      const highlightAttrs = editor.getAttributes('highlight');
      setActiveHighlightColor(highlightAttrs.color);
    },
    editorProps: {
      attributes: {
        class:
          'prose dark:prose-invert prose-sm sm:prose-base lg:prose-lg xl:prose-2xl mx-auto focus:outline-none min-h-[150px] border border-input p-2 rounded-b-md',
      },
    },
  });

  if (!editor) {
    return null;
  }
  
  const textColors = [
    { name: 'Vermelho', color: '#ef4444' },
    { name: 'Laranja', color: '#f97316' },
    { name: 'Amarelo', color: '#eab308' },
    { name: 'Verde', color: '#22c55e' },
    { name: 'Azul', color: '#3b82f6' },
    { name: 'Roxo', color: '#8b5cf6' },
    { name: 'Rosa', color: '#ec4899' },
  ];
  
  const highlightColors = [
    { name: 'Amarelo', color: '#fde047' },
    { name: 'Verde', color: '#86efac' },
    { name: 'Azul', color: '#93c5fd' },
    { name: 'Roxo', color: '#c4b5fd' },
    { name: 'Rosa', color: '#f9a8d4' },
  ];

  return (
    <div>
      <div className="flex flex-wrap items-center gap-1 border border-input p-1 rounded-t-md">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().undo()}
          className="p-2 h-auto"
        >
          <Undo className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().redo()}
          className="p-2 h-auto"
        >
          <Redo className="h-4 w-4" />
        </Button>
        <Separator orientation="vertical" className="h-6" />
        <Button
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={cn("p-2 h-auto", editor.isActive('bold') && 'bg-muted')}
        >
          <Bold className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={cn("p-2 h-auto", editor.isActive('italic') && 'bg-muted')}
        >
          <Italic className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={cn("p-2 h-auto", editor.isActive('underline') && 'bg-muted')}
        >
           <UnderlineIcon className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={cn("p-2 h-auto", editor.isActive('strike') && 'bg-muted')}
        >
          <Strikethrough className="h-4 w-4" />
        </Button>
        <Separator orientation="vertical" className="h-6" />
        <Popover>
            <PopoverTrigger asChild>
                 <Button variant="ghost" size="sm" className="w-28 justify-between h-auto py-2">
                    <span>
                      {editor.isActive('heading', {level: 1}) ? 'Título 1' : editor.isActive('heading', {level: 2}) ? 'Título 2' : editor.isActive('heading', {level: 3}) ? 'Título 3' : 'Parágrafo'}
                    </span>
                    <ChevronDown className="h-4 w-4" />
                 </Button>
            </PopoverTrigger>
            <PopoverContent className="w-40 p-1">
                 <Button variant="ghost" className="w-full justify-start text-base" onClick={() => editor.chain().focus().setParagraph().run()}>Parágrafo</Button>
                 <Button variant="ghost" className="w-full justify-start text-xl font-bold" onClick={() => editor.chain().focus().toggleHeading({level: 1}).run()}>Título 1</Button>
                 <Button variant="ghost" className="w-full justify-start text-lg font-semibold" onClick={() => editor.chain().focus().toggleHeading({level: 2}).run()}>Título 2</Button>
                 <Button variant="ghost" className="w-full justify-start text-base font-semibold" onClick={() => editor.chain().focus().toggleHeading({level: 3}).run()}>Título 3</Button>
            </PopoverContent>
        </Popover>
         <Separator orientation="vertical" className="h-6" />
         <Popover>
            <PopoverTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8 p-1 flex flex-col items-center">
                    <Palette className="h-4 w-4" />
                    {activeTextColor && (
                      <div
                        className="h-1 w-4 mt-0.5 rounded-full"
                        style={{ backgroundColor: activeTextColor }}
                      />
                    )}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-2">
                <TooltipProvider>
                    <div className="grid grid-cols-4 gap-1">
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <button
                                    onClick={() => editor.chain().focus().unsetColor().run()}
                                    className={cn(
                                        "h-6 w-6 rounded-sm border border-border transition-transform hover:scale-110 flex items-center justify-center relative",
                                    )}
                                >
                                    <Paintbrush className="h-4 w-4" />
                                     {!activeTextColor && <Check className="h-4 w-4 text-primary absolute" />}
                                </button>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Remover Cor</p>
                            </TooltipContent>
                        </Tooltip>
                        {textColors.map(({ name, color }) => (
                            <Tooltip key={name}>
                                <TooltipTrigger asChild>
                                    <button
                                        onClick={() => editor.chain().focus().setColor(color).run()}
                                        className="h-6 w-6 rounded-sm border border-border transition-transform hover:scale-110 relative"
                                        style={{ backgroundColor: color }}
                                        aria-label={name}
                                    >
                                       {activeTextColor === color && <Check className="h-4 w-4 text-white mix-blend-difference" />}
                                    </button>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>{name}</p>
                                </TooltipContent>
                            </Tooltip>
                        ))}
                    </div>
                </TooltipProvider>
            </PopoverContent>
        </Popover>
        <Popover>
            <PopoverTrigger asChild>
                 <Button variant="ghost" size="icon" className="h-8 w-8 p-1 flex flex-col items-center">
                    <Highlighter className="h-4 w-4" />
                     {activeHighlightColor && (
                      <div
                        className="h-1 w-4 mt-0.5 rounded-full"
                        style={{ backgroundColor: activeHighlightColor }}
                      />
                    )}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-2">
                <TooltipProvider>
                    <div className="grid grid-cols-4 gap-1">
                         <Tooltip>
                            <TooltipTrigger asChild>
                                <button
                                    onClick={() => editor.chain().focus().unsetHighlight().run()}
                                    className={cn(
                                        "h-6 w-6 rounded-sm border border-border transition-transform hover:scale-110 flex items-center justify-center relative",
                                    )}
                                >
                                    <Paintbrush className="h-4 w-4" />
                                    {!activeHighlightColor && <Check className="h-4 w-4 text-primary absolute" />}
                                </button>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Remover Destaque</p>
                            </TooltipContent>
                        </Tooltip>
                        {highlightColors.map(({ name, color }) => (
                            <Tooltip key={name}>
                                <TooltipTrigger asChild>
                                    <button
                                        onClick={() => editor.chain().focus().toggleHighlight({ color }).run()}
                                        className="h-6 w-6 rounded-sm border border-border transition-transform hover:scale-110 relative"
                                        style={{ backgroundColor: color }}
                                        aria-label={name}
                                    >
                                       {activeHighlightColor === color && <Check className="h-4 w-4 text-black mix-blend-difference" />}
                                    </button>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>{name}</p>
                                </TooltipContent>
                             </Tooltip>
                        ))}
                    </div>
                </TooltipProvider>
            </PopoverContent>
        </Popover>
        <Separator orientation="vertical" className="h-6" />
        <Button
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().setTextAlign('left').run()}
          className={cn("p-2 h-auto", editor.isActive({ textAlign: 'left' }) && 'bg-muted')}
        >
          <AlignLeft className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().setTextAlign('center').run()}
          className={cn("p-2 h-auto", editor.isActive({ textAlign: 'center' }) && 'bg-muted')}
        >
          <AlignCenter className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().setTextAlign('right').run()}
          className={cn("p-2 h-auto", editor.isActive({ textAlign: 'right' }) && 'bg-muted')}
        >
          <AlignRight className="h-4 w-4" />
        </Button>
         <Button
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().setTextAlign('justify').run()}
          className={cn("p-2 h-auto", editor.isActive({ textAlign: 'justify' }) && 'bg-muted')}
        >
          <AlignJustify className="h-4 w-4" />
        </Button>
        <Separator orientation="vertical" className="h-6" />
        <Button
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={cn("p-2 h-auto", editor.isActive('bulletList') && 'bg-muted')}
        >
          <List className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={cn("p-2 h-auto", editor.isActive('orderedList') && 'bg-muted')}
        >
          <ListOrdered className="h-4 w-4" />
        </Button>
        <Separator orientation="vertical" className="h-6" />
        <Button
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().unsetAllMarks().run()}
          className="p-2 h-auto"
        >
          <RemoveFormatting className="h-4 w-4" />
        </Button>
      </div>
      <EditorContent editor={editor} />
    </div>
  );
};

export default RichTextEditor;
