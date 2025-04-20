import { createContext, useContext, useEffect, useReducer } from 'react';

interface Workshop {
  id: string;
  title: string;
  date: string;
}

interface WorkshopState {
  registrations: Workshop[];
}

type WorkshopAction =
  | { type: 'REGISTER'; payload: Workshop }
  | { type: 'UNREGISTER'; payload: string };

const initialState: WorkshopState = {
  registrations: [],
};

const workshopReducer = (
  state: WorkshopState,
  action: WorkshopAction
): WorkshopState => {
  switch (action.type) {
    case 'REGISTER':
      if (state.registrations.some(reg => reg.id === action.payload.id)) {
        return state;
      }
      return {
        ...state,
        registrations: [...state.registrations, action.payload],
      };
    case 'UNREGISTER':
      return {
        ...state,
        registrations: state.registrations.filter(reg => reg.id !== action.payload),
      };
    default:
      return state;
  }
};

const WorkshopContext = createContext<{
  state: WorkshopState;
  dispatch: React.Dispatch<WorkshopAction>;
} | null>(null);

export const WorkshopProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(workshopReducer, initialState);

  useEffect(() => {
    const savedRegistrations = localStorage.getItem('workshopRegistrations');
    if (savedRegistrations) {
      const { registrations } = JSON.parse(savedRegistrations);
      registrations.forEach((workshop: Workshop) => {
        dispatch({ type: 'REGISTER', payload: workshop });
      });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('workshopRegistrations', JSON.stringify(state));
  }, [state]);

  return (
    <WorkshopContext.Provider value={{ state, dispatch }}>
      {children}
    </WorkshopContext.Provider>
  );
};

export const useWorkshop = () => {
  const context = useContext(WorkshopContext);
  if (!context) {
    throw new Error('useWorkshop must be used within a WorkshopProvider');
  }
  return context;
};