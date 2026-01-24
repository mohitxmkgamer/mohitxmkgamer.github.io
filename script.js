const DB_URL = "https://my-shop-afc91-default-rtdb.asia-southeast1.firebasedatabase.app/status.json";

function getStatus() {
  fetch(DB_URL)
    .then(res => res.json())
    .then(data => {
      document.getElementById("status").innerText =
        data === "OPEN" ? "🟢 SHOP IS OPEN" : "🔴 SHOP IS CLOSED";
    });
}

function setStatus(value) {
  fetch(DB_URL, {
    method: "PUT",
    body: JSON.stringify(value)
  });
}

function login() {
  const password = document.getElementById("pass").value;
  if (password === "admin123") {
    document.getElementById("panel").style.display = "block";
  } else {
    alert("Wrong password");
  }
}

if (document.getElementById("status")) {
  getStatus();
  setInterval(getStatus, 5000);
}
