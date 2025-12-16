import { id } from "date-fns/locale";
import { integer, pgTable, varchar } from "drizzle-orm/pg-core";

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