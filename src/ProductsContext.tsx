import React, { createContext, useContext, useState, ReactNode } from 'react';
import { ProductDTO } from './DTOs/ProductDTO';

interface ProductsContextType {
  products: ProductDTO[];
  totalPrice: number;
  setTotalPrice: (priceToSet: number) => void;
  addProduct: (productToAdd: ProductDTO) => void;
  removeProduct: (productToRemove: ProductDTO) => void;
  setProducts: (productsToSet: ProductDTO[]) => void;
}

const ProductsContext = createContext<ProductsContextType | undefined>(undefined);

export const useProducts = (): ProductsContextType => {
  const context = useContext(ProductsContext);
  if (!context) {
    throw new Error('useProducts must be used within a ProductsProvider');
  }
  return context;
};

interface ProductsProviderProps {
  children: ReactNode;
}

export const ProductsProvider: React.FC<ProductsProviderProps> = ({ children }) => {
  const [products, setProducts_] = useState<ProductDTO[]>([]);
  const [totalPrice, setTotalPrice_] = useState<number>(0);

  const addProduct = (productToAdd: ProductDTO) => {
    if (!products.some(product => product.id === productToAdd.id)) {
        setProducts_(prevProducts => [...prevProducts, productToAdd]);
      }
      setTotalPrice_(totalPrice + productToAdd.price);
  };

  const removeProduct = (productToRemove: ProductDTO) => {
    if (products) {
        const prodsInRes = products.filter(prod => prod.id !== productToRemove.id);
        setProducts_(prodsInRes);
      }
  };

  const setProducts =(productsToSet: ProductDTO[])=>{
    setProducts_(productsToSet);
  }

  const setTotalPrice =(priceToSet: number)=>{
    setTotalPrice_(priceToSet);
  }

  return (
    <ProductsContext.Provider value={{ products, totalPrice, setTotalPrice, addProduct, removeProduct, setProducts }}>
      {children}
    </ProductsContext.Provider>
  );
};
