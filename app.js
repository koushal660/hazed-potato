/* PAGE SYSTEM */
let page1TypingActive = false;
let currentPage = 0; // Start from Page 0
function updateProgressIndicator() {
    const indicator = document.getElementById("progressIndicator");
    if (!indicator) return;

    const totalPages = 10; // 0 to 9
    indicator.textContent = `Page ${currentPage + 1} / ${totalPages}`;

    // Fade-in animation
    indicator.classList.add("show");

    // If you ever want auto-hide:
    // setTimeout(() => indicator.classList.remove("show"), 800);
}


function hideAllPages() {
    document.querySelectorAll("section").forEach(sec => sec.style.display = "none");
}

/** Page load handler with safe delay */
function showPage(num) {
    hideAllPages();
    const page = document.getElementById(`page${num}`);
    if (!page) return;

    page.style.display = "flex";

    const START_DELAY = 260; // slightly optimized for smoother sync

    clearTimeout(page.__startTimer);
    page.__startTimer = setTimeout(() => {
        if (num === 0) startPage0();
        if (num === 1) startTypingEffectPage1();
        if (num === 2) startTypingEffectPage2();
        if (num === 3) startPage3Animations();
        if (num === 4) startPage4Animations();
        if (num === 5) startPage5Animations();
        if (num === 6) startPage6Animations();
        if (num === 7) startPage7Animations();
        if (num === 8) startPage8();
        if (num === 9) startPage9();


    }, START_DELAY);
}

function goToPage(num) {
    currentPage = num;
    if (num !== 1) page1TypingActive = false;


    hideAllPages();  // hide all pages first

    // Show selected page immediately
    const page = document.getElementById(`page${num}`);
    if (page) page.style.display = "flex";

    // show / hide back button
    const backBtn = document.getElementById("backBtn");
    if (backBtn) {
        backBtn.style.display = (num === 0 ? "none" : "block");
    }

    // 🔵 UPDATE PROGRESS INDICATOR
    updateProgressIndicator();

    // Restart that page’s animation cleanly (CRITICAL FIX)
    setTimeout(() => {
        showPage(num);
    }, 50);
}


/* BACK BUTTON HANDLER */
function goBack() {
    if (currentPage > 0) {
        goToPage(currentPage - 1);
    }
}


/* ------------------------------------------------------------------
      PAGE 0 — Suspense Typewriter
------------------------------------------------------------------ */
function startPage0() {
    const line1 = "Something is about to begin...";
    const h1 = document.getElementById("page0-line1");
    const line2 = document.getElementById("page0-line2");
    const btn = document.getElementById("page0-btn");
    if (!h1 || !line2 || !btn) return;

    h1.innerHTML = "";
    line2.style.opacity = 0;
    btn.style.opacity = 0;
    btn.style.display = "none";

    let index = 0;

    function typeLine1() {
        if (index < line1.length) {
            h1.innerHTML = line1.substring(0, index + 1) + "<span class='cursor'></span>";
            index++;
            setTimeout(typeLine1, 90);
        } else {
            h1.innerHTML = line1;
            setTimeout(() => {
                line2.style.transition = "opacity 1.2s ease";
                line2.style.opacity = 1;

                setTimeout(() => {
                    btn.style.display = "inline-block";
                    btn.style.opacity = 1;
                }, 700);
            }, 450);
        }
    }
    typeLine1();
}

/* ------------------------------------------------------------------
      PAGE 1 — Multi-line Typing (with pause + joke)
------------------------------------------------------------------ */
function startTypingEffectPage1() {

    if (page1TypingActive) return;
    page1TypingActive = true;

    const lines = [
        "Wait… before you panic —",
        "I'm not confessing to anything here. 😳",
        "Or am I…"
    ];

    const jokeText = "Just kidding, RELAX!! 😁";

    const el = document.getElementById("typewriter");
    const nextBtn = document.getElementById("nextBtnPage1");
    if (!el || !nextBtn) return;

    el.innerHTML = "";
    nextBtn.style.display = "none";

    let lineIndex = 0;
    let charIndex = 0;
    let content = "";
    let jokeIndex = 0;

    function typeMainLines() {
        if (lineIndex < lines.length) {
            if (charIndex < lines[lineIndex].length) {
                content += lines[lineIndex][charIndex];
                el.innerHTML = content + "<span class='cursor'></span>";
                charIndex++;
                setTimeout(typeMainLines, 70);
            } else {
                content += "<br>";
                el.innerHTML = content;
                lineIndex++;
                charIndex = 0;
                setTimeout(typeMainLines, 500);
            }
        } else {
            // Pause before joke typing
            setTimeout(typeJokeLine, 700);
        }
    }

    function typeJokeLine() {
        if (jokeIndex === 0) {
            content += "<br><br>";
        }

        if (jokeIndex < jokeText.length) {
            content += jokeText[jokeIndex];
            el.innerHTML = content + "<span class='cursor'></span>";
            jokeIndex++;
            setTimeout(typeJokeLine, 65);
        } else {
            el.innerHTML = content; // remove cursor
            setTimeout(() => {
                nextBtn.style.display = "inline-block";
            }, 400);
        }
    }

    typeMainLines();
}






