import { Component, OnInit, OnDestroy, Input, EventEmitter, Output } from '@angular/core';
import { DataService, LAB_ORDERS } from '../../shared/data.service';
import { Subject } from 'rxjs';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from '@angular/fire/storage';
import { map, finalize } from 'rxjs/operators';
import { environment } from "../../../environments/environment";
import { Subscription } from 'rxjs';
import { NotchAuthService } from 'src/app/shared/notch-auth.service';
import { UsersService } from 'src/app/shared/users.service';

export const PANELS = [
  { 'id': '1', 'name': 'CHE-UMPU', 'shortName': 'UMPU', 'checked': false },
  { 'id': '21', 'name': 'IMM-96F IgG/IgE', 'shortName': '96F-G-E', 'checked': false },
  { 'id': '24', 'name': 'IMM-96F IgG', 'shortName': '96F-G', 'checked': false },
  { 'id': '29', 'name': 'IMM-CAN IgA/IgG/IgM/C', 'shortName': 'CAN', 'checked': false },
  { 'id': '31', 'name': '', 'shortName': 'No Test Specified', 'checked': false },
  { 'id': '143', 'name': 'IMM-114A IgG', 'shortName': '96A-G', 'checked': false },
  { 'id': '224', 'name': 'CHE-EPPU', 'shortName': 'EPPU', 'checked': false },
  { 'id': '234', 'name': 'IMM-CEL IgA/IgG/T/H', 'shortName': 'CEL', 'checked': false },
  { 'id': '241', 'name': 'IMM-CAN IgG', 'shortName': 'CAN-G', 'checked': false },
  { 'id': '267', 'name': 'IMM-96F IgA/IgG', 'shortName': '96F-A-G', 'checked': false },
  { 'id': '265', 'name': 'IMM-96F IgA', 'shortName': '96F-A', 'checked': false },
  { 'id': '271', 'name': 'IMM-114A IgA', 'shortName': '96A-A', 'checked': false },
  { 'id': '273', 'name': 'IMM-114A IgA/IgG', 'shortName': '96A-A-G', 'checked': false },
  { 'id': '322', 'name': 'IMM-97V IgA', 'shortName': '96V-A', 'checked': false },
  { 'id': '324', 'name': 'IMM-97V IgA/IgG', 'shortName': '96V-A-G', 'checked': false },
  { 'id': '327', 'name': 'IMM-97V IgG', 'shortName': '96V-G', 'checked': false },
  { 'id': '329', 'name': 'IMM-109J IgA', 'shortName': '96J-A', 'checked': false },
  { 'id': '331', 'name': 'IMM-109J IgA/IgG', 'shortName': '96J-A-G', 'checked': false },
  { 'id': '334', 'name': 'IMM-109J IgG', 'shortName': '96J-G', 'checked': false },
  { 'id': '336', 'name': 'IMM-113M IgA', 'shortName': '96M-A', 'checked': false },
  { 'id': '338', 'name': 'IMM-113M IgA/IgG', 'shortName': '96M-A-G', 'checked': false },
  { 'id': '341', 'name': 'IMM-113M IgG', 'shortName': '96M-G', 'checked': false },
  { 'id': '344', 'name': 'LI-CCOM', 'shortName': 'CCOM', 'checked': false },
  { 'id': '346', 'name': 'IMM-48F IgA', 'shortName': '48F-A', 'checked': false },
  { 'id': '348', 'name': 'IMM-48F IgA/IgG', 'shortName': '48F-A-G', 'checked': false },
  { 'id': '351', 'name': 'IMM-48F IgG', 'shortName': '48F-G', 'checked': false },
  { 'id': '354', 'name': 'IMM-15M IgE', 'shortName': '15M-E', 'checked': false },
  { 'id': '355', 'name': 'IMM-TIE', 'shortName': 'TIE', 'checked': false },
  { 'id': '381', 'name': 'IMM-144F IgA', 'shortName': '144F-A', 'checked': false },
  { 'id': '382', 'name': 'IMM-144F IgG', 'shortName': '144F-G', 'checked': false },
  { 'id': '383', 'name': 'IMM-144F IgA/IgG', 'shortName': '144F-A-G', 'checked': false },
  { 'id': '384', 'name': 'IMM-48I IgA', 'shortName': '48I-A', 'checked': false },
  { 'id': '385', 'name': 'IMM-48I IgG', 'shortName': '48I-G', 'checked': false },
  { 'id': '386', 'name': 'IMM-48I IgG4', 'shortName': '48I-R', 'checked': false },
  { 'id': '387', 'name': 'IMM-48I IgA/IgG', 'shortName': '48I-A-G', 'checked': false },
  { 'id': '388', 'name': 'IMM-48I IgA/IgG4', 'shortName': '48I-A-R', 'checked': false },
  { 'id': '389', 'name': 'IMM-48I IgG/IgG4', 'shortName': '48I-G-R', 'checked': false },
  { 'id': '390', 'name': 'IMM-48I IgA/IgG/IgG4', 'shortName': '48I-A-G-R', 'checked': false },
  { 'id': '391', 'name': 'IMM-144F IgG4', 'shortName': '144F-R', 'checked': false },
  { 'id': '392', 'name': 'IMM-144F IgA/IgG4', 'shortName': '144F-A-R', 'checked': false },
  { 'id': '393', 'name': 'IMM-144F IgG/IgG4', 'shortName': '144F-G-R', 'checked': false },
  { 'id': '394', 'name': 'IMM-144F IgA/IgG/IgG4', 'shortName': '144F-A-G-R', 'checked': false },
  { 'id': '395', 'name': 'IMM-96F IgG4', 'shortName': '96F-R', 'checked': false },
  { 'id': '396', 'name': 'IMM-96F IgA/IgG4', 'shortName': '96F-A-R', 'checked': false },
  { 'id': '397', 'name': 'IMM-96F IgG/IgG4', 'shortName': '96F-G-R', 'checked': false },
  { 'id': '398', 'name': 'IMM-96F IgA/IgG/IgG4', 'shortName': '96F-A-G-R', 'checked': false },
  { 'id': '399', 'name': 'IMM-114A IgG4', 'shortName': '96A-R', 'checked': false },
  { 'id': '400', 'name': 'IMM-114A IgA/IgG4', 'shortName': '96A-A-R', 'checked': false },
  { 'id': '401', 'name': 'IMM-114A IgG/IgG4', 'shortName': '96A-G-R', 'checked': false },
  { 'id': '402', 'name': 'IMM-114A IgA/IgG/IgG4', 'shortName': '96A-A-G-R', 'checked': false },
  { 'id': '403', 'name': 'IMM-109J IgG4', 'shortName': '96J-R', 'checked': false },
  { 'id': '404', 'name': 'IMM-109J IgA/IgG4', 'shortName': '96J-A-R', 'checked': false },
  { 'id': '405', 'name': 'IMM-109J IgG/IgG4', 'shortName': '96J-G-R', 'checked': false },
  { 'id': '406', 'name': 'IMM-109J IgA/IgG/IgG4', 'shortName': '96J-A-G-R', 'checked': false },
  { 'id': '407', 'name': 'IMM-113M IgG4', 'shortName': '96M-R', 'checked': false },
  { 'id': '408', 'name': 'IMM-113M IgA/IgG4', 'shortName': '96M-A-R', 'checked': false },
  { 'id': '409', 'name': 'IMM-113M IgG/IgG4', 'shortName': '96M-G-R', 'checked': false },
  { 'id': '410', 'name': 'IMM-113M IgA/IgG/IgG4', 'shortName': '96M-A-G-R', 'checked': false },
  { 'id': '411', 'name': 'IMM-97V IgG4', 'shortName': '96V-R', 'checked': false },
  { 'id': '412', 'name': 'IMM-97V IgA/IgG4', 'shortName': '96V-A-R', 'checked': false },
  { 'id': '413', 'name': 'IMM-97V IgG/IgG4', 'shortName': '96V-G-R', 'checked': false },
  { 'id': '414', 'name': 'IMM-97V IgA/IgG/IgG4', 'shortName': '96V-A-G-R', 'checked': false },
  { 'id': '415', 'name': 'IMM-48F IgG4', 'shortName': '48F-R', 'checked': false },
  { 'id': '416', 'name': 'IMM-48T IgA', 'shortName': '48T-A', 'checked': false },
  { 'id': '417', 'name': 'IMM-48T IgG', 'shortName': '48T-G', 'checked': false },
  { 'id': '418', 'name': 'IMM-48T IgA/IgG', 'shortName': '48T-A-G', 'checked': false },
  { 'id': '419', 'name': 'IMM-CAN IgA', 'shortName': 'CAN-A', 'checked': false },
  { 'id': '420', 'name': 'IMM-CAN IgA/IgG', 'shortName': 'CAN-A-G', 'checked': false },
  { 'id': '421', 'name': 'IMM-64B IgA', 'shortName': '64B-A', 'checked': false },
  { 'id': '422', 'name': 'IMM-64B IgA/IgG', 'shortName': '64B-A-G', 'checked': false },
  { 'id': '423', 'name': 'IMM-64B IgA/IgG/IgG4', 'shortName': '64B-A-G-R', 'checked': false },
  { 'id': '424', 'name': 'IMM-64B IgA/IgG4', 'shortName': '64B-A-R', 'checked': false },
  { 'id': '425', 'name': 'IMM-64B IgG', 'shortName': '64B-G', 'checked': false },
  { 'id': '426', 'name': 'IMM-64B IgG/IgG4', 'shortName': '64B-G-R', 'checked': false },
  { 'id': '427', 'name': 'IMM-64B IgG4', 'shortName': '64B-R', 'checked': false },
  { 'id': '428', 'name': 'IMM-27F IgE', 'shortName': '27F-E', 'checked': false },
  { 'id': '429', 'name': 'IMM-50F IgE', 'shortName': '50F-E', 'checked': false },
  { 'id': '430', 'name': 'IMM-96E IgE', 'shortName': '96E-E', 'checked': false },
  { 'id': '431', 'name': 'IMM-50I IgE', 'shortName': '50I-E', 'checked': false },
  { 'id': '432', 'name': 'IMM-64F IgA', 'shortName': '64F-A', 'checked': false },
  { 'id': '433', 'name': 'IMM-64F IgA/IgG', 'shortName': '64F-A-G', 'checked': false },
  { 'id': '434', 'name': 'IMM-64F IgA/IgG/IgG4', 'shortName': '64F-A-G-R', 'checked': false },
  { 'id': '435', 'name': 'IMM-64F IgA/IgG4', 'shortName': '64F-A-R', 'checked': false },
  { 'id': '436', 'name': 'IMM-64F IgG', 'shortName': '64F-G', 'checked': false },
  { 'id': '437', 'name': 'IMM-64F IgG/IgG4', 'shortName': '64F-G-R', 'checked': false },
  { 'id': '438', 'name': 'IMM-64F IgG4', 'shortName': '64F-R', 'checked': false },
  { 'id': '439', 'name': 'IMM-48N IgA', 'shortName': '48N-A', 'checked': false },
  { 'id': '440', 'name': 'IMM-48N IgA/IgG', 'shortName': '48N-A-G', 'checked': false },
  { 'id': '441', 'name': 'IMM-48N IgA/IgG/IgG4', 'shortName': '48N-A-G-R', 'checked': false },
  { 'id': '442', 'name': 'IMM-48N IgA/IgG4', 'shortName': '48N-A-R', 'checked': false },
  { 'id': '443', 'name': 'IMM-48N IgG', 'shortName': '48N-G', 'checked': false },
  { 'id': '444', 'name': 'IMM-48N IgG/IgG4', 'shortName': '48N-G-R', 'checked': false },
  { 'id': '445', 'name': 'IMM-48N IgG4', 'shortName': '48N-R', 'checked': false },
  { 'id': '446', 'name': 'IMM-208F IgA', 'shortName': '208F-A', 'checked': false },
  { 'id': '447', 'name': 'IMM-208F IgA/IgG', 'shortName': '208F-A-G', 'checked': false },
  { 'id': '448', 'name': 'IMM-208F IgA/IgG/IgG4', 'shortName': '208F-A-G-R', 'checked': false },
  { 'id': '449', 'name': 'IMM-208F IgA/IgG4', 'shortName': '208F-A-R', 'checked': false },
  { 'id': '450', 'name': 'IMM-208F IgG', 'shortName': '208F-G', 'checked': false },
  { 'id': '451', 'name': 'IMM-208F IgG/IgG4', 'shortName': '208F-G-R', 'checked': false },
  { 'id': '452', 'name': 'IMM-208F IgG4', 'shortName': '208F-R', 'checked': false },
  { 'id': '453', 'name': 'IMM-120N IgA', 'shortName': '120N-A', 'checked': false },
  { 'id': '454', 'name': 'IMM-120N IgA/IgG', 'shortName': '120N-A-G', 'checked': false },
  { 'id': '455', 'name': 'IMM-120N IgA/IgG/IgG4', 'shortName': '120N-A-G-R', 'checked': false },
  { 'id': '456', 'name': 'IMM-120N IgA/IgG4', 'shortName': '120N-A-R', 'checked': false },
  { 'id': '457', 'name': 'IMM-120N IgG', 'shortName': '120N-G', 'checked': false },
  { 'id': '458', 'name': 'IMM-120N IgG/IgG4', 'shortName': '120N-G-R', 'checked': false },
  { 'id': '459', 'name': 'IMM-120N IgG4', 'shortName': '120N-R', 'checked': false },
  { 'id': '460', 'name': 'IMM-144N IgA', 'shortName': '144N-A', 'checked': false },
  { 'id': '461', 'name': 'IMM-144N IgA/IgG', 'shortName': '144N-A-G', 'checked': false },
  { 'id': '462', 'name': 'IMM-144N IgA/IgG/IgG4', 'shortName': '144N-A-G-R', 'checked': false },
  { 'id': '463', 'name': 'IMM-144N IgA/IgG4', 'shortName': '144N-A-R', 'checked': false },
  { 'id': '464', 'name': 'IMM-144N IgG', 'shortName': '144N-G', 'checked': false },
  { 'id': '465', 'name': 'IMM-144N IgG/IgG4', 'shortName': '144N-G-R', 'checked': false },
  { 'id': '466', 'name': 'IMM-144N IgG4', 'shortName': '144N-R', 'checked': false },
  { 'id': '467', 'name': 'IMM-48F IgA/IgG/IgG4', 'shortName': '48F-A-G-R', 'checked': false },
  { 'id': '468', 'name': 'IMM-48F IgA/IgG4', 'shortName': '48F-A-R', 'checked': false },
  { 'id': '469', 'name': 'IMM-48F IgG/IgG4', 'shortName': '48F-G-R', 'checked': false },
  { 'id': '471', 'name': 'CHE-VITD', 'shortName': 'VITD', 'checked': false },
  { 'id': '472', 'name': 'COVID-19 PCR RNA', 'shortName': 'C19PCR', 'checked': false },
  { 'id': '473', 'name': 'COVID-19 DZ IgG/gM', 'shortName': 'C19DZ', 'checked': false },
  { 'id': '474', 'name': 'COVID-19 DZ IgG', 'shortName': 'C19DZ-G', 'checked': false },
  { 'id': '475', 'name': 'COVID-19 ECO', 'shortName': 'C19ECO', 'checked': false },
  { 'id': '476', 'name': 'COVID-19 ECO + DZ, IgG + IgM', 'shortName': 'C19ECODZ', 'checked': false },
  { 'id': '477', 'name': 'IMM-168V IgA', 'shortName': '168V-A', 'checked': false },
  { 'id': '478', 'name': 'IMM-168V IgA/IgG', 'shortName': '168V-A-G', 'checked': false },
  { 'id': '479', 'name': 'IMM-168V IgA/IgG/IgG4', 'shortName': '168V-A-G-R', 'checked': false },
  { 'id': '480', 'name': 'IMM-168V IgA/IgG4', 'shortName': '168V-A-R', 'checked': false },
  { 'id': '481', 'name': 'IMM-168V IgG', 'shortName': '168V-G', 'checked': false },
  { 'id': '482', 'name': 'IMM-168V IgG/IgG4', 'shortName': '168V-G-R', 'checked': false },
  { 'id': '483', 'name': 'IMM-168V IgG4', 'shortName': '168V-R', 'checked': false },
  { 'id': '484', 'name': 'COVID-19 DZ IgM', 'shortName': 'C19DZ-M', 'checked': false },
  { 'id': '485', 'name': 'COVID-19 ECOS', 'shortName': 'C19ECOS', 'checked': false },
  { 'id': '486', 'name': 'COVID-19 ECONS', 'shortName': 'C19ECONS', 'checked': false },
  { 'id': '487', 'name': 'Urolithin A', 'shortName': 'URLA', 'checked': false },
  { 'id': '488', 'name': 'Urolithin A', 'shortName': 'URLA_H1', 'checked': false },
  { 'id': '489', 'name': 'Urolithin A', 'shortName': 'URLA_H2', 'checked': false }
]

