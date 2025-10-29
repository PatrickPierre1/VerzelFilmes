import { useState } from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog";
import { authService } from "../services/authService";

interface AuthModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onAuthSuccess: () => void;
}

const AuthModal = ({ open, onOpenChange, onAuthSuccess }: AuthModalProps) => {
    const [isLogin, setIsLogin] = useState(true);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            let authResult;
            if (isLogin) {
                authResult = await authService.login({ email, password } as any);
            } else {
                authResult = await authService.register({ name, email, password });
            }

            if (authResult && authResult.token) {
                const { token } = authResult;

                localStorage.setItem("authToken", token);

                const user = await authService.fetchUserFromToken(token);

                localStorage.setItem("user", JSON.stringify(user));

                onAuthSuccess();

                onOpenChange(false);
                setEmail("");
                setName("");
                setPassword("");
            }
        } catch (error: any) {
            console.error("Erro de autenticação:", error.message);
            setError(error.message || "Ocorreu um erro durante a autenticação.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle className="text-2xl">
                        {isLogin ? "Entrar" : "Criar Conta"}
                    </DialogTitle>
                    <DialogDescription>
                        {isLogin
                            ? "Entre com sua conta para gerenciar seus favoritos"
                            : "Crie uma conta para salvar seus filmes favoritos"}
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {error && <p className="text-red-500 text-sm">{error}</p>} {/* Exibe a mensagem de erro */}
                    {!isLogin && (
                        <div className="space-y-2">
                            <Label htmlFor="name">Nome</Label>
                            <Input
                                id="name"
                                type="text"
                                placeholder="Seu nome"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                                disabled={loading}
                            />
                        </div>
                    )}
                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="seu@email.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            disabled={loading}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="password">Senha</Label>
                        <Input
                            id="password"
                            type="password"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            disabled={loading}
                            minLength={6}
                        />
                    </div>

                    <Button type="submit" className="w-full" disabled={loading}>
                        {loading ? "Carregando..." : isLogin ? "Entrar" : "Criar Conta"}
                    </Button>
                </form>

                <div className="text-center text-sm">
                    {isLogin ? (
                        <>
                            Não tem uma conta?{" "}
                            <button // Limpa o erro ao alternar entre login/cadastro
                                type="button"
                                onClick={() => { setIsLogin(false); setError(null); }}
                                className="text-primary hover:underline font-medium"
                            >
                                Criar conta
                            </button>
                        </>
                    ) : (
                        <>
                            Já tem uma conta?{" "}
                            <button // Limpa o erro ao alternar entre login/cadastro
                                type="button"
                                onClick={() => { setIsLogin(true); setError(null); }}
                                className="text-primary hover:underline font-medium"
                            >
                                Entrar
                            </button>
                        </>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default AuthModal;
