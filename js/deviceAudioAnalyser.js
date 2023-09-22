/**
 * https://codepen.io/hvianna/pen/VwKZgEE
 * for documentation and more demos,
 * visit https://audiomotion.dev
 */

// load module from Skypack CDN
import AudioMotionAnalyzer from 'https://cdn.skypack.dev/audiomotion-analyzer?min';

const micErrorMessage = document.querySelector("#native-device-mic-error");

// global variable to save microphone stream
let micStream;

// instantiate analyzer
const audioMotion = new AudioMotionAnalyzer(
  document.querySelector('#mic-audio-container'),
  {
    gradient: 'rainbow',
    height: 200,
    showScaleY: true
  }
);

// toggle microphone on/off
const micButton = document.querySelector('#mic-input');

micButton.addEventListener( 'change', () => {
  if ( micButton.checked ) {
    if ( navigator.mediaDevices ) {
      navigator.mediaDevices.getUserMedia( { audio: true, video: false } )
      .then( stream => {
        // create stream using audioMotion audio context
        micStream = audioMotion.audioCtx.createMediaStreamSource( stream );
        // connect microphone stream to analyzer
        audioMotion.connectInput( micStream );
        // mute output to prevent feedback loops from the speakers
        audioMotion.volume = 0;
      })
      .catch( err => {
        micErrorMessage.innerHTML = 'Microphone access denied by user';
      });
    }
    else {
      micErrorMessage.innerHTML = 'User mediaDevices not available';
    }
  }
  else {
    // disconnect and release microphone stream
    audioMotion.disconnectInput( micStream, true );
  }
});
