import { useScheduleStore } from "../../stores/scheduleStore";

export const findCategoryNames = (mainCategoryId, subcategoryId) => {
  const categories = useScheduleStore.getState().categories;
  const subcategoryIdNum = Number(subcategoryId);

  const category = categories.find((cat) => cat.id === mainCategoryId);

  if (!category) {
    return { mainCategoryName: "오류", subCategoryName: "오류" };
  }

  const subCategory = category.children.find(
    (option) => option.id === subcategoryIdNum
  );

  return {
    mainCategoryName: category.name,
    subCategoryName: subCategory ? subCategory.name : "기타",
  };
};
