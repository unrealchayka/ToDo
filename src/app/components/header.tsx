import React from 'react'

interface Props {
    className?: string
}

export const Header: React.FC<Props> = ({ className }) => {
  return (
    <div className='flex justify-between items-center w-full box-3d-shadow font-[600] bg-[var(--dark)] text-[var(--light)] px-10 py-3 rounded-2xl'>
      <span></span>
      <ul className='flex gap-5 text-[20px]'>
        <li>Home</li>
        <li>Todo</li>
        <li>Community</li>
        <li>Timer</li>
        <li>Statistics</li>
      </ul>
    </div>
)}