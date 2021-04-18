import Menu from '../menu/menu';
import Burger from '../burger/burger';

const firstElement = document.querySelector('.js-header');
class Header {
  constructor(root = firstElement) {
    this.root = root;
    this.menuObject = new Menu(this.root.querySelector('.js-menu'));
    this.burgerObject = new Burger({ area: this.root, menuSelector: '.js-menu', activeClass: 'menu_expanded' });
  }
}

export default Header;
