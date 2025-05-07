import { create } from "zustand";
import { persist } from "zustand/middleware";
import { GpSurgery } from "../contact/page";

export interface Data {
  postcode: string;
  fullAddress: AddressDataSession;
  symptoms: string;
  duration: number | null;
  experiencedSymptomsBefore: string;
  previousSymptomsDetails: string;
  additionalInfo: string;
  additionalInfoToggle: string;
  forenames: string;
  surname: string;
  dateOfBirth: string | Date | undefined;
  sex: string;
  gpSurgery: GpSurgery;
  mobileNumber: string;
  email: string;
  remoteExemption: boolean;
}

export interface FormStore {
  formData: Data;
  updateForm: (values: Partial<Data>) => void;
  resetForm: () => void;
}

export interface FileStore {
  files: File[];
  fileToggle: boolean;
  setFiles: (fileData: File[]) => void;
  removeFile: (index: number) => void;
}

const initialData = {
  postcode: "",
  fullAddress: {} as AddressDataSession,
  symptoms: "",
  duration: null,
  experiencedSymptomsBefore: "",
  previousSymptomsDetails: "",
  additionalInfo: "",
  additionalInfoToggle: "",
  forenames: "",
  surname: "",
  dateOfBirth: undefined,
  sex: "",
  gpSurgery: {} as GpSurgery,
  mobileNumber: "",
  email: "",
  remoteExemption: false,
};

export const useFormStore = create<FormStore>()(
  persist(
    (set) => ({
      formData: initialData,
      updateForm: (values) =>
        set((state) => ({
          formData: { ...state.formData, ...values },
        })),
      resetForm: () =>
        set(() => ({
          formData: initialData,
        })),
    }),
    {
      name: "form",
    }
  )
);

export const useFileStore = create<FileStore>()(
  persist(
    (set) => ({
      files: [],
      fileToggle: false,
      setFiles: (newFiles) => set(() => ({ files: newFiles })),
      removeFile: (index) =>
        set((state) => ({
          files: state.files.filter((_, i) => i !== index),
        })),
    }),
    {
      name: "files",
    }
  )
);

export interface AddressData {
  DPA: {
    UPRN: string;
    UDPRN: string;
    ADDRESS: string;
    BUILDING_NUMBER: string;
    THOROUGHFARE_NAME: string;
    POST_TOWN: string;
    POSTCODE: string;
    RPC: string;
    X_COORDINATE: number;
    Y_COORDINATE: number;
    STATUS: string;
    LOGICAL_STATUS_CODE: string;
    CLASSIFICATION_CODE: string;
    CLASSIFICATION_CODE_DESCRIPTION: string;
    LOCAL_CUSTODIAN_CODE: 9051;
    LOCAL_CUSTODIAN_CODE_DESCRIPTION: string;
    COUNTRY_CODE: string;
    COUNTRY_CODE_DESCRIPTION: string;
    POSTAL_ADDRESS_CODE: string;
    POSTAL_ADDRESS_CODE_DESCRIPTION: string;
    BLPU_STATE_CODE: string;
    BLPU_STATE_CODE_DESCRIPTION: string;
    TOPOGRAPHY_LAYER_TOID: string;
    WARD_CODE: string;
    LAST_UPDATE_DATE: string;
    ENTRY_DATE: string;
    BLPU_STATE_DATE: string;
    LANGUAGE: string;
    MATCH: number;
    MATCH_DESCRIPTION: string;
    DELIVERY_POINT_SUFFIX: string;
  };
}

export interface AddressDataSession {
  UPRN: string;
  UDPRN: string;
  ADDRESS: string;
  BUILDING_NUMBER: string;
  THOROUGHFARE_NAME: string;
  POST_TOWN: string;
  POSTCODE: string;
  RPC: string;
  X_COORDINATE: number;
  Y_COORDINATE: number;
  STATUS: string;
  LOGICAL_STATUS_CODE: string;
  CLASSIFICATION_CODE: string;
  CLASSIFICATION_CODE_DESCRIPTION: string;
  LOCAL_CUSTODIAN_CODE: 9051;
  LOCAL_CUSTODIAN_CODE_DESCRIPTION: string;
  COUNTRY_CODE: string;
  COUNTRY_CODE_DESCRIPTION: string;
  POSTAL_ADDRESS_CODE: string;
  POSTAL_ADDRESS_CODE_DESCRIPTION: string;
  BLPU_STATE_CODE: string;
  BLPU_STATE_CODE_DESCRIPTION: string;
  TOPOGRAPHY_LAYER_TOID: string;
  WARD_CODE: string;
  LAST_UPDATE_DATE: string;
  ENTRY_DATE: string;
  BLPU_STATE_DATE: string;
  LANGUAGE: string;
  MATCH: number;
  MATCH_DESCRIPTION: string;
  DELIVERY_POINT_SUFFIX: string;
}
