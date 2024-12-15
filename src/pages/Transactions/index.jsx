import React from "react";
import { Button, Dialog, DialogBody } from "@material-tailwind/react";
import TransactionForm from "./TransactionsForm";
import { TransactionsTable } from "./TransactionsTable";
import { useTransactionStore } from "../../store/transactionStore";

const TransactionsPage = () => {
  const [open, setOpen] = React.useState(false);
  const { getTotal } = useTransactionStore();

  const handleOpen = () => setOpen(!open);
  const balance = getTotal("income") - getTotal("expense");

  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="text-3xl py-5 ">Tranzaksyalar</h1>
        <Button onClick={handleOpen} className="bg-[#006bff]">
          Tranzaksya qo'shish
        </Button>
      </div>

      <Dialog open={open} handler={handleOpen}>
        <DialogBody>
          <TransactionForm setOpen={setOpen} />
        </DialogBody>
      </Dialog>

      <div className="pt-10">
        <h1 className="text-2xl ">Balans:</h1>
        <div className="flex gap-5 pb-5 font-bold">
          <h1
            className={`text-3xl ${
              balance > 0 ? "text-green-400" : "text-red-400"
            }`}
          >
            {balance}
          </h1>
        </div>
        <h1 className="text-2xl ">Umumiy:</h1>
        <div className="flex gap-5 pb-5 font-bold">
          <p className="text-green-400">
            <span>+ </span>
            {getTotal("income")} kirim
          </p>
          /
          <p className="text-red-400">
            <span>- </span>
            {getTotal("expense")} chiqim
          </p>
        </div>
        <TransactionsTable />
      </div>
    </div>
  );
};

export default TransactionsPage;
