import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import MyInputWhite from "../../components/common/MyInput-white";
import CuteCalendarPopup from "../../components/common/CuteCalendarPopup";
import CuteTimeSelect from "../../components/common/CuteTimePopup";
import {
  useCategories,
  useScheduleDetail,
  useUpdateScheduleMutation,
} from "../../api/scheduleAPI";
import {
  convertKST,
  convertToKST,
  convertUTC,
} from "../../data/util/timeUtils";
import { useQueryClient } from "@tanstack/react-query";
import MyAlert from "../../components/Modals/MyAlert";
import MyLoading from "../../components/common/MyLoading";

const formatNumber = (num) => {
  if (!num) return "";
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const ScheduleEditMolecule = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { id } = useParams();
  const { data: event, isLoading, error } = useScheduleDetail(id);
  const { data: customCategories = [] } = useCategories();
  const updateScheduleMutation = useUpdateScheduleMutation();
  const [priceInput, setPriceInput] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    time: "",
    location: "",
    price: 0,
    mainCategoryId: 0,
    subcategoryId: 0,
  });
  const [subCategories, setSubCategories] = useState([]);

  useEffect(() => {
    if (event) {
      const { date: initialDate, time: initialTime } = event.date
        ? convertKST(event.date)
        : { date: new Date().toISOString().split("T")[0], time: "" };
      setFormData((prevFormData) => ({
        ...prevFormData,
        title: event.title?.trim() || "",
        date: initialDate,
        time: initialTime,
        location: event.location?.trim() || "",
        price: event.price || 0,
        mainCategoryId: event.mainCategoryId || 0,
        subcategoryId: event.subcategoryId || 0,
      }));
      setPriceInput(event.price ? formatNumber(event.price) : "");
    }
  }, [event]);

  useEffect(() => {
    if (formData.mainCategoryId && customCategories.length > 0) {
      const selectedCategory = customCategories.find(
        (category) => Number(category.id) === Number(formData.mainCategoryId)
      );
      setSubCategories(selectedCategory ? selectedCategory.children : []);
    } else {
      setSubCategories([]);
    }
  }, [formData.mainCategoryId, customCategories]);

  const handleSubmit = () => {
    const utcDateTime = convertUTC(formData.date, formData.time);
    const trimmedTitle = formData.title.trim();
    const trimmedLocation = formData.location.trim();
    if (!trimmedTitle) {
      setAlertMessage("제목은 필수 입력입니다.");
      return;
    }
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
          setAlertMessage("다시 시도해 주세요");
        },
      }
    );
  };

  if (isLoading)
    return (
      <div>
        <MyLoading />
      </div>
    );
  if (error)
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-center text-red-500">
          오류 발생하였습니다. <br /> 다시 시도해 주세요
        </div>
      </div>
    );

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
        <h1 className="text-lg font-bold">일정 수정하기</h1>
        <button
          onClick={handleSubmit}
          className="text-red-200 text-sm text-center font-bold"
        >
          완료
        </button>
      </div>
      <div className="flex flex-col gap-6 px-8 py-4 mx-3">
        <div className="flex items-center gap-8">
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
        <div className="flex items-center gap-8">
          <label className="font-semibold text-gray-700 w-16">일 자</label>
          <CuteCalendarPopup
            initialDate={formData.date}
            onDateSelect={(selectedDate) =>
              setFormData({
                ...formData,
                date: new Date(selectedDate).toISOString().split("T")[0],
              })
            }
            containerClass="absolute left-0 mt-2"
          />
        </div>
        <div className="flex items-center gap-8">
          <label className="font-semibold text-gray-700 w-16">시 간</label>
          <CuteTimeSelect
            initialValue={formData.time}
            onTimeSelect={(selectedTime) =>
              setFormData({ ...formData, time: selectedTime })
            }
            baseDate={formData.date}
          />
        </div>
        <div className="flex items-center gap-8">
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
            placeholder="30자 이하로 입력하세요"
            maxLength={30}
            className="border border-gray-300 rounded-md p-2 w-full"
          />
        </div>
        <div className="flex items-center gap-8">
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
            placeholder="10억 미만 설정 가능합니다"
            max={999999999}
            className="w-full px-3  py-2 text-sm border border-gray-300 rounded-lg 
      focus:outline-none 
      focus:ring-2 
      focus:ring-red-100
      focus:border-red-200
      disabled:opacity-50
      disabled:cursor-not-allowed"
          />
        </div>
        <div className="flex items-center gap-8">
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

export default ScheduleEditMolecule;
