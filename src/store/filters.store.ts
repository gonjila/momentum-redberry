import { create } from "zustand";

import { DepartmentType, EmployeeType, PriorityType } from "@/types";
import { getAllDepartments, getAllEmployees, getAllPriorities } from "@/services";

type FilterDataType = {
  departments: DepartmentType[];
  priorities: PriorityType[];
  employees: EmployeeType[];
};

export type FilterDataKeysType = keyof FilterDataType;

const initialValue: FilterDataType = {
  departments: [],
  priorities: [],
  employees: [],
};

interface IFiltersStore {
  fetchedFiltersData: FilterDataType;
  selectedFilters: FilterDataType;
  fetchFilterData: () => void;
  changeData: (
    changedValues: Partial<FilterDataType>,
    chosenFilterType: FilterDataKeysType,
    filterdSelectedValues: DepartmentType[] | PriorityType[] | EmployeeType[],
  ) => void;
  deleteSelectedFilter: () => void;
  resetFilterData: () => void;
}

const useFiltersStore = create<IFiltersStore>((set, get) => ({
  fetchedFiltersData: initialValue,

  selectedFilters: initialValue,

  fetchFilterData: () => {
    Promise.all([getAllDepartments(), getAllPriorities(), getAllEmployees()]).then(
      ([departments, priorities, employees]) => {
        set({ fetchedFiltersData: { departments, priorities, employees } });
      },
    );
  },

  changeData: (changedValues, chosenFilterType, filterdSelectedValues) =>
    set(state => {
      return {
        fetchedFiltersData: { ...state.fetchedFiltersData, [chosenFilterType]: changedValues },
        selectedFilters: { ...state.selectedFilters, [chosenFilterType]: filterdSelectedValues },
      };
    }),

  // TODO finish
  deleteSelectedFilter: () => {},

  resetFilterData: () => {
    get().fetchFilterData();
    set({ selectedFilters: initialValue });
  },
}));

export default useFiltersStore;
