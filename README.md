<p align="center">
  <img src="fastfeet-web/src/assets/images/fastfeet-logo.png"/>
</p>

# FastFeet
![stacks](https://img.shields.io/badge/React.js--green) ![stacks](https://img.shields.io/badge/React%20Native--green) ![stacks](https://img.shields.io/badge/Redux--green)
![stacks](https://img.shields.io/badge/Node--blue) ![stacks](https://img.shields.io/badge/Sequelize--blue) ![stacks](https://img.shields.io/badge/Express.js--blue) ![stacks](https://img.shields.io/badge/JWT--blue)

<p align="center">
  <img src="uploads/banner.jpg"/>
</p>

## Tecnologias
```
- [x] NodeJS
- [x] Express
- [x] Sequelize
- [x] JWT
- [x] PostGress
```
```
- [x] ReactJS
- [x] Axios
- [x] Redux
- [x] React Router Dom
```
```
- [x] React Native
- [x] React Native Camera
- [x] React Navigation
```

## Sobre o Projeto
Aplicação completa (Back-end, Front-end e Mobile) de uma transportadora fictícia, com base no desafio em quatro etapas: 
```
- https://github.com/rocketseat-education/bootcamp-gostack-desafio-02
- https://github.com/rocketseat-education/bootcamp-gostack-desafio-03
- https://github.com/rocketseat-education/bootcamp-gostack-desafio-09
- https://github.com/rocketseat-education/bootcamp-gostack-desafio-10
```

### Web
<p align="center">
  <img src="uploads/gif-web.gif"/>
</p>
<p>A parte web tem o propósito de gerenciar a transpostadora e todos os seus módulos (entregadores, entregas,destinos e problemas).</p>
<p align="center">
  <img src="uploads/gerenciamento-encomendas-web.jpg"/>
</p>
<p align="center">
  <img src="uploads/gerenciamento-entregadores-web.jpg"/>
</p>

### APP
<p align="center">
  <img src="uploads/gif-app.gif"/>
</p>
<p>A parte mobile serve para o entregador gerenciar suas encomendas, relatar problemas e confirmar a entrega tirando uma foto da assinatura do destinatário.</p>
<p align="center">
  <img src="uploads/app-entregadores.jpg"/>
</p>

## Instalação
### Back-end 
```
cd fastfeet-backend
npm install
configurar o arquivo .envExample seguindo os passos, depois renomeie para ".env"
npx sequelize-cli db:migrate
npm run dev
```

### Fron-end (Web)
```
cd fastfeet-web
npm install
npm run start
```

### Fron-end (Mobile) `Requer o Android Studio + Emulador Android`
```
Abra o Emulador no Android Studio
cd fastfeetMobile
npx react-native run-android
