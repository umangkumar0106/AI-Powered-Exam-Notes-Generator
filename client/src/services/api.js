import axios from "axios";
import { serverUrl } from "../config.js";
import { setUserData } from "../redux/userSlice.js";

const api = axios.create({
  baseURL: serverUrl,
  withCredentials: true,
});

export const getCurrentUser = async (dispatch) => {
  try {
    const result = await api.get("/api/user/currentuser");
    dispatch(setUserData(result.data));
  } catch (error) {
    // Silently handle 401/400 - user is not authenticated yet
    if (error?.response?.status === 401 || error?.response?.status === 400) {
      return;
    }
    console.error("Error fetching current user:", error?.response?.data || error.message);
  }
};

export const generateNotes = async (payload) => {
  try {
    const result = await api.post("/api/notes/generate-notes", payload);
    return result.data;
  } catch (error) {
    console.error("Error generating notes:", error?.response?.data || error.message);
    throw error;
  }
};

export const downloadPdf = async (result) => {
  try {
    const response = await api.post("/api/pdf/generate-pdf", { result }, {
      responseType: "blob",
    });

    const blob = new Blob([response.data], {
      type: "application/pdf",
    });

    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "ExamNotesAI.pdf";
    link.click();
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error("PDF download failed:", error?.response?.data || error.message);
    throw new Error("PDF download failed");
  }
};
