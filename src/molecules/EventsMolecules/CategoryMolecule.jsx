import React from "react";
import { useParams } from "react-router-dom";
import { useSubcategories } from "../../api/scheduleAPI";
import { convertKST } from "../../data/util/timeUtils";
import { findCategoryNames } from "../../data/util/findCategoryNames";

const CategoryMolecule = () => {
  const { id: subcategoryId } = useParams();
  const { data: subevents, isLoading, error } = useSubcategories(subcategoryId);

  if (!subevents || subevents.length === 0) return <p>데이터 없음</p>;

  const mainCategoryId = subevents[0]?.mainCategoryId;
  const { mainCategoryName, subCategoryName } = findCategoryNames(
    mainCategoryId,
    subcategoryId
  );

  return (
    <div>
      <div>
        <h1>
          {mainCategoryName} {subCategoryName}
        </h1>
      </div>
      <div>
        {subevents.map((subevent) => {
          const { date: kstDate, time: kstTime } = subevent.date
            ? convertKST(subevent.date)
            : { date: "없음", time: "없음" };

          return (
            <p key={subevent.id}>
              {subevent.title} - {kstDate} {kstTime}
            </p>
          );
        })}
      </div>
    </div>
  );
};

export default CategoryMolecule;
