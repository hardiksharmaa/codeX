import { id } from "date-fns/locale";
import { pgTable, integer, varchar, json, uniqueIndex } from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  points: integer().default(0),
  subscription: varchar()
});


export const CourseTable=pgTable("courses",{
  id:integer().primaryKey().generatedAlwaysAsIdentity(),
  courseId:integer().notNull().unique(),
  title:varchar({length:255}).notNull(),
  desc:varchar({length:255}).notNull(),
  bannerImage:varchar({length:255}).notNull(),
  level:varchar({length:255}).default("Beginner").notNull(),
  tags:varchar({length:255})
})

export const CourseChaptersTable = pgTable(
  "courseChapters",
  {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    chapterId: integer().notNull(),
    courseId: integer().notNull(),
    name: varchar({ length: 255 }).notNull(),
    desc: varchar({ length: 255 }).notNull(),
    exercises: json(),
  },
  (table) => ({
    courseChapterUnique: uniqueIndex("course_chapter_unique").on(
      table.courseId,
      table.chapterId
    ),
  })
);