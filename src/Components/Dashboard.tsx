'use client';

import { useState } from 'react';
import {
  FaBed, FaClock, FaDumbbell, FaMinus, FaMobileAlt, FaPlus, FaSun,
} from 'react-icons/fa';
import {
  Bar, BarChart, Cell, Legend, Line, LineChart, Pie, PieChart,
  ResponsiveContainer, Tooltip, XAxis, YAxis,
} from 'recharts';

const COLORS = ['#8884d8', '#82ca9d', '#ff7300', '#ffb347', '#00C49F'];

interface HabitDay {
  day: string;
  Sleep: number;
  Gym: number;
  Exercise: number;
  Wakeup: number;
  Screen: number;
}

const initialData: HabitDay[] = [
  { day: 'Mon', Sleep: 7, Gym: 1, Exercise: 1, Wakeup: 7, Screen: 5 },
  { day: 'Tue', Sleep: 8, Gym: 1, Exercise: 1, Wakeup: 6, Screen: 4 },
  { day: 'Wed', Sleep: 6, Gym: 1, Exercise: 1, Wakeup: 7, Screen: 6 },
  { day: 'Thu', Sleep: 8, Gym: 1, Exercise: 1, Wakeup: 6, Screen: 3 },
  { day: 'Fri', Sleep: 7, Gym: 1, Exercise: 1, Wakeup: 7, Screen: 5 },
  { day: 'Sat', Sleep: 9, Gym: 2, Exercise: 1, Wakeup: 8, Screen: 4 },
  { day: 'Sun', Sleep: 8, Gym: 2, Exercise: 1, Wakeup: 9, Screen: 3 },
];

const habitList = [
  { name: 'Sleep', icon: <FaBed />, unit: 'hrs' },
  { name: 'Gym', icon: <FaDumbbell />, unit: 'hrs' },
  { name: 'Exercise', icon: <FaClock />, unit: 'hrs' },
  { name: 'Wakeup', icon: <FaSun />, unit: 'am' },
  { name: 'Screen', icon: <FaMobileAlt />, unit: 'hrs' },
];

export default function Dashboard() {
  const [data, setData] = useState<HabitDay[]>(initialData);

  const updateHabit = (index: number, habit: keyof Omit<HabitDay, 'day'>, delta: number) => {
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
    <div className="min-h-screen bg-gray-900 text-white flex">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 p-4 space-y-4">
        <h2 className="text-xl font-bold mb-4 text-purple-400">📅 Last 7 Days</h2>
        {data.map((day, idx) => (
          <div key={idx} className="border-b border-gray-700 pb-2 mb-2">
            <h3 className="text-purple-300 font-semibold">{day.day}</h3>
            {habitList.map((habit) => (
              <div key={habit.name} className="text-sm flex justify-between">
                <span>{habit.name}</span>
                <span>{day[habit.name]} {habit.unit}</span>
              </div>
            ))}
          </div>
        ))}
      </aside>

      {/* Main Content */}
      <div className="flex-1 p-6 space-y-6">
        {/* Navbar */}
        <nav className="bg-gray-800 px-6 py-4 rounded shadow flex justify-between items-center">
          <h1 className="text-2xl font-bold text-purple-400">🌟 Habit Tracker</h1>
          <div className="flex items-center space-x-4">
            <span className="text-gray-300">👋 Welcome Back!</span>
            <img src="https://randomuser.me/api/portraits/lego/1.jpg" className="w-8 h-8 rounded-full" alt="avatar" />
          </div>
        </nav>

        {/* Habit Controls */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {data.map((day, idx) => (
            <div key={day.day} className="bg-gray-800 p-4 rounded shadow">
              <h2 className="text-lg font-semibold mb-2 text-purple-300">{day.day}</h2>
              {habitList.map((habit) => (
                <div key={habit.name} className="flex items-center justify-between my-1">
                  <div className="flex items-center space-x-2">
                    <span className="text-purple-400">{habit.icon}</span>
                    <span className="text-sm">{habit.name}: {day[habit.name]} {habit.unit}</span>
                  </div>
                  <div className="space-x-1">
                    <button
                      className="bg-purple-600 p-1 rounded hover:bg-purple-700"
                      onClick={() => updateHabit(idx, habit.name, 1)}
                    >
                      <FaPlus />
                    </button>
                    <button
                      className="bg-red-600 p-1 rounded hover:bg-red-700"
                      onClick={() => updateHabit(idx, habit.name, -1)}
                    >
                      <FaMinus />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Line Chart */}
          <div className="bg-gray-800 p-4 rounded shadow">
            <h2 className="text-lg font-semibold mb-2 text-purple-300">Weekly Sleep & Screen Time</h2>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={data}>
                <XAxis dataKey="day" stroke="#ccc" />
                <YAxis stroke="#ccc" />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="Sleep" stroke="#8884d8" />
                <Line type="monotone" dataKey="Screen" stroke="#ff7300" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Bar Chart */}
          <div className="bg-gray-800 p-4 rounded shadow">
            <h2 className="text-lg font-semibold mb-2 text-purple-300">Gym & Exercise Summary</h2>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={data}>
                <XAxis dataKey="day" stroke="#ccc" />
                <YAxis stroke="#ccc" />
                <Tooltip />
                <Legend />
                <Bar dataKey="Gym" fill="#82ca9d" />
                <Bar dataKey="Exercise" fill="#ffc658" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Pie Chart */}
          <div className="bg-gray-800 p-4 rounded shadow col-span-1 lg:col-span-2">
            <h2 className="text-lg font-semibold mb-2 text-purple-300">Total Weekly Breakdown</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  dataKey="value"
                  data={habitList.map((habit) => ({
                    name: habit.name,
                    value: data.reduce((sum, d) => sum + d[habit.name], 0),
                  }))}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  label
                >
                  {habitList.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Footer */}
        <footer className="bg-gray-800 text-center py-4 text-sm text-gray-400 rounded shadow">
          &copy; 2025 Habit Tracker — Stay consistent, stay winning! 🚀
        </footer>
      </div>
    </div>
  );
}
