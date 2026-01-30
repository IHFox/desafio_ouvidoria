# Solução de desenvolvimento de PWA para Ouvidoria - Hackathon Participa DF

**Categoria:** Ouvidoria
**Data:** Janeiro 2026

## Resumo da Solução

Progressive Web App (PWA) desenvolvido para permitir que cidadãos registrem manifestações (denúncias, reclamações, sugestões, elogios) utilizando múltiplos canais (texto, áudio, vídeo, imagens) de forma acessível e intuitiva.

---

## Funcionalidades Principais

- **Multicanalidade**: Relato por texto, gravação de áudio, vídeo ou upload de arquivos.
- **Acessibilidade (WCAG 2.1 AA)**: Navegação por teclado, leitores de tela, alto contraste, skip links.
- **PWA**: Instalável, funciona offline (cache básico), mobile-first.
- **Anonimato**: Opção de manifestação anônima ou identificada.
- **Segurança**: Geração de protocolo único para acompanhamento.

---

## Tecnologias Utilizadas

- **Core**: Next.js 15+ (App Router), React, TypeScript.
- **UI/UX**: Tailwind CSS, Shadcn/UI, Lucide Icons.
- **Forms**: React Hook Form, Zod.
- **PWA**: next-pwa.
- **Mídia**: Hooks customizados para MediaRecorder API.

---

## Instalação

### 1. Clonar ou Baixar o Projeto
```bash
git clone https://github.com/IHFox/desafio_ouvidoria.git
cd desafio_ouvidoria
```

> [!NOTE]
> O projeto utiliza Next.js 16, que habilita o Turbopack por padrão. Devido ao uso do `next-pwa`, os comandos `dev` e `build` foram configurados para usar `--webpack` explicitamente para garantir compatibilidade.

### 2. Instalar dependências
    ```bash
    npm install
    ```

### 3. Rodar servidor de desenvolvimento
    ```bash
    npm run dev
    ```
    Acesse http://localhost:3000

### 4. Build de Produção
    ```bash
    npm run build
    npm start
    ```

---

## Como Testar o PWA

O PWA está desabilitado no modo de desenvolvimento por padrão para evitar problemas de cache durante o desenvolvimento.

### Opção 1: Teste em Produção (Recomendado)
Este é o método mais fiel para verificar se o PWA está instalável e funcionando offline.
```bash
npm run build
npm start
```

### Opção 2: Teste em Desenvolvimento
Se você realmente precisar testar no modo `dev`:
```bash
PWA_ENABLE_DEV=true npm run dev
```

### Critérios de Verificação
1.  **Instalação**: No Chrome/Edge (Desktop), deve aparecer o ícone "Instalar" na barra de endereços.
2.  **Manifesto**: Abra o DevTools (F12) -> Application -> Manifest e verifique se as informações e ícones aparecem.
3.  **Service Worker**: No DevTools -> Application -> Service Workers e verifique se há um worker ativo de `sw.js`.
4.  **Offline**: Marque a opção "Offline" na aba Network e recarregue. A aplicação deve carregar o esqueleto básico.

---

## Considerações

- Apesar de no edital mencionar integração com o sistema de inteligência artificial IZA da Ouvidoria-Geral do DF, não foi possível realizar a integração devido à falta de documentação e acesso à API.
- Por não ter definição de como armazenar os protocolos de atendimento, foi criado um sistema de armazenamento local utilizando o IndexedDB. Dessa forma, não estão sendo armazenados as gravações de áudio e vídeo, nem os anexos.

---

## Uso de Inteligência Artificial

Para a resolução desse desafio, foram utilizados os seguintes modelos de IA por meio do Antigravity:

- Claude Opus 4.5
- Gemini 3 Pro
- Gemini 3 Flash
