import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function sortByStar<T>(arr: Array<{ star?: boolean } & T>): Array<{ star?: boolean } & T> {
  return arr.sort((a, b) => {
    if (a.star && !b.star) return -1;
    if (!a.star && b.star) return 1;
    return 0;
  });
}
