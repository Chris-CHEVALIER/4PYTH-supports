/* ==========================================================================
   Pages d'énoncé : coloration syntaxique, bouton « Copier », impression
   Utilise highlight.js fourni avec le plugin reveal.js (aucune dépendance en ligne)
   ========================================================================== */
(function () {
  const hljs = RevealHighlight().hljs;

  document.querySelectorAll("pre code").forEach((code) => {
    // Retire l'indentation commune et les lignes vides de début et de fin
    const lignes = code.textContent.replace(/^\n+|\s+$/g, "").split("\n");
    const retrait = Math.min(...lignes.filter((l) => l.trim()).map((l) => l.match(/^ */)[0].length));
    code.textContent = lignes.map((l) => l.slice(retrait)).join("\n");
    hljs.highlightElement(code);

    const bouton = document.createElement("button");
    bouton.className = "copier";
    bouton.type = "button";
    bouton.textContent = "Copier";
    bouton.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(code.innerText);
        bouton.textContent = "Copié !";
      } catch {
        bouton.textContent = "Échec";
      }
      setTimeout(() => (bouton.textContent = "Copier"), 1500);
    });
    code.parentElement.appendChild(bouton);
  });

  // À l'impression, les indices sont dépliés
  window.addEventListener("beforeprint", () => {
    document.querySelectorAll("details").forEach((d) => (d.open = true));
  });
})();
