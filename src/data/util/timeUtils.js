// KST -> UTC
export const convertUTC = (date, time) => {
  const kstDateTime = new Date(`${date}T${time}:00+09:00`); // KST로 인식
  return kstDateTime.toISOString(); // 자동으로 UTC로 변환됨
};

// UTC -> KST 변환
export const convertKST = (utcDateTime) => {
  const date = new Date(utcDateTime);
  const kstDate = date
    .toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    })
    .replace(/\s[오전|오후].*$/, "");

  const kstTime = date.toLocaleTimeString("ko-KR", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  return { date: kstDate, time: kstTime };
};
