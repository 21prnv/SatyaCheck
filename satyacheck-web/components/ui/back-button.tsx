import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

export const BackButton = () => {
  const router = useRouter();

  return (
    <motion.button
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      onClick={() => router.push("/")}
      className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-all duration-300 group px-4 py-2"
    >
      <ArrowLeft className="h-5 w-5 transform group-hover:-translate-x-1 transition-transform duration-300" />
      <span className="font-medium">Back</span>
    </motion.button>
  );
}; 