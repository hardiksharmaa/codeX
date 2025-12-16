import React from 'react'
import Image from 'next/image'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
function InviteFriend() {
  return (
    <div className='flex flex-col items-center gap-2 mt-8 p-4 border rounded-xl'>
        <Image src={'/mail.png'} alt='mail' width={50} height={50}/>
        <h2 className='font-game text-3xl'>Invite Friend</h2>
        <p className='font-game text-xl'>Having Fun? Share it with your friends! Enter an email and we will send them a personal invite</p>
        <div className='flex items-center gap-3'>
            <Input placeholder='Enter Invitee Email' className='min-w-sm '/>
            <Button variant={'pixel'} size={'lg'} className='font-game p-3 text-xl cursor-pointer'>Invite</Button>
        </div>
    </div>
  )
}

export default InviteFriend