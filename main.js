/* =========================
   🎉 ONE TIME FIREWORK BLAST
========================= */

const canvas = document.getElementById("blast");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];

function createBlast() {
  for (let i = 0; i < 300; i++) {
    // Increased for more impact
    particles.push({
      x: canvas.width / 2,
      y: canvas.height / 2,
      dx: (Math.random() - 0.5) * 15,
      dy: (Math.random() - 0.5) * 15,
      size: Math.random() * 8 + 3,
      life: 120,
      opacity: 1,
      color: `hsl(${Math.random() * 360}, 80%, 60%)`,
    });
  }
}

function animateBlast() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particles.forEach((p) => {
    ctx.globalAlpha = p.opacity;
    ctx.fillStyle = p.color;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size / 2, 0, Math.PI * 2);
    ctx.fill();

    p.x += p.dx;
    p.y += p.dy;
    p.dy += 0.15; // Enhanced gravity
    p.life -= 1.5;
    p.opacity -= 0.015;
    p.size *= 0.97;
  });

  particles = particles.filter((p) => p.life > 0);

  if (particles.length > 0) {
    requestAnimationFrame(animateBlast);
  } else {
    canvas.style.display = "none";
    ctx.globalAlpha = 1;
  }
}

createBlast();
animateBlast();

/* =========================
   ✨ SMOOTH FLOATING BACKGROUND (ENHANCED)
========================= */

const bg = document.querySelector(".background-bubbles");

for (let i = 0; i < 30; i++) {
  let span = document.createElement("span");

  span.style.left = Math.random() * 100 + "%";
  span.style.animationDuration = 10 + Math.random() * 20 + "s";
  span.style.width = 25 + Math.random() * 80 + "px";
  span.style.height = span.style.width;
  span.style.opacity = 0.1 + Math.random() * 0.4;
  span.style.animationDelay = Math.random() * 5 + "s";
  span.style.filter = "blur(3px)";

  bg.appendChild(span);
}

/* =========================
   🎉 STICKERS & GIFS BACKGROUND
========================= */

const stickersBg = document.querySelector(".background-stickers");

const stickerUrls = [
  "assets/1gif.png", // Heart
  "assets/2gif.png", // Balloon
  "assets/3gif.png", // Star
  "assets/4gif.png", // Confetti
  "assets/5gif.png",
  "assets/6gif.png",
  "assets/7gif.png",
];

for (let i = 0; i < 15; i++) {
    let img = document.createElement("img");
    img.src = stickerUrls[Math.floor(Math.random() * stickerUrls.length)];
    img.style.position = 'absolute';
    img.style.left = Math.random() * 100 + "%";
    img.style.top = Math.random() * 100 + "%";
    img.style.width = 50 + Math.random() * 100 + "px";
    img.style.opacity = 0.15 + Math.random() * 0.25;     // thoda kam opacity for dreamy look
    img.style.filter = "blur(2px)";                      // ← Yeh permanent blur daal de (4px se 8px tak try kar)
    img.style.animation = `floatSticker ${20 + Math.random() * 20}s linear infinite`;
    img.style.animationDelay = Math.random() * 10 + "s";
    img.style.pointerEvents = 'none';

    // Extra: animation start hone se pehle bhi blur rahe
    img.style.willChange = "transform, opacity";         // smooth performance

    stickersBg.appendChild(img);
}
/* =========================
   📜 SCROLL & MUSIC FUNCTION
========================= */
let isMusicPlaying = false;  // Global flag to track music state

function startSurprise() {
    const music = document.getElementById('bgMusic');
const btn = document.getElementById('surpriseBtn');
   if (isMusicPlaying) {
    music.pause();
    isMusicPlaying = false;
    btn.innerHTML = 'Resume Surprise 🎵';  // ya 'Play Music ▶️'
} else {
        // Agar band hai → play karo (muted trick se policy safe)
        music.muted = true;
        music.play()
            .then(() => {
                music.muted = false;
                isMusicPlaying = true;
              
            })
            .catch(err => {
                
                alert("Click anywhere on page to allow sound 🎵 (browser rule)");
            });
    }

    // Har baar scroll to next section (ya agar already scrolled toh ignore kar sakte ho)
    window.scrollBy({
        top: window.innerHeight,
        behavior: "smooth"
    });
}
/* =========================
   💌 Q&A UNLOCK WITH 5 QUESTIONS
========================= */
const answers = {
    q1: "tere sath kuch bhi kha sakta hu",   // exact lowercase
    q2: "travelling",
    q3: "m khud",
    q4: "time spend karna",
    q5: "hug karna",
};

