import React, {useState} from "react";
import s from './Paginator.module.css'



const Paginator = props => {
    debugger
    let pageCount = Math.ceil(props.totalUsersCount / props.pageSize);

    let pages = [];

    for (let i = 1; i <= pageCount; i++) {
        pages.push(i)
    }

    let portionSize = 10;

    let portionCount = Math.ceil(pageCount / portionSize);
    let [portionNumber, setPortionNumber] = useState(1);
    let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1;
    let rightPortionPageNumber = portionNumber * portionSize;


    return <div className={`${s.pagination} white-container`}>
        {portionNumber > 1 &&
        <button onClick={() => {
            setPortionNumber(portionNumber - 1);
            props.onPageChanged(leftPortionPageNumber - portionSize)
        }}>PREV</button>
        }

        {pages
            .filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber)
            .map(p => {
                return <div key={p} className={`${props.currentPage === p && s.selected} ${s.pagination_item}`}
                            onClick={() => {
                                props.onPageChanged(p)
                            }}>{p}</div>
            })}


        {portionNumber < portionCount &&
        <button onClick={() => {
            setPortionNumber(portionNumber + 1);
            props.onPageChanged(leftPortionPageNumber + portionSize)
        }} className={s.next}>NEXT</button>
        }
    </div>
};

export default Paginator;