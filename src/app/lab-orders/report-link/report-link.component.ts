import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable, from } from 'rxjs';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-report-link',
  templateUrl: './report-link.component.html',
  styleUrls: ['./report-link.component.css']
})
export class ReportLinkComponent implements OnInit, OnDestroy {

  @Input() report: any;
  downloadUrl?: Observable<string>;
  private _sub?: Subscription;
  url: any;

  constructor(private _storage: AngularFireStorage) { }

  ngOnInit(): void {
    try {
      let fileName = "reports/" + this.report._id + ".csv";
      const ref = this._storage.ref(fileName);
      this.downloadUrl = ref.getDownloadURL();
      this._sub = this.downloadUrl?.subscribe((url) => {
        this.url = url;
      });

    } catch (error) {
      console.error(error);
    }
  }

  ngOnDestroy(): void {
    if (this._sub)
      this._sub.unsubscribe();
  }

  getFile(): void {
    window.open(this.url, "_blank");
  }

}
