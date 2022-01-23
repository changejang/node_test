# Server 
익명 게시판의 백엔드
Express / MongoDB
## Getting Stared
- Update environment variables for *local*, *development* and *production* environments (/env)
- Install project dependencies — yarn install
- launch the app — yarn *local*(env)

http://localhost:3012/api-docs

http://localhost:3012
## Directory Structure

## API
- 게시글 목록 가져오기
- 게시글 작성
- 게시글 수정
- 게시글 삭제
- 댓글 목록
- 댓글 작성
- 게시물, 댓글 알림기능

/api/board
목록 가져오기

/api/board
게시글 작성

/api/board/:boardId
게시글 수정

/api/board/:boardId
게시글 삭제

/api/board/:boardId/comment
댓글 목록

/api/board/:boardId/comment
댓글 작성

/api/board/:boardId/comment/:commentId
댓글 삭제 

# Models
