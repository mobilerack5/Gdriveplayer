// static/script.js

// Megvárjuk, amíg az egész oldal betöltődik
document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Elemek kigyűjtése
    const videoElement = document.getElementById('player');
    const loadButton = document.getElementById('load-button');
    const videoLinkInput = document.getElementById('video-link');
    const subtitleLinkInput = document.getElementById('subtitle-link');

    // 2. A Plyr lejátszó inicializálása
    // Beállítjuk, hogy a feliratok alapból aktívak legyenek
    const player = new Plyr(videoElement, {
        captions: { active: true, update: true, language: 'hu' }
    });
    
    // Globálisan elérhetővé tesszük (könnyebb debuggolni)
    window.player = player;

    // 3. Funkció: GDrive link átalakítása
    /**
     * Átalakítja a Google Drive megosztási linket
     * közvetlen letöltési linkké.
     * pl. .../file/d/FILE_ID/view -> .../uc?export=download&id=FILE_ID
     */
    function convertGDriveLink(shareLink) {
        if (!shareLink || !shareLink.includes('drive.google.com')) {
            return null;
        }
        
        // Reguláris kifejezés a FÁJL ID kinyeréséhez
        // Kezeli a "/d/FILE_ID/view" és a "/uc?id=FILE_ID" formátumokat is
        const regex = /\/d\/(.*?)\/|\/uc\?id=(.*?)(&|$)/;
        const match = shareLink.match(regex);
        
        if (match && (match[1] || match[2])) {
            const fileId = match[1] || match[2];
            return `https://drive.google.com/uc?export=download&id=${fileId}`;
        } else {
            console.warn("Nem sikerült kinyerni a FÁJL ID-t a linkből:", shareLink);
            return null;
        }
    }

    // 4. Eseménykezelő a "Betöltés" gombra
    loadButton.addEventListener('click', () => {
        const videoShareLink = videoLinkInput.value.trim();
        const subtitleShareLink = subtitleLinkInput.value.trim();
        
        // Átalakítjuk a linkeket
        const directVideoLink = convertGDriveLink(videoShareLink);
        
        if (!directVideoLink) {
            alert("Érvénytelen videó link!");
            return;
        }

        // Felirat kezelése
        let tracks = [];
        const directSubtitleLink = convertGDriveLink(subtitleShareLink);
        
        if (directSubtitleLink) {
            // Megpróbáljuk kitalálni a típust a beírt link alapján
            // (Bár a Plyr okos, és általában magától is rájön)
            let subtitleType = 'srt'; // Alapértelmezett
            if (subtitleLinkInput.value.toLowerCase().includes('.vtt')) {
                subtitleType = 'vtt';
            }

            tracks.push({
                kind: 'subtitles',
                label: 'Felirat (GDrive)',
                srclang: 'hu', // Magyar nyelvre állítjuk
                src: directSubtitleLink,
                default: true // Legyen ez az alapértelmezett felirat
            });
            console.log(`Felirat betöltése (${subtitleType}): ${directSubtitleLink}`);
        }
        
        // 5. A Plyr lejátszó forrásának frissítése
        // A Plyr 'source' API-ja kezeli a videó és a feliratok egyidejű betöltését
        player.source = {
            type: 'video',
            title: 'GDrive Videó',
            sources: [
                {
                    src: directVideoLink,
                    // Feltételezzük, hogy mp4, de a GDrive kezeli a MIME type-ot
                    // és a böngésző is felismeri.
                    type: 'video/mp4' 
                }
            ],
            tracks: tracks // Itt adjuk át a felirat listát
        };
        
        console.log(`Videó betöltése: ${directVideoLink}`);
        
        // Opcionális: automatikus lejátszás a betöltés után
        // player.play();
    });
});
