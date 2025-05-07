'use client'

import { useState } from "react";
import { Indexes } from "../shared/types";
import { MainWindow } from "./MainWindow";
import { ToDoTasks } from "../shared/constants";

export const Main = () => {
    const [data] = useState(ToDoTasks)
    const [viewAside, setViewAside] = useState<boolean>(false);
    function handleAside() {
        setViewAside(!viewAside);
        console.log(viewAside)
    };
    const [indexes, setIndexes] = useState<Indexes>({
        asidemenu: null,
        timer: null,
        cube: null,
        calendar: null
      });
      
      function clearIndexes() {
        setIndexes({
          asidemenu: 0,
          timer: null,
          cube: null,
          calendar: null
        });
      }

    const handleIndexes = (nameIndex: keyof Indexes, value: number) => {
        if (indexes[nameIndex] === value) {
            setIndexes({ ...indexes, [nameIndex]: null });
        } else {
            setIndexes({ ...indexes, [nameIndex]: value });
        }
    };

    return (
        <div className={`container m-auto relative h-[90%] mt-10`}>
            <MainWindow data={data} handleAside={handleAside} viewAside={viewAside} indexes={indexes} handleIndexes={handleIndexes} clearIndexes={clearIndexes} />
        </div>
    );
};