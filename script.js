const openHour = 10;   // 10 AM
const closeHour = 21; // 9 PM

const now = new Date();
const hour = now.getHours();

const light = document.getElementById("statusLight");
const text = document.getElementById("statusText");
const time = document.getElementById("timeText");

if (hour >= openHour && hour < closeHour) {
  light.style.background = "green";
  text.innerText = "SHOP IS OPEN";
  time.innerText = "Open till 9:00 PM";
} else {
  light.style.background = "red";
  text.innerText = "SHOP IS CLOSED";
  time.innerText = "Opens at 10:00 AM";
}
