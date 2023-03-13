# CIASIE_nodejs
NodeJS project

## Installation
1. Définition des variables d'environnement
```bash
cp .env.sample .env
```
2. Installation des dépendances
```bash
docker compose run --rm <CONTENEUR> npm install
```
3. Lancement du conteneur
```bash
docker compose up -d
```

## En cas de problème
1. Supprimer le conteneur
```bash
docker rm -f <CONTENEUR>
```
2. Supprimer les fichiers mysql
```bash
rm -rf ./db/data
```
3. Relancer le conteneur
```bash
docker compose up -d
```
4. Réinstaller les dépendances
```bash
docker compose run --rm <CONTENEUR> npm install
```

## Membres du groupe

### [Tristan BELMONT](https://github.com/MaegIins), ✨ The Front Master ✨
### [Kévin BULLY CIMBALURIA](https://github.com/TheRealEureka), 🦝 The Raton Master 🦝
### [Lucas FARRONI](https://github.com/lucasfarroni), 👨‍🦲 The Bald Master 👨‍🦲
### [Clément PERRIN](https://github.com/Alfiov), 😠 The Angry Master 😠
