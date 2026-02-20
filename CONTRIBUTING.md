# CONTRIBUTING

## 🚀 Workflow de contribution

1. **Fork & clone** le repo
2. **Crée une branche** descriptive :
   - `feature/nom-fonctionnalite`
   - `fix/bug-description`
   - `chore/nom-tache`
3. **Développe** sur ta branche
4. **Teste** localement (voir scripts ci-dessous)
5. **Respecte les conventions** (voir plus bas)
6. **Push** ta branche
7. **Ouvre une Pull Request** (PR) claire et concise
8. **Attends la review** et corrige si besoin

## 🛠️ Scripts utiles

Dans chaque dossier (`web` ou `api`) :

- Installer :
  ```bash
  pnpm install
  ```
- Lancer le dev :
  ```bash
  pnpm dev
  ```
- Linter :
  ```bash
  pnpm lint
  ```
- Build :
  ```bash
  pnpm build
  ```
- Preview prod :
  ```bash
  pnpm preview
  ```

## 🎨 Conventions BEM & SCSS

- Utilise la méthodologie **BEM** pour nommer les classes CSS/SCSS :
  - `.block__element--modifier`
  - Exemple : `.card__title--active`
- Structure SCSS :
  - Variables dans `styles/_variables.scss`
  - Mixins/fonctions dans `styles/_base.scss`
  - Styles globaux dans `styles/main.scss`
- Préfère les imports SCSS plutôt que CSS
- Pas de styles inline dans les composants React

## 🔒 Règles CI

- Les PR sont vérifiées par l'intégration continue (CI) :
  - Lint (`pnpm lint`) obligatoire
  - Build (`pnpm build`) doit passer
  - Tests (si présents) doivent réussir
- Les branches doivent être à jour avec `main` avant merge
- Les commits doivent être clairs et atomiques

## 📝 Bonnes pratiques

- Commente le code complexe
- Privilégie la lisibilité
- Respecte la structure des dossiers
- Nomme les fichiers et variables de façon explicite

---
Pour toute question, contacte un mainteneur ou consulte les autres README.
