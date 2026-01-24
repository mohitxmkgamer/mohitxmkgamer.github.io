const openHour = 10;
const closeHour = 21;
const OWNER_PASSWORD = "1234"; // 🔑 change this

// Holidays (YYYY-MM-DD)
const holidays = [
  "2026-01-26",
  "2026-03-08"
];

const light = document.getElementById("statusLight");
const text = document.getElementById("statusText");
const timeText = document.getElementById("timeText");
const controls = document.getElementById("controls");

function todayDate() {
  return new Date().toISOString().split("T")[0];
}

function formatTime(h) {
  const ampm = h >= 12 ? "PM" : "AM";
  h = h % 12 || 12;
  return h + ":00 " + ampm;
}

function unlockControls() {
  const pass = prompt("Enter owner password:");
  if (pass === OWNER_PASSWORD) {
    controls.style.display = "block";
    alert("Controls unlocked");
  } else {
    alert("Wrong password");
  }
}

function setOpen() {
  localStorage.setItem("manualStatus", "open");
  updateUI();
}

function setClosed() {
  localStorage.setItem("manualStatus", "closed");
  updateUI();
}

function setClosedToday() {
  localStorage.setItem("manualStatus", "closedToday");
  updateUI();
}

function toggleDark() {
  document.body.classList.toggle("dark");
  document.body.classList.toggle("light");
}

function updateUI() {
  const now = new Date();
  const hour = now.getHours();
  const manualStatus = localStorage.getItem("manualStatus");
  const today = todayDate();

  if (holidays.includes(today)) {
    light.style.background = "orange";
    text.innerText = "HOLIDAY";
    timeText.innerText = "Shop closed today";
    return;
  }

  if (manualStatus === "open") {
    light.style.background = "green";
    text.innerText = "SHOP IS OPEN";
    timeText.innerText = `Open till ${formatTime(closeHour)}`;
    return;
  }

  if (manualStatus === "closedToday") {
    light.style.background = "orange";
    text.innerText = "CLOSED TODAY";
    timeText.innerText = "See you tomorrow";
    return;
  }

  if (hour >= openHour && hour < closeHour) {
    light.style.background = "green";
    text.innerText = "SHOP IS OPEN";
    timeText.innerText = `Open till ${formatTime(closeHour)}`;
  } else {
    light.style.background = "red";
    text.innerText = "SHOP IS CLOSED";
    timeText.innerText = `Opens at ${formatTime(openHour)}`;
  }
}

updateUI();

<h3>📍 Our Branches</h3>

<select onchange="changeMap(this.value)">
  <option value="Ludhiana+Punjab+India">Ludhiana</option>
  <option value="Chandigarh+India">Chandigarh</option>
</select>

<iframe
  id="map"
  class="map"
  loading="lazy">
</iframe>
