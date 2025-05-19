import React from 'react'
import { ModeToggle } from './theme-toggle'



export const Header = () => {
  return (
    <div className='flex w-[50%] float-end items-center font-[700] text-[20px] justify-between px-[5%] py-2'>
        <div>Logo</div>
        <nav>
            <ul className='flex gap-5'>
                <li>Home</li>
                <li>Note</li>
                <li>SigUp</li>
                <li>Contacts</li>
            </ul>
        </nav>
        <ModeToggle />
    </div>
)}