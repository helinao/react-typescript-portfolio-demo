# Reacti ja TypeScripti portfoolio näidisrakendus

Koolitöö raames loodud portfoolio näidisrakendus, mille eesmärk on demonstreerida Reacti ja TypeScripti kasutamist veebirakenduse arendamisel. Rakendus võimaldab hallata profiiliandmeid, oskusi ja projekte ning kohandada kasutajaliidese seadeid.

## Kasutatud tehnoloogiad

- React
- TypeScript
- Vite
- Tailwind CSS
- Context API
- localStorage

## Projekti struktuur

- `src/components/` – Reacti komponendid
- `src/assets/images/` – rakenduses kasutatavad pildid
- `src/contexts/` – rakenduse konteksti ja seadete haldamine
- `src/App.tsx` – ühendab komponendid ning haldab rakenduse põhiandmeid
- `src/App.css`, `src/index.css` – rakenduse stiilid
- `src/main.tsx` – rakenduse sisenemispunkt
- `package.json` – projekti sõltuvused ja skriptid

## Rakenduse käivitamine

1. Klooni repositoorium:

   `git clone https://github.com/helinao/react-typescript-portfolio-demo.git`

2. Liigu projekti kausta:

   `cd react-typescript-portfolio-demo`

3. Paigalda sõltuvused:

   `npm install`

4. Käivita arendusserver:

   `npm run dev`

5. Ava terminalis kuvatud kohalik aadress brauseris.

## Rakenduse komponendid

- **Navigation** – navigeerimislingid ja mobiilivaate menüü.
- **ProfileCard** – kuvab profiilipildi, nime, ametinimetuse, tutvustuse ja kontaktandmete nupu.
- **PersonalInfoManager** – võimaldab profiiliandmeid muuta ja valideerida ning salvestab andmed `localStorage`'isse.
- **ContactButton** – võimaldab kuvada kontaktandmeid ja kopeerida neid lõikelauale.
- **SkillsSection** – oskuste sektsiooni kuvamine ja nähtavuse haldamine.
- **SkillsManager** – oskuste lisamine, eemaldamine, otsimine ja filtreerimine.
- **ProjectForm** – projektide lisamine, valideerimine, salvestamine ja filtreerimine.
- **Footer** – jalus koos kontaktandmete ja seadete paneeliga.
- **ThemeToggle** – heleda ja tumeda teema vahetamine.
- **SettingsPanel** – rakenduse kuvamisseadete muutmine.
- **Counter** – lehe vaatamiste loendamine `localStorage`'i abil.

## Andmete ja oleku haldamine

Rakenduses kasutatakse Reacti `useState`, `useEffect` ja `useContext` hook'e.

`App.tsx` haldab profiiliandmeid ja oskusi ning edastab need komponentidele propside kaudu.

Näiteks saab `ProfileCard` profiiliandmed ja nende muutmise funktsiooni ning edastab need edasi `PersonalInfoManager` komponendile. Kui kasutaja andmeid muudab, uuendatakse Reacti olekut ja kasutajaliides kuvab uusi väärtusi.

## localStorage kasutamine

Rakendus kasutab brauseri `localStorage`'it andmete säilitamiseks.

Salvestatakse:
- Profiiliandmed
- Oskused
- Projektid
- Kasutajaliidese seaded
- Lehe vaatamiste arv

Andmed säilivad pärast lehe värskendamist ja brauseri sulgemist, kuni kasutaja neid või brauseri salvestusandmeid ei kustuta. Andmeid ei sünkroonita erinevate seadmete ega brauserite vahel.

## Context API

Rakenduses kasutatakse `AppContext` konteksti, mis võimaldab jagada seadistusi komponentide vahel ilma neid igal tasemel propside kaudu edastamata.

`AppProvider` haldab:
- Rakenduse teemat (`light` / `dark`)
- Teema vahetamise funktsiooni `toggleTheme`
- Rakenduse seadeid (`settings`)
- Seadete muutmise funktsiooni `setSettings`

Komponendid kasutavad `useContext(AppContext)` hook'i, et pääseda ligi ühistele seadetele.

Näiteks määrab `settings.showProjects`, kas projektide sektsioon kuvatakse.

## Märkused

Tegemist on õppetöö raames loodud näidisrakendusega. Andmed salvestatakse kasutaja brauserisse ning rakendus ei kasuta eraldi back-end'i ega andmebaasi.
