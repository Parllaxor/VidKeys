import MainLayout from "../layouts/MainLayout";
import Hero from "../components/Hero";
import Features from "../components/Features";
import HowItWorks from "../components/HowItWorks";
import WhyVidkeys from "../components/WhyVidkeys";

function HomePage() {
    return (
        <MainLayout>
            <Hero />
            <Features />
            <HowItWorks />
            <WhyVidkeys />
        </MainLayout>
    );
}

export default HomePage;