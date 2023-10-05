-- Tendency
INSERT INTO `tendency`(`id`, `name`, `initial`) VALUES ('challenging', '#도전적인', 'C');
INSERT INTO `tendency`(`id`, `name`, `initial`) VALUES ('stable', '#안정적인', 'S');
INSERT INTO `tendency`(`id`, `name`, `initial`) VALUES ('vintage', '#올드한', 'V');
INSERT INTO `tendency`(`id`, `name`, `initial`) VALUES ('mz', '#MZ한', 'M');
INSERT INTO `tendency`(`id`, `name`, `initial`) VALUES ('early', '#초반형', 'E');
INSERT INTO `tendency`(`id`, `name`, `initial`) VALUES ('lately', '#후반형', 'L');
INSERT INTO `tendency`(`id`, `name`, `initial`) VALUES ('detector', '#철거반', 'D');
INSERT INTO `tendency`(`id`, `name`, `initial`) VALUES ('killer', '#장의사', 'K');

-- LBTI
INSERT INTO `lbti` ( `name`, `description`,`first_tendency_id`, `second_tendency_id`, `third_tendency_id`, `fourth_tendency_id`)
VALUES ('피오라', '', 'challenging', 'vintage', 'early', 'detector');
INSERT INTO `lbti` ( `name`, `description`,`first_tendency_id`, `second_tendency_id`, `third_tendency_id`, `fourth_tendency_id`)
VALUES ('올라프', '', 'challenging', 'vintage', 'early', 'killer');
INSERT INTO `lbti` ( `name`, `description`,`first_tendency_id`, `second_tendency_id`, `third_tendency_id`, `fourth_tendency_id`)
VALUES ('피오라', '', 'challenging', 'vintage', 'lately', 'detector');
INSERT INTO `lbti` ( `name`, `description`,`first_tendency_id`, `second_tendency_id`, `third_tendency_id`, `fourth_tendency_id`)
VALUES ('피오라', '', 'challenging', 'vintage', 'lately', 'killer');
INSERT INTO `lbti` ( `name`, `description`,`first_tendency_id`, `second_tendency_id`, `third_tendency_id`, `fourth_tendency_id`)
VALUES ('피오라', '', 'challenging', 'mz', 'early', 'detector');
INSERT INTO `lbti` ( `name`, `description`,`first_tendency_id`, `second_tendency_id`, `third_tendency_id`, `fourth_tendency_id`)
VALUES ('피오라', '', 'challenging', 'mz', 'early', 'killer');
INSERT INTO `lbti` ( `name`, `description`,`first_tendency_id`, `second_tendency_id`, `third_tendency_id`, `fourth_tendency_id`)
VALUES ('마스터이', '', 'challenging', 'mz', 'lately', 'detector');
INSERT INTO `lbti` ( `name`, `description`,`first_tendency_id`, `second_tendency_id`, `third_tendency_id`, `fourth_tendency_id`)
VALUES ('피오라', '', 'challenging', 'mz', 'lately', 'killer');

INSERT INTO `lbti` ( `name`, `description`,`first_tendency_id`, `second_tendency_id`, `third_tendency_id`, `fourth_tendency_id`)
VALUES ('피오라', '', 'stable', 'vintage', 'early', 'detector');
INSERT INTO `lbti` ( `name`, `description`,`first_tendency_id`, `second_tendency_id`, `third_tendency_id`, `fourth_tendency_id`)
VALUES ('카서스', '', 'stable', 'vintage', 'early', 'killer');
INSERT INTO `lbti` ( `name`, `description`,`first_tendency_id`, `second_tendency_id`, `third_tendency_id`, `fourth_tendency_id`)
VALUES ('피오라', '', 'stable', 'vintage', 'lately', 'detector');
INSERT INTO `lbti` ( `name`, `description`,`first_tendency_id`, `second_tendency_id`, `third_tendency_id`, `fourth_tendency_id`)
VALUES ('피오라', '', 'stable', 'vintage', 'lately', 'killer');
INSERT INTO `lbti` ( `name`, `description`,`first_tendency_id`, `second_tendency_id`, `third_tendency_id`, `fourth_tendency_id`)
VALUES ('피오라', '', 'stable', 'mz', 'early', 'detector');
INSERT INTO `lbti` ( `name`, `description`,`first_tendency_id`, `second_tendency_id`, `third_tendency_id`, `fourth_tendency_id`)
VALUES ('피오라', '', 'stable', 'mz', 'early', 'killer');
INSERT INTO `lbti` ( `name`, `description`,`first_tendency_id`, `second_tendency_id`, `third_tendency_id`, `fourth_tendency_id`)
VALUES ('피오라', '', 'stable', 'mz', 'lately', 'detector');
INSERT INTO `lbti` ( `name`, `description`,`first_tendency_id`, `second_tendency_id`, `third_tendency_id`, `fourth_tendency_id`)
VALUES ('피오라', '', 'stable', 'mz', 'lately', 'killer');

