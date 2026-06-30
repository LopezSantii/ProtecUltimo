import React from 'react';
    import { motion } from 'framer-motion';
    import Header from '@/components/layout/Header';
    import Footer from '@/components/layout/Footer';
    import { Shield, Target, Users } from 'lucide-react';

    const NosotrosPage = () => {
        const values = [
            {
                icon: Shield,
                title: "Seguridad Primero",
                description: "Nuestra prioridad es la protección integral del trabajador. Cada producto es seleccionado bajo los más altos estándares de seguridad."
            },
            {
                icon: Target,
                title: "Calidad Garantizada",
                description: "Colaboramos con las marcas más prestigiosas para ofrecer equipos duraderos, confiables y certificados."
            },
            {
                icon: Users,
                title: "Compromiso con el Cliente",
                description: "Brindamos asesoramiento experto y un servicio al cliente excepcional para encontrar la solución perfecta a tus necesidades."
            }
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
                            <h1 className="text-4xl lg:text-5xl font-bold tracking-tight">Sobre Protec Group</h1>
                            <p className="mt-4 text-lg text-gray-400 max-w-3xl mx-auto">Más que un proveedor, somos tu socio estratégico en seguridad industrial.</p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-24"
                        >
                            <div className="order-2 md:order-1">
                                <h2 className="text-3xl font-bold mb-4">Nuestra Historia</h2>
                                <p className="text-gray-400 mb-4">
                                    Fundada con la misión de salvaguardar la integridad de cada trabajador, Protec Group nació de la necesidad de un proveedor confiable y experto en el campo de la protección personal. Con años de experiencia, hemos crecido hasta convertirnos en un referente en Argentina, equipando a empresas de todos los tamaños con la mejor tecnología en seguridad.
                                </p>
                                <p className="text-gray-400">
                                    Nuestro equipo está compuesto por especialistas apasionados por la seguridad, dedicados a entender los desafíos únicos de cada industria para ofrecer soluciones a medida.
                                </p>
                            </div>
                            <div className="order-1 md:order-2 aspect-video bg-card border border-border/50 rounded-xl flex items-center justify-center p-4">
                                <img className="max-h-full max-w-full object-contain rounded-lg" alt="Team of professionals discussing safety measures" src="https://images.unsplash.com/photo-1552242716-c46d66b1ff38" />
                            </div>
                        </motion.div>

                        <div>
                            <h2 className="text-3xl font-bold text-center mb-12">Nuestros Valores</h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                {values.map((value, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, y: 30 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                                        className="bg-card border border-border/50 rounded-xl p-8 text-center flex flex-col items-center"
                                    >
                                        <div className="bg-cyan-500/10 p-4 rounded-full mb-6">
                                            <value.icon className="h-10 w-10 text-cyan-400" />
                                        </div>
                                        <h3 className="text-xl font-bold mb-2">{value.title}</h3>
                                        <p className="text-gray-400 text-sm">{value.description}</p>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>
                </main>
                <Footer />
            </div>
        );
    };

    export default NosotrosPage;