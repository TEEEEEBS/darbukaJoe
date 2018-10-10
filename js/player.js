


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
            subBody.innerHTML="T";
            subBeat.appendChild(subHeader);
            subBeat.appendChild(subBody);
            beat.appendChild(subBeat);
        }
        parent.appendChild(beat);
    }
}

function highlightCurrentStep(step) {
    console.log(step);
    var elements = document.getElementsByClassName("sub-beat");
    for (var i = 0; i < elements.length; i++) {
        elements[i].classList.remove("highlighted");
    }
    elements[step].classList.add("highlighted");
}

function getInputAtStep(step){
    var elements = document.getElementsByClassName("sub-beat");
    return elements[step].innerHTML;
}

function playStroke(input) {
    var strokeD = 80;
    var strokeT = 90;
    var strokeK = 100;
    var stroke = "-";
    
    switch (input) {
        case 'D':
            stroke = strokeD;
            break;
        case 'T':
            stroke = strokeT;
            break;
        case 'K':
            stroke = strokeK;
            break;            
        default:
            stroke = 0;
    }
    
    
    var osc = audioContext.createOscillator();
    osc.connect(audioContext.destination);
    osc.type = "triangle";
    osc.frequency.value = stroke;
    console.log("i should be playing");
    osc.start(audioContext.currentTime);
    osc.stop(audioContext.currentTime + .2);
}