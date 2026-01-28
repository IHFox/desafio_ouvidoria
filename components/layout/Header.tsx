import Link from "next/link";
import { Settings, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Header() {
    return (
        <header className="border-b bg-background sticky top-0 z-40 w-full">
            <div className="container flex h-16 items-center justify-between px-4 md:px-6">
                <Link href="/" className="flex items-center gap-2 font-bold text-xl text-primary">
                    <div className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center text-white">
                        DF
                    </div>
                    <span>Participa DF</span>
                </Link>

                <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
                    <Link href="/" className="hover:text-primary transition-colors">
                        Início
                    </Link>
                    <Link href="/manifestacao" className="hover:text-primary transition-colors">
                        Nova Manifestação
                    </Link>
                    <Link href="/acompanhar" className="hover:text-primary transition-colors">
                        Acompanhar
                    </Link>
                    <Link href="/ajuda" className="hover:text-primary transition-colors">
                        Ajuda
                    </Link>
                </nav>

                <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" aria-label="Ajustes de acessibilidade">
                        <Settings className="h-5 w-5" />
                    </Button>
                    <Button variant="ghost" size="icon" className="md:hidden" aria-label="Menu principal">
                        <Menu className="h-5 w-5" />
                    </Button>
                </div>
            </div>
        </header>
    );
}
