import Image from "next/image";
import Link from "next/link";
import classnames from "classnames";

import { cloudinaryLoader, getThumbnailImgUrl } from "lib/image";
import CardOverlay from "components/CardOverlay";

import Styles from "./Card.module.css";

const Card = ({
  imgUrl,
  imgProps = {},
  title,
  footer,
  href,
}: {
  imgUrl: string;
  title: string;
  footer: string;
  href: string;
  imgProps: Omit<
    React.ComponentProps<typeof Image>,
    "src" | "alt" | "fill" | "loader"
  >;
}): JSX.Element => {
  return (
    <div
      className="
    relative
    h-[300px]
    w-full
    max-w-[500px]
    overflow-hidden
    rounded-xl
    shadow-xl
    shadow-black/30
    transition
    ease-in-out
    focus-within:ring-2
    focus-within:ring-primary-500
    focus-within:ring-offset-2
    focus-within:ring-offset-primary-100
    hover:scale-[1.02]
    hover:shadow-2xl
    dark:shadow-primary-500/30
    dark:focus-within:ring-primary-300
    dark:focus-within:ring-offset-primary-900
    "
    >
      {imgUrl ? (
        <>
          <Image
            src={getThumbnailImgUrl(imgUrl)}
            className="absolute h-full w-full object-cover object-center"
            alt=""
            fill
            loader={cloudinaryLoader}
            {...imgProps}
          />
          <CardOverlay />
        </>
      ) : (
        <div className="absolute h-full w-full bg-black object-cover" />
      )}
      <Link
        href={href}
        className="relative flex h-full w-full flex-col justify-between p-5 hover:no-underline"
      >
        <h2
          className={classnames(
            "font-display text-2xl text-white",
            Styles.textShadow
          )}
        >
          {title}
        </h2>
        <span
          className={classnames("text-right text-white", Styles.textShadow)}
        >
          {footer}
        </span>
      </Link>
    </div>
  );
};

export default Card;
