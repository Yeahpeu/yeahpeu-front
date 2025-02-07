import { useState } from "react";
import MyInputWhite from "../../components/common/MyInput-white";
import {
  useCreateScheduleMutation,
  useCategories,
} from "../../api/scheduleAPI";
import { convertUTC } from "../../data/util/timeUtils";
import { findCategoryNames } from "../../data/util/findCategoryNames";
import { useNavigate } from "react-router-dom";

const getFormattedDate = (date) => date.toISOString().split("T")[0];

const INITIAL_FORM_DATA = {
  title: "",
  date: getFormattedDate(new Date()), // 오늘 날짜로 초기화
  time: "",
  location: "",
  price: 0,
  mainCategoryId: 0,
  subcategoryId: 0,
};

const ScheduleInputMolecule = () => {
  const { mutate: createSchedule } = useCreateScheduleMutation();
  const { data: customCategories = [] } = useCategories();
  const navigate = useNavigate();

  const today = new Date();
  const minDateObj = new Date(today);
  minDateObj.setFullYear(today.getFullYear() - 1);
  const maxDateObj = new Date(today);
  maxDateObj.setFullYear(today.getFullYear() + 3);

  const [formData, setFormData] = useState(INITIAL_FORM_DATA);
  const [subCategories, setSubCategories] = useState([]);
  const [minDate] = useState(getFormattedDate(minDateObj));
  const [maxDate] = useState(getFormattedDate(maxDateObj));

  const handleSubmit = () => {
    const { title, date, time, mainCategoryId } = formData;

    if (!title || !date || !mainCategoryId) {
      console.log("제목, 일자, 메인 카테고리는 필수 입력");
      return;
    }

    const utcDateTime = convertUTC(date, time);
    const newSchedule = {
      ...formData,
      date: utcDateTime,
      price: Number(formData.price),
    };

    const categoryNames = findCategoryNames(
      formData.mainCategoryId,
      formData.subcategoryId
    );

    createSchedule(newSchedule, {
      onSuccess: () => {
        console.log(
          `일정 추가 성공: ${categoryNames.mainCategoryName} - ${categoryNames.subCategoryName}`
        );
        navigate(-1);
      },
      onError: (error) => {
        console.log("일정 추가 실패", error);
      },
    });
  };

  return (
    <div className="w-full mx-auto bg-white text-left mb-3">
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => navigate(-1)}
          className="text-gray-600 text-base"
        >
          &lt;
        </button>
        <h1 className="text-xl font-bold">일정 수립하기</h1>
        <button
          onClick={handleSubmit}
          className="text-red-200 text-sm text-center"
        >
          완료
        </button>
      </div>

      <hr className="mt-2 mb-4" />

      <div className="flex flex-col gap-6 ml-8">
        <div className="flex items-center gap-8">
          <label className="font-semibold text-black w-16">제 목</label>
          <MyInputWhite
            type="text"
            name="title"
            value={formData.title}
            onChange={(e) => {
              if (e.target.value.length <= 15) {
                setFormData({ ...formData, title: e.target.value });
              }
            }}
            className="border border-gray-300 rounded-md p-2 w-full"
            placeholder="15자 이하로 입력하세요"
            maxLength={15}
          />
        </div>

        <div className="flex items-center gap-8">
          <label className="font-semibold text-black w-16">일 자</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            min={minDate}
            max={maxDate}
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
            onChange={(e) => {
              if (e.target.value.length <= 30) {
                setFormData({ ...formData, location: e.target.value });
              }
            }}
            className="border border-gray-300 rounded-md p-2 w-full"
            placeholder="30자 이하로 입력하세요"
            maxLength={30}
          />
        </div>

        <div className="flex items-center gap-8">
          <label className="font-semibold text-black w-16">예 산</label>
          <MyInputWhite
            type="number"
            name="price"
            value={formData.price === 0 ? "" : formData.price}
            onChange={(e) => {
              const value = Number(e.target.value);
              if (!isNaN(value) && value >= 0 && value <= 999999999) {
                setFormData({ ...formData, price: value });
              }
            }}
            className="border border-gray-300 rounded-md p-2 w-full"
            min={0}
            max={999999999}
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
                  subcategoryId: 0,
                })
              }
              className="border border-gray-300 rounded-md p-2 w-1/2"
            >
              <option value={0}>주제</option>
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
                setFormData({
                  ...formData,
                  subcategoryId: Number(e.target.value),
                })
              }
              className="border border-gray-300 rounded-md p-2 w-1/2"
              disabled={!formData.mainCategoryId}
            >
              <option value={0}>세부</option>
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

export default ScheduleInputMolecule;
