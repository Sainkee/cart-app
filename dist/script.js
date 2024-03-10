let products = document.querySelector(".productList");
let carts = document.querySelector(".cartList");
let total = document.querySelector(".total");

let arr = [
  {
    id: 1,
    price: 100,
    quantity: 0,
  },
  {
    id: 2,
    price: 200,
    quantity: 0,
  },
  {
    id: 3,
    price: 300,
    quantity: 0,
  },
];
window.onload = function (params) {
  displayCart();
  displayList();
  priceCalculator();
};

function displayList(params) {
  products.innerHTML = "";

  arr.forEach((element) => {
    products.innerHTML += `
        <div
        "  class="flex bg-slate-500 justify-between px-2 py-2 gap-4 productItem"
          >
            <span class="">Product-${element.id}</span>
            <span>${element.price}</span>
            <span  class="bg-teal-800 rounded-[34px] px-2 gap-4 flex cursor-pointer ">
              <span id="${element.id}"class="minus">-</span>
              <span class="num">${element.quantity}</span>
              <span id="${element.id}" class="plus">+</span>
            </span>
          </div>
        
    `;
  });
}

function displayCart(params) {
  carts.innerHTML = "";
  let filterdata = arr.filter((ele) => ele.quantity > 0);
  if (filterdata.length == 0) {
    carts.innerHTML = ` <div
    class="flex bg-slate-500 justify-between px-2 py-2 gap-4 productItem min-w-[200px] ">
        <span class="text-red-500">No Product added to the cart</span>
  </div>
  `;
  }

  filterdata.forEach((element) => {
    carts.innerHTML += `
    <div
    class="flex bg-slate-500 justify-between px-2 py-2 gap-4 productItem min-w-[200px] "
  >
    <span class="">Product-${element.id}</span>

    <span  class="bg-teal-800 rounded-[34px] px-2 gap-2 flex">
      <span>${element.quantity}</span>
      <span class="count">x</span>
      <span class="count">${element.price}</span>
    </span>
  </div>
        
    `;
  });
}

function priceCalculator() {
  let calculation = arr.reduce((sum, ele) => {
    return sum + ele.price * ele.quantity;
  }, 0);
  total.innerText = calculation.toString();
  return;
}

products.addEventListener("click", (e) => {
  if (e.target.classList.contains("minus")) {
    console.log();
    const quantityElement = e.target.parentElement.querySelector(".num");
    if (Number(quantityElement.innerText) <= 0) {
      return;
    }

    arr[e.target.id - 1].quantity -= 1;
    quantityElement.innerText = Number(quantityElement.innerText) - 1;
  }
  if (e.target.classList.contains("plus")) {
    const quantityElement = e.target.parentElement.querySelector(".num");
    quantityElement.innerText = Number(quantityElement.innerText) + 1;
    arr[e.target.id - 1].quantity += 1;
  }

  displayCart();
  priceCalculator();
});
