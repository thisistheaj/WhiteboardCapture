import { Component } from '@angular/core';

import { Whiteboards } from '../../providers/whiteboards'

import { NavController } from 'ionic-angular';

import { Camera } from '@ionic-native/camera';
import { ImagePicker } from '@ionic-native/image-picker'
import { PhotoViewer } from '@ionic-native/photo-viewer';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  whiteboardImageUris: string[];
  constructor(
    public navCtrl: NavController,
    private whiteboards: Whiteboards,
    private camera: Camera,
    private photoViewer: PhotoViewer,
    private imagePicker: ImagePicker
   ) {
    this.whiteboardImageUris = whiteboards.get();
  }

  public removeItem(i: number){
    this.whiteboards.removeAtIndex(i);
  }

  public addWhiteBoardImage() {
    this.takePicture();
  }

  public moveItemUp(item,i){
    // alert('up')
    this.removeItem(i);
    this.whiteboards.addAtIndex(i-1,item);
  }

  public moveItemDown(item,i){
    // alert('down') 
    this.removeItem(i);
    this.whiteboards.addAtIndex(i+1,item);
  }

  public showItem(item:string) {
    // alert('showing ' + item);
    this.photoViewer.show(item);
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

  private openGallery (): void {
    this.imagePicker.getPictures({
      maximumImagesCount: 100,
      width: 1000,
      height: 1000,
      quality: 100
    }).then(
      fileUris => {
        for (var fileUri of fileUris) {
          this.whiteboards.push(fileUri)
        }
      },
      err => console.log('uh oh')
    );
} 

  ionViewDidEnter () {
    this.whiteboardImageUris = this.whiteboards.get();
  }

}
