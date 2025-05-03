'use client';

import { useState } from "react";
import {
    Bar,
    BarChart,
    CartesianGrid,
    Legend,
    Line,
    LineChart,
    ResponsiveContainer,
    Tooltip,
    XAxis, YAxis,
} from "recharts";

const HabitDashboard = () => {
  const [data, setData] = useState([
    { day: "Mon", Sleep: 7, Gym: 1, Exercise: 1, Wakeup: 6, Screen: 4 },
    { day: "Tue", Sleep: 6, Gym: 0, Exercise: 2, Wakeup: 7, Screen: 5 },
    { day: "Wed", Sleep: 8, Gym: 1, Exercise: 0, Wakeup: 6, Screen: 6 },
    { day: "Thu", Sleep: 5, Gym: 1, Exercise: 1, Wakeup: 5, Screen: 8 },
    { day: "Fri", Sleep: 6, Gym: 1, Exercise: 1, Wakeup: 6, Screen: 4 },
    { day: "Sat", Sleep: 9, Gym: 0, Exercise: 2, Wakeup: 9, Screen: 6 },
    { day: "Sun", Sleep: 7, Gym: 1, Exercise: 1, Wakeup: 8, Screen: 7 },
  ]);

  const habits = ["Sleep", "Gym", "Exercise", "Wakeup", "Screen"];

  const updateHabit = (index, habit, delta) => {
    setData((prev) => {
      const newData = [...prev];
      newData[index] = {
        ...newData[index],
        [habit]: Math.max(0, newData[index][habit] + delta),
      };
      return newData;
    });
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      {/* Navbar */}
      <nav className="bg-gray-800 p-4 flex justify-between items-center shadow-md">
        <h1 className="text-xl font-bold text-purple-400">Habit Tracker</h1>
        <div className="flex items-center space-x-3">
          <span className="text-gray-300">Welcome Back!</span>
          <img
            src="https://randomuser.me/api/portraits/lego/1.jpg"
            className="w-8 h-8 rounded-full"
            alt="User"
          />
        </div>
      </nav>

      <main className="p-6 grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Main Dashboard */}
        <section className="md:col-span-3 space-y-6">
          {/* Habit Controls */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {data.map((dayData, dayIndex) => (
              <div key={dayData.day} className="bg-gray-800 p-4 rounded-lg shadow">
                <h2 className="text-purple-300 font-semibold mb-2">{dayData.day}</h2>
                {habits.map((habit) => (
                  <div key={habit} className="flex items-center justify-between text-sm mb-2">
                    <span>{habit}: {dayData[habit]}</span>
                    <div className="space-x-2">
                      <button
                        onClick={() => updateHabit(dayIndex, habit, 1)}
                        className="bg-purple-500 hover:bg-purple-600 px-2 py-0.5 rounded text-white"
                      >
                        +
                      </button>
                      <button
                        onClick={() => updateHabit(dayIndex, habit, -1)}
                        className="bg-purple-700 hover:bg-purple-800 px-2 py-0.5 rounded text-white"
                      >
                        −
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>

          {/* Graphs */}
          <div className="bg-gray-800 p-6 rounded-lg shadow">
            <h2 className="text-purple-300 text-lg font-semibold mb-4">Habit Overview (Bar Chart)</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                <XAxis dataKey="day" stroke="#ccc" />
                <YAxis stroke="#ccc" />
                <Tooltip />
                <Legend />
                <Bar dataKey="Sleep" stackId="a" fill="#8b5cf6" />
                <Bar dataKey="Gym" stackId="a" fill="#7c3aed" />
                <Bar dataKey="Exercise" stackId="a" fill="#6d28d9" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-gray-800 p-6 rounded-lg shadow">
            <h2 className="text-purple-300 text-lg font-semibold mb-4">Wakeup vs Screen Time (Line Chart)</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                <XAxis dataKey="day" stroke="#ccc" />
                <YAxis stroke="#ccc" />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="Wakeup" stroke="#ec4899" />
                <Line type="monotone" dataKey="Screen" stroke="#22d3ee" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </section>

        {/* Sidebar Summary */}
        <aside className="bg-gray-800 p-4 rounded-lg shadow space-y-4">
          <h2 className="text-lg font-semibold text-purple-300">Summary (Last 7 Days)</h2>
          {data.map((day) => (
            <div key={day.day} className="text-sm text-gray-300">
              <strong className="text-purple-400">{day.day}</strong>: Sleep {day.Sleep}h, Gym {day.Gym}h, Ex {day.Exercise}h, Wakeup {day.Wakeup}am, Screen {day.Screen}h
            </div>
          ))}
        </aside>
      </main>

      <footer className="bg-gray-800 text-center py-4 text-sm text-gray-400 mt-8">
        &copy; 2025 Habit Tracker. Stay healthy, stay productive! 🌱
      </footer>
    </div>
  );
};

export default HabitDashboard;
