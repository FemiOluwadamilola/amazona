import Rating from '../components/Rating.js';
const productDetailsScreen = (props) => {
    return `
        <div class="productDetails">
           <div class="productImg">
              <img src="${props.image}">
           </div>
           <div class="productInfo">
              <ul>
                <li>
                  <h3>${props.name}</h3>
                </li>
                <li>
                  ${Rating.render({
                     value:props.rating,
                     text:`${props.numReviews} reviews`
                   })}
                </li>
                <li>
                  Price:<strong>$${props.price}</strong>
                </li>
                <li>
                  Description:
                  <div>
                     ${props.description}
                  </div>
                </li>
              </ul>
           </div>
           <div class="product-detail-action">
              <ul>
                <li>
                  Price:<strong>$${props.price}</strong>
                </li>
                <li>
                  Status:${props.countInStock > 0 ?
                   `<span class="success">In Stock</span>`:
                   `<span class="error">Unavailable</span>`
                  }
                </li>
                <li>
                  <button id="addBtn" onclick="${props.event}" class="primary fw">Add to cart!</button>
                </li>
              <ul>
           </div>
        <div>
    `
}

export default productDetailsScreen;