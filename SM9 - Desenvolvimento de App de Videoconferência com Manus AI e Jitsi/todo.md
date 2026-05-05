# IdiomaMeet - TODO

## Fase 1: Autenticação e Perfil
- [x] Implementar tela de login
- [x] Implementar tela de registro
- [x] Implementar tela de perfil inicial (seleção de idiomas)
- [x] Integrar autenticação com backend (OAuth/JWT)
- [x] Persistir dados de autenticação com AsyncStorage

## Fase 2: Tela Principal e Navegação
- [x] Implementar tela home com saudação personalizada
- [x] Criar tab bar com 3 abas (Home, Histórico, Perfil)
- [x] Implementar tela de histórico de conversas
- [x] Implementar tela de perfil do usuário
- [x] Adicionar funcionalidade de editar perfil

## Fase 3: Sistema de Matchmaking
- [ ] Implementar tela de busca de parceiro
- [ ] Criar API de matchmaking aleatório no backend
- [ ] Implementar tela de confirmação de parceiro
- [ ] Adicionar funcionalidade de rejeitar parceiro
- [ ] Implementar sistema de fila de espera

## Fase 4: Integração Jitsi Meet
- [ ] Instalar biblioteca de Jitsi Meet (react-native-jitsi-meet ou similar)
- [ ] Implementar tela de videoconferência
- [ ] Configurar permissões de câmera e microfone
- [ ] Implementar controles de mute/unmute e câmera on/off
- [ ] Implementar timer de duração da chamada
- [ ] Testar videoconferência em iOS e Android

## Fase 5: Feedback e Histórico
- [ ] Implementar tela de feedback pós-chamada
- [ ] Criar sistema de avaliação (1-5 estrelas)
- [ ] Implementar persistência de histórico no backend
- [ ] Adicionar funcionalidade de deletar histórico
- [ ] Implementar filtro de histórico por idioma

## Fase 6: Configurações e Refinamento
- [ ] Implementar tela de configurações
- [ ] Adicionar toggle de notificações
- [ ] Implementar seleção de qualidade de vídeo
- [ ] Adicionar seleção de idioma do app
- [ ] Implementar dark mode completo

## Fase 7: Branding e Design
- [x] Gerar logo do app (IdiomaMeet)
- [x] Atualizar app.config.ts com branding
- [x] Copiar logo para todos os locais necessários
- [ ] Refinar cores e tipografia
- [ ] Validar design em iOS e Android

## Fase 8: Testes e Entrega
- [ ] Testes de fluxo de autenticação
- [ ] Testes de matchmaking
- [ ] Testes de videoconferência
- [ ] Testes de feedback e histórico
- [ ] Testes de configurações
- [ ] Validar responsividade em diferentes tamanhos de tela
- [ ] Criar checkpoint final
- [ ] Preparar para publicação

## Fase 3: Sistema de Matchmaking (PROGRESSO)
- [x] Implementar tela de busca de parceiro
- [x] Criar API de matchmaking aleatório no backend
- [x] Adicionar tabelas de banco de dados para matchmaking
- [x] CORRIGIDO: Botão "Encontrar Parceiro" agora navega para matching
- [x] CORRIGIDO: Seleção de idioma integrada na home
- [ ] Implementar WebSocket para matchmaking em tempo real
- [ ] Testar matchmaking com múltiplos usuários

## Fase 4: Integração Jitsi Meet
- [ ] Instalar biblioteca react-native-jitsi-meet
- [ ] Criar tela de videoconferência
- [ ] Implementar controles de câmera e microfone
- [ ] Adicionar funcionalidade de encerrar chamada
- [ ] Testar integração com Jitsi Meet

## Fase 5: Avaliação e Feedback
- [x] NOVO: Criar tela de relatório/resumo pós-conversa (call-report.tsx)
- [x] NOVO: Gerar relatório com estatísticas completas da conversa
- [x] NOVO: Exibir XP ganhos, qualidade de conexão, tópicos discutidos
- [x] NOVO: Sistema de ratings (1-5 estrelas) integrado
- [x] NOVO: Campo de comentários e feedback
- [ ] Implementar sistema de ratings no backend
- [ ] Atualizar perfil com estatísticas acumuladas

## Fase 6: Melhorias e Otimizações
- [ ] Implementar seleção de qualidade de vídeo
- [ ] Adicionar seleção de idioma do app
- [ ] Implementar dark mode completo

## Fase 7: Branding e Design
- [x] Gerar logo do app (IdiomaMeet)
- [x] Atualizar app.config.ts com branding
- [x] Copiar logo para todos os locais necessários
- [ ] Refinar cores e tipografia
- [ ] Validar design em iOS e Android

## Fase 8: Testes e Entrega
- [ ] Testes de fluxo de autenticação
- [ ] Testes de matchmaking
- [ ] Testes de videoconferência
- [ ] Testes de performance
- [ ] Build final para iOS e Android


## Fase 8: Integração Real do Jitsi Meet
- [x] NOVO: Instalar react-native-webview e expo-camera
- [x] NOVO: Configurar servidor Jitsi Meet (meet.jit.si público)
- [x] NOVO: Implementar geração de room ID único
- [x] NOVO: Integrar JitsiMeetView component na tela de videoconferência
- [x] NOVO: Adicionar permissões de câmera e microfone (iOS e Android)

## Fase 9: Design Elaborado e Sofisticado
- [x] NOVO: Atualizar tema com cores premium
- [x] NOVO: Melhorar home screen com cards animados
- [x] NOVO: Redesenhar tela de matching com perfis mais detalhados
- [x] NOVO: Adicionar gradientes e efeitos visuais
- [x] NOVO: Melhorar tipografia e espaçamento
- [x] NOVO: Adicionar ícones customizados


## Fase 10: Matchmaking Inteligente com Proficiência
- [x] NOVO: Criar formulário de proficiência de idioma (language-proficiency.tsx)
- [x] NOVO: Criar tela de busca "Procurando por parceiro..." (searching-partner.tsx)
- [x] NOVO: Integrar fluxo completo (home → proficiência → buscando → matching)
- [x] NOVO: Exibir nível do parceiro encontrado
- [ ] NOVO: Salvar nível de proficiência no banco de dados
- [ ] NOVO: Implementar algoritmo de matchmaking por nível no backend
