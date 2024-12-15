import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, Option, Select } from "@material-tailwind/react";
import { useTransactionStore } from "../../store/transactionStore";

const TransactionForm = ({ setOpen }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { addTransaction } = useTransactionStore();
  const [transactionType, setTransactionType] = useState("income");

  const onSubmit = (data) => {
    const newTransaction = {
      amount: data.amount,
      category: data.category,
      type: transactionType,
      date: data.date,
    };
    addTransaction(newTransaction);
    setOpen(false);
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-xl font-semibold mb-4">Tranzaksiya Qo‘shish</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <Input
            {...register("amount", { required: "Miqdorni kiriting" })}
            type="number"
            label="Tranzaksiya Miqdori"
            error={errors.amount}
          />
        </div>

        <div>
          <select
            className="border-2 w-full p-3 rounded-md"
            {...register("category")}
            label="Kategoriya"
            error={errors.category}
          >
            <option value="Food">Oziq-ovqat</option>
            <option value="Entertainment">Ko‘ngilochar</option>
            <option value="Transport">Transport</option>
            <option value="Bills">Hisoblar</option>
            <option value="Other">Boshqa</option>
          </select>
        </div>

        <div className="flex items-center gap-4">
          <label>Tranzaksiya turi:</label>
          <div className="flex items-center gap-2">
            <label className="text-sm">
              <input
                type="radio"
                name="transactionType"
                value="income"
                checked={transactionType === "income"}
                onChange={() => setTransactionType("income")}
              />{" "}
              Daromad
            </label>
            <label className="text-sm">
              <input
                type="radio"
                name="transactionType"
                value="expense"
                checked={transactionType === "expense"}
                onChange={() => setTransactionType("expense")}
              />{" "}
              Xarajat
            </label>
          </div>
        </div>

        <div>
          <Input
            {...register("date")}
            type="date"
            label="Sana"
            error={errors.date}
          />
        </div>

        <div>
          <Button type="submit" className="w-full bg-[#006bff]">
            Tranzaksiya qo‘shish
          </Button>
        </div>
      </form>
    </div>
  );
};

export default TransactionForm;
