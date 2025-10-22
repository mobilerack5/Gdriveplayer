# app.py
from flask import Flask, render_template

# Inicializáljuk a Flask alkalmazást
app = Flask(__name__)

@app.route('/')
def index():
    """
    Ez a fő útvonal.
    Amikor a felhasználó megnyitja a weboldal gyökerét ("/"),
    ez a funkció lefut, és betölti az 'index.html' fájlt a 'templates' mappából.
    """
    return render_template('index.html')

if __name__ == '__main__':
    """
    Ez a rész csak akkor fut, ha közvetlenül a 'python app.py' paranccsal
    indítod a szkriptet (helyi teszteléshez).
    A Render egy 'gunicorn' nevű programot fog használni helyette.
    """
    app.run(debug=True, host='0.0.0.0', port=5000)
