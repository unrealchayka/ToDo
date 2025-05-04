export interface Props {
    className?: string;
}

export interface Indexes {
    orangeIndex: number;
    blueIndex: number;
    greenIndex: number;
    purpleIndex: number;
}

export interface AsideProps {
    indexes: Indexes;
    handleIndexes: (nameIndex: keyof Indexes, value: number) => void;
    viewAside?: boolean;
    handleAside?: () => void;
}

export interface AsideWindows {
    handleAside?: () => void;
}

export interface MainWindowProps {
    handleAside?: () => void;
    viewAside: boolean;
    sizeWindowBool?: boolean;
    indexes: Indexes;
    handleIndexes: (nameIndex: keyof Indexes, value: number) => void;

}
