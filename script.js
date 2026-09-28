/* =====================================
   CYBERSAFE STUDENTS
   INTERACTIVE JAVASCRIPT
===================================== */


/* ===============================
   MOBILE NAVIGATION
================================ */

const menuBtn = document.getElementById("menuBtn");
const navMenu = document.getElementById("navMenu");

menuBtn.addEventListener("click", () => {

    navMenu.classList.toggle("open");

});


document.querySelectorAll("nav a").forEach(link => {

    link.addEventListener("click", () => {

        navMenu.classList.remove("open");

    });

});


/* ===============================
   DARK / LIGHT MODE
================================ */

const themeToggle =
    document.getElementById("themeToggle");


const savedTheme =
    localStorage.getItem("cyberTheme");


if (savedTheme === "light") {

    document.body.classList.add("light");

    themeToggle.textContent = "🌙";

}


themeToggle.addEventListener("click", () => {

    document.body.classList.toggle("light");

    const isLight =
        document.body.classList.contains("light");


    themeToggle.textContent =
        isLight ? "🌙" : "☀️";


    localStorage.setItem(
        "cyberTheme",
        isLight ? "light" : "dark"
    );

});


/* ===============================
   PASSWORD STRENGTH
================================ */

const passwordInput =
    document.getElementById("passwordInput");

const strengthFill =
    document.getElementById("strengthFill");

const strengthText =
    document.getElementById("strengthText");

const showPassword =
    document.getElementById("showPassword");


passwordInput.addEventListener("input", () => {

    const password =
        passwordInput.value;

    let score = 0;


    if (password.length >= 8)
        score++;


    if (password.length >= 12)
        score++;


    if (/[A-Z]/.test(password))
        score++;


    if (/[a-z]/.test(password))
        score++;


    if (/[0-9]/.test(password))
        score++;


    if (/[^A-Za-z0-9]/.test(password))
        score++;


    if (password.length === 0) {

        strengthFill.style.width = "0%";

        strengthText.textContent =
            "Password strength: —";

        return;

    }


    if (score <= 2) {

        strengthFill.style.width = "30%";

        strengthText.textContent =
            "Password strength: Weak";

    }
    else if (score <= 4) {

        strengthFill.style.width = "65%";

        strengthText.textContent =
            "Password strength: Medium";

    }
    else {

        strengthFill.style.width = "100%";

        strengthText.textContent =
            "Password strength: Strong";

    }

});


showPassword.addEventListener("click", () => {

    if (passwordInput.type === "password") {

        passwordInput.type = "text";

        showPassword.textContent = "🙈";

    }
    else {

        passwordInput.type = "password";

        showPassword.textContent = "👁️";

    }

});


/* ===============================
   PHISHING GAME
================================ */

const scenarios = [

    {
        sender: "school-support@example.com",
        subject: "Account verification required",
        text:
            "Your student account will be suspended today. Click the link immediately to verify your account.",
        link:
            "school-login-verify.example.com",
        phishing: true,
        explanation:
            "The message creates urgency and asks you to use a suspicious website."
    },

    {
        sender: "college.edu",
        subject: "Library opening hours",
        text:
            "The college library will follow updated opening hours from Monday. Please check the official college website for details.",
        link:
            "college.edu/library",
        phishing: false,
        explanation:
            "This message does not ask for passwords, payments or unusual personal information."
    },

    {
        sender: "prize-alert@example.com",
        subject: "Congratulations! You won!",
        text:
            "You have won a new smartphone. Pay a small processing fee to claim your prize now.",
        link:
            "claim-your-prize.example.com",
        phishing: true,
        explanation:
            "Unexpected prizes and requests for payment are common scam warning signs."
    },

    {
        sender: "updates@example.com",
        subject: "Monthly newsletter",
        text:
            "Here is this month's newsletter. You can read it on the organization's official website.",
        link:
            "organization.example/news",
        phishing: false,
        explanation:
            "The message does not pressure you to provide sensitive information."
    }

];


let currentScenario = 0;


const messageSender =
    document.getElementById("messageSender");

const messageSubject =
    document.getElementById("messageSubject");

const messageText =
    document.getElementById("messageText");

const messageLink =
    document.getElementById("messageLink");

const scenarioNumber =
    document.getElementById("scenarioNumber");

const gameProgress =
    document.getElementById("gameProgress");

const gameFeedback =
    document.getElementById("gameFeedback");


function loadScenario() {

    const scenario =
        scenarios[currentScenario];


    messageSender.textContent =
        scenario.sender;

    messageSubject.textContent =
        scenario.subject;

    messageText.textContent =
        scenario.text;

    messageLink.textContent =
        scenario.link;


    scenarioNumber.textContent =
        `Scenario ${currentScenario + 1} of ${scenarios.length}`;


    gameProgress.style.width =
        `${((currentScenario + 1) / scenarios.length) * 100}%`;


    gameFeedback.className =
        "game-feedback";

    gameFeedback.textContent = "";

}


function answerPhishing(userAnswer) {

    const scenario =
        scenarios[currentScenario];


    const correct =
        userAnswer === scenario.phishing;


    gameFeedback.textContent =
        correct
            ? `✓ Correct! ${scenario.explanation}`
            : `✗ Not quite. ${scenario.explanation}`;


    gameFeedback.classList.add(
        correct
            ? "feedback-correct"
            : "feedback-wrong"
    );


    setTimeout(() => {

        currentScenario++;

        if (currentScenario < scenarios.length) {

            loadScenario();

        }
        else {

            currentScenario = 0;

            setTimeout(loadScenario, 300);

        }

    }, 2200);

}


document
    .getElementById("phishingBtn")
    .addEventListener(
        "click",
        () => answerPhishing(true)
    );


document
    .getElementById("safeBtn")
    .addEventListener(
        "click",
        () => answerPhishing(false)
    );


loadScenario();


/* ===============================
   SAFETY CHECKLIST
================================ */

const tasks =
    document.querySelectorAll(".task input");

const checkProgress =
    document.getElementById("checkProgress");

const checkText =
    document.getElementById("checkText");


function updateChecklist() {

    const completed =
        document.querySelectorAll(
            ".task input:checked"
        ).length;


    const total =
        tasks.length;


    const percent =
        Math.round(
            (completed / total) * 100
        );


    checkProgress.style.width =
        `${percent}%`;


    checkText.textContent =
        `${percent}% completed`;

}


tasks.forEach(task => {

    task.addEventListener(
        "change",
        updateChecklist
    );

});


/* ===============================
   SCROLL REVEAL
================================ */

const revealElements =
    document.querySelectorAll(
        ".risk-card, .info-card, .threat-card, .social-card, .step, .resource-card"
    );


const observer =
    new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.style.opacity = "1";

                    entry.target.style.transform =
                        "translateY(0)";

                    observer.unobserve(entry.target);

                }

            });

        },
        {
            threshold: 0.1
        }
    );


revealElements.forEach(element => {

    element.style.opacity = "0";

    element.style.transform =
        "translateY(25px)";

    element.style.transition =
        "opacity 0.6s ease, transform 0.6s ease";

    observer.observe(element);

});