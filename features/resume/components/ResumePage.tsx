import { useEffect } from "react";
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

const tabs = [
  {
    label: "About",
    value: "about",
  },
  {
    label: "Experience",
    value: "experience",
  },
  {
    label: "Projects",
    value: "projects",
  },
  {
    label: "Skills",
    value: "skills",
  },
  {
    label: "Education",
    value: "education",
  },
  {
    label: "Certifications",
    value: "certifications",
  },
];

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
      <Tabs.Provider
        defaultValue="about"
        tabValues={tabs.map((tab) => tab.value)}
      >
        <Tabs.List labelId="resume">
          {tabs.map((tab) => (
            <Tabs.Tab key={tab.value} value={tab.value}>
              {tab.label}
            </Tabs.Tab>
          ))}
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
