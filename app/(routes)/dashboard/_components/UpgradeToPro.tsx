import React from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
function UpgradeToPro() {
  return (
    <div className='flex items-center flex-col p-5 border-4 rounded-2xl mt-7'> 
        <Image src={'/logo.png'} alt='' width={70} height={70}/>
        <h2 className='font-game text-3xl'>Upgrade to Pro</h2>
        <p className='font-game text-zinc-400 text-xl text-center mb-3'>Be a Pro and Get All course access</p>
        <Link href={'/pricing'}>
            <Button variant={'pixel'} size={'lg'} className='font-game text-xl cursor-pointer'>Upgrade</Button>
        </Link>
    </div>
  )
}

export default UpgradeToPro