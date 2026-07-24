function Topbar() {
    return (
        <header className="
            h-16
            border-b
            border-[#2A2E38]
            flex
            items-center
            justify-between
            px-8
        ">
            <div>
                <h1 className="text-xl font-semibold text-white">
                    Dashboard
                </h1>
            </div>

            <div className="text-slate-400">
                Welcome, Guest User
            </div>
        </header>
    );
}

export default Topbar;