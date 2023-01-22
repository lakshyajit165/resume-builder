const sampleData = {
  name: 'John Doe',
  email: 'john.doe@gmail.com',
  github: 'https://github.com/johndoe',
  linkedin: 'https://www.linkedin.com/in/johndoe/',
  mobile: '+11234567890',
  skills: [
    'Angular',
    'React',
    'SpringBoot',
    'Node.js',
    'PostgreSQL',
    'Redis',
    'MongoDB',
    'Docker',
    'K8S',
    'System Design',
    'Design Patterns',
    'AWS',
    'GCP',
    'Jenkins',
  ],
  education: [
    {
      college_or_uni: 'ABC University',
      degree: "Master's Degree",
      discipline: 'Data Science and AI',
      from: '2017-08-19T18:30:00.000Z',
      to: '2019-05-30T18:30:00.000Z',
      marks_perc_gpa: '8.76',
    },
    {
      college_or_uni: 'PQR University',
      degree: "Bachelor's Degree",
      discipline: 'Computer Science and Engineering',
      from: '2017-05-12T18:30:00.000Z',
      to: '2013-05-30T18:30:00.000Z',
      marks_perc_gpa: '9.2',
    },
    {
      college_or_uni: 'XYZ School',
      degree: 'Higher Secondary',
      discipline: 'Science',
      from: '2012-02-29T18:30:00.000Z',
      to: '2010-05-30T18:30:00.000Z',
      marks_perc_gpa: '95%',
    },
  ],
  experience: [
    {
      organization: 'Microsoft',
      position: 'Lead Developer',
      from: '2022-02-07T18:30:00.000Z',
      current_job: true,
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris lobortis dictum sem, at rhoncus nisi maximus a. Ut pulvinar risus sed risus elementum, at euismod ante dapibus.',
    },
    {
      organization: 'Amazon',
      position: 'Senior Software Developer',
      from: '2022-01-31T18:30:00.000Z',
      to: '2021-02-25T18:30:00.000Z',
      current_job: false,
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris lobortis dictum sem, at rhoncus nisi maximus a. Ut pulvinar risus sed risus elementum, at euismod ante dapibus. ',
    },
    {
      organization: 'Accenture',
      position: 'Application Developer',
      from: '2021-02-24T18:30:00.000Z',
      to: '2017-12-04T18:30:00.000Z',
      current_job: false,
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris lobortis dictum sem, at rhoncus nisi maximus a. Ut pulvinar risus sed risus elementum, at euismod ante dapibus. Donec commodo gravida ipsum ac convallis.',
    },
  ],
  projects: [
    {
      title: 'Project Title 1',
      link: 'https://example.com',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris lobortis dictum sem, at rhoncus nisi maximus a. Ut pulvinar risus sed risus elementum, at euismod ante dapibus. Nam dictum eget felis sit amet sodales. Donec commodo gravida ipsum ac convallis. Aenean metus dolor, vehicula nec pellentesque non.',
    },
    {
      title: 'Project Title 2',
      link: 'https://example.com',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris lobortis dictum sem, at rhoncus nisi maximus a. Ut pulvinar risus sed risus elementum, at euismod ante dapibus. Nam dictum eget felis sit amet sodales. Donec commodo gravida ipsum ac convallis. Aenean metus dolor, vehicula nec pellentesque non, molestie eu nisl. ',
    },
    {
      title: 'Project Title 3',
      link: 'https://example.com',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris lobortis dictum sem, at rhoncus nisi maximus a. Ut pulvinar risus sed risus elementum, at euismod ante dapibus. Nam dictum eget felis sit amet sodales. Donec commodo gravida ipsum ac convallis. Aenean metus dolor, vehicula nec pellentesque non, molestie eu nisl. Cras et molestie neque, sed scelerisque dolor. Class aptent taciti sociosqu ad.',
    },
  ],
  achievement: [
    {
      description:
        'Ed turpis neque, pulvinar ac posuere eget, elementum sed dui. Mauris condimentum augue sed orci eleifend, sed blandit odio dignissim. Duis pharetra venenatis purus non semper. ',
    },
  ],
};

export { sampleData };
