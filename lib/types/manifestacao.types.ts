export interface ProtocolPhase {
    id: string;
    name: string;
    description: string;
    timestamp?: string;
    active: boolean;
}

export interface Manifestacao {
    protocolo: string;
    tipo: string;
    dataHora: string;
    descricao: string;
    anonimo: boolean;
    nome?: string;
    email?: string;
    telefone?: string;
    phases: ProtocolPhase[];
    audioBlob?: string;
    videoBlob?: string;
    arquivos?: string[];
}

export const DEFAULT_PHASES: ProtocolPhase[] = [
    {
        id: 'recebida',
        name: 'Manifestação Recebida',
        description: 'Sua manifestação foi registrada e será encaminhada para análise da área técnica competente.',
        active: true,
    },
    {
        id: 'em_analise',
        name: 'Em Análise',
        description: 'A manifestação está sendo avaliada pelos nossos ouvidores.',
        active: false,
    },
    {
        id: 'processada',
        name: 'Processada',
        description: 'A manifestação foi processada e a resposta final está disponível.',
        active: false,
    }
];
