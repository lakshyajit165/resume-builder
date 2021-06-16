import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CreateResumeService {

    api: string = 'http://localhost:3000/';
    constructor(
      private http: HttpClient
    ) { }
      
    createResume(resumeData: object) {

    }
}
