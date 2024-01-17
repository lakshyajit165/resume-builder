import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sample-preview',
  templateUrl: './sample-preview.component.html',
  styleUrls: ['./sample-preview.component.css'],
})
export class SamplePreviewComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  resumeDetails = {
    name: 'John Doe',
    email: 'john.doe@gmail.com',
    contact: '+11234567890',
    github: 'https://github.com/jdoe/',
    linkedin: 'https://linkedin.com/us/johndoe/',
    technical_skills:
      'Angular, React, SpringBoot, Node.js, PostgreSQL, Redis, MongoDB, Docker, K8S, System Design, Design Patterns, AWS, GCP, Jenkins',
    education: [
      {
        degree: "Master's Degree",
        discipline: 'Data Science and AI',
        college_or_uni: 'ABC University',
        from: 'August 19, 2017',
        to: 'May 30, 2019',
        marks_perc_gpa: '8.85',
      },
      {
        degree: "Bachelor's Degree",
        discipline: 'Computer Science and Engineering',
        college_or_uni: 'PQR University',
        from: 'May 12, 2017',
        to: 'May 30, 2013',
        marks_perc_gpa: '9.20',
      },
    ],
    experience: [
      {
        organization: 'Microsoft',
        position: 'Lead Developer',
        from: 'February 7, 2022',
        to: 'Present',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris lobortis dictum sem, at rhoncus nisi maximus a. Ut pulvinar risus sed risus elementum, at euismod ante dapibus.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris lobortis dictum sem, at rhoncus nisi maximus a. Ut pulvinar risus sed risus elementum, at euismod ante dapibus.',
      },
      {
        organization: 'Amazon',
        position: 'Senior Software Developer',
        from: 'January 31, 2022',
        to: 'February 25, 2021',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris lobortis dictum sem, at rhoncus nisi maximus a. Ut pulvinar risus sed risus elementum, at euismod ante dapibus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris lobortis dictum sem, at rhoncus nisi maximus a. Ut pulvinar risus sed risus elementum, at euismod ante dapibus.',
      },
      {
        organization: 'Netflix',
        position: 'Application Developer',
        from: 'February 24, 2021',
        to: 'December 4, 2017',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris lobortis dictum sem, at rhoncus nisi maximus a. Ut pulvinar risus sed risus elementum, at euismod ante dapibus. Donec commodo gravida ipsum ac convallis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris lobortis dictum sem, at rhoncus nisi maximus a. Ut pulvinar risus sed risus elementum, at euismod ante dapibus.',
      },
    ],
    projects: [
      {
        title: 'Project Title 1',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris lobortis dictum sem, at rhoncus nisi maximus a. Ut pulvinar risus sed risus elementum, at euismod ante dapibus. Nam dictum eget felis sit amet sodales. Donec commodo gravida ipsum ac convallis. Aenean metus dolor, vehicula nec pellentesque non.',
        link: 'https://example.com',
      },
      {
        title: 'Project Title 1',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris lobortis dictum sem, at rhoncus nisi maximus a. Ut pulvinar risus sed risus elementum, at euismod ante dapibus. Nam dictum eget felis sit amet sodales. Donec commodo gravida ipsum ac convallis. Aenean metus dolor, vehicula nec pellentesque non.',
        link: 'https://example.com',
      },
      {
        title: 'Project Title 1',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris lobortis dictum sem, at rhoncus nisi maximus a. Ut pulvinar risus sed risus elementum, at euismod ante dapibus. Nam dictum eget felis sit amet sodales. Donec commodo gravida ipsum ac convallis. Aenean metus dolor, vehicula nec pellentesque non.',
        link: 'https://example.com',
      },
    ],
    extras: [
      'Ed turpis neque, pulvinar ac posuere eget, elementum sed dui. Mauris condimentum augue sed orci eleifend, sed blandit odio dignissim. Duis pharetra venenatis purus non semper.',
    ],
  };
}
