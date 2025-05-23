import { useEffect } from "react";

type Props = {
  timeout: number;
  callback: () => void;
  enabled?: boolean;
};

const useDelayedCallback = ({
  timeout = 2000,
  callback,
  enabled = true,
}: Props) => {
  useEffect(() => {
    if (!enabled) return;

    const timer = setTimeout(callback, timeout);
    return () => clearTimeout(timer);
  }, [enabled]);
};

export default useDelayedCallback;
