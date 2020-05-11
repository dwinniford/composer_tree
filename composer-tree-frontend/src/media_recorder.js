const recordButton = document.querySelector("#record")
const stopRecordButton = document.querySelector("#stopRecord")
const clipContainer = document.querySelector('.sound-clips');




// checks media support and gets permission
if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    console.log('getUserMedia supported.');
    navigator.mediaDevices.getUserMedia (
       // constraints - only audio needed for this app
       {
          audio: true
       })
 
       // Success callback
       .then(function(stream) {
            const mediaRecorder = new MediaRecorder(stream)
            recordButton.addEventListener("click", function(event) {
                recordButton.disabled = true;
                stopRecordButton.disabled = false;
                mediaRecorder.start()
                console.log(mediaRecorder.state)
                console.log("recorder started")
            })
            
            stopRecordButton.addEventListener("click", function(event) {
                stopRecordButton.disabled = true;
                recordButton.disabled = false;
                mediaRecorder.stop()
                console.log(mediaRecorder.state)
                console.log("recorder stopped")
            })

            let chunks = [];
            mediaRecorder.ondataavailable = function(e) {
                chunks.push(e.data);
            }

            mediaRecorder.onstop = function(e) {
                console.log("recorder stopped");
              
                const clipName = overlayTitle.innerHTML
                const clipLabel = document.createElement('p');
                const audio = document.createElement('audio');
                const deleteAudioButton = document.createElement('button');
                audio.setAttribute('controls', '');
                deleteAudioButton.innerHTML = "Delete Audio";
                clipLabel.innerHTML = clipName;
              
                clipContainer.appendChild(audio);
                clipContainer.appendChild(clipLabel);
                clipContainer.appendChild(deleteAudioButton);
              
                const blob = new Blob(chunks, { 'type' : 'audio/ogg; codecs=opus' });
                chunks = [];
                const audioURL = window.URL.createObjectURL(blob);
                audio.src = audioURL;
              
                deleteAudioButton.onclick = function(e) {
                  let evtTgt = e.target;
                  evtTgt.parentNode.innerHTML = '';
                }
              }
         
       })
 
       // Error callback
       .catch(function(err) {
          console.log('The following getUserMedia error occured: ' + err);
       }
    );
 } else {
    console.log('getUserMedia not supported on your browser!');
 }

