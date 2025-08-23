
'use client';

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MessageSquare, X, Send } from 'lucide-react';

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

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [mensagens]);

  function enviarMensagem() {
    if (!input.trim()) return;

    const novaMsg: Mensagem = { autor: "user", texto: input };
    setMensagens((prev) => [...prev, novaMsg]);
    setInput("");

    // Responder apenas às mensagens do usuário para evitar loops
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

  return (
    <div>
      {/* Botão flutuante */}
        <Button
          onClick={() => setAberto(prev => !prev)}
          size="icon"
          className="fixed bottom-6 right-6 h-14 w-14 rounded-full bg-primary text-primary-foreground shadow-lg hover:bg-primary/90 z-20"
        >
          {aberto ? <X className="h-7 w-7" /> : <MessageSquare className="h-7 w-7" />}
          <span className="sr-only">{aberto ? 'Fechar Chat' : 'Abrir Chat'}</span>
        </Button>

      {/* Janela do Chat */}
      {aberto && (
        <div className="fixed bottom-24 right-6 w-80 bg-card shadow-xl rounded-lg flex flex-col border border-border z-10">
          {/* Header */}
          <div className="bg-primary text-primary-foreground p-3 flex justify-between items-center rounded-t-lg">
            <span className="font-semibold">Assistente Virtual</span>
          </div>

          {/* Mensagens */}
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

          {/* Input */}
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
