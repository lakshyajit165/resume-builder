import { Component, OnInit, ViewChild } from '@angular/core';
import {AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {BreakpointObserver} from '@angular/cdk/layout';
import {StepperOrientation} from '@angular/material/stepper';
import {merge, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipInputEvent, MatChipList} from '@angular/material/chips';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { ErrorStateMatcher } from '@angular/material/core';
import { CreateResumeService } from 'src/app/services/create-resume.service';
import { IResumeData } from 'src/app/models/IResumeData';
import { saveAs } from 'file-saver';


export interface Skill {
  name: string;
}

@Component({
  selector: 'app-resume-form',
  templateUrl: './resume-form.component.html',
  styleUrls: ['./resume-form.component.css']
})
export class ResumeFormComponent implements OnInit {

  @ViewChild("chipList") chipList: MatChipList;

  ngOnInit() {
    this.resumeFormGroup = this._formBuilder.group({
      formArray: 
        this._formBuilder.array([

          this._formBuilder.group({
            name: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(30)]],
            email: ['', [Validators.required, Validators.email]],
            github: ['', [Validators.required, Validators.pattern(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/)]],
            linkedin: ['', [Validators.required, Validators.pattern(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/)]],
            mobile: ['', [Validators.required, Validators.pattern(/^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/)]],
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
    this.resumeFormGroup.controls.formArray.get('2.experience').valueChanges.subscribe(value => {
      for(let i = 0; i<value.length; i++){
        value[i].current_job ? this.resumeFormGroup.controls.formArray.get(`2.experience.${i}.to`).disable({emitEvent: false}) : this.resumeFormGroup.controls.formArray.get(`2.experience.${i}.to`).enable({emitEvent: false});
      }
    })
  }

  constructor(
    private _createResume: CreateResumeService,
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
  errorMatcher = new CustomErrorStateMatcher();
  resumeFormData: IResumeData = {
    name: '',
    email: '',
    github: '',
    linkedin: '',
    mobile: '',
    skills: [],
    education: [],
    experience: [],
    projects: [],
    achievement: []
  };
  resumeLoadingStatus: boolean = false;

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
    } else {
      this.chipList.errorState = true;
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
      'college_or_uni': new FormControl('',  Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(100)])),
      'degree': new FormControl('',  Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(100)])),
      'discipline': new FormControl('',  Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(100)])),
      'from': new FormControl('', Validators.required),
      'to': new FormControl({ value: '', disabled: false }, Validators.required),
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
      'current_job': new FormControl(false, Validators.required),
      'description': new FormControl('', Validators.required)
    })
  }
  
  addExperienceFormGroup() {
    const experienceGrp = this.resumeFormGroup.controls.formArray.get('2') as FormGroup;
    let experience = experienceGrp.controls.experience as FormArray;
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

  // generate resume
  generateResume(): void {
    this.resumeLoadingStatus = true;
    this.resumeFormData.name = this.resumeFormGroup.value.formArray[0].name;
    this.resumeFormData.email = this.resumeFormGroup.value.formArray[0].email;
    this.resumeFormData.mobile = this.resumeFormGroup.value.formArray[0].mobile;
    this.resumeFormData.github = this.resumeFormGroup.value.formArray[0].github;
    this.resumeFormData.linkedin = this.resumeFormGroup.value.formArray[0].linkedin;
    this.resumeFormData.skills = this.getSkillsList(this.skillNames);
    this.resumeFormData.education = this.resumeFormGroup.value.formArray[1].education;
    this.resumeFormData.experience = this.resumeFormGroup.value.formArray[2].experience;
    this.resumeFormData.projects = this.resumeFormGroup.value.formArray[3].projects;
    this.resumeFormData.achievement = this.resumeFormGroup.value.formArray[4].hobbies_and_achievements;
    this._createResume.createResume(this.resumeFormData).subscribe(blob => {
      saveAs(blob, "Resume.pdf"); 
      this.resumeLoadingStatus = false;
      this.openSnackBar('Resume download complete!')
    })
  }

  getSkillsList(skillNames: Skill[]): string[] {
    let skills: string[] = [];
    skillNames.forEach(skill => {
      skills.push(skill.name);
    });
    return skills;
  }

  openSnackBar(msg: string) {
    this._snackBar.open(msg, 'Close', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 2000
    });
  }
}
// shows error on a form/input field only if it's touched
export class CustomErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl, form: NgForm | FormGroupDirective | null) {
    return control && control.invalid && control.touched;
  }
}