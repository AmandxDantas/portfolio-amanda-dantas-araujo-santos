### SM6 - Engenharia de Software e IA com Bubble.io

### 🔧 Engenharia de Software e IA com Bubble.io

O sistema foi inicialmente desenvolvido utilizando a plataforma Bubble, que, por ser proprietária, não permite a exportação direta do código-fonte da aplicação. Essa característica pode gerar dependência tecnológica (vendor lock-in), limitando a escalabilidade e a flexibilidade da solução a longo prazo.

Para mitigar esse risco, foi considerada uma abordagem alternativa baseada na utilização da Data API do Bubble, que possibilita a extração dos dados estruturados das tabelas no formato JSON. Essa estratégia permite desacoplar a camada de dados da plataforma original, viabilizando a migração progressiva do sistema.

Os dados extraídos podem ser consumidos por uma nova aplicação desenvolvida em uma arquitetura tradicional, utilizando tecnologias amplamente adotadas no mercado, como React no front-end e Node.js no back-end. Essa transição garante maior controle sobre o código, melhor desempenho e maior liberdade para evolução futura da aplicação.

Como prova de conceito, o sistema pode ser acessado em ambiente de testes por meio do seguinte link:
https://sistema-oramento-58920.bubbleapps.io/version-test?debug_mode=true