-- Tier
INSERT INTO `tier`(`id`, `order_num`, `name`, `img`) VALUES ('unranked', 0, '언랭', 'unranked.png');
INSERT INTO `tier`(`id`, `order_num`, `name`, `img`) VALUES ('iron', 1, '아이언', 'iron.png');
INSERT INTO `tier`(`id`, `order_num`, `name`, `img`) VALUES ('bronze', 2, '브론즈', 'bronze.png');
INSERT INTO `tier`(`id`, `order_num`, `name`, `img`) VALUES ('silver', 3, '실버', 'silver.png');
INSERT INTO `tier`(`id`, `order_num`, `name`, `img`) VALUES ('gold', 4, '골드', 'gold.png');
INSERT INTO `tier`(`id`, `order_num`, `name`, `img`) VALUES ('platinum', 5, '플래티넘', 'platinum.png');
INSERT INTO `tier`(`id`, `order_num`, `name`, `img`) VALUES ('emerald', 6, '에메랄드', 'emerald.png');
INSERT INTO `tier`(`id`, `order_num`, `name`, `img`) VALUES ('diamond', 7, '다이아몬드', 'diamond.png');
INSERT INTO `tier`(`id`, `order_num`, `name`, `img`) VALUES ('master', 8, '마스터', 'master.png');
INSERT INTO `tier`(`id`, `order_num`, `name`, `img`) VALUES ('grandmaster', 9, '그랜드마스터', 'grandmaster.png');
INSERT INTO `tier`(`id`, `order_num`, `name`, `img`) VALUES ('challenger', 10, '챌린저', 'challenger.png');

-- 1번문항
INSERT INTO `lbti_question` (`first_paragraph`, `second_paragraph`)
VALUES ('나의 사소한 실수 하나로 게임이 져가고 있다...', '우리 팀원이 화가 나 채팅으로 나에게 욕을 한다!');
INSERT INTO `lbti_answer` (`paragraph`, `score`, `lbti_question_id`, `tendency_id`)
VALUES ('나만 잘못했냐? 키보드 워리어의 힘을 보여준다.', 2, 1, 'challenging');
INSERT INTO `lbti_answer` (`paragraph`, `score`, `lbti_question_id`, `tendency_id`)
VALUES ('욕을 한 팀원이 실수할 때까지 기다렸다가 잽싸게 물음표 핑을 찍는다.', 1, 1, 'challenging');
INSERT INTO `lbti_answer` (`paragraph`, `score`, `lbti_question_id`, `tendency_id`)
VALUES ('할많하않... 그냥 열쇠 벌이라고 생각하고 게임 종료 후 리폿한다.', 1, 1, 'stable');
INSERT INTO `lbti_answer` (`paragraph`, `score`, `lbti_question_id`, `tendency_id`)
VALUES ('내가 실수한 거니까ㅠㅠ 이 기회로 실수를 하지 않도록 더 집중한다.', 2, 1, 'stable');

-- 2번문항
INSERT INTO `lbti_question` (`first_paragraph`, `second_paragraph`)
VALUES ('나의 모스트가 이번 시즌에 너프를 먹어 큰 타격이 생겼다!', '다음 큐에 나는 무슨 챔피언을 픽할까?');
INSERT INTO `lbti_answer` (`paragraph`, `score`, `lbti_question_id`, `tendency_id`)
VALUES ('장인은 도구를 탓하지 않는다! 가장 자신있는 모스트 챔피언을 픽한다.', 2, 2, 'vintage');
INSERT INTO `lbti_answer` (`paragraph`, `score`, `lbti_question_id`, `tendency_id`)
VALUES ('계획적으로 이번 시즌의 모스트 챔피언 운영법을 공부하고, 가장 자신있는 챔피언을 픽한다.', 1, 2, 'vintage');
INSERT INTO `lbti_answer` (`paragraph`, `score`, `lbti_question_id`, `tendency_id`)
VALUES ('이 챔피언은 버프를 엄청 받았네! 이번 시즌에서 가장 강해보이는 챔피언을 픽한다.', 1, 2, 'mz');
INSERT INTO `lbti_answer` (`paragraph`, `score`, `lbti_question_id`, `tendency_id`)
VALUES ('이번 메타는 이 챔프지ㅋㅋ 최근 경기에서 제일 많이 보이는 챔피언을 픽한다.', 2, 2, 'mz');

-- 3번문항
INSERT INTO `lbti_question` (`first_paragraph`, `second_paragraph`)
VALUES ('나는 바텀에서 라인전을 하는 왕귀 듀오,', '그런데 상대 이즈리얼의 에임 상태가 조금 이상하다.');
INSERT INTO `lbti_answer` (`paragraph`, `score`, `lbti_question_id`, `tendency_id`)
VALUES ('잘 굴린 눈덩이가 천 리 간다. 라인전 킬각을 노린다!', 2, 3, 'early');
INSERT INTO `lbti_answer` (`paragraph`, `score`, `lbti_question_id`, `tendency_id`)
VALUES ('얄밉게 한 대씩 때려주며 정글에게 도움을 청한다.', 1, 3, 'early');
INSERT INTO `lbti_answer` (`paragraph`, `score`, `lbti_question_id`, `tendency_id`)
VALUES ('이따 나 크면 보자... 스킬을 피해주며 입맛을 다신다.', 1, 3, 'lately');
INSERT INTO `lbti_answer` (`paragraph`, `score`, `lbti_question_id`, `tendency_id`)
VALUES ('나는 큰 그림을 본다. 타워에 허깅한 채 미니언을 받아 먹어준다.', 2, 3, 'lately');

-- 3번문항
INSERT INTO `lbti_question` (`first_paragraph`, `second_paragraph`)
VALUES ('탑에서 타워를 밀던 중 미드에서 한타가 벌어졌다.', '내가 합류해야 할까?');
INSERT INTO `lbti_answer` (`paragraph`, `score`, `lbti_question_id`, `tendency_id`)
VALUES ('롤은 원래 포탑 미는 게임이다. 포탑을 한 라인이라도 더 밀어놓는 게 맞다!', 1, 4, 'detector');
INSERT INTO `lbti_answer` (`paragraph`, `score`, `lbti_question_id`, `tendency_id`)
VALUES ('롤은 함께 하는 게임이다. 당장 우리 팀원들과 한타를 하러 간다.', 1, 4, 'killer');