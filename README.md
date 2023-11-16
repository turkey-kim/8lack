# <Img width="120px" src="https://github.com/turkey-kim/8lack/assets/83493231/45c41fbe-b271-46c1-8cf2-8b6835b7a3b4" />

<img width="100%" src="https://github.com/turkey-kim/8lack/assets/83493231/fccb86d6-fb66-4839-85af-0a7ae768494d"  />

<br/>

## 프로젝트 소개

**8lack** 은 다양한 사람들과 다양한 주제로 이야기를 나눠볼 수 있는 채팅 서비스입니다.

다양한 사람들과 자유롭게 소통을 즐길 수 있으며, 그룹 채팅을 통해 사용자들이 서로의 경험을 공유하고 정보를 교환할 수 있는 커뮤니티입니다.

<p align="center">
<h3> 관련 링크</h3>
  <a href="https://cute-nougat-1046cf.netlify.app/">
    <img src="https://img.shields.io/badge/8LACK Chat SERvice-white?style=for-the-badge&logoColor=white" alt="wiki"/>
  </a>
  <a href="https://github.com/turkey-kim/8lack">
    <img src="https://img.shields.io/badge/배포 repository-212125?style=for-the-badge&logoColor=white" alt="배포 레포"/>
  </a>
</p>

### 개발 기간

2023.11.06 - 11.16

<br/>
<br/>

# 📌 요구사항

<details>
    <summary>펼치기</summary>

## 필수

- [x] `useState`, `useReducer`를 활용한 상태 관리 구현
- [x] `Sass` 또는 `styled-component`를 활용한 스타일 구현
- [x] `react` 상태를 통한 CRUD 구현
- [x] 상태에 따라 달라지는 스타일 구현
- [x] `custom hook`을 통한 비동기 처리 구현
- [x] 유저인증 시스템(로그인, 회원가입) 구현
- [x] `jwt`등의 유저 인증 시스템 (로그인, 회원가입 기능)
- [x] 소켓을 이용한 채팅 구현

## 선택

- [x] `typescript`를 활용한 앱 구현

</details>

<br/>
<br/>
<br/>

# 📜 실행 스크립트

```
$ git clone <https://github.com/turkey-kim/8lack.git>
$ npm ci
$ npm run start
```

<br/>
<br/>

# ✨ 참여한 사람

|                           <img src="https://avatars.githubusercontent.com/u/126222848?v=4" width="150px" />                           |            <img src="https://avatars.githubusercontent.com/u/55376275?v=4" width="150px" />             |                           <img src="https://avatars.githubusercontent.com/u/83493231?v=4" width="150px" />                            |                                <img src="https://avatars.githubusercontent.com/u/139189221?v=4" width="150px" />                                |                <img src="https://avatars.githubusercontent.com/u/83440978?v=4" width="150px" />                |
| :-----------------------------------------------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------------------------------------------------------: | :------------------------------------------------------------------------------------------------------------: |
|                                                           FE: 정범환 (팀장)                                                           |                                               FE: 김민서                                                |                                                              FE: 김특희                                                               |                                                                   FE: 박나영                                                                    |                                                   FE: 장수빈                                                   |
| UI/UX 디자인 <br> 참여 가능한 그룹채팅방 리스트<br> 새로운 그룹채팅방 연결<br> 채팅방 내 초대기능<br> 로딩 및 결과 없음 상태 컴포넌트 | 사용자 리스트 페이지<br> 즐겨찾기 기능 <br> 1:1 채팅 연결<br> 마이 페이지<br> 메인페이지 - IntroSection | 로그인/회원가입 페이지 및 기능<br> 유저인증 처리<br> 유저 권한에 따른 라우팅<br> 활동중 유저 목록 최신화<br> 메인페이지 - CardSection | 채팅방 소켓 연결<br> 실시간 메시지 수신/송신<br> 채팅방 내 유저 접속상태 확인<br> 채팅방 나가기 기능<br> 새로운 채팅방 & 유저 초대 시 알림 기능 | 네비게이션바<br> 사이드바<br> 채팅방 리스트 실시간 업데이트 처리<br> 메인페이지 - HeaderSection<br> 404 페이지 |

<br/>
<br/>

# 💡 8lack 기능 소개

### **라우터**

채팅 로비 접속 시, 유저 인증 처리 및 서버 소켓을 연결하였습니다.

또한 로그인한 유저가 아니면, 서비스 소개 페이지로 이동하고, 로그인한 유저일 경우 전체 페이지 조회 가능하도록 유저 권한에 따른 라우팅을 설정하였습니다.

<br/>

### **로그인 / 회원가입 페이지**

