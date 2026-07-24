function DashboardHeader() {
    return (
        <section className="flex items-center justify-between py-8">
            <div>
                <h1 className="text-3xl font-bold text-white">
                    Welcome Back!
                </h1>

                <p className="mt-2 text-slate-400">
                    Connect with your friends and jump into a room
                </p>
            </div>
        </section>
    );
}

export default DashboardHeader;