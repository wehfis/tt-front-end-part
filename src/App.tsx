import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { receiptURL } from './endpoints';
import { ReceiptDTO } from './DTOs/ReceiptDTO';
import ProductList from './components/ProductList'
import Receipt from './components/Receipt';
import { useProducts } from './ProductsContext';

const App = () => {
  const { receiptId, prodsInRes, products, setReceiptId, addProduct } = useProducts();
  const [newReceipt, setNewReceipt] = useState<ReceiptDTO | null>(null);
  

  useEffect(() => {
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
  }, []);


  return (
    <div className="App" key={receiptId}>
       {newReceipt && 
        <>
          <ProductList addToReceipt={addProduct} />
          <Receipt prodsInRes={prodsInRes} key={products.length}/>
        </>
      }
    </div>
  );
}

export default App;