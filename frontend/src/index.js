import HomeScreen from "./screens/HomeScreen.js";
import ProductScreen from "./screens/ProductScreen.js";
import cartScreen from "./screens/cartScreen";
import { hideLoading, parseRequestUrl, showLoading } from "./utils.js";
import Error404Screen from "./screens/Error404Screen.js"
import SigninScreen from "./screens/SigninScreen.js";
import Header from "./components/Header.js";
import RegisterScreen from "./screens/RegisterScreen.js";
import ProfileScreen from "./screens/profileScreen.js";

const routes = {
    '/': HomeScreen,
    '/product/:id':ProductScreen,
    '/cart/:id':cartScreen,
    '/cart':cartScreen,
    '/signin':SigninScreen,
    '/register':RegisterScreen,
    '/profile':ProfileScreen
}

const router = async () => {
  showLoading();
  const req = parseRequestUrl();
  const parseUrl = (req.resource ? `/${req.resource}`: '/') + (req.id ? '/:id' : '') + (req.verb ? `/${req.verb}` : '');
  const screen = routes[parseUrl] ? routes[parseUrl] : Error404Screen;
  const header = document.getElementById('header-container');
  header.innerHTML = await Header.render()
  await Header.event_handler();
  const main = document.getElementById('main-container');
  main.innerHTML = await screen.render()
  if(screen.event_handler) await screen.event_handler();
  hideLoading();
};

window.addEventListener('load', router);
window.addEventListener('hashchange',router);