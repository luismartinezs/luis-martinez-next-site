import PillList from "components/PillList";
import SectionWrapper from "components/SectionWrapper";
import SimpleList from "components/SimpleList";
import Star from "components/Star";
import { sortByStar } from "lib/util";
import { useState } from "react";
import { MdExpandLess, MdExpandMore } from "react-icons/md";
import { Heading } from "./Heading";

const { H3, H4 } = Heading;

function Job({
  job,
  isDisclosure,
  maxResponsibilities = 3,
  maxSkills = 5,
}: {
  job: any;
  isDisclosure?: boolean;
  maxResponsibilities?: number; // set to zero to show all
  maxSkills?: number; // set to zero to show all
}) {
  const [isExpanded, setIsExpanded] = useState(isDisclosure ? false : true);
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
    star,
  } = job;

  const responsibilitiesToDisplay =
    maxResponsibilities === 0
      ? responsibilities
      : responsibilities.slice(0, maxResponsibilities);

  return (
    <div className="mb-6 border-b border-gray-200 pb-4 last:border-b-0 dark:border-gray-500">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-baseline">
            <span>{star && <Star />}</span>
            <H4>{position}</H4>
          </div>
          {title && <h5>{title}</h5>}
          <p className="my-1 italic !text-gray-500 dark:!text-gray-400">
            {company} {division ? `- ${division}` : ""}{" "}
            {dateStart && dateEnd && (
              <span className="!text-gray-500 dark:!text-gray-400">
                | {dateStart} - {dateEnd}
              </span>
            )}
          </p>
        </div>
        {isDisclosure && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-primary-600 hover:text-primary-700 focus:outline-none"
          >
            {isExpanded ? (
              <>
                <span className="sr-only">
                  Collapse {position} responsibilities
                </span>
                <MdExpandLess size={24} />
              </>
            ) : (
              <>
                <span className="sr-only">
                  Expand {position} responsibilities
                </span>
                <MdExpandMore size={24} />
              </>
            )}
          </button>
        )}
      </div>
      {(!isDisclosure || isExpanded) && (
        <div className="mt-4">
          <ul className="mt-2 list-disc pl-5">
            {responsibilitiesToDisplay.map((resp: string, idx: number) => (
              <li key={idx}>{resp}</li>
            ))}
          </ul>

          {industries && industries.length > 0 && (
            <div className="mb-2 text-[0.9rem]">
              <SimpleList label="Industries" items={industries} />
            </div>
          )}
        </div>
      )}
      {skills && skills.length > 0 && (
        <PillList items={skills} isToggleable maxItems={maxSkills} />
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
      {sortByStar(workExperience).map((job, index) => (
        <Job key={index} job={job} />
      ))}
    </SectionWrapper>
  );
}
