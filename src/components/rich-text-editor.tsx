
'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import TextStyle from '@tiptap/extension-text-style';
import { Color } from '@tiptap/extension-color';
import Highlight from '@tiptap/extension-highlight';

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
  Paintbrush
} from 'lucide-react';
import { Toggle } from '@/components/ui/toggle';
import { Separator } from '@/components/ui/separator';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const RichTextEditor = ({ value, onChange }: { value: string; onChange: (value: string) => void }) => {
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
        Highlight.configure({ multicolor: true }),
    ],
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
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
    { name: 'Red', color: '#ef4444' },
    { name: 'Orange', color: '#f97316' },
    { name: 'Yellow', color: '#eab308' },
    { name: 'Green', color: '#22c55e' },
    { name: 'Blue', color: '#3b82f6' },
    { name: 'Purple', color: '#8b5cf6' },
    { name: 'Pink', color: '#ec4899' },
    { name: 'Black', color: '#000000' },
  ];
  
  const highlightColors = [
    { name: 'Default', color: '#ffc078' },
    { name: 'Red', color: '#f87171' },
    { name: 'Orange', color: '#fb923c' },
    { name: 'Yellow', color: '#facc15' },
    { name: 'Green', color: '#4ade80' },
    { name: 'Blue', color: '#60a5fa' },
    { name: 'Purple', color: '#a78bfa' },
    { name: 'Pink', color: '#f472b6' },
  ];

  const activeTextColor = editor.getAttributes('textStyle').color;
  const activeHighlightColor = editor.getAttributes('highlight').color;

  return (
    <div>
      <div className="flex flex-wrap items-center gap-1 border border-input p-1 rounded-t-md">
        <Toggle
          size="sm"
          onPressedChange={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().undo()}
        >
          <Undo className="h-4 w-4" />
        </Toggle>
        <Toggle
          size="sm"
          onPressedChange={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().redo()}
        >
          <Redo className="h-4 w-4" />
        </Toggle>
        <Separator orientation="vertical" className="h-6" />
        <Toggle
          size="sm"
          pressed={editor.isActive('bold')}
          onPressedChange={() => editor.chain().focus().toggleBold().run()}
        >
          <Bold className="h-4 w-4" />
        </Toggle>
        <Toggle
          size="sm"
          pressed={editor.isActive('italic')}
          onPressedChange={() => editor.chain().focus().toggleItalic().run()}
        >
          <Italic className="h-4 w-4" />
        </Toggle>
        <Toggle
          size="sm"
          pressed={editor.isActive('underline')}
          onPressedChange={() => editor.chain().focus().toggleUnderline().run()}
        >
           <UnderlineIcon className="h-4 w-4" />
        </Toggle>
        <Toggle
          size="sm"
          pressed={editor.isActive('strike')}
          onPressedChange={() => editor.chain().focus().toggleStrike().run()}
        >
          <Strikethrough className="h-4 w-4" />
        </Toggle>
        <Separator orientation="vertical" className="h-6" />
        <Popover>
            <PopoverTrigger asChild>
                 <Button variant="ghost" size="sm">
                    {editor.isActive('heading', {level: 1}) ? 'Título 1' : editor.isActive('heading', {level: 2}) ? 'Título 2' : editor.isActive('heading', {level: 3}) ? 'Título 3' : 'Parágrafo'}
                    <ChevronDown className="h-4 w-4 ml-2" />
                 </Button>
            </PopoverTrigger>
            <PopoverContent className="w-40 p-1">
                 <Button variant="ghost" className="w-full justify-start" onClick={() => editor.chain().focus().setParagraph().run()}>Parágrafo</Button>
                 <Button variant="ghost" className="w-full justify-start" onClick={() => editor.chain().focus().toggleHeading({level: 1}).run()}>Título 1</Button>
                 <Button variant="ghost" className="w-full justify-start" onClick={() => editor.chain().focus().toggleHeading({level: 2}).run()}>Título 2</Button>
                 <Button variant="ghost" className="w-full justify-start" onClick={() => editor.chain().focus().toggleHeading({level: 3}).run()}>Título 3</Button>
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
                 <div className="grid grid-cols-4 gap-1">
                    <button
                        onClick={() => editor.chain().focus().unsetColor().run()}
                        className={cn(
                            "h-6 w-6 rounded-sm border border-border transition-transform hover:scale-110 flex items-center justify-center",
                            !activeTextColor && 'ring-2 ring-ring ring-offset-2 ring-offset-background'
                        )}
                    >
                        <Paintbrush className="h-4 w-4" />
                    </button>
                    {textColors.map(({ name, color }) => (
                        <button
                            key={name}
                            onClick={() => editor.chain().focus().setColor(color).run()}
                            className={cn(
                                "h-6 w-6 rounded-sm border border-border transition-transform hover:scale-110",
                                editor.isActive('textStyle', { color }) && 'ring-2 ring-ring ring-offset-2 ring-offset-background'
                            )}
                            style={{ backgroundColor: color }}
                            aria-label={name}
                        />
                    ))}
                 </div>
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
                <div className="grid grid-cols-4 gap-1">
                    {highlightColors.map(({ name, color }) => (
                         <button
                            key={name}
                            onClick={() => editor.chain().focus().toggleHighlight({ color }).run()}
                            className={cn(
                                "h-6 w-6 rounded-sm border border-border transition-transform hover:scale-110",
                                editor.isActive('highlight', { color }) && 'ring-2 ring-ring ring-offset-2 ring-offset-background'
                            )}
                            style={{ backgroundColor: color }}
                            aria-label={name}
                         />
                    ))}
                </div>
            </PopoverContent>
        </Popover>
        <Separator orientation="vertical" className="h-6" />
        <Toggle
          size="sm"
          pressed={editor.isActive({ textAlign: 'left' })}
          onPressedChange={() => editor.chain().focus().setTextAlign('left').run()}
        >
          <AlignLeft className="h-4 w-4" />
        </Toggle>
        <Toggle
          size="sm"
          pressed={editor.isActive({ textAlign: 'center' })}
          onPressedChange={() => editor.chain().focus().setTextAlign('center').run()}
        >
          <AlignCenter className="h-4 w-4" />
        </Toggle>
        <Toggle
          size="sm"
          pressed={editor.isActive({ textAlign: 'right' })}
          onPressedChange={() => editor.chain().focus().setTextAlign('right').run()}
        >
          <AlignRight className="h-4 w-4" />
        </Toggle>
         <Toggle
          size="sm"
          pressed={editor.isActive({ textAlign: 'justify' })}
          onPressedChange={() => editor.chain().focus().setTextAlign('justify').run()}
        >
          <AlignJustify className="h-4 w-4" />
        </Toggle>
        <Separator orientation="vertical" className="h-6" />
        <Toggle
          size="sm"
          pressed={editor.isActive('bulletList')}
          onPressedChange={() => editor.chain().focus().toggleBulletList().run()}
        >
          <List className="h-4 w-4" />
        </Toggle>
        <Toggle
          size="sm"
          pressed={editor.isActive('orderedList')}
          onPressedChange={() => editor.chain().focus().toggleOrderedList().run()}
        >
          <ListOrdered className="h-4 w-4" />
        </Toggle>
        <Separator orientation="vertical" className="h-6" />
        <Toggle
          size="sm"
          onPressedChange={() => editor.chain().focus().unsetAllMarks().run()}
        >
          <RemoveFormatting className="h-4 w-4" />
        </Toggle>
      </div>
      <EditorContent editor={editor} />
    </div>
  );
};

export default RichTextEditor;