function checkAnswers() {
    let allCorrect = true;
    const inputs = document.querySelectorAll(".answerInput");

    // Reset previous highlights
    inputs.forEach(input => {
        input.classList.remove("wrong-answer");
    });

    inputs.forEach((input) => {
        const qId = input.getAttribute("data-qid");
        let userAnswer = input.value.trim().toLowerCase();
        
        // Optional: extra spaces ya punctuation ignore karne ke liye (better matching)
        userAnswer = userAnswer.replace(/[^a-z0-9 ]/g, ''); // remove special chars except space
        userAnswer = userAnswer.replace(/\s+/g, ' ');       // multiple spaces to single

        const correctAnswer = answers[qId] ? answers[qId].toLowerCase() : "";

        if (userAnswer !== correctAnswer) {
            allCorrect = false;
            input.classList.add("wrong-answer");
        }
    });

    if (allCorrect) {
        // Success
        revealMessage();                     // Yeh call kar rahe hain
        inputs.forEach(input => input.disabled = true);
    } else {
        // Fail
        showCuteModal("Oopsie! Kuch galat hai jaan 😜<br>Red wale questions check karo!", false);
    }
}

function revealMessage() {
    const secret = document.getElementById("secretMessage");
    if (secret) {
        secret.style.display = "block";      // Yeh line missing thi ya override ho rahi thi
        secret.scrollIntoView({ behavior: "smooth" });  // Auto scroll to message
    }
    startConfetti();  // Confetti start
}

function showCuteModal(message, isSuccess = false) {
    const modal = document.getElementById("cuteModal");
    const text = document.getElementById("cuteModalText");
    if (!modal || !text) return;  // safety check

    text.innerHTML = message;
    
    if (isSuccess) {
        text.style.color = "#ff1493";
        text.style.fontWeight = "bold";
    } else {
        text.style.color = "#333";
    }
    
    modal.style.display = "flex";
}

function closeCuteModal() {
    const modal = document.getElementById("cuteModal");
    if (modal) modal.style.display = "none";
}

// Progressive reveal (same)
document.querySelectorAll(".answerInput").forEach((input, index) => {
    input.addEventListener("input", () => {
        if (input.value.trim() && index < 4) {
            document.getElementById(`q${index + 2}`).style.display = "block";
        }
    });
});
// Confetti for unique reveal
const confettiCanvas = document.getElementById("confetti");
const confettiCtx = confettiCanvas.getContext("2d");
confettiCanvas.width = window.innerWidth;
confettiCanvas.height = window.innerHeight;

let confettiParticles = [];

function createConfetti() {
  for (let i = 0; i < 200; i++) {
    confettiParticles.push({
      x: Math.random() * confettiCanvas.width,
      y: Math.random() * confettiCanvas.height - confettiCanvas.height,
      dx: (Math.random() - 0.5) * 4,
      dy: Math.random() * 5 + 2,
      size: Math.random() * 10 + 5,
      color: `hsl(${Math.random() * 360}, 100%, 50%)`,
      rotation: Math.random() * 360,
      life: 200,
    });
  }
}

function animateConfetti() {
  confettiCtx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);

  confettiParticles.forEach((p) => {
    confettiCtx.save();
    confettiCtx.translate(p.x, p.y);
    confettiCtx.rotate((p.rotation * Math.PI) / 180);
    confettiCtx.fillStyle = p.color;
    confettiCtx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
    confettiCtx.restore();

    p.x += p.dx;
    p.y += p.dy;
    p.rotation += 2;
    p.life -= 1;
    p.dy += 0.05;
  });

  confettiParticles = confettiParticles.filter(
    (p) => p.life > 0 && p.y < confettiCanvas.height,
  );

  if (confettiParticles.length > 0) {
    requestAnimationFrame(animateConfetti);
  } else {
    confettiCanvas.style.display = "none";
  }
}

function startConfetti() {
  confettiCanvas.style.display = "block";
  createConfetti();
  animateConfetti();
}

/* =========================
   🖼 MODAL
========================= */

function openModal(text) {
  document.getElementById("modal").style.display = "flex";
  document.getElementById("modalText").innerText = text;
}

function closeModal() {
  document.getElementById("modal").style.display = "none";
}

// Window resize handler
window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  confettiCanvas.width = window.innerWidth;
  confettiCanvas.height = window.innerHeight;
});
