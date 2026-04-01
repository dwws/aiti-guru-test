import type { AppDispatch, RootState } from "@app/store";
import {
  type ProductSortField,
  type ProductSortOrder,
  setSorting,
} from "@app/store/productTableSlice";
import { Button, Checkbox, Table } from "@mantine/core";
import type { Product } from "@shared/types/products";
import { PriceText } from "@shared/ui/price-text";
import clsx from "clsx";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import classes from "./product-table.module.scss";

interface ProductTableProps {
  products: Product[];
}

export const ProductTable = ({ products }: ProductTableProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const { sortBy, order } = useSelector(
    (state: RootState) => state.productTable,
  );
  const [selectedRows, setSelectedRows] = useState<number[]>([]);

  const handleSort = (field: ProductSortField) => {
    const nextOrder: ProductSortOrder =
      sortBy === field ? (order === "asc" ? "desc" : "asc") : "asc";

    dispatch(
      setSorting({
        sortBy: field,
        order: nextOrder,
      }),
    );
  };

  const renderSortableHeader = (
    label: string,
    field: ProductSortField,
    alignCenter = false,
  ) => {
    const isActive = sortBy === field;

    return (
      <button
        type="button"
        className={clsx(
          classes.sortButton,
          classes.th,
          alignCenter && classes.sortButtonCenter,
          isActive && classes.sortButtonActive,
        )}
        onClick={() => handleSort(field)}
      >
        <span>{label}</span>
        <img
          src="/sorting-icon.svg"
          alt=""
          className={clsx(
            classes.sortIcon,
            isActive && classes.sortIconActive,
            isActive && order === "asc" && classes.sortIconAsc,
          )}
        />
      </button>
    );
  };

  const rows = products.map((product) => (
    <Table.Tr key={product.id} className={classes.row}>
      <Table.Td
        className={clsx(
          selectedRows.includes(product.id) && classes.selectedRow,
        )}
      >
        <Checkbox
          iconColor="#3c538e"
          aria-label="Select row"
          checked={selectedRows.includes(product.id)}
          onChange={(event) =>
            setSelectedRows(
              event.currentTarget.checked
                ? [...selectedRows, product.id]
                : selectedRows.filter((id) => id !== product.id),
            )
          }
          color="#3c538e"
        />
      </Table.Td>

      <Table.Td className={classes.name}>
        <img
          width={48}
          height={48}
          src={product.thumbnail}
          alt={product.title}
        />
        <div className={classes.nameWrapper}>
          <div className={classes.title}>{product.title}</div>
          <div className={classes.category}>{product.category}</div>
        </div>
      </Table.Td>

      <Table.Td className={classes.brand}>{product.brand}</Table.Td>
      <Table.Td className={classes.td}>{product.sku}</Table.Td>

      <Table.Td className={classes.td}>
        <span className={clsx(product.rating < 3.5 && classes.badRating)}>
          {product.rating}
        </span>
        /5
      </Table.Td>

      <Table.Td className={classes.td}>
        <PriceText value={product.price} />
      </Table.Td>

      <Table.Td>
        <div className={classes.actions}>
          <Button color="#242edb" radius={23} size="xs">
            <img width={24} height={24} src="/plus-icon.svg" alt="add icon" />
          </Button>
          <Button variant="subtle" size="xs" className={classes.moreButton}>
            <img
              width={26}
              height={26}
              src="/dots-three-circle-icon.svg"
              alt="more icon"
            />
          </Button>
        </div>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <div className={classes.tableScroller}>
      <Table className={classes.table}>
        <colgroup>
          <col className={classes.selectColumn} />
          <col className={classes.nameColumn} />
          <col className={classes.brandColumn} />
          <col className={classes.skuColumn} />
          <col className={classes.ratingColumn} />
          <col className={classes.priceColumn} />
          <col className={classes.actionsColumn} />
        </colgroup>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>
              <Checkbox
                iconColor="#3c538e"
                aria-label="Select row"
                color="#3c538e"
              />
            </Table.Th>
            <Table.Th>{renderSortableHeader("Наименование", "title")}</Table.Th>
            <Table.Th className={clsx(classes.th, classes.thCenter)}>
              Вендор
            </Table.Th>
            <Table.Th className={clsx(classes.th, classes.thCenter)}>
              Артикул
            </Table.Th>
            <Table.Th>
              {renderSortableHeader("Оценка", "rating", true)}
            </Table.Th>
            <Table.Th>
              {renderSortableHeader("Цена, ₽", "price", true)}
            </Table.Th>
            <Table.Th></Table.Th>
          </Table.Tr>
        </Table.Thead>

        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </div>
  );
};
