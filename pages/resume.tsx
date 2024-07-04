import PageLayout from "components/PageLayout";
import SectionWrapper from "components/SectionWrapper";
import Tabs from "components/Tabs";

function H3({ children }: { children: React.ReactNode }) {
  return <h3 className="mb-4 text-2xl font-bold">{children}</h3>;
}

function H4({ children }: { children: React.ReactNode }) {
  return <h4 className="mb-2 mt-4 text-xl font-semibold">{children}</h4>;
}

function AboutSection({ resumeData }: { resumeData: any }) {
  return (
    <SectionWrapper className="prose">
      <H3>About</H3>
      <p>{resumeData.about}</p>
      <H4>Most Amazing Development</H4>
      <p>{resumeData.mostAmazingDevelopment}</p>
      <H4>Preferred Environment</H4>
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
    <SectionWrapper className="prose">
      <H3>Work Experience</H3>
      {workExperience.map((job, index) => (
        <div key={index} className="mb-6">
          <H4>{job.position}</H4>
          <p className="italic">
            {job.company} {job.division ? `- ${job.division}` : ""}
          </p>
          {job.dateStart && job.dateEnd && (
            <p>
              {job.dateStart} - {job.dateEnd}
            </p>
          )}
          <ul className="mt-2 list-disc pl-5">
            {job.responsibilities.map((resp: any, idx: number) => (
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
    <SectionWrapper className="prose">
      <H3>Education</H3>
      {education.map((edu, index) => (
        <div key={index} className="mb-4">
          <H4>{edu.degree}</H4>
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

function SkillsSection({
  skills,
  sort = true,
}: {
  skills: any[];
  sort?: boolean;
}) {
  const _skills = sort
    ? skills.sort((a, b) =>
        a.yearsOfExperience > b.yearsOfExperience ? -1 : 1
      )
    : skills;

  return (
    <SectionWrapper>
      <H3>Skills & Expertise</H3>
      <ul className="grid list-disc grid-cols-1 gap-x-16 gap-y-2 pl-0 md:grid-cols-2">
        {_skills.map((skill, index) => (
          <li key={index} className="flex justify-between">
            <span className="text-lg font-medium">{skill.name}</span>
            <span className="whitespace-nowrap text-sm text-gray-500">
              {skill.yearsOfExperience} years
            </span>
          </li>
        ))}
      </ul>
    </SectionWrapper>
  );
}

function ProjectsSection({ projects }: { projects: any[] }) {
  return (
    <SectionWrapper className="prose">
      <H3>Projects</H3>
      {projects.map((project, index) => (
        <div key={index} className="mb-6">
          <H4>{project.name}</H4>
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
        <h1 className="mb-4 font-display text-xl font-bold" id="resume">
          Resume
        </h1>
        <h2 className="mb-4 text-3xl font-bold">{resumeData.fullName}</h2>
        <Tabs.Provider defaultValue="about">
          <Tabs.List labelId="resume">
            <Tabs.Tab value="about">About</Tabs.Tab>
            <Tabs.Tab value="experience">Experience</Tabs.Tab>
            <Tabs.Tab value="education">Education</Tabs.Tab>
            <Tabs.Tab value="skills">Skills</Tabs.Tab>
            <Tabs.Tab value="projects">Projects</Tabs.Tab>
          </Tabs.List>
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
