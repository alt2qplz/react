import React, {useState} from "react";
import s from './Paginator.module.css'

type Props = {
    currentPage: number
    onPageChanged: (pageNumber: number) => void
    pageSize: number
    totalUsersCount: number
}

const Paginator: React.FC<Props> = ({currentPage, onPageChanged, pageSize, totalUsersCount}) => {

    let pageCount: number = Math.ceil(totalUsersCount / pageSize);

    let pages: Array<number> = [];

    for (let i: number = 1; i <= pageCount; i++) {
        pages.push(i)
    }

    let portionSize: number = 10;

    let portionCount: number = Math.ceil(pageCount / portionSize);
    let [portionNumber, setPortionNumber] = useState(1);
    let leftPortionPageNumber: number = (portionNumber - 1) * portionSize + 1;
    let rightPortionPageNumber: number = portionNumber * portionSize;


    return <div className={`${s.pagination} white-container`}>
        {portionNumber > 1 &&
        <button onClick={() => {
            setPortionNumber(portionNumber - 1);
            onPageChanged(leftPortionPageNumber - portionSize)
        }}>PREV</button>
        }

        {pages
            .filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber)
            .map(p => {
                return <div key={p} className={`${currentPage === p && s.selected} ${s.pagination_item}`}
                            onClick={() => {
                                onPageChanged(p)
                            }}>{p}</div>
            })}


        {portionNumber < portionCount &&
        <button onClick={() => {
            setPortionNumber(portionNumber + 1);
            onPageChanged(leftPortionPageNumber + portionSize)
        }} className={s.next}>NEXT</button>
        }
    </div>
};

export default Paginator;