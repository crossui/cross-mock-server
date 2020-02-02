/*
 Navicat Premium Data Transfer

 Source Server         : phpmyadmin
 Source Server Type    : MySQL
 Source Server Version : 100411
 Source Host           : 127.0.0.1:3306
 Source Schema         : cross_mock_server

 Target Server Type    : MySQL
 Target Server Version : 100411
 File Encoding         : 65001

 Date: 02/02/2020 12:07:12
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for cross_interface
-- ----------------------------
DROP TABLE IF EXISTS `cross_interface`;
CREATE TABLE `cross_interface`  (
  `mockid` int(20) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '接口ID，自动生成',
  `projectid` varchar(2000) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '关联的项目ID',
  `moduleid` int(11) NOT NULL COMMENT '关联的模块ID',
  `api_name` varchar(2000) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '接口名称',
  `api_url` varchar(2000) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '接口地址',
  `api_content` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '接口响应数据',
  `api_content_desc` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL COMMENT '接口响应数据的参数描述',
  `api_header_desc` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL COMMENT '接口请求HEADER参数说明',
  `api_parms_desc` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL COMMENT '接口请求GET等表单请求参数说明',
  `api_body_desc` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL COMMENT '接口请求POST等表单请求参数说明',
  `api_type` enum('0','1','2','3','4','5') CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '接口请求类型，HTTP请求类型，0 GET,1 PUT,2 POST,3 DELETE,4 OPTIONS,5 PATCH等',
  `is_mockjs` int(1) NULL DEFAULT 0 COMMENT '接口响应数据是否使用mockjs(0开启，1关闭)',
  `api_lazy_time` int(10) NULL DEFAULT 0 COMMENT '接口响应延迟时间，单位为毫秒，默认0',
  `api_desc` varchar(2000) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '接口描述',
  `createtime` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '创建时间',
  `api_req_header` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL COMMENT '接口响应HEADER参数',
  `api_req_header_desc` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL COMMENT '接口响应HEADER参数说明',
  `api_status` enum('0','1','2','3') CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '2' COMMENT '接口状态 （0 废弃  1 已上线  2 开发中  3测试中）',
  `rcode` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '200' COMMENT '接口返回状态码',
  PRIMARY KEY (`mockid`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 25 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for cross_module
-- ----------------------------
DROP TABLE IF EXISTS `cross_module`;
CREATE TABLE `cross_module`  (
  `mid` int(11) NOT NULL AUTO_INCREMENT COMMENT '模块ID',
  `modulename` varchar(2000) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '模块名称',
  `projectid` varchar(25) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '关联项目ID',
  `createtime` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '创建时间',
  `pmid` int(11) NOT NULL DEFAULT 0 COMMENT '模块上级ID',
  PRIMARY KEY (`mid`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 38 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for cross_project
-- ----------------------------
DROP TABLE IF EXISTS `cross_project`;
CREATE TABLE `cross_project`  (
  `pid` varchar(25) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '项目ID',
  `projectname` varchar(2000) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '项目名称',
  `createtime` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '创建时间',
  PRIMARY KEY (`pid`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for cross_user
-- ----------------------------
DROP TABLE IF EXISTS `cross_user`;
CREATE TABLE `cross_user`  (
  `uid` int(11) NOT NULL AUTO_INCREMENT COMMENT '用户id',
  `account` varchar(25) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '登陆账号',
  `username` varchar(25) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '用户真实姓名',
  `password` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '密码',
  `verify` enum('1','2') CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '1=\"通过\",2=\"不通过\"',
  `createtime` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '用户创建时间',
  PRIMARY KEY (`uid`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 21 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

SET FOREIGN_KEY_CHECKS = 1;