/* ------------------------------------------------------------------
      PAGE 2 — Typing + Word-Pop
------------------------------------------------------------------ */
function startTypingEffectPage2() {
    const element = document.getElementById("p2-type-text");
    const popWords = document.getElementById("p2-pop-words");
    const nextBtn = document.getElementById("nextBtnPage2");
    if (!element || !popWords || !nextBtn) return;

    const fullText = element.innerText || "";

    const words = [
        "This", "is", "going", "to", "be", "short,", "sweet,",
        "and", "mildly", "chaotic", "—",
        "just", "like", "our", "chats", "and", "banters."
    ];

    // Fix flash
    element.style.opacity = 0;

    // Reset
    element.innerHTML = "";
    popWords.innerHTML = "";
    popWords.style.opacity = 0;
    nextBtn.style.display = "none";

    let index = 0;

    function typeNameLine() {
        if (index === 0) {
            element.style.transition = "opacity 0.25s ease";
            element.style.opacity = 1;
        }

        if (index < fullText.length) {
            element.innerHTML =
                fullText.substring(0, index + 1) +
                "<span class='cursor'></span>";
            index++;
            setTimeout(typeNameLine, 90);
        } else {
            // remove cursor
            element.innerHTML = fullText;
            setTimeout(popRemainingWords, 380);
        }
    }

    function popRemainingWords() {
        popWords.style.opacity = 1;

        words.forEach((word, i) => {
            const span = document.createElement("span");
            span.textContent = word;
            span.style.opacity = 0;
            span.style.transform = "scale(0.92)";
            span.style.display = "inline-block";
            span.style.marginRight = "6px";
            popWords.appendChild(span);

            setTimeout(() => {
                span.style.transition = "0.32s ease";
                span.style.opacity = 1;
                span.style.transform = "scale(1)";
            }, i * 140);
        });

        setTimeout(() => nextBtn.style.display = "inline-block", words.length * 140 + 420);
    }

    typeNameLine();
}

/* ------------------------------------------------------------------
      PAGE 3 — Slide Cards
------------------------------------------------------------------ */
function startPage3Animations() {
    const line1 = document.getElementById("p3-line1");
    const line2 = document.getElementById("p3-line2");
    const cards = document.querySelectorAll(".p3-card");
    const cardsContainer = document.getElementById("p3-cards");
    const nextBtn = document.getElementById("nextBtnPage3");
    if (!line1 || !line2 || !cardsContainer || !nextBtn) return;

    const text1 = "Okay, now let’s be honest for a second…";
    const text2 = "There are a few things you might not know about yourself.";

    line1.innerHTML = "";
    line2.style.opacity = 0;
    cardsContainer.style.opacity = 0;
    nextBtn.style.display = "none";
    cards.forEach(card => {
        card.style.opacity = 0;
        card.style.transform = "translateX(-25px)";
    });

    let index = 0;

    function typeLine1() {
        if (index < text1.length) {
            line1.innerHTML = text1.substring(0, index + 1) + "<span class='cursor'></span>";
            index++;
            setTimeout(typeLine1, 84);
        } else {
            line1.innerHTML = text1;
            setTimeout(showLine2, 380);
        }
    }

    function showLine2() {
        line2.innerHTML = text2;
        line2.style.transition = "opacity 0.9s ease";
        line2.style.opacity = 1;

        setTimeout(showCards, 580);
    }

    function showCards() {
        cardsContainer.style.opacity = 1;
        cards.forEach((card, i) => {
            setTimeout(() => {
                card.style.transition = "0.45s ease";
                card.style.opacity = 1;
                card.style.transform = "translateX(0)";
            }, i * 240);
        });

        setTimeout(() => nextBtn.style.display = "inline-block", cards.length * 240 + 420);
    }

    typeLine1();
}

