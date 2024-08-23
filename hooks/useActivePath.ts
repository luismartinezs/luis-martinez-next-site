import { useRouter } from "next/router";
import { useEffect, useState } from "react";

/**
 * Custom hook that returns the current active path of the router.
 *
 * This hook utilizes the `useRouter` hook from Next.js to get the current
 * route's path (`asPath`) and maintains it in the state. The state is updated
 * whenever the `asPath` changes, providing the latest path to the component
 * that consumes this hook.
 *
 * It can be used to avoid hydration warnings when the active path is needed
 *
 * @returns {string} The current active path of the router.
 */
export function useActivePath() {
  const router = useRouter();
  const [activePath, setActivePath] = useState<string>("");

  useEffect(() => {
    setActivePath(router.asPath);
  }, [router.asPath]);

  return activePath;
}