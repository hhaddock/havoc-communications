import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs';
import * as Rx from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebrtcService {

  private isChannelReady: boolean = false
  private isInitiator: boolean = false
  private isStarted: boolean = false

  public localStream:any;
  public localStreamBs: Rx.BehaviorSubject<any> = new Rx.BehaviorSubject(this.localStream);
  
  private pc;
  private remoteStream;
  public remoteStreamBs: Rx.BehaviorSubject<any> = new Rx.BehaviorSubject(this.remoteStream);
  private socket: SocketIOClient.Socket

  constructor() {
  }

  public setLocalStream(stream: any): void {
    console.log(stream)
    this.localStream = stream;
    this.localStreamBs.next(this.localStream);
  }

  connect(room: string): Rx.Subject<MessageEvent> {
    this.socket = io('http://10.0.0.9:12346')
    console.log(this.socket)

    const observable = new Observable((obs) => {
      this.socket.on('created', function(roomNum) {
        console.log('\nCreated room ' + roomNum)
      })

      this.socket.on('full', function(roomNum) {
        console.log('\nRoom: ' + roomNum + ' is full')
      })

      this.socket.on('join', function(roomNum) {
        console.log('\nAnother peer made a request to join')
        console.log('The peer is the initiator of room: ' + roomNum)
        this.isChannelReady = true
      })

      this.socket.on('joined', function(roomNum) {
        console.log('Joined room: ' + roomNum)
        this.isChannelReady = true
      })

      this.socket.on('log', function(array) {
        console.log.apply(console, array)
      })

      this.socket.on('message', function(msg) {
        console.log('Client received message:', msg)
        if (msg === 'got user media') {
          this.maybeStart()
        } else if (msg.type === 'offer') {
          if (!this.isInitiator && !this.isStarted) {
            this.maybeStart()
          }
          this.pc.setRemoteDescription(new RTCSessionDescription(msg))
          this.doAnswer()
        } else if (msg.type === 'answer' && this.isStarted) {
          this.pc.setRemoteDescription(new RTCSessionDescription(msg))
        } else if (msg.type === 'candidate' && this.isStarted) {
          const candidate = new RTCIceCandidate({
            sdpMLineIndex: msg.label,
            candidate: msg.candidate
          })
          this.pc.addIceCandidate(candidate)
        } else if (msg === 'bye' && this.isStarted) {
          this.handleRemoteHangup()
        }
      })

      return () => {
        this.socket.disconnect()
      }
    })
    const observer = {
      next: (data: Object) => {
        this.socket.emit('message', JSON.stringify(data))
        if (room !== '') {
          this.socket.emit('create or join', room)
          console.log('room == ' + room)
        }
      }
    }
    return Rx.Subject.create(observer, observable)
  }

  gotStream() {
    console.log('gotStream')
    this.sendMessage('got user media')
    if (!this.isInitiator) {
      this.maybeStart()
    }
  }

  sendMessage(msg: any): void {
    console.log(this.isInitiator)
    console.log('\nClient sending message:', msg, '\n')
    this.socket.emit('message', msg)
  }

  sendCustMsg(route: string, msg: any): void {
    console.log('\nClient sending message:', msg, '\n')
    this.socket.emit(route, msg)
  }

  maybeStart(): void {
    console.log('\nmaybeStart():')
    console.log('isStarted:', this.isStarted, '\n')
    console.log('localStream:', this.localStream, '\n')
    console.log('isChannelReady', this.isChannelReady, '\n')
    if (!this.isStarted && typeof this.localStream !== 'undefined' && this.isChannelReady) {
      console.log('\nCreating peer connection:')
      this.createPeerConnection()
      this.pc.addStream(this.localStream)
      console.log('isInitiator:', this.isInitiator)
      if (this.isInitiator) {
        this.doCall()
      }
    }
  }

  createPeerConnection() {
    try {
      this.pc = new RTCPeerConnection(null);
      this.pc.onicecandidate = this.handleIceCandidate;
      this.pc.onaddstream = this.handleRemoteStreamAdded;
      this.pc.onremovestream = this.handleRemoteStreamRemoved;
      console.log(this.pc)
    } catch (e) {
      console.log('Failed to create PeerConnection, exception: ' + e.message);
      alert('Cannot create RTCPeerConnection object.');
      return;
    }
  }

  handleIceCandidate(event) {
    console.log('icecandidate event:', event)
    if (event.candidate) {
      this.sendMessage({
        type: 'candidate',
        label: event.candidate.sdpMLineIndex,
        id: event.candidate.sdpMid,
        candidate: event.candidate.candidate
      })
    } else {
      console.log('End of candidates')
    }
  }

  handleCreateOfferError(error) {
    console.log('createOffer() error:', error)
  }

  doCall() {
    console.log('Sending offer to peer')
    this.pc.createOffer(this.setLocalAndSendMessage, this.handleCreateOfferError)
  }

  doAnswer() {
    console.log('Sending answer to peer')
    this.pc.createAnswer().then(
      this.setLocalAndSendMessage,
      this.onCreateSessionDescriptionError
    )
  }

  setLocalAndSendMessage(sessDesc) {
    this.pc.setLocalDescription(sessDesc)
    console.log('setLocalAndSendMessage sending message:', sessDesc)
    this.sendMessage(sessDesc)
  }

  onCreateSessionDescriptionError(error) {
    console.log('Failed to create session description:', error.toString())
  }

  handleRemoteStreamAdded(event) {
    console.log('Remote stream added.');
    this.remoteStream = event.stream;
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
    stop();
    this.isInitiator = false;
  }
  
  stop() {
    this.isStarted = false;
    this.pc.close();
    this.pc = null;
  }
}
