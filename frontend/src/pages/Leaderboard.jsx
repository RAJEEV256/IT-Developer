import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Leaderboard = () => {
  const [leaders, setLeaders] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/leaderboard')
      .then(res => setLeaders(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">🏆 Top Performers</h1>
      
      <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200">
        <table className="min-w-full leading-normal">
          <thead>
            <tr className="bg-gray-800 text-white">
              <th className="px-5 py-3 text-left font-semibold">Rank</th>
              <th className="px-5 py-3 text-left font-semibold">User</th>
              <th className="px-5 py-3 text-left font-semibold">Score</th>
              <th className="px-5 py-3 text-left font-semibold">Time Taken</th>
              <th className="px-5 py-3 text-left font-semibold">Date</th>
            </tr>
          </thead>
          <tbody>
            {leaders.map((entry, index) => (
              <tr key={index} className="border-b border-gray-200 hover:bg-gray-50">
                <td className="px-5 py-5 text-lg font-bold text-gray-700">#{index + 1}</td>
                <td className="px-5 py-5 text-blue-600 font-semibold">{entry.username}</td>
                <td className="px-5 py-5 text-green-600 font-bold">{entry.score} / {entry.totalQuestions}</td>
                <td className="px-5 py-5 text-gray-600">{entry.timeTaken}s</td>
                <td className="px-5 py-5 text-gray-500 text-sm">{new Date(entry.date).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {leaders.length === 0 && <p className="p-6 text-center text-gray-500">No records yet. Be the first to take a quiz!</p>}
      </div>
    </div>
  );
};

export default Leaderboard;