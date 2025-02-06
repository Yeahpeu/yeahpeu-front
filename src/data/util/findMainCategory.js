import { STEP_DATA, STEP_KEYS } from "../stepData";

export const findMainCategory = (subcategoryId) => {
  const subcategoryIdNum = Number(subcategoryId);

  for (const key of STEP_KEYS) {
    const category = STEP_DATA[key];
    const subCategory = category.options.find(
      (option) => option.id === subcategoryIdNum
    );

    if (subCategory) {
      return {
        mainCategoryId: category.id,
      };
    }
  }
  // 항상 객체 반환
  return { mainCategoryId: null };
};
