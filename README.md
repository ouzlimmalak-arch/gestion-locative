# 🏠 Gestion locative

## Présentation du projet

**Gestion locative** est une application web conçue pour faciliter la gestion des biens immobiliers mis en location.

Elle permet de centraliser les informations relatives aux biens, aux locataires, aux baux, aux loyers et aux quittances dans une seule plateforme.

Ce projet est réalisé dans le cadre du module **Programmation Web Dynamique**.

## Objectifs

- Simplifier la gestion des biens immobiliers.
- Organiser les informations des locataires.
- Assurer le suivi des baux et des loyers.
- Faciliter la consultation des quittances.
- Proposer des espaces adaptés aux différents utilisateurs.

## Fonctionnalités

### Gestionnaire
- Consulter le tableau de bord.
- Ajouter, modifier et supprimer des biens.
- Gérer les locataires.
- Gérer les baux.
- Gérer les loyers et suivre leur état de paiement.
- Consulter les quittances.

### Locataire
- Se connecter à son espace personnel.
- Consulter ses loyers.
- Consulter ses quittances.

## Technologies utilisées

| Technologie | Utilisation |
|---|---|
| React.js | Développement du frontend |
| JavaScript | Logique de l'application |
| CSS | Mise en forme et design |
| Laravel | Backend prévu |
| MySQL | Base de données prévue |
| Docker | Conteneurisation et environnement de développement |
| Git et GitHub | Gestion des versions du projet |

## Structure du projet

```text
gestion-locative/
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── data/
│   │   ├── pages/
│   │   ├── App.js
│   │   └── App.css
│   ├── package.json
│   └── Dockerfile
│
├── compose.yaml
└── README.md
```

## Installation et lancement

### Prérequis
- Node.js
- npm
- Git

### Lancer le frontend

1. Cloner le dépôt :

```bash
git clone https://github.com/ouzlimmalak-arch/gestion-locative.git
```

2. Accéder au dossier frontend :

```bash
cd gestion-locative/frontend
```

3. Installer les dépendances :

```bash
npm install
```

4. Démarrer l'application :

```bash
npm start
```

5. Ouvrir le navigateur à l'adresse :

```text
http://localhost:3000
```

## État d'avancement

- [x] Création de l'interface frontend avec React.
- [x] Mise en place de l'authentification et des rôles.
- [x] Développement des pages de gestion.
- [x] Gestion des opérations d'ajout, de modification et de suppression.
- [x] Configuration initiale de Docker.
- [ ] Développement du backend avec Laravel.
- [ ] Connexion à la base de données MySQL.
- [ ] Communication entre le frontend et le backend.

## Auteur

Projet réalisé individuellement dans le cadre du module Programmation Web Dynamique.
