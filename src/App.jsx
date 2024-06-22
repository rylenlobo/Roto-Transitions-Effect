import { useRef, useLayoutEffect, useState } from "react";
import model from "./assets/model.png"
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight } from 'lucide-react';
import { ChevronLeft } from 'lucide-react';
import data from "./data/data"


export default function App() {
    const ref = useRef(null);
    const [diameter, setDiameter] = useState(0);
    const [count, setCount] = useState(0)

    let index = count % data.length

    useLayoutEffect(() => {
        const handleDiameter = () => {
            const width = ref.current.offsetWidth;
            const height = ref.current.offsetHeight;
            const diameter = Math.floor(Math.sqrt(Math.pow(width, 2) + Math.pow(height, 2)));
            setDiameter(diameter);
            console.log(diameter, diameter * 0.7, diameter * 0.3);
        };
        handleDiameter();
        window.addEventListener("resize", handleDiameter);

        return () => window.removeEventListener("resize", handleDiameter);
    }, []);


    const handleNext = () => {
        setCount((prevCount) => (prevCount + 1))
    }

    const handlePrev = () => {
        setCount((prevCount) => prevCount === 0 ? data.length - 1 : prevCount - 1);
    }


    const quoteVariant = {
        initial: { x: -600 },
        animate: { x: 0 },
        exit: { opacity: 0, x: -600 }
    };

    const authorVariant = {
        initial: { x: 600 },
        animate: { x: 0 },
        exit: { opacity: 0, x: 600 }
    };

    const transition = {
        type: "tween",
        duration:0.6,
        ease: "easeInOut"
    }

    const discTransition = {
        type: "tween",
        duration: 1,
        ease: "easeInOut"
    }


    return (
        <>
            <div className="overflow-hidden flex flex-col justify-between items-center w-screen h-screen p-5 absolute z-50 text-stone-300 font-bebas text-4xl md:text-6xl lg:text-8xl ">
                <div className="flex justify-between items-end w-full">
                    <AnimatePresence  mode="wait" >
                        <motion.p
                            variants={quoteVariant}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                            transition={transition}
                            key={data[index].id+1}
                            style={{ textShadow: "0 0 10px #000" }}
                            className="lg:ml-12 w-1/2 lg:w-4/12 ">&quot; {data[index].quote} &quot;
                        </motion.p>
                        <motion.p
                            variants={authorVariant}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                            transition={transition}
                            key={data[index].id+2}
                            style={{ textShadow: "0 0 30px #000" }}
                            className="w-2/6 lg:w-96 md:w-1/4">{data[index].author}</motion.p>
                    </AnimatePresence>
                </div>
                <div className="flex justify-between items-end space-x-4 w-full pb-12">
                    <motion.button onClick={handlePrev} className="ml-4 rounded-full flex items-center justify-center h-16 w-16 border-2 border-slate-300">
                        <ChevronLeft size={20} strokeWidth={3} />
                    </motion.button>
                    <motion.button onClick={handleNext} className="ml-4 rounded-full flex items-center justify-center h-16 w-16 border-2 border-slate-300">
                        <ChevronRight size={20} strokeWidth={3} />
                    </motion.button>
                </div>
            </div>
            <div ref={ref} className="flex justify-center items-center h-screen w-screen overflow-hidden bg-teal-600">
                 
                <div className="relative flex justify-center items-center ">
                <AnimatePresence initial="false" mode="popLayout"  >
                    {/* Disc 1 */}
                        <motion.div
                            initial={{ filter: "blur(30px)", rotate: 40, opacity: 0 }}
                            animate={{ filter: "blur(0px)", rotate: 0, opacity: 1 }}
                            exit={{ filter: "blur(30px)", rotate:-40, opacity: 0 }}
                            transition={discTransition}
                            key={data[index].id+1}
                            id="disc1"
                            className="absolute flex-shrink-0 bg-center rounded-full bg-no-repeat "
                            style={{
                                height: `${diameter}px`,
                                width: `${diameter}px`,
                                backgroundImage: `url(${data[index].img})`,
                                backgroundSize: `${diameter}px ${diameter}px`,
                            }}
                        />
                        {/* Disc 2 */}
                        <motion.div
                            initial={{ filter: "blur(30px) ", rotate: -80, opacity: 0 }}
                            animate={{ filter: "blur(0px) brightness(0.5)", rotate: 0, opacity: 1 }}
                            exit={{ filter: "blur(30px)", rotate: 80, opacity: 0 }}
                            transition={discTransition}
                            key={data[index].id+2}
                            id="disc2"
                            className="absolute z-10 flex-shrink-0 bg-center rounded-full overflow-hidden  "
                            style={{
                                height: `${diameter * 0.7}px`,
                                width: `${diameter * 0.7}px`,
                                backgroundImage: `url(${data[index].img})`,
                                backgroundSize: `${diameter}px ${diameter}px`,
                            }}
                        />
                        {/* Disc 3 */}
                        <motion.div
                            initial={{ filter: "blur(30px)", rotate: 120, opacity: 0 }}
                            animate={{ filter: "blur(0px) ", rotate: 0, opacity: 1 }}
                            exit={{ filter: "blur(30px)", rotate: -120, opacity: 0 }}
                            transition={discTransition}
                            id="disc3"
                            key={data[index].id+3}
                            className="absolute z-10 flex-shrink-0 bg-center rounded-full bg-no-repeat "
                            style={{
                                height: `${diameter * 0.3}px`,
                                width: `${diameter * 0.3}px`,
                                backgroundImage: `url(${data[index].img})`,
                                backgroundSize: `${diameter}px ${diameter}px`,
                            }}
                        />
                    </AnimatePresence>
                    </div>
                     
            </div>
            <img src={model} className="absolute h-2/3 md:h-5/6 bottom-0 left-1/2 transform -translate-x-1/2 z-20 object-cover" />
        </>
    );
}
