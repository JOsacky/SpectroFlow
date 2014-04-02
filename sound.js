(function() {
    var context, 
        soundSource, 
        soundBuffer,
        analyser,
        source,
        audioElement,
        bucketNumber = 5,
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
        analyser.smoothingTimeConstant = 0;
        audioElement.addEventListener("canplay", function() {
            source = context.createMediaElementSource(audioElement);
            source.connect(analyser);
            source.connect(context.destination);
            setInterval(function(){
            	update();
                },500);
        });
    }
    
    function update() {
    
    	var frequencyData = new Uint8Array(analyser.frequencyBinCount);
    	var dataArray = [0,0,0,0,0];
    	
    	analyser.getByteFrequencyData(frequencyData);
    	
    	var interval = Math.ceil(frequencyData.length/bucketNumber);
    	
    	var sum = 0;
    	
    	for(var i = 0; i < frequencyData.length; i++){
    		sum+=frequencyData[i];
    		var index = Math.floor(i/interval);
    		dataArray[index]+=frequencyData[i];
    	}
    	console.log(dataArray);
    }

    init();



}());