<img width="80%" src="https://github.com/turkey-kim/8lack/assets/83493231/91ad8bc1-75ea-47c9-b2d6-9d140fb17cca" /></c>
<br/>
로그인 성공 시, 유저 인증 토큰 발급이 발급되고 채팅 로비로 연결됩니다.

   <br/>
   <img width="80%" src="https://github-production-user-asset-6210df.s3.amazonaws.com/83493231/283362723-395da1c8-67bb-4d70-941e-0ccd6080a3bd.gif"/>

회원가입 진행시 입력정보에 대한 유효성을 체크할 수 있는 UI 구성하였습니다. ( 중복확인, 비밀번호 검사 )

<br/>

### **사이드바 - 자신이 속한 채팅방 리스트**

   <img width="80%" src="https://github.com/turkey-kim/8lack/assets/83440978/9c2d8c68-641d-4952-bf2f-460624ebfb92"/>
<br/>
  현재 자신이 속해있는 개인&그룹 채팅방 리스트를 최신 메시지를 받은 순서대로 보여줍니다.
  메시지를 받으면 실시간으로 리스트가 업데이트 됩니다.

또한 채팅하고 싶은 방을 클릭 시 바로 채팅에 참여할 수 있습니다.

<br/>

### **참여 가능한 그룹채팅방 리스트**

  <img width="80%" src="https://github.com/turkey-kim/8lack/assets/83440978/9db876bd-a6a4-49bf-985e-482fbcdf573b"/>
<br/>
  아직 내가 속해있지 않은 그룹 채팅방을 조회할 수 있습니다.

이름 및 채팅방 별 최근 채팅을 언제 했는지, 인원이 얼마나 있는지 파악 가능합니다.

또한 정렬을 통해 가나다 순, 최근 채팅 순, 인원 순으로 조회 가능하며 검색도 조합할 수 있습니다.

<br/>

  <img width="80%" src="https://github.com/turkey-kim/8lack/assets/83440978/ce848cb7-2c38-4bcf-8f48-d63b32d71f37"/>
<br/>
  새로운 그룹채팅방을 만들 수 있습니다.

다른 사용자들을 조회, 추가하여 새로운 그룹채팅방을 생성할 수 있습니다.

<br/>

### **사용자 리스트 페이지**

  <img width="80%" src="https://github.com/turkey-kim/8lack/assets/83440978/215d55af-4903-4177-8946-8d6a058b34e4"/>

이 사이트에 가입한 모든 사용자들을 조회하고, 이름을 검색하여 찾고 싶은 사용자를 찾을 수 있습니다.

원하는 사용자를 즐겨찾기 할 수 있고, 현재 사이트에 접속인 친구를 확인 할 수 있습니다.

또, 원하는 친구와 1:1 채팅을 시작 할 수 있습니다.

<br/>

### **채팅 페이지**

실시간으로 메시지를 주고 받을 수 있습니다. 채팅방에 연결되자마자 이전 대화 기록이 보이도록 설정했습니다.

Drawer을 열어보면 현재 채팅방 유저의 정보와 현재 접속 상태를 한눈에 파악이 가능합니다.

채팅을 주고 받을 때, 메시지별로 날짜를 그룹화해서 보이도록 했고 새로운 유저가 참여하거나 나갈 시 시스템 메시지도 표시됩니다.

새로운 채팅방이 생성됐거나 기존 채팅방에 유저를 초대할 시 알림 메시지를 받을 수 있습니다.

<br/>

### **내 정보 조회 / 수정**

  <img width="80%" src="https://github.com/turkey-kim/8lack/assets/83440978/d2d6812b-0357-4966-9648-c890fe51f537"/>
<br/>
 자신이 원하는 사진이나 이름으로 변경 할 수 있습니다.

<br/>
<br/>

# ⚒️ 기술 스택

|            | Stack                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| :--------: | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|    언어    | <img src="https://img.shields.io/badge/typescript-3178C6?style=for-the-badge&logo=typescript&logoColor=white">                                                                                                                                                                                                                                                                                                                                            |
|   디자인   | <img src="https://img.shields.io/badge/figma-F24E1E?style=for-the-badge&logo=figma&logoColor=white">                                                                                                                                                                                                                                                                                                                                                      |
|    서버    | <img src="https://img.shields.io/badge/socket.io-010101?style=for-the-badge&logo=socket.io&logoColor=white">                                                                                                                                                                                                                                                                                                                                              |
| 라이브러리 | <img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black"> <img src="https://img.shields.io/badge/recoil-3578E5?style=for-the-badge&logo=recoil&logoColor=white"/> <img src="https://img.shields.io/badge/react query-FF4154?style=for-the-badge&logo=react query&logoColor=white"> <img src="https://img.shields.io/badge/styledcomponents-DB7093?style=for-the-badge&logo=styled-components&logoColor=white"> |
|   협업툴   | <img src="https://img.shields.io/badge/git-F05032?style=for-the-badge&logo=git&logoColor=white"> <img src="https://img.shields.io/badge/github-181717?style=for-the-badge&logo=github&logoColor=white">                                                                                                                                                                                                                                                   |
| 개발 환경  | <img src="https://img.shields.io/badge/vscode-007ACC?style=for-the-badge&logo=visualstudiocode&logoColor=white"> <img src="https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white">                                                                                                                                                                                                                                         |

