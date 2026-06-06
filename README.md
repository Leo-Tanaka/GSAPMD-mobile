# Space Mission Control - Aplicativo de Monitoramento Espacial

##  Descrição do Projeto
Este repositório armazena o código do aplicativo mobile responsável pela interface com os operadores de solo da missão espacial. O aplicativo consome a API Rest para enviar novos sinais de sensores via requisições POST, exibe gráficos e listas de monitoramento através de requisições GET com paginação, e permite a exclusão de dados com validações nativas e de ambiente.

A interface foi construída com foco em responsividade, usabilidade e feedback visual imediato.

---

##  Integrantes da Equipe
* **Enzo Raddatz** - RM: 556312
* **Francisco Ferrara Neto** - RM: 557209
* **Leonardo Tanaka Cortez** - RM: 556781

---

##  Tecnologias Utilizadas
* **Framework Base:** React Native (Ambiente gerenciado com Expo)
* **Linguagem Principal:** TypeScript
* **Cliente HTTP:** Axios
* **Navegação:** React Navigation (Native Stack Navigator)

---

##  Funcionalidades de Destaque
* **Painel Analítico de Métricas:** Cards superiores que somam automaticamente o número de módulos ativos, contagem de alertas graves e status geral da nave em tempo real.
* **Filtros por Status:** Botões (*Chips*) interativos na tela para filtrar a lista instantaneamente entre registros Normais, Alertas e Críticos.
* **Pull-to-Refresh:** Gestual de puxar a tela para baixo para sincronizar novos pacotes de dados sem precisar reiniciar a navegação.
* **Compatibilidade Híbrida (`Platform.OS`):** Sistema inteligente que detecta a execução em dispositivos físicos (usando alertas nativos do Android/iOS) ou navegadores web (usando pop-ups `window.confirm`), corrigindo falhas de execução comuns em ambiente Web.

---

##  Como Executar o App Mobile

### 1. Pré-requisitos
* Node.js (versão LTS) instalado.
* Aplicativo **Expo Go** instalado no celular (disponível na Google Play Store ou Apple App Store).

### 2. Configuração Crítica de IP (Integração)
Antes de rodar, o aplicativo precisa saber onde encontrar a API do backend.
1. Abra o arquivo `src/services/api.ts`.
2. Substitua o IP contido na constante `API_BASE_URL` pelo **IP local da sua máquina** na rede Wi-Fi (Exemplo: `http://192.168.1.50:8080/api`).
>  **Atenção:** O computador que roda o Spring Boot e o celular com o Expo Go **devem** obrigatoriamente estar conectados na mesma rede Wi-Fi.

### 3. Execução
1. Abra o terminal na raiz do projeto mobile e instale as dependências:
   ```bash
   npm install
2. Inicie o servidor do Expo
   ```bash
   npx expo start
3. Para testar:
   * No Celular: Abra o app Expo Go, escaneie o QR Code gerado no terminal do computador.
   * No Navegador (Web View): Pressione a tecla w no terminal para abrir o simulador web diretamente no browser.