import { IAchievement } from "./IAchievement";
import { IEducation } from "./IEducation";
import { IExperience } from "./IExperience";
import { IProject } from "./IProject";

export interface IResumeData {
    name: string,
    email: string,
    github: string,
    linkedin: string,
    mobile: string,
    skills: string[],
    education: IEducation[],
    experience: IExperience[],
    projects: IProject[],
    achievement: IAchievement[]
};