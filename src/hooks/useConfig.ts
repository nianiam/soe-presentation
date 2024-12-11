import { ConfigContext } from "@/components/Reveal";
import { useContext } from "react";

export const useConfig = () => {
  const { config, setConfig } = useContext(ConfigContext);

  return [config, setConfig];
};
