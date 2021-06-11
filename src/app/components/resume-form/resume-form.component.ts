import { Component, OnInit, ViewChild } from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
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
    this.formGroup = this._formBuilder.group({
      formArray: this._formBuilder.array([
        this._formBuilder.group({
          name: ['', Validators.required],
          email: ['', [Validators.required, Validators.email]],
          github: ['', Validators.required],
          linkedin: ['', Validators.required],
          mobile: ['', Validators.required],
          skills: [this.skillNames, this.validateSkillsArray]
        }),
        this._formBuilder.group
      ])
    });
  }

  constructor(
    private _formBuilder: FormBuilder, 
    breakpointObserver: BreakpointObserver) {
      this.stepperOrientation = breakpointObserver.observe('(min-width: 800px)')
      .pipe(map(({matches}) => matches ? 'horizontal' : 'vertical'));
  }

  formGroup: FormGroup;
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
    return this.formGroup.get('formArray');
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

  remove(fruit: Skill): void {
    const index = this.skillNames.indexOf(fruit);
    if (index >= 0) {
      this.skillNames.splice(index, 1);
    }

    if (this.skillNames.length < 8) {
      this.chipList.errorState = true;
    }
  }

  validateSkillsArray(c: FormControl){
    if (c.value && c.value.length > 0) {
      return {
        validateArrayNotEmpty: { valid: false }
      };
    }
    return null;
  }


}