/* ------------------------------------------------------------------
      PAGE 4 — Heartfelt Section
------------------------------------------------------------------ */
function startPage4Animations() {
    const line1 = document.getElementById("p4-line1");
    const line2 = document.getElementById("p4-line2");
    const line3 = document.getElementById("p4-line3");
    const line4 = document.getElementById("p4-line4");
    const nextBtn = document.getElementById("nextBtnPage4");
    if (!line1 || !line2 || !line3 || !line4 || !nextBtn) return;

    const text1 = "Jokes aside...";
    const text2 = "I genuinely admire how you handle college life, exams, and everything else.";
    const text3 = "You're calm, sharp, and strong in ways people often don't notice.";
    const text4 = "Simply knowing someone like you exists is inspiring.";

    line1.innerHTML = "";
    line2.style.opacity = 0;
    line3.style.opacity = 0;
    line4.style.opacity = 0;
    nextBtn.style.display = "none";

    let index = 0;

    function typeLine1() {
        if (index < text1.length) {
            line1.innerHTML = text1.substring(0, index + 1) + "<span class='cursor'></span>";
            index++;
            setTimeout(typeLine1, 70);
        } else {
            line1.innerHTML = text1;
            setTimeout(showLine2, 300);
        }
    }

    function showLine2() {
        line2.innerHTML = text2;
        line2.style.transition = "opacity 0.85s ease";
        line2.style.opacity = 1;

        setTimeout(showLine3, 420);
    }

    function showLine3() {
        line3.innerHTML = text3;
        line3.style.transition = "opacity 0.9s ease, text-shadow 0.9s ease";
        line3.style.opacity = 1;
        line3.style.textShadow = "0 0 10px rgba(255, 200, 80, 0.45)";

        setTimeout(showLine4, 380);
    }

    function showLine4() {
        line4.innerHTML = text4;
        line4.style.transition = "opacity 0.9s ease, background 0.7s ease";
        line4.style.opacity = 1;
        line4.style.background = "rgba(255,230,160,0.38)";
        line4.style.padding = "6px 14px";
        line4.style.borderRadius = "8px";

        setTimeout(() => nextBtn.style.display = "inline-block", 480);
    }

    typeLine1();
}

/* ------------------------------------------------------------------
      PAGE 5 — Shared Moments + Sparkles
------------------------------------------------------------------ */
function startPage5Animations() {
    const l1 = document.getElementById("p5-line1");
    const l2 = document.getElementById("p5-line2");
    const l3 = document.getElementById("p5-line3");
    const l4 = document.getElementById("p5-line4");
    const btn = document.getElementById("nextBtnPage5");
    if (!l1 || !l2 || !l3 || !l4 || !btn) return;

    const t1 = "It’s funny how it all started with the Flashmob.";
    const t2 = "Like two random people being paired up as dance partners...";
    const t3 = "And somehow that turned into small chats, roasts, and everything that came after.";
    const t4 = "It’s strange, but I still remember it all — and honestly, I’m glad it happened.";

    l1.innerHTML = "";
    l2.innerHTML = "";
    l3.innerHTML = "";
    l4.innerHTML = "";
    l4.classList.remove("p5-glow");
    btn.style.display = "none";

    function waitForPaint(cb) {
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                setTimeout(cb, 12);
            });
        });
    }

    function type1() {
        l1.style.opacity = 1;
        let index = 0;

        function run() {
            if (index < t1.length) {
                l1.innerHTML = t1.substring(0, index + 1) + "<span class='cursor'></span>";
                index++;
                setTimeout(run, 65);
            } else {
                l1.innerHTML = t1;
                setTimeout(show2, 300);
            }
        }
        run();
    }

    function show2() {
        l2.innerHTML = t2;
        l2.style.transition = "opacity 0.7s ease";
        l2.style.opacity = 1;
        setTimeout(show3, 340);
    }

    function show3() {
        l3.innerHTML = t3;
        l3.style.transition = "opacity 0.7s ease";
        l3.style.opacity = 1;
        setTimeout(show4, 360);
    }

    function show4() {
        l4.innerHTML = t4;
        l4.style.transition = "opacity 0.85s ease";
        l4.style.opacity = 1;

        // soft sparkles on appearance
        createSparkleAround(l4, { count: 8, color: "rgba(255,255,255,0.90)" });

        l4.classList.add("p5-glow");

        setTimeout(() => btn.style.display = "inline-block", 380);
    }

    waitForPaint(() => {
        const pageContent = document.querySelector("#page5 .page-content");
        if (pageContent) {
            pageContent.style.opacity = "1";
            pageContent.style.transform = "none";
        }
        setTimeout(type1, 8);
    });
}

