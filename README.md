# CIASIE_nodejs
NodeJS project

## Installation
1. Définition des variables d'environnement
```bash
cp .env.sample .env
```
2. Installation des dépendances
```bash
docker compose run --rm api_order npm install
docker compose run --rm api_auth npm install
docker compose run --rm gateway npm install
```
3. Lancement du conteneur
```bash
docker compose up -d
```
4. La Gateway est accessible sur le port 3000

## En cas de problème
1. Supprimer le conteneur
```bash
docker rm -f <CONTENEUR>
```
2. Supprimer les fichiers générés
```bash
rm -rf ./dbs/db_order/data
rm -rf ./dbs/db_auth/data

rm -rf ./services/api_order/node_modules
rm -rf ./services/api_auth/node_modules
rm -rf ./gateway/node_modules
```
3. Réinstaller les dépendances
```bash
docker compose run --rm api_order npm install
docker compose run --rm api_auth npm install
docker compose run --rm gateway npm install
```
4. Créer les clés RSA

   * Aller sur https://travistidwell.com/jsencrypt/demo/
   * Générer une clé RSA de 2048 bits
   * Copier la clé privée dans le fichier ./services/api_auth/private.key
   * Copier la clé publique dans le fichier ./services/api_auth/public.key

5. Relancer le conteneur
```bash
docker compose up -d
```

6: le td9 Sur Directus est accessible sur la branche directus . 

## Membres du groupe

### [Tristan BELMONT](https://github.com/MaegIins), ✨ The Front Master ✨
### [Kévin BULLY CIMBALURIA](https://github.com/TheRealEureka), 🦝 The Raton Master 🦝
### [Lucas FARRONI](https://github.com/lucasfarroni), 👨‍🦲 The Bald Master 👨‍🦲
### [Clément PERRIN](https://github.com/Alfiov), 😠 The Angry Master 😠
