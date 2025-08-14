const qs = (selector) => {
  const el = document.querySelector(selector);
  if (!el) throw new Error(`missing element ${selector}`);
  return el;
};

const createEl = (el) => {
  return document.createElement(el);
};

const getUsers = () => {
  const value = localStorage.getItem("users");
  return value ? JSON.parse(value) : [];
};

const getCart = () => {
  const value = localStorage.getItem("cart");
  return value ? JSON.parse(value) : [];
};

const getProducts = () => {
  const value = localStorage.getItem("products");
  return value ? JSON.parse(value) : [];
};

const getOrder = () => {
  const value = localStorage.getItem("orders");
  return value ? JSON.parse(value) : [];
};

const getValue = (key) => {
  return JSON.parse(localStorage.getItem(key) || "");
};

const setValue = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

const storage = {
  get(key, fallback) {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : fallback;
    } catch (_) {
      return fallback;
    }
  },

  set(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  },

  remove(key) {
    localStorage.removeItem(key);
  },
};

export {
  qs,
  createEl,
  getUsers,
  setValue,
  getValue,
  getCart,
  getProducts,
  getOrder,
  storage,
};