/* ------------------------------------------------------------------
      SPARKLE ENGINE
------------------------------------------------------------------ */
function createSparkleAround(element, opts = {}) {
    if (!element) return;

    const count = Number(opts.count) || 6;
    const color = opts.color || "rgba(255,255,255,0.95)";
    const life = Number(opts.life) || 1600;

    const rect = element.getBoundingClientRect();

    for (let i = 0; i < count; i++) {
        const sparkle = document.createElement("div");
        sparkle.className = "sparkle";
        sparkle.style.position = "fixed";

        const offsetX = (Math.random() - 0.5) * (rect.width * 0.45);
        const offsetY = (Math.random() - 0.5) * 10;

        const left = rect.left + rect.width / 2 + offsetX;
        const top = rect.top + rect.height / 2 + offsetY;

        sparkle.style.left = `${left}px`;
        sparkle.style.top = `${top}px`;

        const size = 4 + Math.random() * 5;
        sparkle.style.width = `${size}px`;
        sparkle.style.height = `${size}px`;
        sparkle.style.background = `radial-gradient(circle, ${color}, rgba(255,255,255,0))`;
        sparkle.style.borderRadius = "50%";
        sparkle.style.opacity = "1";
        sparkle.style.zIndex = 10000;

        document.body.appendChild(sparkle);

        const delay = Math.random() * 200;

        setTimeout(() => {
            sparkle.style.transition = `transform ${life / 1000}s ease-out ${delay}ms, opacity ${life / 1000}s ease-out ${delay}ms`;
            const rise = -12 - Math.random() * 12;
            sparkle.style.transform = `translateY(${rise}px) scale(${1 + Math.random() * 0.3})`;
            sparkle.style.opacity = "0";
        }, 20);

        setTimeout(() => sparkle.remove(), life + delay + 50);
    }
}

/* --------------------------------------
      PAGE 6 — Supportive, Mature, Warm
      Typing (line 1) → fade (line 2–4)
--------------------------------------- */
function startPage6Animations() {
    const l1 = document.getElementById("p6-line1");
    const l2 = document.getElementById("p6-line2");
    const l3 = document.getElementById("p6-line3");
    const l4 = document.getElementById("p6-line4");
    const btn = document.getElementById("nextBtnPage6");

    if (!l1 || !l2 || !l3 || !l4 || !btn) return;

    const t1 = "Since it's your final year, I hope you find clarity, confidence, and peace.";
    const t2 = "You're capable of far more than you give yourself credit for.";
    const t3 = "And I mean this sincerely — I believe in you.";
    const t4 = "No rush, no pressure… just trust yourself a little more.";

    // Reset state
    l1.innerHTML = "";
    l2.innerHTML = "";
    l3.innerHTML = "";
    l4.innerHTML = "";

    l1.style.opacity = 0;
    l2.style.opacity = 0;
    l3.style.opacity = 0;
    l4.style.opacity = 0;

    l4.classList.remove("p6-highlight");
    btn.style.display = "none";

    // Same paint-sync helper we used for Page 5
    function waitForPaint(cb) {
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                setTimeout(cb, 12);
            });
        });
    }

    let index = 0;

    function type1() {
        l1.style.opacity = 1;

        function run() {
            if (index < t1.length) {
                l1.innerHTML = t1.substring(0, index + 1) + "<span class='cursor'></span>";
                index++;
                setTimeout(run, 70);
            } else {
                l1.innerHTML = t1;
                setTimeout(show2, 300);
            }
        }
        run();
    }

    function show2() {
        l2.innerHTML = t2;
        l2.style.transition = "opacity 1s ease";
        l2.style.opacity = 1;
        setTimeout(show3, 400);
    }

    function show3() {
        l3.innerHTML = t3;
        l3.style.transition = "opacity 1s ease";
        l3.style.opacity = 1;
        setTimeout(show4, 450);
    }

    function show4() {
        l4.innerHTML = t4;
        l4.style.transition = "opacity 1s ease";
        l4.style.opacity = 1;

        setTimeout(() => {
            l4.classList.add("p6-highlight");
        }, 300);

        setTimeout(() => {
            btn.style.display = "inline-block";
        }, 600);
    }

    // Start only after page fully painted
    waitForPaint(() => {
        const pageContent = document.querySelector("#page6 .page-content");
        if (pageContent) {
            pageContent.style.opacity = "1";
            pageContent.style.transform = "none";
        }

        setTimeout(type1, 10);
    });
}

