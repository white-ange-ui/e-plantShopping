import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  // Calcule le montant total pour tous les produits dans le panier
  const calculateTotalAmount = () => {
    // Somme de (prix * quantité) pour chaque article
    const total = cart.reduce((sum, it) => {
      const price = parseFloat(String(it.cost).replace(/[^0-9.-]+/g, '')) || 0;
      const qty = Number(it.quantity) || 0;
      return sum + price * qty;
    }, 0);
    return total.toFixed(2);
  };

  const handleContinueShopping = (e) => {
    e.preventDefault();
    if (typeof onContinueShopping === 'function') onContinueShopping();
  };



  const handleIncrement = (item) => {
    const qty = Number(item.quantity) || 0;
    dispatch(updateQuantity({ name: item.name, quantity: qty + 1 }));
  };

  const handleDecrement = (item) => {
    const qty = Number(item.quantity) || 0;
    if (qty > 1) {
      dispatch(updateQuantity({ name: item.name, quantity: qty - 1 }));
    } else {
      // Si la quantité passe à 0, supprime l'article
      dispatch(removeItem(item.name));
    }
  };

  const handleRemove = (item) => {
    dispatch(removeItem(item.name));
  };

  const handleCheckoutShopping = (e) => {
    e.preventDefault();
    alert('Functionality to be added for future reference');
  };

  // Calculate total cost based on quantity for an item
  const calculateTotalCost = (item) => {
    const price = parseFloat(String(item.cost).replace(/[^0-9.-]+/g, '')) || 0;
    const qty = Number(item.quantity) || 0;
  return (price * qty).toFixed(2);
  };

  return (
    <div className="cart-container">
      <h2 style={{ color: 'black' }}>Total Cart Amount: ${calculateTotalAmount()}</h2>
      <div>
        {cart.map(item => (
          <div className="cart-item" key={item.name}>
            <img className="cart-item-image" src={item.image} alt={item.name} />
            <div className="cart-item-details">
              <div className="cart-item-name">{item.name}</div>
              <div className="cart-item-cost">{item.cost}</div>
              <div className="cart-item-quantity">
                <button className="cart-item-button cart-item-button-dec" onClick={() => handleDecrement(item)}>-</button>
                <span className="cart-item-quantity-value">{item.quantity}</span>
                <button className="cart-item-button cart-item-button-inc" onClick={() => handleIncrement(item)}>+</button>
              </div>
              <div className="cart-item-total">Total: ${calculateTotalCost(item)}</div>
              <button className="cart-item-delete" onClick={() => handleRemove(item)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: '20px', color: 'black' }} className='total_cart_amount'></div>
      <div className="continue_shopping_btn">
        <button className="get-started-button" onClick={(e) => handleContinueShopping(e)}>Continue Shopping</button>
        <br />
        <button className="get-started-button1" onClick={(e) => handleCheckoutShopping(e)}>Checkout</button>
      </div>
    </div>
  );
};

export default CartItem;


