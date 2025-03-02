"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchMatches } from "../lib/api";
import Image from "next/image";

interface Match {
  id: number;
  homeTeam: { name: string };
  awayTeam: { name: string };
  homeScore: number;
  awayScore: number;
  status: string;
}

export default function MatchList() {
  const { data = [], error, isLoading, refetch } = useQuery<Match[]>({
    queryKey: ["matches"],
    queryFn: fetchMatches,
  });

  return (
    <div className="container">
      {/* Заголовок + кнопка "Обновить" */}
      <div className="header">
        <div className="header-left">
          <h1 className="page-title">Match Tracker</h1>
        </div>
        <div className="header-right">
          <button onClick={() => refetch()} className="refresh-button">
            Обновить 🔄
          </button>
        </div>
      </div>

      {/* Ошибка загрузки */}
      {error && (
        <div className="error-message">
          <span>⚠️ Ошибка: не удалось загрузить информацию</span>
        </div>
      )}

      {/* Загрузка */}
      {isLoading && <p className="loading-text">Загрузка...</p>}

      {/* Список матчей */}
      <ul className="match-list">
        {data.map((match) => (
          <li key={match.id} className="match-card">
            {/* Левая часть (иконка + название команды) */}
            <div className="match-team">
              <Image src="/icons/team-icon.png" alt="Team Icon" width={50} height={50} className="team-icon" />
              <p>{match.homeTeam.name}</p>
            </div>

            {/* Центр (счёт + статус) */}
            <div className="match-score-wrapper">
              <p className="match-score">
                {match.homeScore} : {match.awayScore}
              </p>
              <span
                className={`match-status ${
                  match.status === "Ongoing" ? "status-live" : "status-finished"
                }`}
              >
                {match.status === "Ongoing" ? "Live" : "Finished"}
              </span>
            </div>

            {/* Правая часть (иконка + название команды) */}
            <div className="match-team">
              <p>{match.awayTeam.name}</p>
              <Image src="/icons/team-icon.png" alt="Team Icon" width={50} height={50} className="team-icon" />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
