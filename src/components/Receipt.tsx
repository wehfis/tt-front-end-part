import { useEffect } from 'react';
import { receiptURL } from '../endpoints';
import { ProductDTO } from '../DTOs/ProductDTO';
import { ReceiptDTO } from '../DTOs/ReceiptDTO';
import { ProdInResDTO } from '../DTOs/ProdInResDTO';
import CartItem from './CartItem';
import { useProducts } from '../ProductsContext';
import axios from 'axios';

interface ReceiptProps {
  prodsInRes: ProdInResDTO[] | null;
}
const Receipt = ({ prodsInRes} : ReceiptProps ) => {
  const { receiptId, totalPrice, setTotalPrice, setProdsInRes, removeProduct, cleanReceipt, setProducts, setReceiptId} = useProducts();

  useEffect(() => {
    const sum = prodsInRes?.reduce((total, prod) => {
      return total + prod.price;
    }, 0);
    if (sum){
      setTotalPrice(sum);
    }
    else{
      setTotalPrice(0);
    }
  }, [prodsInRes]);

  const handleDel = () => {
    setProdsInRes([]);
    setProducts([]);
    setTotalPrice(0);
    setReceiptId('');
    cleanReceipt();
  }
  
  const handlePay = () => {
    const updatedReceipt: ReceiptDTO = {
      total: totalPrice,
      closed: false
    };
    axios
      .put(`${receiptURL}/${receiptId}/updateReceipt`, updatedReceipt)
      .then((response) => {
        setProdsInRes([]);
        setProducts([]);
        setTotalPrice(0);
        setReceiptId('');
        cleanReceipt();
      })
      .catch((error) => {
        console.log("Error updating Receipt:", error);
      });
  }

  return (  
    <div className='container'>
      {prodsInRes  && prodsInRes.map((product) => (
        <CartItem key={product.product_id} receiptItem={product} removeReceipt={removeProduct}/>
        ))}
        <h1>Total Price: {totalPrice}$</h1>
        <button className='remove-button' onClick={handleDel}>Delete Check</button>
        <button onClick={handlePay}>Pay</button>
    </div>
  );
};

export default Receipt;