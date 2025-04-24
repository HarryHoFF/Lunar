import React, { useState } from "react";
import "./index.css";

type Transaction = {
  title: string;
  date: string;
  amount: number;
  direction: "in" | "out";
};

export default function App() {
  const [activeTab, setActiveTab] = useState<"reg" | "iban">("reg");

  const transactions: Transaction[] = [
    { title: "Løn fra Burgerbaren", date: "2025-04-22", amount: 19850, direction: "in" },
    { title: "Overførsel til Far", date: "2025-04-20", amount: 1500, direction: "out" },
    { title: "MobilePay fra Ida", date: "2025-04-19", amount: 200, direction: "in" },
    { title: "Spotify", date: "2025-04-18", amount: 99, direction: "out" }
  ];

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 p-4">
      <div className="max-w-md mx-auto bg-white shadow-xl rounded-2xl p-6 space-y-6">
        {/* Logo */}
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-2">Lunar</h1>
          <p className="text-sm text-gray-500">RP Banking App</p>
        </div>

        {/* Button to Open Form */}
        <div className="text-center">
          <button
            onClick={() => alert("Formular anzeigen (noch nicht eingebaut als Modal)")}
            className="bg-black text-white px-4 py-2 rounded-xl font-semibold"
          >
            Ny overførsel
          </button>
        </div>

        {/* Transaction Form (Inline for Now) */}
        <div className="bg-gray-50 p-4 rounded-xl">
          {/* Tab Header */}
          <div className="flex mb-4">
            <button
              onClick={() => setActiveTab("reg")}
              className={`flex-1 py-2 font-semibold rounded-l-xl ${
                activeTab === "reg" ? "bg-black text-white" : "bg-white text-black border"
              }`}
            >
              Reg & Konto
            </button>
            <button
              onClick={() => setActiveTab("iban")}
              className={`flex-1 py-2 font-semibold rounded-r-xl ${
                activeTab === "iban" ? "bg-black text-white" : "bg-white text-black border"
              }`}
            >
              IBAN & BIC
            </button>
          </div>

          {/* Tab Content */}
          {activeTab === "reg" ? (
            <div className="space-y-3">
              <input type="text" placeholder="Reg. nummer" className="w-full p-2 border rounded-xl" />
              <input type="text" placeholder="Konto nummer" className="w-full p-2 border rounded-xl" />
              <input type="number" placeholder="Beløb (DKK)" className="w-full p-2 border rounded-xl" />
              <input type="text" placeholder="Besked" className="w-full p-2 border rounded-xl" />
              <button className="w-full bg-black text-white py-2 rounded-xl">Send penge</button>
            </div>
          ) : (
            <div className="space-y-3">
              <input type="text" placeholder="IBAN" className="w-full p-2 border rounded-xl" />
              <input type="text" placeholder="BIC" className="w-full p-2 border rounded-xl" />
              <input type="number" placeholder="Beløb (DKK)" className="w-full p-2 border rounded-xl" />
              <input type="text" placeholder="Besked" className="w-full p-2 border rounded-xl" />
              <button className="w-full bg-black text-white py-2 rounded-xl">Send penge</button>
            </div>
          )}
        </div>

        {/* Latest Transactions */}
        <div>
          <h2 className="text-xl font-semibold mb-2">Seneste transaktioner</h2>
          <ul className="space-y-2">
            {transactions.map((tx, index) => (
              <li
                key={index}
                className="flex justify-between items-center bg-gray-100 p-3 rounded-xl shadow-sm"
              >
                <div>
                  <p className="font-medium">{tx.title}</p>
                  <p className="text-sm text-gray-500">{tx.date}</p>
                </div>
                <div className={`font-bold ${tx.direction === "in" ? "text-green-600" : "text-red-600"}`}>
                  {tx.direction === "in" ? "+" : "-"}
                  {tx.amount.toLocaleString("da-DK")} DKK
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
