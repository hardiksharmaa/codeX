import React from 'react'
import Image from 'next/image' 

const ExplorMoreOptions = [
    {
        id: 1,
        title: 'Quizz Pack',
        desc: 'Practice what you learned with bite-sized code challenges.',
        icon: '/tree.png'
    },
    {
        id: 2,
        title: 'Video Courses',
        desc: 'Learn with structured video lessons taught step-by-step.',
        icon: '/game.png'
    },
    {
        id: 3,
        title: 'Community Project',
        desc: 'Build real-world apps by collaborating with community.',
        icon: '/growth.png'
    },
    {
        id: 4,
        title: 'Explore Apps',
        desc: 'Explore prebuild app which you can try demo and build it.',
        icon: '/start-up.png'
    }
];

function ExploreMore() {
  return (
    <div>
        <h2 className='font-game text-3xl mt-1 mb-1'>Explore More</h2>
        <div className='grid grid-cols-2 gap-4'>
            {
                ExplorMoreOptions.map((option)=>(
                    <div key={option.id} className="
                        bg-zinc-800 
                        rounded-2xl 
                        p-3 
                        pr-1
                        flex 
                        gap-4 
                        cursor-pointer
                        hover:bg-zinc-700
                        transition-colors
                        ">
                        <Image src={option?.icon} alt={option.title} width={80} height={80}/>
                        <div>
                            <h2 className='font-game text-2xl'>{option.title}</h2>
                            <p className='font-game text-zinc-400 text-xl'>{option.desc}</p>
                        </div>
                    </div>
                ))
            }
        </div>
    </div>
  )
}

export default ExploreMore