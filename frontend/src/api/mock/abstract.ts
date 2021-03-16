import { Random } from "mockjs";

const abstract = () => {
  return Array(Random.integer(1, 6))
    .fill(undefined)
    .map((value, index) => (index + 1).toString() + ". " + Random.csentence())
    .join("\n");
};

export default abstract;
