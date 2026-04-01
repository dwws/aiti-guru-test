import type { AppDispatch } from "@app/store";
import { resetTableState } from "@app/store/productTableSlice";
import { Button } from "@mantine/core";
import { useDispatch } from "react-redux";
import classes from "./refresh-products-button.module.scss";

export const RefreshProductsButton = () => {
  const dispatch = useDispatch<AppDispatch>();

  return (
    <Button
      size="md"
      variant="outline"
      className={classes.refreshButton}
      onClick={() => dispatch(resetTableState())}
      aria-label="Обновить таблицу"
    >
      <img
        src="/arrows-clockwise-icon.svg"
        alt="Иконка обновления"
        className={classes.refreshIcon}
      />
    </Button>
  );
};
