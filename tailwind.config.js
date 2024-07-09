/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Noto Sans', 'sans-serif'],
      },
      backgroundImage: {
        'custom-image': "url('./public/main_solomon.png')", // 경로를 실제 이미지 파일 위치로 수정하세요
      },
      backgroundPosition: {
        'center-bottom': 'center bottom', // 커스텀 배경 위치 추가
      },
    },
  },
  plugins: [],
}