/* --------------------------------------
      PAGE 7 — Funny Twist
--------------------------------------- */
function startPage7Animations() {
    const l1 = document.getElementById("p7-line1");
    const l2 = document.getElementById("p7-line2");
    const l3 = document.getElementById("p7-line3");
    const l4 = document.getElementById("p7-line4");
    const muteBtn = document.getElementById("p7-mute-btn");
    const bubble = document.getElementById("p7-bubble");
    const nextBtn = document.getElementById("nextBtnPage7");

    const t1 = "Also… if you ever feel mentally traumatized because of me,";
    const t2 = "Just remember — I come with a free ‘Mute Option’.";
    const t3 = "No subscription. No ads. Unlimited validity.";
    const t4 = "But let’s be honest… you’ll still unmute me eventually.";

    // Reset states
    [l1, l2, l3, l4].forEach(el => {
        el.innerHTML = "";
        el.style.opacity = 0;
        el.className = "p7-line";
    });

    muteBtn.style.display = "none";
    bubble.style.display = "none";
    bubble.style.opacity = 0;
    nextBtn.style.display = "none";

    // Animation sequence
    setTimeout(() => {
        l1.innerHTML = t1;
        l1.classList.add("p7-bounce");
    }, 200);

    setTimeout(() => {
        l2.innerHTML = t2;
        l2.classList.add("p7-pop");
    }, 900);

    setTimeout(() => {
        l3.innerHTML = t3;
        l3.classList.add("p7-grow");
    }, 1500);

    setTimeout(() => {
        l4.innerHTML = t4;
        l4.classList.add("p7-highlight");
    }, 2100);

    // Mute button appears
    setTimeout(() => {
        muteBtn.style.display = "inline-block";
    }, 2600);

    // Bubble behaviour
    muteBtn.onclick = () => {
        bubble.style.display = "inline-block";
        setTimeout(() => {
            bubble.style.opacity = 1;
            bubble.style.transform = "translateY(0)";
        }, 20);
        setTimeout(() => {
            bubble.style.opacity = 0;
            bubble.style.transform = "translateY(10px)";
        }, 1500);
        setTimeout(() => {
            bubble.style.display = "none";
        }, 2000);
    };

    // Next button appears
    setTimeout(() => {
        nextBtn.style.display = "inline-block";
    }, 3200);
}

