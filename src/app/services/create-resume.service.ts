import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IResumeData } from '../models/IResumeData';
import { sampleData } from '../data/sampleData';

@Injectable({
  providedIn: 'root',
})
export class CreateResumeService {
  api: string = 'https://resume-builder-server.onrender.com';
  constructor(private http: HttpClient) {}

  createResume(resumeData: IResumeData) {
    return this.http.post(this.api + '/create_resume', resumeData, {
      responseType: 'blob',
      headers: new HttpHeaders().append('Content-Type', 'application/json'),
    });
  }

  createSampleResume() {
    return this.http.post(
      this.api + '/create_resume',
      JSON.stringify(sampleData),
      {
        responseType: 'blob',
        headers: new HttpHeaders().append('Content-Type', 'application/json'),
      }
    );
  }
}
