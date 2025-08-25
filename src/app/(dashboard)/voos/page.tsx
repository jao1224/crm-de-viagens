
'use client';

import React, { useEffect, useRef } from 'react';

export default function VoosPage() {
  const widgetContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Evita a duplicação do script em re-renderizações durante o desenvolvimento
    if (document.querySelector('script[src="https://andpng.lojamoblix.com/js/iframe.js"]')) {
        // Se o script já existe, mas o widget não foi renderizado, podemos tentar forçar a renderização
        // (Isso pode ser necessário em ambientes de desenvolvimento com Fast Refresh)
        if (widgetContainerRef.current && widgetContainerRef.current.children.length === 1 && (window as any).moblix) {
             (window as any).moblix.init();
        }
        return;
    }

    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.async = true;
    script.src = 'https://andpng.lojamoblix.com/js/iframe.js';
    
    // Adiciona o script ao final do body, uma prática comum e segura em React/Next.js
    document.body.appendChild(script);

    // Limpeza ao desmontar o componente para evitar vazamento de memória
    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  return (
    <div className="space-y-6">
      <header>
          <h1 className="text-3xl font-bold text-primary">Voos</h1>
      </header>
      <div ref={widgetContainerRef}>
        {/* O widget será inserido aqui pelo script externo */}
        <ins id="widgetFrame"
            data-width="100%"
            data-height="410px"
            data-host="andpng.lojamoblix.com"
            data-redirect-blank="true"
            data-bg=""
            data-fcolor=""
            data-lcolor=""
            data-btncolor=""
            data-aid="" 
        />
      </div>
    </div>
  );
}
