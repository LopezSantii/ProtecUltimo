import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Plus, Minus, Check } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useCart } from "@/context/CartContext";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

// 🟦 Skeleton de carga
const ProductDetailSkeleton = () => (
  <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-pulse">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
      <div className="aspect-square bg-muted rounded-xl"></div>
      <div>
        <div className="h-10 bg-muted rounded w-3/4 mb-4"></div>
        <div className="h-6 bg-muted rounded w-1/4 mb-8"></div>
        <div className="h-4 bg-muted rounded w-full mb-2"></div>
        <div className="h-4 bg-muted rounded w-full mb-2"></div>
        <div className="h-4 bg-muted rounded w-5/6 mb-8"></div>
        <div className="h-20 bg-muted rounded w-full mb-8"></div>
        <div className="flex items-center gap-4">
          <div className="h-12 bg-muted rounded w-32"></div>
          <div className="h-12 bg-muted rounded-full flex-grow"></div>
        </div>
      </div>
    </div>
  </div>
);

// 🟩 Selector de color (usa el objeto de la base)
const ColorSelector = ({ colors, selectedColor, setSelectedColor }) => {
  if (!colors || Object.keys(colors).length === 0) return null;

  return (
    <div className="mb-8">
      <p className="text-sm text-muted-foreground mb-2">
        Color:{" "}
        <span className="font-semibold text-foreground">
          {selectedColor?.name || "Seleccione un color"}
        </span>
      </p>
      <div className="flex flex-wrap gap-2">
        {Object.entries(colors).map(([name, hex]) => (
          <button
            key={name}
            onClick={() => setSelectedColor({ name, hex })}
            className={`w-8 h-8 rounded-md border-2 transition-all duration-200 flex items-center justify-center ${selectedColor?.name === name
                ? "border-cyan-400 scale-110"
                : "border-border"
              }`}
            style={{
              backgroundColor: hex,
              borderColor:
                name === "Blanco" && selectedColor?.name !== "Blanco"
                  ? "#d1d5db" // para que el blanco no se pierda
                  : undefined,
            }}
            aria-label={`Seleccionar color ${name}`}
          >
            {selectedColor?.name === name && (
              <Check className="w-5 h-5 text-white mix-blend-difference" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

// 🟨 Página de detalle de producto
const ProductDetailPage = () => {
  const { productId } = useParams();
  const { toast } = useToast();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const docRef = doc(db, "items", productId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const productData = { id: docSnap.id, ...docSnap.data() };
          setProduct(productData);

          // 🔹 Si tiene colores, selecciona el primero automáticamente
          if (
            productData.color &&
            Object.keys(productData.color).length > 0
          ) {
            const [firstName, firstHex] = Object.entries(productData.color)[0];
            setSelectedColor({ name: firstName, hex: firstHex });
          }
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  const handleQuantityChange = (amount) => {
    setQuantity((prev) => Math.max(1, prev + amount));
  };

  const handleAddToCart = () => {
    const productToAdd = {
      ...product,
      quantity,
      ...(selectedColor && { selectedColor: selectedColor.name }),
    };

    addToCart(productToAdd);
    toast({
      title: "✅ ¡Producto agregado!",
      description: `${product.title} (${quantity}x${selectedColor ? " - " + selectedColor.name : ""
        }) ha sido añadido a tu carrito.`,
      className: "bg-green-600/90 border-green-600 text-white",
    });
  };

  return (
    <div className="bg-background text-foreground">
      <Header />
      <main className="pt-24 sm:pt-32 pb-20">
        {loading ? (
          <ProductDetailSkeleton />
        ) : product ? (
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16"
            >
              {/* Imagen */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="aspect-square rounded-xl overflow-hidden"
              >
                <img
                  src={
                    product.img?.imgCard ||
                    "https://images.unsplash.com/photo-1505308088817-f1e3cb2a2f63"
                  }
                  alt={product.title}
                  className="w-full h-full object-cover"
                />
              </motion.div>

              {/* Detalle */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <h1 className="text-3xl lg:text-4xl font-bold tracking-tight mb-2">
                  {product.title}
                </h1>
                <p className="text-lg text-muted-foreground mb-6">
                  {product.marca}
                </p>
                <p className="text-foreground/80 leading-relaxed mb-8">
                  {product.description}
                </p>

                <ColorSelector
                  colors={product.color}
                  selectedColor={selectedColor}
                  setSelectedColor={setSelectedColor}
                />

                {product.caracteristicas && (
                  <div className="mb-8">
                    <h2 className="text-xl font-semibold mb-3">
                      Características
                    </h2>
                    <ul className="list-disc list-inside space-y-1 text-foreground/80">
                      {product.caracteristicas.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="flex flex-col sm:flex-row items-center gap-4">
                  <div className="flex items-center border border-border rounded-full p-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="rounded-full"
                      onClick={() => handleQuantityChange(-1)}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-12 text-center font-bold text-lg">
                      {quantity}
                    </span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="rounded-full"
                      onClick={() => handleQuantityChange(1)}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>

                  <Button
                    onClick={handleAddToCart}
                    size="lg"
                    className="w-full sm:w-auto flex-grow bg-cyan-500 text-black font-bold hover:bg-cyan-400"
                  >
                    <Plus className="mr-2 h-5 w-5" /> Agregar al carrito
                  </Button>
                </div>
              </motion.div>
            </motion.div>
          </div>
        ) : (
          <div className="text-center py-20">
            <h2 className="text-2xl font-bold">Producto no encontrado</h2>
            <p className="text-muted-foreground mt-2">
              El producto que buscas no existe o fue removido.
            </p>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default ProductDetailPage;