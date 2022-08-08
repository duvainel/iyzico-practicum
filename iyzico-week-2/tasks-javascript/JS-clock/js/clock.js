const giris = prompt("Lütfen isminizi giriniz.");

document.querySelector("#myName").innerHTML = giris;

function getWeekDay(dayIndex) {
  switch (dayIndex) {
    case 0:
      return "Pazar";
    case 1:
      return "Pazartesi";
    case 2:
      return "Salı";
    case 3:
      return "Çarşamba";
    case 4:
      return "Perşembe";
    case 5:
      return "Cuma";
    case 6:
      return "Cumartesi";
  }
}

function showTime() {
  const date = new Date();
  let h = date.getHours();
  let m = date.getMinutes();
  let s = date.getSeconds();
  const d = getWeekDay(date.getDay());

  h = h < 10 ? "0" + h : h;
  m = m < 10 ? "0" + m : m;
  s = s < 10 ? "0" + s : s;

  const time = `${h}:${m}:${s} ${d}`;
  document.getElementById("myClock").innerText = time;

  setTimeout(showTime, 1000);
}
