import { Component } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
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

  constructor(
    private camera: Camera, 
    private socialSharing: SocialSharing,
    public toastController: ToastController,
    private storage: Storage
    ) {}
 
  recette = true;
  liste = false;

  recipt =
    {
    nom: '',
    pictureUrl:''
  }

  receipts :any= [];


  changeRecette(){
    this.recette = true;
    this.liste = false;
  }

  changeListe(){
    this.recette = false;
    this.liste = true;
  }

ngOnInit(){
  this.storage.get('receipts').then(
    (value:any) => {
      if(!value){
        this.receipts =[]
      }else{
        this.receipts = value;
      }
    }
  )
}

  photo(){

    this.camera.getPicture(this.options).then((imageData) => {
      
      let base64Image = 'data:image/jpeg;base64,' + imageData;
      this.recipt.pictureUrl = base64Image;
      this.recipt.nom = "";
     }, (err) => {
     });
    }

    shareAll(){
      this.socialSharing.share('message', 'Subject', ['pictureUrl']).then(() => {
        console.log('ok')
      })
    }

    async validate(){

      this.receipts.push(this.recipt)
      this.storage.set('receipts', this.receipts);
      this.recipt.nom;
      console.log(this.recipt.nom)
      const toast = await this.toastController.create({
        message: 'Photo upload',
        duration: 2000
      });
      toast.present();
      this.reset();
    }
    
reset(){
  this.recipt ={
    nom:'',
    pictureUrl:'',
  }
}

itemDelete(i:number){
  this.receipts.splice(i, 1);
  this.storage.set('receipts', this.receipts);
}

}
