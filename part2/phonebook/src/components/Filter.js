import React from 'react'

const Filter = ({filterVal, filterData}) => {
    return(
        <div>
            Filter Shown with <input name="filter" value={filterVal} onChange={filterData} />
        </div>
    )
}

export default Filter;