<br/>
<br/>

# 📌 유저 플로우

<a href ="https://github.com/turkey-kim/8lack/assets/83493231/372e5701-a13b-4531-9567-fc1706d1c97d" target="_blank">
<img src="https://github.com/turkey-kim/8lack/assets/83493231/372e5701-a13b-4531-9567-fc1706d1c97d" /></a>

<br/>
<br/>

# 🗂️ 파일 구조

```
📂 src
┣ 📂 api
┣ 📂 assets                   # 폰트, 이미지 ,아이콘
┣ 📂 components               # 공용 컴포넌트
┃  ┣ 📂 Modal
┃  ┣ 📂 SideBar
┃  ┣ ...
┣ 📂 constant
┣ 📂 contexts                 # 소켓 컨택스트
┃  ┣ ChatSocketContext.tsx
┃  ┣ ...
┣ 📂 hooks                    # 커스텀훅
┣ 📂 pages                    # 페이지 컴포넌트
┃  ┣ 📂 Home
┃  ┣ 📂 GroupChatList
┃  ┣ 📂 UserList
┃  ┃  ┣ 📂 components
┃  ┃  ┣ index.tsx
┃  ┣ ...
┣ 📂 routes
┣ 📂 utils
┣ 📂 states                   # 전역상태
┣ 📂 styles                   # 스타일테마
┣ 📂 types                    # 타입스크립트 공용 인터페이스
┣ App.tsx
┣ index.tsx
```

<br/>
<br/>

# 📍 컨벤션

| 커밋 컨벤션 |                                                             |
| ----------- | ----------------------------------------------------------- |
| feat        | 새로운 기능 추가                                            |
| fix         | 버그 수정                                                   |
| env         | 개발 환경 관련 설정                                         |
| style       | 코드 스타일 수정 (세미 콜론, 인덴트 등의 스타일적인 부분만) |
| design      | css 등 디자인 추가 및 수정                                  |
| refactor    | 코드 리팩토링                                               |
| comment     | 주석 추가/수정                                              |
| docs        | 내부 문서 추가/수정                                         |
| test        | 테스트 추가/수정                                            |
| chore       | 빌드 관련 코드 수정                                         |
| rename      | 파일 및 폴더명 수정                                         |
| remove      | 파일 삭제                                                   |

<br/>
<br/>

# 💭 느낀점 및 회고

- 김민서

  - 팀원분들 모두가 열정이 대단해서 배운 점이 정말 많았고, 처음부터 끝까지 즐거웠던 프로젝트였습니다. 이번 프로젝트를 통해 체계적인 시스템의 중요성을 알게 되었고, 앞으로의 프로젝트에서도 이번에 배운 점들을 적극적으로 적용할 예정입니다.

- 김특희

  - 처음으로 디자인 시스템까지 적용하여 체계적으로 협업한 프로젝트였습니다. 탄탄한 기획과 체계적인 컨벤션으로 원활하게 협업할 수 있었습니다. 또한 팀원 모두가 프로젝트 구현 뿐만 아니라, 세심한 리포트와 리뷰 같은 협업 자체에도 신경을 많이 써주셔서 귀중한 경험이었습니다.

- 장수빈

  - 좋은 팀장 & 팀원분들을 만나서 많은 것을 배우고 느끼게 된 프로젝트였습니다. 자기가 맡은 일 뿐 만이 아니라 도움이 필요한 부분이 있으면 적극적으로 도움을 주고받는 과정 덕분에 원활한 협업이 진행되었던 것 같습니다. 이 프로젝트를 통해 함께 성장할 수 있는 특별한 경험을 쌓을 수 있었습니다.

- 정범환
  - 가장 모르는게 많은 제가 조장을 맡게 되었습니다. 그러나 누구 하나 빠짐없이 자신의 역할 이상을 해내려고 하여 부족한 리딩을 매꿔주고, 나아가서 자신의 맡은 기능을 최고의 완성도로 만드려는 의지가 완연하다는걸 느꼈습니다. 최고의 팀원들 덕분에 좋은 프로젝트를 경험했습니다.
