import React, { useState } from 'react';

interface Post {
    title:string;
    hashtag:string;
    judgement: string;
    judgementDescription: string;
}

const posts = [
    {title: '최근 재판 결과1', hashtag:'이혼', judgement:'판결 :', judgementDescription:'이혼하면 너무너무 슬프고 돈이 많이 들고 전적이 남고 다음 결혼이 어려워지고 뿌엥~'},
    {title: '최근 재판 결과2', hashtag:'이혼', judgement:'판결 :', judgementDescription:'이혼하면 너무너무 슬프고 돈이 많이 들고 전적이 남고 다음 결혼이 어려워지고 뿌엥~'},
    {title: '최근 재판 결과3', hashtag:'이혼', judgement:'판결 :', judgementDescription:'이혼하면 너무너무 슬프고 돈이 많이 들고 전적이 남고 다음 결혼이 어려워지고 뿌엥~'},
    {title: '최근 재판 결과4', hashtag:'이혼', judgement:'판결 :', judgementDescription:'이혼하면 너무너무 슬프고 돈이 많이 들고 전적이 남고 다음 결혼이 어려워지고 뿌엥~'},
    {title: '최근 재판 결과5', hashtag:'이혼', judgement:'판결 :', judgementDescription:'이혼하면 너무너무 슬프고 돈이 많이 들고 전적이 남고 다음 결혼이 어려워지고 뿌엥~'},
    {title: '최근 재판 결과6', hashtag:'이혼', judgement:'판결 :', judgementDescription:'이혼하면 너무너무 슬프고 돈이 많이 들고 전적이 남고 다음 결혼이 어려워지고 뿌엥~'},
    {title: '최근 재판 결과7', hashtag:'이혼', judgement:'판결 :', judgementDescription:'이혼하면 너무너무 슬프고 돈이 많이 들고 전적이 남고 다음 결혼이 어려워지고 뿌엥~'},
];

const PostPage: React.FC = () => {
    // const [selectedPost, setSelectedPost] = useState<Post[]>([]);

    // const handleCarouselSelect =(post:Post) => {
    //     setSelectedPost(prevPost => {
    //         if(prevPost.some(p => p.{index} === post.{index} )) {
    //             return prevPost.filter(p=>p.{index} !== post.{index});
    //         }else {
    //             return [...prevPost, post];
    //         }
    //     });
    // };

    return(
        <div className="w-3/4 m-auto">
            <div className="mt-20">
                {posts.map((p) => (
                    <div>
                        <div>
                            <div className={p.title}></div>
                        </div>

                        <div>
                            <p></p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

};

export default PostPage;