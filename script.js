const openHour = 10;   // 10 AM
const closeHour = 21; // 9 PM

const now = new Date();
const hour = now.getHours();
const minutes = now.getMinutes();

const light = document.getElementById("statusLight");
const text = document.getElementById("statusText");
const time = document.getElementById("timeText");

function formatTime(h) {
  const ampm = h >= 12 ? "PM" : "AM";
  h = h % 12 || 12;
  return h + ":00 " + ampm;
}

if (hour >= openHour && hour < closeHour) {
  light.style.background = "green";
  text.innerText = "SHOP IS OPEN";
  time.innerText = `Open till ${formatTime(closeHour)}`;
} else {
  light.style.background = "red";
  text.innerText = "SHOP IS CLOSED";
  time.innerText = `Opens at ${formatTime(openHour)}`;
}
