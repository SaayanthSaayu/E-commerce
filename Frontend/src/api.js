import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:1212",
})

const handleAuthResponce = (response) => {
    const token = response.data.token;
    if (token) {
        localStorage.setItem("jwtToken", token);
        API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        return response.data;

    } else {
        throw new Error('No token received from the server.');
    }
}

export const registerUser =  async (userData) => {
    try {
        const response = await API.post('/user/register', userData);
        return response.data ;
    } catch (err) {
        console.log(err)
    }
}

export const loginUser = async (userData) => {
  try {
    const response = await API.post("/user/login", userData);
    const data = handleAuthResponce(response);
    return {
      ...data,
      role: response.data.role,
      username: response.data.username,
      userId: response.data.userId,
    };
  } catch (err) {
    console.error("API loginUser error:", err); // Log the error to the console.
    throw err; // Propagate the error to the Login component.
  }
};


export const setAuthToken = () => {
  const token = localStorage.getItem("jwtToken");
  if (token) {
    API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }
};

setAuthToken();




// Admin routes 

export const addProduct = async (formData) => {
  try{
    const response = await API.post("/admin/add-product", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data ;
  }catch(er) {
    console.error("API addProduct error:", er);
    throw er;
  }
}


export const getPendingproduct = async () => {
  try{
    const response = await API.get('/admin/pending-product');
    return response.data ;
  }catch(er) {
    console.error("API getPendingproduct error:", er);
    throw er;
  }
}

export const approveProduct = async (id) => {
  try{
    const response = await API.put(`/admin/products/${id}/approve`, {});
    return response.data ;
  }catch(er) {
    console.error("API approveProduct error:", er);
    throw er;
  }
}

export const rejectProduct = async (id) => {
  try{
    const response = await API.put(`/admin/products/${id}/reject`, {});
    return response.data ;
  }catch(er) {
    console.error("API rejectProduct error:", er);
    throw er;
  }
}

export const getUserList = async () => {
  try{
    const response = await API.get('/admin/user-list');
    return response.data ;
  }catch (er) {
    console.error("API getUserList error:", er);
    throw er;
  }
}

export const getClientList = async () => {
  try {
    const response = await API.get("/admin/client-list");
    return response.data;
  } catch (error) {
    console.error("API getClientList error:", error);
    throw error;
  }
};

export const getClientProducts = async (clientId) => {
  try {
    const response = await API.get(`/admin/client-products/${clientId}`);
    return response.data;
  } catch (error) {
    console.error("API getClientProducts error:", error);
    throw error;
  }
};


export const fetchUsersWithOrders = async () => {
  try {
    const response = await API.get("/admin/users-orders");
    return response.data;
  } catch (error) {
    console.error("Error fetching users and orders:", error);
    return [];
  }
};




// client routes


export const addClientProduct = async (formData) => {
  try {
    const response = await API.post("/client/product-upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("API addClientProduct error:", error);
    throw error;
  }
};

export const clientProducts = async () => {
  try {
    const response = await API.get("/client/products");
    return response.data;
  } catch (error) {
    console.error("API getClientProducts error:", error);
    throw error;
  }
};

export const getPendingProducts = async () => {
  try {
    const response = await API.get("/client/product/pending");
    return response.data;
  } catch (error) {
    console.error("API getPendingProducts error:", error);
    throw error;
  }
};

export const getApprovedProducts = async () => {
  try {
    const response = await API.get("/client/product/approved");
    return response.data;
  } catch (error) {
    console.error("API getApprovedProducts error:", error);
    throw error;
  }
};

export const getRejectedProducts = async () => {
  try {
    const response = await API.get("/client/product/rejected");
    return response.data;
  } catch (error) {
    console.error("API getRejectedProducts error:", error);
    throw error;
  }
};


//product routes 


export const getAllProducts = async () => {
  try {
    const response = await API.get("/products");
    return response.data;
  } catch (error) {
    console.error("API getAllProducts error:", error);
    throw error;
  }
};

export const getProductById = async (productId) => {
  try {
    const response = await API.get(`/products/${productId}`);
    return response.data;
  } catch (error) {
    console.error("API getProductById error:", error);
    throw error;
  }
};


//order routes

export const getUserOrders = async () => {
  try {
    const response = await API.get("/orders");
    return response.data;
  } catch (error) {
    console.error("API getUserOrders error:", error);
    throw error;
  }
};


export const placeOrder = async (orderData) => {
  try {
    const response = await API.post("/orders", orderData);
    return response.data;
  } catch (error) {
    console.error("API placeOrder error:", error);
    throw error;
  }
};