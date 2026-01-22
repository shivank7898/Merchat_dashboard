import { create } from "zustand";
import { merchants as initialMerchants } from "../configs/merchants";
import type { Merchant } from "../configs/merchants";

interface MerchantStore {
    merchants: Merchant[];
    addMerchant: (merchant: Merchant) => void;
    updateMerchant: (id: string, updates: Partial<Merchant>) => void;
    deleteMerchant: (id: string) => void;
    getMerchantById: (id: string) => Merchant | undefined;
}

export const useMerchantStore = create<MerchantStore>((set, get) => ({
    merchants: initialMerchants,

    addMerchant: (merchant) => {
        set((state) => ({
            merchants: [...state.merchants, merchant],
        }));
    },

    updateMerchant: (id, updates) => {
        const merchants = get().merchants;
        const merchantIndex = merchants.findIndex((merchant) => merchant.id === id);

        if (merchantIndex === -1) return;

        const updatedMerchants = [...merchants];
        updatedMerchants[merchantIndex] = {
            ...updatedMerchants[merchantIndex],
            ...updates,
        };

        set({ merchants: updatedMerchants });
    },

    deleteMerchant: (id) => {
        set((state) => ({
            merchants: state.merchants.filter((merchant) => merchant.id !== id),
        }));
    },

    getMerchantById: (id) => {
        return get().merchants.find((merchant) => merchant.id === id);
    },
}));

