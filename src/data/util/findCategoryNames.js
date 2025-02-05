import { STEP_DATA, STEP_KEYS } from "../stepData"; // STEP_DATA 임포트

export const findCategoryNames = (mainCategoryId, subcategoryId) => {
  const subcategoryIdNum = Number(subcategoryId);

  for (const key of STEP_KEYS) {
    const category = STEP_DATA[key];
    if (category.id === mainCategoryId) {
      const subCategory = category.options.find(
        (option) => option.id === subcategoryIdNum
      );
      return {
        mainCategoryName: category.title,
        subCategoryName: subCategory ? subCategory.name : "기타",
      };
    }
  }
  return { mainCategoryName: "없음", subCategoryName: "없음" };
};
