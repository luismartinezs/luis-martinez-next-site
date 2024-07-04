import PageLayout from "components/PageLayout";
import SectionWrapper from "components/SectionWrapper";
import Tabs from "components/Tabs";
import { useTabs } from "components/Tabs/Tabs";
import { useState } from "react";

function AboutSection({ resumeData }: { resumeData: any }) {
  return (
    <SectionWrapper>
      <h2 className="mb-4 text-2xl font-bold">About</h2>
      <p>{resumeData.about}</p>
      <h3 className="mb-2 mt-4 text-xl font-semibold">
        Most Amazing Development
      </h3>
      <p>{resumeData.mostAmazingDevelopment}</p>
      <h3 className="mb-2 mt-4 text-xl font-semibold">Preferred Environment</h3>
      <ul className="list-disc pl-5">
        {resumeData.preferredEnvironment.map((item: string, index: number) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </SectionWrapper>
  );
}

function ExperienceSection({ workExperience }: { workExperience: any[] }) {
  return (
    <SectionWrapper>
      <h2 className="mb-4 text-2xl font-bold">Work Experience</h2>
      {workExperience.map((job, index) => (
        <div key={index} className="mb-6">
          <h3 className="text-xl font-semibold">{job.position}</h3>
          <p className="italic">
            {job.company} {job.division ? `- ${job.division}` : ""}
          </p>
          {job.dateStart && job.dateEnd && (
            <p>
              {job.dateStart} - {job.dateEnd}
            </p>
          )}
          <ul className="mt-2 list-disc pl-5">
            {job.responsibilities.map((resp, idx) => (
              <li key={idx}>{resp}</li>
            ))}
          </ul>
          {job.skills && (
            <div className="mt-2">
              <strong>Skills:</strong> {job.skills.join(", ")}
            </div>
          )}
        </div>
      ))}
    </SectionWrapper>
  );
}

function EducationSection({ education }: { education: any[] }) {
  return (
    <SectionWrapper>
      <h2 className="mb-4 text-2xl font-bold">Education</h2>
      {education.map((edu, index) => (
        <div key={index} className="mb-4">
          <h3 className="text-xl font-semibold">{edu.degree}</h3>
          <p>
            {edu.institution}, {edu.location}
          </p>
          <p>
            {edu.yearStart} - {edu.yearEnd}
          </p>
        </div>
      ))}
    </SectionWrapper>
  );
}

function SkillsSection({ skills }: { skills: any[] }) {
  return (
    <SectionWrapper>
      <h2 className="mb-4 text-2xl font-bold">Skills & Expertise</h2>
      <ul className="grid grid-cols-2 gap-2">
        {skills.map((skill, index) => (
          <li key={index} className="flex justify-between">
            <span>{skill.name}</span>
            <span>{skill.yearsOfExperience} years</span>
          </li>
        ))}
      </ul>
    </SectionWrapper>
  );
}

function ProjectsSection({ projects }: { projects: any[] }) {
  return (
    <SectionWrapper>
      <h2 className="mb-4 text-2xl font-bold">Projects</h2>
      {projects.map((project, index) => (
        <div key={index} className="mb-6">
          <h3 className="text-xl font-semibold">{project.name}</h3>
          <p className="italic">{project.type} Project</p>
          {project.url && (
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              View Project
            </a>
          )}
          <p className="mt-2">{project.description}</p>
          {project.skills && (
            <div className="mt-2">
              <strong>Skills:</strong> {project.skills.join(", ")}
            </div>
          )}
        </div>
      ))}
    </SectionWrapper>
  );
}

export default function ResumePage({ resumeData }: { resumeData: any }) {
  return (
    <PageLayout>
      <div className="container mx-auto p-4">
        <h1 className="mb-4 text-3xl font-bold">Resume</h1>
        <h2 className="mb-4 text-2xl font-bold">{resumeData.fullName}</h2>
        <Tabs.Provider defaultValue="about">
          <div className="flex gap-4">
            <Tabs.Tab tabId="about">About</Tabs.Tab>
            <Tabs.Tab tabId="experience">Experience</Tabs.Tab>
            <Tabs.Tab tabId="education">Education</Tabs.Tab>
            <Tabs.Tab tabId="skills">Skills</Tabs.Tab>
            <Tabs.Tab tabId="projects">Projects</Tabs.Tab>
          </div>
          <Tabs.Panel value="about">
            <AboutSection resumeData={resumeData} />
          </Tabs.Panel>
          <Tabs.Panel value="experience">
            <ExperienceSection workExperience={resumeData.workExperience} />
          </Tabs.Panel>
          <Tabs.Panel value="education">
            <EducationSection education={resumeData.education} />
          </Tabs.Panel>
          <Tabs.Panel value="skills">
            <SkillsSection skills={resumeData.skills} />
          </Tabs.Panel>
          <Tabs.Panel value="projects">
            <ProjectsSection projects={resumeData.projects} />
          </Tabs.Panel>
        </Tabs.Provider>
      </div>
    </PageLayout>
  );
}

export async function getServerSideProps() {
  // Replace with your actual API URL
  const res = await fetch(
    "https://raw.githubusercontent.com/luismartinezs/resume-json/main/resume.json"
  );
  const resumeData = await res.json();

  return {
    props: {
      resumeData,
    },
  };
}
