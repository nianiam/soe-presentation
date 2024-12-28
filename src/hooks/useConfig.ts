import { useContext } from "react";

import { ConfigContext } from "@/components/Providers/ConfigContext";

export const useConfig = () => {
  const { config, setConfig } = useContext(ConfigContext);

  return [config, setConfig];
};
