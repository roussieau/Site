# Projet LSINF122 - Développement d'un site web avec Node.js
## Julian Roussieau et Sébastien Strebelle

### Initialisation
Avant de pouvoir lancer l'application, il faut s'assurer d'avoir installé tous les modules nécessaires. Pour cela, il suffit de lancer la commande `$ npm install`.

Ensuite, il est nécessaire d'initialiser la base de données. Pour cela il est d'abord nécessaire de lancer le serveur MongoDB. Pour cela, il faut lancer la commande `$ mongod --dbpath data`. Ensuite il faut lancer le script d'installation en lançant `$ node install.js`.

### Lancement de l'application
Afin de pouvoir lancer l'application, il faut d'abord s'assurer que la base de données est lancé. Comme avant, il suffit de faire `$ mongod --dbpath data`.

Ensuite pour lancer le serveur, il suffit de lancer la commande `$ npm start`. L'application est alors lancée et est accessible en local à l'url [localhost:3000](localhost:3000).
