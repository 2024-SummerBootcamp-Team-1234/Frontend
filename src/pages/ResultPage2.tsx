import { Link, useNavigate, useParams, useLocation } from 'react-router-dom';
import ScrollableBox from '../components/ScrollableBox';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';
import React, { useState, useEffect } from 'react';
import api from '../api';
import LoadingPage from '../components/LoadingPage';

interface LocationState {
  combinedMessages: string[];
  channelId: string;
  categoryIds: string[];
}

const ResultPage2: React.FC = () => {
  const { channel_id } = useParams<{ channel_id: string }>();
  const location = useLocation();
  const { combinedMessages, channelId, categoryIds } = (location.state ||
    {}) as LocationState;

  // 콘솔에 불러오는 부분 -------------------------
  useEffect(() => {
    console.log('Combined Messages:', combinedMessages);
    console.log('Channel ID:', channelId);
    console.log('Category IDs:', categoryIds);
  }, [combinedMessages, channelId, categoryIds]);

  const navigate = useNavigate();
  const [chars, setChars] = useState<string[]>([]);

  useEffect(() => {
    console.log('Component mounted or channel_id changed:', channelId);
    if (!channelId) {
      console.error('Channel ID is required');
      return;
    }

    const channelIdNumber = parseInt(channelId, 10); // channel_id를 숫자로 변환합니다.
    if (isNaN(channelIdNumber)) {
      console.error('Invalid Channel ID');
      return;
    }

    const taggedMessages = combinedMessages.map((message, index) => {
      let tag = '';
      switch (index) {
        case 0:
          tag = '상황: ';
          break;
        case 1:
          tag = '원고 주장: ';
          break;
        case 2:
          tag = '피고 주장: ';
          break;
        case 3:
          tag = '원고 최후 변론: ';
          break;
        case 4:
          tag = '피고 최후 변론: ';
          break;
        default:
          tag = '';
      }
      return `${tag}${message}`;
    });

    // 페이지 로드 시 POST 요청 보내기
    const aiRespond = async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/api/v1/channels/messages/${channelId}`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message: taggedMessages }),
          },
        );

        if (!response.body) {
          throw new Error('Response body is null');
        }

        const reader = response.body.getReader();
        const decoder = new TextDecoder('utf-8');
        let done = false;
        let partialChunk = '';

        while (!done) {
          const { value, done: doneReading } = await reader.read();
          done = doneReading;
          const chunk = decoder.decode(value, { stream: true });
          partialChunk += chunk;

          const lines = partialChunk.split('\n');
          if (!done) {
            partialChunk = lines.pop() || '';
          } else {
            partialChunk = '';
          }

          for (const line of lines) {
            if (line.startsWith('data: ')) {
              const jsonPart = line.substring(6).trim();
              if (jsonPart.length > 0) {
                try {
                  const data = JSON.parse(jsonPart);
                  if (data.content) {
                    setChars((prevChars) => [...prevChars, data.content]);
                  }
                } catch (error) {
                  console.error('Error parsing JSON:', error, jsonPart);
                }
              }
            }
          }
        }
      } catch (error) {
        console.error('Error posting message:', error);
      }
    };

    aiRespond();
  }, [channelId, combinedMessages]);

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
        const title = result.value;
        const postData = {
          title: title,
          content: chars.join(' ').split('\n').join(' '),
          category_ids: categoryIds, // 여기에 실제 카테고리 ID를 넣으세요
        };

        api
          .post('http://localhost:8000/api/v1/posts/', postData, {
            headers: {
              'Content-Type': 'application/json',
            },
          })
          .then((response) => {
            console.log('게시판에 등록된 데이터:', response.data);
            Swal.fire(
              '등록 완료',
              '게시판에 성공적으로 등록되었습니다.',
              'success',
            ).then(() => {
              navigate('/LatestPostPage'); // 게시판 페이지로 이동
            });
          })
          .catch((error) => {
            console.error('게시판 등록 오류:', error);
            Swal.fire('등록 실패', '게시판 등록에 실패했습니다.', 'error');
          });
      }
    });
  };

  useEffect(() => {
    console.log(combinedMessages);
  }, []);

  return (
    <>
      <LoadingPage></LoadingPage>
      <div className="w-screen h-screen bg-cover bg-center bg-result.back-image overflow-hidden">
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
                    className=" h-[400px] w-[670px] "
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
    </>
  );
};

export default ResultPage2;
