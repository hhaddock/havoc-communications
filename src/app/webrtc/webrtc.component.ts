import { Component, OnInit, ViewChild } from '@angular/core';
import { isObject } from 'util';
import * as io from 'socket.io-client';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable, Subject } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
declare var window :any;

// import { WebrtcService } from '../webrtc.service';

@Component({
  selector: 'app-webrtc',
  templateUrl: './webrtc.component.html',
  styleUrls: ['./webrtc.component.scss']
})
export class WebrtcComponent implements OnInit {

  title = 'app';
  isChannelReady = false;
  isInitiator = false;
  isStarted = false;
  localStream;
  pc;
  remoteStream;
  turnReady;
  pcConfig: any = {
    'iceServers': [{
      'urls': 'stun:stun.l.google.com:19302'
    }]
  };
  sdpConstraints = {
    offerToReceiveAudio: true,
    offerToReceiveVideo: true
  };
  room = '';
  socket;
  _navigator = <any> navigator;

  constructor(private http: Http) {
    this.socket = io.connect('https://signal.havoc-communications.com');
  }

  @ViewChild('localVideo') localVideo;
  @ViewChild('remoteVideo') remoteVideo;
  // localVideo;
  // remoteVideo;
  // tokens:any;

  ngOnInit() {
    // *********** New Way ***********
      const self = this;
      self.setConnection();
    // let tokens=this.http.get('/getICETokens')
    //   .map((res: Response) => res.json())
    //   .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    // tokens.subscribe(x=>{
    //
    //   self.tokens = x;
    //   self.setConnection();
    // });
  }

