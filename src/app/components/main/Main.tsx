'use client'

import { useState } from "react";
import { Indexes } from "../shared/types";
import { MainWindow } from "./MainWindow";

export const Main = () => {

    const [viewAside, setViewAside] = useState<boolean>(true);
    function handleAside() {
        setViewAside(!viewAside);
        console.log(viewAside)
    };
    const [indexes, setIndexes] = useState({
        orangeIndex: 0,
        blueIndex: 0,
        greenIndex: 3,
        purpleIndex: 2
    });

    const handleIndexes = (nameIndex: keyof Indexes, value: number) => {
        setIndexes(prev => ({ ...prev, [nameIndex]: value }));
    };

    return (
        <div className={`flex relative  gap-4 3xl:gap-10 h-full container m-auto`}>
            <MainWindow handleAside={handleAside} viewAside={viewAside} indexes={indexes} handleIndexes={handleIndexes} />
        </div>
    );
};