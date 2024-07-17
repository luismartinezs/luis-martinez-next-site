import SectionWrapper from "components/SectionWrapper";
import { Heading } from "./Heading";

const { H3, H4 } = Heading;

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

export { AboutSection };
