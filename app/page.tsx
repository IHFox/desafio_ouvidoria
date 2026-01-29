import Link from "next/link";
import { ArrowRight, MessageSquare, Shield, Smartphone, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="text-center py-12 md:py-24 space-y-6 animate-in fade-in slide-in-from-bottom-8 duration-700">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tighter text-primary">
          Sua voz ativa no <br className="hidden sm:inline" />
          <span className="text-secondary">Distrito Federal</span>
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
          Participe da gestão pública. Faça denúncias, reclamações, sugestões e elogios de forma simples, rápida e acessível.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <Button asChild size="lg" className="h-12 px-8 text-lg rounded-full">
            <Link href="/manifestacao">
              Registrar Manifestação <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="h-12 px-8 text-lg rounded-full">
            <Link href="/acompanhar">
              Acompanhar Protocolo
            </Link>
          </Button>
        </div>
      </section>

      {/* Features */}
      <section className="grid md:grid-cols-3 gap-8 py-12">
        <div className="bg-card p-6 rounded-xl border shadow-sm hover:shadow-md transition-shadow">
          <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 text-primary">
            <Smartphone className="h-6 w-6" />
          </div>
          <h3 className="text-xl font-bold mb-2">Multicanalidade</h3>
          <p className="text-muted-foreground">Registre via texto, áudio, vídeo ou imagens. Você escolhe como quer se expressar.</p>
        </div>
        <div className="bg-card p-6 rounded-xl border shadow-sm hover:shadow-md transition-shadow">
          <div className="h-12 w-12 bg-secondary/10 rounded-lg flex items-center justify-center mb-4 text-secondary">
            <Globe className="h-6 w-6" />
          </div>
          <h3 className="text-xl font-bold mb-2">Acessibilidade Total</h3>
          <p className="text-muted-foreground">Plataforma desenvolvida seguindo diretrizes WCAG 2.1 AA para inclusão de todos.</p>
        </div>
        <div className="bg-card p-6 rounded-xl border shadow-sm hover:shadow-md transition-shadow">
          <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 text-primary">
            <Shield className="h-6 w-6" />
          </div>
          <h3 className="text-xl font-bold mb-2">Segurança e Anonimato</h3>
          <p className="text-muted-foreground">Opção de manifestação anônima e proteção de seus dados pessoais.</p>
        </div>
      </section>
    </div>
  );
}
