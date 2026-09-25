/* ==========================================================================
   Habillage des diapositives aux couleurs de l'École Hexagone
   - ajoute les éléments décoratifs selon data-layout
   - ajoute le pied de page et le numéro de diapositive
   - ajoute un bouton « Copier » sur chaque bloc de code
   - initialise reveal.js
   ========================================================================== */
(function () {
  const script = document.currentScript;
  const assets = script.src.replace(/js\/hexagone\.js.*$/, "");
  const charte = assets + "charte/";

  const COULEURS_FOND = { titre: "#1E427C", sommaire: "#1E427C", section: "#1E427C", contenu: "#FFFFFF" };

  const DECORS = {
    titre: `<div class="panneau"></div><img class="logo" src="${charte}logo-hexagone.png" alt="École Hexagone">
            <img class="filigrane" src="${charte}filigrane.png" alt="">`,
    sommaire: `<div class="panneau"></div><img class="logo" src="${charte}logo-hexagone.png" alt="École Hexagone">
               <img class="filigrane" src="${charte}filigrane.png" alt="">`,
    section: `<div class="bande"></div><img class="embleme" src="${charte}embleme.png" alt="">
              <img class="filigrane" src="${charte}filigrane.png" alt="">`,
    contenu: `<div class="bande"></div><img class="embleme" src="${charte}embleme.png" alt="">
              <img class="hexagone" src="${charte}hexagone-ambre.png" alt="">`,
  };

  const piedDePage = document.body.dataset.pied || "";
  const diapos = [...document.querySelectorAll(".reveal .slides section")].filter(
    (s) => !s.querySelector("section")
  );

  diapos.forEach((diapo, index) => {
    const layout = diapo.dataset.layout || "contenu";
    diapo.classList.add("l-" + layout);
    diapo.dataset.backgroundColor = COULEURS_FOND[layout];

    const deco = document.createElement("div");
    deco.className = "deco";
    deco.setAttribute("aria-hidden", "true");
    deco.innerHTML = DECORS[layout];
    diapo.prepend(deco);

    if (layout === "contenu") {
      diapo.insertAdjacentHTML(
        "beforeend",
        `<div class="pied">${piedDePage}</div><div class="numero-diapo">${index + 1} / ${diapos.length}</div>`
      );
    }
  });

  document.querySelectorAll(".reveal pre").forEach((pre) => {
    const bouton = document.createElement("button");
    bouton.className = "copier";
    bouton.type = "button";
    bouton.textContent = "Copier";
    bouton.addEventListener("click", async () => {
      const code = pre.querySelector("code").innerText.replace(/^\$ /gm, "");
      try {
        await navigator.clipboard.writeText(code);
        bouton.textContent = "Copié !";
      } catch {
        bouton.textContent = "Échec";
      }
      setTimeout(() => (bouton.textContent = "Copier"), 1500);
    });
    pre.appendChild(bouton);
  });

  Reveal.initialize({
    width: 1280,
    height: 720,
    margin: 0,
    center: false,
    hash: true,
    controls: true,
    progress: true,
    transition: "fade",
    transitionSpeed: "fast",
    pdfSeparateFragments: false,
    plugins: [RevealHighlight, RevealNotes],
  });
})();
