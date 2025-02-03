export const STEP_DATA = {
  wedding: {
    id: 1,
    title: "결혼식",
    options: [
      { id: 6, parent_id: 1, name: "결혼식장 결정" },
      { id: 7, parent_id: 1, name: "상견례" },
      { id: 8, parent_id: 1, name: "웨딩 어시스트(축가 등) 선정" },
      { id: 9, parent_id: 1, name: "본식 촬영 예약" },
      { id: 10, parent_id: 1, name: "청첩장 제작" },
      { id: 11, parent_id: 1, name: "부케" },
      { id: 12, parent_id: 1, name: "청첩장 모임" },
      { id: 13, parent_id: 1, name: "답례품 준비" },
      { id: 14, parent_id: 1, name: "기타" },
    ],
  },
  styling: {
    id: 2,
    title: "스드메",
    options: [
      { id: 15, parent_id: 2, name: "신부 드레스 결정" },
      { id: 16, parent_id: 2, name: "메이크업샵 선정" },
      { id: 17, parent_id: 2, name: "스튜디오 선정" },
      { id: 18, parent_id: 2, name: "촬영날짜 선정" },
      { id: 19, parent_id: 2, name: "신랑 예복 준비" },
      { id: 20, parent_id: 2, name: "기타" },
    ],
  },
  gift: {
    id: 3,
    title: "예물 예단",
    options: [
      { id: 21, parent_id: 3, name: "웨딩링 결정" },
      { id: 22, parent_id: 3, name: "혼주(부모님 한복) 결정" },
      { id: 23, parent_id: 3, name: "예물 구매" },
      { id: 24, parent_id: 3, name: "기타" },
    ],
  },
  house: {
    id: 4,
    title: "신혼집",
    options: [
      { id: 25, parent_id: 4, name: "가전기기 구매" },
      { id: 26, parent_id: 4, name: "가구 구매" },
      { id: 27, parent_id: 4, name: "기타" },
    ],
  },
  honeymoon: {
    id: 5,
    title: "신혼여행",
    options: [
      { id: 28, parent_id: 5, name: "항공권 예약" },
      { id: 29, parent_id: 5, name: "숙소 예약" },
      { id: 30, parent_id: 5, name: "액티비티 예약" },
      { id: 31, parent_id: 5, name: "기타" },
    ],
  },
};

export const STEP_KEYS = ["wedding", "styling", "gift", "house", "honeymoon"];
