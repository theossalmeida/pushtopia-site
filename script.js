(function () {
  const config = window.PUSHTOPIA_CONFIG || {};
  const betaUrl = typeof config.betaDownloadUrl === "string" ? config.betaDownloadUrl.trim() : "";
  const loginUrl = typeof config.loginUrl === "string" ? config.loginUrl.trim() : "";
  const betaLinks = document.querySelectorAll("[data-beta-link]");
  const loginLinks = document.querySelectorAll("[data-login-link]");
  const betaStatus = document.querySelector("[data-beta-status]");
  const betaCopy = document.querySelector("[data-beta-copy]");
  const loginCopy = document.querySelector("[data-login-copy]");

  betaLinks.forEach(function (link) {
    if (betaUrl) {
      link.href = betaUrl;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      link.textContent = "Download the beta";
    } else {
      link.setAttribute("aria-disabled", "true");
      link.addEventListener("click", function (event) { event.preventDefault(); });
    }
  });

  if (betaUrl) {
    if (betaStatus) betaStatus.textContent = "The beta installer is ready. Download and try the macOS MVP.";
    if (betaCopy) betaCopy.textContent = "The macOS beta is ready for testing. Download the installer and meet your companion.";
  }

  loginLinks.forEach(function (link) {
    if (loginUrl) {
      link.href = loginUrl;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      link.textContent = "Log in ↗";
    } else {
      link.setAttribute("aria-disabled", "true");
      link.addEventListener("click", function (event) { event.preventDefault(); });
    }
  });

  if (loginUrl && loginCopy) loginCopy.textContent = "Web login is available through the configured link. The macOS MVP still uses GitHub OAuth App Device Flow inside the app.";
})();
