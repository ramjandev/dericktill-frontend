import { baseAPI } from "@/store/baseApi/baseApi";
import type {
  GetParams,
  PropertyBrrr,
  PropertySection8,
  PropertyTurnkey,
} from "./types/brr";
import type {
  PropertyCalculations,
  PropertySingleCalculation,
} from "./types/calculation";
import type { AddressRequest, PropertyEnrichResponse } from "./types/enrich";
import type {
  BrrrrCalculationResponse,
  SaveBRRRR,
  SaveSection8,
  SaveTurnkey,
  Section8DSCRResponse,
  TurnkeyCalculationResponse,
} from "./types/output";

export const contentAPI = baseAPI.injectEndpoints({
  endpoints: (build) => ({
    calculateBrrrr: build.mutation<BrrrrCalculationResponse, PropertyBrrr>({
      query: (data) => ({
        url: `/property/calculate-brrrr`,
        method: "POST",
        body: data,
      }),
    }),
    calculateTurnkey: build.mutation<
      TurnkeyCalculationResponse,
      PropertyTurnkey
    >({
      query: (data) => ({
        url: `/property/calculate-turnkey`,
        method: "POST",
        body: data,
      }),
    }),
    calculateSection8: build.mutation<Section8DSCRResponse, PropertySection8>({
      query: (data) => ({
        url: `/property/calculate-Section8_DSCR`,
        method: "POST",
        body: data,
      }),
    }),

    // save
    savePropertyBrrrr: build.mutation<void, SaveBRRRR>({
      query: (data) => ({
        url: `/property/save-brrr-property`,
        method: "POST",
        body: data,
      }),
    }),
    savePropertyTurnkey: build.mutation<void, SaveTurnkey>({
      query: (data) => ({
        url: `/property/save-turnkey-property`,
        method: "POST",
        body: data,
      }),
    }),
    savePropertySection8: build.mutation<void, SaveSection8>({
      query: (data) => ({
        url: `/property/save-section8-property`,
        method: "POST",
        body: data,
      }),
    }),
    getCalculation: build.query<PropertyCalculations, GetParams>({
      query: (params) => ({
        url: `/property/user-calculations`,
        method: "GET",
        params,
      }),
      providesTags: ["Calculations"],
    }),
    calculationDetails: build.query<PropertySingleCalculation, string>({
      query: (id) => ({
        url: `/property/${id}`,
        method: "GET",
        params: { propertyId: id },
      }),
      providesTags: ["Calculations"],
    }),
    deleteDeal: build.mutation<void, string>({
      query: (id) => ({
        url: `/property/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Calculations"],
    }),
    enrichAddress: build.mutation<PropertyEnrichResponse, AddressRequest>({
      query: (addressRequest) => ({
        url: `/property/enrich-address`,
        method: "POST",
        body: addressRequest,
      }),
    }),
  }),
});

export const {
  useCalculateBrrrrMutation,
  useCalculateTurnkeyMutation,
  useCalculateSection8Mutation,
  //Save Property
  useSavePropertyBrrrrMutation,
  useSavePropertyTurnkeyMutation,
  useSavePropertySection8Mutation,
  // Calculations
  useGetCalculationQuery,
  useCalculationDetailsQuery,
  // Delete
  useDeleteDealMutation,
  // Enrich Address
  useEnrichAddressMutation,
} = contentAPI;
