const OWNER_PASSWORD = "1234"; // change this

// Weekly schedule
const schedule = {
  0: null,            // Sunday closed
  1: [10,21],
  2: [10,21],
  3: [10,21],
  4: [10,21],
  5: [10,21],
  6: [10,21]
};

// Holidays
const holidays = ["2026-01-26"];

let lang = "en";

const light = document.getElementById("statusLight");
const text = document.getElementById("statusText");
const timeText = document.getElementById("timeText");
const controls = document.getElementById("controls");

function formatTime(h){
  const a = h>=12?"PM":"AM";
  h = h%12||12;
  return h+":00 "+a;
}

function login(){
  const p = document.getElementById("password").value;
  if(p===OWNER_PASSWORD){
    controls.style.display="block";
    document.getElementById("loginBox").style.display="none";
  } else alert("Wrong password");
}

function setOpen(){ localStorage.setItem("manual","open"); updateUI(); }
function setClosed(){ localStorage.setItem("manual","closed"); updateUI(); }
function setClosedToday(){ localStorage.setItem("manual","today"); updateUI(); }

function toggleDark(){
  document.body.classList.toggle("dark");
  document.body.classList.toggle("light");
}

function toggleLang(){
  lang = lang==="en"?"hi":"en";
  updateUI();
}

function updateUI(){
  const now = new Date();
  const day = now.getDay();
  const hour = now.getHours();
  const manual = localStorage.getItem("manual");
  const today = now.toISOString().split("T")[0];

  if(holidays.includes(today)){
    setStatus("HOLIDAY","आज बंद है","orange");
    return;
  }

  if(manual==="open"){
    setStatus("SHOP IS OPEN","दुकान खुली है","green");
    return;
  }

  if(manual==="today"){
    setStatus("CLOSED TODAY","आज बंद है","orange");
    return;
  }

  const hours = schedule[day];
  if(!hours){
    setStatus("SUNDAY CLOSED","रविवार बंद","red");
    return;
  }

  if(hour>=hours[0] && hour<hours[1]){
    setStatus("SHOP IS OPEN","दुकान खुली है","green",hours[1]);
  } else {
    setStatus("SHOP IS CLOSED","दुकान बंद है","red",hours[0]);
  }
}

function setStatus(en,hi,color,time){
  light.style.background=color;
  text.innerText = lang==="en"?en:hi;
  timeText.innerText = time ? 
    (lang==="en"?"Time: ":"समय: ")+formatTime(time) : "";
}

// Map
function changeMap(loc){
  document.getElementById("map").src =
  "https://www.google.com/maps?q="+loc+"&output=embed";
}
changeMap("Ludhiana+Punjab+India");

// Visitor counter
let v = localStorage.getItem("visits")||0;
v++;
localStorage.setItem("visits",v);
document.getElementById("visits").innerText =
  "Visitors: "+v;

updateUI();
