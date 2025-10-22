# app.py
from flask import Flask, render_template
import os
import time # Ezt adjuk hozzá

# Inicializáljuk a Flask alkalmazást
app = Flask(__name__)

# Létrehozunk egy "verzió" számot az aktuális időbélyegből.
# Ez minden szerver újraindításkor más lesz.
# pl.: 1678886400
APP_VERSION = str(int(time.time()))

@app.route('/')
def index():
    """
    Ez a fő útvonal.
    Betölti az 'index.html'-t, és átadja neki
    a 'version' változót a cache-bustinghoz.
    """
    return render_template('index.html', version=APP_VERSION)

if __name__ == '__main__':
    # A host='0.0.0.0' kulcsfontosságú
    app.run(debug=True, host='0.0.0.0', port=5000)
