import { Progress } from "@nextui-org/react";

export const VarLoader = () => {
  return (
    <Progress
      color="success"
      size="sm"
      isIndeterminate
      aria-label="Loading..."
      className="max-w-md"
    />
  );
};
