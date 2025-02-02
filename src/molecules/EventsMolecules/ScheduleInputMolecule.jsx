import { useState, useEffect } from "react";
import MyInputWhite from "../../components/common/MyInput-white";
import {
  useCreateScheduleMutation,
  useCategories,
} from "../../api/scheduleAPI";
import { convertUTC } from "../../data/util/timeUtils";
import { STEP_DATA, STEP_KEYS } from "../../data/stepData";
import { findCategoryNames } from "../../data/util/findCategoryNames";

const INITIAL_FORM_DATA = {
  title: "",
  date: "",
  time: "",
  location: "",
  price: null,
  mainCategoryId: null,
  subCategoryId: null,
};

const ScheduleInputMolecule = ({ onCancel }) => {
  const { mutate: createSchedule } = useCreateScheduleMutation();
  const { data: customCategories = [] } = useCategories();

  const [formData, setFormData] = useState(INITIAL_FORM_DATA);
  const [subCategories, setSubCategories] = useState([]);

  useEffect(() => {
    const selectedCategory = customCategories.find(
      (category) => Number(category.id) === Number(formData.mainCategoryId)
    );
    setSubCategories(selectedCategory ? selectedCategory.children : []);
  }, [formData.mainCategoryId, customCategories]);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    const parsedValue = type === "number" ? Number(value) : value;

    setFormData((prev) => ({
      ...prev,
      [name]: name === "mainCategoryId" ? Number(parsedValue) : parsedValue,
      ...(name === "mainCategoryId" && { subCategoryId: null }), // 메인 카테고리 변경 시 서브 초기화
    }));
  };

  const handleSubmit = () => {
    if (!formData.title || !formData.date || !formData.mainCategoryId) {
      console.log("제목, 일자, 메인 카테고리는 필수 입력");
      return;
    }

    const utcDateTime = convertUTC(formData.date, formData.time);
    const newSchedule = {
      ...formData,
      date: utcDateTime,
    };

    // 카테고리 이름 찾기 (API ID 기준)
    const categoryNames = findCategoryNames(
      formData.mainCategoryId,
      formData.subCategoryId
    );

    createSchedule(newSchedule, {
      onSuccess: () => {
        console.log(
          `일정 추가 성공: ${categoryNames.mainCategoryName} - ${categoryNames.subCategoryName}`
        );
        if (onCancel) onCancel();
      },
      onError: () => {
        console.log("일정 추가 실패");
      },
    });
  };

  return (
    <div className="w-full mx-auto bg-white text-left mb-3">
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={onCancel}
          className="text-gray-600 mr-2 text-base w-12"
        >
          &lt;
        </button>
        <MyInputWhite
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="제목"
          className="border-gray-300 flex-grow mx-2"
        />
        <button
          onClick={handleSubmit}
          className="text-red-200 text-sm w-12 text-center m-2"
        >
          완료
        </button>
      </div>

      <hr className="mt-2 mb-4" />

      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-8">
          <label className="font-semibold text-black w-16">일 자</label>
          <MyInputWhite
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="border border-gray-300 rounded-md p-2 w-full"
          />
        </div>

        <div className="flex items-center gap-8">
          <label className="font-semibold text-black w-16">시 간</label>
          <MyInputWhite
            type="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            className="border border-gray-300 rounded-md p-2 w-full"
          />
        </div>

        <div className="flex items-center gap-8">
          <label className="font-semibold text-black w-16">위 치</label>
          <MyInputWhite
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="border border-gray-300 rounded-md p-2 w-full"
          />
        </div>

        <div className="flex items-center gap-8">
          <label className="font-semibold text-black w-16">예 산</label>
          <MyInputWhite
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="border border-gray-300 rounded-md p-2 w-full"
          />
        </div>

        <div className="flex items-center gap-8">
          <label className="font-semibold text-black w-16">구 분</label>
          <div className="flex gap-2 w-full">
            <select
              name="mainCategoryId"
              value={formData.mainCategoryId || ""}
              onChange={handleChange}
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
              name="subCategoryId"
              value={formData.subCategoryId || ""}
              onChange={handleChange}
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

export default ScheduleInputMolecule;
