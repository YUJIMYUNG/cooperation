-- Member 테이블 생성
CREATE TABLE member (
  member_idx BIGINT NOT NULL AUTO_INCREMENT COMMENT '멤버 인덱스',
  member_id VARCHAR(20) NOT NULL COMMENT '멤버의 아이디',
  member_nickname VARCHAR(20) NOT NULL COMMENT '닉네임',
  member_email VARCHAR(50) NOT NULL COMMENT '이메일',
  member_password VARCHAR(255) NOT NULL COMMENT '비밀번호',
  role VARCHAR(10) NOT NULL DEFAULT 'USER' COMMENT '보안 역할',
  member_color VARCHAR(10) NOT NULL DEFAULT 'GRAY' COMMENT '색깔', 
  PRIMARY KEY (member_idx),
  CONSTRAINT UQ_member_id UNIQUE (member_id),
  CONSTRAINT UQ_member_nickname UNIQUE (member_nickname),
  CONSTRAINT UQ_member_email UNIQUE (member_email)
) COMMENT '멤버 정보';

-- Project 테이블 생성
CREATE TABLE project (
  project_idx BIGINT NOT NULL AUTO_INCREMENT COMMENT '프로젝트 ID',
  project_name VARCHAR(100) NOT NULL COMMENT '제목',
  member_idx BIGINT NOT NULL COMMENT '만든이',
  project_description VARCHAR(100) NOT NULL COMMENT '설명, 내용',
  project_start_date DATE NOT NULL COMMENT '시작날',
  project_end_date DATE NOT NULL COMMENT '끝나는날',
  PRIMARY KEY (project_idx),
  CONSTRAINT FK_member_TO_project 
    FOREIGN KEY (member_idx) REFERENCES member (member_idx)
    ON DELETE CASCADE
    ON UPDATE CASCADE
) COMMENT '프로젝트 정보';

-- Project_Member 테이블 생성
CREATE TABLE project_member (
  member_idx BIGINT NOT NULL COMMENT '멤버 인덱스',
  project_idx BIGINT NOT NULL COMMENT '프로젝트 ID',
  PRIMARY KEY (member_idx, project_idx),
  CONSTRAINT FK_member_TO_project_member 
    FOREIGN KEY (member_idx) REFERENCES member (member_idx)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT FK_project_TO_project_member 
    FOREIGN KEY (project_idx) REFERENCES project (project_idx)
    ON DELETE CASCADE
    ON UPDATE CASCADE
) COMMENT '프로젝트 멤버 관계';

-- Task 테이블 생성
CREATE TABLE task (
  task_idx BIGINT NOT NULL AUTO_INCREMENT COMMENT '작업 ID',
  task_name VARCHAR(50) NOT NULL COMMENT '작업 이름',
  task_description VARCHAR(100) NOT NULL COMMENT '작업 설명',
  project_idx BIGINT NOT NULL COMMENT '프로젝트 ID',
  priority VARCHAR(50) NOT NULL COMMENT '우선순위',
  status VARCHAR(11) NOT NULL COMMENT '진행 상태',
  start_date DATE NOT NULL COMMENT '시작일',
  end_date DATE NOT NULL COMMENT '종료일',
  assigned_to BIGINT NOT NULL COMMENT '작업자',
  PRIMARY KEY (task_idx),
  CONSTRAINT FK_project_TO_task 
    FOREIGN KEY (project_idx) REFERENCES project (project_idx)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT FK_member_TO_task 
    FOREIGN KEY (assigned_to) REFERENCES member (member_idx)
    ON DELETE CASCADE
    ON UPDATE CASCADE
) COMMENT '작업 정보';


INSERT INTO member (member_id, member_nickname, member_email, member_password, role, member_color) VALUES
('user1', '홍길동', 'user1@example.com', '$2a$10$qmYX0ryFSSpkVdyAwtHJB.XDoPPZOBcNRInVB5yBYWR0UHgaEALsm', 'ADMIN', 'black'),
('user2', '김철수', 'user2@example.com', '$2a$10$qmYX0ryFSSpkVdyAwtHJB.XDoPPZOBcNRInVB5yBYWR0UHgaEALsm', 'USER', 'blue'),
('user3', '이영희', 'user3@example.com', '$2a$10$qmYX0ryFSSpkVdyAwtHJB.XDoPPZOBcNRInVB5yBYWR0UHgaEALsm', 'USER', 'green'),
('user4', '박민수', 'user4@example.com', '$2a$10$qmYX0ryFSSpkVdyAwtHJB.XDoPPZOBcNRInVB5yBYWR0UHgaEALsm', 'USER','yellow'),
('user5', '최유나', 'user5@example.com', '$2a$10$qmYX0ryFSSpkVdyAwtHJB.XDoPPZOBcNRInVB5yBYWR0UHgaEALsm', 'ADMIN','red');

-- 참고: 모든 사용자의 비밀번호는 'test123'입니다.
-- 프로젝트 테스트 데이터 삽입
INSERT INTO project (project_name, member_idx, project_description, project_start_date, project_end_date) VALUES
('웹 개발 프로젝트', 1, '새로운 웹 애플리케이션 개발', '2023-01-01', '2023-06-30'),
('모바일 앱 개발', 2, 'iOS 및 Android 앱 개발', '2023-02-15', '2023-08-31'),
('데이터 분석 프로젝트', 3, '고객 데이터 분석 및 인사이트 도출', '2023-03-01', '2023-09-30'),
('UI/UX 개선 프로젝트', 4, '기존 제품의 사용자 경험 개선', '2023-04-01', '2023-10-31'),
('보안 강화 프로젝트', 5, '시스템 보안 취약점 분석 및 개선', '2023-05-01', '2023-11-30');

-- Project_Member 테스트 데이터 삽입
INSERT INTO project_member (member_idx, project_idx) VALUES
(1, 1), (2, 1), (3, 1),
(2, 2), (3, 2), (4, 2),
(3, 3), (4, 3), (5, 3),
(1, 4), (4, 4), (5, 4),
(1, 5), (2, 5), (5, 5);

-- Task 테스트 데이터 삽입
INSERT INTO task (task_name, task_description, project_idx, priority, status, start_date, end_date, assigned_to) VALUES
('요구사항 분석', '프로젝트 요구사항 수집 및 분석', 1, 'HIGH', 'TODO', '2023-01-01', '2023-01-15', 1),
('데이터베이스 설계', 'ERD 작성 및 데이터베이스 스키마 설계', 1, 'HIGH', 'IN_PROGRESS', '2023-01-16', '2023-01-31', 2),
('UI 디자인', '사용자 인터페이스 디자인 및 프로토타입 제작', 2, 'MEDIUM', 'TODO', '2023-02-15', '2023-03-15', 3),
('백엔드 개발', 'RESTful API 개발', 2, 'HIGH', 'TODO', '2023-03-01', '2023-04-30', 4),
('데이터 수집', '분석에 필요한 데이터 수집 및 전처리', 3, 'HIGH', 'IN_PROGRESS', '2023-03-01', '2023-03-31', 5);

