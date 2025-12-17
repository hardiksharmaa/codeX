CREATE TABLE "courseChapters" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "courseChapters_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"chapterId" integer NOT NULL,
	"courseId" integer NOT NULL,
	"name" varchar(255) NOT NULL,
	"desc" varchar(255) NOT NULL,
	"exercises" json
);
--> statement-breakpoint
CREATE TABLE "courses" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "courses_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"courseId" integer NOT NULL,
	"title" varchar(255) NOT NULL,
	"desc" varchar(255) NOT NULL,
	"bannerImage" varchar(255) NOT NULL,
	"level" varchar(255) DEFAULT 'Beginner' NOT NULL,
	"tags" varchar(255),
	CONSTRAINT "courses_courseId_unique" UNIQUE("courseId")
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "users_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"points" integer DEFAULT 0,
	"subscription" varchar,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE UNIQUE INDEX "course_chapter_unique" ON "courseChapters" USING btree ("courseId","chapterId");