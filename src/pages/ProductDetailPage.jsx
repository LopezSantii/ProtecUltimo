import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Plus, Minus, Check, ChevronRight } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useCart } from "@/context/CartContext";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

// 🟦 Skeleton de carga
const ProductDetailSkeleton = () => (
  <div className="container mx-auto px-4 py-12 animate-pulse">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
      <div className="aspect-square bg-muted rounded-xl"></div>
      <div className="space-y-4">
        <div className="h-10 bg-muted rounded w-3/4"></div>
        <div className="h-6 bg-muted rounded w-1/4"></div>
        <div className="h-20 bg-muted rounded w-full"></div>
      </div>
    </div>
  </div>
);

const ProductDetailPage = () => {
  const { productId } = useParams();
  const { toast } = useToast();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState(null);

  // 🚀 Scroll al inicio cuando cambia el producto
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [productId]);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const docRef = doc(db, "items", productId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = { id: docSnap.id, ...docSnap.data() };
          setProduct(data);
          if (data.color && Object.keys(data.color).length > 0) {
            const [name, hex] = Object.entries(data.color)[0];
            setSelectedColor({ name, hex });
          }
        }
      } catch (error) { console.error("Error:", error); }
      finally { setLoading(false); }
    };
    fetchProduct();
  }, [productId]);

  const handleAddToCart = () => {
    if (!product) return;
    addToCart({ ...product, quantity, ...(selectedColor && { selectedColor: selectedColor.name }) });
    toast({ 
        title: "✅ Producto agregado", 
        description: `${product.title} (${quantity} un.) al carrito.`, 
        className: "bg-green-600 text-white" 
    });
  };

  return (
    <div className="bg-background text-foreground min-h-screen">
      <Header />
      
      {/* 🧭 BREADCRUMB: Navegación jerárquica */}
      <div className="container mx-auto px-4 pt-24 pb-4">
        <nav className="flex items-center text-sm text-muted-foreground overflow-x-auto whitespace-nowrap">
          <Link to="/" className="hover:text-cyan-400 transition-colors">Inicio</Link>
          <ChevronRight className="w-4 h-4 mx-2 text-muted-foreground/50" />
          
          <Link to="/category/Todos" className="hover:text-cyan-400 transition-colors">Productos</Link>
          <ChevronRight className="w-4 h-4 mx-2 text-muted-foreground/50" />
          
          {/* Categoría Dinámica */}
          {product?.category ? (
            <>
              <Link to={`/category/${product.category}`} className="hover:text-cyan-400 transition-colors capitalize">
                {product.category}
              </Link>
              <ChevronRight className="w-4 h-4 mx-2 text-muted-foreground/50" />
            </>
          ) : null}
          
          <span className="font-semibold text-foreground truncate">
            {product ? product.title : "Cargando..."}
          </span>
        </nav>
      </div>

      <main className="pb-20">
        {loading ? <ProductDetailSkeleton /> : product ? (
          <div className="container mx-auto px-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="aspect-square rounded-xl overflow-hidden bg-muted">
                <img src={product.img?.imgCard || "https://images.unsplash.com/photo-1505308088817-f1e3cb2a2f63"} alt={product.title} className="w-full h-full object-cover" />
              </div>
              <div>
                <h1 className="text-4xl font-bold mb-2">{product.title}</h1>
                <p className="text-lg text-muted-foreground mb-6">{product.marca}</p>
                <p className="mb-8 leading-relaxed text-foreground/80">{product.description}</p>
                
                {product.color && (
                    <div className="mb-8">
                        <p className="text-sm mb-2">Color: <span className="font-bold">{selectedColor?.name}</span></p>
                        <div className="flex gap-2">
                            {Object.entries(product.color).map(([name, hex]) => (
                                <button key={name} onClick={() => setSelectedColor({name, hex})} className={`w-8 h-8 rounded border-2 ${selectedColor?.name === name ? "border-cyan-400" : "border-border"}`} style={{ backgroundColor: hex }} />
                            ))}
                        </div>
                    </div>
                )}

                <div className="flex items-center gap-4">
                  <div className="flex items-center border border-border rounded-full p-1">
                    <Button variant="ghost" size="icon" onClick={() => setQuantity(Math.max(1, quantity - 1))}><Minus className="h-4 w-4" /></Button>
                    <span className="w-12 text-center font-bold text-lg">{quantity}</span>
                    <Button variant="ghost" size="icon" onClick={() => setQuantity(quantity + 1)}><Plus className="h-4 w-4" /></Button>
                  </div>
                  <Button onClick={handleAddToCart} size="lg" className="flex-grow bg-cyan-500 text-black font-bold hover:bg-cyan-400">
                    Agregar al carrito
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        ) : (
          <div className="text-center py-20"><h2>Producto no encontrado</h2></div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default ProductDetailPage;