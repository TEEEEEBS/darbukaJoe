console.log("In index.js");

var audioContext = new AudioContext();

var bpm = 90;
var rhythmHeader = "1e&a2e&a3e&a4e&a"
var rhythmSaidi = "D-T-TKD-D-TKT-TK"

var strokeD = 80;
var strokeT = 90;
var strokeK = 100;

function playStroke(stroke) {
    var osc = audioContext.createOscillator();
    osc.connect(audioContext.destination);
    osc.type = "triangle";
    osc.frequency.value = stroke;
    osc.start(audioContext.currentTime);
    osc.stop(audioContext.currentTime + .1);
}

function highlightCharacter(string, position) {
// finish me
}

var step = 0;

/*
This is where the music happens. This function loops continuously at an interval defined by the bpm var.
If bpm gets changed, the loop will need to be restarted.
Restart has not yet been implemented. See:
https://stackoverflow.com/questions/8126466/how-do-i-reset-the-setinterval-timer
*/
setInterval(function() {

    
// Execute only if a stroke is played on this step
    if (document.getElementById("toggle").checked) {
        rhythm = document.getElementById("rhythmInput").value;
        
        // Play stroke
        if (rhythm.charAt(step).match(/[A-Z]/i)) {
            playStroke(eval("stroke" + rhythm.charAt(step)));
        }
                                      
        step = (step + 1) % rhythm.length;
    } else {
        step = 0;
    }
    
}, 60000/bpm/4);
