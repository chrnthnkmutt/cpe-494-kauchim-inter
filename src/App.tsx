import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import fortunesData from './data/fortunes.json';

type Fortune = {
  number: number;
  title: string;
  type: 'Great Blessing' | 'Good Fortune' | 'Average' | 'Bad Fortune' | 'Great Misfortune';
  verse: string;
  interpretation: string;
};

const fortunes: Record<number, Fortune> = fortunesData as Record<number, Fortune>;

const defaultFortune = (number: number): Fortune => ({
  number,
  title: "The Hidden Path",
  type: "Average",
  verse: "The path ahead is shrouded in mist,\nA mystery waiting to unfold.\nWalk with a pure heart and steady step,\nAnd let your own story be told.",
  interpretation: "Your path is currently unwritten or unclear. Trust your intuition and act with integrity. The outcome depends on your own choices."
});

const FortuneCylinder = ({ isShaking, drawnNumber }: { isShaking: boolean, drawnNumber: number | null }) => {
  return (
    <div className="relative w-64 h-80 mx-auto mt-8 flex items-end justify-center">
      {/* Sticks inside */}
      <div className="absolute bottom-48 w-32 h-24 flex justify-center items-end space-x-1.5 overflow-hidden z-0">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="w-1.5 bg-bamboo-dark rounded-t-sm"
            style={{ height: `${60 + Math.random() * 40}%` }}
            animate={isShaking ? {
              y: [0, -15, 0, -20, 0],
              rotate: [0, -5, 5, -2, 2, 0]
            } : {}}
            transition={{
              duration: 0.3,
              repeat: isShaking ? Infinity : 0,
              repeatType: "reverse",
              delay: Math.random() * 0.2
            }}
          />
        ))}
      </div>

      {/* The Cylinder */}
      <motion.div
        className="relative w-40 h-64 bg-temple-red rounded-b-3xl rounded-t-xl border-4 border-temple-gold shadow-[inset_0_0_30px_rgba(0,0,0,0.6),0_10px_20px_rgba(0,0,0,0.5)] flex flex-col items-center justify-center z-10"
        animate={isShaking ? {
          rotate: [0, -8, 8, -8, 8, 0],
          y: [0, -5, 0, -5, 0]
        } : {}}
        transition={{ duration: 0.4, repeat: isShaking ? Infinity : 0 }}
      >
        <div className="w-24 h-40 border-2 border-temple-gold/40 rounded-sm flex items-center justify-center p-2">
          <span className="text-temple-gold font-serif text-4xl text-center tracking-widest drop-shadow-md" style={{ writingMode: 'vertical-rl' }}>
            求籤
          </span>
        </div>
      </motion.div>

      {/* Drawn Stick */}
      <AnimatePresence>
        {drawnNumber && !isShaking && (
          <motion.div
            initial={{ y: 0, opacity: 0, rotate: 0 }}
            animate={{ y: -220, opacity: 1, rotate: 8 }}
            exit={{ opacity: 0, y: 0, transition: { duration: 0.2 } }}
            transition={{ type: "spring", stiffness: 60, damping: 12 }}
            className="absolute bottom-32 w-8 h-56 bg-bamboo border-2 border-bamboo-dark rounded-sm z-20 shadow-2xl flex flex-col items-center justify-start pt-4"
          >
            <div className="text-temple-dark font-bold font-serif text-xl bg-temple-light/60 px-1 py-2 rounded-sm shadow-inner">
              {drawnNumber}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const FortuneDisplay = ({ fortune }: { fortune: Fortune }) => {
  const typeColors = {
    'Great Blessing': 'text-green-400',
    'Good Fortune': 'text-emerald-300',
    'Average': 'text-temple-light',
    'Bad Fortune': 'text-orange-400',
    'Great Misfortune': 'text-red-400'
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-md w-full mx-auto mt-8 p-8 bg-temple-red/20 border border-temple-gold/30 rounded-xl backdrop-blur-sm shadow-2xl text-center"
    >
      <div className="text-temple-gold text-sm font-bold tracking-widest uppercase mb-2">
        Stick No. {fortune.number}
      </div>
      <h2 className="text-3xl font-serif font-bold text-temple-light mb-1">
        {fortune.title}
      </h2>
      <div className={`text-lg font-bold mb-6 ${typeColors[fortune.type]}`}>
        {fortune.type}
      </div>
      
      <div className="relative py-6 mb-6">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-px bg-temple-gold/50"></div>
        <p className="font-serif text-lg leading-relaxed whitespace-pre-line italic text-temple-light/90">
          "{fortune.verse}"
        </p>
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-px bg-temple-gold/50"></div>
      </div>

      <div className="text-sm text-temple-light/80 leading-relaxed text-left bg-black/30 p-4 rounded-lg border border-white/5">
        <span className="font-bold text-temple-gold block mb-1">Interpretation:</span>
        {fortune.interpretation}
      </div>
    </motion.div>
  );
};

export default function App() {
  const [isShaking, setIsShaking] = useState(false);
  const [drawnNumber, setDrawnNumber] = useState<number | null>(null);
  const [showFortune, setShowFortune] = useState(false);

  const handleShake = () => {
    setIsShaking(true);
    setDrawnNumber(null);
    setShowFortune(false);

    setTimeout(() => {
      setIsShaking(false);
      // Bias towards our sample fortunes for demonstration purposes
      const sampleNumbers = [1, 25, 50, 75, 100];
      const useSample = Math.random() > 0.3; // 70% chance to get a sample fortune
      const randomNum = useSample 
        ? sampleNumbers[Math.floor(Math.random() * sampleNumbers.length)]
        : Math.floor(Math.random() * 100) + 1;
        
      setDrawnNumber(randomNum);
      setTimeout(() => {
        setShowFortune(true);
      }, 800);
    }, 2000);
  };

  const handleReset = () => {
    setDrawnNumber(null);
    setShowFortune(false);
  };

  const fortune = drawnNumber ? (fortunes[drawnNumber] || defaultFortune(drawnNumber)) : null;

  return (
    <div className="min-h-screen py-12 px-4 flex flex-col items-center">
      <div className="max-w-2xl w-full mx-auto flex flex-col items-center">
        
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-temple-gold mb-3 drop-shadow-lg">
            Kau Chim
          </h1>
          <p className="text-temple-light/70 font-serif italic">
            Seek guidance from the fortune sticks
          </p>
        </div>

        <FortuneCylinder isShaking={isShaking} drawnNumber={drawnNumber} />

        <div className="mt-12 h-16 flex items-center justify-center">
          {!showFortune ? (
            <button
              onClick={handleShake}
              disabled={isShaking}
              className={`
                px-8 py-3 rounded-full font-bold text-lg tracking-wide transition-all duration-300
                ${isShaking 
                  ? 'bg-temple-red/50 text-temple-light/50 cursor-not-allowed border border-temple-red/50' 
                  : 'bg-temple-gold text-temple-dark hover:bg-yellow-400 hover:scale-105 hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] border border-transparent'
                }
              `}
            >
              {isShaking ? 'Shaking...' : 'Shake Cylinder'}
            </button>
          ) : (
            <button
              onClick={handleReset}
              className="px-8 py-3 rounded-full font-bold text-lg tracking-wide bg-transparent border-2 border-temple-gold text-temple-gold hover:bg-temple-gold/10 transition-all duration-300"
            >
              Draw Again
            </button>
          )}
        </div>

        <AnimatePresence>
          {showFortune && fortune && (
            <FortuneDisplay fortune={fortune} />
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
