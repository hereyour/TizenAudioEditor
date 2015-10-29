var wavesurfer = Object.create(WaveSurfer);
var isLoad = false;
var path;
function palyPauseBtn()
{
	wavesurfer.playPause();
}

function onOpenSuccess(fs)
{
   /* Write HelloWorld to the file */
   fs.write("HelloWorld");

   /* Read the file content */
   fs.read(testFile.fileSize);

   /* Close the file */
   fs.close();
}

function appClose()
{
    tizen.application.getCurrentApplication().exit();
}

/* Retrieve a storage */
function wavesurferStart(fileName)
{
    
	if(isLoad)
    {
        wavesurfer.destroy();
        var parentNode = document.getElementById("waveform");
        parentNode.firstChild.remove();
        wavesurfer = Object.create(WaveSurfer);
    }
    var closeBtns = document.querySelectorAll('.close');

	var category_audio = '';
	var desc_1_audio = '';
	var desc_2_audio = '';
	var desc_3_audio = '';
	
    wavesurfer.on('ready', function () {
	    var timeline = Object.create(WaveSurfer.Timeline);
	    timeline.init({
	        wavesurfer: wavesurfer,
	        container: "#wave-timeline"
	    });
	});
	    
	wavesurfer.init({
	    container: '#waveform',
	    waveColor: 'gray',
	    progressColor: 'purple',
	    height: 100,
	    pixelRatio: 1,
	    scrollParent: true,
	    //hideScrollbar:true,
	    normalize: true,
	    minimap: true,
	    backend: 'AudioElement'
	});
    fileName = "video/"+fileName;
	wavesurfer.load(
	    fileName
        //'video/testVideo.mp4'
	    //'video/T2002-0429_S000_20141001_PS-2014185949-01-000_02_M4H21000_10_20min.mp4'
	    //'T2002-0429_S000_20141001_PS-2014185949-01-000_02_M4H21000_10_50min.mp4'
	);
    
	/* Minimap plugin */
	wavesurfer.initMinimap({
	    height: 30,
	    waveColor: '#ddd',
	    progressColor: '#999',
	    cursorColor: '#999'
	});
	    
	/* Regions */
	wavesurfer.enableDragSelection({
	    color: 'rgba(0, 255, 0, 0.2)'
	});

	/* Toggle play/pause buttons. 
	var playButton = document.querySelector('#play');
	var pauseButton = document.querySelector('#pause');
	wavesurfer.on('play', function () {
	    playButton.style.display = 'none';
	    pauseButton.style.display = '';
	});
	wavesurfer.on('pause', function () {
	    playButton.style.display = '';
	    pauseButton.style.display = 'none';
	});
    */
	    
	// Init wavesurfer
	wavesurfer.on('region-click', function (region, e) {
	  e.stopPropagation();
	  // Play on click, loop on shift click
	  e.shiftKey ? region.playLoop() : region.play();
	  //clickAudioSTime = document.getElementById("desc_1_audio").value;
	  //clickAudioETime = document.getElementById("desc_2_audio").value;
	});
	      
	wavesurfer.on('region-play', function (region) {
	  region.once('out', function () {
	      wavesurfer.play(region.start);
	      wavesurfer.pause();
	  });
	});

	// load from edit page using id
	document.getElementById("category_audio").value = category_audio;
	document.getElementById("desc_1_audio").value = desc_1_audio;
	document.getElementById("desc_2_audio").value = desc_2_audio;
	document.getElementById("desc_3_audio").value = desc_3_audio;
	
    for(var i = 0; i < closeBtns.length; i++) {
	    closeBtns[i].addEventListener('click', function(e) {
	        wavesurfer.stop();
	        wavesurfer.empty();
	        this.parentNode.close();
	    });
	}
}