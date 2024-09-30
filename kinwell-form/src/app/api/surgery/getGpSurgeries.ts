import { pharmaPalInstance } from "../lib/pharma-bal-backend.instance";

export const getGpSurgeries = async () => {
  try {
    return (await pharmaPalInstance("/surgery")).data;
  } catch (error) {
    return [];
  }
};
