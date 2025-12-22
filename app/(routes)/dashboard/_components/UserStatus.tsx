"use client"
import React, { use, useContext } from 'react'
import Image from 'next/image'
import { useUser } from '@clerk/nextjs'
import { UserDetailContext } from '@/context/UserDetailContext';
function UserStatus() {
    const {user}=useUser();
    const {userDetail,setUserDetail}=useContext(UserDetailContext);
  return (
    <div className='p-5 border-4 rounded-2xl'>
        <div className='flex gap-2 items-center'>
        <Image src={'/alex_walk.gif'} alt='walk' width={80} height={80}/>
        <h2 className='font-game text-2xl'>{user?.primaryEmailAddress?.emailAddress}</h2>
        </div>
        <div className='grid grid-cols-2 gap-3'>
            <div className='flex gap-2 items-center'>
                <Image src={'/star.png'} alt='star' width={25} height={25}/>
                <div>
                    <h2 className='font-game text-2xl'>{userDetail?.points}</h2>
                    <h2 className='font-game text-zinc-400 text-xl'>Total Rewards</h2>
                </div>
            </div>
            <div className='flex gap-2 items-center'>
                <Image src={'/badge.png'} alt='badge' width={35} height={35}/>
                <div>
                    <h2 className='font-game text-2xl'>3</h2>
                    <h2 className='font-game text-zinc-400 text-xl'>Badge</h2>
                </div>
            </div>
            <div className='flex gap-2 items-center'>
                <Image src={'/fire.png'} alt='fire' width={30} height={30}/>
                <div>
                    <h2 className='font-game text-2xl'>2</h2>
                    <h2 className='font-game text-zinc-400 text-xl'>Streak</h2>
                </div>
            </div>
            <div className='flex gap-2 items-center'>
                <Image src={'/star.png'} alt='star' width={25} height={25}/>
                <div>
                    <h2 className='font-game text-2xl'>{
                userDetail?.points}</h2>
                    <h2 className='font-game text-zinc-400 text-xl'>Total Rewards</h2>
                </div>
            </div>
        </div>
    </div>
  )
}

export default UserStatus