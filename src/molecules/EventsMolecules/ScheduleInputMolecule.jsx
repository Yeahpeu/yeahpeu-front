import { useState, useEffect } from "react";
import MyInputWhite from "../../components/common/MyInput-white";
import {
  useCreateScheduleMutation,
  useCategories,
} from "../../api/scheduleAPI";
import { convertUTC } from "../../data/util/timeUtils";
import { findCategoryNames } from "../../data/util/findCategoryNames";
import { useNavigate } from "react-router-dom";

const INITIAL_FORM_DATA = {
  title: "",
  date: "",
  time: "",
  location: "",
  price: 0,
  mainCategoryId: 0,
  subcategoryId: 0,
};

const ScheduleInputMolecule = ({ onCancel }) => {
  const { mutate: createSchedule } = useCreateScheduleMutation();
  const { data: customCategories = [] } = useCategories();

  const navigate = useNavigate();

  const [formData, setFormData] = useState(INITIAL_FORM_DATA);
  const [subCategories, setSubCategories] = useState([]);

  useEffect(() => {
    const selectedCategory = customCategories.find(
      (category) => Number(category.id) === Number(formData.mainCategoryId)
    );
    const newSubCategories = selectedCategory ? selectedCategory.children : [];

    setSubCategories((prev) => {
      const isEqual = JSON.stringify(prev) === JSON.stringify(newSubCategories);
      return isEqual ? prev : newSubCategories;
    });
  }, [formData.mainCategoryId, customCategories]);

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
        if (onCancel) onCancel();
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
          onClick={onCancel}
          className="text-gray-600 mr-2 text-base w-12"
        >
          &lt;
        </button>
        <MyInputWhite
          type="text"
          name="title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
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
                  subcategoryId: 0,
                })
              }
              className="border border-gray-300 rounded-md p-2 w-1/2"
            >
              <option value={0}>선택하세요</option>
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
              <option value={0}>선택하세요</option>
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
