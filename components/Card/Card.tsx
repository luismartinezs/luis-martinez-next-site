import { FC } from "react";

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
    <div className="h-[300px] w-[300px] rounded-xl overflow-hidden m-2 relative drop-shadow-lg hover:scale-[1.02] transition ease-in-out">
      <img
        src={mockImg[1]}
        className="absolute object-cover w-full h-full"
        alt=""
      />
      <div
        className="absolute object-cover w-full h-full"
        style={{
          background: styles.background,
        }}
      ></div>
      <div className="relative flex flex-col justify-between w-full h-full p-5">
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
      </div>
    </div>
  );
};

export default Card;
