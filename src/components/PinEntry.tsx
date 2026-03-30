import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, AlertCircle, ArrowLeft } from "lucide-react";

interface PinEntryProps {
  correctPin: string;
  onSuccess: () => void;
  onBack: () => void;
}

const PinEntry = ({ correctPin, onSuccess, onBack }: PinEntryProps) => {
  const [pin, setPin] = useState(["", "", "", ""]);
  const [error, setError] = useState(false);
  const [shake, setShake] = useState(false);
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;

    const newPin = [...pin];
    newPin[index] = value.slice(-1);
    setPin(newPin);
    setError(false);

    if (value && index < 3) {
      inputsRef.current[index + 1]?.focus();
    }

    const full = newPin.join("");
    if (full.length === 4) {
      if (full === correctPin) {
        setTimeout(() => onSuccess(), 150);
      } else {
        setError(true);
        setShake(true);
        setTimeout(() => {
          setShake(false);
          setPin(["", "", "", ""]);
          inputsRef.current[0]?.focus();
        }, 650);
      }
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !pin[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  useEffect(() => {
    inputsRef.current[0]?.focus();
  }, []);

  return (
    <div className="container mx-auto px-4 py-14 flex flex-col items-center min-h-screen bg-background">
      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="resource-card rounded-3xl p-10 max-w-sm w-full flex flex-col items-center gap-8 shadow-xl border border-border bg-card"
      >
        {/* Icon */}
        <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center">
          <Lock className="w-10 h-10 text-primary" />
        </div>

        <div className="text-center">
          <h2 className="text-3xl font-heading font-bold text-foreground tracking-tight">
            Enter PIN
          </h2>
          <p className="text-sm text-muted-foreground mt-2">
            Enter 4-digit access code
          </p>
        </div>

        {/* PIN Inputs */}
        <motion.div
          animate={shake ? { x: [-12, 12, -12, 12, 0] } : {}}
          transition={{ duration: 0.5 }}
          className="flex gap-4"
        >
          {pin.map((digit, i) => (
            <motion.input
              key={i}
              ref={(el) => { inputsRef.current[i] = el; }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(i, e.target.value)}
              onKeyDown={(e) => handleKeyDown(i, e)}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: i * 0.04 }}
              className={`w-16 h-20 text-center text-4xl font-bold rounded-2xl bg-muted border-2 transition-all duration-300 outline-none text-foreground
                ${error 
                  ? "border-destructive shadow-md" 
                  : digit 
                    ? "border-primary shadow-sm" 
                    : "border-border hover:border-primary/50 focus:border-primary focus:shadow-sm"
                }`}
            />
          ))}
        </motion.div>

        {/* Error Message */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="flex items-center gap-2 text-destructive text-sm font-medium"
            >
              <AlertCircle className="w-5 h-5" />
              <span>Incorrect PIN</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Back Button */}
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mt-4 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
          Back to pipelines
        </button>
      </motion.div>
    </div>
  );
};

export default PinEntry;
