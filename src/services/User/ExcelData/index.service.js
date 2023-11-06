import { ExcelData } from "../../../apiEndPoints";
import APIrequest from "../../axios";

export const ExcelDataService = {
  getExcelData: async (queryParams) => {
    try {
      const payload = {
        ...ExcelData.get,
        queryParams,
      };
      const res = await APIrequest(payload);
      return res;
    } catch (error) {
      throw error;
    }
  },
};
