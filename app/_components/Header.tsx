"use client";

import React from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu"
import { UserButton, useUser } from '@clerk/nextjs'
import { useParams, usePathname } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';

const courses = [
  {
    id: 1,
    name: 'HTML',
    desc: 'Learn the fundamentals of HTML and build the structure of modern web pages.',
    path: '/courses/2',
    available: true,
  },
  {
    id: 2,
    name: 'CSS',
    desc: 'Master CSS to style and design responsive, visually appealing web layouts.',
    path: '/courses/3',
    available: true,
  },
  {
    id: 3,
    name: 'React',
    desc: 'Build dynamic and interactive web applications using the React JavaScript library.',
    path: '/courses/1',
    available: true,
  },
  {
    id: 4,
    name: 'React Advanced',
    desc: 'Deep dive into advanced React concepts including hooks, state management, performance optimization, and architectural patterns.',
    available: false,
  },
  {
    id: 5,
    name: 'Python',
    desc: 'Learn Python programming from basics to intermediate level.',
    path: '/courses/4',
    available: true,
  },
  {
    id: 6,
    name: 'Python Advanced',
    desc: 'Master advanced Python concepts such as OOP, APIs, and automation.',
    available: false,
  },
  {
    id: 7,
    name: 'Generative AI',
    desc: 'Explore prompt engineering, LLMs, embeddings, and GenAI apps.',
    available: false,
  },
  {
    id: 8,
    name: 'Machine Learning',
    desc: 'Understand ML concepts, algorithms, training, and deployment.',
    available: false,
  },
  {
    id: 9,
    name: 'JavaScript',
    desc: 'Learn core JavaScript concepts and modern ES6+ features.',
    available: false,
  },
];

export function Header() {
  const { user, isLoaded, isSignedIn } = useUser();
  const path=usePathname();
  const {exerciseslug, courseId}=useParams();
  return (
    <div className='p-4 max-w-7xl flex justify-between items-center w-full'>
      <div className='flex gap-6 items-center '>
        {exerciseslug && courseId && (
          <Link 
            href={`/courses/${courseId}`} 
            className='flex items-center cursor-pointer hover:opacity-90 transition border border-zinc-500 rounded-xl p-1'
          >
            <ArrowLeft className='w-6 h-6 mx-3 text-yellow-500' />
          </Link>
        )}
        <Link href='/' className='flex gap-2 items-center cursor-pointer hover:opacity-90 transition'>
          <Image src={'/logo.png'} alt='logo' width={40} height={40}/>
          <h2 className='font-game font-bold text-4xl'>codeX</h2>
        </Link>
      </div>  
      {!exerciseslug ? <NavigationMenu>
      <NavigationMenuList className='gap-8'>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Courses</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid md:grid-cols-2 gap-2 sm:w-[400px] md:w-[500px] lg:w-[600px]">
        {courses.map((course) =>
          course.available ? (
            <Link
              key={course.id}
              href={course.path!}
              className="block"
            >
              <div className="p-3 hover:bg-accent rounded-xl cursor-pointer transition">
                <h2 className="font-medium">{course.name}</h2>
                <p className="text-sm text-gray-400">{course.desc}</p>
              </div>
            </Link>
          ) : (
            <div
              key={course.id}
              className="p-3 rounded-xl bg-zinc-900 border border-zinc-800 opacity-70 cursor-not-allowed relative"
            >
              <div className="absolute top-2 right-2 text-xs bg-yellow-500 text-black px-2 py-0.5 rounded-full font-game">
                Coming Soon
              </div>
              <h2 className="font-medium text-zinc-300">{course.name}</h2>
              <p className="text-sm text-zinc-500">{course.desc}</p>
            </div>
                )
              )}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link href={'/'}>Projects</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link href={'/pricing'}>Pricing</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link href={'/contact-us'}>Contact Us</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
      </NavigationMenu>:
      <h2 className="font-game text-3xl">{exerciseslug?.toString().replaceAll('-',' ').toLocaleUpperCase()}</h2>
      }
      {!isLoaded ? null : !isSignedIn ? (
        <Link href="/sign-in">
          <Button className="font-game text-2xl cursor-pointer" variant="pixel">
            Sign up
          </Button>
        </Link>
        ) : (
        <div className="flex gap-4 items-center">
          <Link href="/dashboard">
          <Button className="font-game text-2xl cursor-pointer" variant="pixel">
            Dashboard
          </Button>
          </Link>
          <UserButton />
        </div>
        )}
     </div>
  )
}