
'use client';

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MessageSquare, X, Send } from 'lucide-react';
import { cn } from "@/lib/utils";

interface Mensagem {
  autor: "user" | "bot";
  texto: string;
}

export function ChatWidget() {
  const [aberto, setAberto] = useState(false);
  const [mensagens, setMensagens] = useState<Mensagem[]>([
    { autor: "bot", texto: "Olá! Sou seu assistente virtual. Como posso ajudar?" },
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isClick, setIsClick] = useState(true);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    setPosition({ x: window.innerWidth - 88, y: window.innerHeight - 88 });

    const handleResize = () => {
       setPosition(prev => ({
           x: Math.min(prev.x, window.innerWidth - 88),
           y: Math.min(prev.y, window.innerHeight - 88)
       }));
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (aberto) {
      scrollToBottom();
    }
  }, [mensagens, aberto]);

  const handleMouseDown = (e: React.MouseEvent<HTMLButtonElement>) => {
    setDragging(true);
    setIsClick(true);
    setOffset({
      x: e.clientX - position.x,
      y: e.clientY - position.y
    });
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (dragging) {
      setIsClick(false); // If mouse moves, it's a drag, not a click
      let newX = e.clientX - offset.x;
      let newY = e.clientY - offset.y;

      // Clamp position within viewport
      newX = Math.max(24, Math.min(newX, window.innerWidth - 80));
      newY = Math.max(24, Math.min(newY, window.innerHeight - 80));
      
      setPosition({ x: newX, y: newY });
    }
  };

  const handleMouseUp = () => {
    setDragging(false);
    if (isClick) {
      setAberto(prev => !prev);
    }
  };

  function enviarMensagem() {
    if (!input.trim()) return;

    const novaMsg: Mensagem = { autor: "user", texto: input };
    setMensagens((prev) => [...prev, novaMsg]);
    setInput("");

    setTimeout(() => {
        setMensagens((prev) => {
            const ultima = prev[prev.length - 1];
            if (ultima && ultima.autor === 'user') {
                return [
                    ...prev,
                    { autor: "bot", texto: "Entendi sua dúvida, logo retorno com mais detalhes!" },
                ];
            }
            return prev;
        });
    }, 1000);
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        enviarMensagem();
    }
  }
  
  const getChatPosition = () => {
    const isTopHalf = position.y < window.innerHeight / 2;
    const isLeftHalf = position.x < window.innerWidth / 2;

    const style: React.CSSProperties = {
        position: 'fixed'
    };

    if (isTopHalf) {
        style.top = position.y + 70; // Position below the button
    } else {
        style.bottom = window.innerHeight - position.y; // Position above the button
    }

    if (isLeftHalf) {
        style.left = position.x;
    } else {
        style.right = window.innerWidth - position.x - 56;
    }
    
    return style;
  }

  if (!isClient) {
    return null;
  }

  return (
    <div 
        onMouseMove={handleMouseMove} 
        onMouseUp={handleMouseUp}
        onMouseLeave={() => setDragging(false)}
        className={cn('fixed inset-0 pointer-events-none z-10', dragging && 'pointer-events-auto')}
    >
      <Button
          style={{ top: position.y, left: position.x }}
          onMouseDown={handleMouseDown}
          size="icon"
          className="fixed h-14 w-14 rounded-full bg-primary text-primary-foreground shadow-lg hover:bg-primary/90 z-20 cursor-grab active:cursor-grabbing pointer-events-auto"
        >
          {aberto ? <X className="h-7 w-7" /> : <MessageSquare className="h-7 w-7" />}
          <span className="sr-only">{aberto ? 'Fechar Chat' : 'Abrir Chat'}</span>
        </Button>

      {aberto && (
        <div style={getChatPosition()} className="w-80 bg-card shadow-xl rounded-lg flex flex-col border border-border z-10 pointer-events-auto">
          <div className="bg-primary text-primary-foreground p-3 flex justify-between items-center rounded-t-lg">
            <span className="font-semibold">Assistente Virtual</span>
          </div>
          <div className="flex-1 p-3 overflow-y-auto max-h-80 space-y-3">
            {mensagens.map((msg, i) => (
              <div
                key={i}
                className={`p-2.5 rounded-lg text-sm ${
                  msg.autor === "user"
                    ? "bg-primary text-primary-foreground self-end ml-10"
                    : "bg-muted text-muted-foreground self-start mr-10"
                }`}
              >
                {msg.texto}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          <div className="flex border-t border-border p-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 p-2 outline-none border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
              placeholder="Digite sua mensagem..."
            />
            <Button
              onClick={enviarMensagem}
              size="icon"
              className="bg-primary text-primary-foreground ml-2"
              disabled={!input.trim()}
            >
              <Send className="h-5 w-5" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
