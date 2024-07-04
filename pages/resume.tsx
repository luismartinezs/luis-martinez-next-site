import CloudinaryImage from "components/CloudinaryImage";
import PageLayout from "components/PageLayout";
import SectionWrapper from "components/SectionWrapper";
import Tabs from "components/Tabs";
import { FaSkype, FaStar } from "react-icons/fa";
import { MdEmail, MdHome, MdLocationOn, MdPhone } from "react-icons/md";

function H3({ children }: { children: React.ReactNode }) {
  return <h3 className="mb-4 text-2xl font-bold text-gray-700">{children}</h3>;
}

function H4({ children }: { children: React.ReactNode }) {
  return (
    <h4 className="mb-2 mt-4 text-xl font-semibold text-gray-700">
      {children}
    </h4>
  );
}

function SimpleList({ label, items }: { label: string; items: string[] }) {
  return (
    <div className="mt-2 !text-gray-500 dark:!text-gray-400">
      <span className="!text-gray-500 dark:!text-gray-400">{label}:</span>{" "}
      <span className="!text-gray-600 dark:!text-gray-300">
        {items.join(", ")}
      </span>
    </div>
  );
}

function AboutSection({ resumeData }: { resumeData: any }) {
  return (
    <SectionWrapper className="prose">
      <H3>About</H3>
      <p>{resumeData.about}</p>
      <H4>Most Amazing Development</H4>
      <p>{resumeData.mostAmazingDevelopment}</p>
      <H4>Preferred Environment</H4>
      <div className="flex flex-wrap gap-2">
        {resumeData.preferredEnvironment.map((item: string, index: number) => (
          <span
            key={index}
            className="inline-block rounded-full bg-gray-200 px-3 py-1 text-sm font-medium text-gray-700 transition-colors duration-200 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
          >
            {item}
          </span>
        ))}
      </div>
    </SectionWrapper>
  );
}

function Job({ job }: { job: any }) {
  const {
    position,
    company,
    division,
    dateStart,
    dateEnd,
    responsibilities,
    skills,
    industries,
  } = job;

  return (
    <div className="mb-6">
      <H4>{position}</H4>
      <p className="italic !text-gray-500 dark:!text-gray-400">
        {company} {division ? `- ${division}` : ""}{" "}
        {dateStart && dateEnd && (
          <span className="!text-gray-500 dark:!text-gray-400">
            | {dateStart} - {dateEnd}
          </span>
        )}
      </p>
      <ul className="mt-2 list-disc pl-5">
        {responsibilities.map((resp: any, idx: number) => (
          <li key={idx}>{resp}</li>
        ))}
      </ul>
      {skills && skills.length > 0 && (
        <SimpleList label="Skills" items={skills} />
      )}
      {industries && industries.length > 0 && (
        <SimpleList label="Industries" items={industries} />
      )}
    </div>
  );
}
function ExperienceSection({ workExperience }: { workExperience: any[] }) {
  return (
    <SectionWrapper className="prose">
      <H3>Work Experience</H3>
      {workExperience.map((job, index) => (
        <Job key={index} job={job} />
      ))}
    </SectionWrapper>
  );
}

