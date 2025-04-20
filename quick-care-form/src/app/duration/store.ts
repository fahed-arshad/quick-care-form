import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface DurationData {
  duration: number | null;
}

interface FormStore {
  formData: DurationData;
  updateForm: (values: Partial<DurationData>) => void;
}

export const useDurationStore = create<FormStore>()(
  persist(
    (set) => ({
      formData: {
        duration: null,
      },
      updateForm: (values) =>
        set((state) => ({
          formData: { ...state.formData, ...values },
        })),
    }),
    {
      name: "duration",
    }
  )
);