export interface Panel {
  id: number;
  name: string;
  shortName: string;
  checked: boolean;
}

@Component({
  selector: 'app-lab-order-edit',
  templateUrl: './lab-order-edit.component.html',
  styleUrls: ['./lab-order-edit.component.css']
})
export class LabOrderEditComponent implements OnInit, OnDestroy {

  @Input() data: any;
  @Input() inputData?: Subject<any>;
  @Input() buttons: boolean = true;
  @Output() toggle = new EventEmitter();
  panels: any;
  resultsFile: any;
  uploadProgress: any;
  testOrders: Panel[] = [];
  dropFiles: File[] = [];
  isHovering: boolean = false;
  isSuper: boolean = false;

  public production: boolean;
  public uid: any;
  private _dataSubscription?: Subscription;
  private _superSubscription?: Subscription;
  private _taskSubscription?: Subscription;
  private _ref?: AngularFireStorageReference;
  private _task?: AngularFireUploadTask;
  public canDeliver: boolean = false;
  public sampleProcssing: boolean = false;

  constructor(private _dataService: DataService, private _storage: AngularFireStorage, private _authService: NotchAuthService, private _usersService: UsersService) {
    this.production = environment.production;
    this.uid = this._authService.uid;
    this.panels = this.getPanels();
    this.canDeliver = this._usersService.user.email == environment.superDuper;

    this.sampleProcssing = (this._usersService.user && this._usersService.user.email) ? (environment.sampleProcessing.indexOf(this._usersService.user.email) >= 0) : false;
  }

