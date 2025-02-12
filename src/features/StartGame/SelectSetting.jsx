import styles from "./../../styles/StartGame.module.scss";
import { useGameSettings } from "../../GameSettings";
import { useState } from "react";

function SelectSetting({ setting, title, options }) {
  const { gameSettings, setTheme, setPlayers, setGrid, setTiles } = useGameSettings();
  const { theme, players, grid, tiles } = gameSettings;

  const [current, setCurrent] = useState(() => {
    if (setting === "theme") return theme || options[0];
    if (setting === "players") return players || options[0];
    if (setting === "grid") return grid === "4" ? "4x4" : grid === "6" ? "6x6" : options[0];
    if (setting === "tiles") return tiles || options[0];
    return options[0];
  });

  const handleClick = ({ target }) => {
    if (target.nodeName !== "BUTTON") return;

    setCurrent(target.textContent);

    if (setting === "theme") setTheme(target.textContent);
    if (setting === "players") setPlayers(target.textContent);
    if (setting === "grid") setGrid(target.textContent[0]);
    if (setting === "tiles") setTiles(target.textContent);
  };

  return (
    <div className={styles.box}>
      <p>{title}</p>
      <div onClick={handleClick}>
        {options.map((option) => {
          return (
            <button key={option} className={option === current ? styles.active : ""}>
              {option}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default SelectSetting;
