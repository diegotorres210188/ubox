import React, { useState } from 'react';
import { Bell, Home, Package, ShoppingBag, User, CreditCard, ChevronRight, Settings, LogOut, X } from 'lucide-react';
import AddressCard from './components/AddressCard';
import Orders from './components/Orders';
import Promos from './components/Promos';
import { MOCK_USER, MOCK_NOTIFICATIONS } from './constants';
import { ViewState } from './types';

// --- Sub-components defined here for coherence in the main layout file ---

const NotificationsView = ({ onBack }: { onBack: () => void }) => (
  <div className="pb-24 pt-6 px-4 min-h-screen bg-white">
    <div className="flex items-center gap-4 mb-8">
      <button onClick={onBack} className="p-2 -ml-2 hover:bg-slate-50 rounded-full">
        <ChevronRight className="rotate-180" size={24} />
      </button>
      <h2 className="text-2xl font-bold text-ubox-dark">Notificaciones</h2>
    </div>
    <div className="space-y-4">
      {MOCK_NOTIFICATIONS.map(notif => (
        <div key={notif.id} className={`p-4 rounded-2xl border ${notif.read ? 'bg-white border-slate-100' : 'bg-blue-50 border-blue-100'}`}>
          <div className="flex justify-between items-start mb-1">
            <h4 className={`font-bold text-sm ${notif.read ? 'text-slate-700' : 'text-ubox-blue'}`}>{notif.title}</h4>
            <span className="text-[10px] text-slate-400">{notif.date}</span>
          </div>
          <p className="text-xs text-slate-500 leading-relaxed">{notif.message}</p>
        </div>
      ))}
    </div>
  </div>
);

const ProfileView = () => (
  <div className="pb-24 pt-6 px-4">
     <div className="flex items-center gap-4 mb-8">
        <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-ubox-blue to-ubox-mid flex items-center justify-center text-white text-2xl font-bold">
            {MOCK_USER.name.charAt(0)}
        </div>
        <div>
            <h2 className="text-xl font-bold text-ubox-dark">{MOCK_USER.name}</h2>
            <p className="text-sm text-slate-500">{MOCK_USER.email}</p>
            <div className="mt-1 inline-block bg-slate-100 px-2 py-0.5 rounded text-xs font-mono text-slate-600">
                {MOCK_USER.casilla}
            </div>
        </div>
     </div>

     <div className="space-y-6">
        <section>
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-3">Métodos de Pago</h3>
            <div className="space-y-3">
                {MOCK_USER.cards.map(card => (
                    <div key={card.id} className="flex items-center justify-between p-4 bg-white border border-slate-100 rounded-2xl shadow-sm">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-6 bg-slate-800 rounded flex items-center justify-center text-white text-[10px] uppercase font-bold tracking-widest">
                                {card.brand}
                            </div>
                            <div className="text-sm font-medium text-slate-700">•••• {card.last4}</div>
                        </div>
                        <span className="text-xs text-slate-400">{card.expiry}</span>
                    </div>
                ))}
                <button className="w-full py-3 border-2 border-dashed border-slate-200 rounded-2xl text-sm font-semibold text-slate-400 hover:border-ubox-blue hover:text-ubox-blue transition-colors flex items-center justify-center gap-2">
                    <CreditCard size={16} /> Agregar Tarjeta
                </button>
            </div>
        </section>

        <section>
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-3">Configuración</h3>
            <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
                <button className="w-full flex items-center justify-between p-4 hover:bg-slate-50 border-b border-slate-50">
                    <div className="flex items-center gap-3 text-slate-700">
                        <Settings size={18} />
                        <span className="text-sm font-medium">Preferencias</span>
                    </div>
                    <ChevronRight size={16} className="text-slate-400" />
                </button>
                <button className="w-full flex items-center justify-between p-4 hover:bg-slate-50 text-red-500">
                    <div className="flex items-center gap-3">
                        <LogOut size={18} />
                        <span className="text-sm font-medium">Cerrar Sesión</span>
                    </div>
                </button>
            </div>
        </section>
     </div>
  </div>
);

