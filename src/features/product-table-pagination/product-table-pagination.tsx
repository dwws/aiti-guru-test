import type { AppDispatch, RootState } from "@app/store";
import { setActivePage } from "@app/store/productTableSlice";
import { Pagination } from "@mantine/core";
import { useDispatch, useSelector } from "react-redux";
import classes from "./product-table-pagination.module.scss";

interface ProductTablePaginationProps {
  total: number;
  limit: number;
}

export const ProductTablePagination = ({
  total,
  limit,
}: ProductTablePaginationProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const activePage = useSelector(
    (state: RootState) => state.productTable.activePage,
  );
  const totalPages = Math.max(1, Math.ceil(total / limit));
  const start = total === 0 ? 0 : (activePage - 1) * limit + 1;
  const end = Math.min(activePage * limit, total);

  return (
    <div className={classes.paginationWrapper}>
      <div className={classes.itemCount}>
        Показано <span>{start === 0 ? "0-0" : `${start}-${end}`}</span> из{" "}
        <span>{total}</span>
      </div>

      <Pagination
        total={totalPages}
        value={activePage}
        onChange={(page) => dispatch(setActivePage(page))}
        color="#797FEA"
      />
    </div>
  );
};
