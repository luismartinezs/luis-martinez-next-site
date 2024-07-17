import SectionWrapper from "components/SectionWrapper";
import { Heading } from "./Heading";

const { H3, H4 } = Heading;

export function EducationSection({ education }: { education: any[] }) {
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
