import { Component, OnInit } from '@angular/core';
import { Storage } from '@capacitor/storage';

interface Photo {
  filepath: string;
  webviewPath: string;
}

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.page.html',
  styleUrls: ['./gallery.page.scss'],
})

export class GalleryPage implements OnInit {
  photos: Photo[] = [];
  public photo = "";

  constructor() {}

  async ngOnInit() {
    await this.loadSaved();
  }

  async loadSaved() {
    const photoList = await Storage.get({ key: 'photo' });
    this.photo = photoList.value ? JSON.parse(photoList.value) : [];
  }

  async deletePhoto(index: number) {
    this.photos.splice(index, 1);
    await Storage.set({ key: 'photo', value: JSON.stringify(this.photo) });
  }
}
