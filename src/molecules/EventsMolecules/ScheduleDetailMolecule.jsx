import { useNavigate, useParams, Link } from "react-router-dom";
import MyEditButton from "../../components/common/MyEditButton";
import TaskDetailMolecule from "./TaskDetailMolecule";
import { findCategoryNames } from "../../data/util/findCategoryNames";
import { convertKST } from "../../data/util/timeUtils";
import {
  useScheduleDetail,
  useDeleteEvent,
  useCategories,
} from "../../api/scheduleAPI";
import MyConfirm from "../../components/Modals/MyConfirm";

import { useState } from "react";

const ScheduleDetailMolecule = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const { data: customCategories = [] } = useCategories();

  const { data: scheduleDetail, isLoading, isError } = useScheduleDetail(id);
  const { mutate: deleteEvent, isLoading: isDeleting } = useDeleteEvent();

  const [isConfirmVisible, setIsConfirmVisible] = useState(false);

  if (isLoading) {
    return <div>로딩 중...</div>;
  }

  if (isError || !scheduleDetail) {
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

  const handleDeleteClick = () => {
    setIsConfirmVisible(true);
  };

  const handleConfirmDelete = () => {
    deleteEvent(id, {
      onSuccess: () => {
        navigate(-1, { state: { refresh: true } });
      },
      onError: (error) => {
        alert("삭제 중 오류가 발생했습니다.");
      },
    });
    setIsConfirmVisible(false);
  };

  const handleCancel = () => {
    setIsConfirmVisible(false);
  };

  return (
    <div className="w-full mx-auto bg-white text-left">
      <div className="mb-8">
        <div className="flex items-center justify-between ">
          <button onClick={() => navigate(-1)} className="text-gray-600">
            &lt;
          </button>
          <h1 className="text-lg font-bold">
            {scheduleDetail.title || "제목 없음"}
          </h1>
          <MyEditButton
            onClick={() => navigate(`/schedule/todos/edit/${id}`)}
          />
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

        <div className="flex items-start my-8 gap-14 ml-8">
          <span className="font-semibold text-black whitespace-nowrap">
            위 치
          </span>
          <span
            className={`${
              scheduleDetail.location ? "text-black" : "text-gray-400"
            } flex-1 min-w-0 break-words`}
          >
            {scheduleDetail.location || "없음"}
          </span>
        </div>

        <div className="flex items-center my-8 gap-14 ml-8">
          <span className="font-semibold text-black">예 산</span>
          <span
            className={scheduleDetail.price ? "text-black" : "text-gray-400"}
          >
            {scheduleDetail.price && parseInt(scheduleDetail.price, 10) !== 0
              ? `${parseInt(scheduleDetail.price, 10).toLocaleString()}원`
              : "없음"}
          </span>
        </div>

        <div className="flex mb-8 gap-14 ml-8">
          <span className="flex font-semibold text-black content-start">
            주 제
          </span>
          <div>{mainCategoryName}</div>
        </div>

        <div className="flex mb-16 gap-14 ml-8">
          <span className="flex font-semibold text-black content-start">
            태 그
          </span>
          <div className="flex items-center gap-2">
            <Link
              to={`/schedule/todos/detail/sub/${scheduleDetail.subcategoryId}`}
              className="text-blue-500 underline"
            >
              {subCategoryName}
            </Link>
            <span>&gt;</span>
          </div>
        </div>
      </div>

      <div className="ml-8 ">
        <TaskDetailMolecule event={scheduleDetail} />
      </div>

      <div
        className={
          "w-full flex justify-center mt-14 text-red-300 absolube bottom-0"
        }
        onClick={!isDeleting ? handleDeleteClick : undefined}
      >
        {isDeleting ? "삭제 중..." : "삭제하기"}
      </div>

      <MyConfirm
        message="정말 삭제하시겠습니까?"
        onCancel={handleCancel}
        onConfirm={handleConfirmDelete}
        optionLeft="취소"
        optionRight="삭제"
        visible={isConfirmVisible}
      />
    </div>
  );
};

export default ScheduleDetailMolecule;
