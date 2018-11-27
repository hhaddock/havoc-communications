import { Component, OnInit, ViewChild } from '@angular/core';
import { isObject } from 'util';

@Component({
  selector: 'app-webrtc',
  templateUrl: './webrtc.component.html',
  styleUrls: ['./webrtc.component.scss']
})
export class WebrtcComponent implements OnInit {

  @ViewChild('localVideo') localVideo: any

  _navigator = <any> navigator
  localStream: MediaStream
  roomNumInput: string = ''

  constructor() { }

  ngOnInit() {
    const video = this.localVideo.nativeElement
    this._navigator = <any>navigator
    this._navigator.getUserMedia = ( this._navigator.getUserMedia || this._navigator.webkitGetUserMedia || this._navigator.mozGetUserMedia || this._navigator.msGetUserMedia )
  
    this._navigator.mediaDevices.getUserMedia({video: true})
      .then(stream => {
        console.log(stream)
        this.localStream = stream as MediaStream
        video.srcObject = this.localStream
        //video.play()
      }, error => {
        console.log(error)
      })
  }

  stopStream() {
    const tracks = this.localStream.getTracks();
    tracks.forEach((track) => {
      //track.stop();
      track.enabled = false;
    });
  }

  startStream() {
    const tracks = this.localStream.getTracks();
    tracks.forEach((track) => {
      // track.play();
      track.enabled = true;
    });
  }

  roomInputKeyup(event: any): void {
    if (this.roomNumInput != event.target.value) {
      this.roomNumInput = event.target.value
    }
    console.log(this.roomNumInput)
  }
}