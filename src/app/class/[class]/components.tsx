"use client";
import React from 'react';
import { Project } from '@/app/models/project';
import { CardHeader, Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faVideo } from '@fortawesome/free-solid-svg-icons';
import { faYoutube, faGithub } from '@fortawesome/free-brands-svg-icons';

export function Hero({section}: {section: string}) {
  const formattedSection = section.replace(/_/g, " ");

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center px-4">
      <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-center" style={{ fontSize: "clamp(2rem, 5vw, 5rem)" }}>
        <span className='text-yellow-400'>{formattedSection}</span> Projects
      </h1>
      <Button
        className="mt-6 px-4 py-2"
        onClick={() => {
          window.scrollTo({
            top: window.innerHeight,
            behavior: "smooth",
          });
        }}
      >
        <FontAwesomeIcon icon={faPlay} className="mr-2" />
        Checkout the Projects
      </Button>
    </div>
  );
}

export function ProjectCard({ project }: { project: Project }) {
  const getVideoId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };
  
  const videoId = getVideoId(project.youtube_link);
  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
  
  return (
    <div className="w-full mx-auto">
      <Card>
        <CardHeader>
          <h2 className="text-xl">{`Team ${project.team_number}`}</h2>
        </CardHeader>
        <CardHeader>
        <div style={{ width: '331px', height: '230px', overflow: 'hidden' }}>
            <img 
                src={thumbnailUrl} 
                alt={`Thumbnail for project ${project.submission_id}`} 
                style={{ width: '100%', height: '100%', objectFit: 'contain' }}
            />
            </div>
        </CardHeader>
        <CardContent>
        <div className="flex items-center" style={{ gap: '1rem' }}>
            <a
              href={project.youtube_link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm "
            >
              <FontAwesomeIcon icon={faYoutube} size="lg" /> 
            </a>
            <a
              href={project.github_pages}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm">
                <FontAwesomeIcon icon={faGithub} size="lg" />
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export function ProjectList({ projects }: { projects: Project[] }) {
  if (!projects || projects.length === 0) {
    return <div>No projects available</div>;
  }  
  
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
      gap: '1rem',
      maxWidth: '1200px',
      width: '100%',
      margin: '0 auto',
      padding: '1rem'
    }}>
      {projects.map((project, index) => (
        <ProjectCard key={index} project={project} />
      ))}
    </div>
  );
}


        // Button code
        <button className="inline-flex h-12 animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
          Shimmer
        </button>
