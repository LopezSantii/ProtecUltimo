import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, X, Plus, Minus, Trash2, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useCart } from '@/context/CartContext';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetFooter } from '@/components/ui/sheet';

// 1. Icono de WhatsApp (Intacto)
const WhatsAppIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16" {...props}>
        <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232" />
    </svg>
);

// 2. Componente del Carrito (Restaurado con todas tus funciones)
const CartSidebar = () => {
    const { cartItems, removeFromCart, updateQuantity } = useCart();
    
    const handleWhatsAppInquiry = () => {
        const message = cartItems
            .map(item => {
                const colorInfo = item.selectedColor ? ` - Color: ${item.selectedColor}` : '';
                return `*${item.title}*: ${item.quantity} unidades${colorInfo}`;
            }).join("\n");
        const fullMessage = encodeURIComponent(`Hola, quería consultar por la disponibilidad de estos productos:\n${message}`);
        const phone = "5491136598411";
        const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
        const whatsappURL = isMobile ? `whatsapp://send?phone=${phone}&text=${fullMessage}` : `https://web.whatsapp.com/send?phone=${phone}&text=${fullMessage}`;
        window.open(whatsappURL, "_blank");
    };

    return (
        <SheetContent className="bg-card border-l border-border/50 flex flex-col w-full sm:max-w-lg z-[9999]">
            <SheetHeader>
                <SheetTitle className="text-2xl font-bold">Carrito de Compras</SheetTitle>
            </SheetHeader>
            {cartItems.length > 0 ? (
                <>
                    <div className="flex-grow overflow-y-auto pr-4 -mr-4 my-4 divide-y divide-border/50">
                        {cartItems.map(item => (
                            <div key={item.id + (item.selectedColor || '')} className="flex items-center py-4">
                                <img alt={item.title} className="w-20 h-20 rounded-md object-cover mr-4" src={item.img?.imgCard || "https://images.unsplash.com/photo-1505308088817-f1e3cb2a2f63"} />
                                <div className="flex-grow">
                                    <p className="font-semibold">{item.title}</p>
                                    {item.selectedColor && <p className="text-sm text-muted-foreground">Color: {item.selectedColor}</p>}
                                    <div className="flex items-center mt-2">
                                        <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => updateQuantity(item.id, item.quantity - 1, item.selectedColor)}><Minus className="h-4 w-4" /></Button>
                                        <span className="w-10 text-center font-bold">{item.quantity}</span>
                                        <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => updateQuantity(item.id, item.quantity + 1, item.selectedColor)}><Plus className="h-4 w-4" /></Button>
                                    </div>
                                </div>
                                <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-destructive" onClick={() => removeFromCart(item.id, item.selectedColor)}>
                                    <Trash2 className="h-5 w-5" />
                                </Button>
                            </div>
                        ))}
                    </div>
                    <SheetFooter className="mt-auto pt-4 border-t border-border/50">
                        <Button onClick={handleWhatsAppInquiry} size="lg" className="w-full bg-green-500 text-white font-bold hover:bg-green-600 flex items-center gap-2">
                            Consultar <WhatsAppIcon />
                        </Button>
                    </SheetFooter>
                </>
            ) : (
                <div className="flex-grow flex flex-col items-center justify-center text-center">
                    <ShoppingCart className="h-20 w-20 text-muted-foreground mb-4" />
                    <p className="text-xl font-semibold">Tu carrito está vacío</p>
                </div>
            )}
        </SheetContent>
    );
}

