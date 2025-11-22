document.addEventListener("DOMContentLoaded", function () {
  const setNameBtn = document.getElementById("setNameBtn");
  const inputName = document.getElementById("inputName");
  const welcomeName = document.getElementById("welcomeName");

  if (setNameBtn && inputName && welcomeName) {
    setNameBtn.addEventListener("click", () => {
      const v = inputName.value.trim();
      if (!v) {
        inputName.classList.add("error");
        inputName.style.borderColor = "#b91c1c";
        setTimeout(() => {
          inputName.style.borderColor = "";
          inputName.classList.remove("error");
        }, 1200);
        return;
      }
      const safe = v.replace(/</g, "&lt;").replace(/>/g, "&gt;");
      welcomeName.textContent = safe;
    });
  }

  const form = document.getElementById("contactForm");
  const errName = document.getElementById("err-name");
  const errDob = document.getElementById("err-dob");
  const errMessage = document.getElementById("err-message");
  const resultPanel = document.getElementById("resultPanel");
  const resultContent = document.getElementById("resultContent");
  const resultText = document.getElementById("resultText");
  const currentTimeEl = document.getElementById("currentTime");
  const randomNumberEl = document.getElementById("randomNumber");
  const browserInfoEl = document.getElementById("browserInfo");
  const clearBtn = document.getElementById("clearBtn");

  function showError(el) {
    if (el) el.hidden = false;
  }
  function hideError(el) {
    if (el) el.hidden = true;
  }

  function validateEmailFake() {
    return true;
  }

  form.addEventListener("submit", function (ev) {
    ev.preventDefault();

    const name = (form.querySelector("#name").value || "").trim();
    const dob = (form.querySelector("#dob").value || "").trim();
    const gender =
      (form.querySelector('input[name="gender"]:checked') || {}).value || "";
    const message = (form.querySelector("#messageText").value || "").trim();

    hideError(errName);
    hideError(errDob);
    hideError(errMessage);

    let ok = true;
    if (!name) {
      showError(errName);
      ok = false;
    }
    if (!dob) {
      showError(errDob);
      ok = false;
    }
    if (!message) {
      showError(errMessage);
      ok = false;
    }
    if (!ok) return;

    const now = new Date();
    const nowStr = now.toLocaleString();

    const rand = Math.floor(Math.random() * 9000000) + 1000000;

    const ua = navigator.userAgent || "Unknown";

    const out = [
      `Nama           : ${name}`,
      `Tanggal Lahir  : ${dob}`,
      `Jenis Kelamin  : ${gender}`,
      `Pesan          : ${message}`,
    ].join("\n");

    resultText.textContent = out;
    currentTimeEl.textContent = nowStr;
    randomNumberEl.textContent = rand;
    browserInfoEl.textContent = ua;

    resultContent.classList.remove("hidden");
    resultPanel.scrollIntoView({ behavior: "smooth", block: "center" });
  });

  if (clearBtn) {
    clearBtn.addEventListener("click", function () {
      form.reset();
      resultContent.classList.add("hidden");
      resultText.textContent = "";
      currentTimeEl.textContent = "";
      randomNumberEl.textContent = "";
      browserInfoEl.textContent = "";
      hideError(errName);
      hideError(errDob);
      hideError(errMessage);
    });
  }
});
