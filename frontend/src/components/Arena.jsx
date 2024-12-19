function Arena()
{
    return(
        <>
            <svg width="882" height="700" className="absolute top-0 left-0 z-0">
                {/* Horizontal line kiri ke kanan */}
                <line x1="1" y1="40" x2="1" y2="360" stroke="black" strokeWidth="2" />
                <line x1="80" y1="111" x2="80" y2="289" stroke="black" strokeWidth="2" />
                <line x1="180" y1="1" x2="180" y2="400" stroke="black" strokeWidth="2" />
                <line x1="280" y1="1" x2="280" y2="400" stroke="black" strokeWidth="2" />
                <line x1="380" y1="1" x2="380" y2="400" stroke="black" strokeWidth="2" />
                <line x1="480" y1="1" x2="480" y2="400" stroke="black" strokeWidth="2" />
                <line x1="580" y1="1" x2="580" y2="400" stroke="black" strokeWidth="2" />
                <line x1="680" y1="111" x2="680" y2="289" stroke="black" strokeWidth="2" />
                <line x1="760" y1="40" x2="760" y2="360" stroke="black" strokeWidth="2" />

                {/* Vertical line atas ke bawah */}
                <line x1="180" y1="1" x2="580" y2="1" stroke="black" strokeWidth="2" />
                <line x1="180" y1="100" x2="580" y2="100" stroke="black" strokeWidth="2" />
                <line x1="0" y1="200" x2="760" y2="200" stroke="black" strokeWidth="2" />
                <line x1="180" y1="300" x2="580" y2="300" stroke="black" strokeWidth="2" />
                <line x1="180" y1="400" x2="580" y2="400" stroke="black" strokeWidth="2" />

                {/* Diagonal line kiri ke kanan */}
                <line x1="1" y1="40" x2="180" y2="200" stroke="black" strokeWidth="2" />
                <line x1="180" y1="200" x2="380" y2="400" stroke="black" strokeWidth="2" />
                <line x1="180" y1="1" x2="580" y2="400" stroke="black" strokeWidth="2" />
                <line x1="380" y1="1" x2="580" y2="200" stroke="black" strokeWidth="2" />
                <line x1="580" y1="200" x2="760" y2="360" stroke="black" strokeWidth="2" />

                {/* Diagonal line kiri ke kanan */}
                <line x1="1" y1="360" x2="180" y2="200" stroke="black" strokeWidth="2" />
                <line x1="180" y1="200" x2="380" y2="1" stroke="black" strokeWidth="2" />
                <line x1="180" y1="400" x2="580" y2="1" stroke="black" strokeWidth="2" />
                <line x1="380" y1="400" x2="580" y2="200" stroke="black" strokeWidth="2" />
                <line x1="580" y1="200" x2="760" y2="40" stroke="black" strokeWidth="2" />
            </svg>
        </>
    )
}

export default Arena