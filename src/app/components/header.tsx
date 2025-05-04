import React from 'react'

export const Header = () => {
  return (
    <div className='flex bg-dark border border-[var(--color-8)] justify-between text-[var(--light)] items-center w-full font-[600] p-2 md:px-10 py-1 sm:py-3 rounded-2xl'>
      <span></span>
      <ul className='flex gap-1 sm:gap-5 text-[12px] sm:text-[20px]'>
        <li>Home</li>
        <li>Todo</li>
        <li>Community</li>
        <li>Timer</li>
        <li>Statistics</li>
      </ul>
    </div>
)}