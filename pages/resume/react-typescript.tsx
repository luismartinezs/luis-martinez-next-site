import PageLayout from "components/PageLayout";
import { ResumeContent } from "features/resume";

export default function ResumePage({ resumeData }: { resumeData: any }) {
  return (
    <PageLayout>
      <ResumeContent
        resumeData={resumeData}
        filters={{
          skills: ["typescript", "react"],
        }}
      />
    </PageLayout>
  );
}

export async function getServerSideProps() {
  const res = await fetch(
    "https://raw.githubusercontent.com/luismartinezs/resume-json/main/json/react-typescript.json"
  );

  console.log(res.json());

  const resumeData = await res.json();

  return {
    props: {
      resumeData,
    },
  };
}
