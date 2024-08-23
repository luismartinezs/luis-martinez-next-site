import PageLayout from "components/PageLayout";
import { ResumePrintContent } from "features/resume";
import Link from "next/link";

export default function ResumePage({ resumeData }: { resumeData: any }) {
  return (
    <PageLayout>
      <div className="flex w-full justify-end">
        <Link
          href="/resume/react-typescript"
          className="text-sm text-primary-500 hover:underline dark:text-primary-400"
        >
          Web optimized version
        </Link>
      </div>
      <ResumePrintContent resumeData={resumeData} />
    </PageLayout>
  );
}

export async function getServerSideProps() {
  const res = await fetch(
    "https://raw.githubusercontent.com/luismartinezs/resume-json/main/json/react-typescript.json"
  );

  const resumeData = await res.json();

  return {
    props: {
      resumeData,
    },
  };
}
