import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Slider from 'react-slick';
import ForNextPageWhiteButton from '../components/ForNextPageWhiteButton';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';


interface Post {
    title: string;
    categories: string;
    judgementTitle: string;
    judgementDescription: string;
}

const posts: Post[] = [
    {
        title: '00',
        categories: '카테고리 1',
        judgementTitle: '자세한 상황 필요 1',
        judgementDescription: '1 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명  1',
    },
    {
        title: '00',
        categories: '카테고리 2',
        judgementTitle: '자세한 상황 필요 2',
        judgementDescription: '2 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명  2',
    },
    {
        title: '00',
        categories: '카테고리 3',
        judgementTitle: '자세한 상황 필요 3',
        judgementDescription: '3 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명  3',
    },
    {
        title: '00',
        categories: '카테고리 4',
        judgementTitle: '자세한 상황 필요 4',
        judgementDescription: '4 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명  4',
    },
    {
        title: '00',
        categories: '카테고리 5',
        judgementTitle: '자세한 상황 필요 5',
        judgementDescription: '5 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명  5',
    },
    {
        title: '00',
        categories: '카테고리 6',
        judgementTitle: '자세한 상황 필요 6',
        judgementDescription: '6 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명  6',
    },
    {
        title: '00',
        categories: '카테고리 7',
        judgementTitle: '자세한 상황 필요 7',
        judgementDescription: '7 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명  7',
    },
    {
        title: '00',
        categories: '카테고리 8',
        judgementTitle: '자세한 상황 필요 8',
        judgementDescription: '8 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명  8',
    },
    {
        title: '00',
        categories: '카테고리 9',
        judgementTitle: '자세한 상황 필요 9',
        judgementDescription: '9 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명 판결 설명  9',
    },
];

const CarouselItems: React.FC = () => {
    const [id, setId] = useState(0); // 작성자 아이디
    const [host, setHost] = useState(''); // 작성자의 닉네임
    const [title, setTitle] = useState(''); // 판결 제목
    const [content, setcontent] = useState(''); // 판결 내용
    const [vote, setVote] = useState(0); // 좋아요 수
    const [created_at, setCreated_at] = useState(null); // 게시물 작성 날짜
    const [categories, setCategories] = useState(''); // 사용자가 선택한 카테고리 -> 배열로 받아야하나...?


    const sliderRef = useRef<Slider>(null);
    const [activeSlide, setActiveSlide] = useState<number>(0);

    const settings = {
        dots: true,
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        arrows: false,
        centerMode: true,
        focusOnSelect: true,
        centerPadding: '150px',
        beforeChange: (current: number, next: number) => setActiveSlide(next),
    };

    const handlePrevious = () => {
        sliderRef.current?.slickPrev();
    };

    const handleNext = () => {
        sliderRef.current?.slickNext();
    };

    const navigate = useNavigate();

    const handleButtonClickToBack = () => {
        navigate('/JudgePageCopy');
    };

    const handleButtonClickToHome = () => {
        navigate('/');
    };

    const handleButtonClickToMyPost = () => {
        navigate('/MyPostPage');
    };

    const renderPost = (post: Post, index: number) => (
        <div key={index}>
            <div className="flex justify-center">
                <div
                    className={`w-[90%] h-[64vh] my-40 rounded-6xl shadow-6xl transition-all duration-500 border-2 border-solid border-white
                    ${activeSlide === index
                            ? 'bg-GainsboroColor bg-opacity-100 text-black transform scale-125'
                            : 'bg-gray-300 bg-opacity-80 text-gray-800 transform scale-90'
                        }`}
                >
                    <div className="p-14">
                        <div className="text-center">
                            <div className="mb-3 font-sans font-bold text-4xl">{post.title}님의 재판 결과</div>
                        </div>
                        <div className="bg-ConcordColor text-white font-sans font-bold text-xl inline-block px-3 py-1 rounded-lg">{post.categories}</div>
                        <div className="text-end my-3 text-black font-sans font-normal text-2xl">
                            <span>{post.judgementTitle}</span>
                        </div>
                        <div className="bg-VeryLightGrayColor w-[100%] h-[40vh] rounded-4xl py-7 pl-7 pr-4 relative">
                            <div className="overflow-y-auto scrollbar-slider h-full">
                                <div className="font-sans font-normal text-xl mx-2">{post.judgementDescription}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <div className="bg-postPageBg-image bg-cover bg-center min-h-screen flex flex-col justify-center relative">
            <div className="w-full h-screen flex flex-col justify-start relative">
                <span className="flex flex-row">

                    <button
                        className="bg-arrow-image bg-no-repeat bg-contain w-full h-[5vh] flex flex-col items-center mt-7 ml-5 "
                        style={{ maxWidth: '64px' }}
                        onClick={handleButtonClickToBack}
                    ></button>
                    <button
                        className="bg-homeButton-image bg-no-repeat bg-contain w-full h-[5vh] flex flex-col items-center mt-7 ml-2 "
                        style={{ maxWidth: '64px' }}
                        onClick={handleButtonClickToHome}
                    ></button>

                </span>

                <div className="overflow-hidden w-full max-w-[calc(100vw - 300px)] mx-auto">
                    <div className="relative flex items-center">
                        <button
                            onClick={handlePrevious}
                            className="absolute left-[31.2%] px-4 py-2 font-bold text-3xl bg-gray-300 rounded-full z-10 border-2 border-solid border-white"
                        >
                            {'<'}
                        </button>
                        <Slider ref={sliderRef} {...settings} className={'w-full'}>
                            {posts.map(renderPost)}
                        </Slider>
                        <button
                            onClick={handleNext}
                            className="absolute right-[31.2%] px-4 py-2 font-bold text-3xl bg-gray-300 rounded-full z-10 border-2 border-solid border-white"
                        >
                            {'>'}
                        </button>
                    </div>
                </div>

                <div className="absolute bottom-16 right-20">
                    <ForNextPageWhiteButton
                        text="내 게시물 보러가기"
                        onClick={handleButtonClickToMyPost}
                    />
                </div>
            </div>
        </div>
    );
};

export default CarouselItems;