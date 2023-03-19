-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Máy chủ: localhost:3306
-- Thời gian đã tạo: Th12 15, 2022 lúc 05:06 AM
-- Phiên bản máy phục vụ: 10.4.25-MariaDB
-- Phiên bản PHP: 8.1.10

--SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
--START TRANSACTION;
--SET time_zone = "+00:00";

--
-- Cơ sở dữ liệu: hotel_booking
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng booking
--

CREATE TABLE booking (
  id int NOT NULL,
  user_id int NOT NULL,
  room_id int NOT NULL,
  transaction_date datetime NOT NULL,
  check_in_date datetime NOT NULL,
  check_out_date datetime NOT NULL,
  number_aldult tinyint NOT NULL,
  number_kid tinyint NOT NULL,
  total_amount float,
  payment varchar(100) NOT NULL,
  status tinyint NOT NULL,
  create_at datetime NULL DEFAULT NULL,
  update_at datetime NULL DEFAULT NULL
);

--
-- Đang đổ dữ liệu cho bảng booking
--

INSERT INTO booking VALUES
(1, 2, 7, '2022-12-15 05:05:36', '2022-12-15 05:05:36', '2022-12-15 05:05:36', 2, 1, 999000, 'Thanh toán bằng thẻ tín dụng', 1, NULL, NULL);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng hotel
--

CREATE TABLE hotel (
  hotel_id int NOT NULL,
  province_id int NOT NULL,
  name varchar(50),
  address varchar(100),
  description varchar(200)
);

--
-- Đang đổ dữ liệu cho bảng hotel
--

INSERT INTO hotel VALUES
(1, 1, 'Hotel 1', '19 Nguyễn Hữu Thọ, Q.7, TP Hồ Chí Minh', 'Sang xịn mịn'),
(2, 2, 'Hotel 2', '19 Nguyễn Hữu Thọ, Q.7, TP Hồ Chí Minh', 'Sang xịn mịn'),
(3, 2, 'Hotel 3', '19 Nguyễn Hữu Thọ, Q.7, TP Hồ Chí Minh', 'Sang xịn mịn'),
(4, 3, 'Hotel 4', '19 Nguyễn Hữu Thọ, Q.7, TP Hồ Chí Minh', 'Sang xịn mịn'),
(5, 3, 'Hotel 5', '19 Nguyễn Hữu Thọ, Q.7, TP Hồ Chí Minh', 'Sang xịn mịn'),
(6, 3, 'Hotel 6', '19 Nguyễn Hữu Thọ, Q.7, TP Hồ Chí Minh', 'Sang xịn mịn'),
(7, 5, 'Hotel 7', '19 Nguyễn Hữu Thọ, Q.7, TP Hồ Chí Minh', 'Sang xịn mịn'),
(8, 12, 'Hotel 8', '19 Nguyễn Hữu Thọ, Q.7, TP Hồ Chí Minh', 'Sang xịn mịn'),
(9, 42, 'Hotel 9', '19 Nguyễn Hữu Thọ, Q.7, TP Hồ Chí Minh', 'Sang xịn mịn'),
(10, 61, 'Hotel A', '19 Nguyễn Hữu Thọ, Q.7, TP Hồ Chí Minh', 'Sang xịn mịn'),
(11, 63, 'Hotel B', '19 Nguyễn Hữu Thọ, Q.7, TP Hồ Chí Minh', 'Sang xịn mịn');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng province
--

CREATE TABLE province (
  province_id int NOT NULL,
  name varchar(25),
  code char(10) NOT NULL
);

--
-- Đang đổ dữ liệu cho bảng province
--

