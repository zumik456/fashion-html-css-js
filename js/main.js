const navList = document.querySelector(".nav-list");
const closeBtn = document.querySelector(".close");
const hamburger = document.querySelector(".hamburger");

hamburger.addEventListener("click", () => {
  navList.classList.add("show");
});
closeBtn.addEventListener("click", () => {
  navList.classList.remove("show");
});

// ---------------------------------------------------------------

const getProducts = async () => {
  try {
    const results = await fetch("./data/products.json");
    const data = await results.json();
    const products = data.products;
    return products;
  } catch (err) {
    console.log(err);
  }
};

const productsWrapper = document.getElementById("products");

window.addEventListener("DOMContentLoaded", async function () {
  let products = await getProducts();
  products = products.filter((product) => product.category === "Dresses");
  displayProductItems(products);
  loadData();
});

function displayProductItems(items) {
  let displayProduct = items.map(
    (item) => `
  <div class="swiper-slide">
  <div class="product">
    <div class="top flex">
      <img src=${item.url} alt="" />
      <div class="icon flex">
        <i class="bx bxs-heart"></i>
      </div>
    </div>
    <div class="bottom">
      <h4>${item.title}</h4>
      <div class="flex">
        <div class="price">$${item.price}</div>
        <div class="rating">
          <i class="bx bxs-star"></i>
          <i class="bx bxs-star"></i>
          <i class="bx bxs-star"></i>
          <i class="bx bxs-star"></i>
          <i class="bx bxs-star"></i>
        </div>
      </div>
    </div>
  </div>
</div>
  `
  );

  displayProduct = displayProduct.join("");
  productsWrapper.innerHTML = displayProduct;
}

const filters = [...document.querySelectorAll(".filters li")];

// console.log(filters);
filters.forEach((filter) => {
  filters[2].classList.add("active");
  filter.addEventListener("click", async (e) => {
    const id = e.target.getAttribute("data-filter");
    const products = await getProducts();
    filters.forEach((btn) => {
      btn.classList.remove("active");
    });
    e.target.classList.add("active");

    let menuCategory = products.filter((product) => {
      if (product.category === id) {
        return product;
      }
    });

    displayProductItems(menuCategory);
    swiper.update();
  });
});

// -----------------------------------------------------------
const categoriesProducts = document.querySelector(".categories .products");
const loadmore = document.querySelector(".loadmore");

let currentIndex = 0;
async function loadData() {
  let maxResult = 8;
  let products = await getProducts();
  if (currentIndex >= products.length) {
    loadmore.disabled = true;
    loadmore.innerText = "No More Products";
    return;
  }

  for (var i = 0; i < maxResult; i++) {
    const product = products[i + currentIndex];
    categoriesProducts.insertAdjacentHTML(
      "beforeend",
      `<div class="product">
          <div class="top flex">
            <img src=${product.url} alt="" />
            <div class="icon flex">
              <i class="bx bxs-heart"></i>
            </div>
          </div>
          <div class="bottom">
            <div class="flex">
              <h4>${product.title}</h4>
              <a href="" class="btn cart-btn">Add to Cart</a>
            </div>
            <div class="flex">
              <div class="price">$${product.price}</div>
              <div class="rating">
                <i class="bx bxs-star"></i>
                <i class="bx bxs-star"></i>
                <i class="bx bxs-star"></i>
                <i class="bx bxs-star"></i>
                <i class="bx bxs-star"></i>
              </div>
            </div>
          </div>
        </div>`
    );
  }

  currentIndex += maxResult;
}

loadmore.addEventListener("click", loadData);
