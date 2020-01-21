/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 80018
Source Host           : localhost:3306
Source Database       : donblog

Target Server Type    : MYSQL
Target Server Version : 80018
File Encoding         : 65001

Date: 2020-01-08 14:39:18
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for posts
-- ----------------------------
DROP TABLE IF EXISTS `posts`;
CREATE TABLE `posts` (
  `ID` varchar(40) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `TITLE` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '文章标题',
  `PUB_DATE` varchar(10) NOT NULL COMMENT '文章发布时间',
  `DESCRIPTION` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '文章简要描述',
  `FILE_PATH` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '文章内容文件路径',
  `TAG_ID` varchar(40) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '分类ID',
  `TAG_NAME` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '分类名称',
  `LIKE_NUMBER` bigint(20) DEFAULT '0' COMMENT '文章被点赞数量',
  `VIEW_NUMBER` bigint(20) DEFAULT '0' COMMENT '文章被阅读数量',
  `BACK_PICTURE` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '文章背景图片显示',
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for tags
-- ----------------------------
DROP TABLE IF EXISTS `tags`;
CREATE TABLE `tags` (
  `ID` varchar(40) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `TAG_NAME` varchar(255) NOT NULL COMMENT '分类名称',
  `POST_NUMBER` int(11) DEFAULT '0' COMMENT '该tag标签下文章数量',
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


-- ----------------------------
-- Table structure for settings
-- ----------------------------
DROP TABLE IF EXISTS `settings`;
CREATE TABLE `settings` (
  `KEY_NAME` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `KEY_VALUE` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`KEY_NAME`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;