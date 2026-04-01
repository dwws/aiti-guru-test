import type { AppDispatch, RootState } from "@app/store";
import { setSearchInput, setSearchQuery } from "@app/store/productTableSlice";
import { TextInput } from "@mantine/core";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import classes from "./search-products-input.module.scss";

const DEBOUNCE_MS = 400;

export const SearchProductsInput = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { searchInput, searchQuery } = useSelector(
    (state: RootState) => state.productTable,
  );

  useEffect(() => {
    const timer = window.setTimeout(() => {
      if (searchInput === searchQuery) {
        return;
      }

      dispatch(setSearchQuery(searchInput));
    }, DEBOUNCE_MS);

    return () => window.clearTimeout(timer);
  }, [dispatch, searchInput, searchQuery]);

  return (
    <TextInput
      placeholder="Найти"
      leftSection={
        <img
          src="/search-icon.svg"
          alt="Иконка поиска"
          className={classes.searchIcon}
          width={24}
          height={24}
        />
      }
      value={searchInput}
      onChange={(event) => dispatch(setSearchInput(event.currentTarget.value))}
      className={classes.searchBox}
      classNames={{
        input: classes.searchInput,
        section: classes.searchSection,
      }}
    />
  );
};
