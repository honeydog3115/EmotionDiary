CREATE DATABASE IF NOT EXISTS emotion_diary_db default CHARACTER SET UTF8;
USE emotion_diary_db;
CREATE TABLE IF NOT EXISTS diary (
   id int NOT NULL AUTO_INCREMENT,
   date varchar(20) DEFAULT NULL,
   content varchar(500) DEFAULT NULL,
   emotionid int DEFAULT NULL,
   PRIMARY KEY (id)
 )