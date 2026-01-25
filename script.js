const DB_URL = "https://my-shop-afc91-default-rtdb.asia-southeast1.firebasedatabase.app/status.json";

console.log("Script loaded");

function getStatus() {
  fetch(DB_URL)
    .then(res => res.json())
    .then(data => {
      console.log("Firebase data:", data);

      if (!data) {
        document.getElementById("status").innerText = "⚠️ Status not set";
        return;
      }

      document.getElementById("status").innerText =
        data === "OPEN" ? "🟢 SHOP IS OPEN" : "🔴 SHOP IS CLOSED";
    })
    .catch(err => {
      console.error(err);
      document.getElementById("status").innerText = "❌ Error loading status";
    });
}

if (document.getElementById("status")) {
  getStatus();
}