/* --------------------------------------
      PAGE 8 — Final Emotional Ending
--------------------------------------- */
function startPage8() {
    const l1 = document.getElementById("p8-line1");
    const l2 = document.getElementById("p8-line2");
    const l3 = document.getElementById("p8-line3");
    const l4 = document.getElementById("p8-line4");
    const l5 = document.getElementById("p8-line5");
    const btn = document.getElementById("p8-surprise-btn");

    if (!l1 || !l2 || !l3 || !l4 || !l5 || !btn) return;

    const t1 = "Anyway…";
    const t2 = "your birthday ends in 24 hours,";
    const t3 = "but my annoying energy is permanent. 😌";
    const t4 = "Seriously though — I hope you look back at this little webpage and smile.";
    const t5 = "You've left an impression on me in ways I rarely tell anyone.";

    // Reset
    [l1, l2, l3, l4, l5].forEach(el => {
        el.innerHTML = "";
        el.style.opacity = 0;
    });
    btn.style.display = "none";

    // Firework sparkles
    function createFireworksAround(el, count = 6) {
        const rect = el.getBoundingClientRect();
        for (let i = 0; i < count; i++) {
            const s = document.createElement("div");
            s.className = "p8-spark";

            const offsetX = (Math.random() - 0.5) * rect.width * 0.8;
            const offsetY = (Math.random() - 0.5) * 10;

            s.style.left = rect.left + rect.width/2 + offsetX + "px";
            s.style.top = rect.top + rect.height/2 + offsetY + "px";

            document.body.appendChild(s);
            setTimeout(() => s.remove(), 1500);
        }
    }

    function fadeInLine(el, text, delay, fireworks = false) {
        setTimeout(() => {
            el.innerHTML = text;
            el.style.transition = "opacity 0.9s ease";
            el.style.opacity = 1;

            if (fireworks) {
                setTimeout(() => createFireworksAround(el, 8), 300);
            }
        }, delay);
    }

    fadeInLine(l1, t1, 200);
    fadeInLine(l2, t2, 900);
    fadeInLine(l3, t3, 1600, true);   // Funny + sparkles
    fadeInLine(l4, t4, 2600);
    fadeInLine(l5, t5, 3400, true);   // Emotional highlight + sparkles

    setTimeout(() => {
        btn.style.display = "inline-block";
    }, 4500);
}
/* --------------------------------------
      PAGE 9 — Krishna (Option 2) Expressive
--------------------------------------- */
function startPage9() {
    // elements
    const content = document.getElementById("page9-content");
    const krishnaImg = document.getElementById("p9-krishna-img");
    const flame = document.getElementById("p9-flame");
    const candle = document.getElementById("p9-candle");
    const knife = document.getElementById("p9-knife");
    const cake = document.getElementById("p9-cake");
    const wishWrap = document.getElementById("p9-wish-wrap");
    const wishInput = document.getElementById("p9-wish-input");
    const wishSend = document.getElementById("p9-wish-send");
    const status = document.getElementById("p9-status");

    // ❤️ NEW — dialogue helper
    function showHint(text) {
        let bubble = document.querySelector(".p9-dialogue-bubble");
        if (!bubble) {
            bubble = document.createElement("div");
            bubble.className = "p9-dialogue-bubble";
            document.querySelector(".p9-krishna-wrap").appendChild(bubble);
        }
        bubble.innerText = text;
        bubble.classList.add("show");
        setTimeout(() => bubble.classList.remove("show"), 2600);
    }

    if (!content || !krishnaImg) return;

    // reset
    content.style.opacity = 0;
    flame.classList.remove("flicker");
    knife.style.opacity = 0;
    wishWrap.style.display = "none";
    status.innerText = "Surprise! I wanted to wish you myself.";
    wishInput.value = "";

    let idleTl = gsap.timeline({ repeat: -1, yoyo: true });
    let microTilt = gsap.timeline({ paused: true });

    gsap.set(krishnaImg, { transformOrigin: "50% 30%" });

    /* --------------------------------------
         SHOW PAGE CONTENT + ANIMATIONS
    -------------------------------------- */
    setTimeout(() => {
        content.style.transition = "opacity 360ms ease";
        content.style.opacity = 1;

        // breathing
        idleTl.to(krishnaImg, { duration: 3.2, y: -6, ease: "sine.inOut" });

        // subtle tilt
        microTilt.to(krishnaImg, { duration: 0.28, rotation: 1.0, y: -8 })
                 .to(krishnaImg, { duration: 0.42, rotation: -0.8, y: -10 })
                 .to(krishnaImg, { duration: 0.36, rotation: 0, y: -6 });

        // candle flame appears
        setTimeout(() => {
            flame.classList.add("flicker");
            gsap.to(krishnaImg, { duration: 0.6, rotation: 0.6, yoyo: true, repeat: 1 });

            // 💬 NEW — show hint to tap the flame
            showHint("Tap the flame to blow the candle ✨");

        }, 320);

        // knife → cake cut
        setTimeout(() => {

            // Fade in knife
            gsap.to(knife, {
                opacity: 1,
                duration: 0.25
            });
        
            // Knife enters downward at an angle
            gsap.fromTo(knife,
                { y: -120, rotate: -12 },
                {
                    y: -10,
                    rotate: -4,
                    duration: 0.8,
                    ease: "power3.out"
                }
            );
        
            // Press down + cake compress
            gsap.to(knife, {
                y: 20,
                rotate: -2,
                duration: 0.40,
                delay: 0.8,
                ease: "power2.inOut"
            });
        
            gsap.to(cake, {
                scaleY: 0.92,
                duration: 0.32,
                delay: 0.8,
                ease: "power1.inOut"
            });
        
            // Release pressure + cake bounce
            gsap.to(knife, {
                y: -10,
                rotate: -8,
                duration: 0.40,
                delay: 1.25,
                ease: "power2.out"
            });
        
            gsap.to(cake, {
                scaleY: 1,
                y: -6,
                duration: 0.35,
                delay: 1.25,
                yoyo: true,
                repeat: 1,
                ease: "power1.out"
            });
        
            // Knife exits upward
            gsap.to(knife, {
                y: -150,
                opacity: 0,
                duration: 0.6,
                delay: 1.8,
                ease: "power2.in"
            });
        
        }, 1300);

        // show wish box
        setTimeout(() => {
            wishWrap.style.display = "flex";
            gsap.to(krishnaImg, { duration: 0.5, y: -12 });
            status.innerText = "Make a wish — I'll make sure Krishna hears it.";

        }, 2100);
    }, 20);

    /* --------------------------------------
           🔥 TAP TO BLOW CANDLE
    -------------------------------------- */
    let candleBlown = false;

    function blowCandle() {
        if (candleBlown) return;
        candleBlown = true;

        // blow animation
        gsap.to(flame, { duration: 0.28, opacity: 0, scaleY: 0.3 });
        flame.classList.remove("flicker");

        // 💬 NEW — show hint after blowing
        showHint("Yay! Now write your wish ✨");
    }

    flame.addEventListener("click", blowCandle);

    /* --------------------------------------
        SEND WISH
    -------------------------------------- */
    wishSend.onclick = () => {
        const wish = wishInput.value.trim();
        if (!wish) {
            gsap.fromTo(wishInput, { x: -6 }, { x: 6, repeat: 3, yoyo: true });
            return;
        }

        localStorage.setItem("p9_last_wish", wish);
        status.innerText = "Sending your wish...";

        // blow (if not blown earlier)
        blowCandle();

        // blessing
        setTimeout(() => {
            gsap.to(krishnaImg, { duration: 0.42, y: -38, scale: 1.04 });
        }, 420);

       // final blessing + floating wish
setTimeout(() => {

    // final message
    status.innerText = "I've heard your wish… Have faith, it will come true 💛";

    // 🌟 CREATE FLOATING WISH TEXT
    let float = document.createElement("div");
    float.className = "p9-wish-floating";
    float.innerText = wish;
    document.getElementById("page9-content").appendChild(float);

}, 1300);



        // 💬 FINAL HINT
        setTimeout(() => {
            showHint("Your wish is safe with me 💛");
        }, 1600);
    };
}


