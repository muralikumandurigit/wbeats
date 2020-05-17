-- Cleanup
use mysql;
drop user 'wbeats'@'localhost' cascade;

-- User Creation
create user 'wbeats'@'localhost' identified by 'wbeats';
alter user 'wbeats'@'localhost' identified with mysql_native_password by 'wbeats';

create database wbeats;
grant create, select, insert, update, delete, drop on wbeats.* to 'wbeats'@'localhost';


drop table student_admissions;
create table student_admissions(admission_id int NOT NULL AUTO_INCREMENT,
                        student_id int,
                        admission_date date,
                        leaving_date date,
                        status_code int,
                        comments varchar(2048),
                        previous_admission_id int,
                        PRIMARY KEY(admission_id)
                        );
                        
drop table classes;
create table classes(class_id int NOT NULL AUTO_INCREMENT,
                     class_name varchar(15),
                     PRIMARY KEY(class_id)
                     );
                     
drop table status_codes;
create table status_codes(status_code int NOT NULL AUTO_INCREMENT,
                          description varchar(20),
                          PRIMARY KEY(status_code));
                          
drop table academic_year;
create table academic_year(academic_id int NOT NULL AUTO_INCREMENT,
                           academic_code varchar(20),
                           start_date date,
                           end_date date,
                           PRIMARY KEY(academic_id));
                      
drop table sections;                          
create table sections(section_id int NOT NULL AUTO_INCREMENT,
                      class_id int,
                      academic_id int,
                      section_name varchar(20),
                      PRIMARY KEY(section_id));
                      
drop table students;
create table students(student_id int NOT NULL AUTO_INCREMENT,
                      first_name varchar(50),
                      middle_name varchar(50),
                      last_name varchar(50),
                      dob date,
                      father_name varchar(75),
                      mother_name varchar(75),
                      guardian_name varchar(75),
                      comments varchar(1000),
					  start_date date,
					  end_date date,
                      status_code int,
                      PRIMARY KEY (student_id));
     
drop table staff_admissions;                 
create table staff_admissions(staff_id int NOT NULL AUTO_INCREMENT,
                        first_name varchar(100),
                        middle_name varchar(100),
                        last_name varchar(100),
                        date_of_birth date,
                        joining_date date,
                        relieving_date date,
                        status_code int,
                        comments varchar(2048),
						designation_id int,
                        PRIMARY KEY(staff_id)
                        );
  
drop table designations;                      
create table designations(designation_id int NOT NULL AUTO_INCREMENT,
                          designation_name varchar(50),
                          PRIMARY KEY(designation_id));
 
drop table secion_teachers;                         
create table secion_teachers(section_id int, staff_id int);

drop table users;
create table users(uid varchar(50), 
                   passwd varchar(500), 
				   first_name varchar(100),
                   middle_name varchar(100),
                   last_name varchar(100),
				   status varchar(15), 
				   comments varchar(1024), 
				   start_date date, 
				   end_date date, 
				   user_type varchar(50));

revoke create, drop on wbeats.* from  'wbeats'@'localhost' ;


