import { useNavigate, useParams } from "react-router-dom";
import { findMainCategory } from "../data/util/findMainCategory";
import CategoryMolecule from "../molecules/EventsMolecules/CategoryMolecule";
import { findCategoryNames } from "../data/util/findCategoryNames";
import { useCategories } from "../api/scheduleAPI";

const SubcategoryPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { mainCategoryId } = findMainCategory(id);
  const { mainCategoryName, subCategoryName } = findCategoryNames(
    mainCategoryId,
    id
  );

  const { data: customCategories = [] } = useCategories();

  const categoryColors = {
    1: "bg-[#FFC2F0]",
    2: "bg-[#CABDFF]",
    3: "bg-[#C7F7FF]",
    4: "bg-[#FFF7B2]",
    5: "bg-[#FFD6B2]",
  };

  return (
    <div>
      <div className="px-8 py-4 bg-white border-b rounded-b-lg shadow-lg">
        <div className="text-lg text-left font-semibold flex gap-4 ">
          <button onClick={() => navigate(-1)} className="text-gray-600 pr-6">
            &lt;
          </button>
          <div className="flex items-center justify-center">
            <span
              className={`w-4 h-4 rounded-full ${categoryColors[mainCategoryId]}`}
            />
          </div>
          {mainCategoryName} / {subCategoryName}
        </div>
      </div>
      <div className="px-8 py-4  bg-gray-50">
        <CategoryMolecule />
      </div>
    </div>
  );
};

export default SubcategoryPage;
