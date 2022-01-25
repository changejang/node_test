# Server 
익명 게시판의 백엔드
Express / MongoDB
## Getting Stared
```
yarn install
yarn local
```

[Swagger](http://localhost:3012/api-docs)
## Directory Structure
```
├── README.md
├── babel.config.json
├── ecosystem.config.js
├── package.json
├── src
│   ├── app.js
│   ├── config
│   │   └── index.js
│   ├── controllers
│   │   ├── board.controller.js
│   │   ├── comment.controller.js
│   │   └── index.js
│   ├── lib
│   │   ├── async.lib.js
│   │   ├── error.lib.js
│   │   ├── index.js
│   │   ├── keyword.lib.js
│   │   └── logger.lib.js
│   ├── loaders
│   │   ├── express.loader.js
│   │   ├── index.js
│   │   └── mongoose.loader.js
│   ├── models
│   │   ├── board.model.js
│   │   ├── comment.model.js
│   │   ├── index.js
│   │   ├── keyword.model.js
│   │   └── model.js
│   ├── routes
│   │   ├── board.route.js
│   │   ├── comment.route.js
│   │   └── index.js
│   └── services
│       ├── board.service.js
│       ├── comment.service.js
│       └── index.js
├── swagger.yaml
└── yarn.lock
```
## API
- 게시글 목록 가져오기
- 게시글 작성
- 게시글 수정
- 게시글 삭제
- 댓글 목록
- 댓글 작성
- 게시물 검색 기능
- 게시물, 댓글 키둬드 알림기능

/stats
`GET` 
- 상태 확인

/api/board
`GET`
목록 가져오기

REQUEST
```javascript
http://localhost:3012/api/board?page=1&limit=1
page: Number
Limit: Number
```

RESPONSE
```javascript
Status: 200

[
  {
    "_id": "61eea2c38f2f7369d9d2d4ca",
    "boardId": "YMbYN",
    "title": "Hi ~",
    "content": "Hi!",
    "author": "Jang",
    "updatedAt": "2022-01-24T12:59:47.722Z",
    "createdAt": "2022-01-24T12:59:47.722Z",
    "__v": 0
  }
]
```

/api/board
`POST`
게시글 작성

REQUEST
```javascript
Body: 
{
  "author": "Jang",
  "content": "Hi! jang",
  "password": "qwertyuiop",
  "title": "Hi ~"
}
```
RESPONSE
```javascript
Status: 200
{
  "boardId": "SqRNr",
  "title": "Hi ~",
  "content": "Hi! jang",
  "author": "Jang",
  "_id": "61f0042d60bda73338b09ce1",
  "updatedAt": "2022-01-25T14:07:41.962Z",
  "createdAt": "2022-01-25T14:07:41.962Z",
  "__v": 0
}
```

/api/board/:boardId
`PUT`게시글 수정

Request
```javascript
BoardId
Body:
{
  "author": "Jang1",
  "content": "Hi1! jang",
  "password": "qwertyuiop",
  "title": "Hi1 ~"
}
```
Response
```javascript
Status: 200
{
  "_id": "61f00635483ee4895a2eafae",
  "boardId": "8w92M",
  "title": "Hi ~",
  "content": "Hi! jang",
  "author": "Jang",
  "updatedAt": "2022-01-25T14:16:21.488Z",
  "createdAt": "2022-01-25T14:16:21.488Z",
  "__v": 0
}
```
/api/board/:boardId
`DELETE` 게시글 삭제

Request
```javascript
BoardId

body:
{
  "password": "qwertyuiop"
}
```
Response
```javascript
Status: 200
{
  "deletedCount": 1
}
```
/api/board/search
`GET`게시물 검색

Request
```javascript
http://localhost:3012/api/board/search?keyword=Hi
Keywrod
```
Response
```[
  {
    "_id": "61eea2c38f2f7369d9d2d4ca",
    "boardId": "YMbYN",
    "title": "Hi ~",
    "content": "Hi!",
    "author": "Jang",
    "updatedAt": "2022-01-24T12:59:47.722Z",
    "createdAt": "2022-01-24T12:59:47.722Z",
    "__v": 0
  }
]
```

/api/board/:boardId/comment
`GET`댓글 목록

Request
```javascript
http://localhost:3012/api/board/eJTnr/comment?page=1&limit=1
Page: Number
Limit: Number
BoardId

```
Response
```javascript
Body
[
  {
    "_id": "61eed3b2eae996def13247d3",
    "commentId": "8lg4I",
    "content": "Hi!jang",
    "author": "Jang",
    "boardId": "eJTnr",
    "parentId": null,
    "updatedAt": "2022-01-24T16:28:34.846Z",
    "createdAt": "2022-01-24T16:28:34.846Z",
    "__v": 0
  }
]
```
/api/board/:boardId/comment
`POST`댓글 작성

Request
```javascript
BoardId,
Body:
{
  "author": "Jang",
  "content": "Hi! jang"
}
```
Response
```javascript
Status: 200
{
  "commentId": "sVJSj",
  "content": "Hi! jang",
  "author": "Jang",
  "boardId": "eJTnr",
  "parentId": null,
  "_id": "61f009b94f097d6785956c88",
  "updatedAt": "2022-01-25T14:31:21.404Z",
  "createdAt": "2022-01-25T14:31:21.404Z",
  "__v": 0
}
```
/api/board/:boardId/comment/:commentId
`POST`댓글의 댓글 작성

Request
```javascript
BoardId
CommentId
Body: 
{
  "author": "Jang",
  "content": "Hi! jang"
}
```
Response
```javascript
Status: 200
{
  "commentId": "2ap6n",
  "content": "Hi! jang",
  "author": "Jang",
  "boardId": "eJTnr",
  "parentId": "null",
  "_id": "61f00b0573492638df5bc64f",
  "updatedAt": "2022-01-25T14:36:53.343Z",
  "createdAt": "2022-01-25T14:36:53.343Z",
  "__v": 0
}
```

# 키워드 알림기능
- 글, 댓글 작성하면 키워드 알림 전송. 
- Log에 키워드와 전송해야되는 유저 리스트 작성
```
2022-01-26 00:20:50  info : Keyword: jang, Users: kim,jang
```
# Models
## Board
- boardId: String
- title: String
- content: String
- author: String
- password: String
## Comment
- commentId: String
- content: String
- author: String
- boardId: String
- parentId: String

## Keyword
- keywordId: String
- keyword: String
- users: Array
