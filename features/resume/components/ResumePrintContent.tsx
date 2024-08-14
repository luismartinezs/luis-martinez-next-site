import { sortByStar } from "lib/util";

const Section = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <div className="mb-6">
    <h2 className="mb-2 text-2xl font-bold ">{title}</h2>
    {children}
  </div>
);

function SkillList({ skills, max = 10 }: { skills: any[]; max?: number }) {
  if (skills && skills.length > 0) {
    const skillsToDisplay = max ? skills.slice(0, max) : skills;
    return (
      <p className="my-1 text-sm">
        Skills: {skillsToDisplay.join(", ")}
        {skills.length > max && ", ..."}
      </p>
    );
  }
  return null;
}

const Job = ({ job }: { job: any }) => {
  const {
    // position,
    company,
    // division,
    dateStart,
    dateEnd,
    responsibilities,
    skills,
    // industries,
    title,
    star,
  } = job;
  return (
    <div className="mb-4">
      <p className="text-xl font-semibold">
        {star && <span className="mr-1">★</span>}
        {title}
      </p>
      <p className="italic">{company}</p>
      {dateStart && dateEnd && (
        <p className="text-sm">
          {dateStart} - {dateEnd}
        </p>
      )}
      <ul className="mt-1 list-inside list-disc">
        {responsibilities.map((resp: string, index: number) => (
          <li key={index} className="text-sm">
            {resp}
          </li>
        ))}
      </ul>
      <SkillList skills={skills} />
    </div>
  );
};

function Contact({
  contact,
  social,
}: {
  contact: {
    email: string;
    location: string;
    skype: string;
  };
  social: any[];
}) {
  const { email, location, skype } = contact;
  return (
    <Section title="Contact">
      <p>
        Email:{" "}
        <a
          href={`mailto:${email}`}
          className="text-primary-600 underline hover:text-primary-700"
        >
          {email}
        </a>
      </p>
      <p>Skype: {skype}</p>
      {social &&
        social.length > 0 &&
        social.map((item, index) => {
          return (
            <p key={index}>
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-600 underline hover:text-primary-700"
              >
                {item.url}
              </a>
            </p>
          );
        })}
    </Section>
  );
}

function Experience({ experience }: { experience: any[] }) {
  return (
    <Section title="Experience">
      {sortByStar(experience).map((job, index) => (
        <Job key={index} job={job} />
      ))}
    </Section>
  );
}

function Project({ project }: { project: any }) {
  const { name, type, url, description, skills, repositoryUrl, star } = project;

  return (
    <div className="mb-4">
      <p className="mb-1 text-xl font-semibold">
        {star && <span className="mr-1">★</span>}
        {name}
      </p>
      <p className="text-sm">{type} project</p>
      <p className="my-1">{description}</p>
      <SkillList skills={skills} />
      <div className="flex space-x-3">
        {url && (
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary-600 underline hover:text-primary-700"
          >
            View website
          </a>
        )}
        {repositoryUrl && (
          <a
            href={repositoryUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary-600 underline hover:text-primary-700"
          >
            View repo
          </a>
        )}
      </div>
    </div>
  );
}

function Projects({ projects }: { projects: any[] }) {
  return (
    <Section title="Projects">
      {sortByStar(projects).map((project, index) => (
        <Project key={index} project={project} />
      ))}
    </Section>
  );
}

function Certifications({ certifications }: { certifications: any[] }) {
  return (
    <Section title="Certifications">
      <div>
        {sortByStar(certifications).map(
          (
            { star, issuer, issueDate, name, expirationDate, skills },
            index
          ) => (
            <div key={index} className="mb-3">
              <p className="mb-1 text-xl font-semibold">
                {star && <span className="mr-1">★</span>}
                {name}
              </p>
              <p className="mb-2 text-sm ">
                <span className="font-medium">{issuer}</span> | {issueDate} -{" "}
                {expirationDate}
              </p>
              <SkillList skills={skills} />
            </div>
          )
        )}
      </div>
    </Section>
  );
}

export const ResumePrintContent = ({ resumeData }: { resumeData: any }) => {
  const {
    fullName,
    jobTitle,
    // citizenship,
    social,
    contact,
    about,
    mostAmazingDevelopment,
    certifications,
    skills,
    education,
    preferredEnvironment,
    languages,
  } = resumeData;
  return (
    <div className="mx-auto max-w-4xl p-8 dark:text-white">
      <h1 className="mb-2 text-4xl font-bold">{fullName}</h1>
      <p className="mb-4 text-xl font-semibold">{jobTitle}</p>

      <Section title="About">
        <p>{about}</p>
      </Section>

      <Section title="Most amazing development">
        <p>{mostAmazingDevelopment}</p>
      </Section>

      <Section title="Preferred Environment">
        <p>{preferredEnvironment.join(", ")}</p>
      </Section>

      <Contact contact={contact} social={social} />

      <Experience experience={resumeData.workExperience} />

      <Projects projects={resumeData.projects} />

      <Section title="Key Skills">
        <ul className="list-inside list-disc">
          {skills
            .filter((skill: any) => !!skill.star)
            .map((skill: any, index: number) => (
              <li key={index}>
                {skill.name} ({skill.years}{" "}
                {skill.years === 1 ? "year" : "years"})
              </li>
            ))}
        </ul>
      </Section>

      <Certifications certifications={certifications} />

      <Section title="Education">
        {education.map((edu: any, index: number) => (
          <p key={index}>
            <strong>
              {edu.degree} in {edu.field}
            </strong>{" "}
            - {edu.institution}, {edu.location} ({edu.dateStart} - {edu.dateEnd}
            )
          </p>
        ))}
      </Section>

      <Section title="Languages">
        <ul className="list-inside list-disc">
          {languages.map((lang: any, index: number) => (
            <li key={index}>
              {lang.name} ({lang.level})
            </li>
          ))}
        </ul>
      </Section>
    </div>
  );
};
