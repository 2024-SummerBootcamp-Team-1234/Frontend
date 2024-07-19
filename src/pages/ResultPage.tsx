import { Link, useNavigate, useParams } from 'react-router-dom';
import ScrollableBox from '../components/ScrollableBox';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';
import api from '../api';
import React, { useState, useEffect } from 'react';

const ResultPage: React.FC = () => {
  const { channel_id } = useParams<{ channel_id: string }>();
  const navigate = useNavigate();
  const [chars, setChars] = useState('');

  useEffect(() => {
    console.log('Component mounted or channel_id changed:', channel_id);
    if (!channel_id) {
      console.error('Channel ID is required');
      return;
    }

    const channelIdNumber = parseInt(channel_id, 10); // channel_id를 숫자로 변환합니다.
    if (isNaN(channelIdNumber)) {
      console.error('Invalid Channel ID');
      return;
    }

    // 페이지 로드 시 POST 요청 보내기
    const postMessage = async () => {
      try {
        const response = await api.post(
          `/channels/virtual_messages/${channel_id}`,
          {
            message: 'string',
          },
        );
        console.log('POST request successful:', response.data);
      } catch (error) {
        console.error('Error posting message:', error);
      }
    };

    postMessage();
  }, [channel_id]);

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
                  content={chars}
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
