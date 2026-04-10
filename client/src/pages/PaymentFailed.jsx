import { motion as Motion } from "framer-motion";
import { FaTimesCircle } from "react-icons/fa";
import { useEffect } from "react";
import { getCurrentUser } from "../services/api";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

function PaymentFailed() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    getCurrentUser(dispatch);

    const t = setTimeout(() => {
      navigate("/");
    }, 5000);

    return () => clearTimeout(t);
  });
  return (
    <div className="min-h-screen flex flex-col itmes-center justify-center p-4 gap-4">
      <Motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 360 }}
        transition={{
          duration: 0.8,
          ease: "easeOut",
        }}
        className="text-red-500 text-6xl"
      >
        <FaTimesCircle />
      </Motion.div>

      <Motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-2xl font-bold text-red-600"
      >
        Payment Failed
      </Motion.h1>

      <Motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="text-gray-500 text-sm"
      >
        Redirecting to home....
      </Motion.p>
    </div>
  );
}

export default PaymentFailed;

