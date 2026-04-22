// Student Number: 12345678

// ─── BLEND NOW ───────────────────────────────────────────────────────────────

/**
 * Called when the user clicks "Blend Now".
 * Clears any previous output, reads all user settings, then injects
 * each character of the surname as an absolutely-positioned <span>
 * inside the #output div.
 */
function blendNow() {
    var output = document.getElementById("output");

    // Clear any previously blended letters
    output.innerHTML = "";

    // Read the surname input
    var surname = document.getElementById("surname").value.trim();
    if (surname === "") {
        return; // nothing to blend
    }

    // Read chosen font from the dropdown
    var font = document.getElementById("font").value;

    // Read the selected position radio button value
    var posRadios = document.getElementsByName("pos");
    var position = "seq"; // default
    for (var i = 0; i < posRadios.length; i++) {
        if (posRadios[i].checked) {
            position = posRadios[i].value;
            break;
        }
    }

    // Read colour from the dropdown (Black / Red / Blue / Green)
    var colorSelect = document.getElementById("color-select");
    var chosenColor = colorSelect ? colorSelect.value : "black";

    // Allow the color picker to override if the user has changed it
    var colorPicker = document.getElementById("color-picker");
    if (colorPicker && colorPicker.value !== "#000000") {
        chosenColor = colorPicker.value;
    }

    // Read font size (default 16)
    var fontSizeInput = document.getElementById("font-size");
    var fontSize = fontSizeInput ? parseInt(fontSizeInput.value) || 16 : 16;

    // Read letter spacing slider
    var lsSlider = document.getElementById("letter-spacing");
    var letterSpacing = lsSlider ? parseInt(lsSlider.value) || 0 : 0;

    // Build the character array; reverse it if "Reverse" is selected
    var chars = surname.split("");
    if (position === "rev") {
        chars = chars.reverse();
    }

    // Inject each character into #output as an absolutely-positioned <span>
    for (var j = 0; j < chars.length; j++) {
        var span = document.createElement("span");
        span.textContent = chars[j];

        // Apply styling
        span.style.position    = "absolute";
        span.style.fontFamily  = font;
        span.style.fontSize    = fontSize + "px";
        span.style.color       = chosenColor;
        span.style.letterSpacing = letterSpacing + "px";

        // Position the span according to the selected mode
        if (position === "rand") {
            // Random: x between 0–300 px, y between 0–100 px
            span.style.left = Math.floor(Math.random() * 301) + "px";
            span.style.top  = Math.floor(Math.random() * 101) + "px";
        } else {
            // Sequential or Reverse: 15-pixel intervals starting at (15, 15)
            var step = j + 1;
            span.style.left = (step * 15) + "px";
            span.style.top  = (step * 15) + "px";
        }

        output.appendChild(span);
    }
}

// ─── APPLY STYLE ─────────────────────────────────────────────────────────────

/**
 * Applies colour, font size and letter spacing to all currently
 * displayed letter spans without re-blending.
 */
function applyStyle() {
    var letters = document.querySelectorAll("#output span");

    var colorSelect  = document.getElementById("color-select");
    var colorPicker  = document.getElementById("color-picker");
    var fontSizeInput = document.getElementById("font-size");
    var lsSlider     = document.getElementById("letter-spacing");

    var chosenColor = colorSelect ? colorSelect.value : "black";
    if (colorPicker && colorPicker.value !== "#000000") {
        chosenColor = colorPicker.value;
    }

    var fontSize      = fontSizeInput ? parseInt(fontSizeInput.value) || 16 : 16;
    var letterSpacing = lsSlider      ? parseInt(lsSlider.value) || 0 : 0;

    for (var i = 0; i < letters.length; i++) {
        letters[i].style.color         = chosenColor;
        letters[i].style.fontSize      = fontSize + "px";
        letters[i].style.letterSpacing = letterSpacing + "px";
    }
}

// ─── SLIDER LIVE-UPDATE HELPERS ──────────────────────────────────────────────

window.addEventListener("DOMContentLoaded", function () {

    // Letter-spacing slider → show live value
    var lsSlider = document.getElementById("letter-spacing");
    var lsVal    = document.getElementById("ls-val");
    if (lsSlider && lsVal) {
        lsSlider.addEventListener("input", function () {
            lsVal.textContent = lsSlider.value + "px";
        });
    }

    // Letter-size slider → update font-size input and show live value
    var lsizeSlider = document.getElementById("letter-size");
    var lsizeVal    = document.getElementById("lsize-val");
    if (lsizeSlider && lsizeVal) {
        lsizeSlider.addEventListener("input", function () {
            lsizeVal.textContent = lsizeSlider.value + "px";
            var fsInput = document.getElementById("font-size");
            if (fsInput) { fsInput.value = lsizeSlider.value; }
        });
    }

    // Output-box height slider → resize #output live
    var bhSlider = document.getElementById("box-height");
    var bhVal    = document.getElementById("bh-val");
    if (bhSlider && bhVal) {
        bhSlider.addEventListener("input", function () {
            bhVal.textContent = bhSlider.value + "px";
            document.getElementById("output").style.height = bhSlider.value + "px";
        });
    }

    // Sync color-select dropdown to color-picker
    var colorSelect = document.getElementById("color-select");
    var colorPicker = document.getElementById("color-picker");
    if (colorSelect && colorPicker) {
        colorSelect.addEventListener("change", function () {
            var map = {
                "black": "#000000",
                "red"  : "#ff0000",
                "blue" : "#0000ff",
                "green": "#008000"
            };
            colorPicker.value = map[colorSelect.value] || "#000000";
        });
    }

    // Wire up buttons
    var blendBtn = document.getElementById("blend-btn");
    if (blendBtn) { blendBtn.addEventListener("click", blendNow); }

    var applyBtn = document.getElementById("apply-btn");
    if (applyBtn) { applyBtn.addEventListener("click", applyStyle); }
});
