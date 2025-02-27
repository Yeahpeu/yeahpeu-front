import React from "react";
import { useParams } from "react-router-dom";
import { useCategories, useSubcategories } from "../../api/scheduleAPI";
import { convertKST } from "../../data/util/timeUtils";
import MyCompleteButton from "../../components/common/MyCompleteButton";

const CategoryMolecule = () => {
  const { id: subcategoryId } = useParams();
  const { data: subevents, isLoading, error } = useSubcategories(subcategoryId);

  const { data: customCategories = [] } = useCategories();

  if (!subevents || subevents.length === 0)
    return (
      <div className="mt-10">
        <p>
          일정을 추가하여 <br /> 결혼 준비를 탄탄하게 만들어요
        </p>
      </div>
    );

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
                <span className="scale-75 mr-2">
                  <MyCompleteButton isCompleted={subevent.completed} />
                </span>
                <span className="flex-grow text-left truncate max-w-[14ch] overflow-hidden whitespace-nowrap">
                  {subevent.title}
                </span>

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
