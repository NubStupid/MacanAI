function Arena()
{
    return(
        <>
            <svg width="882" height="700" className="absolute top-0 left-0 z-0">
                {/* Horizontal line kiri ke kanan */}
                <line stroke="black" strokeWidth="2" x1="1" y1="40" x2="1" y2="360" />
                <line stroke="black" strokeWidth="2" x1="80" y1="111" x2="80" y2="289" />
                <line stroke="black" strokeWidth="2" x1="180" y1="1" x2="180" y2="400" />
                <line stroke="black" strokeWidth="2" x1="280" y1="1" x2="280" y2="400" />
                <line stroke="black" strokeWidth="2" x1="380" y1="1" x2="380" y2="400" />
                <line stroke="black" strokeWidth="2" x1="480" y1="1" x2="480" y2="400" />
                <line stroke="black" strokeWidth="2" x1="580" y1="1" x2="580" y2="400" />
                <line stroke="black" strokeWidth="2" x1="680" y1="111" x2="680" y2="289" />
                <line stroke="black" strokeWidth="2" x1="760" y1="40" x2="760" y2="360" />

                {/* Vertical line atas ke bawah */}
                <line stroke="black" strokeWidth="2" x1="180" y1="1" x2="580" y2="1" />
                <line stroke="black" strokeWidth="2" x1="180" y1="100" x2="580" y2="100" />
                <line stroke="black" strokeWidth="2" x1="0" y1="200" x2="760" y2="200" />
                <line stroke="black" strokeWidth="2" x1="180" y1="300" x2="580" y2="300" />
                <line stroke="black" strokeWidth="2" x1="180" y1="400" x2="580" y2="400" />

                {/* Diagonal line kiri ke kanan */}
                <line stroke="black" strokeWidth="2" x1="1" y1="40" x2="180" y2="200" />
                <line stroke="black" strokeWidth="2" x1="180" y1="200" x2="380" y2="400" />
                <line stroke="black" strokeWidth="2" x1="180" y1="1" x2="580" y2="400" />
                <line stroke="black" strokeWidth="2" x1="380" y1="1" x2="580" y2="200" />
                <line stroke="black" strokeWidth="2" x1="580" y1="200" x2="760" y2="360" />

                {/* Diagonal line kiri ke kanan */}
                <line stroke="black" strokeWidth="2" x1="1" y1="360" x2="180" y2="200" />
                <line stroke="black" strokeWidth="2" x1="180" y1="200" x2="380" y2="1" />
                <line stroke="black" strokeWidth="2" x1="180" y1="400" x2="580" y2="1" />
                <line stroke="black" strokeWidth="2" x1="380" y1="400" x2="580" y2="200" />
                <line stroke="black" strokeWidth="2" x1="580" y1="200" x2="760" y2="40" />
            </svg>
        </>
    )
}

export default Arena