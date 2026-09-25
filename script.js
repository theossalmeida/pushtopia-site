(function () {
  const config = window.PUSHTOPIA_CONFIG || {};
  const betaUrl = typeof config.betaDownloadUrl === "string" ? config.betaDownloadUrl.trim() : "";
  const loginUrl = typeof config.loginUrl === "string" ? config.loginUrl.trim() : "";

  const setLinks = (selector, url, fallback, activeLabel) => document.querySelectorAll(selector).forEach((link) => {
    if (url) {
      link.href = url;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      link.textContent = activeLabel;
    } else {
      link.setAttribute("aria-disabled", "true");
      link.addEventListener("click", (event) => event.preventDefault());
      if (fallback) link.textContent = fallback;
    }
  });

  setLinks("[data-beta-link]", betaUrl, "Beta download coming soon", "Download the beta");
  setLinks("[data-login-link]", loginUrl, "Login is not available yet", "Log in ↗");

  if (betaUrl) {
    document.querySelector("[data-beta-status]").textContent = "The beta installer is ready. Download and try the macOS app.";
    document.querySelector("[data-beta-copy]").textContent = "The macOS beta is ready for testing. Download the installer and meet your companion.";
  }

  if (loginUrl) {
    document.querySelector("[data-login-copy]").textContent = "Web login is available through the configured link. GitHub sign-in for the macOS app happens inside the app.";
  }

  const names = { dog: "Brita", cat: "Boomie", shark: "Haze", eagle: "Bono" };
  const pet = { id: "dog", indicators: { satiety: 70, health: 80, happy: 60 } };
  const mood = () => {
    const { satiety, health, happy } = pet.indicators;
    if (satiety === 0 && health === 0 && happy === 0) return "exhausted";
    if (health < 30) return "sick";
    if (happy < 30 || satiety < 20) return "sad";
    if (happy >= 70 && health >= 50 && satiety >= 40) return "happy";
    return "neutral";
  };

  const updatePet = () => {
    const state = mood();
    const sprite = document.querySelector("[data-pet-sprite]");
    sprite.src = `assets/sprites/${pet.id}/${state}.png`;
    sprite.alt = `${names[pet.id]}, ${state} ${pet.id}`;
    document.querySelector("[data-pet-label]").textContent = pet.id;
    document.querySelector("[data-mood]").textContent = state;
    for (const [key, value] of Object.entries(pet.indicators)) {
      document.querySelector(`[data-stat="${key}"]`).value = value;
      document.querySelector(`[data-bar="${key}"]`).style.setProperty("--value", `${value}%`);
    }
    document.querySelectorAll("[data-selected-name]").forEach((node) => {
      node.textContent = names[pet.id];
    });
  };

  document.querySelectorAll("[data-pet]").forEach((button) => button.addEventListener("click", () => {
    pet.id = button.dataset.pet;
    document.querySelectorAll("[data-pet]").forEach((choice) => {
      choice.classList.toggle("selected", choice === button);
    });
    updatePet();
  }));

  updatePet();
})();
