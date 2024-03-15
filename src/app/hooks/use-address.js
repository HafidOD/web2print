import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

const useAddress = create(
  persist(
    (set, get) => ({
      address: {},
      addAddress: (address) => {
        set({ address });
      },

      removeAddress: () => set({ address: {} }),
    }),
    {
      name: "address-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useAddress;
