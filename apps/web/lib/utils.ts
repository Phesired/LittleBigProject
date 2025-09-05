import { type ClassValue, clsx } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function generateRandomId(): string {
  return Math.random().toString(36).substr(2, 9);
}
