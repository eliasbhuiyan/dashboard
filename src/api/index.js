import axios from "axios";

const api = axios.create({
  baseURL: `http://localhost:8000/api/v1`,
  headers: {
    "Content-Type": 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem("token");
    if (token) {
      config.headers.Authorization = token;
    }
    return config;
  },
  (err) => {
    console.log("from api token",err);
    return Promise.reject(err);
  }
);

export const authServices = {
  registration: async (userData) => {
    const res = await api.post("/auth/registration", userData);
    return res.data;
  },
  verifyOtp: async (email, otp) => {
    const res = await api.post("/auth/verifyemail", { email, otp });
    return res.data;
  },
  loginUser: async (userData) => {
    const res = await api.post("/auth/login", userData);
    if (res.data.accessToken) {
      sessionStorage.setItem("token", res.data.accessToken);
      localStorage.setItem("loggedUser", JSON.stringify(res.data.user));
    }
    return res.data;
  },
  updateUser: async (fullName, password, avatar) =>{
    const res = await api.post("/auth/update", {fullName, password, avatar},{
      headers: {
       "Content-Type": "multipart/form-data",
      },
    })
    return res.data;
  }
};

export const categorySercice = {
    createCategory: async (data)=>{
      const res = await api.post("/product/createcategory", data,{
        headers: {
         "Content-Type": "multipart/form-data",
       },
      });
      return res.data;
    },
    categoryList: async ()=>{
      const res = await api.get("/product/categories")
      return res.data;
    }
}

export const productServices = {
  createProduct: async (data)=>{
    const res = await api.post("/product/create", data,{
        headers: {
         "Content-Type": "multipart/form-data",
       },
      });
    return res.data;
  },
  getAllProducts: async ()=>{
    const res = await api.get("/product/productlist");
    return res.data;
  },
  productDetails: async (slug)=>{
    const res = await api.get(`/product/details/${slug}`);
    return res.data;
  },
  createOrder: async (item)=>{
    const res = await api.post(`/order/create`, {items: item});
    return res.data;
  }
}