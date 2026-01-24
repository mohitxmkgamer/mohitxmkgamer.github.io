/* ---------------- CONFIG ---------------- */
const ADMINS = [
  { username: "hotice", password: "Iamyou!123" },
  { username: "director", password: "Ashok$123" }
];

const OPEN_HOUR = 18;
const CLOSE_HOUR = 22;

/* ---------------- DEVICE ID ---------------- */
const deviceId = localStorage.getItem("deviceId") || crypto.randomUUID();
localStorage.setItem("deviceId", deviceId);

let blockedDevices = JSON.parse(localStorage.getItem("blockedDevices")) || [];

/* ---------------- PERSISTENT STATUS ---------------- */
let manualMode = JSON.parse(localStorage.getItem("manualMode")) || false;
let forcedStatus = localStorage.getItem("forcedStatus") || null;

/* ---------------- DARK MODE AUTO ---------------- */
document.body.classList.add(
  window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
);

/* ---------------- ELEMENTS ---------------- */
const statusText = document.getElementById("statusText");
const statusIcon = document.getElementById("statusIcon");
const adminPanel = document.getElementById("adminPanel");
const blockedList = document.getElementById("blockedList");

/* ---------------- STATUS UPDATE ---------------- */
function applyStatus(text, color, pulse=false) {
  statusText.innerText = text;
  statusIcon.style.color = color;
  statusIcon.classList.remove("pulse");
  if (pulse) statusIcon.classList.add("pulse");
}

function autoStatus() {
  const now = new Date();
  const h = now.getHours();

  if (h >= OPEN_HOUR && h < CLOSE_HOUR) {
    applyStatus("We are OPEN 🟢", "lime", true);
  } else {
    applyStatus("We are CLOSED 🔴", "red");
  }
}

function updateStatus() {
  if (manualMode) {
    switch (forcedStatus) {
      case "open": applyStatus("We are OPEN 🟢", "lime", true); break;
      case "closed": applyStatus("We are CLOSED 🔴", "red"); break;
      case "closedToday": applyStatus("Closed Today ❌", "red"); break;
      case "openingSoon": applyStatus("Opening Soon ⏰", "orange"); break;
      case "closingSoon": applyStatus("Closing Soon ⚠️", "yellow"); break;
    }
  } else {
    autoStatus();
  }
}

/* ---------------- ADMIN LOGIN ---------------- */
document.getElementById("loginBtn").onclick = () => {
  const u = document.getElementById("usernameInput").value;
  const p = document.getElementById("passwordInput").value;

  if (blockedDevices.find(d => d.deviceId === deviceId)) {
    alert("This device is blocked 🔒");
    return;
  }

  const admin = ADMINS.find(a => a.username === u && a.password === p);

  if (admin) {
    adminPanel.style.display = "block";
    renderBlocked();
  } else {
    blockedDevices.push({
      deviceId,
      username: u || "unknown",
      time: new Date().toLocaleString()
    });
    localStorage.setItem("blockedDevices", JSON.stringify(blockedDevices));
    alert("Wrong credentials ❌ Device blocked");
  }
};

/* ---------------- ADMIN CONTROLS ---------------- */
function setStatus(s) {
  manualMode = true;
  forcedStatus = s;

  // SAVE PERSISTENTLY
  localStorage.setItem("manualMode", JSON.stringify(manualMode));
  localStorage.setItem("forcedStatus", forcedStatus);

  updateStatus();
}

function resetAuto() {
  manualMode = false;
  forcedStatus = null;

  localStorage.setItem("manualMode", JSON.stringify(manualMode));
  localStorage.setItem("forcedStatus", forcedStatus);

  updateStatus();
}

/* ---------------- BLOCK LIST ---------------- */
function renderBlocked() {
  blockedList.innerHTML = "";
  blockedDevices.forEach(d => {
    const li = document.createElement("li");
    li.innerText = `${d.username} | ${d.deviceId.slice(0,8)} | ${d.time}`;
    blockedList.appendChild(li);
  });
}

function clearBlocks() {
  blockedDevices = [];
  localStorage.removeItem("blockedDevices");
  renderBlocked();
}

/* ---------------- INIT ---------------- */
updateStatus();
setInterval(updateStatus, 60000);

