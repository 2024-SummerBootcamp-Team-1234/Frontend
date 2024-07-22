import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ScrollableBox from '../components/ScrollableBox';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';
import { useLocation } from 'react-router-dom';

const ResultPage: React.FC = () => {
  // useLocation 훅을 사용하여 현재 페이지로 전달된 데이터를 가져옴.
  // location.state를 통해 이전 페이지에서 넘겨받은 userInput과 channelId를 추출
  // 만약 state가 없을 경우를 대비해 기본값을 설정
  const location = useLocation();
  const { combinedMessages, channelId } = location.state || {
    combinedMessages: [],
    channelId: '',
  };

  useEffect(() => {
    console.log('Combined Messages:', combinedMessages);
    console.log('Channel ID:', channelId);
  }, [combinedMessages, channelId]);

  const longText = `쏜애플(Thornapple)은 대한민국의 4인조 록 밴드이며 주 장르는 사이키델릭 록이다. 2009년에 밴드 '가시사과'라는 이름으로 
  데뷔하였고, 결성 초반에는 홍대 부근에서 공연 위주의 활동으로 이름을 알리기 시작하였다. 2010년 '가시사과'에서 '쏜애플'로 밴드 이름을 바꾸고
   그해 7월, 첫번째 정규 앨범 '난 자꾸 말을 더듬고 잠드는 법도 잊었네'를 발매하였다. 앨범 발매 직후 윤성현과 심재현의 군입대로 2년여간의 
   공백기를 가지다 2012년 12월에 복귀, 2013년 Mnet 프로그램 'MUST 밴드의 시대'에서 기량을 드러내고 그 해 6월 해피로봇 레코드와 전속계약을 
   맺고 본격적인 활동을 시작하였다. 계약 1년 후 2집 '이상기후'를 발매하였다. 이후 2016년엔 5곡이 담긴 EP '서울병'을 발매하고 공연 활동을 
   이어나갔다. 3년 뒤인 2019년 7월, 정규 3집 '계몽'을 발매하였다. 2021년, 문화콘서트 난장에서 올해 하반기 발매를 목표로 새 EP를 준비하고 
   있다고 밝혔다. 쏜애플(Thornapple)은 대한민국의 4인조 록 밴드이며 주 장르는 사이키델릭 록이다. 2009년에 밴드 '가시사과'라는 이름으로 
  데뷔하였고, 결성 초반에는 홍대 부근에서 공연 위주의 활동으로 이름을 알리기 시작하였다. 2010년 '가시사과'에서 '쏜애플'로 밴드 이름을 바꾸고
   그해 7월, 첫번째 정규 앨범 '난 자꾸 말을 더듬고 잠드는 법도 잊었네'를 발매하였다. 앨범 발매 직후 윤성현과 심재현의 군입대로 2년여간의 
   공백기를 가지다 2012년 12월에 복귀, 2013년 Mnet 프로그램 'MUST 밴드의 시대'에서 기량을 드러내고 그 해 6월 해피로봇 레코드와 전속계약을 
   맺고 본격적인 활동을 시작하였다. 계약 1년 후 2집 '이상기후'를 발매하였다. 이후 2016년엔 5곡이 담긴 EP '서울병'을 발매하고 공연 활동을 
   이어나갔다. 3년 뒤인 2019년 7월, 정규 3집 '계몽'을 발매하였다. 2021년, 문화콘서트 난장에서 올해 하반기 발매를 목표로 새 EP를 준비하고 
   있다고 밝혔다. 쏜애플(Thornapple)은 대한민국의 4인조 록 밴드이며 주 장르는 사이키델릭 록이다. 2009년에 밴드 '가시사과'라는 이름으로 
   데뷔하였고, 결성 초반에는 홍대 부근에서 공연 위주의 활동으로 이름을 알리기 시작하였다. 2010년 '가시사과'에서 '쏜애플'로 밴드 이름을 바꾸고
    그해 7월, 첫번째 정규 앨범 '난 자꾸 말을 더듬고 잠드는 법도 잊었네'를 발매하였다. 앨범 발매 직후 윤성현과 심재현의 군입대로 2년여간의 
    공백기를 가지다 2012년 12월에 복귀, 2013년 Mnet 프로그램 'MUST 밴드의 시대'에서 기량을 드러내고 그 해 6월 해피로봇 레코드와 전속계약을 
    맺고 본격적인 활동을 시작하였다. 계약 1년 후 2집 '이상기후'를 발매하였다. 이후 2016년엔 5곡이 담긴 EP '서울병'을 발매하고 공연 활동을 
    이어나갔다. 3년 뒤인 2019년 7월, 정규 3집 '계몽'을 발매하였다. 2021년, 문화콘서트 난장에서 올해 하반기 발매를 목표로 새 EP를 준비하고 
    있다고 밝혔다. 쏜애플(Thornapple)은 대한민국의 4인조 록 밴드이며 주 장르는 사이키델릭 록이다. 2009년에 밴드 '가시사과'라는 이름으로 
   데뷔하였고, 결성 초반에는 홍대 부근에서 공연 위주의 활동으로 이름을 알리기 시작하였다. 2010년 '가시사과'에서 '쏜애플'로 밴드 이름을 바꾸고
    그해 7월, 첫번째 정규 앨범 '난 자꾸 말을 더듬고 잠드는 법도 잊었네'를 발매하였다. 앨범 발매 직후 윤성현과 심재현의 군입대로 2년여간의 
    공백기를 가지다 2012년 12월에 복귀, 2013년 Mnet 프로그램 'MUST 밴드의 시대'에서 기량을 드러내고 그 해 6월 해피로봇 레코드와 전속계약을 
    맺고 본격적인 활동을 시작하였다. 계약 1년 후 2집 '이상기후'를 발매하였다. 이후 2016년엔 5곡이 담긴 EP '서울병'을 발매하고 공연 활동을 
    이어나갔다. 3년 뒤인 2019년 7월, 정규 3집 '계몽'을 발매하였다. 2021년, 문화콘서트 난장에서 올해 하반기 발매를 목표로 새 EP를 준비하고 
    있다고 밝혔다..........
    
  `;
  const navigate = useNavigate();

  const handleButtonClick = () => {
    Swal.fire({
      title: '메인페이지로 이동',
      html: '메인페이지로 이동시 현재 판결문이 삭제됩니다. <br>저장을 원하신다면 게시판 공유 부탁드립니다.',
      showCancelButton: true,
      cancelButtonColor: '#ffffff',
      confirmButtonColor: '#000000',
      cancelButtonText: '취소',
      confirmButtonText: '메인페이지로 이동',
      customClass: {
        htmlContainer: 'text-left', // 본문 텍스트를 왼쪽 정렬
        cancelButton:
          ' border-gray-500 text-black px-4 py-2 rounded border-2 border-gray-500 bg-white', // 취소 버튼 스타일
        actions: 'flex justify-end', // 버튼들을 플렉스 박스로 오른쪽 정렬
      },
    }).then((result) => {
      if (result.isConfirmed) {
        navigate('/MainPage2');
      }
    });
  };

  const handleButtonClick2 = () => {
    Swal.fire({
      title: '게시판 공유',
      html: `<div class="text-left mb-4">게시판 제목을 입력해주세요.</div>
             <div class="relative w-full">
               <input
                 type="text"
                 id="boardTitle"
                 placeholder="oo님의 판결결과"
                 required
                 class="w-full h-[53px] px-4 py-2 pl-[40px] border rounded focus:outline-none focus:ring-2 bg-WhiteCoffeeColor focus:ring-slate-600 shadow-inner"
               />
             </div>`,
      showCancelButton: true,
      cancelButtonColor: '#ffffff',
      confirmButtonColor: '#000000',
      cancelButtonText: '취소',
      confirmButtonText: '게시판 등록',
      customClass: {
        htmlContainer: 'text-left', // 본문 텍스트를 왼쪽 정렬
        cancelButton:
          'border-gray-500 text-black px-4 py-2 rounded focus:outline-none focus:ring-2 bg-WhiteCoffeeColor focus:ring-slate-600', // 취소 버튼 스타일
        actions: 'flex justify-end', // 버튼들을 플렉스 박스로 오른쪽 정렬
        title: 'text-left w-full',
      },
      didOpen: () => {
        const actions = Swal.getActions();
        actions?.classList.add('mr-12'); // 여백 추가
      },
      preConfirm: () => {
        const title = (
          document.getElementById('boardTitle') as HTMLInputElement
        ).value;
        if (!title) {
          Swal.showValidationMessage('게시판 제목을 입력해주세요.');
        }
        return title;
      },
    }).then((result) => {
      if (result.isConfirmed) {
        console.log('Board title confirmed:', result.value);
      }
    });
  };

  return (
    <div className="w-screen h-screen bg-cover bg-center bg-result.back-image">
      <Link to="/MainPage2" className="absolute top-[73px] left-[59px]">
        <div className="w-12 h-12 bg-home-image bg-cover bg-center"></div>
      </Link>
      <div className="w-screen h-screen flex bg-black bg-opacity-60 justify-center items-center">
        <div className="w-[1151px] h-[813px] flex items-center justify-center bg-cover bg-result-image">
          {/* 왼쪽공간 */}
          <div className="w-[330px] h-full "></div>
          {/* 가운데 공간 */}
          <div className="flex-col items-center justify-center">
            <div className="flex-col w-[100%] h-[80px]"></div>
            <div className="flex-col bg-black opacity-90 rounded-[25px]">
              <div className="flex">
                <ScrollableBox
                  content={longText}
                  className="w-full h-full max-w-[700px] max-h-[430px]"
                />
              </div>

              <div className="flex justify-center space-x-5 pt-6 pb-6">
                <button
                  type="button"
                  className="w-[280px] h-[58px] bg-[#585858] text-white rounded-[30px] focus:outline-none shadow-inner font-bold text-2xl shadow-xl"
                  onClick={handleButtonClick}
                >
                  메인 페이지
                </button>
                <button
                  type="button"
                  className="w-[280px] h-[58px] bg-[#585858] text-white rounded-[30px] focus:outline-none shadow-inner font-bold text-2xl"
                  onClick={handleButtonClick2}
                >
                  게시판 공유하기
                </button>
              </div>
            </div>

            <div className=""></div>
          </div>
          {/* 오른쪽 공간 */}
          <div className="w-[160px] h-full "></div>
        </div>
      </div>
    </div>
  );
};

export default ResultPage;
