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

log 찍지 않아도 경우 별로 자동로그 방법은?

모니터링만 이 목적이라면 datadog, 센트리 같은 외부로 보내기

npm i cookie-parser export-session passport

ConfigModule.forRoot에 isGlobal: true를 하면 전역 설정이 됨

//ctrl-svc-repository-entity

네스트는 모듈중심
싱글코어 중심 스케일링 서비스 인프라를 추천

nest g mo users
nest g mo workspaces 
nest g mo dms
nest g s users
nest g co users
nest g s dms
nest g co dms
nest g co channels
nest g s channels
nest g co workspaces
nest g s workspaces

nest g co channels

네이밍은 닷으로
export default 지양, 인터페이스보다 클래스, 클래스는 자바스크립트로 남음, 인터페이스는 타입스크립트에서만 잠시 있음

api 고치기 어려움
자바스크립트에서 typeof null === 'null' 이어야 했다

익스프레스는 api문서 자동화 부재
npm install --save @nestjs/swagger swagger-ui-express

res.locals.jwt 익스프레스에서 공유 변수

인터셉터 > 미들웨어에 적합
//리턴 형태 컨트롤 등

스칼라형 코드
https://rxjs.dev/api/operators/map

에러캐칭은 인터셉터 보다 인셉션 필터로 하길 추천

참고 이미 만들어진 테이블 sequelize 에서는 sequelize-auto

typeorm-model-generator
db > code

npm i typeorm-model-generator -D --save
npx typeorm-model-generator -h localhost -d slack_back -u scott -x tiger -e mysql
src 밖에 생성된 output.entities src 안으로, ormconfig.json tsconfig.json 은 위치 유지

엔티티 파일에서 name:실제 db 컬럼명, 실제 테이블과 다를 경우 매칭이 유리
1:n 에서 @JoinColumn은 n에 속하는 테이블에만 @JoinColumn([{name:'fk정보', referencedColumnName:'상대텡블컬럼명'}])
m:n은 1:m, 1:n 으로 분리가능

가상의 컬럼 구분 앞 대문자 등으로

manyToMany 는 @JoinTable 임, 두 테이블 중 어디에나 하나만 넣으면 됨

자동 날짜 넣어주는 컬럼
@CreateDataColumn()
@UpdateDataColumn()
@DeleteDataColumn() - 복원대비 소프트딜리트
한 번에 종속관계 테이블 수정시 cascade:['upate']

테이블 리뷰, create table ddl 을 붙여 넣음
erdcloud.com

entity를 바로 dto로 쓸 수 있고, 그럴 경우 swagger 데코레이터 entity에 기입

swagger
https://docs.nestjs.com/openapi/introduction
@ApiProperty
@ApiOperation
@ApiTags
@ApiResponse

nest g resource

npm install --save @nestjs/typeorm typeorm@0.2 mysql2

autoLoadEntities는 typeormmodule forFeature 

app.module 에서 entities 불러오는 3가지 방법
entities: ['entities/*.js'],
entities: [ChannelChats],
autoLoadEntities: true,

ormconfig.ts > package.json 같은 레벨에 위치할 것
	핫리로드 keepconnectionalive 옵션 true
	logging true

typeorm 로우쿼리
	getManager 임포트

db관련 커맨드 cli로 실행시 (sync true 하지 않고)
npm run schema:sync
	 "schema:sync": "ts-node ./node_modules/typeorm/cli.js schema:sync",

더미 데이터 넣기
	typeorm seeding - faker 내장되어 있음, faker
	npm i typeorm-seeding
	npm i -D ts-node
	npm run seed:run
		"seed:run": "ts-node ./node_modules/typeorm-seeding/dist/cli.js seed",

마이그레이션
	npx typeorm migration:create -n categoryToType
	npx typeorm migration:generate -n categoryToType
	"db:migrate:revert": "npm run typeorm migration:revert",

entities 로 부터 dto 추출
https://docs.nestjs.com/openapi/mapped-types#pick
	partial, PickType, omittype, 혼합도 가능
	or
	export class UpdateCatDto extends PartialType(CreateCatDto) {}

npm i bcrypt --save

밸리데이션 방법
1.서비스에서 throw Error, 인터셉터
async 에서 throw nes Error 은 node 가 죽지 않음
로그인시 그럴 경우 return undefined 200 ok 가 되므로 주의
http 400 에러 throw 해도 마찬가지
	controller await => svc 연결
	exception filter 인터셉터 적용
	throw new BadRequestException('') => 400
	throw new Unauthorized('') => 401

2.클래스 밸리데이터 (throw 자동)
	https://docs.nestjs.com/pipes#class-validator
	npm i --save class-validator class-transformer
	dto 데코레이터 추가, main.ts 추가 pipe 추가 = express-validator, joi 같은 기능
	메시지 수정 필요시, http-exception.filter 에 조건으로 포매팅 설정 함

선후 관계 참고
https://docs.nestjs.com/faq/request-lifecycle
https://slides.com/yariv-gilad/nest-js-request-lifecycle/fullscreen#/1
middleware, guards,interceptors, pipes, controller, interceptors
	미들웨어 최상위 에러시 하위로 전행 x
	미들웨어 다음은 guards가 실행
	interceptor는 전과 후 실행

guard 인증
현재 소스는 세션기반 인증
guard, 401 403 err, 가장먼저 실행, 권한 검증
npm i @nestjs/passport --save
npm i passport passport-local --save
auth.guard(implements CanActivate), strategy, serializer, service 코드 구현
컨트롤러 @UseGuard(Custom) 데코레이터
auth 모듈생성 (서비스는 해당 모듈에 묶어서)
module에 session:true 세션기반, jwt 토큰기반은 session:false
@Injectable은 모두 provider 로 입력
	특정 정보 빼고 리턴 팁
			{pw, ...etc}=user;
				delete user.pw
local-auth.guard = 노드 passport authtification 같은 역할
strategy에서 done 되면 req 처리로 넘어가게 됨
db는 findoneorfail 매서드를 사용, then과 catch 사용할 것
실행순서 guard-strategy-serializer ( 요청하면 deserializer 함수)

select false 해당하는 정보를 불러올 때는
const user = await this.usersRepository.findOne({
      where: { email },
      select: ['id', 'email', 'password'],
    });

mocking 쉽게 하기위해
	ctrl > svc > repo > entity 각 레벨 1단계만 할 것

연관 테이블 정보 가져오기
 {
    select: ['id', 'email', 'nickname'],
    relations: ['Workspaces'],
        },

연관정보 join 으로도 읽기는 가능하나, 차라리 쿼리빌더가 나음

트랜잭셔널 처리
https://orkhan.gitbook.io/typeorm/docs/transactions
 공식문서는 쿼리러너 추천, 데코레이터패턴 비추 테스트 등 어려움
 쿼리러너를 통해 레포를 호출해야 함
 await queryRunner.manager.getRepository(Users).save({})





# 참고
bcrypt로 지갑 구현 해보기
react nest 라이브러리?
code-deploy 사용검토
nest-js amdin
nest jwt securly
