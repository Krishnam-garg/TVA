// Wait for the HTML DOM to be fully loaded before running any GSAP code
document.addEventListener("DOMContentLoaded", () => {
// Force page to start at the very top on reload
history.scrollRestoration = "manual";
window.addEventListener("beforeunload", () => {
    window.scrollTo(0, 0);
});
    // Register GSAP plugins safely
    gsap.registerPlugin(ScrollTrigger, TextPlugin, ScrollToPlugin);
// ==========================================
// 1. PRELOADER BOOT SEQUENCE (JS-DRIVEN GLITCH)
// ==========================================
const preloaderTl = gsap.timeline({
    onComplete: () => {
        cleanupPreloader();
    }
});

function cleanupPreloader() {
    const preloader = document.getElementById("tva-preloader");
    if (preloader) preloader.remove();
    ScrollTrigger.refresh();
}

// Failsafe timer
setTimeout(() => {
    cleanupPreloader();
}, 6000);

// Array of angular, brutalist tech fonts
const glitchFonts = ['Oswald', 'Orbitron', 'Cinzel', 'Anton', 'VT323', 'Share Tech Mono'];
const lokiChars = document.querySelectorAll('.loki-char');

// High-speed interval: Changes every 60ms so every letter has a totally random font independently
const fontGlitchInterval = setInterval(() => {
    lokiChars.forEach(char => {
        const randomFont = glitchFonts[Math.floor(Math.random() * glitchFonts.length)];
        char.style.fontFamily = randomFont;
    });
}, 100);
const customCursor = document.getElementById("custom-cursor");

let mouseX = 0;
let mouseY = 0;

let cursorX = 0;
let cursorY = 0;

document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

function animateCursor() {
    cursorX += (mouseX - cursorX) * 0.3;
    cursorY += (mouseY - cursorY) * 0.3;

    customCursor.style.transform =
        `translate(${cursorX - 2}px, ${cursorY - 2}px)`;

    requestAnimationFrame(animateCursor);
}

animateCursor();
// GSAP Preloader Timeline (Speeded up to 2 seconds)
preloaderTl.to({}, { duration: 2.0 }) // Runs the chaotic JS glitch for 2 seconds
.call(() => {
    // Stop the random font generator
    clearInterval(fontGlitchInterval);
    
    // Lock all characters into the final pixelated TVA style
    lokiChars.forEach(char => {
        char.style.fontFamily = "'VT323', monospace";
        char.style.color = "#ffffff";
    });
})
.to("#glitch-title", {
    opacity: 0,
    duration: 0.3,
    delay: 0.4
})
.call(() => {
    const bootSeq = document.getElementById("boot-sequence");
    const glitchTitle = document.getElementById("glitch-title");
    if(bootSeq) bootSeq.classList.remove("hidden");
    if(glitchTitle) glitchTitle.classList.add("hidden"); 
})
.to("#boot-text", {
    duration: 0.8, // Faster terminal typing
    text: "> INITIALIZING TEMPAD...",
    ease: "none"
})
.to("#boot-text", {
    duration: 0.8, // Faster terminal typing
    text: "> LOCATING VARIANT... SUCCESS.",
    ease: "none",
    delay: 0.2 
})
.to("#tva-preloader", {
    scaleY: 0.02,
    transformOrigin: "center",
    backgroundColor: "#FF5A00",
    duration: 0.2,
    ease: "power2.inOut",
    delay: 0.4
})
.to("#tva-preloader", {
    scaleX: 0,
    duration: 0.3,
    ease: "power2.inOut"
});

    // ==========================================
    // 2. MISS MINUTES BRIEFING LOGIC
    // ==========================================
    const mmStates = [
        {
            text: "Hey y'all! I'm Miss Minutes! Looks like we've got a fresh batch of Variants ready to prove themselves.",
            img: "https://res.cloudinary.com/dyvlj9ews/image/upload/v1790506636/1.png" 
        },
        {
            text: "Welcome to the TVA! \"Techno Venture Arena\" by Geeks for Geeks BU. We're the folks who maintain the proper flow of logic, and prune all the nasty Bugs.",
            img: "https://res.cloudinary.com/dyvlj9ews/image/upload/v1790506635/3.png" 
        },
        {
            text: "This whole operation is overseen by the Code-Keepers! They're the brilliant minds at the top of GFG BU. They dictate the proper flow.",
            img: "https://res.cloudinary.com/dyvlj9ews/image/upload/v1790508602/Untitled_design.png" 
        },
        {
            text: "To prove you belong, you'll face a few little trials! We've got Nexus Events hapenning all across The Sacred Timeline. Help us out and you may earn a chance to prevent Pruning.",
            img: "https://res.cloudinary.com/dyvlj9ews/image/upload/v1790506635/6.png" 
        },
        {
            text: "Scroll down to view the Sacred Timeline! Don't Step out of line or miss a deadline, we really wouldn't want you getting pruned.<br><br> Happy coding!",
            img: "https://res.cloudinary.com/dyvlj9ews/image/upload/v1790506635/4.png" 
        }
    ];

    function updateMissMinutes(index) {
        const currentState = mmStates[index];
        const dialogueEl = document.getElementById("mm-dialogue");
        const spriteEl = document.getElementById("mm-sprite");
        
        if(!dialogueEl || !spriteEl) return;
        
        spriteEl.src = currentState.img;
        gsap.killTweensOf(dialogueEl);
        dialogueEl.innerHTML = "";
        
        gsap.to(dialogueEl, {
            duration: 1.2,
            text: currentState.text,
            ease: "none" 
        });
    }

    mmStates.forEach((state, index) => {
        ScrollTrigger.create({
            trigger: `#trigger-${index + 1}`,
            start: "top 50%", 
            end: "bottom 50%",
            onEnter: () => updateMissMinutes(index),
            onEnterBack: () => updateMissMinutes(index),
        });
    });
    // ==========================================
// MAGNETIC SECTION SNAPPING (SEAMLESS TRANSITION)
// ==========================================

// 1. Snap DOWN into the timeline when it comes into view
ScrollTrigger.create({
    trigger: "#horizontal-timeline",
    start: "top 80%", // Fires when the top of the timeline reaches 80% down the viewport
    onEnter: () => {
        gsap.to(window, {
            scrollTo: "#horizontal-timeline", 
            duration: 1.2, 
            ease: "power3.inOut" // Smooth cinematic acceleration and deceleration
        });
    }
});

// 2. Snap UP back to Miss Minutes if the user scrolls back up
ScrollTrigger.create({
    trigger: "#horizontal-timeline",
    start: "top 10%", // Fires if the user scrolls up past the top of the pinned timeline
    onEnterBack: () => {
        const briefingSection = document.getElementById("variant-briefing");
        const bottomOfBriefing = briefingSection.offsetTop + briefingSection.offsetHeight - window.innerHeight;
        
        gsap.to(window, {
            scrollTo: bottomOfBriefing,
            duration: 1.2,
            ease: "power3.inOut"
        });
    }
});
    // ==========================================
    // 3. SACRED TIMELINE HORIZONTAL SCROLL
    // ==========================================
    const track = document.getElementById("timeline-track");

    if(track) {
        function getScrollAmount() {
            return -(track.scrollWidth - window.innerWidth);
        }

        const scrollTween = gsap.to(track, {
            x: getScrollAmount,
            ease: "none",
            scrollTrigger: {
                trigger: "#horizontal-timeline",
                pin: true,
                scrub: 1,
                start: "top top",
                end: () => `+=${track.scrollWidth - window.innerWidth}`,
                invalidateOnRefresh: true
            }
        });

        const nodes = gsap.utils.toArray('.timeline-node');

        nodes.forEach(node => {
            const branch = node.querySelector('.branch-wrapper');
            const card = node.querySelector('.event-card');
            
            if(!branch || !card) return;

            gsap.set(branch, { opacity: 0, x: -40 }); 
            gsap.set(card, { opacity: 0, y: 20 }); 

            gsap.timeline({
                scrollTrigger: {
                    trigger: node,
                    containerAnimation: scrollTween,
                    start: "left center",
                    toggleActions: "play none none reverse"
                }
            })
            .to(branch, { opacity: 1, x: 0, duration: 0.6, ease: "power2.out" })
            .to(card, { opacity: 1, y: 0, duration: 0.5, ease: "back.out(1.2)" }, "-=0.4"); 
        });
    }

    // ==========================================
    // 5. LORE BRIDGE: MISS MINUTES CRISIS DIALOGUE
    // ==========================================
    const mmStates2 = [
        {
            text: "Ooh, things are getting a bit messy out there! The Temporal Loom is overloading from all these unresolved Nexus Events in the network!",
            img: "https://res.cloudinary.com/dyvlj9ews/image/upload/v1790530694/9.png" 
        },
        {
            text: "God of Stories is doing his best holding the branches together at the End of Time, now that He Who Remains is gone, Loki can't patch all these anomalies alone. We need Geeks!",
            img: "https://res.cloudinary.com/dyvlj9ews/image/upload/v1790530694/10.png" 
        },
        {
            text: "If you can stabilize the code, you'll earn your spot in the Temporal Archives right next to him earning the title \"He Who Remains\". Let's take a peek at the Employee of All Time registry!",
            img: "https://res.cloudinary.com/dyvlj9ews/image/upload/v1790506635/6.png" 
        }
    ];

    function updateMissMinutes2(index) {
        const currentState = mmStates2[index];
        const dialogueEl = document.getElementById("mm-dialogue-2");
        const spriteEl = document.getElementById("mm-sprite-2");
        
        if(!dialogueEl || !spriteEl) return;
        
        spriteEl.src = currentState.img;
        gsap.killTweensOf(dialogueEl);
        dialogueEl.innerHTML = "";
        
        gsap.to(dialogueEl, {
            duration: 1.2,
            text: currentState.text,
            ease: "none" 
        });
    }

    mmStates2.forEach((state, index) => {
        ScrollTrigger.create({
            trigger: `#trigger-lore-${index + 1}`,
            start: "top 50%", 
            end: "bottom 50%",
            onEnter: () => updateMissMinutes2(index),
            onEnterBack: () => updateMissMinutes2(index),
        });
    });

    // ==========================================
    // 6. TEMPORAL ARCHIVES (FOLDER CLICK LOGIC)
    // ==========================================
    const folderLoki = document.getElementById('folder-loki');
    const folderVariant = document.getElementById('folder-variant');
    
    const modalLoki = document.getElementById('modal-loki');
    const contentLoki = document.getElementById('content-loki');
    
    const modalVariant = document.getElementById('modal-variant');
    const contentVariant = document.getElementById('content-variant');

    const closeButtons = document.querySelectorAll('.close-dossier');

    // Open Loki Dossier (Green)
    if(folderLoki && modalLoki) {
        folderLoki.addEventListener('click', () => {
            modalLoki.classList.remove('hidden');
            modalLoki.classList.add('flex');
            
            gsap.to(contentLoki, {
                scale: 1,
                opacity: 1,
                duration: 0.5,
                ease: "back.out(1.1)"
            });
        });
    }

    // Open Variant Dossier (Orange Skeleton)
    if(folderVariant && modalVariant) {
        folderVariant.addEventListener('click', () => {
            modalVariant.classList.remove('hidden');
            modalVariant.classList.add('flex');
            
            gsap.to(contentVariant, {
                scale: 1,
                opacity: 1,
                duration: 0.5,
                ease: "back.out(1.1)"
            });
        });
    }

    // Close Modals on [X] Click
    closeButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            // Find which modal we are inside
            const parentContent = e.target.closest('div[id^="content-"]');
            const parentModal = e.target.closest('div[id^="modal-"]');
            
            gsap.to(parentContent, {
                scale: 0.9,
                opacity: 0,
                duration: 0.3,
                ease: "power2.in",
                onComplete: () => {
                    parentModal.classList.add('hidden');
                    parentModal.classList.remove('flex');
                }
            });
        });
    });
