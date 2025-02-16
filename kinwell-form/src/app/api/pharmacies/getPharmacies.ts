import { pharmaPalInstance } from "../lib/pharma-bal-backend.instance";

export const getPharmacies = async () => {
  try {
    return (await pharmaPalInstance("/pharmacy")).data;
  } catch (error) {
    return [];
  }
};
