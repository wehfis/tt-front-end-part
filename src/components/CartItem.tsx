import React, { useEffect, useState } from 'react';
import { ProductDTO } from '../DTOs/ProductDTO';
import { ReceiptDTO } from '../DTOs/ReceiptDTO';
import Receipt from './Receipt';

interface CartItemProps {
  prodsInRes: ProductDTO[] | null;
}

const CartItem = ({ prodsInRes } : CartItemProps ) => {

  const [total, setTotal] = useState<number>(0);
  const [filteredProdsInRes, setFilteredProdsInRes] = useState<ProductDTO[] | null>(prodsInRes);


  useEffect(() => {
    
  }, [prodsInRes, filteredProdsInRes]);

  const handlePay = () => {

  }

  const handleCloseRes = (product : ProductDTO) => {
    if (filteredProdsInRes) {
      prodsInRes = filteredProdsInRes.filter(prod => prod.id !== product.id);
      setFilteredProdsInRes(prodsInRes);
    }
  }

  return (
    <div>
      {prodsInRes  && prodsInRes.map((product) => (
        <Receipt key={product.id} receiptItems={product} removeReceipt={handleCloseRes}/>
        ))}
        <h1>Total: {total}</h1>
        <button onClick={handlePay}>PAY</button>
    </div>
  );
};

export default CartItem;