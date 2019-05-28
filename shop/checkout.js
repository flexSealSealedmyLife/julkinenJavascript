const cartItems = document.querySelector(".cart-items");
const cartTotal = document.querySelector(".cart-total");
const basketItems = document.querySelector(".basketContent");
const clearCartBtn = document.querySelector(".clear-cart");

let cart = [];

let buttonsDOM = [];

$(document).ready(function() {
  const ui = new UI();
  //ui.setCartValues(Storage.getCart());
  ui.setupAPP();
  ui.cartLogic();
});

class Storage {
  static saveProducts(products) {
    localStorage.setItem("products", JSON.stringify(products));
  }
  static getProduct(id) {
    let products = JSON.parse(localStorage.getItem("products"));
    return products.find(product => product.id === id);
  }
  static saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
  }
  static getCart() {
    return localStorage.getItem("cart")
      ? JSON.parse(localStorage.getItem("cart"))
      : [];
  }
}

class UI {
  setCartValues(cart) {
    let tempTotal = 0;
    let itemsTotal = 0;

    cart.map(item => {
      tempTotal += item.price * item.amount;
      itemsTotal += item.amount;
    });
    cartTotal.innerText = parseFloat(tempTotal.toFixed(2));
    cartItems.innerText = itemsTotal;
  }

  populateCart(cart) {
    cart.forEach(item => this.addCartItem(item));
  }

  getBagButtons() {
    const buttons = [...document.querySelectorAll(".bag-btn")];
    buttonsDOM = buttons;
    buttons.forEach(button => {
      let id = button.dataset.id;
      let inCart = cart.find(item => item.id === id);
      if (inCart) {
        button.innerText = "In Cart";
        button.disabled = true;
      } else {
        button.addEventListener("click", event => {
          event.target.innerText = "In Cart";
          event.target.disabled = true;

          let cartItem = { ...Storage.getProduct(id), amount: 1 };

          cart = [...cart, cartItem];

          Storage.saveCart(cart);

          this.setCartValues(cart);

          this.addCartItem(cartItem);

          this.showCart();
        });
      }
    });
  }

  addCartItem(item) {
    const div = document.createElement("div");
    div.classList.add("basketItem");
    div.innerHTML = `<img src=${item.image} id="imgBasket" alt="product" />
            <div>
              <h4>${item.title}</h4>
              <h5>€${item.price}</h5>
              <span class="remove-item" data-id=${item.id}>Remove</span>
            </div>
            <div>
              <i class="fas fa-chevron-up" data-id=${item.id}></i>
              <p class="item-amount">${item.amount}</p>
              <i class="fas fa-chevron-down" data-id=${item.id}></i>
            </div>`;
    basketItems.appendChild(div);
  }

  clearCart() {
    let cartItems = cart.map(item => item.id);
    cartItems.forEach(id => this.removeItem(id));
    while (basketItems.children.length > 0) {
      basketItems.removeChild(basketItems.children[0]);
    }
  }

  removeItem(id) {
    cart = cart.filter(item => item.id !== id);
    this.setCartValues(cart);
    Storage.saveCart(cart);
    // let button = this.getSingleButton(id);
    //console.log(button);
    //button.disabled = false;
    //button.innerHTML = `<i class="fas fa-shopping-cart"></i>add to cart`;
  }

  getSingleButton(id) {
    console.log("juu");
    return buttonsDOM.find(button => button.dataset.id === id);
  }

  setupAPP() {
    cart = Storage.getCart();
    this.setCartValues(cart);
    this.populateCart(cart);
    //cartBtn.addEventListener("click", this.showCart);
    //closeCartBtn.addEventListener("click", this.hideCart);
    //overlayClick.addEventListener('click', this.hideCart);
  }

  cartLogic() {
    clearCartBtn.addEventListener("click", () => {
      console.log("ajettiin");
      this.clearCart();
    });

    basketItems.addEventListener("click", event => {
      if (event.target.classList.contains("remove-item")) {
        let removeItem = event.target;
        let id = removeItem.dataset.id;
        basketItems.removeChild(removeItem.parentElement.parentElement);
        this.removeItem(id);
      } else if (event.target.classList.contains("fa-chevron-up")) {
        let increase = event.target;
        let id = increase.dataset.id;
        let tempItem = cart.find(item => item.id === id);
        tempItem.amount = tempItem.amount + 1;
        Storage.saveCart(cart);
        this.setCartValues(cart);
        increase.nextElementSibling.innerText = tempItem.amount;
      } else if (event.target.classList.contains("fa-chevron-down")) {
        let lower = event.target;
        let id = lower.dataset.id;
        let tempItem = cart.find(item => item.id === id);
        tempItem.amount = tempItem.amount - 1;
        if (tempItem.amount > 0) {
          Storage.saveCart(cart);
          this.setCartValues(cart);
          lower.previousElementSibling.innerText = tempItem.amount;
        } else {
          basketItems.removeChild(lower.parentElement.parentElement);
          this.removeItem(id);
        }
        Storage.saveCart(cart);
        this.setCartValues(cart);
      }
    });
  }
}

console.log(Storage.getCart());
