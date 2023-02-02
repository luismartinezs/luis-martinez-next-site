import Image from "next/image";
import Link from "next/link";
import classnames from "classnames";

import { cloudinaryLoader, getThumbnailImgUrl } from "lib/image";
import CardOverlay from "components/CardOverlay";

import Styles from "./Card.module.scss";

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
    h-[300px]
    w-full
    max-w-[500px]
    rounded-xl
    overflow-hidden
    relative
    shadow-xl
    shadow-black/30
    transition
    ease-in-out
    hover:scale-[1.02]
    hover:shadow-2xl
    focus-within:ring-offset-2
    focus-within:ring-2
    focus-within:ring-primary-500
    focus-within:ring-offset-primary-100
    dark:shadow-primary-500/30
    dark:focus-within:ring-primary-300
    dark:focus-within:ring-offset-primary-900
    "
    >
      {imgUrl ? (
        <>
          <Image
            src={getThumbnailImgUrl(imgUrl)}
            className="absolute object-cover object-center w-full h-full"
            alt=""
            fill
            loader={cloudinaryLoader}
            {...imgProps}
          />
          <CardOverlay />
        </>
      ) : (
        <div className="absolute object-cover w-full h-full bg-black" />
      )}
      <Link
        href={href}
        className="relative flex flex-col justify-between w-full h-full p-5 hover:no-underline"
      >
        <h2
          className={classnames(
            "text-2xl text-white font-display",
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
