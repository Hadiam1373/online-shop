'use client';

import { motion, useScroll, useTransform } from 'motion/react';
import { Flower2 } from 'lucide-react';

export const ScrollGear = () => {
    const { scrollYProgress } = useScroll();
    const rotate = useTransform(scrollYProgress, [0, 1], [0, 720]);

    return (
        <motion.div
            style={{ rotate }}
            className='pointer-events-none fixed -left-10 bottom-10 z-0 hidden text-primary/10 md:block lg:-left-6'
            aria-hidden
        >
            <Flower2 className='size-40 lg:size-56' strokeWidth={1} />
        </motion.div>
    );
};
