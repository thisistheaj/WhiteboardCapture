import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { Storage } from '@ionic/storage';

/*
  Generated class for the Whiteboards provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Whiteboards {

  whiteboardImageUris: string[];

  constructor(
    public http: Http,
    private storage: Storage
  ) {
    this.whiteboardImageUris = [];
    this.load();
  }

  public get() {
    return this.whiteboardImageUris;
  }

  public push(whiteboardImageUri:string) {
    this.whiteboardImageUris.push(whiteboardImageUri);
    this.save()
  }


  public removeAtIndex(i: number){
    this.whiteboardImageUris.splice(i,1);
    this.save()
  }

  public addAtIndex(i: number,item:string){
    this.whiteboardImageUris.splice(i,0,item);
    this.save()
  }

  public remove(whiteboardImageUri) {
    this.whiteboardImageUris.splice(this.whiteboardImageUris.indexOf(whiteboardImageUri),1);
    this.save()
  }

  private save(){
    this.storage.set('whiteboard_uris', JSON.stringify(this.whiteboardImageUris));
  }

  private load(){
    this.storage.get('whiteboard_uris').then((uris) => {
      var uriList = JSON.parse(uris);
      if (uriList != null && typeof uriList !== 'undefined'){
        for (var uri of uriList) {
          this.whiteboardImageUris.push(uri); 
        }
      }
    })
  }

}
