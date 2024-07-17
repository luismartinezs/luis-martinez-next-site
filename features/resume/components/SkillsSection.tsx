import SectionWrapper from "components/SectionWrapper";
import { sortByStar } from "lib/util";
import { FaStar } from "react-icons/fa";
import { Heading } from "./Heading";

const { H3 } = Heading;

export function SkillsSection({
  skills,
  sort = true,
}: {
  skills: any[];
  sort?: boolean;
}) {
  const sortedSkills = sort
    ? sortByStar(skills)
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
