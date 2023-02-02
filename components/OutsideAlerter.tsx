// Reference https://stackoverflow.com/questions/32553158/detect-click-outside-react-component

import {
  useRef,
  useEffect,
  type RefObject,
  type PropsWithChildren,
} from "react";

type IOutsideAlerterProps = PropsWithChildren<{
  className?: string;
  onClickOutside: () => void;
}>;

// reference https://stackoverflow.com/questions/71193818/react-onclick-argument-of-type-eventtarget-is-not-assignable-to-parameter-of-t
function assertIsNode(e: EventTarget | null): asserts e is Node {
  if (!e || !("nodeType" in e)) {
    throw new Error(`Node expected`);
  }
}

function useOutsideAlerter(
  ref: RefObject<HTMLDivElement>,
  onClickOutside: IOutsideAlerterProps["onClickOutside"]
) {
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      assertIsNode(event.target);
      if (ref.current && !ref.current.contains(event.target)) {
        onClickOutside();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, onClickOutside]);
}

const OutsideAlerter: React.FC<IOutsideAlerterProps> = ({
  className = "",
  children,
  onClickOutside = () => null,
}): JSX.Element => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  useOutsideAlerter(wrapperRef, onClickOutside);

  return (
    <div ref={wrapperRef} className={className}>
      {children}
    </div>
  );
};

export default OutsideAlerter;
