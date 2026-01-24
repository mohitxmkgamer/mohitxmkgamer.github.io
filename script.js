const ADMIN_PIN = "6280"; // CHANGE THIS
const OPEN_HOUR = 10;
const CLOSE_HOUR = 21;
const CLOSING_SOON_MINUTES = 30;

const deviceId = localStorage.getItem("deviceId") || crypto.randomUUID();
localStorage.setItem("deviceId", deviceId);
let wrongAttempts = Number(localStorage.getItem("attempts")) || 0;
let blockedDevices = JSON.parse(localStorage.getItem("blockedDevices")) || [];

const statusText = document.getElementById("statusText");
const statusIcon = document.getElementById("statusIcon");
const adminPanel = document.getElementById("adminPanel");
const blockedList = document.getElementById("blockedList");

if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
  document.body.classList.add("dark");
} else {
  document.body.classList.add("light");
}

let manualOverride = false;  // true when admin manually sets status
let closedToday = false;
let forcedStatus = null;      // "open" | "closed" | "closedToday"

/* ------------------- STATUS LOGIC ------------------- */
function updateStatus() {
  const now = new Date();
  const hour = now.getHours();
  const minutes = now.getMinutes();

  // Reset pulse
  statusIcon.classList.remove("pulse");

  if (manualOverride) {
    if (forcedStatus === "open") {
      statusText.innerText = "We are OPEN 🟢";
      statusIcon.style.color = "green";
      statusIcon.classList.add("pulse");
    } else if (forcedStatus === "closed") {
      statusText.innerText = "We are CLOSED 🔴";
      statusIcon.style.color = "red";
    } else if (forcedStatus === "closedToday") {
      statusText.innerText = "Closed Today ❌";
      statusIcon.style.color = "red";
    }
  } else {
    // Auto logic
    if (hour < OPEN_HOUR) {
      statusText.innerText = "Opening Soon ⏰";
      statusIcon.style.color = "orange";
    } else if (hour === CLOSE_HOUR && minutes >= 60 - CLOSING_SOON_MINUTES) {
      statusText.innerText = "Closing Soon ⚠️";
      statusIcon.style.color = "yellow";
    } else if (hour >= OPEN_HOUR && hour < CLOSE_HOUR) {
      statusText.innerText = "We are OPEN 🟢";
      statusIcon.style.color = "green";
      statusIcon.classList.add("pulse");
    } else {
      statusText.innerText = "We are CLOSED 🔴";
      statusIcon.style.color = "red";
    }
  }

  statusIcon.innerText = "🍴";
}

/* ------------------- ADMIN LOGIN ------------------- */
document.getElementById("loginBtn").onclick = () => {
  if (blockedDevices.includes(deviceId)) {
    alert("This device is blocked 🔒");
    return;
  }

  const pin = document.getElementById("pinInput").value;

  if (pin === ADMIN_PIN) {
    adminPanel.style.display = "block";
    wrongAttempts = 0;
    localStorage.setItem("attempts", 0);
    renderBlocked();
  } else {
    wrongAttempts++;
    localStorage.setItem("attempts", wrongAttempts);
    if (wrongAttempts >= 3) {
      blockedDevices.push(deviceId);
      localStorage.setItem("blockedDevices", JSON.stringify(blockedDevices));
      alert("Device blocked after 3 wrong attempts 🔒");
    } else {
      alert(`Wrong PIN (${wrongAttempts}/3)`);
    }
  }
};

/* ------------------- ADMIN CONTROLS ------------------- */
function setOpen() { manualOverride = true; forcedStatus = "open"; updateStatus(); }
function setClosed() { manualOverride = true; forcedStatus = "closed"; updateStatus(); }
function setClosedToday() { manualOverride = true; forcedStatus = "closedToday"; updateStatus(); }

/* ------------------- BLOCK LIST ------------------- */
function renderBlocked() {
  blockedList.innerHTML = "";
  blockedDevices.forEach(id => {
    const li = document.createElement("li");
    li.innerText = id;
    blockedList.appendChild(li);
  });
}

function resetBlocks() {
  blockedDevices = [];
  localStorage.removeItem("blockedDevices");
  localStorage.setItem("attempts", 0);
  renderBlocked();
  alert("All devices unblocked ✅");
}

/* ------------------- DARK MODE ------------------- */
function toggleDark() {
  document.body.classList.toggle("dark");
  document.body.classList.toggle("light");
}

/* ------------------- AUTO UPDATE ------------------- */
updateStatus();
setInterval(updateStatus, 60000);
