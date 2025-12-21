import React from 'react'
import { Course } from '../../_components/CourseList'
import { Skeleton } from '@/components/ui/skeleton'
import { Button } from '@/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import Link from 'next/link'

type Props = {
  loading: boolean
  courseDetail?: Course
}

function CourseChapters({ loading, courseDetail }: Props) {
  if (loading || !courseDetail || !courseDetail.chapters) {
    return (
      <div className="p-5 border-4 rounded-2xl space-y-4">
        {[1, 2, 3].map((_, i) => (
          <Skeleton key={i} className="h-12 w-full rounded-xl" />
        ))}
      </div>
    )
  }

  const chapters = courseDetail.chapters
  const completed = courseDetail.completedExercises ?? []


  const flattenIndex = (chapterIdx: number, exerciseIdx: number) => {
    let count = 0
    for (let i = 0; i < chapterIdx; i++) {
      count += chapters[i].exercises.length
    }
    return count + exerciseIdx
  }

  const completedIndexes = completed
    .map(c => {
      const chIdx = chapters.findIndex(ch => ch.chapterId === c.chapterId)
      if (chIdx === -1) return -1
      const exIdx = chapters[chIdx].exercises.findIndex(
        // @ts-ignore
        ex => ex.slug === c.exerciseId
      )
      if (exIdx === -1) return -1

      return flattenIndex(chIdx, exIdx)
    })
    .filter(i => i >= 0)

  const lastCompletedIndex =
    completedIndexes.length === 0 ? -1 : Math.max(...completedIndexes)

  const isCompleted = (chapterId: number, slug: string) =>
    completed.some(
      // @ts-ignore
      c => c.chapterId === chapterId && c.exerciseId === slug
    )

  const isEnabled = (chapterIdx: number, exerciseIdx: number) =>
    flattenIndex(chapterIdx, exerciseIdx) === lastCompletedIndex + 1


  return (
    <div className="p-5 border-4 rounded-2xl">
      {chapters.map((chapter, chIdx) => (
        <Accordion key={chapter.chapterId} type="single" collapsible>
          <AccordionItem value={`ch-${chapter.chapterId}`}>
            <AccordionTrigger className="p-3 hover:bg-zinc-800 font-game text-3xl">
              <div className="flex gap-8">
                <h2>{chIdx + 1}</h2>
                <h2>{chapter.name}</h2>
              </div>
            </AccordionTrigger>

            <AccordionContent>
              <div className="p-3 bg-zinc-800 rounded-2xl">
                {chapter.exercises.map((ex, exIdx) => {
                  const done = isCompleted(chapter.chapterId, ex.slug)
                  const enabled = isEnabled(chIdx, exIdx)

                  return (
                    <div
                      key={ex.slug}
                      className="flex items-center justify-between mb-5"
                    >
                      <div className="flex items-center gap-10">
                        <h2 className="text-2xl font-game text-yellow-500">
                          Exercise {flattenIndex(chIdx, exIdx) + 1}
                        </h2>

                        {done || enabled ? (
                          <Link
                            href={`/courses/${courseDetail.courseId}/${chapter.chapterId}/${ex.slug}`}
                          >
                            <h2 className="text-2xl font-game hover:underline cursor-pointer">
                              {ex.name}
                            </h2>
                          </Link>
                        ) : (
                          <h2 className="text-2xl font-game text-zinc-400">
                            {ex.name}
                          </h2>
                        )}
                      </div>

                      {done ? (
                        <Button
                          variant="pixel"
                          className="px-2 font-game text-xl bg-green-600 cursor-default"
                        >
                          Done
                        </Button>
                      ) : enabled ? (
                        <Button
                          variant="destructive"
                          className="px-2 font-game text-xl"
                        >
                          {ex.xp} xp
                        </Button>
                      ) : (
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="pixelDisabled"
                              className="px-2 font-game cursor-not-allowed"
                            >
                              🔒 xp
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Complete previous exercise</p>
                          </TooltipContent>
                        </Tooltip>
                      )}
                    </div>
                  )
                })}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      ))}
    </div>
  )
}

export default CourseChapters