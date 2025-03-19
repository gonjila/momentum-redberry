import { create } from "zustand";

import { DepartmentType, EmployeeType, PriorityType } from "@/types";
import { getAllDepartments, getAllEmployees, getAllPriorities } from "@/services";

type FilterDataType = {
  departments: DepartmentType[];
  priorities: PriorityType[];
  employees: EmployeeType[];
};

export type SelectableFilterDataType = {
  departments: PosiblyActivatedFilterItem[];
  priorities: PosiblyActivatedFilterItem[];
  employees: PosiblyActivatedFilterItem[];
};

export type FilterDataKeysType = keyof FilterDataType;
export type PosiblyActivatedFilterItem = (DepartmentType | PriorityType | EmployeeType) & {
  active?: boolean;
  chosenFilterType?: FilterDataKeysType;
};

const initialValue: FilterDataType = {
  departments: [],
  priorities: [],
  employees: [],
};

interface IFiltersStore {
  fetchedFiltersData: FilterDataType;
  selectedFilters: SelectableFilterDataType;
  fetchAllFilterData: () => void;
  addNewEmployee: (newEmployee: EmployeeType) => void;
  changeData: (
    changedValues: PosiblyActivatedFilterItem[],
    chosenFilterType: FilterDataKeysType,
    filterdSelectedValues: DepartmentType[] | PriorityType[] | EmployeeType[],
  ) => void;
  deleteSelectedFilter: (itemId: number, chosenFilterType: FilterDataKeysType) => void;
  resetFilterData: () => void;
}

const useFiltersStore = create<IFiltersStore>((set, get) => ({
  fetchedFiltersData: initialValue,

  selectedFilters: initialValue,

  fetchAllFilterData: () => {
    Promise.all([getAllDepartments(), getAllPriorities(), getAllEmployees()]).then(
      ([departments, priorities, employees]) => {
        set({
          fetchedFiltersData: {
            departments: departments || [],
            priorities: priorities || [],
            employees: employees || [],
          },
        });
      },
    );
  },

  addNewEmployee: async newEmployee =>
    set(state => ({
      fetchedFiltersData: {
        ...state.fetchedFiltersData,
        employees: [...state.fetchedFiltersData.employees, newEmployee],
      },
    })),

  changeData: (changedValues, chosenFilterType, filterdSelectedValues) =>
    set(state => {
      return {
        fetchedFiltersData: { ...state.fetchedFiltersData, [chosenFilterType]: changedValues },
        selectedFilters: { ...state.selectedFilters, [chosenFilterType]: filterdSelectedValues },
      };
    }),

  deleteSelectedFilter: (itemId, chosenFilterType) =>
    set(state => ({
      selectedFilters: {
        ...state.selectedFilters,
        [chosenFilterType]: state.selectedFilters[chosenFilterType].filter(item => item.id !== itemId),
      },
      fetchedFiltersData: {
        ...state.fetchedFiltersData,
        [chosenFilterType]: state.fetchedFiltersData[chosenFilterType].map(item =>
          item.id === itemId ? { ...item, active: false } : item,
        ),
      },
    })),

  resetFilterData: () => {
    get().fetchAllFilterData();
    set({ selectedFilters: initialValue });
  },
}));

export default useFiltersStore;
