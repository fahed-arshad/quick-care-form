import { pharmaPalInstance } from "../lib/pharma-bal-backend.instance";

export const getGpSurgeries = async () => {
  try {
    return (
      await pharmaPalInstance("/surgery", {
        headers: {
          "x-api-key": process.env.QUICK_CARE_API_KEY,
        },
      })
    ).data;
  } catch (error) {
    return [];
  }
};
