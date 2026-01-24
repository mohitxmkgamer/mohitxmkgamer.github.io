const ADMIN_PIN = "1234"; // CHANGE THIS
let isAdmin = false;
let manualOverride = false;
let closedToday = false;

const OPEN_TIME = 10; // 10 AM
const CLOSE_TIME = 21; // 9 PM

const statusText = document.getElementById("statusText");
const statusLight = document.getElementById("statusLight");
const adminPanel = document.getElementById("adminPanel");
const body = document.body;

/* Admin Login */
function loginAdmin() {
  const pin = document.getElementById("pinInput").value;
  if (pin === ADMIN_PIN) {
    isAdmin = true;
    adminPanel.style.display = "block";
    alert("Admin access granted ✅");
  } else {
    alert("Wrong PIN ❌");
  }
}

function requireAdmin(action) {
  if (!isAdmin) {
    alert("Admin access required 🔒");
    return;
  }
  action();
}

/* Status Functions */
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
  statusLight.style.background = "red";
}

function updateStatus(isOpen) {
  if (isOpen) {
    statusText.innerText = "We are OPEN 🟢";
    statusLight.style.background = "green";
  } else {
    statusText.innerText = "We are CLOSED 🔴";
    statusLight.style.background = "red";
  }
}

/* Auto Timing */
function autoCheck() {
  if (manualOverride || closedToday) return;

  const hour = new Date().getHours();
  if (hour >= OPEN_TIME && hour < CLOSE_TIME) {
    updateStatus(true);
  } else {
    updateStatus(false);
  }
}

setInterval(autoCheck, 60000);
autoCheck();

/* Dark Mode */
function toggleDark() {
  body.classList.toggle("dark");
  body.classList.toggle("light");
}
