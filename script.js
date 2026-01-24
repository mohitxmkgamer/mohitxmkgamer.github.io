const openHour = 10;
const closeHour = 21;

const light = document.getElementById("statusLight");
const text = document.getElementById("statusText");
const time = document.getElementById("timeText");

function formatTime(h) {
  const ampm = h >= 12 ? "PM" : "AM";
  h = h % 12 || 12;
  return h + ":00 " + ampm;
}

function setOpen() {
  localStorage.setItem("status", "open");
  updateUI();
}

function setClosed() {
  localStorage.setItem("status", "closed");
  updateUI();
}

function setClosedToday() {
  localStorage.setItem("status", "closedToday");
  updateUI();
}

function toggleDark() {
  document.body.classList.toggle("dark");
  document.body.classList.toggle("light");
}

function updateUI() {
  const status = localStorage.getItem("status");
  const now = new Date();
  const hour = now.getHours();

  if (status === "open") {
    light.style.background = "green";
    text.innerText = "SHOP IS OPEN";
    time.innerText = `Open till ${formatTime(closeHour)}`;
  }
  else if (status === "closedToday") {
    light.style.background = "orange";
    text.innerText = "CLOSED TODAY";
    time.innerText = "See you tomorrow!";
  }
  else {
    light.style.background = "red";
    text.innerText = "SHOP IS CLOSED";
    time.innerText = `Opens at ${formatTime(openHour)}`;
  }
}

updateUI();
