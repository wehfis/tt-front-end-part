import React, { createContext, useContext, useState, ReactNode } from 'react';
import { ProductDTO } from './DTOs/ProductDTO';
import { ReceiptDTO } from './DTOs/ReceiptDTO';
import { ProdInResDTO } from './DTOs/ProdInResDTO';
import axios from 'axios';
import { productsInReceiptURL, receiptURL } from './endpoints';

interface ProductsContextType {
  receiptId: string;
  products: ProductDTO[];
  prodsInRes: ProdInResDTO[];
  totalPrice: number;
  setReceiptId: (idToSet: string) => void;
  setTotalPrice: (priceToSet: number) => void;
  addProduct: (productToAdd: ProductDTO) => void;
  removeProduct: (productToRemove: ProdInResDTO) => void;
  incrementProdInRes: (receiptItem: ProdInResDTO) => void;
  decrementProdInRes: (receiptItem: ProdInResDTO) => void;
  setProducts: (productsToSet: ProductDTO[]) => void;
  setProdsInRes: (prodsInResToSet: ProdInResDTO[]) => void;
  cleanReceipt: () => void;
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
  const [prodsInRes, setProdsInRes_] = useState<ProdInResDTO[]>([]);
  const [prodInRes, setProdInRes_] = useState<ProdInResDTO>();
  const [totalPrice, setTotalPrice_] = useState<number>(0);
  const [receiptId, setReceiptId_] = useState<string>('');
  const [newReceipt, setNewReceipt] = useState<ReceiptDTO | null>(null);


  const addProduct = (productToAdd: ProductDTO) => {
    if (!products.some(product => product.id === productToAdd.id)) {
        setProducts_(prevProducts => [...prevProducts, productToAdd]);
        const newProdInRes: ProdInResDTO = {
          quantity: 1,
          price: productToAdd.price,
          product_id: productToAdd.id,
          receipt_id: receiptId
        };
        axios.post(`${productsInReceiptURL}/${newProdInRes.receipt_id}/addProdInRes/${newProdInRes.product_id}`, newProdInRes)
          .then((response) => {
            setProdInRes_(newProdInRes);
            setProdsInRes_(prevProdsInRes => [...prevProdsInRes, newProdInRes])
          })
          .catch((error) => {
            console.log("Error adding ProdInRes:", error);
          });
          setTotalPrice_(totalPrice + productToAdd.price);
      }
  };

  const removeProduct = (productToRemove: ProdInResDTO) => {
    if (products) {
      axios.delete(`${productsInReceiptURL}/${productToRemove.receipt_id}/removeProdInRes/${productToRemove.product_id}`)
      .then(() => {
        const prods = products.filter(prod => prod.id !== productToRemove.product_id);
        setProducts_(prods);
        const prodsInRes_ = prodsInRes.filter(prod => prod.product_id !== productToRemove.product_id);
        setProdsInRes_(prodsInRes_);
      })
      .catch((error) => {
        console.log("Error deleting product:", error);
      });
    }
  };

  const incrementProdInRes = (receiptItem: ProdInResDTO) => {
    const current_prod = products.find(prod => prod.id === receiptItem.product_id);
    if (current_prod){
      const updatedProdInRes: ProdInResDTO = {
        quantity: receiptItem.quantity + 1,
        price: current_prod.price * (receiptItem.quantity + 1),
        product_id: receiptItem.product_id,
        receipt_id: receiptItem.receipt_id
      };
      axios
      .put(`${productsInReceiptURL}/${receiptItem?.receipt_id}/updateProdInRes/${receiptItem?.product_id}`, updatedProdInRes)
      .then((response) => {
        const prodsInRes_ = prodsInRes.map(prod => prod == receiptItem ? updatedProdInRes : prod);
        setProdsInRes_(prodsInRes_);
      })
      .catch((error) => {
        console.log("Error updating ProdInRes:", error);
      });
    }
  }
  const decrementProdInRes = (receiptItem: ProdInResDTO) => {
    const current_prod = products.find(prod => prod.id === receiptItem.product_id);
    if (current_prod && receiptItem.quantity > 1){
      const updatedProdInRes: ProdInResDTO = {
        quantity: receiptItem.quantity - 1,
        price: current_prod.price * (receiptItem.quantity - 1),
        product_id: receiptItem.product_id,
        receipt_id: receiptItem.receipt_id
      };
      axios
      .put(`${productsInReceiptURL}/${receiptItem?.receipt_id}/updateProdInRes/${receiptItem?.product_id}`, updatedProdInRes)
      .then((response) => {
        const prodsInRes_ = prodsInRes.map(prod => prod == receiptItem ? updatedProdInRes : prod);
        setProdsInRes_(prodsInRes_);
      })
      .catch((error) => {
        console.log("Error updating ProdInRes:", error);
      });
    }
  }

  const cleanReceipt = () => {
    const emptyReceipt: ReceiptDTO = {
      total: 0,
      closed: true
    };
    axios.post(`${receiptURL}/`, emptyReceipt)
      .then((response) => {
        const createdReceipt: ReceiptDTO = response.data;
        setNewReceipt(createdReceipt);
        if(createdReceipt.id){
          setReceiptId(createdReceipt.id)
        }
      })
      .catch((error) => {
        console.log("Error adding Receipt:", error);
      });
  }

  const setProducts = (productsToSet: ProductDTO[])=>{
    setProducts_(productsToSet);
  }

  const setProdsInRes =( prodsInResToSet: ProdInResDTO[] | undefined)=>{
    if (prodsInResToSet){
      setProdsInRes_(prodsInResToSet);
    }
  }

  const setTotalPrice =(priceToSet: number)=>{
    setTotalPrice_(priceToSet);
  }

  const setReceiptId =(idToSet: string)=>{
    setReceiptId_(idToSet);
  }

  return (
    <ProductsContext.Provider value={{ receiptId, prodsInRes, products, totalPrice, setReceiptId, setTotalPrice, addProduct, removeProduct, setProducts, setProdsInRes, incrementProdInRes, decrementProdInRes, cleanReceipt}}>
      {children}
    </ProductsContext.Provider>
  );
};
