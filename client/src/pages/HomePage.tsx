import MainLayout from "../layouts/MainLayout";
import Hero from "../components/Hero";
import Features from "../components/Features";

function HomePage() {
    return (
        <MainLayout>
            <Hero />
            <Features />
        </MainLayout>
    );
}

export default HomePage;