INSERT INTO province VALUES
(1, 'An Giang', 'AG'),
(2, 'Bà Rịa-Vũng tàu', 'BV'),
(3, 'Bạc Liêu', 'BL'),
(4, 'Bắc Kạn', 'BK'),
(5, 'Bắc Giang', 'BG'),
(6, 'Bắc Ninh	', 'BN'),
(7, 'Bến Tre', 'BT'),
(8, 'Bình Dương', 'BD'),
(9, 'Bình Định', 'BĐ'),
(10, 'Bình Phước', 'BP'),
(11, 'Bình Thuận', 'BTh'),
(12, 'Cà Mau	', 'CM'),
(13, 'Cao Bằng', 'CB'),
(14, 'Cần Thơ', 'CT'),
(15, 'Đà Nẵng', 'ĐNa'),
(16, 'Đắk Lắk', 'ĐL'),
(17, 'Đắk Nông', 'ĐNo'),
(18, 'Điện Biên', 'ĐB'),
(19, 'Đồng Nai', 'ĐN'),
(20, 'Đồng Tháp', 'ĐT'),
(21, 'Gia Lai', 'GL'),
(22, 'Hà Giang', 'HG'),
(23, 'Hà Nam', 'HNA'),
(24, 'Hà Nội', 'HAN'),
(25, 'Hà Tĩnh', 'HT'),
(26, 'Hải Dương', 'HD'),
(27, 'Hải Phòng', 'HP	'),
(28, 'Hậu Giang', 'HG'),
(29, 'Hòa Bình', 'HB'),
(30, 'Thành phố Hồ Chí Minh', 'SG'),
(31, 'Hưng Yên', 'HY'),
(32, 'Khánh Hoà', 'KH'),
(33, 'Kiên Giang', 'KG'),
(34, 'Kon Tum', 'KT'),
(35, 'Lai Châu', 'LC'),
(36, 'Lạng Sơn', 'LS'),
(37, 'Lào Cai', 'LCa'),
(38, 'Lâm Đồng', 'LĐ'),
(39, 'Long An', 'LA'),
(40, 'Nam Định', 'NĐ'),
(41, 'Nghệ An', 'NA'),
(42, 'Ninh Bình', 'NB'),
(43, 'Ninh Thuận', 'NT'),
(44, 'Phú Thọ', 'PT'),
(45, 'Phú Yên', 'PY'),
(46, 'Quảng Bình', 'QB'),
(47, 'Quảng Nam', 'QNa'),
(48, 'Quảng Ngãi', 'QNg'),
(49, 'Quảng Ninh', 'QN'),
(50, 'Quảng Trị', 'QT'),
(51, 'Sóc Trăng', 'ST'),
(52, 'Sơn La', 'SL'),
(53, 'Tây Ninh', 'TN'),
(54, 'Thái Bình', 'TB'),
(55, 'Thái Nguyên', 'TNg'),
(56, 'Thanh Hoá', 'TH'),
(57, 'Thừa Thiên-Huế', 'TTH'),
(58, 'Tiền Giang', 'TG'),
(59, 'Trà Vinh', 'TV'),
(60, 'Tuyên Quang', 'TQ'),
(61, 'Vĩnh Long', 'VL'),
(62, 'Vĩnh Phúc', 'VP'),
(63, 'Yên Bái', 'YB');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng room
--

CREATE TABLE room (
  room_id int NOT NULL,
  type_id int NOT NULL,
  hotel_id int NOT NULL,
  name varchar(50),
  number int NOT NULL,
  acreage float,
  price float,
  number_adult int NOT NULL,
  number_kid int NOT NULL,
  description varchar(200),
  status tinyint NOT NULL,
  created_at datetime NULL DEFAULT NULL,
  updated_at datetime NULL DEFAULT NULL
);

--
-- Đang đổ dữ liệu cho bảng room
--

INSERT INTO room VALUES
(1, 2, 1, 'Room 1', 101, 40, 399000, 2, 1, 'Tiện nghi, thoải mái', 0, NULL, NULL),
(2, 1, 2, 'Room 2', 102, 50, 399000, 2, 1, 'Tiện nghi, thoải mái', 0, NULL, NULL),
(3, 1, 3, 'Room 3', 202, 55, 399000, 2, 1, 'Tiện nghi, thoải mái', 0, NULL, NULL),
(4, 3, 4, 'Room 4', 204, 35, 399000, 2, 1, 'Tiện nghi, thoải mái', 0, NULL, NULL),
(5, 4, 5, 'Room 5', 305, 75, 399000, 2, 1, 'Tiện nghi, thoải mái', 0, NULL, NULL),
(6, 4, 6, 'Room 6', 306, 75, 399000, 2, 1, 'Tiện nghi, thoải mái', 0, NULL, NULL),
(7, 5, 7, 'Room 7', 406, 55, 399000, 2, 1, 'Tiện nghi, thoải mái', 0, NULL, NULL),
(8, 5, 8, 'Room 8', 501, 40, 399000, 2, 1, 'Tiện nghi, thoải mái', 0, NULL, NULL),
(9, 5, 9, 'Room 9', 505, 45, 399000, 2, 1, 'Tiện nghi, thoải mái', 0, NULL, NULL);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng room_image
--

