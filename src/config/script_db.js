const TABLE_NAME = require("./table_names")

module.exports = `
CREATE TABLE IF NOT EXISTS ${TABLE_NAME.USER} (
    ID varchar(20) not null,
    firstName text charset utf8mb4 not null,
    lastName text charset utf8mb4 not null,
    username varchar(20) not null,
    password varchar(20) not null,
    role varchar(20) default 'SINH_VIEN',
    DoB varchar(20),
    gender varchar(10),
    email varchar(50) not null,
    phoneNumber varchar(20),
    address varchar(20),
    class varchar(20),
    created_date bigint,
    updated_date bigint,
    state boolean default true,
    primary key (ID)
);

CREATE TABLE IF NOT EXISTS ${TABLE_NAME.COURSE}(
    ID varchar(20) not null,
    courseName text charset utf8mb4,
    description text charset utf8mb4,
    privacy varchar(10),
    thumbnail text charset ut8mb4,
    created_date bigint,
    updated_date bigint,
    state boolean default true,
    primary key (ID)
);

CREATE TABLE IF NOT EXISTS ${TABLE_NAME.REF_COURSE_USER}(
    ID varchar(20) not null,
    COURSE_ID varchar(20) not null,
    USER_ID varchar(20) not null,
    state boolean default true,
    primary key (ID),
    CONSTRAINT FK_REF_COURSE FOREIGN KEY (COURSE_ID) REFERENCES ${TABLE_NAME.COURSE} (ID),
    CONSTRAINT FK_REF_USER FOREIGN KEY (USER_ID) REFERENCES ${TABLE_NAME.USER} (ID)
);

CREATE TABLE IF NOT EXISTS ${TABLE_NAME.LESSON}(
    ID varchar(20) not null,
);

CREATE TABLE IF NOT EXISTS ${TABLE_NAME.TEST}(
    ID varchar(20) not null,
    testName text charset utf8mb4,
    level varchar(10),
    duration int,
    thumbnail text charset utf8mb4,
    description text charset utf8mb4,
    privacy varchar(10),
    created_date bigint,
    updated_date bigint,
    state boolean default true,
    primary key (ID)
);

CREATE TABLE IF NOT EXISTS ${TABLE_NAME.QUESTION} (
    ID varchar(20) not null,
    testID varchar(20) not null,
    question text charset utf8mb4,
    answer text charset utf8mb4,
    correctAnswer text charset utf8mb4,
    created_date bigint,
    updated_date bigint,
    state boolean default true,
    CONSTRAINT FK_REF_TEST_QUESTION FOREIGN KEY (testID) REFERENCES ${TABLE_NAME.TEST} (ID),
    primary key (ID)
);

CREATE TABLE IF NOT EXISTS ${TABLE_NAME.REF_TEST_USER} (
    ID varchar(20) not null,
    testID varchar(20) not null,
    userID varchar(20) not null,
    result text charset utf8mb4,
    created_date bigint,
    updated_date bigint,
    state boolean default true,
    primary key (ID)
);

CREATE TABLE IF NOT EXISTS ${TABLE_NAME.BOOK} (
    ID varchar(20) not null,
    bookName text charset utf8mb4,
    description text charset utf8mb4,
    gallery text charset utf8mb4,
    created_date bigint,
    updated_date bigint,
    state boolean default true,
    primary key (ID)
);

`
