<h1 align="center">Go-Barber</h1>

<p align="center">
  <img width="260" height="200" src="img/logo.png">
</p>

<h1 align="center">:page_with_curl: Descrição do Projeto</h1>

<a href="https://github.com/LeandKa/Go-barberFrontEnd">Parte front-end aqui</a>

<p>Sistema baseado no Bootcamp da Rocketseat GoStack 11 teve o intuito de fortalecer os conhecimentos em ReactJs,Nodejs e React Native utilizando um projeto full-stack que consiste
em um serviço de cabeleleiros sendo a parte web para o uso do provedor de serviço aonde ele pode ver quem esta agendado para determinado horario e dia. A mobile para o usuario final ver os provedores
disponiveis e poder agendar com os mesmo.</p>


<p align="center">
  <img width="500" height="400" src="img/gif.gif">
</p>


<h1 align="center">:computer: Tecnologias</h1>

<ul>
    <li><a href="https://pt-br.reactjs.org/">ReactJs</a></li>
    <li><a href="https://styled-components.com/">StyleComponents</a></li>
    <li><a href="https://github.com/axios/axios">Axios</a></li>
    <li><a href="https://redux.js.org/">Redux</a></li>
  <li><a href="https://eslint.org/">Eslint</a></li>
  <li><a href="https://prettier.io/">Prettier</a></li>
  <li><a href="https://www.npmjs.com/package/history">History</a></li>
  <li><a href="https://date-fns.org/">Date-fns</a></li>
  <li><a href="https://www.npmjs.com/package/prop-types">Prop-types</a></li>
  <li><a href="https://github.com/unform/unform">Unform</a></li>
  <li><a href="https://github.com/fkhadra/react-toastify">React-Toastify</a></li>
  <li><a href="https://github.com/jquense/yup">Yup</a></li>
  <li><a href="https://redux-saga.js.org/">Redux Saga</a></li>
  <li><a href="https://reactnative.dev/">React Native</a></li>
  <li><a href="https://www.docker.com/">Docker</a></li>
  <li><a href="https://nodejs.org/en/">Nodejs</a></li>
  
</ul>

<h1 align="center"> 
	:books: Instruções 
</h1>

	Após as configurações abaixo veja o arquivo .env examplo para substituir as variaveis

<p>Primeiro precisa ser criado dois container no docker um para o servidor Mysql e o um de Redis que sera usado para o servidor de Email com o nodeMailer </p>

```
# Instale uma imagem do Redis
docker run --name redis-gobarber -p 6379:6379 -d -t redis:alpine

# Instale uma imagem do MYSQL
docker run --name gobarber -e MYSQL_PASSWORD=root -p 3306:3306 -d mysql

# Inicie o Redis
docker start redis-gobarber

# Inicie o Mysql
docker start gobarber
```

<h1>Iniciando o Back End</h1>

```
# Após te baixado o repositorio 
yarn ou npm install

#Inicialize o Sequelize e rode a seguinte sequencia de comandos para rodar as migrations e seeders no seu banco 

yarn sequelize db:migrate
yarn sequelize db:seed:all

# Iniciando o BackEnd
yarn dev ou Npm run dev

# Iniciando a queue
yarn queue ou npm run queue

```


<h1>Iniciando o Front-End</h1>

```
# Após te baixado o repositorio 
yarn ou npm install

#Simplesmente rode o comando abaixo

yarn start ou npm run start

```


<h1>Iniciando o Mobile</h1>

```
# Após te baixado o repositorio 
yarn ou npm install

#Simplesmente rode o comando abaixo

yarn start ou npm run start

```


