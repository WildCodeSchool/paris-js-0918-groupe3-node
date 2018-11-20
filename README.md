# paris-js-0918-groupe3-node

## BDD

Pensez à conserver sur Github votre dump de base de données.
Vous pouvez le faire avec la commande `mysqldump` ou _via_ [MySQL Workbench](https://www.mysql.com/fr/products/workbench/).

## Node

Pensez à faire votre serveur express dans un fichier `app.js` pour que tout le monde parte de la même base. 

Pensez également à faire votre fichier avec votre connexion de base de données. Vous pouvez importer ce fichier (_via_ le `require`) dans votre `app.js` cependant ce fichier doit être dans votre `.gitignore`. 

Dans un premier temps vous pourrez placer toutes vos routes dans ce fichier, par la suite il faudra les diviser en plusieurs fichier ; vous pouvez voir un exemple [ici](http://expressjs.com/en/guide/routing.html) dans la section `express.Router`. 

## Branches

Pensez à faire un 
```
git checkout -b dev 
git push origin dev
``` 
pour initialiser votre `dev`. 

Pensez à créer une branche `database` avec vos premiers fichiers :
* app.js 
* dump.sql 

Puis à faire une une _pull_ _request_ vers la branch `dev`, vous partirez tous ainsi de la base.

## Gitignore

Pensez à faire un fichier `.gitignore` (e.g : avec http://gitignore.io) en ajoutant bien votre fichier de connexion à votre base de données dedans. 

## Security 

Pensez à jeter un œil sur les détails sur la sécurité côté node : http://expressjs.com/en/advanced/best-practice-security.html. 
