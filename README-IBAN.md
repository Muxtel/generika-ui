# Utilisation du composant 
import { GenerikaAdd } from "@duglass/generika";

# Build
/package/generika/ pnpm run build


# Publier localement
cd packages/generika
pnpm build ou builder en outrepassant les erreur : `tsc --noEmit false`
npx yalc publish --private

# Installer depuis publication locale
cd frontend
npx yalc add @duglass/generika
npm install

# Pour faire évoluer : changer, builder, pousser
cd packages/generika 
pnpm build  # ou `npm run build` si tu as bien ton script ou builder en outrepassant les erreur : `tsc --noEmit false`
npx yalc push

# Séquence actualisation frontend
npx yalc remove @duglass/generika
rm  ./node_modules/.vite
npm install
npx yalc add @duglass/generika



# Chercher des résidus  
Get-ChildItem -Recurse -Filter "*generika*"



# Publier sur NPM
cd packages/generika
npm login
npm publish --access public


# Utiliser configure la base SQLITE en ligne de commandes
( j'ai fais `pip install sqlite-web`)

`sqlite_web ./backend/data/app.db`