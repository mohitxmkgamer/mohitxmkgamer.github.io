const ADMIN_PIN = "1234"; // CHANGE THIS
let isAdmin = false;
let manualOverride = false;
let closedToday = false;
let wrongAttempts = 0;
let blocked = false;

const OPEN_TIME = 10; // 10 AM
const CLOSE_TIME = 21; // 9 PM

const statusText = document.getElementById("statusText");
const statusIcon = document.getElementById("statusIcon");
const adminPanel = document.getElementById("adminPanel");
const body = document.body;
const loginBtn = document.getElementById("loginBtn");
const pinInput = document.getElementById("pinInput");

/* Detect device dark mode on load */
document.addEventListener("DOMContentLoaded", () => {
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    body.classList.add("dark");
  } else {
    body.classList.add("light");
  }
  checkStatus();
});

/* ADMIN LOGIN */
loginBtn.addEventListener("click", loginAdmin);

function loginAdmin() {
  if (blocked) {
    alert("Too many wrong attempts! Admin panel blocked 🔒");
    return;
  }

  const pin = pinInput.value.trim();
  if (pin === ADMIN_PIN) {
    isAdmin = true;
    adminPanel.style.display = "block";
    wrongAttempts = 0;
    alert("Admin access granted ✅");
    pinInput.value = "";
  } else {
    wrongAttempts++;
    alert(`Wrong PIN ❌ (${wrongAttempts}/3)`);
    if (wrongAttempts >= 3) {
      blocked = true;
      alert("Admin access blocked due to 3 wrong attempts! 🔒");
    }
    pinInput.value = "";
  }
}

/* ONLY ADMIN ACTIONS */
function requireAdmin(action) {
  if (!isAdmin) {
    alert("Admin access required 🔒");
    return;
  }
  action();
}

/* RESET BLOCKED LOGIN */
function resetBlock() {
  blocked = false;
  wrongAttempts = 0;
  alert("Blocked login reset ✅");
}

/* SHOP STATUS CONTROLS */
function setOpen() {
  manualOverride = true;
  closedToday = false;
  updateStatus(true);
}

function setClosed() {
  manualOverride = true;
  closedToday = false;
  updateStatus(false);
}

function setClosedToday() {
  manualOverride = true;
  closedToday = true;
  statusText.innerText = "Closed Today ❌";
  statusIcon.style.color = "red";
}

/* UPDATE STATUS */
function updateStatus(isOpen) {
  statusText.innerText = isOpen ? "We are OPEN 🟢" : "We are CLOSED 🔴";
  statusIcon.style.color = isOpen ? "green" : "red";
  statusIcon.innerText = "🍴";
}

/* AUTO STATUS BASED ON TIME */
function checkStatus() {
  if (manualOverride || closedToday) return;
  const hour = new Date().getHours();
  updateStatus(hour >= OPEN_TIME && hour < CLOSE_TIME);
}

setInterval(checkStatus, 60000);

/* DARK MODE TOGGLE */
function toggleDark() {
  body.classList.toggle("dark");
  body.classList.toggle("light");
}
