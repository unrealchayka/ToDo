import React from 'react'
import { TaskCategory } from '../shared/types'

interface Props {
    className?: string;
    data: TaskCategory;
}

export const DertailTask: React.FC<Props> = ({ className }) => {
  return (
    <div className={className}>

    </div>
)}