  ngOnInit(): void {
    this.isSuper = this._usersService.super;
    this._superSubscription = this._usersService.adminSubject.subscribe((admin: boolean) => {
      this.isSuper = admin;
    })

    this._dataSubscription = this.inputData?.subscribe((data: any) => {
      this.data = data;
      this.panels = this.getPanels();
      this.resultsFile = '';
      this.dropFiles = [];
      this.data.files = (this.data.files && this.data.files.length) ? this.data.files : []
      this.setPanelsOrdered();
    })
  }

  ngOnDestroy(): void {
    if (this._dataSubscription)
      this._dataSubscription.unsubscribe();
    if (this._taskSubscription)
      this._taskSubscription?.unsubscribe();
    if (this._superSubscription)
      this._superSubscription.unsubscribe();
  }


  toggleHover(event: boolean) {
    this.isHovering = event;
  }

  onDrop(files: FileList) {
    for (let i = 0; i < files.length; i++) {
      let f = files.item(i);
      if (f)
        this.dropFiles.push(f);
    }
  }

  private getPanels(): any {
    return PANELS.sort((a: any, b: any) => {
      a.checked = false;
      b.checked = false;
      if (a.name > b.name) return 1;
      if (a.name < b.name) return -1;
      return 0
    });
  }

  public checkStatus(): void {
    if ((this.data.status == '5') || (this.data.status == '85')) {
      let d = new Date().toISOString().split('T')[0];
      this.data['date-received'] = d;
    }

  }


