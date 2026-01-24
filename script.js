let manualOverride = false;
let closedToday = false;

const OPEN_TIME = 10;   // 10 AM
const CLOSE_TIME = 21; // 9 PM

const statusText = document.getElementById("statusText");
const statusLight = document.getElementById("statusLight");
const body = document.body;

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

function autoCheck() {
  if (manualOverride) return;

  const now = new Date();
  const hour = now.getHours();

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
/* Premium Card */
.card {
  background: rgba(255,255,255,0.1);
  padding: 20px;
  margin: 20px auto;
  max-width: 420px;
  border-radius: 14px;
  box-shadow: 0 10px 25px rgba(0,0,0,0.25);
  backdrop-filter: blur(10px);
}

/* Premium buttons */
button {
  background: linear-gradient(135deg, #00c853, #64dd17);
  color: #000;
  font-weight: bold;
}

button.close {
  background: linear-gradient(135deg, #ff5252, #ff1744);
  color: #fff;
}

button.today {
  background: linear-gradient(135deg, #ff9100, #ff6d00);
  color: #000;
}

/* Status text */
#statusText {
  font-size: 22px;
  font-weight: bold;
}