CREATE TABLE room_image (
  id int NOT NULL,
  room_id int NOT NULL,
  path varchar(200) DEFAULT NULL,
  created_at datetime NULL DEFAULT NULL,
  update_at datetime NULL DEFAULT NULL
);

--
-- Đang đổ dữ liệu cho bảng room_image
--

INSERT INTO room_image VALUES
(1, 1, 'images/room_1.png', NULL, NULL),
(2, 1, 'images/room_1.1.png', NULL, NULL),
(3, 2, 'images/room_2.png', NULL, NULL),
(4, 2, 'images/room_2.1.png', NULL, NULL),
(5, 2, 'images/room_2.2.png', NULL, NULL),
(6, 3, 'images/room_3.png', NULL, NULL),
(7, 4, 'images/room_4.png', NULL, NULL),
(8, 5, 'images/room-5.png', NULL, NULL),
(9, 5, 'images/room-5.1.png', NULL, NULL);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng room_type
--

CREATE TABLE room_type (
  type_id int NOT NULL,
  name varchar(50),
  description varchar(200) DEFAULT NULL,
  created_at datetime NULL DEFAULT NULL,
  update_at datetime NULL DEFAULT NULL
);

--
-- Đang đổ dữ liệu cho bảng room_type
--

INSERT INTO room_type VALUES
(1, 'Deluxe Family', 'NULL', NULL, NULL),
(2, 'Deluxe Twin', 'NULL', NULL, NULL),
(3, 'Deluxe Triple', 'NULL', NULL, NULL),
(4, 'Deluxe King', 'NULL', NULL, NULL),
(5, 'Executive Suite', 'NULL', NULL, NULL),
(6, 'Superior Twin', 'NULL', NULL, NULL),
(7, 'Superior Triple', 'NULL', NULL, NULL);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng service
--

CREATE TABLE service (
  service_id int NOT NULL,
  name varchar(100),
  price float,
  create_at datetime NULL DEFAULT NULL,
  update_at datetime NULL DEFAULT NULL
);

--
-- Đang đổ dữ liệu cho bảng service
--

INSERT INTO service VALUES
(1, 'Dùng bữa ăn sáng tại khách sạn', 159000, NULL, NULL),
(2, 'Xe đưa đón tại sân bay', 229000, NULL, NULL),
(3, 'Sử dụng hồ bơi', 115000, NULL, NULL),
(4, 'Dịch vụ giặt ủi quần áo', 52000, NULL, NULL),
(5, 'cho thuê xe máy tự lái', 49000, NULL, NULL),
(6, 'Giặt ủi quần áo', 52000, NULL, NULL),
(7, 'Cho thuê xe máy tự lái', 49000, NULL, NULL),
(8, 'Dịch vụ karaoke', 86000, NULL, NULL),
(9, 'Phục vụ phòng 24/24', 459000, NULL, NULL);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng service_bill
--

CREATE TABLE service_bill (
  id int NOT NULL,
  user_id int NOT NULL,
  service_id int NOT NULL,
  create_at datetime NULL DEFAULT NULL,
  update_at datetime NULL DEFAULT NULL
);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng user
--

CREATE TABLE users (
  user_id int NOT NULL,
  fullname varchar(100) DEFAULT NULL,
  sex tinyint DEFAULT NULL,
  username varchar(100) NOT NULL,
  password varchar(100) NOT NULL,
  level tinyint NOT NULL,
  email varchar(100) DEFAULT NULL,
  email_verified_at datetime NULL DEFAULT NULL,
  phone varchar(20) DEFAULT NULL,
  address varchar(100) DEFAULT NULL,
  birthday datetime DEFAULT NULL,
  nationality varchar(50) DEFAULT NULL,
  id_card varchar(30) DEFAULT NULL,
  avatar varchar(100) DEFAULT NULL,
  create_at datetime NULL DEFAULT NULL,
  update_at datetime NULL DEFAULT NULL
);

--
-- Đang đổ dữ liệu cho bảng user
--

