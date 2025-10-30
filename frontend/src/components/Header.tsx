import { useState, useEffect } from "react";
import { Search, Heart, ArrowRight, LogIn, LogOut, User as UserIcon } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import verzelLogo from "@/assets/verzel-logo.jpeg";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import GenreFilter from "./GenreFilter";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type User = { id: number; name: string; email: string };
interface HeaderProps {
    searchQuery: string;
    onSearchChange: (query: string) => void;
    favoritesCount: number;
    onSearch?: (query: string) => void;
    selectedGenre?: string;
    onLoginClick?: () => void;
}
const Header = ({ searchQuery, onSearchChange, favoritesCount, onSearch, selectedGenre, onLoginClick }: HeaderProps) => {
    const [user, setUser] = useState<User | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const checkUser = () => {
            const storedUser = localStorage.getItem("user");
            if (storedUser) {
                setUser(JSON.parse(storedUser));
            } else {
                setUser(null);
            }
        };

        checkUser();

        window.addEventListener("authChange", checkUser);

        return () => {
            window.removeEventListener("authChange", checkUser);
        };
    }, []);

    const handleSearch = () => {
        if (onSearch) {
            onSearch(searchQuery);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("authToken");
        localStorage.removeItem("user");
        window.dispatchEvent(new Event("authChange"));
        navigate("/");
    };

    return (
        <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
            <div className="container flex h-16 items-center gap-6 px-4">
                <Link to="/" className="flex items-center gap-3 transition-opacity hover:opacity-80">
                    <img src={verzelLogo} alt="Verzel" className="h-10 w-10 rounded-lg" />
                    <span className="bg-gradient-primary bg-clip-text text-xl font-bold text-transparent">
                        Verzel Filmes
                    </span>
                </Link>

                <div className="relative flex flex-1 max-w-2xl items-center">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                        type="search"
                        placeholder="Buscar filmes..."
                        value={searchQuery}
                        onChange={(e) => onSearchChange(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                handleSearch();
                            }
                        }}
                        className="h-10 pl-10 bg-secondary border-border focus-visible:ring-primary"
                    />
                    {onSearch && (
                        <Button onClick={handleSearch} size="icon" className="absolute right-1 h-8 w-8">
                            <ArrowRight className="h-4 w-4" />
                            <span className="sr-only">Buscar</span>
                        </Button>
                    )}
                </div>
                <GenreFilter selectedGenre={selectedGenre} />
                <div className="flex items-center gap-4">
                    <Link
                        to="/favorites"
                        className="flex items-center gap-2 rounded-lg bg-secondary px-4 py-2 transition-all hover:bg-secondary/80 hover:scale-105"
                    >
                        <Heart className="h-5 w-5 text-primary fill-primary" />
                        <span className="font-medium">Favoritos</span>
                        <Badge variant="secondary" className="bg-primary text-primary-foreground hover:bg-primary/80" >
                            {favoritesCount}
                        </Badge>
                    </Link>

                    {user ? (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" size="icon" className="h-10 w-10 rounded-full">
                                    <UserIcon className="h-5 w-5" />
                                    <span className="sr-only">Abrir menu do usuário</span>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Olá, {user.name.split(' ')[0]}</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-red-500 focus:text-red-500 focus:bg-red-500/10">
                                    <LogOut className="mr-2 h-4 w-4" />
                                    <span>Sair</span>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    ) : (
                        <Button onClick={onLoginClick} variant="outline">
                            <LogIn className="mr-2 h-4 w-4" /> Entrar
                        </Button>
                    )}
                </div>
            </div>
        </header>
    )
}
export default Header;