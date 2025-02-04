export const shareKakao = (linkUrl, title, imageUrl) => {
  if (window.Kakao) {
    const kakao = window.Kakao;
    const kakaoKey = import.meta.env.VITE_SHARE_KAKAO_LINK_KEY;

    if (!kakao.isInitialized()) {
      kakao.init(kakaoKey);
    }

    kakao.Link.sendDefault({
      objectType: "feed",
      content: {
        title: title,
        description: "아래 링크를 클릭해 상품을 확인하세요!",
        imageUrl: imageUrl,
        link: {
          webUrl: linkUrl,
          mobileWebUrl: linkUrl,
        },
      },
      buttons: [
        {
          title: "상품 보러가기",
          link: {
            webUrl: linkUrl,
            mobileWebUrl: linkUrl,
          },
        },
      ],
    });
  }
};
