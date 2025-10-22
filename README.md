# GDrive Lejátszó

Egyszerű Flask alapú webalkalmazás, ami lehetővé teszi Google Drive megosztási linkekből származó videók lejátszását a böngészőben.

Fájlok létrehozva a projekt gyökerében:

- `app.py` — Flask alkalmazás fő fájlja
- `requirements.txt` — futtatáshoz szükséges csomagok
- `runtime.txt` — Render (platform) runtime jelzése (python-3.11)
- `templates/index.html` — a felhasználói felület
- `static/style.css` — egyszerű stílusok
- `static/script.js` — kliensoldali JS (Plyr integráció és GDrive link átalakítás)

Gyorsstart (helyi fejlesztés):

1. (Ajánlott) hozz létre és aktiválj egy virtuális környezetet:

```bash
python -m venv .venv
source .venv/bin/activate
```

2. Telepítsd a függőségeket:

```bash
pip install -r requirements.txt
```

3. Indítsd el az alkalmazást fejlesztői módban:

```bash
python app.py
```

4. Nyisd meg a böngészőt a `http://localhost:5000` címen.

Megjegyzések:
- A projekt kliensoldali lejátszóként a Plyr-t használja; az index.html CDN-ről tölti be a Plyr JS/CSS fájlokat.
- A Google Drive linkeket a `static/script.js` fájlban található `convertGDriveLink` függvény alakítja át közvetlen letöltési linkké.
- Az app futtatásához szükséges csomagok a `requirements.txt`-ben találhatók; ha a környezetedben nincsenek telepítve, a Python importok (pl. `flask`) hibát jeleznek.

Következő lépések, amit javaslok:
- Telepítsd a függőségeket és ellenőrizd újra a futtatást.
- (Opcionális) adj hozzá CORS/állomány-fejlesztéseket és hibakezelést a GDrive file streamelésre.
# Gdriveplayer