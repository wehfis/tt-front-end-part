import { useState, useEffect } from 'react';
import axios from 'axios';
import { productURL } from '../endpoints';
import { ProductDTO } from '../DTOs/ProductDTO';
import { useProducts } from '../ProductsContext';

interface AddToReceiptProps {
  addToReceipt: (productToAdd: ProductDTO) => void;
}

const ProductList = ({ addToReceipt } : AddToReceiptProps ) => {
  const [products, setProducts] = useState<ProductDTO[]>([]);
  const { prodsInRes } = useProducts();

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
            <button
            className={prodsInRes.some((p) => p.product_id === product.id) ? 'button-disabled' : ''}
            onClick={() => addToReceipt(product)}
            disabled={prodsInRes.some((p) => p.product_id === product.id)}
            >
              {prodsInRes.find(p => p.product_id === product.id) ? 'In Check' : 'Add to Check'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;