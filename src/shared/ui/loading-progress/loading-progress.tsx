import { Progress } from "@mantine/core";
import clsx from "clsx";
import classes from "./loading-progress.module.scss";

interface LoadingProgressProps {
  visible: boolean;
}

export const LoadingProgress = ({ visible }: LoadingProgressProps) => {
  return (
    <div className={classes.slot}>
      <Progress
        value={100}
        striped
        animated
        color="#797FEA"
        size="sm"
        className={clsx(classes.progress, visible && classes.progressVisible)}
      />
    </div>
  );
};
