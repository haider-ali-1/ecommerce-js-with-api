import { qs } from "./utils.js";
import {
  addProduct,
  deleteProduct,
  getProduct,
  getProducts,
  updateProduct,
} from "./api.js";

const productsEl = qs(".products");

productsEl.innerHTML = "<h1>Loading....</h1>";

const data = await getProducts();
let products = data;

function RenderProducts() {
  console.log(products);
  productsEl.innerHTML = "";
  for (const p of products) {
    const getStarsFromRating = () => {
      // rating = 4.7
      const fullStars = Math.floor(p.rating?.rate); // 4
      const hasHalfStar = p.rating?.rate % 1 >= 0.5; // true
      const emptyStars = 5 - fullStars + (hasHalfStar ? -1 : 0); // 5 - 4 + 1

      let stars = "";
      for (let i = 1; i <= fullStars; i++) {
        stars += `<i class="fa-solid fa-star" style="color: #FFD43B;"></i>`;
      }

      if (hasHalfStar) {
        stars += `<i class="fa-solid fa-star-half-alt" style="color: #FFD43B;"></i>`;
      }

      for (let i = 1; i <= emptyStars; i++) {
        stars += `<i class="far fa-star" style="color: #ccc;"></i>`;
      }

      return stars;
    };

    const product = `<div class="product" data-id=${p.id}>
                          <div class="img-wrapper"><img src=${p.image} alt=${p.title} /></div>
                          <p class="name">${p.title}</p>
                          <div class="rating">
                            <div>${getStarsFromRating()}</div>
                            <p>(${p.rating?.rate})</p>
                            <span>${p.rating?.count}</span>
                          </div>
                          <span class="price">$${p.price}</span>
                          </a>
                          <div class="controls">
                            <button data-action="edit" data-id=${p.id}>Edit</button>  
                            <button data-action="delete" data-id=${p.id}>Delete</button>  
                          </div>
                      </div>`;
    productsEl.innerHTML += product;
  }
}

RenderProducts();

productsEl.addEventListener("click", async (e) => {
  const action = e.target.dataset.action;
  const id = +e.target.dataset.id;

  if (action === "edit") {
    console.log("product edit");
    openEditModal(id);
  }

  if (action === "delete") {
    const userResponseYes = confirm(
      "Are you sure you want to delete this product"
    );
    if (!userResponseYes) return;

    // delete product using api
    const isUserDelApiData = id >= 0 && id <= 19;
    if (isUserDelApiData) {
      const res = await deleteProduct(id);
    }

    const foundItemIndex = products.findIndex((p) => p.id === id);
    products.splice(foundItemIndex, 1);
    RenderProducts();
  }
});

const editForm = qs(".edit-product-modal form");

const loader = qs(".loader");

async function openEditModal(productId) {
  toggleOverlay();
  loader.style.display = "block";
  let product = await getProduct(productId);
  if (!product) {
    product = products.find((p) => p.id === productId);
  }
  toggleEditForm();
  loader.style.display = "none";

  editForm["id"].value = product.id;
  editForm["title"].value = product.title;
  editForm["description"].value = product.description;
  editForm["price"].value = product.price;
  editForm["category"].value = product.category;
  editForm["image"].value = product.image;
}

editForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const formData = new FormData(editForm);
  const { id, ...updatedData } = Object.fromEntries(formData.entries());
  console.log(updatedData);

  const res = await updateProduct(id, updatedData);
  res.price = +res.price;
  console.log(res);

  products = products.map((p) => {
    return p.id === res.id ? { ...p, ...res } : p;
  });

  RenderProducts();
  toggleEdit();
});

function toggleEdit() {
  const overlayEl = qs(".overlay");
  const editModalEl = qs(".edit-product-modal");

  overlayEl.classList.toggle("active");
  editModalEl.classList.toggle("active");
}

function toggleOverlay() {
  const overlay = qs(".overlay");
  overlay.classList.toggle("active");
}

function toggleEditForm() {
  const editModalEl = qs(".edit-product-modal");
  editModalEl.classList.toggle("active");
}

const cancelEditBtn = qs(".edit-product-modal button[data-action='cancel']");
const overlay = qs(".overlay");

[cancelEditBtn, overlay].forEach((el) => {
  el.addEventListener("click", () => {
    editForm.reset();
    toggleEdit();
  });
});

// Add Product
const addProductForm = qs(".add-product form");
addProductForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(addProductForm);
  const product = Object.fromEntries(formData.entries());
  product.id = parseInt(product.id);
  product.price = parseFloat(product.price);
  product.rating = { rate: 0, count: 0 };

  addProduct(product);

  products.unshift(product);
  RenderProducts();
  loadUniqueId();
});
function loadUniqueId() {
  const idInput = qs(".add-product .p-id");
  function nextId() {
    const ids = products.map((p) => p.id);
    const maxId = Math.max(...ids);
    return maxId + 1;
  }
  idInput.value = nextId();
}
loadUniqueId();
