import CloudinaryImage from "components/CloudinaryImage";
import Tabs from "components/Tabs";
import {
  AboutSection,
  CertificationsSection,
  ContactInfo,
  EducationSection,
  ExperienceSection,
  ProjectsSection,
  SkillsSection,
} from "features/resume";

interface Filters {
  skills: Array<string>;
}

export function ResumePage({
  resumeData,
  filters,
}: {
  resumeData: any;
  filters?: Filters;
}) {
  return (
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
          <Tabs.Tab value="certifications">Certifications</Tabs.Tab>
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
        <Tabs.Panel value="certifications">
          <CertificationsSection certifications={resumeData.certifications} />
        </Tabs.Panel>
      </Tabs.Provider>
    </div>
  );
}
