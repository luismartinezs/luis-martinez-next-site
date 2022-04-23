import { useState, useEffect } from "react";
import type { PropsWithChildren } from "types/types";

const ClientOnly: React.FC<PropsWithChildren> = ({ children }) => {
  const [shouldRender, setRenderState] = useState(false);
  useEffect(() => setRenderState(true), []);

  if (shouldRender) {
    return <>{children}</>;
  }

  return null;
};

export default ClientOnly;
