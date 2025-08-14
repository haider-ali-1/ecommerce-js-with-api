const API_URL = `https://fakestoreapi.com`;
const getProducts = async () => {
  const res = await axios.get(`${API_URL}/products`);
  return await res.data;
};

const addProduct = async (product) => {
  const res = await axios.post(`${API_URL}/products`, product);
  return await res.data;
};

const getProduct = async (id) => {
  const res = await axios.get(`${API_URL}/products/${id}`);
  return await res.data;
};

const updateProduct = async (id, updatedData) => {
  const res = await axios.put(`${API_URL}/products/${id}`, updatedData);
  return await res.data;
};

const deleteProduct = async (id) => {
  const res = await axios.delete(`${API_URL}/products/${id}`);
  return await res.data;
};

export { getProducts, getProduct, updateProduct, deleteProduct, addProduct };
