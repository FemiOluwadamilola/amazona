import axios from 'axios';
import Rating from '../components/Rating';
import { apiUrl } from '../config';
import { hideLoading, showLoading } from '../utils';


const url = `${apiUrl}/api/products`;

const HomeScreen = {
  render: async () => {
    showLoading();
    const res = await axios({
      url,
      headers: {
        'Content-Type': 'application/json',
      },
    });
    hideLoading();
    if (!res || res.statusText !== 'OK') {
      return '<div>Oops cant get data</div>';
    }

    const products = res.data;

    return `
     <ul id="products">
       ${products.map(
    (prt) => `
      <li>
        <div class="product">
          <a href="/#/product/${prt._id}">
              <img src="${prt.image}" alt="${prt.name}">
          </a>
          <div class="product-name">
              <a href="/#/product/${prt._id}">
                  ${prt.name}
              </a>
          </div>
          <div class="product-rating">
            ${Rating.render({
              value:prt.rating,
              text:`${prt.numReviews} reviews`
            })}
          </div>
          <div class="product-brand">
              ${prt.brand}
          </div>
          <div class="product-price">
              $${prt.price}
          </div>
      </div>
      </li>
    `,
  ).join('\n')}
</ul>
`;
  },
};

export default HomeScreen;
