// 🎂 Yaha birthday date set karo
const birthday = new Date("February 26, 2026 00:00:00").getTime();

const timer = setInterval(function(){

    const now = new Date().getTime();
    const distance = birthday - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById("days").innerHTML = days;
    document.getElementById("hours").innerHTML = hours;
    document.getElementById("minutes").innerHTML = minutes;
    document.getElementById("seconds").innerHTML = seconds;

    // 🎉 Jab birthday aa jaye
    if(distance < 0){
        clearInterval(timer);
        window.location.href = "main.html"; // next page
    }

},1000);