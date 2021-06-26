import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IResumeData } from '../models/IResumeData';

@Injectable({
  providedIn: 'root'
})
export class CreateResumeService {

    // api: string = 'http://localhost:3000';
    api: string = 'https://resume-builder-server2.herokuapp.com';
    constructor(
      private http: HttpClient
    ) { }
      
    createResume(resumeData: IResumeData) {
      return this.http.post(this.api + "/create_resume", resumeData, {
        responseType: "blob",
        headers: new HttpHeaders().append("Content-Type", "application/json")
      });
    }
}
