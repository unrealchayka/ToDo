import React from 'react'
export const Header = () => {
  return (
    <div className='flex justify-end mt-2 uppercase text-[var(--light)] items-center w-full font-[600]'>
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