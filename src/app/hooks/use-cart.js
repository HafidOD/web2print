import { toast } from "react-hot-toast";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
// import { getDictionary } from "@/utils/dictionary";

const useCart = create(
  persist(
    (set, get) => ({
      items: [],
      addItem: (data) => {
        const currentItems = get().items;
        const existingItem = currentItems.find((item) => item.id === data.id);
        // console.log(data);
        // console.log(currentItems);
        // console.log(typeof existingItem.quantity);
        // console.log(typeof existingItem.quantity);
        if (existingItem) {
          existingItem.quantity =
            parseInt(existingItem.quantity) + parseInt(data.quantity);
          // existingItem.quantity = existingItem.quantity + data.quantity;
          set(get().items.find((item) => item.id === existingItem.id));
          return toast.success("Item added");
          // return toast("This product is already in your cart", {
          //   icon: "⚠️",
          // });
        }

        set({ items: [...get().items, data] });
        toast.success("Item added");
      },

      updateItem: (id, quantity) => {
        // console.log(id, quantity);
        const currentItems = get().items;

        // console.log(currentItems);
        const newItems = currentItems.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: quantity };
          }
          return item;
        });

        // console.log(newItems);
        set({ items: newItems });
        // console.log(get().items);
      },

      removeItem: (id) => {
        set({ items: [...get().items.filter((item) => item.id !== id)] });
        toast.success("Item eliminated");
      },

      removeAll: () => set({ items: [] }),
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useCart;
