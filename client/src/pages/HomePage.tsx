import MainLayout from "../layouts/MainLayout";
import Hero from "../components/Hero";
import Features from "../components/Features";
import HowItWorks from "../components/HowItWorks";
import WhyVidkeys from "../components/WhyVidkeys";
import Story from "../components/Story";
import CTA from "../components/CTA";

function HomePage() {
    return (
        <MainLayout>
            <Hero />
            <Features />
            <HowItWorks />
            <WhyVidkeys />
            <Story />
            <CTA />
        </MainLayout>
    );
}

export default HomePage;