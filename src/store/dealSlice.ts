import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type DealType = "BRRRR" | "Turnkey" | "Section8";

export interface DealInputs {
  streetAddress: string;
  city: string;
  state: string;
  zipCode: string;
  bedrooms: number;
  purchasePrice: number;
  downPayment: number;
  arv: number;
  monthlyRent: number;
  rehabCost: number;
  propertyTax: number;
  insurance: number;
  utilities: number;
  otherExpenses: number;
  propertyLink: string;
  vacancyRate: number;
  maintenanceRate: number;
  capexRate: number;
  propertyMgmtRate: number;
}

export interface DealResults {
  monthlyCashFlow: number;
  annualROI: number;
  cocReturn: number;
  capRate: number;
  dscr: number;
  onePercentRule: boolean;
  noi: number;
  mortgagePayment: number;
  vacancy: number;
  maintenance: number;
  capex: number;
  propertyMgmt: number;
  totalExpenses: number;
  dealRating: "GOOD DEAL" | "ALRIGHT DEAL" | "BAD DEAL";
}

export interface SavedDeal {
  id: string;
  name: string;
  dealType: DealType;
  inputs: DealInputs;
  results: DealResults;
  savedAt: string;
}

interface DealState {
  savedDeals: SavedDeal[];
}

const initialState: DealState = {
  savedDeals: [],
};

const dealSlice = createSlice({
  name: "deals",
  initialState,
  reducers: {
    addDeal: (state, action: PayloadAction<SavedDeal>) => {
      state.savedDeals.push(action.payload);
    },

    removeDeal: (state, action: PayloadAction<string>) => {
      state.savedDeals = state.savedDeals.filter(
        (deal) => deal.id !== action.payload,
      );
    },

    updateDeal: (state, action: PayloadAction<SavedDeal>) => {
      const index = state.savedDeals.findIndex(
        (deal) => deal.id === action.payload.id,
      );
      if (index !== -1) {
        state.savedDeals[index] = action.payload;
      }
    },

    setDeals: (state, action: PayloadAction<SavedDeal[]>) => {
      state.savedDeals = action.payload;
    },

    clearDeals: (state) => {
      state.savedDeals = [];
    },
  },
});

export const { addDeal, removeDeal, updateDeal, setDeals, clearDeals } =
  dealSlice.actions;

export default dealSlice.reducer;
