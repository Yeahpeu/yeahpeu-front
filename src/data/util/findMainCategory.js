import { useScheduleStore } from "../../stores/scheduleStore";

export const findMainCategory = (subcategoryId) => {
  const categories = useScheduleStore.getState().categories;

  const subcategoryIdNum = Number(subcategoryId);

  const category = categories.find((cat) =>
    cat.children.some((child) => child.id === subcategoryIdNum)
  );

  return {
    mainCategoryId: category ? category.id : null,
  };
};
