## Todo list BDTI
Um crud de lista de tarefas frontend que cria, edita, exclui e separa por status as tarefas. Utiliza redux para controlar o estado e local storage para manter as informações, pois não conta com backend para armazenar as informações. 
## 🛠️ Ferramentas
- React
- Redux
- Docker
- Javascript
- Lint

## ⚙️ Como executar

Você precisa ter instalado as seguintes ferramentas: Git, Docker e Docker Compose, ou pode rodar localmente também se preferir.

- Clone o repositório em uma pasta de sua preferência rodando no terminal o comando:
```bash
git clone git@github.com:GiseleViedenhelfen/BDTI.git 
  ```
- Entre na pasta raiz do projeto e rode o comando docker-compose up  para subir a aplicação e docker-compose down para parar completamente a aplicação;

- Após rodar o comando, aguarde um pouco que a aplicação irá ficar disponivel na rota:
```bash
http://localhost:3000
  ```

- Caso prefira rodar localmente, navegue até a raiz do projeto e execute o comando npm install para instalar as dependências do projeto. Feito isso, execute o comando npm run e a aplicação estara disponível também na rota local 3000.