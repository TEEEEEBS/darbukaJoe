console.log('In main.js');
var audioContext = new AudioContext();

var beats = 4;
var subBeats = 4;
var step = 0;
var bpm = 80;
var rhythm = "----------------";

/*
Initialize stuff
*/
window.onload = function () {
    generatePlayer(beats, subBeats);
    
    // Create event listeners
    document.querySelector("#player-wrapper").addEventListener("click", handlePlayerClick, false);
}

/*
This is where the music happens. This function loops continuously at an interval defined by the bpm var.
If bpm gets changed, the loop will need to be restarted.
Restart has not yet been implemented. See:
https://stackoverflow.com/questions/8126466/how-do-i-reset-the-setinterval-timer
*/
setInterval(function() {
    // Only run if toggled on
    if (document.getElementById("toggle").checked) {
        // Highlight current step
        highlightCurrentStep(step);

        // Play stroke
        playStroke(getInputAtStep(step));            
        step = (step + 1) % rhythm.length;
    } else {
        step = 0;
    }
    
}, 60000/bpm/4);





function generatePlayer(beats, subBeats) {
    var parent = document.getElementById("player-wrapper");
    
    // Beat
    for (var i = 0; i < beats; i++) {
        var beat = document.createElement("div");
        if (i%2 === 0) {
            beat.className="beat-even";
        } else {
            beat.className="beat-odd";
        }
        
        // Sub-beat
        for (var j = 0; j < subBeats; j++) {
            var subBeat = document.createElement("div");
            var subHeader = document.createElement("div");
            var subBody = document.createElement("div");
            
            subBeat.className="sub-beat";
            subHeader.className="sub-header";
            subBody.className="sub-body";
            
            switch (j) {
                case 0:
                    subHeader.innerHTML=i+1;
                    break;
                case 1:
                    subHeader.innerHTML="e";
                    break;
                case 2:
                    subHeader.innerHTML="&";
                    break;
                case 3:
                    subHeader.innerHTML="a";
                    break;
                default:
                    subHeader.innerHTML="X";
            }
            subBody.innerHTML = "-";
            //subBody.id = "sub-body-" + (i*4 + j); // Not sure ids are needed here...
            subBeat.appendChild(subHeader);
            subBeat.appendChild(subBody);
            beat.appendChild(subBeat);
        }
        parent.appendChild(beat);
    }
}

function highlightCurrentStep(step) {
    var elements = document.getElementsByClassName("sub-beat");
    for (var i = 0; i < elements.length; i++) {
        elements[i].classList.remove("highlighted");
    }
    elements[step].classList.add("highlighted");
}

function getInputAtStep(step){
    var elements = document.getElementsByClassName("sub-body");
    return elements[step].innerText;
}

function playStroke(input) {
    console.log("input: " + input);
    var strokeD = 80;
    var strokeT = 90;
    var strokeK = 100;
    var stroke = 0;
    
        switch (input) {
            case 'D':
                stroke = strokeD;
                break;
            case "T":
                stroke = strokeT;
                console.log("HEY");
                break;
            case 'K':
                stroke = strokeK;
                break;            
            default:
                stroke = 20;
        }
    
    
    var osc = audioContext.createOscillator();
    osc.connect(audioContext.destination);
    osc.type = "triangle";
    osc.frequency.value = stroke;
    console.log("i should be playing " + stroke);
    osc.start(audioContext.currentTime);
    osc.stop(audioContext.currentTime + .2);
}

// Stolen from:
// https://www.kirupa.com/html5/handling_events_for_many_elements.htm
function handlePlayerClick(e) {
    if (e.target.className === "sub-body") {
        changeCharacter(e.target);
    }
}

function changeCharacter(element) {
    var validChars = "DTK-";
    var flag = 0
    for (var i=0; i < validChars.length; i++) {
        if ((validChars.charAt(i) === element.innerText) && (!flag)) {
            element.innerHTML = validChars.charAt((i + 1) % validChars.length);
            flag = 1;
        } else {
            console.log("HEY");
        }
    }
    
    //element.innerHTML= "!";
}