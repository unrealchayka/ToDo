'use client'

import { useState } from "react";
import { Indexes } from "../shared/types";
import { MainWindow } from "./MainWindow";

export const Main = () => {

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
        indexes[nameIndex] == value 
            ?
            setIndexes(({...indexes, [nameIndex]: null }))
            :
            setIndexes(({...indexes, [nameIndex]: value }));
    };

    return (
        <div className={`flex relative  gap-4 3xl:gap-10 h-full container m-auto`}>
            <MainWindow handleAside={handleAside} viewAside={viewAside} indexes={indexes} handleIndexes={handleIndexes} clearIndexes={clearIndexes} />
        </div>
    );
};