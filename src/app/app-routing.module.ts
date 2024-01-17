import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SamplePreviewComponent } from './components/sample-preview/sample-preview.component';
import { ResumeFormComponent } from './components/resume-form/resume-form.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    component: ResumeFormComponent,
  },
  {
    path: 'preview',
    component: SamplePreviewComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
