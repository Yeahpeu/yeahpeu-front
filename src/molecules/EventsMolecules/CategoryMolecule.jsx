import React from "react";
import { useParams } from "react-router-dom";
import { useSubcategories } from "../../api/scheduleAPI";
import { convertKST } from "../../data/util/timeUtils";

const CategoryMolecule = () => {
  const { id } = useParams();
  const { data: subevents } = useSubcategories(id);

  const { date: kstDate, time: kstTime } = subevents.date
    ? convertKST(subevents.date)
    : { date: "없음", time: "없음" };

  return (
    <div>
      {subevents.map((subevent) => (
        <p key={subevent.id}>
          {subevent.title}
          {kstDate}
        </p>
      ))}
    </div>
  );
};

export default CategoryMolecule;
