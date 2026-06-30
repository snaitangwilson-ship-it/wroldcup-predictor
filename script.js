const PHONE = "917629048752";

const fixtures = [
["🇫🇷 France","🇸🇪 Sweden"],
["🇪🇸 Spain","🇦🇹 Austria"],
["🇦🇷 Argentina","🇨🇻 Cape Verde"],
["🏴 England","🇨🇩 DR Congo"],
["🇧🇪 Belgium","🇸🇳 Senegal"],
["🇲🇽 Mexico","🇪🇨 Ecuador"],
["🇺🇸 USA","🇧🇦 Bosnia & Herzegovina"],
["🇨🇭 Switzerland","🇩🇿 Algeria"],
["🇦🇺 Australia","🇪🇬 Egypt"],
["🇨🇴 Colombia","🇬🇭 Ghana"],
["🇨🇮 Ivory Coast","🇳🇴 Norway"],
["🇵🇹 Portugal","🇭🇷 Croatia"]
];

const matchesDiv = document.getElementById("matches");
const submitBtn = document.getElementById("submit");
const nameInput = document.getElementById("name");
const phoneInput = document.getElementById("phone");
const progressBar = document.getElementById("progressBar");
const progressText = document.getElementById("progressText");
const countdown = document.getElementById("countdown");

const predictions = {};

fixtures.forEach((match, index) => {

    const card = document.createElement("div");
    card.className = "match";

    card.innerHTML = `
        <div class="team">${index + 1}. ${match[0]} vs ${match[1]}</div>
        <div class="row"></div>
    `;

    const row = card.querySelector(".row");

    [match[0], "Draw", match[1]].forEach(choice => {

        const btn = document.createElement("button");
        btn.className = "pick";
        btn.textContent = choice;

        btn.onclick = () => {

            row.querySelectorAll(".pick").forEach(x => x.classList.remove("selected"));

            btn.classList.add("selected");

            predictions[index] = choice;

            updateProgress();

        };

        row.appendChild(btn);

    });

    matchesDiv.appendChild(card);

});

function updateProgress() {

    const completed = Object.keys(predictions).length;

    progressText.innerHTML = `${completed} / ${fixtures.length} Predictions Selected`;

    progressBar.style.width = (completed / fixtures.length * 100) + "%";

    submitBtn.disabled = !(
        nameInput.value.trim() &&
        phoneInput.value.trim() &&
        completed === fixtures.length
    );

}

nameInput.addEventListener("input", updateProgress);
phoneInput.addEventListener("input", updateProgress);

submitBtn.addEventListener("click", function () {

    let message = `🏆 FIFA World Cup 2026 Prediction\n\n`;

    message += `Name: ${nameInput.value}\n`;
    message += `Phone: ${phoneInput.value}\n\n`;

    fixtures.forEach((match, index) => {

        message += `${match[0]} vs ${match[1]} : ${predictions[index]}\n`;

    });

    const url = `https://wa.me/${PHONE}?text=${encodeURIComponent(message)}`;

    window.location.href = url;

});

// Countdown to the first remaining fixture
const endDate = new Date("2026-06-30T17:00:00");

function updateCountdown() {

    const now = new Date();

    const diff = endDate - now;

    if (diff <= 0) {

        countdown.innerHTML = "⛔ Predictions Closed";
        submitBtn.disabled = true;

        return;

    }

    const days = Math.floor(diff / 86400000);
    const hours = Math.floor((diff % 86400000) / 3600000);
    const minutes = Math.floor((diff % 3600000) / 60000);
    const seconds = Math.floor((diff % 60000) / 1000);

    countdown.innerHTML = `⏳ ${days}d ${hours}h ${minutes}m ${seconds}s Remaining`;

}

updateCountdown();

setInterval(updateCountdown, 1000);
