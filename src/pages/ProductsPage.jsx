import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { useCart } from '@/context/CartContext';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '@/lib/firebase';

const categoryTitles = {
  todos: "Todos nuestros productos",
  craneana: "Protección Craneana",
  auditiva: "Protección Auditiva",
  facial: "Protección Facial",
  ocular: "Protección Ocular",
  respiratoria: "Protección Respiratoria",
  soldadura: "Protección para Soldadura",
  vial: "Seguridad Vial",
  guantes: "Guantes",
  indumentaria: "Indumentaria de Trabajo",
  otros: "Otros Productos",
};

const ProductCardSkeleton = () => (
  <div className="bg-card border border-border/50 rounded-xl overflow-hidden flex flex-col h-full animate-pulse">
    <div className="aspect-square bg-muted"></div>
    <div className="p-6 flex-grow flex flex-col">
      <div className="h-6 bg-muted rounded w-3/4 mb-4"></div>
      <div className="h-10 bg-muted rounded w-full mt-auto"></div>
    </div>
  </div>
);

const ProductCard = ({ product, index }) => {
  const { toast } = useToast();
  const { addToCart } = useCart();

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
    toast({
      title: "✅ ¡Producto agregado!",
      description: `${product.title} ha sido añadido a tu carrito.`,
      className: 'bg-green-600/90 border-green-600 text-white',
    });
  };

  return (
    <Link to={`/product/${product.id}`}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.05 }}
        className="bg-card border border-border/50 rounded-xl overflow-hidden group flex flex-col h-full"
      >
        <div className="relative overflow-hidden aspect-square">
          <img
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            alt={product.title}
            src={product.img?.imgCard || "https://images.unsplash.com/photo-1505308088817-f1e3cb2a2f63"}
          />
          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
        <div className="p-6 flex-grow flex flex-col">
          <h3 className="text-lg font-bold mb-2 flex-grow">{product.title}</h3>
          <Button
            onClick={handleAddToCart}
            className="w-full mt-4 bg-cyan-500 text-black font-bold hover:bg-cyan-400"
          >
            <Plus className="mr-2 h-4 w-4" /> Agregar al carrito
          </Button>
        </div>
      </motion.div>
    </Link>
  );
};

const ProductsPage = () => {
  const { categoryName } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState("Todos nuestros productos");

  useEffect(() => {
    setLoading(true);
    const normalizedCategory = categoryName?.toLowerCase();
    setTitle(categoryTitles[normalizedCategory] || "Productos");

    const fetchProducts = async () => {
      try {
        const itemCollection = collection(db, 'items');
        let productQuery;

        if (normalizedCategory && normalizedCategory !== 'todos') {
          // Busca productos con "category" o "categories" (array)
          productQuery = query(itemCollection, where('category', '==', normalizedCategory));
        } else {
          productQuery = query(itemCollection);
        }

        const snapshot = await getDocs(productQuery);
        let productList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        // En caso de tener campo "categories" (array)
        if (normalizedCategory && normalizedCategory !== 'todos') {
          productList = productList.filter(
            (p) =>
              p.category === normalizedCategory ||
              (p.categories && p.categories.includes(normalizedCategory))
          );
        }

        setProducts(productList);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [categoryName]);

  return (
    <div className="bg-background text-foreground">
      <Header />
      <main className="pt-24 sm:pt-32 pb-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl lg:text-5xl font-bold tracking-tight mb-12 text-center"
          >
            {title}
          </motion.h1>
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
              {Array.from({ length: 12 }).map((_, index) => (
                <ProductCardSkeleton key={index} />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
              {products.map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProductsPage;