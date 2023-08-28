import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { productURL, receiptURL, productsInReceiptURL } from './endpoints';
import { ProductDTO } from './DTOs/ProductDTO';
import { ReceiptDTO } from './DTOs/ReceiptDTO';
import ProductList from './components/ProductList'
import CartItem from './components/CartItem';

const App = () => {
  const [Receipts, setReceipts] = useState<ReceiptDTO[]>([]);
  const [Products, setProducts] = useState<ProductDTO[]>([]);
  const [isProdSelected, setIsProdSelected] = useState<boolean>(false);
  const [currProd, setCurrProd] = useState<ProductDTO | null>(null);

  const handleAdd = (productToAdd: ProductDTO) => {
    setIsProdSelected(true);
    setProducts(prevProducts => [...prevProducts, productToAdd]);
  }

  return (
    <div className="App">
        <ProductList addToReceipt={handleAdd}/>
        {isProdSelected &&
        <CartItem prodsInRes={Products} />
        }
    </div>
  );
}

export default App;