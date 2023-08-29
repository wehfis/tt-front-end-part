import { ProdInResDTO } from '../DTOs/ProdInResDTO';
import { useProducts } from '../ProductsContext';

interface CartItemProps {
  receiptItem: ProdInResDTO | null;
  removeReceipt: (receipt : ProdInResDTO) => void;
}

const CartItem = ({ receiptItem, removeReceipt } : CartItemProps) => {
  const { products, incrementProdInRes, decrementProdInRes } = useProducts();
  const currentProdDTO = products.find(prod => prod.id === receiptItem?.product_id); 

  const handleIncrement = () => {
    if (receiptItem !== null) {
      incrementProdInRes(receiptItem);
    }
  }

  const handleDecrement = () => {
    if (receiptItem !== null) {
      decrementProdInRes(receiptItem);
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
          <h2>Product "{currentProdDTO?.name}"</h2>
          <div className='quantity-block'>
          <button className='quantity-button' onClick={handleDecrement}> - </button>
          <p><b>{receiptItem.quantity}</b></p>
          <button className='quantity-button' onClick={handleIncrement}> + </button>
          <p>Price <b>{receiptItem.price}$</b></p>
          <button className='remove-button' onClick={handleClose}>Remove</button>
          </div>
        </div>
        }
    </div>
  );
};

export default CartItem;