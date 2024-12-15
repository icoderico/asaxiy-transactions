import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useTransactionStore = create(
  persist(
    (set, get) => ({
      transactions: [],
      addTransaction: (transaction) =>
        set((state) => ({
          transactions: [...state.transactions, transaction],
        })),
      filterTransactions: (category) =>
        set((state) => ({
          transactions: state.transactions.filter(
            (transaction) => transaction.category === category
          ),
        })),

      getTypeCounts: () => {
        const { transactions } = get();
        return transactions.reduce((counts, transaction) => {
          counts[transaction.type] = (counts[transaction.type] || 0) + 1;
          return counts;
        }, {});
      },

      clearTransactions: () =>
        set(() => ({
          transactions: [],
        })),
      getTotal: (type) => {
        const state = get();
        return state.transactions
          .filter((transaction) => transaction.type === type)
          .reduce(
            (total, transaction) => total + parseFloat(transaction.amount),
            0
          );
      },
    }),
    {
      name: "transactions-storage",
      getStorage: () => localStorage,
    }
  )
);
