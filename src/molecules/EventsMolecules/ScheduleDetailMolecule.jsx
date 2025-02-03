import { useNavigate, useParams } from "react-router-dom";
import MyEditButton from "../../components/common/MyEditButton";
import TaskDetailMolecule from "./TaskDetailMolecule";
import { findCategoryNames } from "../../data/util/findCategoryNames";
import { convertKST } from "../../data/util/timeUtils";
import { useScheduleDetail } from "../../api/scheduleAPI";

const ScheduleDetailMolecule = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data: scheduleDetail, isLoading, error } = useScheduleDetail(id);

  if (isLoading) {
    return <div>로딩 중...</div>;
  }

  if (error || !scheduleDetail) {
    return <div>스케줄 정보를 불러올 수 없습니다.</div>;
  }

  const { mainCategoryName, subCategoryName } = scheduleDetail.mainCategoryId
    ? findCategoryNames(
        scheduleDetail.mainCategoryId,
        scheduleDetail.subcategoryId
      )
    : { mainCategoryName: "없음", subCategoryName: "없음" };

  const { date: kstDate, time: kstTime } = scheduleDetail.date
    ? convertKST(scheduleDetail.date)
    : { date: "없음", time: "없음" };

  return (
    <div className="w-full mx-auto bg-white text-left mb-8">
      <div className="flex items-center justify-between ">
        <button onClick={() => navigate(-1)} className="text-gray-600 p-2 mr-4">
          &lt;
        </button>
        <h1 className="text-xl font-bold mr-4">
          {scheduleDetail.title || "제목 없음"}
        </h1>
        <MyEditButton onClick={() => navigate(`/schedule/todos/edit/${id}`)} />
      </div>
      <hr className="mt-3 mb-5 my-2" />

      <div className="flex items-center my-8 gap-14 ml-8">
        <span className="font-semibold text-black">일 자</span>
        <span>{kstDate}</span>
      </div>

      <div className="flex items-center my-8 gap-14 ml-8">
        <span className="font-semibold text-black">시 간</span>
        <span>{kstTime}</span>
      </div>

      <div className="flex items-center my-8 gap-14 ml-8">
        <span className="font-semibold text-black">위 치</span>
        <span
          className={scheduleDetail.location ? "text-black" : "text-gray-400"}
        >
          {scheduleDetail.location || "없음"}
        </span>
      </div>

      <div className="flex items-center my-8 gap-14 ml-8">
        <span className="font-semibold text-black">예 산</span>
        <span className={scheduleDetail.price ? "text-black" : "text-gray-400"}>
          {scheduleDetail.price && parseInt(scheduleDetail.price, 10) !== 0
            ? `${parseInt(scheduleDetail.price, 10).toLocaleString()}원`
            : "없음"}
        </span>
      </div>

      <div className="flex items-center mb-16 gap-14 ml-8">
        <span className="font-semibold text-black">구 분</span>
        <div className="flex items-center gap-12">
          <span>{mainCategoryName}</span>
          <span>{subCategoryName}</span>
        </div>
      </div>

      <div className="mt-12">
        <TaskDetailMolecule event={scheduleDetail} />
      </div>
    </div>
  );
};

export default ScheduleDetailMolecule;
