'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { CheckCircle, Home, FileText, Copy } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from 'sonner';

function SucessoContent() {
    const searchParams = useSearchParams();
    const protocolo = searchParams.get('protocolo');

    const copyToClipboard = () => {
        if (protocolo) {
            navigator.clipboard.writeText(protocolo);
            toast.success("Protocolo copiado!");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-8 animate-in zoom-in duration-500">
            <div className="rounded-full bg-green-100 p-6 dark:bg-green-900/30">
                <CheckCircle className="h-16 w-16 text-green-600 dark:text-green-500" />
            </div>

            <div className="text-center space-y-2">
                <h1 className="text-3xl font-bold tracking-tight">Manifestação Registrada!</h1>
                <p className="text-muted-foreground pb-4">
                    Sua manifestação foi enviada com sucesso para a Ouvidoria do GDF.
                </p>
            </div>

            <Card className="w-full max-w-md border-2 border-secondary/20">
                <CardHeader className="text-center pb-2">
                    <CardTitle className="text-sm font-medium uppercase text-muted-foreground">Seu Protocolo</CardTitle>
                </CardHeader>
                <CardContent className="text-center space-y-4">
                    <div className="text-4xl font-mono font-bold tracking-wider text-primary select-all">
                        {protocolo || "ERRO-GERACAO"}
                    </div>
                    <p className="text-xs text-muted-foreground">
                        Guarde este número para acompanhar o andamento.
                    </p>
                    <Button variant="outline" size="sm" onClick={copyToClipboard} className="gap-2">
                        <Copy className="h-4 w-4" /> Copiar Protocolo
                    </Button>
                </CardContent>
            </Card>

            <div className="flex gap-4">
                <Button asChild size="lg" variant="default">
                    <Link href="/">
                        <Home className="mr-2 h-4 w-4" /> Voltar ao Início
                    </Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                    <Link href="/manifestacao">
                        <FileText className="mr-2 h-4 w-4" /> Nova Manifestação
                    </Link>
                </Button>
            </div>
        </div>
    );
}

export default function SucessoPage() {
    return (
        <Suspense fallback={<div className="text-center p-12">Carregando...</div>}>
            <SucessoContent />
        </Suspense>
    );
}
