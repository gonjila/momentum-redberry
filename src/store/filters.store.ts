import { create } from "zustand";

interface IFiltersStore {
  chosenDepartments: object[];
  chosenEmployees: object[];
  chosenPriorities: object[];

  chooseFilter: (filter: object[]) => void;
}

const useFiltersStore = create<IFiltersStore>(set => ({
  chosenDepartments: [],
  chosenEmployees: [],
  chosenPriorities: [],

  chooseFilter: (filter: object[]) => set({}),
}));

export default useFiltersStore;
