import { create } from "zustand";

const useCartStore = create((set) => ({
    // State Cart
    products: null,
    setProducts: (data) => set({ products: data }),
    clearProducts: () => set({ products: null }),

    // State untuk cart_ids menuju payment agar bisa difilter
    cartIds: [],
    setCartIds: (ids) => set({ cartIds: ids }),
    clearCartIds: () => set({ cartIds: [] }),
}));

export default useCartStore;
