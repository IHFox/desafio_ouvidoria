'use client';

import React from 'react';
import { HelpCircle, Phone, Globe, User, Shield, FileText, Info, HelpCircle as QuestionIcon, MessageSquare, AlertCircle, Clock, CheckCircle2, ChevronRight, MapPin } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export default function AjudaPage() {
    const faqItems = [
        {
            id: "q1",
            question: "1. Quem pode fazer um registro de ouvidoria?",
            answer: "Qualquer pessoa física ou jurídica."
        },
        {
            id: "q2",
            question: "2. Que tipos de registros de Ouvidoria podem ser feitos?",
            answer: "Reclamações, sugestões, elogios, solicitações, informações e denúncias."
        },
        {
            id: "q3",
            question: "3. Quais os canais de atendimento de Ouvidoria?",
            answer: (
                <div className="space-y-2">
                    <p>Você pode acessar o serviço de Ouvidoria do GDF por três canais:</p>
                    <ul className="list-disc pl-5 space-y-1">
                        <li><strong>Participa DF</strong>: Ouv-DF (Sistema de Ouvidoria)</li>
                        <li><strong>Central 162</strong>: atendimento de segunda a sexta-feira, das 7h às 21h, e fins de semana e feriados, das 8h às 18h.</li>
                        <li><strong>Presencial</strong>: nos órgãos do GDF.</li>
                    </ul>
                </div>
            )
        },
        {
            id: "q4",
            question: "4. Você conhece a robô da Ouvidoria - IZA?",
            answer: "A IZA é a robô da Ouvidoria que vai te ajudar a realizar seu registro. Ela te dará dicas importantes!"
        },
        {
            id: "q5",
            question: "5. Para realizar um registro é necessária a identificação?",
            answer: "Para Solicitação de Serviço, Elogio, Sugestão e Informação é necessária a sua identificação. Se preferir, pode registrar reclamação e denúncia sem se identificar, mas não poderá acompanhar e nem receber a resposta. Sugerimos que se identifique, suas informações estarão seguras. *Base legal: Lei Geral de Proteção de Dados Lei nº 13.709/2018 e Art. 14 da Instrução Normativa CGDF nº 01, de 05/05/2017."
        },
        {
            id: "q6",
            question: "6. Meus dados pessoais estão protegidos quando uso a Ouvidoria?",
            answer: "Sim. Todos os dados pessoais registrados no Participa DF estão protegidos e serão encaminhados apenas para os setores responsáveis pela análise e resposta do seu registro. Para mais informações, acesse os Termos de Uso. *Base legal: Lei nº 13.709/2018 – Lei Geral de Proteção de Dados Pessoais (LGPD)."
        },
        {
            id: "q7",
            question: "7. Quais informações são necessárias para o registro?",
            answer: (
                <div className="space-y-2">
                    <p>Informe o maior número de detalhes possível sobre o que você precisa, se tiver fotos e vídeos para explicar será melhor ainda. Se for uma denúncia de irregularidades, informe:</p>
                    <p className="font-semibold">Quem, Como, Onde, Quando, Por quê</p>
                    <p>Outras informações também podem contribuir, como: nomes de pessoas e empresas envolvidas, tempo em que se deu o fato, se há comprovação ou testemunhas.</p>
                </div>
            )
        },
        {
            id: "q8",
            question: "8. Quais são as formas de comunicar irregularidades ocorridas nos órgãos públicos?",
            answer: "Novo registro no Participa DF; Representação funcional; Denúncia apresentada por particulares; Resultado de auditoria ou sindicância; Ofícios de outros órgãos; Notícias na mídia; e Denúncias anônimas."
        },
        {
            id: "q9",
            question: "9. O que significa representação funcional?",
            answer: "É o documento escrito e apresentado por servidor público que identifica supostas irregularidades enquanto realiza suas atividades. Nesse caso, o servidor é obrigado pela lei a informar ao Governo."
        },
        {
            id: "q10",
            question: "10. O que é denúncia?",
            answer: "Comunicação registrada no Participa DF que informa ao GDF possíveis irregularidades cometidas por órgãos públicos ou condutas de servidores que não atendem os deveres e obrigações funcionais. As denúncias receberão tratamento reservado durante a apuração. Garantimos o sigilo dos seus dados pessoais e das informações apresentadas. *Base legal: Artigo 23, inciso I, do Decreto nº 36.462/2015."
        },
        {
            id: "q11",
            question: "11. Como a denúncia é tratada pelo GDF?",
            answer: "Todas as denúncias do GDF são encaminhadas para Ouvidoria-Geral do DF analisar o conteúdo. Se no registro tiver informações suficientes, enviaremos para consulta nos órgãos adequados e informaremos na resposta para onde foi encaminhada e qual número de processo administrativo foi recebido."
        },
        {
            id: "q12",
            question: "12. Como é analisada a denúncia?",
            answer: "1º passo – A Ouvidoria confirma se as informações apresentadas são suficientes. 2º passo – A Ouvidoria encaminha para área de correição para analisar se os fatos são reais e se iniciam uma investigação. É preciso identificar o nome da pessoa ou órgão que provocou a possível irregularidade."
        },
        {
            id: "q13",
            question: "13. Como posso acompanhar o andamento do registro de Ouvidoria?",
            answer: "Basta ter o login e a senha de acesso ao sistema Participa DF recebidos no ato da criação da sua conta e o número do protocolo em mãos."
        },
        {
            id: "q14",
            question: "14. O que fazer no caso de esquecimento da senha e/ou o número do protocolo?",
            answer: "Se você esquecer a senha, clique em “entrar” no item ESQUECI A SENHA informando seu CPF ou CNPJ. Se você esquecer o número do protocolo, faça o login no Participa DF e acesse Meus registros de Ouvidoria."
        },
        {
            id: "q15",
            question: "15. Qual prazo para resposta?",
            answer: "10 dias – O órgão responsável deverá informar as primeiras providências. 20 dias – Prazo final para informar o resultado. Prorrogação para Denúncias – O prazo de resposta para denúncias pode ser prorrogado por mais 20 dias mediante avaliação da Ouvidoria-Geral."
        },
        {
            id: "q16",
            question: "16. Como complementar um registro já realizado?",
            answer: "Você pode enviar mais informações e anexar arquivos se ainda estiver dentro do prazo de resposta e não tiver recebido a resposta definitiva. Basta acessar sua conta e clicar em “informações complementares”."
        },
        {
            id: "q17",
            question: "17. É possível enviar documentos, fotos e vídeos junto com o registro de Ouvidoria?",
            answer: "Sim. No momento do registro ou em 'Meus Registros' se ainda estiver no prazo. Tipos aceitos: pdf, png, jpg, jpeg, xlsx, docx, mp3 e mp4 (limite de 25Mb)."
        },
        {
            id: "q18",
            question: "18. A Solicitação de Serviço pode ser realizada na Ouvidoria?",
            answer: "Antes de registrar, acesse as Cartas de Serviços do GDF. Se não encontrar o serviço lá, registre sua solicitação aqui no Participa DF ou nos demais canais de atendimento."
        },
        {
            id: "q19",
            question: "19. Como posso avaliar o serviço de Ouvidoria?",
            answer: "Após leitura da resposta definitiva, você poderá responder a pesquisa de satisfação diretamente no sistema."
        },
        {
            id: "q20",
            question: "20. Quais são os normativos sobre o serviço de Ouvidoria?",
            answer: "Você pode conhecer todos os normativos no portal oficial do GDF."
        },
        {
            id: "q21",
            question: "21. O que você deve fazer quando não conseguir fazer o seu registro?",
            answer: "Ligue na Central 162."
        }
    ];

    return (
        <div className="max-w-4xl mx-auto space-y-12 animate-in fade-in duration-500 pb-20">
            {/* Header */}
            <div className="text-center space-y-4">
                <h1 className="text-4xl font-extrabold tracking-tight">Como podemos ajudar?</h1>
                <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                    Tire suas dúvidas sobre o funcionamento da Ouvidoria e o sistema Participa DF.
                </p>
            </div>

            {/* O que é a Ouvidoria? */}
            {/* <Card className="border-1 border-primary/10 shadow-xl bg-gradient-to-br from-card to-muted/30 overflow-hidden">
                <CardHeader className="border-b bg-primary/5 pb-6">
                    <CardTitle className="text-2xl flex items-center gap-3">
                        <Info className="h-6 w-6 text-primary" />
                        O que é a Ouvidoria do DF?
                    </CardTitle>
                </CardHeader> */}
            <Card className="border-1 border-primary/10 shadow-lg overflow-hidden">
                <CardHeader className="bg-primary/5 p-4">
                    <CardTitle className="text-lg flex items-center gap-3">
                        <Info className="h-6 w-6 text-primary" />
                        O que é a Ouvidoria do DF?
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-8">
                    <div className="space-y-4 leading-relaxed text-muted-foreground">
                        <p>
                            A Ouvidoria é um espaço para você se relacionar com o Governo do Distrito Federal,
                            registrando sua solicitação, reclamação, elogio, denúncia ou pedido de informação que
                            tenha relação com os serviços prestados pelo Governo.
                        </p>
                        <p>
                            É dessa forma que vamos garantir que você seja ouvido e que os serviços públicos
                            sejam constantemente aprimorados.
                        </p>
                    </div>

                    <Separator />

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="space-y-3 p-4 bg-background rounded-xl border border-primary/10 shadow-sm">
                            <div className="h-10 w-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
                                <Globe className="h-5 w-5" />
                            </div>
                            <h3 className="font-bold text-primary">Participa DF</h3>
                            <p className="text-xs text-muted-foreground">Sistema web acessível 24h para registros e acompanhamento.</p>
                        </div>
                        <div className="space-y-3 p-4 bg-background rounded-xl border border-secondary/10 shadow-sm">
                            <div className="h-10 w-10 bg-secondary/10 rounded-lg flex items-center justify-center text-secondary">
                                <Phone className="h-5 w-5" />
                            </div>
                            <h3 className="font-bold text-secondary">Central 162</h3>
                            <p className="text-xs text-muted-foreground">Atendimento telefônico diário com horários ampliados.</p>
                        </div>
                        <div className="space-y-3 p-4 bg-background rounded-xl border border-primary/10 shadow-sm">
                            <div className="h-10 w-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
                                <MapPin className="h-5 w-5" />
                            </div>
                            <h3 className="font-bold text-primary">Presencial</h3>
                            <p className="text-xs text-muted-foreground">Atendimento físico em diversos órgãos do Governo do DF.</p>
                        </div>
                    </div>

                    <div className="p-4 bg-primary/5 rounded-lg text-sm text-center">
                        <p className="text-muted-foreground italic">
                            As ouvidorias do GDF formam o Sistema de Gestão de Ouvidoria do DF (SIGO/DF),
                            coordenado pela Ouvidoria-Geral da CGDF.
                        </p>
                    </div>
                </CardContent>
            </Card>

            {/* FAQ Section */}
            <div className="space-y-6">
                <div className="flex items-center gap-3 mb-8">
                    <QuestionIcon className="h-7 w-7 text-primary" />
                    <h2 className="text-3xl font-bold">Perguntas Frequentes</h2>
                </div>

                <Accordion type="single" collapsible className="space-y-4">
                    {faqItems.map((item) => (
                        <AccordionItem
                            key={item.id}
                            value={item.id}
                            className="bg-card border rounded-xl overflow-hidden px-4 hover:border-primary/50 transition-colors shadow-sm"
                        >
                            <AccordionTrigger className="text-left font-semibold py-5 hover:no-underline">
                                {item.question}
                            </AccordionTrigger>
                            <AccordionContent className="text-muted-foreground leading-relaxed pt-2 pb-6">
                                {item.answer}
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </div>

            {/* Still have questions? */}
            <Card className="bg-primary text-primary-foreground border-none">
                <CardContent className="p-8 text-center space-y-4">
                    <h3 className="text-2xl font-bold">Ainda tem dúvidas?</h3>
                    <p className="opacity-90 max-w-xl mx-auto">
                        Se não encontrou o que procurava, nossa equipe está pronta para ajudar através dos canais oficiais.
                    </p>
                    <div className="pt-4 flex flex-wrap justify-center gap-4">
                        <Badge variant="secondary" className="px-4 py-2 text-lg font-bold gap-2">
                            <Phone className="h-4 w-4" /> Central 162
                        </Badge>
                        <Badge variant="secondary" className="px-4 py-2 text-lg font-bold gap-2">
                            <Phone className="h-4 w-4" /> 0800 644 0162
                        </Badge>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
