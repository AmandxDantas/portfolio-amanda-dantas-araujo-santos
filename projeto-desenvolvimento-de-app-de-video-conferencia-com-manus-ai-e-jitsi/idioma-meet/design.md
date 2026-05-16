# Design da Interface - IdiomaMeet

## Visão Geral
O IdiomaMeet é um aplicativo de videoconferência que conecta dois estudantes aleatoriamente para praticar conversação em idiomas. A interface deve ser intuitiva, focada em uma mão, e seguir os padrões do iOS (HIG).

## Orientação
- **Orientação**: Retrato (9:16)
- **Uso**: Uma mão
- **Plataforma**: iOS/Android com Expo

---

## Lista de Telas

### 1. **Splash/Onboarding**
- Ícone do app (IdiomaMeet)
- Mensagem de boas-vindas
- Botão "Começar"

### 2. **Tela de Autenticação**
- Campo de email
- Campo de senha
- Botão "Entrar"
- Link "Criar conta"
- Opção de login com Apple/Google (futuro)

### 3. **Tela de Registro**
- Campo de nome
- Campo de email
- Campo de senha
- Campo de confirmação de senha
- Botão "Criar Conta"
- Link "Voltar para login"

### 4. **Tela de Perfil (Primeira Vez)**
- Avatar/Foto de perfil (upload ou câmera)
- Nome do usuário (pré-preenchido)
- Seleção de idioma nativo
- Seleção de idiomas para aprender (multi-select)
- Nível de proficiência (Iniciante, Intermediário, Avançado)
- Botão "Confirmar e Começar"

### 5. **Tela Principal (Home)**
- Saudação personalizada ("Olá, [Nome]!")
- Seção de idiomas selecionados (cards com bandeiras)
- Botão grande "Encontrar Parceiro" (CTA primária)
- Histórico de últimas conversas (cards com avatar, nome, idioma, duração)
- Abas inferiores: Home, Histórico, Perfil

### 6. **Tela de Busca de Parceiro (Matchmaking)**
- Animação de carregamento (spinning circle)
- Texto "Procurando parceiro..."
- Botão "Cancelar"
- Contador de tempo de espera (opcional)

### 7. **Tela de Confirmação de Parceiro**
- Avatar do parceiro
- Nome do parceiro
- Idioma da conversa
- Nível de proficiência do parceiro
- Botão "Iniciar Videoconferência"
- Botão "Rejeitar e Buscar Outro"

### 8. **Tela de Videoconferência**
- Vídeo do parceiro (tela cheia)
- Vídeo do usuário (PiP - Picture in Picture, canto inferior direito)
- Barra de ferramentas (bottom sheet):
  - Ícone de microfone (mute/unmute)
  - Ícone de câmera (on/off)
  - Ícone de encerrar chamada (vermelho, destaque)
  - Ícone de chat (futuro)
- Timer de duração da chamada (topo)

### 9. **Tela de Feedback Pós-Chamada**
- Avaliação do parceiro (1-5 estrelas)
- Campo de comentário (opcional)
- Botão "Enviar Feedback"
- Botão "Pular"
- Opção de reportar usuário (link pequeno)

### 10. **Tela de Histórico**
- Lista de conversas passadas
- Cada item mostra: avatar, nome, idioma, data, duração
- Filtro por idioma (opcional)
- Botão para deletar histórico

### 11. **Tela de Perfil**
- Avatar/Foto do usuário
- Nome e email
- Idioma nativo
- Idiomas para aprender
- Nível de proficiência
- Estatísticas: Total de conversas, Tempo total, Idiomas praticados
- Botão "Editar Perfil"
- Botão "Configurações"
- Botão "Sair"

### 12. **Tela de Configurações**
- Notificações (toggle)
- Qualidade de vídeo (baixa, média, alta)
- Idioma do app (português, inglês, espanhol)
- Privacidade e Termos
- Sobre o app
- Versão do app

---

## Fluxos Principais

### Fluxo 1: Primeiro Acesso
1. Splash → Autenticação → Registro → Perfil → Home

### Fluxo 2: Buscar Parceiro e Conversar
1. Home → Busca de Parceiro → Confirmação → Videoconferência → Feedback → Home

### Fluxo 3: Gerenciar Perfil
1. Home → Perfil → Editar Perfil → Salvar → Perfil

---

## Paleta de Cores

| Elemento | Cor | Uso |
|----------|-----|-----|
| **Primary** | #0a7ea4 (Azul) | Botões principais, CTA, destaques |
| **Background** | #ffffff (Light) / #151718 (Dark) | Fundo das telas |
| **Surface** | #f5f5f5 (Light) / #1e2022 (Dark) | Cards, superfícies elevadas |
| **Foreground** | #11181C (Light) / #ECEDEE (Dark) | Texto principal |
| **Muted** | #687076 (Light) / #9BA1A6 (Dark) | Texto secundário |
| **Border** | #E5E7EB (Light) / #334155 (Dark) | Divisores, bordas |
| **Success** | #22C55E | Status de sucesso |
| **Warning** | #F59E0B | Avisos |
| **Error** | #EF4444 | Erros, ações destrutivas |

---

## Componentes Principais

### Botões
- **Primary Button**: Fundo azul, texto branco, arredondado (radius: 12px)
- **Secondary Button**: Fundo transparente, borda azul, texto azul
- **Danger Button**: Fundo vermelho, texto branco (para encerrar chamada)

### Cards
- Fundo: Surface color
- Borda: Border color (0.5px)
- Padding: 16px
- Radius: 12px
- Sombra leve

### Inputs
- Borda: Border color
- Padding: 12px
- Radius: 8px
- Placeholder: Muted color

### Ícones
- Tamanho padrão: 24px
- Cor: Foreground ou Primary (conforme contexto)
- Fonte: Material Icons (Android/Web) / SF Symbols (iOS)

---

## Padrões de Interação

### Press Feedback
- Botões: Scale 0.97 + Haptic (Light)
- Cards: Opacity 0.7
- Ícones: Opacity 0.6

### Animações
- Transições entre telas: Fade (250ms)
- Carregamento: Spinner suave
- Confirmação: Checkmark com haptic (Success)

### Navegação
- Tab bar inferior com 3 abas: Home, Histórico, Perfil
- Ícones: house.fill, clock.fill, person.fill
- Cor ativa: Primary blue
- Cor inativa: Muted gray

---

## Considerações de Acessibilidade

- Contraste mínimo 4.5:1 para texto
- Ícones acompanhados de rótulos em botões principais
- Tamanho mínimo de toque: 44x44pt
- Suporte a VoiceOver (iOS) e TalkBack (Android)

---

## Próximas Etapas

1. Implementar telas de autenticação e perfil
2. Criar sistema de matchmaking aleatório
3. Integrar Jitsi Meet para videoconferência
4. Adicionar feedback e histórico
5. Testes e refinamento de UX
