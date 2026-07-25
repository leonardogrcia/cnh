document.getElementById("userName").textContent = MOCK.user.firstName.toUpperCase();
document.getElementById("avatar").textContent = MOCK.user.initial;

function pad(n) {
  return String(n).padStart(2, "0");
}

function formatTimestamp(date) {
  const dd = pad(date.getDate());
  const mm = pad(date.getMonth() + 1);
  const yyyy = date.getFullYear();
  const hh = pad(date.getHours());
  const mi = pad(date.getMinutes());
  const ss = pad(date.getSeconds());
  return `${dd}/${mm}/${yyyy} - ${hh}:${mi}:${ss}`;
}

function updateTimestamp(key) {
  const el = document.querySelector(`.ts[data-ts="${key}"]`);
  if (el) el.textContent = formatTimestamp(new Date());
}

function showScreen(id) {
  document.querySelectorAll(".screen").forEach((s) => s.classList.remove("active"));
  document.getElementById(id).classList.add("active");
  window.scrollTo(0, 0);
}

function maskName(fullName) {
  return fullName
    .split(" ")
    .map((word) => word[0] + "*".repeat(word.length - 1))
    .join(" ");
}

function maskCPF(cpf) {
  return `***.${cpf.slice(3, 6)}.${cpf.slice(6, 9)}-**`;
}

function formatCPF(cpf) {
  return `${cpf.slice(0, 3)}.${cpf.slice(3, 6)}.${cpf.slice(6, 9)}-${cpf.slice(9, 11)}`;
}

function fillCondutorScreen() {
  const c = MOCK.condutor;
  document.getElementById("c-nome").textContent = maskName(c.fullName);
  document.getElementById("c-cpf").textContent = maskCPF(c.cpf);
  document.getElementById("c-sexo").textContent = c.sexo;
  document.getElementById("c-categoria").textContent = c.categoria;
  document.getElementById("c-uf").textContent = c.ufEmissao;
  document.getElementById("c-validade").textContent = c.dataValidade;
  document.getElementById("c-emissao").textContent = c.dataEmissao;
}

document.getElementById("card-condutor").addEventListener("click", () => {
  fillCondutorScreen();
  showScreen("screen-condutor");
});

document.getElementById("card-cnh").addEventListener("click", () => {
  updateTimestamp("cnh");
  showScreen("screen-cnh");
});

const cnhTrack = document.getElementById("cnh-track");
const cnhDots = document.querySelectorAll("#cnh-dots .dot");

if (cnhTrack) {
  cnhTrack.addEventListener("scroll", () => {
    const index = Math.round(cnhTrack.scrollLeft / cnhTrack.clientWidth);
    cnhDots.forEach((dot, i) => dot.classList.toggle("active", i === index));
  });
}

document.getElementById("card-veiculos").addEventListener("click", () => {
  updateTimestamp("veiculos");
  showScreen("screen-veiculos");
});

document.getElementById("card-infracoes").addEventListener("click", () => {
  updateTimestamp("infracoes");
  showScreen("screen-infracoes");
});

document.querySelectorAll("[data-back]").forEach((btn) => {
  btn.addEventListener("click", () => showScreen("screen-home"));
});

document.querySelectorAll("[data-reload]").forEach((btn) => {
  btn.addEventListener("click", () => updateTimestamp(btn.dataset.reload));
});

const fakeOverlay = document.getElementById("fake-loading-overlay");
const fakeLoadingState = document.getElementById("fake-loading-state");
const fakeErrorState = document.getElementById("fake-error-state");

document.querySelectorAll("[data-fake-action]").forEach((btn) => {
  btn.addEventListener("click", () => {
    fakeLoadingState.style.display = "flex";
    fakeErrorState.style.display = "none";
    fakeOverlay.classList.add("active");

    setTimeout(() => {
      fakeLoadingState.style.display = "none";
      fakeErrorState.style.display = "flex";

      setTimeout(() => {
        fakeOverlay.classList.remove("active");
      }, 2500);
    }, 10000);
  });
});
