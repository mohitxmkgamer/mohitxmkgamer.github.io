const ADMIN_PIN = "Ashok@098"; // CHANGE THIS
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

/* Admin Login */
function loginAdmin() {
  if (blocked) {
    alert("Too many wrong attempts! Admin panel blocked 🔒");
    return;
  }

  const pin = document.getElementById("pinInput").value;
  if (pin === ADMIN_PIN) {
    isAdmin = true;
    adminPanel.style.display = "block";
    wrongAttempts = 0; // reset attempts on success
    alert("Admin access granted ✅");
  } else {
    wrongAttempts++;
    alert(`Wrong PIN ❌ (${wrongAttempts}/3)`);

    if (wrongAttempts >= 3) {
      blocked = true;
      alert("Admin access blocked due to 3 wrong attempts! 🔒");
    }
  }
}

/* Only admin actions */
function requireAdmin(action) {
  if (!isAdmin) {
    alert("Admin access required 🔒");
    return;
  }
  action();
}

/* Reset block */
function resetBlock() {
  blocked = false;
  wrongAttempts = 0;
  alert("Blocked IP/Admin reset ✅");
}

/* Status Controls */
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
  statusIcon.innerText = "🍴"; // Fork & Knife
}

/* Update Status */
function updateStatus(isOpen) {
  if (isOpen) {
    statusText.innerText = "We are OPEN 🟢";
    statusIcon.innerText = "🍴"; // fork & knife still
  } else {
    statusText.innerText = "We are CLOSED 🔴";
    statusIcon.innerText = "🍴";
  }
}

/* Auto Timing */
function autoCheck() {
  if (manualOverride || closedToday) return;
  const hour = new Date().getHours();
  hour >= OPEN_TIME && hour < CLOSE_TIME ? updateStatus(true) : updateStatus(false);
}

setInterval(autoCheck, 60000);
autoCheck();

/* Dark Mode */
function toggleDark() {
  body.classList.toggle("dark");
  body.classList.toggle("light");
}
