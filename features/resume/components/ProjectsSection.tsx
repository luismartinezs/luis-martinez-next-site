import PillList from "components/PillList";
import SectionWrapper from "components/SectionWrapper";
import { Heading } from "./Heading";

const { H3, H4 } = Heading;

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
      {skills && skills.length > 0 && <PillList isToggleable items={skills} />}
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
export { ProjectsSection };
