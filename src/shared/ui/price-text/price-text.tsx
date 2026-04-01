import type { FC } from "react";
import classes from "./price-text.module.scss";

type PriceTextProps = {
  value: string | number;
};

function formatPriceParts(value: string | number) {
  const numericValue =
    typeof value === "number"
      ? value
      : Number(String(value).replace(/\s/g, "").replace(",", "."));

  if (Number.isNaN(numericValue)) {
    return {
      integer: "0",
      fraction: ",00",
    };
  }

  const formatted = numericValue.toLocaleString("ru-RU", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  const [integer, fraction = "00"] = formatted.split(",");

  return {
    integer,
    fraction: `,${fraction}`,
  };
}

export const PriceText: FC<PriceTextProps> = ({ value }) => {
  const { integer, fraction } = formatPriceParts(value);

  return (
    <span>
      <span>{integer}</span>
      <span className={classes.fraction}>{fraction}</span>
    </span>
  );
};
