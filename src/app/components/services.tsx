import ServiceCard from "./service-card";

export default function Services() {
    return(
        <div className="items-center justify-center text-center p-5 border-b-2 border-yellow-400">
            <div className="text-3xl mb-4">
                <h1>What We Do</h1>
            </div>
            <div className="md:flex md:gap-4">
                <ServiceCard icon="calendar" title="Booking" content="We connect musicians with venues to create unforgettable performances. Let us help you find the perfect gig or talent for your event." />
                <ServiceCard icon="phones" title="Studio Production" content="Professional recording and production at budget-friendly rates. We help bring your music to life with quality sound." />
                <ServiceCard icon="shirt" title="Merch" content="Custom merch production and distribution, including shirts, tote bags, and more! Let us help you design and create items that stand out." />
            </div>
        </div>
    )
}