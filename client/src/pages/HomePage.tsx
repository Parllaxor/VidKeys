import MainLayout from "../layouts/MainLayout";
import Navbar from "../components/Navbar";

function HomePage() {
    return (
        <MainLayout>
            <Navbar />

            <section
                style={{
                    textAlign: "center",
                    marginTop: "8rem",
                }}
            >
                <h1
                    style={{
                        fontSize: "4rem",
                        marginBottom: "1rem",
                    }}
                >
                    VidKeys
                </h1>

                <p
                    style={{
                        fontSize: "1.3rem",
                        maxWidth: "700px",
                        margin: "0 auto",
                    }}
                >
                    The future of communication, gaming, and collaboration.
                </p>
            </section>
        </MainLayout>
    );
}

export default HomePage;