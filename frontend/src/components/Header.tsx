import { useState, useEffect } from "react";
import { Search, Heart, ArrowRight, LogIn, LogOut, User as UserIcon, Menu } from "lucide-react";
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
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTrigger,
} from "@/components/ui/sheet";

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
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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
            <div className="container flex h-auto min-h-16 flex-wrap items-center justify-between gap-x-4 gap-y-2 px-4 py-3 md:h-16 md:flex-nowrap md:gap-x-6 md:py-0">
                <Link to="/" className="flex items-center gap-3 transition-opacity hover:opacity-80">
                    <img src={verzelLogo} alt="Verzel" className="h-10 w-10 rounded-lg" />
                    <span className="hidden bg-gradient-primary bg-clip-text text-xl font-bold text-transparent sm:block">
                        Verzel Filmes
                    </span>
                </Link>

                <div className="relative order-3 flex w-full flex-1 items-center md:order-2 md:max-w-sm lg:max-w-2xl">
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
                        <Button onClick={handleSearch} size="icon" className="absolute right-1 h-5 w-5 md:h-8 md:w-8 ">
                            <ArrowRight className="h-4 w-4" />
                            <span className="sr-only">Buscar</span>
                        </Button>
                    )}
                </div>

                <div className="hidden items-center gap-4 md:flex md:order-3">
                    <GenreFilter selectedGenre={selectedGenre} />
                    <Link
                        to="/favorites"
                        className="flex items-center gap-2 rounded-lg bg-secondary px-4 py-2 transition-all hover:bg-secondary/80 hover:scale-105"
                    >
                        <Heart className="h-5 w-5 text-primary fill-primary" />
                        <span className="hidden font-medium lg:inline">Favoritos</span>
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

                <div className="flex items-center gap-2 order-last md:hidden">
                    <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                        <SheetTrigger asChild>
                            <Button variant="outline" size="icon">
                                <Menu className="h-5 w-5" />
                                <span className="sr-only">Abrir menu</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent className="flex flex-col">
                            <SheetHeader>
                                <Link to="/" className="flex items-center gap-3 transition-opacity hover:opacity-80" onClick={() => setIsMobileMenuOpen(false)}>
                                    <img src={verzelLogo} alt="Verzel" className="h-10 w-10 rounded-lg" />
                                    <span className="bg-gradient-primary bg-clip-text text-xl font-bold text-transparent">
                                        Verzel Filmes
                                    </span>
                                </Link>
                            </SheetHeader>
                            <div className="mt-8 flex flex-1 flex-col gap-6">
                                <GenreFilter selectedGenre={selectedGenre} />
                                <Link
                                    to="/favorites"
                                    className="flex items-center gap-2 rounded-lg bg-secondary px-4 py-3 text-base font-medium transition-all hover:bg-secondary/80"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    <Heart className="h-5 w-5 text-primary" />
                                    <span>Meus Favoritos</span>
                                    <Badge variant="secondary" className="ml-auto bg-primary text-primary-foreground hover:bg-primary/80" >
                                        {favoritesCount}
                                    </Badge>
                                </Link>
                            </div>
                            <div className="mt-auto">
                                {user ? (
                                    <Button onClick={handleLogout} variant="outline" className="w-full justify-start text-red-500 hover:text-red-500 border-red-500/20 hover:bg-red-500/10">
                                        <LogOut className="mr-2 h-4 w-4" />
                                        <span>Sair</span>
                                    </Button>
                                ) : (
                                    <Button onClick={() => { onLoginClick?.(); setIsMobileMenuOpen(false); }} className="w-full">
                                        <LogIn className="mr-2 h-4 w-4" /> Entrar ou Criar Conta
                                    </Button>
                                )}
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </header>
    )
}
export default Header;