  onSubmit(): void {
    if (this.data._id)
      this.onUpdate();
    else
      this.onAdd();
  }

  onAdd(): void {
    try {
      this._dataService.onAdd(LAB_ORDERS, this.data).then((result) => {
        if (result)
          this.data._id = result.id;
        this.onView();
      }).catch((error) => {
        console.error(error);
      });;

    } catch (error) {
      console.error("onAdd", error);
    }
  }

  onUpdate(): void {
    try {
      const id: any = this.data?._id;

      this._dataService.onUpdate(LAB_ORDERS, id, this.data);

      this.onView();
    } catch (error) {
      console.error(error);
    }
  }

  override(): void {
    // over 18 years of age && not in these 3 states and VITD or 168V
    if (true)
      this.data['override-partner-processing'] = true;
  }

  onPanelClick(p: any): void {
    p.checked = true;
    this.setTestOrdered();
  }

  onView(): void {
    this.toggle.emit();
  }

  onCreate(): void {
    this.data = null;
  }

  setTestOrdered(): void {
    let testOrderd: any[] = [];
    this.panels.forEach((element: Panel) => {
      if (element && element.checked) {
        testOrderd.push(element.id)
      }
    });

    if (testOrderd.length > 0)
      testOrderd.push('0');

    this.data['test-ordered'] = testOrderd;
  }

