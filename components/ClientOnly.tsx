import { PropsWithChildren } from "react";

import { useState, useEffect } from "react";

const ClientOnly = ({ children }: PropsWithChildren) => {
  const [shouldRender, setRenderState] = useState(false);
  useEffect(() => setRenderState(true), []);

  if (shouldRender) {
    return <>{children}</>;
  }

  return null;
};

export default ClientOnly;
