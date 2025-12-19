import React, { useState } from 'react';
import { Package, Truck, CheckCircle, Search, Filter, AlertCircle, Clock } from 'lucide-react';
import { MOCK_ORDERS } from '../constants';
import { Order, OrderStatus } from '../types';

const OrderCard: React.FC<{ order: Order }> = ({ order }) => {
  const getStatusColor = (status: OrderStatus) => {
    switch (status) {
      case OrderStatus.DELIVERED: return 'text-green-600 bg-green-50 border-green-100';
      case OrderStatus.READY_PICKUP: return 'text-ubox-blue bg-blue-50 border-blue-100';
      case OrderStatus.IN_TRANSIT: return 'text-orange-600 bg-orange-50 border-orange-100';
      default: return 'text-slate-600 bg-slate-50 border-slate-100';
    }
  };

  const getIcon = (status: OrderStatus) => {
    switch (status) {
      case OrderStatus.DELIVERED: return <CheckCircle size={16} />;
      case OrderStatus.READY_PICKUP: return <Package size={16} />;
      case OrderStatus.IN_TRANSIT: return <Truck size={16} />;
      case OrderStatus.WAREHOUSE_MIAMI: return <Clock size={16} />;
      default: return <AlertCircle size={16} />;
    }
  };

  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 mb-3 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${getStatusColor(order.status).replace('text-', 'bg-opacity-20 ')}`}>
               {getIcon(order.status)} 
            </div>
            <div>
                <h4 className="font-bold text-slate-800">{order.description}</h4>
                <p className="text-xs text-slate-400 font-mono">{order.tracking}</p>
            </div>
        </div>
        <div className="text-right">
            <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold border ${getStatusColor(order.status)}`}>
                {order.status}
            </span>
        </div>
      </div>
      
      <div className="flex justify-between items-center border-t border-slate-50 pt-3 mt-1">
        <div className="text-xs text-slate-500">
            <span className="block text-slate-400 mb-0.5">Fecha</span>
            {order.date}
        </div>
        <div className="text-xs text-slate-500 text-right">
            <span className="block text-slate-400 mb-0.5">Peso</span>
            {order.weight} kg
        </div>
        {order.price && (
            <div className="text-sm font-bold text-ubox-dark text-right">
                <span className="block text-[10px] text-slate-400 font-normal mb-0.5 uppercase">A Pagar</span>
                ${order.price.toFixed(2)}
            </div>
        )}
      </div>
    </div>
  );
};

const Orders = () => {
  const [filter, setFilter] = useState<'active' | 'history'>('active');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredOrders = MOCK_ORDERS.filter(order => {
    const matchesSearch = order.description.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          order.tracking.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (filter === 'active') {
      return matchesSearch && order.status !== OrderStatus.DELIVERED && order.status !== OrderStatus.CANCELLED;
    } else {
      return matchesSearch && (order.status === OrderStatus.DELIVERED || order.status === OrderStatus.CANCELLED);
    }
  });

  return (
    <div className="pb-24 pt-6 px-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-ubox-dark">Mis Pedidos</h2>
        <button className="p-2 bg-white rounded-full shadow-sm text-ubox-blue">
            <Filter size={20} />
        </button>
      </div>

      {/* Tabs */}
      <div className="flex p-1 bg-slate-100 rounded-xl mb-6">
        <button 
            onClick={() => setFilter('active')}
            className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all ${filter === 'active' ? 'bg-white text-ubox-blue shadow-sm' : 'text-slate-500'}`}
        >
            Activos
        </button>
        <button 
            onClick={() => setFilter('history')}
            className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all ${filter === 'history' ? 'bg-white text-ubox-blue shadow-sm' : 'text-slate-500'}`}
        >
            Historial
        </button>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
        <input 
            type="text" 
            placeholder="Buscar tracking o descripción..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white border border-slate-200 rounded-xl py-3 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-ubox-blue/20 focus:border-ubox-blue"
        />
      </div>

      {/* List */}
      <div className="space-y-1">
        {filteredOrders.length > 0 ? (
            filteredOrders.map(order => (
                <OrderCard key={order.id} order={order} />
            ))
        ) : (
            <div className="text-center py-12">
                <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-300">
                    <Package size={32} />
                </div>
                <h3 className="text-slate-800 font-semibold">No se encontraron pedidos</h3>
                <p className="text-slate-400 text-sm mt-1">Intentá cambiando la búsqueda o el filtro.</p>
            </div>
        )}
      </div>
    </div>
  );
};

export default Orders;