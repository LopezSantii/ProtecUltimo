import React from 'react';
    import { motion } from 'framer-motion';
    import Header from '@/components/layout/Header';
    import Footer from '@/components/layout/Footer';

    const MarcasPage = () => {
        const brands = [
            'Libus', '3M', 'Ombú', 'Funcional', 'Grafa70', 'Fravida', 'Steelpro', 'Ansell',
            'Nomex', 'Proforce', 'Roguant', 'Work Safe'
        ];

        return (
            <div className="bg-background text-foreground">
                <Header />
                <main className="pt-24 sm:pt-32 pb-20">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="text-center mb-16"
                        >
                            <h1 className="text-4xl lg:text-5xl font-bold tracking-tight">Nuestras Marcas</h1>
                            <p className="mt-4 text-lg text-gray-400 max-w-2xl mx-auto">Trabajamos con los líderes de la industria para garantizar la máxima calidad y seguridad en cada producto.</p>
                        </motion.div>

                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8">
                            {brands.map((brand, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.4, delay: index * 0.05 }}
                                    className="bg-card border border-border/50 rounded-xl flex items-center justify-center aspect-video p-6 hover:border-cyan-400/50 hover:-translate-y-1 transition-all duration-300"
                                >
                                    <p className="text-2xl font-bold text-gray-300 filter grayscale group-hover:grayscale-0 group-hover:text-white transition-all duration-300">{brand}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </main>
                <Footer />
            </div>
        );
    };

    export default MarcasPage;