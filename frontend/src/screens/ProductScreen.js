import { hideLoading, parseRequestUrl, showLoading } from "../utils";
import { getProduct } from "../api";
import Rating from '../components/Rating';

const ProductScreen = {
    event_handler: () => {
      const request = parseRequestUrl();
      document.getElementById('cartBtn').addEventListener('click', () => {
         document.location.hash = `/cart/${request.id}`;
      })
    },
    render: async () => {
      const request = parseRequestUrl();
      showLoading();
      const product = await getProduct(request.id);

      if(product.error){
        return `<h2>Oops Product Not Found!!!</h2>`
      }
     hideLoading();
      return `
       <div class="content">
         <a href="/#/">« Back to Home</a>
       </div>

       <div class="productDetails">
       <div class="productImg">
          <img src="${product.image}">
       </div>
       <div class="productInfo">
          <ul>
            <li>
              <h3>${product.name}</h3>
            </li>
            <li>
              ${Rating.render({
                 value:product.rating,
                 text:`${product.numReviews} reviews`
               })}
            </li>
            <li>
              Price:<strong>$${product.price}</strong>
            </li>
            <li>
              Description:
              <div>
                 ${product.description}
              </div>
            </li>
          </ul>
       </div>
       <div class="product-detail-action">
          <ul>
            <li>
              Price:<strong>$${product.price}</strong>
            </li>
            <li>
              Status:${product.countInStock > 0 ?
               `<span class="success">In Stock</span>`:
               `<span class="error">Unavailable</span>`
              }
            </li>
            <li>
              <button id="cartBtn" class="primary fw">Add to cart!</button>
            </li>
          <ul>
       </div>
    <div>
     `;
    }
}

export default ProductScreen;