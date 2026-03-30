import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Lock, AlertCircle } from "lucide-react";

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
        onSuccess();
      } else {
        setError(true);
        setShake(true);
        setTimeout(() => {
          setShake(false);
          setPin(["", "", "", ""]);
          inputsRef.current[0]?.focus();
        }, 600);
      }
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !pin[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  return (
    <div className="container mx-auto px-4 py-14 flex flex-col items-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="resource-card rounded-2xl p-10 max-w-sm w-full flex flex-col items-center gap-6"
      >
        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
          <Lock className="w-8 h-8 text-primary" />
        </div>
        <h2 className="text-2xl font-heading font-bold text-foreground">Enter PIN</h2>
        <p className="text-sm text-muted-foreground text-center">Enter 4-digit access code</p>

        <motion.div
          animate={shake ? { x: [-10, 10, -10, 10, 0] } : {}}
          transition={{ duration: 0.4 }}
          className="flex gap-3"
        >
          {pin.map((digit, i) => (
            <input
              key={i}
              ref={(el) => { inputsRef.current[i] = el; }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(i, e.target.value)}
              onKeyDown={(e) => handleKeyDown(i, e)}
              className={`w-14 h-14 text-center text-2xl font-bold rounded-xl bg-muted border-2 transition-colors outline-none text-foreground ${
                error ? "border-destructive" : digit ? "border-primary" : "border-border"
              } focus:border-primary`}
            />
          ))}
        </motion.div>

        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-2 text-destructive text-sm"
          >
            <AlertCircle className="w-4 h-4" />
            <span>Incorrect PIN</span>
          </motion.div>
        )}

        <button
          onClick={onBack}
          className="text-sm text-muted-foreground hover:text-primary transition-colors mt-2"
        >
          ← Back to pipelines
        </button>
      </motion.div>
    </div>
  );
};

export default PinEntry;
