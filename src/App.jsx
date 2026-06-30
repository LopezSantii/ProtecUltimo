import React from 'react';
    import { Helmet } from 'react-helmet';
    import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
    import LandingPage from '@/pages/LandingPage';
    import ProductsPage from '@/pages/ProductsPage';
    import ProductDetailPage from '@/pages/ProductDetailPage';
    import MarcasPage from '@/pages/MarcasPage';
    import NosotrosPage from '@/pages/NosotrosPage';
    import { Toaster } from '@/components/ui/toaster';
    import { CartProvider } from '@/context/CartContext';

    function App() {
      return (
        <>
          <Helmet>
            <title>Protec Group - Soluciones en Protección Personal</title>
            <meta name="description" content="Protec Group: Líderes en equipos de protección personal. Ofrecemos la máxima seguridad y calidad con productos de las mejores marcas para proteger a tu equipo." />
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
            
            <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;900&display=swap" rel="stylesheet" />
          </Helmet>
          <CartProvider>
            <Router>
              <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/category/:categoryName" element={<ProductsPage />} />
                <Route path="/product/:productId" element={<ProductDetailPage />} />
                <Route path="/marcas" element={<MarcasPage />} />
                <Route path="/nosotros" element={<NosotrosPage />} />
              </Routes>
            </Router>
          </CartProvider>
          <Toaster />
        </>
      );
    }

    export default App;