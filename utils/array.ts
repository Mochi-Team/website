export {};

declare global {
  interface Array<T> {
    isEqual(other: Array<T>): boolean;
  }
}

Array.prototype.isEqual = function <T>(this: Array<T>, other: Array<T>) {
  if (this === other) return true;
  if (this == null || other == null) return false;
  if (this.length !== other.length) return false;

  for (let i = 0; i < this.length; i++) {
    if (this[i] !== other[i]) return false;
  }

  return true;
};
