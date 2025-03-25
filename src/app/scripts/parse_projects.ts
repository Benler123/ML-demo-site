import * as fs from 'fs';
import * as path from 'path';
import csv from 'csv-parser';
import { Project } from '../models/project';
import { json } from 'stream/consumers';
import { g } from 'framer-motion/client';

export class Projects
{
    private projects: Project[] = [];
    private csvFilePath: string;

    constructor(csvFilePath: string) {
        this.csvFilePath = csvFilePath;        
    }

    public loadProjectsFromCSV(): Promise<void> {
        let seenSet = new Set<number>();

        return new Promise((resolve, reject) => {
          const absolutePath = path.resolve(this.csvFilePath);
          
          fs.createReadStream(absolutePath)
            .pipe(csv())
            .on('data', (row: any) => {
              if (!row['Question 1.3 Response'] || !row['Question 1.1 Response']) {
                return;
              }
              const githubLinksJson = this.rubyHashToJson(row['Question 1.3 Response']);                            
              const groupInfoJson = this.rubyHashToJson(row['Question 1.1 Response']);
              const project: Project = {
                submission_id: parseInt(row["Submission ID"], 10),
                youtube_link: row['Question 1.2 Response'],
                github_pages: githubLinksJson['1'],   
                team_number: groupInfoJson['0']             
              };            
              if (project.youtube_link && !seenSet.has(project.submission_id) && project.team_number) {
                seenSet.add(project.submission_id);
                this.projects.push(project);
              }     
            })
            .on('end', () => {
              console.log('CSV file successfully processed');
              resolve();
            })
            .on('error', (error) => {
              console.error('Error processing CSV file:', error);
              reject(error);
            });
        });
      }

    public getProjects(): Project[] {
      return [...this.projects].sort((a, b) => {                              
        return a.team_number - b.team_number;
      });
    }

    public rubyHashToJson(rubyHash: string) {      
      let jsonString = rubyHash.replace(/=>/g, ':');
            
      jsonString = jsonString.replace(/'/g, '___APOSTROPHE___');
            
      jsonString = jsonString.replace(/([{,]\s*)([a-zA-Z0-9_]+)(\s*:)/g, '$1"$2"$3');
      
      jsonString = jsonString.replace(/:(\s*)"([^"]*)"/g, (match, space, value) => {        
        const escapedValue = value.replace(/\\"/g, '\\"');
        return `: ${space}"${escapedValue}"`;
      });
            
      jsonString = jsonString.replace(/___APOSTROPHE___/g, "\\'");
      
      try {      
        return JSON.parse(jsonString);
      } catch (error) {
        
        try {
          const simpleJson = rubyHash.replace(/=>/g, ':');
          return JSON.parse(simpleJson);
        } catch (secondError) {
          console.error("Conversion failed:", error, rubyHash);
          return null;
        }
      }
    }
}

