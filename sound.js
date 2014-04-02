(function() {
    var context, 
        soundSource, 
        soundBuffer,
        analyser,
        source,
        audioElement,
        url = 'http://localhost:8000/bounceit.mp3';

    // Step 1 - Initialise the Audio Context
    // There can be only one!
    function init() {
        if (typeof AudioContext !== "undefined") {
            context = new AudioContext();
        } else if (typeof webkitAudioContext !== "undefined") {
            context = new webkitAudioContext();
        } else {
            throw new Error('AudioContext not supported. :(');
        }
        audioElement = document.getElementById("player");
        analyser = context.createAnalyser();
        audioElement.addEventListener("canplay", function() {
            console.log("blahhhh");
            source = context.createMediaElementSource(audioElement);
            source.connect(analyser);
            source.connect(context.destination);
            setInterval(function(){
            	update();
                },5000);
        });
    }
    
    function update() {
    	var frequencyData = new Uint8Array(analyser.frequencyBinCount);
    	analyser.getByteFrequencyData(frequencyData);
    	//for(var i =0; i < frequencyData.length; i++){
    	console.log(frequencyData);
    	//}
    }

    init();



}());