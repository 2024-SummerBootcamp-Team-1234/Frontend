/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Noto Sans', 'sans-serif'],
      },
      backgroundImage: {
        'custom-image': "url('./public/main_solomon.png')", // 경로를 실제 이미지 파일 위치로 수정하세요
      },
      backgroundSize: {
        contain: 'contain', // 이미지를 전체 형태를 유지하며 줄이기
      },
      backgroundPosition: {
        'center-bottom': 'center bottom', // 커스텀 배경 위치 추가
      },
      backgroundSize: {
        'solomon-size': '85%', // 커스텀 배경 크기 추가
      },
      backgroundRepeat: {
        'no-repeat': 'no-repeat', // 이미지 반복 없음을 위해 만듦
      },
      height: {
        //부모 요소의 퍼센트로 높이를 나타내기 위해 사용
        '10p': '10%',
        '20p': '20%',
        '30p': '30%',
        '40p': '40%',
        '50p': '50%',
        '60p': '60%',
        '70p': '70%',
        '80p': '80%',
        '90p': '90%',
        '100p': '100%',
      },
    },
  },
  plugins: [],
};
