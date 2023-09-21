-- Tendency
INSERT INTO `tendency`(`id`, `name`, `initial`) VALUES ('challenging', '#도전적인', 'C');
INSERT INTO `tendency`(`id`, `name`, `initial`) VALUES ('stable', '#안정적인', 'S');
INSERT INTO `tendency`(`id`, `name`, `initial`) VALUES ('vintage', '#올드한', 'V');
INSERT INTO `tendency`(`id`, `name`, `initial`) VALUES ('mz', '#MZ한', 'M');
INSERT INTO `tendency`(`id`, `name`, `initial`) VALUES ('early', '#초반형', 'E');
INSERT INTO `tendency`(`id`, `name`, `initial`) VALUES ('lately', '#후반형', 'L');
INSERT INTO `tendency`(`id`, `name`, `initial`) VALUES ('detector', '#철거반', 'D');
INSERT INTO `tendency`(`id`, `name`, `initial`) VALUES ('killer', '#장의사', 'K');

-- Tier
INSERT INTO `tier`(`id`, `num`, `name`) VALUES ('unranked', 99, '언랭');
INSERT INTO `tier`(`id`, `num`, `name`) VALUES ('iron', 10, '아이언');
INSERT INTO `tier`(`id`, `num`, `name`) VALUES ('bronze', 9, '브론즈');
INSERT INTO `tier`(`id`, `num`, `name`) VALUES ('silver', 8, '실버');
INSERT INTO `tier`(`id`, `num`, `name`) VALUES ('gold', 7, '골드');
INSERT INTO `tier`(`id`, `num`, `name`) VALUES ('platinum', 6, '플래티넘');
INSERT INTO `tier`(`id`, `num`, `name`) VALUES ('emerald', 5, '에메랄드');
INSERT INTO `tier`(`id`, `num`, `name`) VALUES ('diamond', 4, '다이아몬드');
INSERT INTO `tier`(`id`, `num`, `name`) VALUES ('master', 3, '마스터');
INSERT INTO `tier`(`id`, `num`, `name`) VALUES ('grandmaster', 2, '그랜드마스터');
INSERT INTO `tier`(`id`, `num`, `name`) VALUES ('challengerr', 1, '챌린저');

-- Temp Member
INSERT INTO `team`(`name`, `description`, `img`) VALUES ('SSAFY 9기', ':dizzy: SSAFY 9기 모여라\nSamsung Software Academy For Youth의 9기 교육생들이 모인 소속입니다.', '1.jpg');