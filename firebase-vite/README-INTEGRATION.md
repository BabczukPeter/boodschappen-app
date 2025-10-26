# Integratie in bestaande repo (CRA + Vite naast elkaar)

Deze map is een **Vite + Firebase v10** versie van je boodschappen-app. Je kunt ze **naast** je bestaande Create React App blijven gebruiken in dezelfde Git repository.

## Aanpak
1. Plaats de map `firebase-vite/` in de root van je bestaande repo `~/Projects/boodschappen-app`.
2. Commit de nieuwe map:
   ```bash
   cd ~/Projects/boodschappen-app
   git add firebase-vite
   git commit -m "Add Vite+Firebase app alongside CRA"
   ```
3. Installeer en run de Vite-app (zonder je CRA te breken):
   ```bash
   cd firebase-vite
   npm install
   npm run dev
   ```
4. CRA blijft bruikbaar met `npm start` in de repo-root, Vite met `npm run dev` in `firebase-vite/`.

## Firebase
- Schakel **Auth (Email/Password)** en **Firestore** in via Firebase Console.
- Pas desgewenst `src/firebase.config.js` aan of verplaats naar `.env.local` met Vite `import.meta.env` variabelen.

## Security Rules
Gebruik de rules uit je handoff-document en deploy ze via de Console of Firebase CLI.

## Volgende stappen
- Koppel echte suggesties (productFrequency) in Firestore.
- Eventueel PWA/Offline toevoegen.
- Delen van lijsten / multi-user lijsten uitbreiden.
