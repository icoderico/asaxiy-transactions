import React from "react";
import AnimatedNumber from "animated-number-react";
import { useTransactionStore } from "../../store/transactionStore";
import { increase, decrease } from "../../assets";

import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const Analytics = () => {
  const formatValue = (value) => value.toFixed(1);
  const { transactions, getTotal } = useTransactionStore();
  const income = transactions?.filter((tr) => tr.type === "income");
  const expense = transactions?.filter((tr) => tr.type === "expense");

  const totalAmount = income.reduce(
    (sum, income) => sum + parseFloat(income.amount),
    0
  );
  const percentages = income.map((income) => ({
    ...income,
    percentage: ((parseFloat(income.amount) / totalAmount) * 100).toFixed(2),
  }));

  const totalAmountExpense = expense.reduce(
    (sum, expense) => sum + parseFloat(expense.amount),
    0
  );
  const percentagesExpense = expense.map((expense) => ({
    ...expense,
    percentage: (
      (parseFloat(expense.amount) / totalAmountExpense) *
      100
    ).toFixed(2),
  }));

  const data = {
    labels: income?.map((inc) => inc.category),
    datasets: [
      {
        data: percentages?.map((pr) => pr.percentage),
        backgroundColor: [
          "#006bff",
          "#2C3E50",
          "#34495E",
          "#4A4A4A",
          "#5D6D7E",
        ],
        borderWidth: 4,
        borderColor: "#ffffff",
        cutout: "50%",
      },
    ],
  };

  const data2 = {
    labels: expense?.map((inc) => inc.category),
    datasets: [
      {
        data: percentagesExpense?.map((pr) => pr.percentage),
        backgroundColor: [
          "#006bff",
          "#2C3E50",
          "#34495E",
          "#4A4A4A",
          "#5D6D7E",
        ],
        borderWidth: 4,
        borderColor: "#ffffff",
        cutout: "50%",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: true,
      },
    },
  };

  return (
    <div>
      <h1 className="lg:text-8xl text-7xl lg:py-20 py-14  flex items-center gap-4 justify-center">
        <AnimatedNumber
          value={getTotal("income") - getTotal("expense")}
          formatValue={formatValue}
        />
        {income?.length > expense?.length ? (
          <img src={increase} className="" />
        ) : (
          <img src={decrease} />
        )}
      </h1>
      <section className="flex lg:flex-row flex-col gap-2">
        <div className="shadow lg:w-1/2 border p-3 flex items-center gap-10 rounded-md">
          <div className="lg:w-60 w-48">
            <h1 className="text-xl ">Kirimlar</h1>
            <Doughnut data={data} options={options} />
            <h1 className="text-xl text-center">
              <AnimatedNumber
                value={getTotal("income")}
                formatValue={formatValue}
              />
            </h1>
          </div>

          <div>
            <p className="flex items-center gap-2">
              <span className="w-4 h-4 bg-[#006bff] inline-block"></span>
              Oziq-ovqat
            </p>
            <p className="flex items-center gap-2">
              <span className="w-4 h-4 bg-[#2C3E50] inline-block"></span>
              Ko'ngilochar
            </p>
            <p className="flex items-center gap-2">
              <span className="w-4 h-4 bg-[#34495E] inline-block"></span>
              Transport
            </p>
            <p className="flex items-center gap-2">
              <span className="w-4 h-4 bg-[#4A4A4A] inline-block"></span>
              Hisoblar
            </p>
            <p className="flex items-center gap-2">
              <span className="w-4 h-4 bg-[#5D6D7E] inline-block"></span>
              Boshqa
            </p>
          </div>
        </div>
        <div className="shadow lg:w-1/2 border p-3 flex items-center gap-10 rounded-md">
          <div className="lg:w-60 w-48">
            <h1 className="text-xl ">Chiqimlar</h1>
            <Doughnut data={data2} options={options} />
            <h1 className="text-xl text-center">
              <AnimatedNumber
                value={getTotal("expense")}
                formatValue={formatValue}
              />
            </h1>
          </div>

          <div>
            <p className="flex items-center gap-2">
              <span className="w-4 h-4 bg-[#006bff] inline-block"></span>
              Oziq-ovqat
            </p>
            <p className="flex items-center gap-2">
              <span className="w-4 h-4 bg-[#2C3E50] inline-block"></span>
              Ko'ngilochar
            </p>
            <p className="flex items-center gap-2">
              <span className="w-4 h-4 bg-[#34495E] inline-block"></span>
              Transport
            </p>
            <p className="flex items-center gap-2">
              <span className="w-4 h-4 bg-[#4A4A4A] inline-block"></span>
              Hisoblar
            </p>
            <p className="flex items-center gap-2">
              <span className="w-4 h-4 bg-[#5D6D7E] inline-block"></span>
              Boshqa
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Analytics;
