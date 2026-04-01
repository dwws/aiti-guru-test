import { Button, Modal, TextInput } from "@mantine/core";
import { useEffect, useState } from "react";
import classes from "./add-product-button.module.scss";

export const AddProductButton = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [brand, setBrand] = useState("");
  const [sku, setSku] = useState("");

  useEffect(() => {
    if (!showToast) {
      return;
    }

    const timer = window.setTimeout(() => {
      setShowToast(false);
    }, 2500);

    return () => window.clearTimeout(timer);
  }, [showToast]);

  const resetForm = () => {
    setTitle("");
    setPrice("");
    setBrand("");
    setSku("");
  };

  const closeCreateModal = () => {
    setIsCreateModalOpen(false);
    resetForm();
  };

  const isCreateDisabled =
    !title.trim() || !price.trim() || !brand.trim() || !sku.trim();

  const handleCreateProduct = () => {
    if (isCreateDisabled) {
      return;
    }

    closeCreateModal();
    setShowToast(true);
  };

  return (
    <>
      <Modal
        opened={isCreateModalOpen}
        onClose={closeCreateModal}
        title="Добавить товар"
        centered
        classNames={{
          title: classes.modalTitle,
          content: classes.modalContent,
        }}
      >
        <div className={classes.form}>
          <TextInput
            label="Наименование"
            placeholder="Введите название"
            value={title}
            onChange={(event) => setTitle(event.currentTarget.value)}
          />
          <TextInput
            label="Цена"
            placeholder="Введите цену"
            type="number"
            value={price}
            onChange={(event) => setPrice(event.currentTarget.value)}
          />
          <TextInput
            label="Вендор"
            placeholder="Введите вендора"
            value={brand}
            onChange={(event) => setBrand(event.currentTarget.value)}
          />
          <TextInput
            label="Артикул"
            placeholder="Введите артикул"
            value={sku}
            onChange={(event) => setSku(event.currentTarget.value)}
          />

          <div className={classes.formActions}>
            <Button variant="default" onClick={closeCreateModal}>
              Отмена
            </Button>
            <Button onClick={handleCreateProduct} disabled={isCreateDisabled}>
              Сохранить
            </Button>
          </div>
        </div>
      </Modal>

      {showToast && (
        <div className={classes.toast} role="status" aria-live="polite">
          Товар успешно добавлен
        </div>
      )}

      <Button
        className={classes.addButton}
        color="#242edb"
        radius={6}
        size="md"
        leftSection={
          <img
            src="/plus-circle-icon.svg"
            alt="Иконка добавления"
            height={22}
            width={22}
            className={classes.addIcon}
          />
        }
        onClick={() => setIsCreateModalOpen(true)}
      >
        <span>Добавить</span>
      </Button>
    </>
  );
};
