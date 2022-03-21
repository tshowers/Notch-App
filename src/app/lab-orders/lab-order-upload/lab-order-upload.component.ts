import { Component, OnInit, Input, ChangeDetectorRef, Output, OnDestroy } from '@angular/core';
import { AngularFireStorage, AngularFireUploadTask, AngularFireStorageReference } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';
import { finalize, tap } from 'rxjs/operators';
import { environment } from "../../../environments/environment";
import { Subscription } from 'rxjs';



@Component({
  selector: 'upload-task',
  templateUrl: './lab-order-upload.component.html',
  styleUrls: ['./lab-order-upload.component.css']
})
export class LabOrderUploadComponent implements OnInit, OnDestroy {

  @Input() file?: File;
  @Input() userId: any;
  @Input() data: any;

  public production: boolean;
  public uploadProgress: any;
  private _ref?: AngularFireStorageReference;
  private _task?: AngularFireUploadTask;
  public downloadURL?: any;
  private _taskSubscription?: Subscription

  constructor(private _storage: AngularFireStorage, private _db: AngularFirestore) {
    this.production = environment.production;
  }

  ngOnInit(): void {
    this.startUpload();
  }

  ngOnDestroy(): void {
    if (this._taskSubscription)
      this._taskSubscription.unsubscribe();
  }


  startUpload() {
    try {
      const path = this.userId + `/${Date.now()}_${this.file?.name}`;

      this._ref = this._storage.ref(path);
      this._task = this._storage.upload(path, this.file)
      this.uploadProgress = this._task.percentageChanges();
      this._taskSubscription = this._task.snapshotChanges().pipe(
        finalize(async () => {
          this.downloadURL = await this._storage.ref(path).getDownloadURL().toPromise();
          this.data.files.push({
            'name': this.file?.name,
            'url': this.downloadURL,
            'uploaded_at': new Date().getTime()
          });
        })
      ).subscribe();
    } catch (error) {
      console.error("startUpload", error);
    }
  }
}
