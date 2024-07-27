import ScrollableBox from '../components/ScrollableBox';

function SummaryPage() {
  return (
    <>
      <div className="flex w-screen h-screen bg-cover bg-center bg-summary-image">
        <div className="flex-col w-[45%] h-[100%] p-4">
          <div className="w-[100%] h-[20%]"></div>
          <div className="flex w-[100%] h-[80%] items-end bg-contain bg-no-repeat bg-center-bottom bg-judge-image">
            <div className="flex-col w-[100%] h-[30%] bg-contain bg-no-repeat bg-center bg-judgeChat-image"></div>
          </div>
        </div>
        <div className="flex-col w-[60%] h-[100%] items-end p-12">
          <div className="w-[100%] h-[10%] "></div>
          <div className="w-[100%] h-[70%] bg-black rounded-2xl opacity-90 border-solid border-white border-2">
            <div className="flex w-[100%] h-[100%]">
              <ScrollableBox
                content="요약. 이게 판결이다.알겠냐"
                className=" h-[100%] w-[100%] "
              />
            </div>
          </div>
          <div className="flex-col w-[100%] h-[15%] content-center">
            <button className="w-[100%] h-[60%] bg-black rounded-2xl opacity-90 border-solid border-white border-2 font-sans text-white">
              계속하기
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default SummaryPage;