function EducationSection({ education }: { education: any[] }) {
  return (
    <SectionWrapper className="prose">
      <H3>Education</H3>
      <div className="flex flex-col gap-4">
        {education.map((edu, index) => (
          <div key={index}>
            <H4>
              {edu.degree} in {edu.field}
            </H4>
            <p className="mb-1 text-gray-600 dark:text-gray-300">
              {edu.institution}, {edu.location}
            </p>
            <p className="m-0 text-sm text-gray-500 dark:text-gray-400">
              {edu.dateStart} - {edu.dateEnd}
            </p>
          </div>
        ))}
      </div>
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
  const sortedSkills = sort
    ? [...skills].sort((a, b) => {
        if (a.star && !b.star) return -1;
        if (!a.star && b.star) return 1;
        return (b.years || 0) - (a.years || 0);
      })
    : skills;

  return (
    <SectionWrapper>
      <H3>Skills & Expertise</H3>
      <ul className="grid list-none grid-cols-1 gap-x-16 gap-y-2 pl-0 md:grid-cols-2">
        {sortedSkills.map((skill, index) => (
          <li key={index} className="flex items-center justify-between">
            <span className="flex items-center text-lg font-medium">
              {skill.star && <FaStar className="mr-2 size-4" color="#6366f1" />}
              {skill.name}
            </span>
            {skill.years !== undefined && (
              <span className="whitespace-nowrap text-sm text-gray-500">
                {skill.years} {skill.years === 1 ? "year" : "years"}
              </span>
            )}
          </li>
        ))}
      </ul>
    </SectionWrapper>
  );
}

function Project({ project }: { project: any }) {
  const { name, type, url, description, skills, repositoryUrl } = project;

  return (
    <div className="mb-6 border-b border-gray-500 pb-6">
      <H4>{name}</H4>
      <p className="italic text-gray-500 dark:text-gray-400">{type} Project</p>
      <div className="flex space-x-3">
        {url && (
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="!text-primary-500 no-underline hover:!text-primary-600 hover:underline dark:!text-primary-300 dark:hover:!text-primary-400"
          >
            View website
          </a>
        )}
        {repositoryUrl && (
          <a
            href={repositoryUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="!text-primary-500 no-underline hover:!text-primary-600 hover:underline dark:!text-primary-300 dark:hover:!text-primary-400"
          >
            View repo
          </a>
        )}
      </div>
      <p className="mt-2">{description}</p>
      {skills && skills.length > 0 && (
        <SimpleList label="Skills" items={skills} />
      )}
    </div>
  );
}

function ProjectsSection({ projects }: { projects: any[] }) {
  return (
    <SectionWrapper className="prose">
      <H3>Projects</H3>
      <div className="flex flex-col">
        {projects.map((project, index) => (
          <Project key={index} project={project} />
        ))}
      </div>
    </SectionWrapper>
  );
}

const ContactInfo = ({
  citizenship,
  social,
  contact,
}: {
  citizenship: string;
  social: any[];
  contact: any;
}) => {
  return (
    <div className="max-w-4xl py-4 text-sm">
      <div className="mb-2 flex flex-wrap items-center gap-x-4 gap-y-2">
        {citizenship && (
          <span className="text-gray-600 dark:text-gray-300">
            <span className="text-gray-500 dark:text-gray-400">
              Citizenship
            </span>{" "}
            <span className="font-semibold">{citizenship}</span>
          </span>
        )}
        <span> - </span>
        {social && social.length > 0 && (
          <div className="flex flex-wrap items-center gap-2">
            {social.map((item, index) => (
              <a
                key={index}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block rounded-full bg-primary-100 px-2 py-0.5 text-xs text-primary-600 transition-colors duration-200 hover:bg-primary-200 dark:bg-primary-800 dark:text-primary-200 dark:hover:bg-primary-700"
              >
                {item.name}
              </a>
            ))}
          </div>
        )}
      </div>
      <div className="flex flex-wrap gap-x-4 gap-y-1">
        {contact.email && (
          <span className="flex items-center text-gray-600 dark:text-gray-300">
            <MdEmail className="mr-1 size-4 flex-shrink-0" />
            <a href={`mailto:${contact.email}`} className="hover:underline">
              {contact.email}
            </a>
          </span>
        )}
        {contact.phone && (
          <span className="flex items-center text-gray-600 dark:text-gray-300">
            <MdPhone className="mr-1 size-4 flex-shrink-0" />
            <a href={`tel:${contact.phone}`} className="hover:underline">
              {contact.phone}
            </a>
          </span>
        )}
        {contact.location && (
          <span className="flex items-center text-gray-600 dark:text-gray-300">
            <MdLocationOn className="mr-1 size-4 flex-shrink-0" />
            {contact.location}
          </span>
        )}
        {contact.address && (
          <span className="flex items-center text-gray-600 dark:text-gray-300">
            <MdHome className="mr-1 size-4 flex-shrink-0" />
            {contact.address}
          </span>
        )}
        {contact.skype && (
          <span className="flex items-center text-gray-600 dark:text-gray-300">
            <FaSkype className="mr-1 size-4 flex-shrink-0" />
            {contact.skype}
          </span>
        )}
      </div>
    </div>
  );
};

export default function ResumePage({ resumeData }: { resumeData: any }) {
  return (
    <PageLayout>
      <div className="">
        <div className="mb-6 flex flex-col items-center gap-6 md:flex-row">
          <div className="bl-none order-2 aspect-square min-w-[200px] max-w-[200px] overflow-hidden rounded-lg shadow-lg md:order-1 md:min-w-[150px] md:max-w-[150px] lg:mx-0 lg:max-w-[150px]">
            <CloudinaryImage
              src="luis-martinez-profile_cropped_rvybfc"
              alt="Luis Martinez Profile"
              width="150"
              height="150"
              priority
            />
          </div>
          <div className="order-1 md:order-2">
            <h1 className="mb-4 text-xl font-bold" id="resume">
              Resume
            </h1>
            <h2 className="mb-4 font-display text-4xl font-bold text-gray-700">
              {resumeData.fullName}
            </h2>
            <p className="text-lg text-gray-700">{resumeData.jobTitle}</p>
          </div>
        </div>
        <ContactInfo
          citizenship={resumeData.citizenship}
          social={resumeData.social}
          contact={resumeData.contact}
        />
        <Tabs.Provider defaultValue="about">
          <Tabs.List labelId="resume">
            <Tabs.Tab value="about">About</Tabs.Tab>
            <Tabs.Tab value="experience">Work</Tabs.Tab>
            <Tabs.Tab value="projects">Portfolio</Tabs.Tab>
            <Tabs.Tab value="skills">Skills</Tabs.Tab>
            <Tabs.Tab value="education">Education</Tabs.Tab>
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
