import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { productURL, receiptURL, productsInReceiptURL } from './endpoints';
import { ProductDTO } from './DTOs/ProductDTO';
import { ReceiptDTO } from './DTOs/ReceiptDTO';
import ProductList from './components/ProductList'
import Receipt from './components/Receipt';
import { useProducts } from './ProductsContext';

const App = () => {
  const { products, addProduct, removeProduct, setProducts } = useProducts();
  // const [Receipts, setReceipts] = useState<ReceiptDTO[]>([]);
  // const [Products, setProducts] = useState<ProductDTO[]>([]);
  const [currProd, setCurrProd] = useState<ProductDTO | null>(null);

  // const handleAdd = (productToAdd: ProductDTO) => {
  //   if (!Products.some(product => product.id === productToAdd.id)) {
  //     setProducts(prevProducts => [...prevProducts, productToAdd]);
  //   }
  // }


  return (
    <div className="App">
        <ProductList addToReceipt={addProduct}/>
        <Receipt prodsInRes={products} key={products.length}/>
    </div>
  );
}

export default App;