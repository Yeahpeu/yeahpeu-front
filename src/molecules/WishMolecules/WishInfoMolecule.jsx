const WishInfoMolecule = ({ onItemClick }) => {
  const categories = [
    {
      name: "가전",
      items: [
        "식기세척기",
        "청소기",
        "냉장고",
        "밥솥",
        "전자레인지",
        "세탁기",
        "정수기",
        "TV",
        "공기청정기",
        "인터넷",
        "가습기",
        "다리미",
        "전기포트",
      ],
    },
    {
      name: "가구",
      items: ["화장대", "서랍장", "침대", "옷장", "소파", "책상", "식탁"],
    },
    {
      name: "침구/생활용품",
      items: ["침구세트", "카페트", "방석", "수건", "담요"],
    },
    {
      name: "주방용품",
      items: ["냄비세트", "밀폐용기", "앞치마", "프라이팬", "컵세트", "식기"],
    },
  ];

  return (
    <div className="p-2 w-full">
      <h2 className="text-xl text-left font-bold mb-4 text-red-200">
        추천 혼수 리스트
      </h2>
      {categories.map((category) => (
        <div key={category.name} className="mb-6">
          <h3 className="text-left text-medi font-bold mb-2">
            {category.name}
          </h3>
          <hr className="m-1" />
          <ul className="flex flex-wrap gap-2">
            {category.items.map((item) => (
              <li
                key={item.id}
                onClick={() => onItemClick(item)}
                className="cursor-pointer text-blue-500 hover:underline inline-block px-2"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default WishInfoMolecule;
