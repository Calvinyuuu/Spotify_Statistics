import { Carousel } from "@material-tailwind/react";

export function CarouselDefault({ children }) {
    return (
        <Carousel className="rounded-xl">
            {children}
        </Carousel>
    );
}