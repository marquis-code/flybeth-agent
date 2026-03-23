import { GATEWAY_ENDPOINT_WITH_AUTH } from "../axios.config";

export const uploadApiFactory = {
  uploadImage(payload: FormData) {
    return GATEWAY_ENDPOINT_WITH_AUTH.post("/upload/image", payload, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
  uploadDocument(payload: FormData) {
    return GATEWAY_ENDPOINT_WITH_AUTH.post("/upload/document", payload, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
};
