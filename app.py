# app.py
from flask import Flask, render_template, Response
import os

# Inicializáljuk a Flask alkalmazást
app = Flask(__name__)

@app.route('/')
def index():
    """ Főoldal betöltése """
    return render_template('index.html')


@app.route('/debug-js')
def debug_js():
    """
    DEBUG ÚTVONAL:
    Megpróbáljuk beolvasni a static/script.js fájlt a szerverről
    és kiírni a tartalmát.
    """
    # A fájl teljes elérési útjának lekérdezése a szerveren
    file_path = os.path.join(app.root_path, 'static', 'script.js')
    content = ""
    status = ""
    
    try:
        # Megpróbáljuk kiolvasni a fájl tartalmát
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        if not content:
            status = f"FÁJL SIKERESEN BEOLVASVA, DE ÜRES VOLT. (0 bájt)"
        else:
            status = f"FÁJL SIKERESEN BEOLVASVA (méret: {len(content)} bájt):"
            
    except FileNotFoundError:
        status = f"HIBA: A FÁJL NEM TALÁLHATÓ A VÁRT HELYEN!"
        content = f"Várt útvonal: {file_path}"
    except Exception as e:
        status = f"ÁLTALÁNOS HIBA A FÁJL OLVASÁSAKOR:"
        content = str(e)

    # Visszaadjuk a tartalmat sima szövegként (<pre> a formázás megtartásához)
    return Response(f"--- DEBUG SCRIPT.JS ---\n\n{status}\n\n--- TARTALOM ---\n{content}", mimetype='text/plain')


if __name__ == '__main__':
    # A host='0.0.0.0' kulcsfontosságú
    app.run(debug=True, host='0.0.0.0', port=5000)
