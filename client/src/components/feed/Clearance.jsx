import React from 'react'

function Clearance() {
    return (
        <div
            className='flex flex-col text-gray-800 justify-start gap-6 w-[80%] h-[calc(100%-64px)] overflow-y-auto'
            style={{ scrollbarWidth: "none" }}
        >
            <div className='text-gray-200 text-2xl leading-none font-semibold'>Clearance</div>
        </div>
    )
}

export default Clearance