import PillList from "components/PillList";
import SectionWrapper from "components/SectionWrapper";

interface Certification {
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
        {certifications.map((cert, index) => (
          <div
            key={index}
            className="border-b border-gray-200 pb-4 last:border-b-0"
          >
            <h4 className="mb-1 text-xl font-semibold text-gray-700">
              {cert.name}
            </h4>
            <p className="mb-2 text-sm text-gray-600">
              <span className="font-medium">{cert.issuer}</span> |{" "}
              {cert.issueDate} - {cert.expirationDate}
            </p>
            <PillList items={cert.skills} />
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}

export { CertificationsSection };
