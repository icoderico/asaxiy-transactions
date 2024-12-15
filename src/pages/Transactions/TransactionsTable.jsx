import {
  Card,
  Typography,
  Input,
  Select,
  Option,
} from "@material-tailwind/react";
import { useTransactionStore } from "../../store/transactionStore";
import { useState } from "react";

const TABLE_HEAD = ["Miqdor", "Kategoriya", "Type", "Sana"];

export function TransactionsTable() {
  const { transactions } = useTransactionStore();
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const filteredTransactions = transactions.filter(({ date, category }) => {
    const matchDate = selectedDate ? date === selectedDate : true;
    const matchCategory = selectedCategory
      ? category === selectedCategory
      : true;
    return matchDate && matchCategory;
  });

  const categories = [
    ...new Set(transactions.map((transaction) => transaction.category)),
  ];

  return (
    <Card className="h-full w-full">
      <div className="flex justify-end gap-4 p-4">
        <input
          type="date"
          label="Sanani tanlang"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="w-full max-w-xs border-2 p-2"
        />
        <select
          label="Kategoriyani tanlang"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="w-full max-w-xs border-2 p-2"
        >
          <option value="">Barchasi</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      <table className="w-full min-w-max table-auto text-left">
        <thead>
          <tr>
            {TABLE_HEAD.map((head) => (
              <th
                key={head}
                className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
              >
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal leading-none opacity-70"
                >
                  {head}
                </Typography>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filteredTransactions.map(
            ({ amount, category, type, date }, index) => {
              const isLast = index === filteredTransactions.length - 1;
              const classes = isLast
                ? "p-4"
                : "p-4 border-b border-blue-gray-50";

              return (
                <tr key={index}>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {amount}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {category}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className={`font-normal flex items-center gap-2`}
                    >
                      {type}{" "}
                      <div
                        className={`w-4 h-4 rounded-full ${
                          type === "income" ? "bg-green-300" : "bg-red-300"
                        }`}
                      ></div>
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      as="a"
                      variant="small"
                      color="blue-gray"
                      className="font-medium"
                    >
                      {date}
                    </Typography>
                  </td>
                </tr>
              );
            }
          )}
        </tbody>
      </table>
    </Card>
  );
}
