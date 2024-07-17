import { FaGithub, FaLinkedin, FaSkype } from "react-icons/fa";
import { MdEmail, MdHome, MdLocationOn, MdPhone } from "react-icons/md";
import { FaXTwitter } from "react-icons/fa6";
import { cn } from "lib/util";

const iconMap = {
  LinkedIn: FaLinkedin,
  GitHub: FaGithub,
  X: FaXTwitter,
};

const ContactInfo = ({
  citizenship,
  social,
  contact,
}: {
  citizenship: string;
  social: any[];
  contact: any;
}) => {
  return (
    <div className="max-w-4xl py-4 text-sm">
      <div className="mb-2 flex flex-wrap items-center gap-x-4 gap-y-2">
        {citizenship && (
          <span className="text-gray-600 dark:text-gray-300">
            <span className="text-gray-500 dark:text-gray-400">
              Citizenship
            </span>{" "}
            <span className="font-semibold">{citizenship}</span>
          </span>
        )}
        <span> - </span>
        {social && social.length > 0 && (
          <div className="flex flex-wrap items-center gap-2">
            {social.map((item, index) => {
              const Icon = iconMap.hasOwnProperty(item.name)
                ? iconMap[item.name as keyof typeof iconMap]
                : undefined;

              return (
                <a
                  key={index}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    Icon
                      ? "px-1 text-primary-600 dark:!text-primary-400"
                      : "inline-block rounded-full bg-primary-100 px-2 py-0.5 text-xs text-primary-600 transition-colors duration-200 hover:bg-primary-200 dark:bg-primary-800 dark:text-primary-200 dark:hover:bg-primary-700"
                  )}
                >
                  {Icon ? (
                    <Icon className="size-4 dark:!text-primary-400" />
                  ) : (
                    item.name
                  )}
                </a>
              );
            })}
          </div>
        )}
      </div>
      <div className="flex flex-wrap gap-x-4 gap-y-1">
        {contact.email && (
          <span className="flex items-center text-gray-600 dark:text-gray-300">
            <MdEmail className="mr-1 size-4 flex-shrink-0" />
            <a href={`mailto:${contact.email}`} className="hover:underline">
              {contact.email}
            </a>
          </span>
        )}
        {contact.phone && (
          <span className="flex items-center text-gray-600 dark:text-gray-300">
            <MdPhone className="mr-1 size-4 flex-shrink-0" />
            <a href={`tel:${contact.phone}`} className="hover:underline">
              {contact.phone}
            </a>
          </span>
        )}
        {contact.location && (
          <span className="flex items-center text-gray-600 dark:text-gray-300">
            <MdLocationOn className="mr-1 size-4 flex-shrink-0" />
            {contact.location}
          </span>
        )}
        {contact.address && (
          <span className="flex items-center text-gray-600 dark:text-gray-300">
            <MdHome className="mr-1 size-4 flex-shrink-0" />
            {contact.address}
          </span>
        )}
        {contact.skype && (
          <span className="flex items-center text-gray-600 dark:text-gray-300">
            <FaSkype className="mr-1 size-4 flex-shrink-0" />
            {contact.skype}
          </span>
        )}
      </div>
    </div>
  );
};

export { ContactInfo };
