import PageLayout from "components/PageLayout";
import { ResumeContent } from "features/resume";

export default function ResumePage({ resumeData }: { resumeData: any }) {
  return (
    <PageLayout>
      <ResumeContent resumeData={resumeData} />
    </PageLayout>
  );
}

export async function getServerSideProps() {
  // Replace with your actual API URL
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
