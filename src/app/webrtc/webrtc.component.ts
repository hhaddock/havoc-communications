import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-webrtc',
  templateUrl: './webrtc.component.html',
  styleUrls: ['./webrtc.component.scss']
})
export class WebrtcComponent implements OnInit {

  @ViewChild('localVideo') localVideo: any

  _navigator = <any> navigator
  localStream: MediaStream

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
      track.stop();
    });
  }
}