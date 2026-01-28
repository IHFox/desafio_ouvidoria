# Participa DF - Ouvidoria PWA 📱

Progressive Web App (PWA) desenvolvido para o Hackathon Global 2025 - Desafio Ouvidoria GDF.
O aplicativo permite que cidadãos registrem manifestações (denúncias, reclamações, sugestões, elogios) utilizando múltiplos canais (texto, áudio, vídeo, imagens) de forma acessível e intuitiva.

## 🚀 Funcionalidades Principais

- **Multicanalidade**: Relato por texto, gravação de áudio, vídeo ou upload de arquivos.
- **Acessibilidade (WCAG 2.1 AA)**: Navegação por teclado, leitores de tela, alto contraste, skip links.
- **PWA**: Instalável, funciona offline (cache básico), mobile-first.
- **Anonimato**: Opção de manifestação anônima ou identificada.
- **Segurança**: Geração de protocolo único para acompanhamento.

## 🛠️ Tecnologias Utilizadas

- **Core**: Next.js 15+ (App Router), React, TypeScript.
- **UI/UX**: Tailwind CSS, Shadcn/UI, Lucide Icons.
- **Forms**: React Hook Form, Zod.
- **PWA**: next-pwa.
- **Mídia**: Hooks customizados para MediaRecorder API.

### 📦 Como Rodar o Projeto

> [!NOTE]
> O projeto utiliza Next.js 16, que habilita o Turbopack por padrão. Devido ao uso do `next-pwa`, os comandos `dev` e `build` foram configurados para usar `--webpack` explicitamente para garantir compatibilidade.

1.  **Instalar dependências**:
    ```bash
    npm install
    ```

2.  **Rodar servidor de desenvolvimento**:
    ```bash
    npm run dev
    ```
    Acesse http://localhost:3000

3.  **Build de Produção**:
    ```bash
    npm run build
    npm start
    ```

## 📱 Como Testar o PWA

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

O projeto segue as diretrizes WCAG 2.1 AA.
- Use `Tab` para navegar entre elementos focáveis.
- Use `Space`/`Enter` para interagir com botões.
- Use leitores de tela (NVDA, VoiceOver) para verificar as descrições ARIA.

---
**Equipe Antigravity** - Hackathon Participa DF 2025
