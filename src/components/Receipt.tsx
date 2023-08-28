import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ProductDTO } from '../DTOs/ProductDTO';
import { ReceiptDTO } from '../DTOs/ReceiptDTO';
import { receiptURL } from '../endpoints';

interface ReceiptProps {
  receiptItems: ProductDTO | null;
  removeReceipt: (receipt : ProductDTO) => void;
}

const Receipt = ({ receiptItems, removeReceipt } : ReceiptProps, ) => {
  const [quantity, setQuantity] = useState<number>(1);
  const [price, setPrice] = useState<number | null>(receiptItems ? receiptItems.price : null);
  const [total, setTotal] = useState<number>(0);

  const handleIncrement = () => {
    setQuantity(quantity + 1);
    if (receiptItems !== null) {
      setPrice(receiptItems.price * (quantity + 1));
    }
  }

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
      if (receiptItems !== null) {
        setPrice(receiptItems.price * (quantity - 1));      
      }
    }
    
  }

  const handleClose = () => {
    if (receiptItems !== null) {
      removeReceipt(receiptItems);
    }
  }

  return (
    <div>
      {receiptItems ? (
        <div>
          <h2>Receipt for "{receiptItems.name}"</h2>
          <button onClick={handleDecrement}> - </button>
          <button onClick={handleIncrement}> + </button>
          <p>Quantity <b>{quantity}</b></p>
          <p>Price <b>{price}$</b></p>
          <button onClick={handleClose}>Вилучити з чеку</button>
        </div>
      ) : (
        <p>No receipt items selected.</p>
      )}
    </div>
  );
};

export default Receipt;
