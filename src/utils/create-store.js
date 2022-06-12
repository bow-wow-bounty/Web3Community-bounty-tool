import { createSelectorFunctions } from "auto-zustand-selectors-hook";
import { identity } from "ramda";
import create from "zustand";
import { devtools, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { computed } from "zustand-middleware-computed-state";

export const createStore = (storeGenerator, computedValues, persistKey) => {
  const persistMiddleware = persistKey
    ? (storeCreator) => persist(storeCreator, { name: persistKey })
    : identity;

  return createSelectorFunctions(
    create(
      persistMiddleware(
        devtools(computed(immer(storeGenerator), computedValues))
      )
    )
  );
};

export const SwrStoreDefaults = {
  data: undefined,
  error: undefined,
  mutate: async () => undefined,
  isValidating: false,
};

export default createStore;
