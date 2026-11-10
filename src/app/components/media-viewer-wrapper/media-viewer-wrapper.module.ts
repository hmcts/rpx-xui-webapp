import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MediaViewerModule } from '@hmcts/media-viewer';
import { MediaViewerWrapperComponent } from './media-viewer-wrapper.component';

const routes: Routes = [
  {
    path: '',
    component: MediaViewerWrapperComponent,
  },
];

@NgModule({
  declarations: [MediaViewerWrapperComponent],
  imports: [CommonModule, MediaViewerModule, RouterModule.forChild(routes)],
})
export class MediaViewerWrapperModule {}
