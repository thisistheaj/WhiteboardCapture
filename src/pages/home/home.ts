import { Component } from '@angular/core';

import { Whiteboards } from '../../providers/whiteboards'

import { NavController } from 'ionic-angular';

import { Camera } from '@ionic-native/camera';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  whiteboardImageUris: string[];
  constructor(public navCtrl: NavController,
   private whiteboards: Whiteboards,
   private camera: Camera) {
    this.whiteboardImageUris = whiteboards.get();
  }

  public addWhiteBoardImage() {
    this.takePicture();
  }

  public takePicture(){
    this.camera.getPicture({
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }).then((fileUri) => {
      this.whiteboards.push(fileUri)
    }, (err) => {
    // Handle error
    });

  }

}
