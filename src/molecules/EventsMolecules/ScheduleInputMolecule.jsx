import { useState, useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import MyInputWhite from "../../components/common/MyInput-white";
import {
  useCreateScheduleMutation,
  useCategories,
} from "../../api/scheduleAPI";
import { convertUTC } from "../../data/util/timeUtils";
import { findCategoryNames } from "../../data/util/findCategoryNames";
import { useLocation, useNavigate } from "react-router-dom"; // useLocation 추가
import MyAlert from "../../components/Modals/MyAlert";
import CuteCalendarPopup from "../../components/common/CuteCalendarPopup";
import CuteTimeSelect from "../../components/common/CuteTimePopup";

// 오늘 날짜를 KST 기준으로 포맷팅
const getFormattedDate = (date) => {
  const kstOffset = 9 * 60 * 60 * 1000;
  const kstDate = new Date(date.getTime() + kstOffset);
  return kstDate.toISOString().split("T")[0];
};

const INITIAL_FORM_DATA = {
  title: "",
  date: getFormattedDate(new Date()),
  time: "",
  location: "",
  price: 0,
  mainCategoryId: 0,
  subcategoryId: 0,
};

// 천 단위 구분 쉼표 함수
const formatNumber = (num) => {
  if (!num) return "";
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const ScheduleInputMolecule = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const passedDate = searchParams.get("date");
  const initialDate = passedDate ? passedDate : getFormattedDate(new Date());

  const { mutate: createSchedule } = useCreateScheduleMutation();
  const { data: customCategories = [] } = useCategories();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // 전달받은 일자를 초기 formData에 반영합니다.
  const [formData, setFormData] = useState({
    ...INITIAL_FORM_DATA,
    date: initialDate,
  });
  const [subCategories, setSubCategories] = useState([]);
  const [priceInput, setPriceInput] = useState("");
  const [alertMessage, setAlertMessage] = useState("");

  useEffect(() => {
    if (!customCategories || customCategories.length === 0) return;
    if (formData.mainCategoryId) {
      const selectedCategory = customCategories.find(
        (category) => category.id === formData.mainCategoryId
      );
      if (selectedCategory && selectedCategory.children) {
        setSubCategories(selectedCategory.children);
      } else {
        setSubCategories([]);
      }
    } else {
      setSubCategories([]);
    }
  }, [formData.mainCategoryId, customCategories]);

  const handleSubmit = () => {
    const { title, location, date, time, mainCategoryId } = formData;
    const trimmedTitle = title.trim();
    const trimmedLocation = location.trim();

    if (!trimmedTitle || !date || !mainCategoryId) {
      setAlertMessage("제목, 일자, 구분은 필수 입력입니다");
      return;
    }

    const utcDateTime = convertUTC(date, time);
    const newSchedule = {
      ...formData,
      title: trimmedTitle,
      location: trimmedLocation,
      date: utcDateTime,
      price: Number(formData.price),
    };

    // const categoryNames = findCategoryNames(formData.mainCategoryId, formData.subcategoryId);

    createSchedule(newSchedule, {
      onSuccess: () => {
        queryClient.invalidateQueries(["schedules"]);
        navigate(-1);
      },
      onError: (error) => {
        setAlertMessage("일정 추가를 다시 시도해주세요.");
      },
    });
  };

  return (
    <div className="w-full mx-auto text-left mb-3 ">
      {alertMessage && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <MyAlert
            message={alertMessage}
            onConfirm={() => setAlertMessage("")}
          />
        </div>
      )}
      <div className="flex items-center justify-between px-8 py-4 border-b shadow-sm bg-white rounded-b-lg">
        <button
          onClick={() => navigate(-1)}
          className="text-gray-600 text-base"
        >
          &lt;
        </button>
        <h1 className="text-xl font-bold">일정 수립하기</h1>
        <button
          onClick={handleSubmit}
          className="text-red-200 text-sm text-center font-bold"
        >
          완료
        </button>
      </div>
      <div className="flex flex-col gap-7 px-8 py-4 ml-3 mr-3">
        <div className="flex items-center gap-4">
          <label className="font-semibold text-gray-700 w-16">제 목</label>
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
        <div className="flex items-center gap-4">
          <label className="font-semibold text-gray-700 w-16">일 자</label>
          <CuteCalendarPopup
            initialDate={formData.date} // URL의 날짜를 기본값으로 전달
            onDateSelect={(selectedDate) =>
              setFormData({ ...formData, date: selectedDate })
            }
            containerClass="absolute left-0 mt-2"
          />
        </div>

        <div className="flex items-center gap-4">
          <label className="font-semibold text-gray-700 w-16">시 간</label>
          <CuteTimeSelect
            onTimeSelect={(selectedTime) =>
              setFormData({ ...formData, time: selectedTime })
            }
            baseDate={formData.date}
          />
        </div>
        <div className="flex items-center gap-4">
          <label className="font-semibold text-gray-700 w-16">위 치</label>
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
        <div className="flex items-center gap-4">
          <label className="font-semibold text-gray-700 w-16">예 산</label>
          <input
            type="number"
            name="price"
            value={formData.price || ""}
            onChange={(e) => {
              const inputValue = e.target.value;
              if (inputValue === "") {
                setFormData({ ...formData, price: 0 });
                return;
              }
              const numericValue = Number(inputValue);
              if (
                !isNaN(numericValue) &&
                numericValue >= 0 &&
                numericValue <= 999999999
              ) {
                setFormData({ ...formData, price: numericValue });
              }
            }}
            onKeyDown={(e) => {
              if (["e", "E", ".", "+", "-"].includes(e.key)) {
                e.preventDefault();
              }
            }}
            max={999999999}
            placeholder="10억 미만 설정 가능합니다"
            className="p-2 w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-red-200 disabled:opacity-50 disabled:cursor-not-allowed"
          />
        </div>
        <div className="flex items-center gap-4">
          <label className="font-semibold text-gray-700 w-16">구 분</label>
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
