import { Component, OnInit } from '@angular/core';
import { CameraPreview, CameraPreviewOptions, CameraPreviewPictureOptions } from '@ionic-native/camera-preview/ngx';
import { Storage } from '@capacitor/storage';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

interface Photo {
  filepath: string;
  webviewPath: string;
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  photos: Photo[] = [];
  public photo = "";

  constructor(
    private cameraPreview: CameraPreview,
    private camera: Camera
  ) {}

  ngOnInit() {
    this.startCamera();
  }

  startCamera() {
    const cameraPreviewOpts: CameraPreviewOptions = {
      x: 0,
      y: 0,
      width: window.screen.width,
      height: window.screen.height,
      camera: 'rear',
      tapPhoto: true,
      previewDrag: false,
      toBack: true,
      alpha: 1
    };

    this.cameraPreview.startCamera(cameraPreviewOpts).then(
      (res) => {
        console.log('Camera preview started', res);
      },
      (err) => {
        console.log('Error starting camera preview', err);
      }
    );
  }

  takePicture() {
    const pictureOpts: CameraPreviewPictureOptions = {
      width: 1280,
      height: 1280,
      quality: 85
    };
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    };

    this.camera.getPicture(options).then(
      (imageData) => {
        this.photo = 'data:image/jpeg;base64,' + imageData;
      }
    ).catch(
      (err) => {
        console.log('Error taking picture', err);
      }
    );

    this.cameraPreview.takePicture(pictureOpts).then(
      (imageData) => {
        const savedImage = 'data:image/jpeg;base64,' + imageData;
        Storage.set({
          key: 'photo',
          value: JSON.stringify(this.photo)
        });
      },

      (err) => {
        console.log('Error taking picture', err);
      }
    );
  }

  stopCamera() {
    this.cameraPreview.stopCamera();
  }
}
