import React from 'react'

export const Header = () => {
  return (
    <div className='flex justify-between text-[var(--color-1)] items-center w-full box-3d-shadow font-[600] px-10 py-3 rounded-2xl'>
      <span></span>
      <ul className='flex gap-5 text-[15px] sm:text-[20px]'>
        <li>Home</li>
        <li>Todo</li>
        <li>Community</li>
        <li>Timer</li>
        <li>Statistics</li>
      </ul>
    </div>
)}