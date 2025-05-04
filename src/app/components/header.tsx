import React from 'react'
import Image from 'next/image'
export const Header = () => {
  return (
    <div className='flex justify-between text-[var(--light)] items-center w-full font-[600]'>
      <span><Image src='svg/note.svg' width={80} height={0} alt='note' /></span>
      <ul className='flex gap-1 sm:gap-5 text-[12px] sm:text-[20px]'>
        <li>Home</li>
        <li>Todo</li>
        <li>Community</li>
        <li>Timer</li>
        <li>Statistics</li>
      </ul>
    </div>
  )
}