// ==========================================
    // 4. TEMPAD INTERACTIVE POPUP LOGIC
    // ==========================================
    const tempadModal = document.getElementById('tempad-modal');
    const tempadContent = document.getElementById('tempad-content');
    const closeTempadBtn = document.getElementById('close-tempad');
    
    // The text elements we will swap out dynamically
    const tTitle = document.getElementById('tempad-title');
    const tTime = document.getElementById('tempad-time');
    const tDesc = document.getElementById('tempad-desc');

    const eventCards = document.querySelectorAll('.event-card');

    eventCards.forEach(card => {
        card.addEventListener('click', () => {
            // 1. Pull the unique data from the clicked event card
            const title = card.getAttribute('data-title');
            const time = card.getAttribute('data-time');
            const desc = card.getAttribute('data-desc');

            // 2. Inject it into the TemPad HTML
            tTitle.textContent = "> " + title;
            tTime.textContent = time;
            
            // 3. Reveal the modal container
            tempadModal.classList.remove('hidden');
            tempadModal.classList.add('flex');
            
            // 4. GSAP Animation for a high-tech "pop-in"
            gsap.to(tempadContent, {
                scale: 1,
                opacity: 1,
                duration: 0.4,
                ease: "back.out(1.2)"
            });

            // 5. Typewriter effect for the description text to make it feel like it's calculating
            gsap.killTweensOf(tDesc);
            tDesc.textContent = "";
            gsap.to(tDesc, {
                duration: 1.5,
                text: desc,
                ease: "none",
                delay: 0.2
            });
        });
    });

    // Close the TemPad and return to the timeline
    closeTempadBtn.addEventListener('click', () => {
        gsap.to(tempadContent, {
            scale: 0.9,
            opacity: 0,
            duration: 0.2,
            ease: "power2.in",
            onComplete: () => {
                tempadModal.classList.add('hidden');
                tempadModal.classList.remove('flex');
            }
        });
    });

   // ==========================================
    // 7. CTA INTERACTION & PRUNING EASTER EGG
    // ==========================================
    const btnAccept = document.getElementById('btn-accept');
    const btnRefuse = document.getElementById('btn-refuse');
    const prunedOverlay = document.getElementById('pruned-overlay');
    const pruneProgress = document.getElementById('prune-progress');

    // Accept Directive -> Triggers registration
    if(btnAccept) {
        btnAccept.addEventListener('click', () => {
            // Optional: Give a quick terminal feedback effect before navigating
            alert("> TEMPORAL CLEARANCE GRANTED. Opening Variant Intake Manifest...");
            window.open("https://form.jotform.com/262695128449065", "_blank");
        });
    }
    // Refuse Directive -> Triggers Miss Minutes Pruning Popup
    if(btnRefuse) {
        btnRefuse.addEventListener('click', () => {
            // Display the modal
            prunedOverlay.classList.remove('hidden');
            prunedOverlay.classList.add('flex');

            // Quick violent screen shake on body
            // gsap.to("body", {
            //     x: (i) => Math.sin(i * 50) * 8,
            //     duration: 0.4,
            //     repeat: 3,
            //     yoyo: true,
            //     ease: "power1.inOut"
            // });

            // Smooth progress bar fill leading into page reload
            gsap.to(pruneProgress, {
                width: "100%",
                duration: 3, // Gives the user 3 seconds to read Miss Minutes' message
                ease: "power2.inOut",
                onComplete: () => {
                    window.location.reload();
                }
            });
        });
    }
// ==========================================
    // 8. CTA IN-YOUR-FACE SCROLL POPUP ANIMATION
    // ==========================================
    gsap.to("#cta-box", {
        scale: 1,
        opacity: 1,
        duration: 0.6,
        ease: "back.out(1.2)", // Gives it a satisfying cinematic snap into your face
        scrollTrigger: {
            trigger: "#cta-pin-container",
            start: "top 60%", // Triggers right as the section comes into view
            toggleActions: "play none none reverse" // Plays on scroll down, reverses if you scroll back up
        }
    });
   // ==========================================
    // 9. CLEAN MAGNETIC SECTION SNAPPING (EXCLUDING PINNED SECTIONS)
    // ==========================================
    gsap.registerPlugin(ScrollToPlugin);

    ScrollTrigger.create({
        snap: {
            // Target specific unpinned sections and containers to avoid breaking horizontal scroll
            snapTo: ["#variant-briefing", "#hall-of-fame", "#cta-pin-container"],
            duration: { min: 0.2, max: 0.6 },
            delay: 0.1,
            ease: "power2.inOut"
        }
    });
    
});