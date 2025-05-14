import { create } from "zustand";
import { axiosInstance } from "../lib/axios.ts";
import toast from "react-hot-toast";


interface Product {
  id: number;
  name: string;
  product_id: number;
  description: string;
  price: number;
  stock_quantity: number;
};



interface AuthState {
  authUser: any; 
  isSigningUp: boolean;
  isLoggingIn: boolean;
  isCheckingAuth: boolean;
  totalCartPrice: number;
  currProduct: Product | null;
  currCustomer: object | null;
  currOrder: object | null;
  cart: Product[] ;
  tab: string;
  setTab: (data: string) => void;
  setTotalCartPrice: (price: number) => void;
  setCart: (data: Product | Product[]) => void;
  setCurrProduct: (data: object) => void;
  setCurrCustomer: (data: object) => void;
  setCurrOrder: (data: object) => void;
  checkAuth: () => Promise<void>;
  login: (data: any) => Promise<void>;
  signup: (data: any) => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isCheckingAuth: true,
  currProduct: null,
  totalCartPrice: 0,
  cart: [],
  checkAuth: async () => {
    try {
      set({isCheckingAuth: true});
      const res = await axiosInstance("/auth/check");
      set({ authUser: res.data });
      
    } catch (e) {
      set({ authUser: null });
    } finally{
      set({isCheckingAuth: false})
    }
  },
  setCurrProduct: (data: any) => {
    set({ currProduct: data });
  },
  setTotalCartPrice(price) {
    set({ totalCartPrice: price });
  },
  currCustomer: null,
  setCurrCustomer: (data: any) => {
    set({ currCustomer: data });
  },
  currOrder: null,
  setCurrOrder: (data: any) => {
    set({ currCustomer: data });
  },

  setCart: (data: Product | Product[]) => {
    if (Array.isArray(data)) {
      set({ cart: data });
    } else {
      const currentCart = get().cart;
      set({ cart: [...currentCart, data] });
    }
  },
  tab: "products",
  setTab: (tab: string) => {
    set({ tab: tab });
  },
 
  signup: async (data: any) => {
    set({ isSigningUp: true });
    try {
      const res = await axiosInstance.post("/auth/signup", data);
      set({ authUser: res.data });
      toast.success("Account created successfully");
    } catch (error: any) {
      toast.error(error.response.data.message);
    } finally {
      set({ isSigningUp: false });
    }
  },

  login: async (data: any) => {
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post("/auth/login", data);
      set({ authUser: res.data });
      toast.success("Logged in successfully");
    } catch (error: any) {
      toast.error(error.response.data.message);
    } finally {
      set({ isLoggingIn: false });
    }
  },

  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      set({ authUser: null });
      toast.success("Logged out successfully");
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  },
}));
