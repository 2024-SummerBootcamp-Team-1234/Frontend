import ScrollableBox from '../components/ScrollableBox';

function SummaryPage() {
  return (
    <>
      <div className="flex w-screen h-screen bg-cover bg-center bg-summary-image">
        {/* 왼쪽 가로 45% 박스 */}
        <div className="flex-col w-[45%] h-[100%] p-4 pb-16">
          <div className="w-[100%] h-[20%]"></div>
          <div className="flex w-[100%] h-[80%] items-end bg-contain bg-no-repeat bg-center-bottom bg-judge-image">
            <div className="flex-col w-[100%] h-[30%] bg-contain bg-no-repeat bg-center-bottom bg-judgeChat-image"></div>
          </div>
        </div>

        {/* 오른쪽 가로 55% 박스 */}
        <div className="flex-col w-[55%] h-[100%] justify-end p-12 pb-16 pr-16">
          {/* 위에 15% 박스 */}
          <div className="w-[100%] h-[12%]"></div>

          {/* 중간 75% 박스 */}
          <div className="w-[100%] h-[75%] bg-black rounded-2xl opacity-90 border-solid border-white border-2">
            <div className="flex w-[100%] h-[100%]">
              <ScrollableBox
                content="요약. 이게 판결이다.알겠냐"
                className="h-[100%] w-[100%]"
              />
            </div>
          </div>

          {/* 하단 10% 박스 */}
          <div className="flex-col w-[100%] h-[13%] content-end">
            <button className="w-[100%] h-[60%] bg-black rounded-2xl opacity-90 border-solid border-white hover:bg-zinc-900 border-2 font-sans text-white text-[20px]">
              계속하기
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default SummaryPage;
