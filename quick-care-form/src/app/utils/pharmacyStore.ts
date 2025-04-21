import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface PharmacyStoreData {
  pharmacyId: string;
  pharmacyName: string;
  pharmacyEmail: string;
  token: string | undefined;
}

interface PharmacyStore {
  data: PharmacyStoreData;
  updatePharmacy: (values: Partial<PharmacyStoreData>) => void;
  resetPharmacy: () => void;
}

const initialPharmacyData = {
  pharmacyId: "",
  pharmacyName: "",
  pharmacyEmail: "",
  token: undefined,
};

export const usePharmacyStore = create<PharmacyStore>()(
  persist(
    (set) => ({
      data: initialPharmacyData,
      updatePharmacy: (values) =>
        set((state) => ({
          data: { ...state.data, ...values },
        })),
      resetPharmacy: () =>
        set(() => ({
          data: initialPharmacyData,
        })),
    }),
    {
      name: "pharmacy",
    }
  )
);