  setPanelsOrdered(): void {
    if (!this.data['test-ordered']) return;
    try {
      let tests;
      if (Array.isArray(this.data['test-ordered'])) {
        tests = this.data['test-ordered']
      }
      else {
        tests = this.data['test-ordered'].split(',');
      }
      let found = false;

      tests.forEach((element: string) => {
        let x = this.panels.findIndex((panel: Panel) => panel.shortName === element);
        if (x >= 0) {
          found = true;
          this.panels[x].checked = true;
          this.testOrders.push(this.panels[x]);
        } else {
          let y = this.panels.findIndex((panel: Panel) => String(panel.id) === element);
          if (y >= 0) {
            found = true;
            this.panels[y].checked = true;
            this.testOrders.push(this.panels[y]);
          }
        }
      });
    } catch (error) {
      console.error("setPanelsOrdered", error);
    }

  }

  onDeleteFile(file: any): void {
    if (file && file.url)
      this._storage.refFromURL(file.url).delete();
  }


  upload(event: any) {
    try {
      const path = this.uid + `/${Date.now()}_${event.target.files[0].name}`;

      if (!this.data.files)
        this.data.files = [];

      this._ref = this._storage.ref(path);
      this._task = this._storage.upload(path, event.target.files[0])
      this.uploadProgress = this._task.percentageChanges();
      this._taskSubscription = this._task.snapshotChanges().pipe(
        finalize(async () => {
          const downloadURL = await this._storage.ref(path).getDownloadURL().toPromise();
          this.data.files.push({
            'name': event.target.files[0].name,
            'url': downloadURL,
            'uploaded_at': new Date().getTime()
          });
        })
      ).subscribe();
    } catch (error) {
      console.error("upload", error);
    }
  }
}
