import PageLayout from "components/PageLayout";
import PrintButton from "components/PrintButton";
import { ResumePrintContent } from "features/resume";
import Link from "next/link";

export default function ResumePage({ resumeData }: { resumeData: any }) {
  return (
    <PageLayout>
      <div className="flex w-full items-center justify-end gap-4">
        <Link
          href="/resume"
          className="text-sm text-primary-500 hover:underline dark:text-primary-400"
        >
          Web optimized version
        </Link>
        <PrintButton
          printContentId="resumePrintContent"
          pdfTitle="Luis_Martinez_Resume"
        >
          Print Resume
        </PrintButton>
      </div>
      <div id="resumePrintContent">
        <ResumePrintContent resumeData={resumeData} />
      </div>
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
