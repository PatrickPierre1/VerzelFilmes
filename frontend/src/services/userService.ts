import api from "../lib/api";

export const getShareToken = async (): Promise<string> => {
    try {
        const response = await api.post<{ shareToken: string }>(
            "/user/share-token"
        );
        return response.data.shareToken;
    } catch (error: any) {
        if (
            error.response &&
            error.response.data &&
            error.response.data.message
        ) {
            throw new Error(error.response.data.message);
        }
        throw new Error("Falha ao obter o token de compartilhamento.");
    }
};
