import { getProduct } from "../api";
import { parseRequestUrl, rerender } from "../utils";
import {getCartItems, setCartItems} from '../localStorage';

const addToCart = (item, forceUpdate = false) => {
    let cartItems = getCartItems();
    const existItem = cartItems.find((cart) => cart.product === item.product );
   if(existItem){
     if(forceUpdate){
      cartItems = cartItems.map((crt) => crt.product === existItem.product ? item : crt );
     }
   }else{
     cartItems = [...cartItems, item];
   }
   setCartItems(cartItems);

   if(forceUpdate){
     rerender(cartScreen);
   }
};

const removeFromCart = (id) => {
  setCartItems(getCartItems().filter((itm) => itm.product !== id));
  if(id === parseRequestUrl().id){
    document.location.hash = '/cart';
  }else{
    rerender(cartScreen);
  }
}
const cartScreen = {
// event handler function
event_handler: () => {
  const qtySelects = document.getElementsByClassName('qty-select');
  Array.from(qtySelects).forEach((qtySelect) => {
    qtySelect.addEventListener('change', (e) => {
      const item = getCartItems().find(itm => itm.product === qtySelect.id);
      addToCart({...item,qty:Number(e.target.value)},true)
    })
  })

  const deleteBtns = document.getElementsByClassName('del-Btn');
  Array.from(deleteBtns).forEach((delBtn) => {
    delBtn.addEventListener('click', () => {
      console.log('delete...')
      removeFromCart(delBtn.id);
    })
  })
 document.getElementById('checkout-Btn').addEventListener('click', () => {
   document.location.hash = '/signin';
 })
},
// render function
render: async () => {
const request = parseRequestUrl();
if(request.id){
  const product = await getProduct(request.id);
  addToCart({
      product: product._id,
      name:product.name,
      image:product.image,
      price:product.price,
      countInStock:product.countInStock,
      qty:1
  })
}

const cartItems = getCartItems();

return `
  <div class="content cart">
    <div class="cart-list">
      <ul class="cart-list-container">
        <li>
          <h3>Shopping Cart</h3>
          <div>Price<div>
        </li>
        ${
          cartItems.length === 0 ? 
          '<div>Cart is empty. <a href="/#/">Go Shopping</a></div>' :
          cartItems.map( item => `
            <li>
             <div class="cart-image">
                <img src="${item.image}" alt="${item.name}">
              </div>
              <div class="cart-name">
              <div>
                 <a href=/#/product/${item.product}">
                   ${item.name}
                 </a>
              </div>
               <div>
                  Qty: <select class="qty-select" id="${item.product}">
                  ${[...Array(item.countInStock).keys()].map(itm => item.qty === itm+1 
                    ? `<option selected value="${itm+1}">${itm+1}</option>` 
                    : `<option value="${itm+1}">${itm+1}</option>`
                     )
                  }
                  </select>
                  <button type="button" class="del-Btn" id="${item.product}">
                    Delete
                  </button>
              </div>
              </div>
              <div class="cart-price">
              $${item.price}
              </div>
           </li>
          `).join('\n')
        }
      </ul>
    </div>
    <div class="cart-action">
       <h3>
         Subtotal (${cartItems.reduce((a,c) => a + c.qty,0 )}items): $${cartItems.reduce((a,c) => a + c.price * c.qty,0)}
       </h3>
       <button id="checkout-Btn" class="primary fw">
         Proceed to Checkout
       </button>
    </div>
  </div>
` 
}
}

export default cartScreen;