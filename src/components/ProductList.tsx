import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { productURL } from '../endpoints';
import { ProductDTO } from '../DTOs/ProductDTO';
import { useProducts } from '../ProductsContext';

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
    <div>
      <h2>Доступні Товари</h2>
      <ul>
        {products.map(product => (
          <li key={product.id}>
            {product.name} - ${product.price}
            <button onClick={() => addToReceipt(product)}>Додати в Корзину</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;