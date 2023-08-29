import { useState, useEffect } from 'react';
import axios from 'axios';
import { productURL } from '../endpoints';
import { ProductDTO } from '../DTOs/ProductDTO';

interface AddToReceiptProps {
  addToReceipt: (productToAdd: ProductDTO) => void;
}

const ProductList = ({ addToReceipt } : AddToReceiptProps ) => {
  const [products, setProducts] = useState<ProductDTO[]>([]);

  useEffect(() => {
    axios.get<ProductDTO[]>(productURL)
      .then((response) => {
        setProducts(response.data);
      });
  }, []);

  return (
    <div className='container'>
      <h2>Available Products</h2>
      <ul>
        {products.map(product => (
          <li key={product.id}>
            {product.name} - ${product.price}
            <button onClick={() => addToReceipt(product)}>Add to Check</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;