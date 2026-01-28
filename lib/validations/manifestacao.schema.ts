import { z } from 'zod';

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
const ACCEPTED_VIDEO_TYPES = ["video/mp4", "video/webm", "video/ogg"];

export const manifestacaoSchema = z.object({
    tipo: z.enum(['reclamacao', 'denuncia', 'sugestao', 'elogio', 'solicitacao']),

    // Conteúdo (pelo menos um deve estar presente)
    descricao: z.string().optional(),

    arquivos: z.array(z.any()).optional(), // Validação mais específica feita no componente ou transform

    audioBlob: z.any().optional(),
    videoBlob: z.any().optional(),

    // Identificação
    anonimo: z.boolean().default(false),

    nome: z.string().optional(),
    email: z.string().email("Email inválido").optional().or(z.literal('')),
    telefone: z.string().min(10, "Telefone inválido").optional().or(z.literal('')),

}).refine((data) => {
    // Pelo menos um tipo de conteúdo deve ser fornecido
    const hasText = data.descricao && data.descricao.length >= 10;
    const hasAudio = !!data.audioBlob;
    const hasVideo = !!data.videoBlob;
    const hasFiles = data.arquivos && data.arquivos.length > 0;

    return hasText || hasAudio || hasVideo || hasFiles;
}, {
    message: "Forneça pelo menos uma forma de manifestação (texto, áudio, vídeo ou anexo)",
    path: ["descricao"] // Aponta o erro para descrição para facilitar, ou criar um erro geral
}).refine((data) => {
    if (!data.anonimo) {
        return !!data.nome && !!data.email;
    }
    return true;
}, {
    message: "Nome e Email são obrigatórios para manifestações identificadas",
    path: ["nome"] // Erro no nome
});

export type ManifestacaoFormData = z.infer<typeof manifestacaoSchema>;
