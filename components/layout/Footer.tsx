export function Footer() {
    return (
        <footer className="bg-muted py-6 md:py-12 border-t mt-auto">
            <div className="container px-4 md:px-6">
                <div className="grid gap-8 md:grid-cols-3">
                    <div className="space-y-4">
                        <span className="font-bold text-lg">Participa DF</span>
                        <p className="text-sm text-muted-foreground">
                            Ouvidoria-Geral do Distrito Federal.
                            Exerça sua cidadania.
                        </p>
                    </div>
                    <div className="space-y-4">
                        <span className="font-bold text-lg">Canais de Atendimento</span>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li>Telefone: 162</li>
                            <li>Presencial: Nos órgãos do GDF</li>
                            <li>Site: participa.df.gov.br</li>
                        </ul>
                    </div>
                    <div className="space-y-4">
                        <span className="font-bold text-lg">Sobre o Sistema</span>
                        <p className="text-sm text-muted-foreground">
                            Desenvolvido para o 1º Hackathon em Controle Social.
                            Versão PWA v1.0.0
                        </p>
                    </div>
                </div>
                <div className="mt-8 pt-6 border-t text-center text-xs text-muted-foreground">
                    &copy; 2026 Governo do Distrito Federal - Todos os direitos reservados.
                </div>
            </div>
        </footer>
    );
}
