import { useNavigate, useParams } from "react-router-dom";
import { findMainCategory } from "../data/util/findMainCategory";
import CategoryMolecule from "../molecules/EventsMolecules/CategoryMolecule";
import { findCategoryNames } from "../data/util/findCategoryNames";

const SubcategoryPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { mainCategoryId } = findMainCategory(id);
  const { mainCategoryName, subCategoryName } = findCategoryNames(
    mainCategoryId,
    id
  );

  const categoryColors = {
    1: "bg-[#FF85EB]",
    2: "bg-[#AB92FF]",
    3: "bg-[#A6F2FF]",
    4: "bg-[#FFE748]",
    5: "bg-[#FF9447]",
  };

  return (
    <div className="p-8">
      <div className="text-lg text-left font-semibold flex gap-4">
        <button onClick={() => navigate(-1)} className="text-gray-600 pr-10">
          &lt;
        </button>
        {mainCategoryName} / {subCategoryName}
        <div className="flex items-center justify-center">
          <span
            className={`w-4 h-4 rounded-full ${categoryColors[mainCategoryId]}`}
          />
        </div>
      </div>
      <hr className="my-3" />
      <CategoryMolecule />
    </div>
  );
};

export default SubcategoryPage;
