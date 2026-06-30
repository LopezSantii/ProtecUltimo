import React from 'react';
import { motion } from 'framer-motion';
import { Eye, Package, Mail, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

export default function Landing() {
  const { toast } = useToast();

  const handleCategoryClick = (category) => {
    toast({
      title: "🚧 Navegación en desarrollo",
      description: "Esta funcionalidad estará disponible pronto. ¡Gracias por tu paciencia!",
    });
  };

  const brands = [
    { name: 'Libus', logo: '/img/logo_libus.png' },
    { name: 'Ombu', logo: '/img/ombu_logo.png' },
    { name: '3M', logo: '/img/logo_3m.png' },
    { name: 'Fravida', logo: '/img/logo_fravida.png' },
    { name: 'Funcional', logo: '/img/logo_funcional.png' },
    { name: 'Grafa70', logo: '/img/logo_grafa70.png' },
    { name: 'Nomex', logo: '/img/logo_nomex.png' },
    { name: 'Proforce', logo: '/img/logo_proforce.webp' },
    { name: 'Roguant', logo: '/img/logo_roguant.png' },
    { name: 'Steelpro', logo: '/img/logo_steelpro.jpg' },
    { name: 'Ansell', logo: '/img/logo_ansell.jpg' },
    { name: 'Work Safe', logo: '/img/logo_work_safe.webp' },
  ];

  const categories = [
    {
      title: 'FACIAL',
      gradient: 'from-cyan-500 via-blue-500 to-purple-600',
      image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&q=80',
    },
    {
      title: 'RESPIRATORIA',
      gradient: 'from-orange-500 via-red-500 to-pink-600',
      image: 'https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?w=800&q=80',
    },
    {
      title: 'AUDITIVA',
      gradient: 'from-green-500 via-teal-500 to-cyan-600',
      image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&q=80',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-pink-600/20" />
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: 'url(https://horizons-cdn.hostinger.com/e22a53d6-3914-4dd6-9c51-2db0a29ab11a/66b6b47a32de869a939e5efcd3460f16.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center px-4 max-w-5xl mx-auto"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mb-8"
          >
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-6 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent leading-tight">
              LA MEJOR PROTECCIÓN
              <br />
              PARA TU EMPRESA
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-xl md:text-2xl text-gray-300 mb-10 max-w-3xl mx-auto"
          >
            Equipos de protección personal de las mejores marcas del mercado
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <Button
              onClick={() => handleCategoryClick('Todos')}
              size="lg"
              className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white font-bold px-8 py-6 text-lg rounded-full shadow-2xl hover:shadow-cyan-500/50 transition-all duration-300 transform hover:scale-105"
            >
              Ver Productos
              <Eye className="ml-2 h-5 w-5" />
            </Button>
          </motion.div>
        </motion.div>

        {/* Decorative Elements */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" />
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" />
      </section>

      {/* Brands Section */}
      <section className="py-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/20 to-transparent" />
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-7xl mx-auto relative z-10"
        >
          <h2 className="text-4xl md:text-5xl font-black text-center mb-16 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            MARCAS CON LAS QUE TRABAJAMOS
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {brands.map((brand, index) => (
              <motion.div
                key={brand.name}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05, duration: 0.4 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 flex items-center justify-center border border-white/20 shadow-xl hover:shadow-purple-500/30 transition-all duration-300"
              >
                <img
                  src={brand.logo}
                  alt={`Logo ${brand.name}`}
                  className="max-w-full h-auto max-h-20 object-contain filter brightness-0 invert"
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Categories Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            {categories.slice(0, 2).map((category, index) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, x: index === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                whileHover={{ scale: 1.02 }}
                onClick={() => handleCategoryClick(category.title)}
                className="relative h-80 rounded-3xl overflow-hidden cursor-pointer group"
              >
                <div className="absolute inset-0 bg-gradient-to-br opacity-80 group-hover:opacity-90 transition-opacity duration-300"
                  style={{ background: `linear-gradient(135deg, var(--tw-gradient-stops))` }}
                  className={`bg-gradient-to-br ${category.gradient}`}
                />
                <img
                  src={category.image}
                  alt={category.title}
                  className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-50"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <h3 className="text-4xl md:text-5xl font-black text-white drop-shadow-2xl transform group-hover:scale-110 transition-transform duration-300">
                    {category.title}
                  </h3>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            whileHover={{ scale: 1.02 }}
            onClick={() => handleCategoryClick(categories[2].title)}
            className="relative h-80 rounded-3xl overflow-hidden cursor-pointer group"
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${categories[2].gradient} opacity-80 group-hover:opacity-90 transition-opacity duration-300`} />
            <img
              src={categories[2].image}
              alt={categories[2].title}
              className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-50"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <h3 className="text-4xl md:text-5xl font-black text-white drop-shadow-2xl transform group-hover:scale-110 transition-transform duration-300">
                {categories[2].title}
              </h3>
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </motion.div>
        </div>
      </section>

      {/* Shipping Section */}
      <section className="py-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-600/20 via-purple-600/20 to-pink-600/20" />
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto relative z-10"
        >
          <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-12 border border-white/20 shadow-2xl">
            <div className="flex items-center justify-center gap-4 flex-wrap">
              <Package className="w-16 h-16 text-cyan-400" />
              <h3 className="text-3xl md:text-4xl font-black text-white text-center">
                HACEMOS ENVÍOS A TODO EL PAÍS
              </h3>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-b from-transparent to-black/50 py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h4 className="text-2xl font-bold text-white mb-6 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                Protecciones
              </h4>
              <ul className="space-y-3 text-gray-300">
                <li className="hover:text-cyan-400 transition-colors cursor-pointer">Craniana</li>
                <li className="hover:text-cyan-400 transition-colors cursor-pointer">Auditiva</li>
                <li className="hover:text-cyan-400 transition-colors cursor-pointer">Facial</li>
                <li className="hover:text-cyan-400 transition-colors cursor-pointer">Ocular</li>
                <li className="hover:text-cyan-400 transition-colors cursor-pointer">Respiratoria</li>
                <li className="hover:text-cyan-400 transition-colors cursor-pointer">Soldadura</li>
                <li className="hover:text-cyan-400 transition-colors cursor-pointer">Vial</li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h4 className="text-2xl font-bold text-white mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Contacto
              </h4>
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-gray-300 hover:text-cyan-400 transition-colors">
                  <Mail className="w-5 h-5" />
                  <span>ventas@protecgroup.com.ar</span>
                </div>
                <div className="flex items-center gap-3 text-gray-300 hover:text-cyan-400 transition-colors">
                  <Mail className="w-5 h-5" />
                  <span>administracion@protecgroup.com.ar</span>
                </div>
                <div className="flex items-center gap-3 text-gray-300 hover:text-cyan-400 transition-colors">
                  <Phone className="w-5 h-5" />
                  <span>+54 1138086411</span>
                </div>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="mt-12 pt-8 border-t border-white/10 text-center text-gray-400"
          >
            <p>© 2024 Protec Group. Todos los derechos reservados.</p>
          </motion.div>
        </div>
      </footer>
    </div>
  );
}