/* ------------------------------------------------------------------
      KRISHNA TRANSITION
------------------------------------------------------------------ */
function startKrishnaTransition() {
    hideAllPages();

    const overlay = document.getElementById("pre-krishna-transition");
    if (!overlay) return;

    overlay.style.display = "flex";

    // stop unwanted sparkles during transition
    document.querySelectorAll(".sparkle").forEach(s => s.remove());

    setTimeout(() => {
        document.body.classList.remove("light-theme");
        document.body.classList.add("dark-theme");

        overlay.style.display = "none";
        startKrishnaEntrance();
    }, 3000);
}

/* ------------------------------------------------------------------
      KRISHNA ENTRANCE ANIMATION
------------------------------------------------------------------ */
function startKrishnaEntrance() {
    const krishna = document.getElementById("krishna-img");
    const glow = document.getElementById("krishna-glow");
    const dialogue = document.getElementById("krishna-dialogue");
    if (!krishna || !glow || !dialogue) return;

    document.getElementById("krishna-entrance").style.display = "flex";

    const tl = gsap.timeline();

    tl.to(glow, { opacity: 0.2, duration: 2, ease: "power2.out" });
    tl.to(glow, { opacity: 0.5, duration: 2, ease: "power3.out" }, "-=1");

    tl.to(krishna, { opacity: 0.25, duration: 1.5, ease: "power1.out" }, "-=1");

    tl.to(krishna, {
        y: -40,
        scale: 1.0,
        opacity: 0.7,
        duration: 3,
        ease: "power2.out"
    });

    tl.to(glow, { opacity: 1, duration: 2, ease: "power2.inOut" }, "-=2");
    tl.to(krishna, { y: -50, duration: 0.5, ease: "bounce.out" });

    tl.to(glow, {
        scale: 1.1,
        duration: 1,
        repeat: 1,
        yoyo: true,
        ease: "sine.inOut"
    }, "-=0.5");

    tl.to(dialogue, { opacity: 1, scale: 1, duration: 1 });
}

/* START PAGE 0 ON LOAD */
showPage(0);
