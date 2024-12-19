function Menu({setRoutes})
{
    return (
        <>
            <div className="flex justify-center z-50" id="menu">
                <div className="p-32">
                    <div className="text-4xl text-blue-400 font-bold my-3">Macan AI</div>
                    <div className="flex justify-center my-3">
                        <button className="z-50 bg-blue-300 px-4 py-2 rounded-lg text-white" onClick={() => setRoutes("Play")}
                            id="playversus">Play Versus</button>
                    </div>
                    {/* <div class="flex justify-center my-3">
                        <button class="bg-blue-300 px-4 py-2 rounded-lg text-white" onclick="changePage('play')">Play AI</button>
                    </div>
                    <div class="flex justify-center my-3">
                        <button class="bg-blue-300 px-4 py-2 rounded-lg text-white" onclick="changePage('play')">Play AI as Macan</button>
                    </div>
                    <div class="flex justify-center my-3">
                        <button class="bg-blue-300 px-4 py-2 rounded-lg text-white" onclick="changePage('play')">Play AI vs AI</button>
                    </div> */}
                </div>
            </div>
        </>
    )
}

export default Menu