import React from 'react'
import { Projects } from "@/app/scripts/parse_projects";
import { Hero, ProjectList } from "./components";
import { Navbar } from "@/components/ui/NavBar";

export default async function Page({ params }: { params: { class: string } }) {
  // Convert params to a resolved value using Promise.resolve
  const resolvedParams = await Promise.resolve(params);
  const section = resolvedParams.class;
  
  if (!section) {
    return (
      <div>
        <h1>Error loading projects</h1>
        <p>There was an error loading the project data. Please try again later.</p>
      </div>
    );
  }

  try {    
    const projects = new Projects(`public/data/${section}/submission_metadata.csv`);
        
    await projects.loadProjectsFromCSV();
    
    return (
      <main>
        <Hero section={section}/>
        <ProjectList projects={projects.getProjects()} />
      </main>
    );
  } catch (error) {
    console.error("Error loading projects:", error);
    return (
      <div>
        <h1>Error loading projects</h1>
        <p>There was an error loading the project data. Please try again later.</p>
      </div>
    );
  }
}