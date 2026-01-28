import { FormManifestacao } from "@/components/features/manifestacao/FormManifestacao";

export default function ManifestacaoPage() {
    return (
        <div className="space-y-8 pb-12">
            <div className="text-center space-y-2">
                <h1 className="text-3xl font-bold tracking-tight text-primary">Nova Manifestação</h1>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                    Utilize este canal para registrar reclamações, sugestões, denúncias, elogios ou solicitações.
                    Você pode enviar texto, áudio, vídeo ou imagens.
                </p>
            </div>

            <FormManifestacao />
        </div>
    );
}
