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
import { useQueryClient } from "@tanstack/react-query";
import { useScheduleStore } from "../../stores/scheduleStore";
import MyLoading from "../../components/common/MyLoading";

const ScheduleDetailMolecule = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const queryClient = useQueryClient();
  const { deleteSchedule } = useScheduleStore();

  const { data: customCategories = [] } = useCategories();

  const { data: scheduleDetail, isLoading, isError } = useScheduleDetail(id);
  const { mutate: deleteEvent, isLoading: isDeleting } = useDeleteEvent();

  const [isConfirmVisible, setIsConfirmVisible] = useState(false);

  if (isLoading) {
    return (
      <div>
        <MyLoading />
      </div>
    );
  }

  if (isError || !scheduleDetail) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center space-y-4">
          <p className="text-red-200 text-xl font-semibold animate-bounce">
            스케줄을 찾을 수 없습니다.
          </p>
        </div>
      </div>
    );
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
      onSuccess: async () => {
        deleteSchedule(id);
        queryClient.invalidateQueries(["monthSchedules"]);
        queryClient.removeQueries(["schedule", id]);
        navigate(-1);
      },
    });
  };

  const handleCancel = () => {
    setIsConfirmVisible(false);
  };

  return (
    <div className="w-full mx-auto  text-left ">
      <div className="mb-8">
        <div className="flex items-center justify-between px-8 py-4 border-b shadow-sm bg-white rounded-b-lg">
          <button onClick={() => navigate(-1)} className="text-gray-600">
            &lt;
          </button>
          <h1 className="text-lg font-bold text-gray-700">
            {scheduleDetail.title || "제목 없음"}
          </h1>
          <MyEditButton
            onClick={() => navigate(`/schedule/todos/edit/${id}`)}
          />
        </div>
        <div className="px-8 py-4">
          <div className="flex items-center my-8 gap-14 ml-8">
            <span className="font-semibold text-gray-700">일 자</span>
            <span className="text-gray-700">{kstDate}</span>
          </div>
          <div className="flex items-center my-8 gap-14 ml-8">
            <span className="font-semibold text-gray-700">시 간</span>
            <span className="text-gray-700">{kstTime}</span>
          </div>
          <div className="flex items-start my-8 gap-14 ml-8">
            <span className="font-semibold text-gray-700 whitespace-nowrap">
              위 치
            </span>
            <span
              className={`${
                scheduleDetail.location ? "text-gray-700" : "text-gray-400"
              } flex-1 min-w-0 break-words`}
            >
              {scheduleDetail.location || "없음"}
            </span>
          </div>
          <div className="flex items-center my-8 gap-14 ml-8">
            <span className="font-semibold text-gray-700">예 산</span>
            <span
              className={
                scheduleDetail.price ? "text-gray-700" : "text-gray-400"
              }
            >
              {scheduleDetail.price && parseInt(scheduleDetail.price, 10) !== 0
                ? `${parseInt(scheduleDetail.price, 10).toLocaleString()}원`
                : "없음"}
            </span>
          </div>
          <div className="flex mb-8 gap-14 ml-8">
            <span className="flex font-semibold text-gray-700 content-start">
              주 제
            </span>
            <div className="text-gray-700">{mainCategoryName}</div>
          </div>
          <div className="flex mb-16 gap-14 ml-8">
            <span className="flex font-semibold text-gray-700 content-start">
              태 그
            </span>
            <div className="flex items-center gap-2">
              <Link
                to={`/schedule/todos/detail/sub/${scheduleDetail.subcategoryId}`}
                className="text-blue-300 "
              >
                {subCategoryName}
              </Link>
              <span className="text-blue-300 ">&gt;</span>
            </div>
          </div>
          <div className="ml-8">
            <TaskDetailMolecule event={scheduleDetail} />
          </div>{" "}
        </div>

        <div
          className={
            "w-full flex justify-center text-red-300 absolube bottom-0"
          }
          onClick={!isDeleting ? handleDeleteClick : undefined}
        >
          {isDeleting ? "삭제 중..." : "일정 삭제"}
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
    </div>
  );
};

export default ScheduleDetailMolecule;
