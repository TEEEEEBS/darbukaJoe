var beats = 4;
var beatsPerMeasure = 4;

window.onload = function () {
    generatePlayer(beats, beatsPerMeasure);
}



function generatePlayer(beats, beatsPerMeasure) {
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
        for (var j = 0; j < beatsPerMeasure; j++) {
            var subBeat = document.createElement("div");
            var subHeader = document.createElement("div");
            var subBody = document.createElement("div");
            
            subBeat.className="sub-beat";
            subHeader.className="sub-header";
            subBody.className="sub-body";
            
            subHeader.innerHTML="H";
            subBody.innerHTML="B";
            
            subBeat.appendChild(subHeader);
            subBeat.appendChild(subBody);
            beat.appendChild(subBeat);
        }
        parent.appendChild(beat);
    }
}
