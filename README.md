<div align="center">
  <img src="poocoo.svg" alt="Anagramator Logo" width="50" height="50">
  <h1>anagramator.pl</h1>
  <p>Minimalistyczny anagramator - wyszukiwarka słów z liter dla języka polskiego</p>
</div>

## Funkcje

- **Błyskawiczne wyszukiwanie** - wyniki w czasie rzeczywistym
- **Baza 3,3 mln słów** - najobszerniejsza baza słów polskich 
- **Proste w użyciu** - wpisz litery i gotowe
- **W pełni responsywne** - działa na wszystkich urządzeniach
- **Dark mode** - minimalistyczny ciemny motyw
- **PWA ready** - można zainstalować jako aplikacja

## Technologie

- **HTML5** - semantyczna struktura
- **CSS3** - responsywny design z `clamp()` i flexbox
- **Vanilla JavaScript** - bez zależności, czysty ES6+
- **API poocoo.pl** - backend dla wyszukiwania słów

## Struktura projektu

```
anagramator.pl/
├── index.html          # Główna struktura HTML
├── style.css           # Style aplikacji
├── app.js              # Logika aplikacji
├── poocoo.svg          # Logo
├── manifest.json       # Konfiguracja PWA
├── robots.txt          # Konfiguracja dla robotów
└── sitemap.xml         # Mapa strony
```

## Rozpoczęcie pracy

1. **Sklonuj repozytorium**
   ```bash
   git clone https://github.com/tjaworski997/anagramator.pl.git
   cd anagramator.pl
   ```

2. **Uruchom lokalnie**
   
   Wystarczy otworzyć `index.html` w przeglądarce lub użyć lokalnego serwera:
   
   ```bash
   # Python 3
   python -m http.server 8000
   
   # Node.js (npx)
   npx serve
   ```

3. **Otwórz w przeglądarce**
   ```
   http://localhost:8000
   ```

## Użycie

1. Wpisz litery (max 15 znaków) w polu tekstowym
2. Poczekaj 300ms (debounce) na automatyczne wyszukiwanie
3. Przeglądaj wyniki pogrupowane według długości słów
4. Kliknij **×** aby wyczyścić pole

## Personalizacja

### Kolory

Edytuj zmienne w `style.css`:

```css
/* Kolory główne */
background-color: #1a1a1a;  /* Tło */
color: #e0e0e0;             /* Tekst */
color: #4a9eff;             /* Akcent (niebieski) */
```

### API Endpoint

Zmień w `app.js`:

```javascript
const API_URL = 'https://api.poocoo.pl/api/v1/words-from-letters';
```


## Licencja

Ten projekt jest open source i dostępny na licencji MIT.

## Linki

- **Demo**: [anagramator.pl](https://anagramator.pl)
- **API Docs**: [api.poocoo.pl](https://api.poocoo.pl)
- **Krzyżówki**: [haslator.pl](https://haslator.pl)
- **Zaawansowane** wyszukiwanie słów dla scrabble i literaki: [poocoo.pl](https://poocoo.pl)







