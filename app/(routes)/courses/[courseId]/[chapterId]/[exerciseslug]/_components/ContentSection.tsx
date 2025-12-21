import React from 'react'
import { CourseExercise } from '../page';
import { Skeleton } from '@/components/ui/skeleton';
import { ClipboardList, Lightbulb } from 'lucide-react';

type Props={
  courseExerciseData:CourseExercise | undefined;
  loading:boolean;
}

function ContentSection({courseExerciseData, loading}:Props) {
  return (
    <div className='p-4 pt-2 w-full max-w-full overflow-x-hidden wrap-break-word'>
      {loading || courseExerciseData==undefined ?
        <Skeleton className='h-full w-full m-10 rounded-2xl'/>
        :
        <div>
          <h2 className='font-game text-2xl px-5 text-yellow-500'>{courseExerciseData?.exerciseResult.exerciseName}</h2>
          <div className="prose prose-invert max-w-none 
             wrap-break-word 
             [&_pre]:overflow-x-auto 
             [&_pre]:max-w-full
             [&_code]:break-all" dangerouslySetInnerHTML={{__html:courseExerciseData?.exerciseResult.exercisesContent?.content
          }}/>
         <div>
          <h2 className='font-game text-3xl mt-2 px-5 flex items-center gap-1'>Task <ClipboardList/></h2>
          <div className="prose prose-invert max-w-none 
             wrap-break-word 
             [&_pre]:overflow-x-auto 
             [&_pre]:max-w-full
             [&_code]:break-all px-3 border rounded-2xl bg-zinc-800" dangerouslySetInnerHTML={{__html:courseExerciseData?.exerciseResult.exercisesContent?.task}}/>
         </div>
         <div>
          <h2 className='font-game text-3xl mt-2 px-5 flex items-center gap-1 text-yellow-500'
          >Hint <Lightbulb/></h2>
          <div className="prose prose-invert max-w-none 
             wrap-break-word 
             [&_pre]:overflow-x-auto 
             [&_pre]:max-w-full
             [&_code]:break-all px-3 border rounded-2xl bg-zinc-800" dangerouslySetInnerHTML={{__html:courseExerciseData?.exerciseResult.exercisesContent?.hint}}/>
         </div>
        </div>
      }
    </div>
  )
}

export default ContentSection