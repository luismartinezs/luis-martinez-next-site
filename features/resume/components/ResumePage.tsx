import Tabs from "components/Tabs";
import {
  AboutSection,
  CertificationsSection,
  ContactInfo,
  EducationSection,
  ExperienceSection,
  HeaderSection,
  ProjectsSection,
  SkillsSection,
} from "features/resume";

export function ResumePage({ resumeData }: { resumeData: any }) {
  return (
    <div>
      <HeaderSection
        fullName={resumeData.fullName}
        jobTitle={resumeData.jobTitle}
      />
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
