import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TestKitsComponent } from './test-kits.component';
import { TestKitHomeComponent} from './test-kit-home/test-kit-home.component';

const routes: Routes = [{ path: '', component: TestKitHomeComponent, data: { title: 'Test Kit Order Admin' } }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TestKitsRoutingModule { }
