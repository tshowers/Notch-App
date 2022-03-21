import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SentencePipe } from './pipes/sentence.pipe';
import { TypeofPipe } from './pipes/typeof.pipe';
import { StatusPipe } from './pipes/status.pipe';
import { DataMaxlengthColumnPipe } from './pipes/data-maxlength-column.pipe';
import { UiSwitchModule } from 'ngx-toggle-switch';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { LabProgressPipe } from './pipes/lab-progress.pipe';
import { LickAppWidgetTotalsModule } from 'lick-app-widget-totals';
import { DropzoneDirective } from './directives/dropzone.directive';
import { SafePipe } from './pipes/safe.pipe';
import { TimelineComponent } from './components/timeline/timeline.component';
import { SortByLastNamePipe } from './pipes/sort-by-last-name.pipe';
import { SortByCustomerLastNamePipe } from './pipes/sort-by-customer-last-name.pipe';
import { LatestPostsComponent } from './components/latest-posts/latest-posts.component';
import { NoteSearchPipe } from './pipes/note-search.pipe';

@NgModule({
    imports: [
        CommonModule,
        UiSwitchModule,
        InfiniteScrollModule,
        LickAppWidgetTotalsModule,
        FormsModule
    ],
    declarations: [
        SentencePipe,
        TypeofPipe,
        DataMaxlengthColumnPipe,
        StatusPipe,
        LabProgressPipe,
        DropzoneDirective,
        SafePipe,
        TimelineComponent,
        SortByLastNamePipe,
        SortByCustomerLastNamePipe,
        LatestPostsComponent,
        NoteSearchPipe,
    ],
    exports: [
        SentencePipe,
        TypeofPipe,
        StatusPipe,
        NoteSearchPipe,
        DataMaxlengthColumnPipe,
        LabProgressPipe,
        SortByLastNamePipe,
        SortByCustomerLastNamePipe,
        UiSwitchModule,
        InfiniteScrollModule,
        LickAppWidgetTotalsModule,
        DropzoneDirective,
        SafePipe,
        FormsModule,
        TimelineComponent,
        LatestPostsComponent
    ]
})
export class SharedModule { }