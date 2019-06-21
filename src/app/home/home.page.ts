import { Component } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

   options: CameraOptions = {
    quality: 40,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE
  }

  constructor(private camera: Camera, private socialSharing: SocialSharing) {}
 
  recette = true;
  liste = false;

  recipt: any =[
    {
    nom: 'Test',
    pictureUrl:''
  },

  {
  nom: 'Teste',
  pictureUrl: ''
  },

  {
    nom: 'Testee',
    pictureUrl: ''
  },

  ]


  changeRecette(){
    this.recette = true;
    this.liste = false;
  }

  changeListe(){
    this.recette = false;
    this.liste = true;
  }

  photo(){

    this.camera.getPicture(this.options).then((imageData) => {
      
      let base64Image = 'data:image/jpeg;base64,' + imageData;
      this.recipt.pictureUrl = base64Image;
     }, (err) => {
     });
    }

    shareAll(){
      this.socialSharing.share('message', 'Subject', ['pictureUrl']).then(() => {
        console.log('ok')
      })
    }

    validate(){
      this.recipt.push(this.recipt)
      this.reset();
    }
    
reset(){
  this.recipt ={
    name:'',
    pictureUrl:'',
  }
}

}
