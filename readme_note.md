## nestjs 강의

실무에서는 lts 버전만,
15는 crypt 에서 에러

node, mysql 설치
 윈도우세 mysql은 server, workbench만 필요
 authentication 은 legacy 선택
 설정 바꾸려면 installer.reconfigure
 npm i mysql2
 node 접속시만 using password 이슈 발생시, alter user 'root'@~ identified with mysql_native_password by 'aaa';
 	구버전과 비번 형식호환 일치
 using passwd no : 패스워드 틀림, yes: 형식호환 이슈


package.json 탐색
	윈도우 환경 cross-env 환경변수 처리 모듈
	helmet, hpp : http 보안
	multer : 이미지 업로드
express 설정
	nginx 사용경우 express 환경 app.enable('trust proxy');
	express.json() json파서, req.body 에 넣어줌
	express.urlencoded({extended:true}) 폼요청을 req.body로
	app.get('*',(req,res,next)=>res.sendFile(path.join(__dirname,'public','index.html'));}); 리액트로 통제권 넘김, api 외에는
passport 인증 라이브러리 중 가장 제너럴

nestjs admin 도 있음

npm i -g @nestjs/cli
	g설치 안하려면, npx 사용해야하는데 package.json 생성 이후에 가능하므로 다른 방법을 찾아야 
nest new aNest
	npm도 yarn의 workspace등 기능 추가 됨


tsconfig.json
	esModuleInterop : true // import * as aaa from 'aaa' > import aaa from 'aaa'
	rimraf: windows에서 rm -rf  가능하도록
	e2e 엔드투엔드 테스트
	jest 유닛테스트
	supertest api한개 테스트

npm run start

hot reload 재시작 없이 적용 위함
  설치, config 생성, main.js 수정, script 명령어 교체
https://docs.nestjs.com/recipes/hot-reload
npm i --save-dev webpack-node-externals run-script-webpack-plugin webpack

서비스는 일종의 트랜잭션 단위
  재사용 목적
  분리된 부분만 테스트 용이, req res 직접제어 경우 테스트시 mock 절차가 더 필요
controller : 요청과 응답 담당
svc : 비즈니스로직

npm i --save @nestjs/config





# 참고
bcrypt로 지갑 구현 해보기
