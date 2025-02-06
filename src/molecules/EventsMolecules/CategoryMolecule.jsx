import React from "react";
import { useParams } from "react-router-dom";
import { useSubcategories } from "../../api/scheduleAPI";
import { convertKST } from "../../data/util/timeUtils";
import { findCategoryNames } from "../../data/util/findCategoryNames";
import MyCompleteButton from "../../components/common/MyCompleteButton";

const CategoryMolecule = () => {
  const { id: subcategoryId } = useParams();
  const { data: subevents, isLoading, error } = useSubcategories(subcategoryId);

  if (!subevents || subevents.length === 0) return <p>데이터 없음</p>;

  return (
    <div>
      <div>
        {subevents.map((subevent) => {
          const { date: kstDate, time: kstTime } = subevent.date
            ? convertKST(subevent.date)
            : { date: "없음", time: "없음" };

          return (
            <div key={subevent.id}>
              <div className="py-2 flex justify-between items-center">
                <span className="scale-75">
                  <MyCompleteButton isCompleted={subevent.completed} />
                </span>
                <span>{subevent.title}</span>
                <span>{kstDate}</span>
              </div>

              <hr className="border-dashed" />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CategoryMolecule;