// 3. Menú Móvil (Corregido para sobreponerse a todo)
const MobileMenu = ({ isOpen, setIsOpen, isProductsPage, categories }) => {
    const navLinks = [
        { name: 'Productos', path: '/category/Todos' },
        { name: 'Marcas', path: '/marcas' },
        { name: 'Nosotros', path: '/nosotros' },
    ];

    const itemsToRender = isProductsPage ? [{name: 'Todas', path: '/category/Todos'}, ...categories.map(c => ({name: c.name, path: `/category/${c.id}`}))] : navLinks;

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, y: "-100%" }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: "-100%" }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="fixed inset-0 z-[9999] bg-background/95 backdrop-blur-md md:hidden"
                >
                    <div className="flex justify-end p-6">
                        <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                            <X className="h-8 w-8" />
                        </Button>
                    </div>
                    <div className="flex flex-col items-center justify-start h-full pt-10 overflow-y-auto pb-20">
                        {itemsToRender.map((item, index) => (
                            <motion.div
                                key={item.name}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.1 + index * 0.05 }}
                            >
                                <Link
                                    to={item.path}
                                    onClick={() => setIsOpen(false)}
                                    className="text-2xl font-bold text-gray-200 hover:text-cyan-400 transition-colors py-4 block"
                                >
                                    {item.name}
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

// 4. Header Principal
const Header = () => {
    const location = useLocation();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    
    // Cierra el menú móvil al navegar
    useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [location.pathname]);

    const showCategoriesNav = location.pathname.startsWith('/category') || location.pathname.startsWith('/product');
    const { cartItems } = useCart();
    const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

    const categories = [
        {id: "Indumentaria", name: "Indumentaria"}, {id: "Extintores", name: "Extintores"},
        {id: "Guantes", name: "Guantes"}, {id: "Craneana", name: "Craneana"}, 
        {id: "Auditiva", name: "Auditiva"}, {id: "Facial", name: "Facial"}, 
        {id: "Ocular", name: "Ocular"}, {id: "Respiratoria", name: "Respiratoria"}, 
        {id: "Soldadura", name: "Soldadura"}, {id: "Vial", name: "Vial"},
        {id: "Otros", name: "Otros"}
    ];

    return (
        // Usamos un Fragmento (<>) en lugar de <Sheet> envolviendo todo
        <>
            <header className="fixed top-0 left-0 right-0 z-[100] bg-black/50 backdrop-blur-lg border-b border-border/50">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-20">
                        
                        {/* LOGO */}
                        <Link to="/" className="flex-shrink-0 z-[101]">
                            <img src="/img/logo.png" alt="Logo de ProtecGroup" className="h-14 w-auto" />
                        </Link>

                        {/* NAVEGACIÓN DESKTOP */}
                        <nav className="hidden md:flex flex-1 justify-center items-center h-full overflow-hidden px-4">
                            {showCategoriesNav ? (
                                <div className="flex items-center space-x-1 lg:space-x-2 overflow-x-auto no-scrollbar py-2">
                                    {categories.map((item) => (
                                        <NavLink
                                            key={item.id}
                                            to={`/category/${item.id}`}
                                            className={({ isActive }) => `text-sm font-medium whitespace-nowrap transition-colors px-3 py-2 rounded-md ${isActive ? 'text-cyan-400 bg-cyan-900/30' : 'text-gray-400 hover:text-white hover:bg-gray-700/50'}`}
                                        >
                                            {item.name}
                                        </NavLink>
                                    ))}
                                </div>
                            ) : (
                                <div className="flex items-center space-x-8">
                                    <Link to="/category/Todos" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">Productos</Link>
                                    <Link to="/marcas" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">Marcas</Link>
                                    <Link to="/nosotros" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">Nosotros</Link>
                                </div>
                            )}
                        </nav>

                        {/* BOTONES DERECHA */}
                        <div className="flex items-center space-x-2 z-[101]">
                            
                            {/* SOLO EL CARRITO ESTÁ ENVUELTO EN SHEET */}
                            <Sheet>
                                <SheetTrigger asChild>
                                    <Button variant="ghost" size="icon" className="relative text-gray-300 hover:text-cyan-400">
                                        <ShoppingCart className="h-6 w-6" />
                                        {totalItems > 0 && (
                                            <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-cyan-500 text-xs font-bold text-black">
                                                {totalItems}
                                            </span>
                                        )}
                                    </Button>
                                </SheetTrigger>
                                <CartSidebar />
                            </Sheet>

                            {/* BOTÓN HAMBURGUESA MÓVIL */}
                            <Button 
                                variant="ghost" 
                                size="icon" 
                                className="md:hidden text-gray-300"
                                onClick={() => setIsMobileMenuOpen(true)}
                            >
                                <Menu className="h-6 w-6" />
                            </Button>
                            
                        </div>
                    </div>
                </div>
            </header>

            {/* OVERLAY DEL MENÚ MÓVIL */}
            <MobileMenu 
                isOpen={isMobileMenuOpen} 
                setIsOpen={setIsMobileMenuOpen} 
                isProductsPage={showCategoriesNav} 
                categories={categories} 
            />
        </>
    );
};

export default Header;