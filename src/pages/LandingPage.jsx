import React from 'react';
    import { motion } from 'framer-motion';
    import { ArrowRight, HardHat, Ear, Eye, Package } from 'lucide-react';
    import { Button } from '@/components/ui/button';
    import Header from '@/components/layout/Header';
    import Footer from '@/components/layout/Footer';
    import { Link } from 'react-router-dom';

    const HeroSection = () => {
      return (
        <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 min-h-screen flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background"></div>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                className="text-4xl sm:text-5xl lg:text-7xl font-black tracking-tighter mb-6 bg-gradient-to-br from-white via-neutral-300 to-cyan-300 bg-clip-text text-transparent"
              >
                Soluciones Integrales en Protección Personal
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="text-lg lg:text-xl text-gray-400 max-w-2xl mx-auto mb-10"
              >
                La seguridad de tu equipo es nuestra prioridad. Descubre nuestra gama de productos de alta calidad de las marcas más confiables.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.4 }}
              >
                <Link to="/category/Todos">
                  <Button size="lg" className="bg-cyan-500 text-black font-bold hover:bg-cyan-400 px-8 py-6 rounded-full text-base group">
                    Explorar Catálogo <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
              </motion.div>
            </div>
          </div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60rem] h-[60rem] bg-gradient-to-tr from-purple-900 via-cyan-900 to-background rounded-full blur-[150px] opacity-20 animate-pulse"></div>
        </section>
      );
    };

    const CategoriesSection = () => {
      const categories = [
        { title: 'Protección Craneana', icon: HardHat, description: 'Cascos y accesorios de seguridad.', link: '/category/Craneana' },
        { title: 'Protección Auditiva', icon: Ear, description: 'Protectores auditivos de alto rendimiento.', link: '/category/Auditiva' },
        { title: 'Protección Ocular y Facial', icon: Eye, description: 'Gafas, antiparras y máscaras faciales.', link: '/category/Facial' },
        { title_long: 'Y mucho más...', icon: Package, description: 'Respiratoria, indumentaria, guantes...', link: '/category/Todos' },
      ];

      return (
        <section className="py-20 lg:py-32">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl lg:text-4xl font-bold tracking-tight">Nuestras Categorías Principales</h2>
              <p className="mt-4 text-lg text-gray-400">Todo lo que necesitas para un entorno de trabajo seguro.</p>
            </motion.div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {categories.map((cat, index) => (
                <Link to={cat.link} key={index}>
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-card border border-border/50 rounded-xl p-8 text-center flex flex-col items-center hover:border-cyan-400/50 hover:-translate-y-2 transition-all duration-300 cursor-pointer shadow-lg hover:shadow-cyan-900/50 h-full"
                  >
                    <div className="bg-cyan-500/10 p-4 rounded-full mb-6">
                      <cat.icon className="h-10 w-10 text-cyan-400" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">{cat.title || cat.title_long}</h3>
                    <p className="text-gray-400 text-sm">{cat.description}</p>
                  </motion.div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      );
    };

    const BrandsSection = () => {
      const brandLogos = [
        'Libus', '3M', 'Ombú', 'Funcional', 'Grafa70', 'Fravida', 'Steelpro', 'Ansell',
        'Libus', '3M', 'Ombú', 'Funcional', 'Grafa70', 'Fravida', 'Steelpro', 'Ansell'
      ];
      return (
        <section className="py-20 lg:py-32 bg-background/50 overflow-hidden">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
             <motion.h2
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center text-xl font-bold tracking-widest text-gray-400 uppercase mb-12"
            >
              Marcas con las que trabajamos
            </motion.h2>
          </div>
          <div
            className="w-full inline-flex flex-nowrap"
          >
            <div className="flex items-center justify-center md:justify-start [&_p]:mx-8 animate-infinite-scroll group-hover:paused">
               {brandLogos.map((brand, index) => (
                 <p key={index} className="text-2xl font-bold text-gray-500 filter grayscale hover:grayscale-0 hover:text-white transition-all duration-300">{brand}</p>
               ))}
            </div>
             <div className="flex items-center justify-center md:justify-start [&_p]:mx-8 animate-infinite-scroll" aria-hidden="true">
               {brandLogos.map((brand, index) => (
                 <p key={index} className="text-2xl font-bold text-gray-500 filter grayscale hover:grayscale-0 hover:text-white transition-all duration-300">{brand}</p>
               ))}
            </div>
          </div>
        </section>
      );
    };

    export default function LandingPage() {
      return (
        <div className="bg-background text-foreground">
          <Header />
          <main>
            <HeroSection />
            <CategoriesSection />
            <BrandsSection />
          </main>
          <Footer />
        </div>
      );
    }