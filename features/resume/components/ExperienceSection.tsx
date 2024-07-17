import PillList from "components/PillList";
import SectionWrapper from "components/SectionWrapper";
import SimpleList from "components/SimpleList";
import { useState } from "react";
import { MdExpandLess, MdExpandMore } from "react-icons/md";
import { Heading } from "./Heading";

const { H3, H4 } = Heading;

function Job({ job }: { job: any }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const {
    position,
    company,
    division,
    dateStart,
    dateEnd,
    responsibilities,
    skills,
    industries,
    title,
  } = job;

  return (
    <div className="mb-6 border-b border-gray-200 pb-4 last:border-b-0">
      <div className="flex items-center justify-between">
        <div>
          <H4>{position}</H4>
          {title && <h5>{title}</h5>}
          <p className="italic !text-gray-500 dark:!text-gray-400">
            {company} {division ? `- ${division}` : ""}{" "}
            {dateStart && dateEnd && (
              <span className="!text-gray-500 dark:!text-gray-400">
                | {dateStart} - {dateEnd}
              </span>
            )}
          </p>
        </div>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-primary-600 hover:text-primary-700 focus:outline-none"
        >
          {isExpanded ? <MdExpandLess size={24} /> : <MdExpandMore size={24} />}
        </button>
      </div>
      {isExpanded && (
        <div className="mt-4">
          <ul className="mt-2 list-disc pl-5">
            {responsibilities.map((resp: string, idx: number) => (
              <li key={idx}>{resp}</li>
            ))}
          </ul>
          {skills && skills.length > 0 && (
            <PillList items={skills} isToggleable />
          )}
          {industries && industries.length > 0 && (
            <SimpleList label="Industries" items={industries} />
          )}
        </div>
      )}
    </div>
  );
}

export function ExperienceSection({
  workExperience,
}: {
  workExperience: any[];
}) {
  return (
    <SectionWrapper className="prose">
      <H3>Work Experience</H3>
      {workExperience.map((job, index) => (
        <Job key={index} job={job} />
      ))}
    </SectionWrapper>
  );
}