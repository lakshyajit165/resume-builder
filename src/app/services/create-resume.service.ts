import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IResumeData } from '../models/IResumeData';

@Injectable({
  providedIn: 'root'
})
export class CreateResumeService {

    api: string = 'http://localhost:3000';
    constructor(
      private http: HttpClient
    ) { }
      
    createResume(resumeData: IResumeData) {
      return this.http.post(this.api + "/create_resume", resumeData);
    }
}
