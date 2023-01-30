import { FC } from "react";
import Image from "next/image";
import Link from "next/link";

const styles = {
  textShadow: "0 0 4px rgba(0,0,0,0.8), 0 0 6px rgba(0,0,0,0.6)",
  background:
    "linear-gradient(180deg, rgba(0, 0, 0, 0.63) 0%, rgba(0, 0, 0, 0.29) 42.19%, rgba(0, 0, 0, 0) 54.69%, rgba(0, 0, 0, 0) 90.62%, rgba(0, 0, 0, 0.33) 100%);",
};

const mockImg = [
  "https://cdn.midjourney.com/8981dc16-452b-40df-bc4b-87f215d477d1/grid_0.png",
  "https://cdn.midjourney.com/d4279d5d-a986-4ff4-8563-fb2ffe6e95ae/grid_0.png",
];

const Card: FC = (): JSX.Element => {
  return (
    <div
      className="
    h-[300px]
    w-[300px]
    rounded-xl
    overflow-hidden
    m-2
    relative
    shadow
    shadow-black/30
    transition
    ease-in-out
    hover:scale-[1.02]
    hover:shadow-lg
    focus-within:ring-offset-2
    focus-within:ring-2
    focus-within:ring-primary-500
    focus-within:ring-offset-primary-100
    dark:shadow-primary-500/30
    dark:focus-within:ring-primary-300
    dark:focus-within:ring-offset-primary-900
    "
    >
      <Image
        src={mockImg[1]}
        className="absolute object-cover object-center w-full h-full"
        alt=""
        fill
      />
      <div
        className="absolute object-cover w-full h-full"
        style={{
          background: styles.background,
        }}
      ></div>
      <Link
        href="#"
        className="relative flex flex-col justify-between w-full h-full p-5 hover:no-underline"
      >
        <h2
          className="text-3xl text-white font-display"
          style={{
            textShadow: styles.textShadow,
          }}
        >
          Building the Flatten Type with Typescript
        </h2>
        <span
          className="text-right text-white"
          style={{
            textShadow: styles.textShadow,
          }}
        >
          2023-01-01
        </span>
      </Link>
    </div>
  );
};

export default Card;
