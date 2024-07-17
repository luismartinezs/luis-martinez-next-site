import PillList from "components/PillList";
import SectionWrapper from "components/SectionWrapper";
import Star from "components/Star";
import { sortByStar } from "lib/util";

interface Certification {
  star?: boolean;
  name: string;
  issuer: string;
  skills: string[];
  issueDate: string;
  expirationDate: string;
}

function CertificationsSection({
  certifications,
}: {
  certifications: Certification[];
}) {
  return (
    <SectionWrapper className="prose">
      <h3 className="mb-4 text-2xl font-bold text-gray-700">Certifications</h3>
      <div className="flex flex-col gap-6">
        {sortByStar(certifications).map(
          (
            { star, issuer, issueDate, name, expirationDate, skills },
            index
          ) => (
            <div
              key={index}
              className="border-b border-gray-200 pb-4 last:border-b-0"
            >
              <div className="flex items-baseline">
                <span>{star && <Star />}</span>
                <h4 className="mb-1 text-xl font-semibold text-gray-700">
                  {name}
                </h4>
              </div>
              <p className="mb-2 text-sm text-gray-600">
                <span className="font-medium">{issuer}</span> | {issueDate} -{" "}
                {expirationDate}
              </p>
              <PillList items={skills} />
            </div>
          )
        )}
      </div>
    </SectionWrapper>
  );
}

export { CertificationsSection };
