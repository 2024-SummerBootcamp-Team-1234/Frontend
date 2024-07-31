# 베이스 이미지 설정
FROM node:20.0.0-alpine AS build

WORKDIR /frontend

# 소스 코드 복사
COPY ./package.json ./
RUN npm install

COPY . ./

RUN npm build

CMD ["npm", "start"]