INSERT INTO users VALUES
(1, 'admin', 0, 'admin', 'e10adc3949ba59abbe56e057f20f883e', 1, 'admin@gmail.com', NULL, '0987654321', '19 Nguyễn Hữu Tho, Q.7, TP HCM', '2022-12-12 00:00:00', 'Việt Nam', '661234567891', NULL, NULL, NULL),
(2, 'Trần Hoàng Quang Din', 0, 'din262', 'e10adc3949ba59abbe56e057f20f883e', 1, NULL, NULL, '0944217297', '25-26 Nguyễn Đình Chiểu, TP Nha Trang', '2022-12-12 00:00:00', 'Việt Nam', '661234567891', NULL, NULL, NULL),
(3, 'Nguyễn Tiến Dũng', 0, 'dung1123', 'e10adc3949ba59abbe56e057f20f883e', 2, NULL, NULL, '0792624576', '25-26 Nguyễn Đình Chiểu, TP Nha Trang', '2022-12-12 00:00:00', 'Việt Nam', '661234567891', NULL, NULL, NULL),
(4, 'Nguyễn Văn Hậu', 0, 'hau321', 'e10adc3949ba59abbe56e057f20f883e', 2, NULL, NULL, '0919381862', '25-26 Nguyễn Đình Chiểu, TP Nha Trang', '2022-12-12 00:00:00', 'Việt Nam', '661234567891', NULL, NULL, NULL),
(5, 'Đoàn Phương Nam', 0, 'haku', 'e10adc3949ba59abbe56e057f20f883e', 2, NULL, NULL, '0785783035', '25-26 Nguyễn Đình Chiểu, TP Nha Trang', '2022-12-12 00:00:00', 'Việt Nam', '661234567891', NULL, NULL, NULL),
(6, 'Lương Phan Hoàn Nhân', 0, 'nhan123', 'e10adc3949ba59abbe56e057f20f883e', 2, NULL, NULL, '0869887363', '25-26 Nguyễn Đình Chiểu, TP Nha Trang', '2022-12-12 00:00:00', 'Việt Nam', '661234567891', NULL, NULL, NULL);

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng booking
--
ALTER TABLE booking
  ADD PRIMARY KEY (id);

--
-- Chỉ mục cho bảng hotel
--
ALTER TABLE hotel
  ADD PRIMARY KEY (hotel_id);

--
-- Chỉ mục cho bảng province
--
ALTER TABLE province
  ADD PRIMARY KEY (province_id);

--
-- Chỉ mục cho bảng room
--
ALTER TABLE room
  ADD PRIMARY KEY (room_id);

--
-- Chỉ mục cho bảng room_image
--
ALTER TABLE room_image
  ADD PRIMARY KEY (id);

--
-- Chỉ mục cho bảng room_type
--
ALTER TABLE room_type
  ADD PRIMARY KEY (type_id);

--
-- Chỉ mục cho bảng service
--
ALTER TABLE service
  ADD PRIMARY KEY (service_id);

--
-- Chỉ mục cho bảng service_bill
--
ALTER TABLE service_bill
  ADD PRIMARY KEY (id);

--
-- Chỉ mục cho bảng user
--
ALTER TABLE users
  ADD PRIMARY KEY (user_id);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--


--
-- Các ràng buộc cho các bảng đã đổ
--

--
-- Các ràng buộc cho bảng booking
--
ALTER TABLE booking
  ADD CONSTRAINT FK_booking_room FOREIGN KEY (room_id) REFERENCES room (room_id);
ALTER TABLE booking
  ADD CONSTRAINT FK_booking_user FOREIGN KEY (user_id) REFERENCES users (user_id);

--
-- Các ràng buộc cho bảng hotel
--
ALTER TABLE hotel
  ADD CONSTRAINT FK_hotel_province FOREIGN KEY (province_id) REFERENCES province (province_id);

--
-- Các ràng buộc cho bảng room
--
ALTER TABLE room
  ADD CONSTRAINT FK_room_type FOREIGN KEY (type_id) REFERENCES room_type (type_id);
ALTER TABLE room
  ADD CONSTRAINT FK_room_hotel FOREIGN KEY (hotel_id) REFERENCES hotel (hotel_id);

--
-- Các ràng buộc cho bảng room_image
--
ALTER TABLE room_image
  ADD CONSTRAINT FK_roomImage_roomID FOREIGN KEY (room_id) REFERENCES room (room_id);

--
-- Các ràng buộc cho bảng service_bill
--
ALTER TABLE service_bill
  ADD CONSTRAINT FK_service_bill_service FOREIGN KEY (service_id) REFERENCES service (service_id);
ALTER TABLE service_bill
  ADD CONSTRAINT FK_service_bill_user FOREIGN KEY (user_id) REFERENCES users (user_id);
