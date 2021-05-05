import { getUserInfo } from "../localStorage";

const Header = {
    event_handler:() => {
      
    },
    render:() => {
      const {name} = getUserInfo();
      return `
        <div class="brand">
        <a href="/">Amazona</a>
        </div>

        <div class="menu">
        ${name ? 
        `<a href="#/profile">${name}</a>`
        : `<a href="#/signin">Sign-In</a>`}
        <a href="#/cart">Cart</a>
        </div>
      `
    }
};

export default Header;