import React, { useState } from 'react';
import { Copy, Check, ChevronDown, ChevronUp, MapPin } from 'lucide-react';
import { MIAMI_ADDRESS } from '../constants';

const AddressCard = () => {
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleCopy = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const AddressRow = ({ label, value, id }: { label: string; value: string; id: string }) => (
    <div className="flex justify-between items-center py-3 border-b border-ubox-blue/10 last:border-0">
      <div>
        <p className="text-xs text-ubox-dark/60 font-medium uppercase tracking-wider">{label}</p>
        <p className="text-sm font-semibold text-ubox-dark">{value}</p>
      </div>
      <button
        onClick={() => handleCopy(value, id)}
        className={`p-2 rounded-full transition-colors duration-200 ${
          copiedField === id ? 'bg-green-100 text-green-600' : 'bg-white text-ubox-blue hover:bg-ubox-light'
        }`}
      >
        {copiedField === id ? <Check size={16} /> : <Copy size={16} />}
      </button>
    </div>
  );

  return (
    <div className="bg-gradient-to-br from-[#CDDDF9] to-white rounded-3xl shadow-lg shadow-ubox-blue/5 border border-white relative overflow-hidden transition-all duration-300">
      {/* Decorative box background */}
      <div className="absolute -right-4 -top-4 w-24 h-24 bg-ubox-blue opacity-10 rounded-full blur-2xl pointer-events-none"></div>
      
      {/* Header / Toggle Area */}
      <div 
        onClick={() => setIsExpanded(!isExpanded)}
        className="p-6 flex justify-between items-center cursor-pointer active:bg-white/30 transition-colors"
      >
        <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-ubox-blue rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-md">
            U
            </div>
            <div>
                <h3 className="text-lg font-bold text-ubox-dark leading-tight">Tu Casilla en Miami</h3>
                {!isExpanded && (
                    <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
                        <MapPin size={12} className="text-ubox-blue" /> 
                        <span className="font-medium text-slate-600">{MIAMI_ADDRESS.line2}</span>
                    </p>
                )}
            </div>
        </div>
        <button className="text-ubox-blue bg-white/50 p-2 rounded-full hover:bg-white transition-colors">
            {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>
      </div>

      {/* Expanded Content */}
      {isExpanded && (
        <div className="px-6 pb-6">
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 border border-white/50">
                <AddressRow label="Dirección Línea 1" value={MIAMI_ADDRESS.line1} id="line1" />
                <AddressRow label="Dirección Línea 2 (Tu Casilla)" value={MIAMI_ADDRESS.line2} id="line2" />
                <AddressRow label="Ciudad / Estado / Zip" value={`${MIAMI_ADDRESS.city}, ${MIAMI_ADDRESS.state} ${MIAMI_ADDRESS.zip}`} id="city" />
                <AddressRow label="Teléfono" value={MIAMI_ADDRESS.phone} id="phone" />
            </div>

            <div className="mt-4 flex items-start gap-2">
                <div className="min-w-[4px] h-4 mt-1 bg-orange-400 rounded-full"></div>
                <p className="text-xs text-ubox-dark/70">
                Recuerda incluir siempre tu código <strong>UBX</strong> en la Línea 2 para asegurar que el paquete se asigne a tu cuenta correctamente.
                </p>
            </div>
        </div>
      )}
    </div>
  );
};

export default AddressCard;