  setConnection(){
      const self = this;
      self.localVideo = document.querySelector('#localStream');
      self.remoteVideo = document.querySelector('#remoteStream');
      // if (window.location.hostname !== 'localhost') {
      //   self.requestTurn(
      //     'https://computeengineondemand.appspot.com/turn?username=41784574&key=4080218913'
      //   );
      // }

      window.navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true
      })
      .then(self.gotStream.bind(self))
      .catch(function (e) {
        console.log(e);
      });


      window.onbeforeunload = function () {
        self.sendMessage('bye');
      };

      if (self.room !== '') {
        self.socket.emit('create or join', self.room);
        console.log('Attempted to create or  join room', self.room);
      }
      self.socket.on('created', function (room) {
        console.log('Created room ' + room);
        self.isInitiator = true;
      });

      self.socket.on('full', function (room) {
        console.log('Room ' + room + ' is full');
      });

      self.socket.on('join', function (room) {
        console.log('Another peer made a request to join room ' + room);
        console.log('This peer is the initiator of room ' + room + '!');
        self.isChannelReady = true;
      });

      self.socket.on('joined', function (room) {
        console.log('joined: ' + room);
        self.isChannelReady = true;
      });

      self.socket.on('log', function (array) {
        console.log.apply(console, array);
      });
      // This client receives a message
      self.socket.on('message', function (message) {
        console.log('Client received message:', message);
        if (message === 'got user media') {
          self.maybeStart();
        } else if (message.type === 'offer') {
          if (!self.isInitiator && !self.isStarted) {
            self.maybeStart();
          }
          self.pc.setRemoteDescription(new RTCSessionDescription(message));
          self.doAnswer();
        } else if (message.type === 'answer' && self.isStarted) {
          self.pc.setRemoteDescription(new RTCSessionDescription(message));
        } else if (message.type === 'candidate' && self.isStarted) {
          const candidate = new RTCIceCandidate({
            sdpMLineIndex: message.label,
            candidate: message.candidate
          });
          self.pc.addIceCandidate(candidate);
        } else if (message === 'bye' && self.isStarted) {
          self.handleRemoteHangup();
        }
      });
    }

    sendMessage(message) {
      console.log('Client sending message: ', message);
      this.socket.emit('message', message);
    }

    gotStream(stream) {
      console.log('Adding local stream.');
      //this.localVideo.src = window.URL.createObjectURL(stream);
      this.localVideo.srcObject = stream;
      this.localStream = stream;
      this.localVideo.muted = true;
      this.sendMessage('got user media');
      if (this.isInitiator) {
        this.maybeStart();
      }
    }

    /*constraints = {
      video: true
    };*/

    maybeStart() {
      if (!this.isStarted && typeof this.localStream !== 'undefined' && this.isChannelReady) {
        console.log('>>>>>> creating peer connection');
        this.createPeerConnection();
        this.pc.addStream(this.localStream);
        this.isStarted = true;
        if (this.isInitiator) {
          this.doCall();
        }
      }
    }

    createPeerConnection() {
      try {
        // var configuration = { iceServers: this.tokens };
        this.pc = new RTCPeerConnection(null);
        this.pc.onicecandidate = this.handleIceCandidate.bind(this);
        this.pc.onaddstream = this.handleRemoteStreamAdded.bind(this);
        this.pc.onremovestream = this.handleRemoteStreamRemoved.bind(this);
      } catch (e) {
        console.log('Failed to create PeerConnection, exception: ' + e.message);
        alert('Cannot create RTCPeerConnection object.');
        return;
      }
    }

    handleIceCandidate(event) {
      console.log('icecandidate event: ', event);
      if (event.candidate) {
        this.sendMessage({
          type: 'candidate',
          label: event.candidate.sdpMLineIndex,
          id: event.candidate.sdpMid,
          candidate: event.candidate.candidate
        });
      } else {
        console.log('End of candidates.');
      }
    }

    handleRemoteStreamAdded(event) {
      console.log('Remote stream added.');
      this.remoteVideo.srcObject = event.stream;
      this.remoteStream = event.stream;
    }

    handleCreateOfferError(event) {
      console.log('createOffer() error: ', event);
    }

    doCall() {
      console.log('Sending offer to peer');
      this.pc.createOffer(this.setLocalAndSendMessage.bind(this), this.handleCreateOfferError.bind(this));
    }

    doAnswer() {
      console.log('Sending answer to peer.');
      this.pc.createAnswer().then(
        this.setLocalAndSendMessage.bind(this),
        this.onCreateSessionDescriptionError.bind(this)
      );
    }

    setLocalAndSendMessage(sessionDescription) {
      // Set Opus as the preferred codec in SDP if Opus is present.
      //  sessionDescription.sdp = preferOpus(sessionDescription.sdp);
      this.pc.setLocalDescription(sessionDescription);
      console.log('setLocalAndSendMessage sending message', sessionDescription);
      this.sendMessage(sessionDescription);
    }

    onCreateSessionDescriptionError(error) {
      console.error('Failed to create session description: ' + error.toString());
    }

    requestTurn(turnURL) {
      const self = this;
      let turnExists = false;
      for (const i in this.pcConfig.iceServers) {
        if (this.pcConfig.iceServers[i].urls.substr(0, 5) === 'turn:') {
          turnExists = true;
          this.turnReady = true;
          break;
        }
      }
      if (!turnExists) {
        console.log('Getting TURN server from ', turnURL);
        // No TURN server. Get one from computeengineondemand.appspot.com:
        const xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
          if (xhr.readyState === 4 && xhr.status === 200) {
            const turnServer = JSON.parse(xhr.responseText);
            console.log('Got TURN server: ', turnServer);
            self.pcConfig.iceServers.push({
              'url': 'turn:' + turnServer.username + '@' + turnServer.turn,
              'credential': turnServer.password
            });
            self.turnReady = true;
          }
        };
        xhr.open('GET', turnURL, true);
        xhr.send();
      }
    }


    handleRemoteStreamRemoved(event) {
      console.log('Remote stream removed. Event: ', event);
    }

    hangup() {
      console.log('Hanging up.');
      stop();
      this.sendMessage('bye');
    }

    handleRemoteHangup() {
      console.log('Session terminated.');
      this.stop();
      this.isInitiator = false;
    }

    stop() {
      this.isStarted = false;
      // isAudioMuted = false;
      // isVideoMuted = false;
      this.pc.close();
      this.pc = null;
    }

    ///////////////////////////////////////////

    // Set Opus as the default audio codec if it's present.
    preferOpus(sdp) {
      let sdpLines = sdp.split('\r\n');
      let mLineIndex;
      // Search for m line.
      for (let i = 0; i < sdpLines.length; i++) {
        if (sdpLines[i].search('m=audio') !== -1) {
          mLineIndex = i;
          break;
        }
      }
      if (mLineIndex === null) {
        return sdp;
      }

      // If Opus is available, set it as the default in m line.
      for (let i = 0; i < sdpLines.length; i++) {
        if (sdpLines[i].search('opus/48000') !== -1) {
          const opusPayload = this.extractSdp(sdpLines[i], /:(\d+) opus\/48000/i);
          if (opusPayload) {
            sdpLines[mLineIndex] = this.setDefaultCodec(sdpLines[mLineIndex],
              opusPayload);
          }
          break;
        }
      }

      // Remove CN in m line and sdp.
      sdpLines = this.removeCN(sdpLines, mLineIndex);

      sdp = sdpLines.join('\r\n');
      return sdp;
    }

    extractSdp(sdpLine, pattern) {
      const result = sdpLine.match(pattern);
      return result && result.length === 2 ? result[1] : null;
    }

    // Set the selected codec to the first in m line.
    setDefaultCodec(mLine, payload) {
      const elements = mLine.split(' ');
      const newLine = [];
      let index = 0;
      for (let i = 0; i < elements.length; i++) {
        if (index === 3) { // Format of media starts from the fourth.
          newLine[index++] = payload; // Put target payload to the first.
        }
        if (elements[i] !== payload) {
          newLine[index++] = elements[i];
        }
      }
      return newLine.join(' ');
    }

    // Strip CN from sdp before CN constraints is ready.
    removeCN(sdpLines, mLineIndex) {
      const mLineElements = sdpLines[mLineIndex].split(' ');
      // Scan from end for the convenience of removing an item.
      for (let i = sdpLines.length - 1; i >= 0; i--) {
        const payload = this.extractSdp(sdpLines[i], /a=rtpmap:(\d+) CN\/\d+/i);
        if (payload) {
          const cnPos = mLineElements.indexOf(payload);
          if (cnPos !== -1) {
            // Remove CN payload from m line.
            mLineElements.splice(cnPos, 1);
          }
          // Remove CN line in sdp
          sdpLines.splice(i, 1);
        }
      }

      sdpLines[mLineIndex] = mLineElements.join(' ');
      return sdpLines;
    }

    roomInputKeyup(event: any): void {
      if (this.room != event.target.value) {
        this.room = event.target.value
      }
    }
  }
