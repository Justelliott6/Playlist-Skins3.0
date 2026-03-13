const embedInput = document.getElementById("embedInput");
const mediaFrame = document.getElementById("mediaFrame");
const loadEmbedBtn = document.getElementById("loadEmbedBtn");
const copyCodeBtn = document.getElementById("copyCodeBtn");
const outputCode = document.getElementById("outputCode");

function normalizeSpotifyUrl(url) {
  const cleaned = url.trim();

  if (!cleaned) {
    return "";
  }

  if (cleaned.includes("/embed/")) {
    return cleaned;
  }

  if (cleaned.includes("open.spotify.com/playlist/")) {
    return cleaned.replace("open.spotify.com/playlist/", "open.spotify.com/embed/playlist/");
  }

  if (cleaned.includes("open.spotify.com/album/")) {
    return cleaned.replace("open.spotify.com/album/", "open.spotify.com/embed/album/");
  }

  if (cleaned.includes("open.spotify.com/track/")) {
    return cleaned.replace("open.spotify.com/track/", "open.spotify.com/embed/track/");
  }

  return cleaned;
}

function buildEmbedCode(url) {
  return `<div class="boombox">
  <img src="assets/boom-box.png" alt="Boombox Skin">
  <div class="tuner-window">
    <iframe
      src="${url}"
      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
      loading="lazy"
      frameborder="0">
    </iframe>
  </div>
</div>`;
}

function loadPlayer() {
  const url = normalizeSpotifyUrl(embedInput.value);

  if (!url) {
    alert("Paste a Spotify or embed URL first.");
    return;
  }

  mediaFrame.src = url;
  outputCode.value = buildEmbedCode(url);
}

function copyEmbedCode() {
  outputCode.select();
  outputCode.setSelectionRange(0, 99999);
  document.execCommand("copy");
  alert("Embed code copied.");
}

loadEmbedBtn.addEventListener("click", loadPlayer);
copyCodeBtn.addEventListener("click", copyEmbedCode);

window.addEventListener("DOMContentLoaded", () => {
  const startingUrl = normalizeSpotifyUrl(embedInput.value);
  outputCode.value = buildEmbedCode(startingUrl);
});
