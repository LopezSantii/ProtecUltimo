import React from 'react';
    import { ShieldCheck, Mail, Phone, Instagram } from 'lucide-react';
    import { Link } from 'react-router-dom';

    const Footer = () => {
      const protecciones = ['Indumentaria', "Extintores",'Guantes','Craneana', 'Auditiva', 'Facial', 'Ocular', 'Respiratoria', 'Soldadura', 'Vial','Otros'];
      const empresaLinks = [
        { name: 'Productos', path: '/category/Todos' },
        { name: 'Marcas', path: '/marcas' },
        { name: 'Nosotros', path: '/nosotros' },
      ];

      return (
        <footer className="bg-background border-t border-border/50 py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
              <div className="md:col-span-1">
                <div className="flex items-center space-x-3 mb-4">
                  <img src="/img/logo.png" alt="Logo de protecgroup" className="h-10"/>
                </div>
                <p className="text-gray-400 text-sm">Comprometidos con la seguridad y la calidad, brindando protección a miles de trabajadores.</p>
              </div>
              <div>
                <p className="font-bold text-lg mb-4">Empresa</p>
                <ul className="space-y-2">
                  {empresaLinks.map((item) => (
                    <li key={item.name}>
                      <Link to={item.path} className="text-gray-400 hover:text-cyan-400 transition-colors cursor-pointer text-sm">{item.name}</Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="font-bold text-lg mb-4">Protecciones</p>
                <ul className="space-y-2">
                  {protecciones.slice(0, 5).map((item) => (
                    <li key={item}>
                      <Link to={`/category/${item}`} className="text-gray-400 hover:text-cyan-400 transition-colors cursor-pointer text-sm">{item}</Link>
                    </li>
                  ))}
                   <li><Link to="/category/Todos" className="text-cyan-400 hover:text-cyan-300 transition-colors cursor-pointer text-sm font-semibold">Ver todas...</Link></li>
                </ul>
              </div>
              <div>
                <p className="font-bold text-lg mb-4">Contacto</p>
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <Mail className="h-4 w-4 mr-3 text-gray-500"/>
                    <span className="text-gray-400 text-sm">ventas@protecgroup.com.ar</span>
                  </li>
                  <li className="flex items-center">
                    <Phone className="h-4 w-4 mr-3 text-gray-500"/>
                    <span className="text-gray-400 text-sm">+54 9 1136598411</span>
                  </li>
                   <li className="flex items-center">
                    <Phone className="h-4 w-4 mr-3 text-gray-500"/>
                    <span className="text-gray-400 text-sm">+54 9 1161905555</span>
                  </li>
                  <li className="flex items-center">
                    <Instagram className="h-4 w-4 mr-3 text-gray-500"/>
                    <a href="https://www.instagram.com/protec_group.ok/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-cyan-400 transition-colors text-sm">
                      protec_group.ok
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="mt-12 pt-8 border-t border-border/50 text-center text-gray-500 text-sm">
              <p>&copy; {new Date().getFullYear()} Protec Group. Todos los derechos reservados.</p>
            </div>
          </div>
        </footer>
      );
    };

    export default Footer;