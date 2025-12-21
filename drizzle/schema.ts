import { pgTable, unique, integer, varchar, uniqueIndex, json, index, timestamp } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"



export const users = pgTable("users", {
	id: integer().primaryKey().generatedAlwaysAsIdentity({ name: "users_id_seq", startWith: 1, increment: 1, minValue: 1, maxValue: 2147483647, cache: 1 }),
	name: varchar({ length: 255 }).notNull(),
	email: varchar({ length: 255 }).notNull(),
	points: integer().default(0),
	subscription: varchar(),
}, (table) => [
	unique("users_email_unique").on(table.email),
]);

export const courses = pgTable("courses", {
	id: integer().primaryKey().generatedAlwaysAsIdentity({ name: "courses_id_seq", startWith: 1, increment: 1, minValue: 1, maxValue: 2147483647, cache: 1 }),
	courseId: integer().notNull(),
	title: varchar({ length: 255 }).notNull(),
	desc: varchar({ length: 255 }).notNull(),
	bannerImage: varchar({ length: 255 }).notNull(),
	level: varchar({ length: 255 }).default('Beginner').notNull(),
	tags: varchar({ length: 255 }),
}, (table) => [
	unique("courses_courseId_unique").on(table.courseId),
]);

export const courseChapters = pgTable("courseChapters", {
	id: integer().primaryKey().generatedAlwaysAsIdentity({ name: ""courseChapters_id_seq"", startWith: 1, increment: 1, minValue: 1, maxValue: 2147483647 }),
	courseId: integer().notNull(),
	name: varchar({ length: 255 }).notNull(),
	desc: varchar({ length: 255 }).notNull(),
	exercises: json(),
	chapterId: integer().notNull(),
}, (table) => [
	uniqueIndex("course_chapter_unique").using("btree", table.courseId.asc().nullsLast().op("int4_ops"), table.chapterId.asc().nullsLast().op("int4_ops")),
]);

export const enrollCourse = pgTable("enrollCourse", {
	id: integer().primaryKey().generatedAlwaysAsIdentity({ name: ""enrollCourse_id_seq"", startWith: 1, increment: 1, minValue: 1, maxValue: 2147483647 }),
	courseId: integer().notNull(),
	userId: varchar({ length: 255 }).notNull(),
	enrolledDate: timestamp({ mode: 'string' }).defaultNow().notNull(),
	xpEarned: integer().default(0).notNull(),
}, (table) => [
	index().using("btree", table.courseId.asc().nullsLast().op("int4_ops")),
	index().using("btree", table.userId.asc().nullsLast().op("text_ops")),
	unique("enrollCourse_userId_courseId_unique").on(table.courseId, table.userId),
]);

export const completedExercise = pgTable("completedExercise", {
	id: integer().primaryKey().generatedAlwaysAsIdentity({ name: ""completedExercise_id_seq"", startWith: 1, increment: 1, minValue: 1, maxValue: 2147483647 }),
	courseId: integer().notNull(),
	chapterId: integer().notNull(),
	exerciseId: integer().notNull(),
	userId: varchar({ length: 255 }).notNull(),
});

export const exercise = pgTable("exercise", {
	id: integer().primaryKey().generatedAlwaysAsIdentity({ name: "exercise_id_seq", startWith: 1, increment: 1, minValue: 1, maxValue: 2147483647, cache: 1 }),
	courseId: integer(),
	chapterId: integer(),
	exerciseId: varchar(),
	exercisesContent: json(),
	exerciseName: varchar(),
});
