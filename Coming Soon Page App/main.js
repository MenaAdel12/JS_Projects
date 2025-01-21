const oneYearInMilliseconds = 365.25 * 24 * 60 * 60 * 1000; // Accounting for leap years
const countDownDate = new Date().getTime() + oneYearInMilliseconds * 0.3;

let x = setInterval(() => {
  let now = new Date().getTime();
  let distance = countDownDate - now;

  let days = Math.floor(distance / (1000 * 60 * 60 * 24));
  let hours = Math.floor(
    (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  let minuites = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  let seconds = Math.floor((distance % (1000 * 60)) / 1000);

  document.getElementById("days").textContent = padNumber(days);
  document.getElementById("hours").textContent = padNumber(hours);
  document.getElementById("minuites").textContent = padNumber(minuites);
  document.getElementById("seconds").textContent = padNumber(seconds);

  if (distance < 0) {
    clearInterval(x);
    resetTime();
    document.querySelector(".content h1").innerHTML =
      "We're <span>Live!</span>";
    document.querySelector(".content p").style.textDecoration =
      "line-through";
  }
}, 1000);

function resetTime() {
  document.getElementById("days").textContent = "00";
  document.getElementById("hours").textContent = "00";
  document.getElementById("minuites").textContent = "00";
  document.getElementById("seconds").textContent = "00";
}

function padNumber(num) {
  return num < 10 ? `0${num}` : num;
}
