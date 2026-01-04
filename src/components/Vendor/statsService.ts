import api from "../../api/axios";
import type { VendorStats } from "../../types";


export const getVendorStats = async (): Promise<VendorStats> => {
  const { data } = await api.get("/stats/vendor");
  return data;
};
