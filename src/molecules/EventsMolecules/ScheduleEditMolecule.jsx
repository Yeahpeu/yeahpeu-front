import { useState, useEffect } from "react";
import MyInputWhite from "../../components/common/MyInput-white";
import { useCategories } from "../../api/scheduleAPI"; //  카테고리 API 추가
import { useScheduleStore } from "../../stores/scheduleStore";
import { convertUTC, convertKST } from "../../data/util/timeUtils";

const ScheduleEditMolecule = ({ event, onCancel }) => {
  const updateSchedule = useScheduleStore((state) => state.updateSchedule);
  const { data: customCategories = [] } = useCategories(); //  카테고리 데이터 호출

  const { date: initialDate, time: initialTime } = convertKST(event.date);

  const [formData, setFormData] = useState({
    title: event.title,
    date: initialDate,
    time: initialTime,
    location: event.location,
    price: event.price,
    mainCategoryId: event.mainCategoryId,
    subcategoryId: event.subcategoryId,
  });

  const [subCategories, setSubCategories] = useState([]);

  // 메인 카테고리 변경 시 서브 카테고리 업데이트
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
      ...(name === "mainCategoryId" && { subcategoryId: null }), // 메인 카테고리 변경 시 서브 초기화
    }));
  };

  const handleSubmit = () => {
    const utcDateTime = convertUTC(formData.date, formData.time);

    const updatedData = {
      ...formData,
      date: utcDateTime,
    };

    updateSchedule(event.id, updatedData);
    onCancel();
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
              name="subcategoryId"
              value={formData.subcategoryId || ""}
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

export default ScheduleEditMolecule;
