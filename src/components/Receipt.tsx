import React, { useEffect, useState } from 'react';
import { ProductDTO } from '../DTOs/ProductDTO';
import { ReceiptDTO } from '../DTOs/ReceiptDTO';
import CartItem from './CartItem';
import { useProducts } from '../ProductsContext';

interface ReceiptProps {
  prodsInRes: ProductDTO[] | null;
}

const Receipt = ({ prodsInRes } : ReceiptProps ) => {
  const { products, totalPrice, addProduct, removeProduct, setProducts } = useProducts();

  useEffect(() => {
    
  }, [prodsInRes, products]);

  const handlePay = () => {

  }

  return (  
    <div>
      {prodsInRes  && prodsInRes.map((product) => (
        <CartItem key={product.id} receiptItem={product} removeReceipt={removeProduct}/>
        ))}
        <h1>Загальна сума: {totalPrice}</h1>
        <button onClick={handlePay}>Сплатити</button>
    </div>
  );
};

export default Receipt;