import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, X, Plus, Minus, Trash2, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useCart } from '@/context/CartContext';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';

// Componente para el icono de WhatsApp si lo necesitas
const WhatsAppIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16" {...props}>
        <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232" />
    </svg>
);

const Header = () => {
    const location = useLocation();
    
    // Aquí es donde detectamos si estamos en listado o en detalle
    const showCategoriesNav = location.pathname.startsWith('/category') || location.pathname.startsWith('/product');
    
    const { cartItems } = useCart();
    const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

    const navLinks = [
        { name: 'Productos', path: '/category/Todos' },
        { name: 'Marcas', path: '/marcas' },
        { name: 'Nosotros', path: '/nosotros' },
    ];
    
    const categories = [
        {id: "Indumentaria", name: "Indumentaria"}, {id: "Extintores", name: "Extintores"},
        {id: "Guantes", name: "Guantes"}, {id: "Craneana", name: "Craneana"}, 
        {id: "Auditiva", name: "Auditiva"}, {id: "Facial", name: "Facial"}, 
        {id: "Ocular", name: "Ocular"}, {id: "Respiratoria", name: "Respiratoria"}, 
        {id: "Soldadura", name: "Soldadura"}, {id: "Vial", name: "Vial"},
        {id: "Otros", name: "Otros"}
    ];

    return (
        <Sheet>
            <header className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-lg border-b border-border/50">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-20">
                        <Link to="/" className="flex-shrink-0 z-50">
                            <img src="/img/logo.png" alt="Logo" className="h-14 w-auto" />
                        </Link>

                        <nav className="hidden md:flex flex-1 justify-center items-center h-full">
                            {showCategoriesNav ? (
                                <div className="flex items-center justify-center space-x-1 lg:space-x-2 overflow-x-auto no-scrollbar">
                                    {categories.map((item) => (
                                        <NavLink
                                            key={item.id}
                                            to={`/category/${item.id}`}
                                            className={({ isActive }) =>
                                                `text-sm font-medium whitespace-nowrap transition-colors px-3 py-2 rounded-md ${
                                                    isActive
                                                        ? 'text-cyan-400 bg-cyan-900/30'
                                                        : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
                                                }`
                                            }
                                        >
                                            {item.name}
                                        </NavLink>
                                    ))}
                                </div>
                            ) : (
                                <div className="flex items-center space-x-8">
                                    {navLinks.map((item) => (
                                        <Link key={item.name} to={item.path} className="text-sm font-medium text-gray-300 hover:text-white transition-colors">
                                            {item.name}
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </nav>

                        <div className="flex items-center space-x-2">
                            <SheetTrigger asChild>
                                <Button variant="ghost" size="icon" className="relative">
                                    <ShoppingCart className="h-6 w-6 text-gray-300 hover:text-cyan-400" />
                                    {totalItems > 0 && (
                                        <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-cyan-500 text-xs font-bold text-black">
                                            {totalItems}
                                        </span>
                                    )}
                                </Button>
                            </SheetTrigger>
                        </div>
                    </div>
                </div>
            </header>
        </Sheet>
    );
};

export default Header;