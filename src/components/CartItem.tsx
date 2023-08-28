import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ProductDTO } from '../DTOs/ProductDTO';
import { ProdInResDTO } from '../DTOs/ProdInResDTO';
import { receiptURL } from '../endpoints';

interface CartItemProps {
  receiptItem: ProductDTO | null;
  removeReceipt: (receipt : ProductDTO) => void;
}

const CartItem = ({ receiptItem, removeReceipt } : CartItemProps) => {
  const [quantity, setQuantity] = useState<number>(1);
  const [price, setPrice] = useState<number | null>(receiptItem ? receiptItem.price : null);
  const [total, setTotal] = useState<number>(0);

  const handleIncrement = () => {
    setQuantity(quantity + 1);
    
    if (receiptItem !== null) {
      setPrice(receiptItem.price * (quantity + 1));
    }
  }

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
      if (receiptItem !== null) {
        setPrice(receiptItem.price * (quantity - 1));      
      }
    }
    
  }

  const handleClose = () => {
    if (receiptItem !== null) {
      removeReceipt(receiptItem);
    }
  }

  return (
    <div>
      {receiptItem &&
        <div>
          <h2>Receipt for "{receiptItem.name}"</h2>
          <button onClick={handleDecrement}> - </button>
          <button onClick={handleIncrement}> + </button>
          <p>Quantity <b>{quantity}</b></p>
          <p>Price <b>{price}$</b></p>
          <button onClick={handleClose}>Вилучити з чеку</button>
        </div>
        }
    </div>
  );
};

export default CartItem;