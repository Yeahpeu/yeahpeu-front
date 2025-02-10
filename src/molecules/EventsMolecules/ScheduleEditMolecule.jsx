import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import MyInputWhite from "../../components/common/MyInput-white";
import {
  useCategories,
  useScheduleDetail,
  useUpdateScheduleMutation,
} from "../../api/scheduleAPI";
import { convertUTC, convertKST } from "../../data/util/timeUtils";
import { useQueryClient } from "@tanstack/react-query";

const ScheduleEditMolecule = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { id } = useParams();
  const { data: event, isLoading, error } = useScheduleDetail(id);
  const { data: customCategories = [] } = useCategories();
  const updateScheduleMutation = useUpdateScheduleMutation();

  const [formData, setFormData] = useState({
    title: "",
    date: "",
    time: "",
    location: "",
    price: 0,
    mainCategoryId: "",
    subcategoryId: "",
  });
  const [subCategories, setSubCategories] = useState([]);

  // 초기 데이터 설정
  useEffect(() => {
    if (event && !formData.date) {
      const { date: initialDate, time: initialTime } = event.date
        ? convertKST(event.date)
        : { date: "", time: "" };

      const trimmedTitle = event.title.trimStart();
      const trimmedLocation = event.location.trimStart();

      setFormData({
        title: trimmedTitle || "",
        date: initialDate,
        time: initialTime,
        location: trimmedLocation || "",
        price: event.price || 0,
        mainCategoryId: event.mainCategoryId || "",
        subcategoryId: event.subcategoryId || "",
      });
    }
  }, [event, formData.date]);

  // 서브 카테고리 설정
  useEffect(() => {
    if (formData.mainCategoryId && customCategories.length > 0) {
      const selectedCategory = customCategories.find(
        (category) => Number(category.id) === Number(formData.mainCategoryId)
      );
      setSubCategories(selectedCategory ? selectedCategory.children : []);
    }
  }, [formData.mainCategoryId, customCategories]);

  // 수정된 데이터 저장
  const handleSubmit = () => {
    const utcDateTime = convertUTC(formData.date, formData.time);

    const trimmedTitle = formData.title.trimStart();
    const trimmedLocation = formData.location.trimStart();

    const updatedData = {
      ...formData,
      title: trimmedTitle,
      location: trimmedLocation,
      date: utcDateTime,
      price: Number(formData.price),
    };

    updateScheduleMutation.mutate(
      { id, updatedData },
      {
        onSuccess: () => {
          queryClient.invalidateQueries(["schedules"]);
          navigate(-1);
        },
        onError: (err) => {
          alert(
            `수정 실패: ${err.response?.data?.message || "알 수 없는 오류"}`
          );
        },
      }
    );
  };

  if (isLoading) return <div className="text-center">로딩 중...</div>;
  if (error)
    return (
      <div className="text-center text-red-500">오류 발생: {error.message}</div>
    );

  return (
    <div className="w-full mx-auto bg-white text-left mb-3">
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => navigate(-1)}
          className="text-gray-600 text-base"
        >
          &lt;
        </button>
        <h1 className="text-xl font-bold">일정 수정하기</h1>
        <button
          onClick={handleSubmit}
          className="text-red-200 text-sm text-center"
        >
          완료
        </button>
      </div>

      <hr className="mt-2 mb-4" />

      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-8">
          <label className="font-semibold text-black w-16">제 목</label>
          <MyInputWhite
            type="text"
            name="title"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            placeholder="제목"
            className="border border-gray-300 rounded-md p-2 w-full"
          />
        </div>

        <div className="flex items-center gap-8">
          <label className="font-semibold text-black w-16">일 자</label>
          <MyInputWhite
            type="date"
            name="date"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            className="border border-gray-300 rounded-md p-2 w-full"
          />
        </div>

        <div className="flex items-center gap-8">
          <label className="font-semibold text-black w-16">시 간</label>
          <MyInputWhite
            type="time"
            name="time"
            value={formData.time}
            onChange={(e) => setFormData({ ...formData, time: e.target.value })}
            className="border border-gray-300 rounded-md p-2 w-full"
          />
        </div>

        <div className="flex items-center gap-8">
          <label className="font-semibold text-black w-16">위 치</label>
          <MyInputWhite
            type="text"
            name="location"
            value={formData.location}
            onChange={(e) =>
              setFormData({ ...formData, location: e.target.value })
            }
            className="border border-gray-300 rounded-md p-2 w-full"
          />
        </div>

        <div className="flex items-center gap-8">
          <label className="font-semibold text-black w-16">예 산</label>
          <MyInputWhite
            type="number"
            name="price"
            value={formData.price}
            onChange={(e) =>
              setFormData({ ...formData, price: Number(e.target.value) })
            }
            className="border border-gray-300 rounded-md p-2 w-full"
          />
        </div>

        <div className="flex items-center gap-8">
          <label className="font-semibold text-black w-16">구 분</label>
          <div className="flex gap-2 w-full">
            <select
              name="mainCategoryId"
              value={formData.mainCategoryId}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  mainCategoryId: Number(e.target.value),
                  subcategoryId: "",
                })
              }
              className="border border-gray-300 rounded-md p-2 w-1/2"
            >
              <option value="">메인 카테고리</option>
              {customCategories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>

            <select
              name="subcategoryId"
              value={formData.subcategoryId}
              onChange={(e) =>
                setFormData({ ...formData, subcategoryId: e.target.value })
              }
              className="border border-gray-300 rounded-md p-2 w-1/2"
              disabled={!formData.mainCategoryId}
            >
              <option value="">서브 카테고리</option>
              {subCategories.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScheduleEditMolecule;
