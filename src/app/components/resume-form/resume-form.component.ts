import { Component, OnInit, ViewChild } from '@angular/core';
import {AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {BreakpointObserver} from '@angular/cdk/layout';
import {StepperOrientation} from '@angular/material/stepper';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material/chips';

export interface Skill {
  name: string;
}

@Component({
  selector: 'app-resume-form',
  templateUrl: './resume-form.component.html',
  styleUrls: ['./resume-form.component.css']
})
export class ResumeFormComponent implements OnInit {

  @ViewChild("chipList") chipList;

  ngOnInit() {
    this.resumeFormGroup = this._formBuilder.group({
      formArray: 
        this._formBuilder.array([
        this._formBuilder.group({
          name: ['', Validators.required],
          email: ['', [Validators.required, Validators.email]],
          github: ['', Validators.required],
          linkedin: ['', Validators.required],
          mobile: ['', Validators.required],
          skills: [this.skillNames]
        }),
        this._formBuilder.group({
          education: this._formBuilder.array([this.createEducationFormGroup()])
        })
      ])
    });
  }

  constructor(
    private _formBuilder: FormBuilder, 
    breakpointObserver: BreakpointObserver) {
      this.stepperOrientation = breakpointObserver.observe('(min-width: 800px)')
      .pipe(map(({matches}) => matches ? 'horizontal' : 'vertical'));
  }

  resumeFormGroup: FormGroup;
  isEditable = true;
  stepperOrientation: Observable<StepperOrientation>;
  skillNames: Skill[] = [];
  // for skills chips
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;

  get formArray(): AbstractControl | null {
    return this.resumeFormGroup.get('formArray');
  }


  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add skill
    if (value) {
      this.skillNames.push({name: value});
    }
    if (this.skillNames.length >= 8) {
      this.chipList.errorState = false;
    }
    // Clear the input value
    event.chipInput!.clear();
  }

  remove(skillValue: Skill): void {
    const index = this.skillNames.indexOf(skillValue);
    if (index >= 0) {
      this.skillNames.splice(index, 1);
    }

    if (this.skillNames.length < 8) {
      this.chipList.errorState = true;
    }
  }

  createEducationFormGroup(): FormGroup {
    return new FormGroup({
      'college_or_uni': new FormControl('', Validators.required),
      'degree': new FormControl('', Validators.required),
      'from': new FormControl('', Validators.required),
      'to': new FormControl('', Validators.required),
      'marks_perc_gpa': new FormControl('', Validators.required)
    })
  }
  
  addEducationFormGroup() {
    const educationGrp = this.resumeFormGroup.controls.formArray.get('1') as FormGroup;
    const education = educationGrp.controls.education as FormArray;
    console.log(educationGrp.controls.education);
    education.push(this.createEducationFormGroup());
  }

  stepClick(e){
    console.log(e);
  }

}
