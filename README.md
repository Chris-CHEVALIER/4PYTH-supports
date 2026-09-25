# Supports 4PYTH – version web

Supports de cours et de TP au format HTML (reveal.js), aux couleurs de la charte École Hexagone.
Tout fonctionne hors ligne : reveal.js est inclus dans `assets/vendor/`.

## Arborescence

```
web/
├── cours/            présentations (une par cours)
├── pdf/              exports PDF à déposer sur Wimi
└── assets/
    ├── css/hexagone.css   thème (charte graphique)
    ├── js/hexagone.js     habillage automatique + initialisation reveal.js
    ├── charte/            logo, emblème, filigrane, hexagone (issus du modèle PowerPoint)
    └── vendor/reveal/     reveal.js 5.2 (licence MIT)
```

## Présenter

Ouvrir le fichier HTML dans un navigateur.

| Touche | Action |
|---|---|
| `→` / `Espace` | diapo suivante |
| `S` | vue intervenant (notes, chronomètre, diapo suivante) |
| `F` | plein écran |
| `Échap` | vue d'ensemble |

## Écrire une diapo

Chaque `<section>` est une diapo. L'attribut `data-layout` choisit la mise en page du modèle :

| `data-layout` | Mise en page |
|---|---|
| *(absent)* | contenu : `<h2>` pour le titre, puis `<div class="corps">` |
| `titre` | titre du support ou « Des questions ? » : `<h1>` + `<div class="sous-titre">` |
| `sommaire` | `<h1>` + `<ol>` (numérotation #1, #2… automatique) |
| `section` | intercalaire : `<div class="numero">#1</div>` + `<h2>` + `<div class="sous-titre">` |

Composants disponibles dans `.corps` : `ul` (puces hexagonales), `table`, `.colonnes` / `.colonnes.c3`,
`.carte` (`.pleine`, `.ambre`), `.encadre` (`.marine`), `.etiquette`, `.frise` / `.etape`.

Code : `<pre data-titre="exemple.py"><code class="language-python" data-trim>…</code></pre>`.
Ajouter `data-line-numbers="2|4-5"` sur `<code>` pour surligner des lignes étape par étape.

Notes de l'intervenant : `<aside class="notes">…</aside>` dans la diapo.

## Exporter en PDF

```bash
pip install websocket-client
python outils/exporter_pdf.py web/cours/0-organisation-du-module.html web/pdf/0-organisation-du-module.pdf
```

Alternative manuelle : ouvrir `…html?print-pdf` dans Chrome, puis Imprimer → Enregistrer au format PDF (marges : aucune, graphiques d'arrière-plan : activés).
