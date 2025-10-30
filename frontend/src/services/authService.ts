import axios, { AxiosError } from "axios";

interface AuthCredentials {
    name?: string;
    email: string;
    password: string;
}

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL + "/auth" || "http://localhost:3001/api/auth",
});

const handleError = (error: unknown) => {
    if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<{ message: string }>;
        throw new Error(
            axiosError.response?.data?.message ||
                "Ocorreu um erro na requisição."
        );
    }
    throw new Error("Ocorreu um erro inesperado.");
};

export const authService = {
    login: async ({
        email,
        password,
    }: Omit<AuthCredentials, "name">): Promise<any> => {
        try {
            const response = await api.post("/login", { email, password });
            return response.data;
        } catch (error) {
            handleError(error);
        }
    },

    register: async ({
        name,
        email,
        password,
    }: Required<AuthCredentials>): Promise<any> => {
        try {
            const response = await api.post("/register", {
                name,
                email,
                password,
            });
            return response.data;
        } catch (error) {
            handleError(error);
        }
    },

    fetchUserFromToken: async (token: string): Promise<any> => {
        try {
            const response = await api.get("/", {
                headers: {
                    "x-auth-token": token,
                },
            });
            return response.data;
        } catch (error) {
            handleError(error);
        }
    },
};
