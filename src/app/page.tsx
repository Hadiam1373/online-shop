import Header from '@/components/ui/shared/header/header';
import {
    ScrollProgress,
    ScrollGear,
    Hero,
    Stats,
    CategoriesSection,
    WhyUs,
    FeaturedProducts,
    FlowerKnowledge,
    ProcessSteps,
    BrandsMarquee,
    Testimonials,
    CtaBanner,
    HomeFooter,
} from './_components/home';

export default function Home() {
    return (
        <div className='relative overflow-x-clip'>
            <ScrollProgress />
            <ScrollGear />
            <Header />
            <Hero />
            <Stats />
            <CategoriesSection />
            <WhyUs />
            <FeaturedProducts />
            <FlowerKnowledge />
            <ProcessSteps />
            <BrandsMarquee />
            <Testimonials />
            <CtaBanner />
            <HomeFooter />
        </div>
    );
}