const HomeView = ({ onOpenNotifications }: { onOpenNotifications: () => void }) => {
    const [unreadNotifs] = useState(1);

    return (
        <div className="pb-24 pt-6 px-4">
            {/* Header: Logo Left, Bell Right (No Overlap) */}
            <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-1">
                    <div className="w-8 h-8 bg-ubox-blue rounded-lg flex items-center justify-center text-white font-bold text-lg shadow-sm">u</div>
                    <span className="font-bold text-ubox-dark text-xl tracking-tight">box</span>
                </div>
                
                <button 
                    onClick={onOpenNotifications}
                    className="w-10 h-10 bg-white shadow-sm rounded-full flex items-center justify-center text-ubox-dark border border-slate-100 relative active:scale-95 transition-transform"
                >
                    <Bell size={20} />
                    {unreadNotifs > 0 && (
                        <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
                    )}
                </button>
            </div>

            {/* Greeting separated from header */}
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-ubox-dark">Hola, {MOCK_USER.name.split(' ')[0]} 👋</h1>
                <p className="text-slate-500 text-sm">¿Qué te traemos?</p>
            </div>

            <section className="mb-8">
                <AddressCard />
            </section>

            <section className="mb-8">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="font-bold text-ubox-dark text-lg">Destacados</h3>
                </div>
                {/* Advertising Spaces / Banners - Carousel Style */}
                <div className="flex overflow-x-auto gap-4 no-scrollbar pb-4 -mx-4 px-4 snap-x">
                    {/* Banner 1: Ueno Promo */}
                    <div className="snap-center shrink-0 w-72 h-40 rounded-2xl bg-gradient-to-r from-blue-100 to-white overflow-hidden relative shadow-md border border-blue-50">
                        <div className="absolute top-0 right-0 w-24 h-full bg-[url('https://picsum.photos/200/300')] bg-cover opacity-20 mask-image-gradient"></div>
                        <div className="p-5 h-full flex flex-col justify-center relative z-10">
                            <span className="text-xs font-bold text-ubox-blue uppercase mb-1">Partner Exclusivo</span>
                            <h4 className="font-bold text-slate-800 leading-tight mb-2">40% OFF con tarjetas ueno</h4>
                            <button className="bg-ubox-dark text-white text-xs py-1.5 px-3 rounded-lg w-fit">Ver Detalles</button>
                        </div>
                    </div>

                    {/* Banner 2: General Signup */}
                    <div className="snap-center shrink-0 w-72 h-40 rounded-2xl bg-ubox-blue overflow-hidden relative shadow-md">
                        <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-white opacity-10 rounded-full"></div>
                        <div className="p-5 h-full flex flex-col justify-center text-white">
                            <h4 className="font-bold text-lg leading-tight mb-2">Traé todo lo que amas del mundo.</h4>
                            <button className="bg-white text-ubox-blue text-xs font-bold py-1.5 px-3 rounded-lg w-fit">Empezar</button>
                        </div>
                    </div>
                    {/* Banner 3: Ad Space */}
                    <div className="snap-center shrink-0 w-72 h-40 rounded-2xl bg-slate-800 overflow-hidden relative shadow-md">
                        <div className="p-5 h-full flex flex-col justify-center text-white">
                            <span className="text-xs bg-white/20 px-2 py-0.5 rounded w-fit mb-2">Publicidad</span>
                            <h4 className="font-bold text-lg leading-tight mb-2">Tu Marca Aquí</h4>
                            <p className="text-xs text-slate-300">Contactar ventas.</p>
                        </div>
                    </div>
                </div>
            </section>

            <section>
                <div className="flex justify-between items-center mb-4">
                    <h3 className="font-bold text-ubox-dark text-lg">Actualizaciones Recientes</h3>
                    <button className="text-ubox-blue text-xs font-semibold">Ver Todo</button>
                </div>
                <div className="space-y-3">
                    <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4">
                        <div className="w-12 h-12 bg-green-100 text-green-600 rounded-xl flex items-center justify-center">
                            <Package size={20} />
                        </div>
                        <div>
                            <h4 className="font-bold text-sm text-slate-800">Paquete Entregado</h4>
                            <p className="text-xs text-slate-500">Orden #ORD-004 llegó a tu casa.</p>
                        </div>
                    </div>
                    <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4">
                        <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-xl flex items-center justify-center">
                            <Bell size={20} />
                        </div>
                        <div>
                            <h4 className="font-bold text-sm text-slate-800">Itinerario de Vuelos</h4>
                            <p className="text-xs text-slate-500">Nuevos vuelos agregados esta semana.</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

// --- Main App Component ---

const App = () => {
  const [view, setView] = useState<ViewState>('home');

  const renderContent = () => {
    switch (view) {
      case 'home': return <HomeView onOpenNotifications={() => setView('notifications')} />;
      case 'orders': return <Orders />;
      case 'promos': return <Promos />;
      case 'profile': return <ProfileView />;
      case 'notifications': return <NotificationsView onBack={() => setView('home')} />;
      default: return <HomeView onOpenNotifications={() => setView('notifications')} />;
    }
  };

  const NavItem = ({ target, icon: Icon, label }: { target: ViewState, icon: any, label: string }) => {
    const isActive = view === target;
    return (
        <button 
            onClick={() => setView(target)}
            className={`flex flex-col items-center justify-center w-full h-full space-y-1 transition-all duration-200 ${isActive ? 'text-ubox-blue' : 'text-slate-400 hover:text-slate-600'}`}
        >
            <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
            <span className="text-[10px] font-medium">{label}</span>
        </button>
    );
  };

  return (
    <div className="max-w-md mx-auto bg-slate-50 min-h-screen shadow-2xl relative overflow-hidden flex flex-col">
      {/* Top Bar removed from here to prevent overlap. Bell is now inside HomeView header. */}
      
      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto no-scrollbar scroll-smooth">
        {renderContent()}
      </main>

      {/* Bottom Navigation */}
      {view !== 'notifications' && (
          <div className="fixed bottom-0 w-full max-w-md z-40 bg-white/95 backdrop-blur border-t border-slate-100 pb-safe pt-2 px-2 h-[84px] shadow-[0_-4px_20px_rgba(0,0,0,0.03)]">
            <div className="flex justify-around items-center h-full pb-4">
                <NavItem target="home" icon={Home} label="Inicio" />
                <NavItem target="promos" icon={ShoppingBag} label="Comprar" />
                <NavItem target="orders" icon={Package} label="Pedidos" />
                <NavItem target="profile" icon={User} label="Perfil" />
            </div>
          </div>
      )}
    </div>
  );
};

export default App;