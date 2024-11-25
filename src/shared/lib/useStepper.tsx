import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useState,
} from "react";

export type StepperState<TState> = {
  active: number;
  hasPreviousStep: boolean;
  hasNextStep: boolean;
  isLastStep: boolean;
  state: TState;
  updateState: (state: Partial<TState>) => void;
  set: (step: number) => void;
  next: () => void;
  previous: () => void;
  reset: (defaultState?: TState) => void;
};

export const useStepper = <TState,>(
  max: number,
  defaultState: TState
): StepperState<TState> => {
  const [active, set] = useState(0);
  const [state, setState] = useState(defaultState);

  const next = useCallback(() => {
    set((step) => Math.min(step + 1, max - 1));
  }, [max]);

  const previous = useCallback(() => {
    set((step) => Math.max(step - 1, 0));
  }, []);

  const updateState = useCallback((newState: Partial<TState>) => {
    setState((prev) => ({
      ...prev,
      ...newState,
    }));
  }, []);
  const reset = useCallback(

    (newState?: TState) => {
      set(0);
      setState(newState ?? defaultState);
    },
    [defaultState]
  );

  const hasNextStep = active + 1 < max;
  const hasPreviousStep = active - 1 >= 0;
  const isLastStep = active + 1 === max;

  return {
    active,
    hasPreviousStep,
    hasNextStep,
    isLastStep,
    state,
    updateState,
    set,
    next,
    previous,
    reset,
  };
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const stepperContext = createContext<StepperState<any> | null>(null);

export type StepperProviderProps<TState> = {
  state: StepperState<TState>;
  children: ReactNode;
};

export const StepperProvider = <TState,>({
  state,
  children,
}: StepperProviderProps<TState>): JSX.Element => {
  return (
    <stepperContext.Provider value={state}>{children}</stepperContext.Provider>
  );
};

export const useStepperContext = <TState,>(): StepperState<TState> => {
  const context = useContext(stepperContext);
  if (!context) {
    throw new Error("useStepperContext must be used within a StepperProvider");
  }

  return context as StepperState<TState>;
};
