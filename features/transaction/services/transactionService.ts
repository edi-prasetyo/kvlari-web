// features/transaction/services/transactionService.ts

import { privateApi } from "@/lib/api/privateApi";
import {
  TransactionDetailResponse,
  BankListResponse,
  TransactionListResponse,
} from "@/features/transaction/types/transactionTypes";

export const transactionService = {
  getPointTransactions: async (
    page: number = 1,
  ): Promise<TransactionListResponse> => {
    const response = await privateApi.get<TransactionListResponse>(
      `/points/transactions`,
      {
        params: { page },
      },
    );
    return response.data;
  },
  getPointTransactionById: async (
    id: number | string,
  ): Promise<TransactionDetailResponse> => {
    const response = await privateApi.get<TransactionDetailResponse>(
      `/points/transactions/${id}`,
    );
    return response.data;
  },

  getBanks: async (): Promise<BankListResponse> => {
    const response = await privateApi.get<BankListResponse>("/banks");
    return response.data;
  },
};
