import { useCallback, useState } from "react";

export const useToggle = (initialState = false) => {
  const [state, toggle] = useState(initialState);

  const toggleFn = useCallback(
    (payload) =>
      toggle((prevState) =>
        typeof payload === "function"
          ? payload(prevState)
          : payload !== undefined
          ? payload
          : !prevState
      ),
    []
  );

  return [state, toggleFn];
};

export default useToggle;
