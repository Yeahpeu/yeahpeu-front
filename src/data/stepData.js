export const transformCategories = (categories) => {
  const transformedData = {};

  categories.forEach((category) => {
    transformedData[category.name] = {
      id: category.id,
      title: category.name,
      options: category.children.map((child) => ({
        id: child.id,
        parent_id: category.id,
        name: child.name,
      })),
    };
  });

  return transformedData;
};
