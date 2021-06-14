import { Component, OnInit, ViewChild } from '@angular/core';
import {AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {BreakpointObserver} from '@angular/cdk/layout';
import {StepperOrientation} from '@angular/material/stepper';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material/chips';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';


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
          }),

          this._formBuilder.group({
            experience: this._formBuilder.array([this.createExperienceFormGroup()])
          }),

          this._formBuilder.group({
            projects: this._formBuilder.array([this.createProjectFormGroup()])
          }),

          this._formBuilder.group({
            hobbies_and_achievements: this._formBuilder.array([this.createHobbiesAndAchievementsFormGroup()])
          })
      ])
    });
  }

  constructor(
    private _snackBar: MatSnackBar,
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
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  

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
  // education section functionalities
  createEducationFormGroup(): FormGroup {
    return new FormGroup({
      'college_or_uni': new FormControl('', Validators.required),
      'degree': new FormControl('', Validators.required),
      'discipline': new FormControl('', Validators.required),
      'from': new FormControl('', Validators.required),
      'to': new FormControl('', Validators.required),
      'marks_perc_gpa': new FormControl('', Validators.required)
    })
  }
  
  addEducationFormGroup() {
    const educationGrp = this.resumeFormGroup.controls.formArray.get('1') as FormGroup;
    let education = educationGrp.controls.education as FormArray;
    if(education.length === 3)
        this.openSnackBar("Can't add more than 3 education fields!");
    else
        education.push(this.createEducationFormGroup());
  }

  deleteEducationFormGroup(index: number) {
    const educationGrp = this.resumeFormGroup.controls.formArray.get('1') as FormGroup;
    let education = educationGrp.controls.education as FormArray;
    if (education.length > 1) {
      education.removeAt(index)
    } else {
      education.reset()
    }
  }

  // experience section functionalities
  createExperienceFormGroup(): FormGroup {
    return new FormGroup({
      'organization': new FormControl('', Validators.required),
      'position': new FormControl('', Validators.required),
      'from': new FormControl('', Validators.required),
      'to': new FormControl('', Validators.required),
      'description': new FormControl('', Validators.required)
    })
  }
  
  addExperienceFormGroup() {
    const experienceGrp = this.resumeFormGroup.controls.formArray.get('2') as FormGroup;
    let experience = experienceGrp.controls.experience as FormArray;
    console.log(this.resumeFormGroup.value);
    if(experience.length === 5)
        this.openSnackBar("Can't add more than 5 experiences!");
    else
        experience.push(this.createExperienceFormGroup());
  }

  deleteExperienceFormGroup(index: number) {
    const experienceGrp = this.resumeFormGroup.controls.formArray.get('2') as FormGroup;
    let experience = experienceGrp.controls.experience as FormArray;
    if (experience.length > 1) {
      experience.removeAt(index)
    } else {
      experience.reset()
    }
  }

  // project section functionalities
  createProjectFormGroup(): FormGroup {
    return new FormGroup({
      'title': new FormControl('', Validators.required),
      'link': new FormControl(''),
      'description': new FormControl('', Validators.required)
    })
  }

  addProjectFormGroup() {
    const projectGrp = this.resumeFormGroup.controls.formArray.get('3') as FormGroup;
    let projects = projectGrp.controls.projects as FormArray;
    if(projects.length === 5)
        this.openSnackBar("Can't add more than 5 projects!");
    else
        projects.push(this.createProjectFormGroup());
  }

  deleteProjectFormGroup(index: number) {
    const projectGrp = this.resumeFormGroup.controls.formArray.get('3') as FormGroup;
    let projects = projectGrp.controls.projects as FormArray;
    if (projects.length > 1) {
      projects.removeAt(index)
    } else {
      projects.reset()
    }
  }

  // hobbies and achievements
  createHobbiesAndAchievementsFormGroup() {
    return new FormGroup({
      'description': new FormControl('', Validators.required)
    })
  }

  addHobbiesAndAchievementsFormGroup() {
    const hobbiesGrp = this.resumeFormGroup.controls.formArray.get('4') as FormGroup;
    let hobbies = hobbiesGrp.controls.hobbies_and_achievements as FormArray;
    if(hobbies.length === 6)
        this.openSnackBar("Can't add more than 6 achievements!");
    else
        hobbies.push(this.createHobbiesAndAchievementsFormGroup());
  }

  deleteHobbiesAndAchievementsFormGroup(index: number) {
    const hobbiesGrp = this.resumeFormGroup.controls.formArray.get('4') as FormGroup;
    let hobbies = hobbiesGrp.controls.hobbies_and_achievements as FormArray;
    if (hobbies.length > 1) {
      hobbies.removeAt(index)
    } else {
      hobbies.reset()
    }
  }

  openSnackBar(msg: string) {
    this._snackBar.open(msg, 'Close', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 2000
    });
  }
}
