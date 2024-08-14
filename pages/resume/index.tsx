import PageLayout from "components/PageLayout";
import { ResumeContent } from "features/resume";
import Link from "next/link";

export default function ResumePage({ resumeData }: { resumeData: any }) {
  return (
    <PageLayout>
      <div className="flex w-full justify-end">
        <Link
          href="resume/print"
          className="text-sm text-primary-500 hover:underline dark:text-primary-400"
        >
          Print version
        </Link>
      </div>
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
