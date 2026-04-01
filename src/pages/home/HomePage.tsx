import type { RootState } from "@app/store";
import { useGetProductsQuery } from "@app/store/productsApi";
import { AddProductButton } from "@features/add-product";
import { ProductTable } from "@features/product-table";
import { ProductTablePagination } from "@features/product-table-pagination";
import { RefreshProductsButton } from "@features/refresh-products";
import { SearchProductsInput } from "@features/search-products";
import { Alert, Container } from "@mantine/core";
import { LoadingProgress } from "@shared/ui/loading-progress";
import { useSelector } from "react-redux";
import classes from "./HomePage.module.scss";

const LIMIT = 10;

export default function HomePage() {
  const { sortBy, order, activePage, searchQuery } = useSelector(
    (state: RootState) => state.productTable,
  );
  const skip = (activePage - 1) * LIMIT;

  const { data, isFetching, error } = useGetProductsQuery({
    limit: LIMIT,
    skip,
    q: searchQuery.trim() || undefined,
    sortBy: sortBy ?? undefined,
    order: sortBy ? order : undefined,
  });

  if (error) {
    return (
      <Alert color="red" title="Ошибка">
        Не удалось загрузить данные. Пожалуйста, попробуйте позже.
      </Alert>
    );
  }

  return (
    <div className={classes.page}>
      <section className={classes.topSection}>
        <Container size="lg" py="md">
          <div className={classes.topBar}>
            <h1 className={classes.pageTitle}>Товары</h1>
            <SearchProductsInput />
          </div>
        </Container>
      </section>

      <section className={classes.contentSection}>
        <Container size="lg" py="md">
          <div className={classes.content}>
            <div className={classes.sectionHeader}>
              <h2 className={classes.sectionTitle}>Все позиции</h2>

              <div className={classes.actions}>
                <RefreshProductsButton />
                <AddProductButton />
              </div>
            </div>

            <div className={classes.tableBlock}>
              <LoadingProgress visible={isFetching} />
              <ProductTable products={data?.products ?? []} />
              <ProductTablePagination total={data?.total ?? 0} limit={LIMIT} />
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
