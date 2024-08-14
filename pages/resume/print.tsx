import PageLayout from "components/PageLayout";
import { ResumePrintContent } from "features/resume";

export default function ResumePage({ resumeData }: { resumeData: any }) {
  return (
    <PageLayout>
      <ResumePrintContent resumeData={resumeData} />
    </PageLayout>
  );
}

export async function getServerSideProps() {
  const res = await fetch(
    "https://raw.githubusercontent.com/luismartinezs/resume-json/main/json/resume.json"
  );

  const resumeData = await res.json();

  return {
    props: {
      resumeData,
    },
  };
}
