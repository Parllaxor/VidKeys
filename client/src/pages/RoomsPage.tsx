import AppLayout from "../layouts/AppLayout";

function RoomsPage() {
    return (
        <AppLayout>
            <div>
                <h1 className="text-3xl font-bold text-white">
                    Rooms
                </h1>

                <p className="mt-2 text-slate-400">
                    Create, customize, and explore your spaces.
                </p>
            </div>
        </AppLayout>
    );
}

export default RoomsPage;