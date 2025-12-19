import React, { useState } from 'react';
import { Tag, Sparkles, Send, ShoppingBag } from 'lucide-react';
import { MOCK_PROMOS } from '../constants';
import { getShoppingAdvice } from '../services/geminiService';
import { PromoArticle } from '../types';

const PromoCard: React.FC<{ promo: PromoArticle }> = ({ promo }) => (
  <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 mb-4 group cursor-pointer">
    <div className="h-40 overflow-hidden relative">
      <img src={promo.imageUrl} alt={promo.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
      <div className="absolute top-3 left-3 bg-white/90 backdrop-blur text-xs font-bold text-ubox-dark px-3 py-1 rounded-full uppercase tracking-wide">
        {promo.category}
      </div>
    </div>
    <div className="p-4">
      <h3 className="font-bold text-lg text-ubox-dark leading-tight mb-2">{promo.title}</h3>
      <p className="text-slate-500 text-sm line-clamp-2">{promo.description}</p>
      <div className="mt-3 flex items-center text-ubox-blue text-xs font-semibold">
        Leer más <span className="ml-1">→</span>
      </div>
    </div>
  </div>
);

const AIShoppingAssistant = () => {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleAsk = async () => {
    if (!query.trim()) return;
    setLoading(true);
    setResponse(null);
    
    const result = await getShoppingAdvice(query);
    setResponse(result);
    setLoading(false);
  };

  return (
    <div className="bg-gradient-to-br from-[#191959] to-[#2365E3] rounded-3xl p-6 text-white mb-8 shadow-xl shadow-ubox-blue/20 relative overflow-hidden">
        {/* Abstract shapes */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-5 rounded-full -mr-10 -mt-10 blur-2xl"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-ubox-mid opacity-20 rounded-full -ml-10 -mb-10 blur-xl"></div>

        <div className="relative z-10">
            <div className="flex items-center gap-2 mb-4">
                <Sparkles className="text-yellow-300" />
                <h3 className="font-bold text-lg">Asistente de Compras Ubox</h3>
            </div>
            <p className="text-blue-100 text-sm mb-4">
                ¿No sabés qué comprar? Preguntale a nuestra IA por las mejores ofertas en Miami hoy.
            </p>
            
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-2 border border-white/20 flex gap-2">
                <input 
                    type="text" 
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Ej: Mejores notebooks por menos de $500..."
                    className="bg-transparent flex-1 text-white placeholder-blue-200 text-sm px-2 focus:outline-none"
                    onKeyDown={(e) => e.key === 'Enter' && handleAsk()}
                />
                <button 
                    onClick={handleAsk}
                    disabled={loading}
                    className="bg-white text-ubox-blue p-2 rounded-lg hover:bg-blue-50 transition-colors disabled:opacity-50"
                >
                    {loading ? <div className="w-4 h-4 border-2 border-ubox-blue border-t-transparent rounded-full animate-spin"></div> : <Send size={16} />}
                </button>
            </div>

            {response && (
                <div className="mt-4 bg-white/10 backdrop-blur-md rounded-xl p-4 text-sm leading-relaxed border border-white/10 animate-fade-in">
                    <p>{response}</p>
                </div>
            )}
        </div>
    </div>
  );
};

const Promos = () => {
  return (
    <div className="pb-24 pt-6 px-4">
      <div className="flex items-center gap-3 mb-6">
        <h2 className="text-2xl font-bold text-ubox-dark">Explorar y Comprar</h2>
        <span className="bg-red-100 text-red-600 text-xs font-bold px-2 py-0.5 rounded-full">HOT</span>
      </div>

      <AIShoppingAssistant />

      <div className="mb-6 flex justify-between items-end">
        <h3 className="font-bold text-ubox-dark text-lg">Últimas Ofertas</h3>
        <button className="text-ubox-blue text-xs font-semibold">Ver Todo</button>
      </div>

      <div className="space-y-4">
        {MOCK_PROMOS.map(promo => (
            <PromoCard key={promo.id} promo={promo} />
        ))}
      </div>
    </div>
  );
};

export default Promos;