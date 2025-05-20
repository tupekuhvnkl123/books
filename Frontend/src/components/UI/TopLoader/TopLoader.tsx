import { useEffect } from "react";
import { useNavigation } from "react-router-dom";
import NProgress from "nprogress";
import "./TopLoader.scss";

const TopLoader = () => {
  const navigation = useNavigation();

  useEffect(() => {
    if (navigation.state === "loading") {
      NProgress.start(); // Start loader when navigation begins
    } else {
      NProgress.done(); // Stop loader when navigation ends
    }
  }, [navigation.state]);

  return null;
};

export default TopLoader;
