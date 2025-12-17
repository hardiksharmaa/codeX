import { Button } from '@/components/ui/button'
import React from 'react'

function CommunityHelpSection() {
  return (
    <div className='p-4 border-4 rounded-xl mt-7 flex items-center flex-col text-center'>
        <h2 className='font-game text-3xl '>Need Help?</h2>
        <p className='font-game text-2xl'>Ask questions in our community</p>
        <Button className='text-2xl font-game mt-4' variant={'pixel'}>Go to Community</Button>
    </div>
  )
}

export default CommunityHelpSection