import React, { useEffect, useState } from "react";
import diaryService from "./services/diaryService";
import { DiaryEntry, NewDiaryEntry, Visibility, Weather } from "./types";

const RadioButtons = ({
  buttons,
  setAttribute,
}: {
  buttons: string[];
  setAttribute: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const [selected, setSelected] = useState<string>(buttons[0]);
  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      {buttons.map((buttonValue: string) => {
        return (
          <div key={buttonValue}>
            <input
              type="radio"
              id={buttonValue}
              value={buttonValue}
              checked={buttonValue === selected}
              onChange={() => {
                setAttribute(buttonValue);
                setSelected(buttonValue);
              }}
            />
            <label htmlFor={buttonValue}>{buttonValue}</label>
          </div>
        );
      })}
    </div>
  );
};

const NewEntryAttribute = ({
  attributeName,
  setAttribute,
  attributeValue,
}: {
  attributeName: string;
  setAttribute: React.Dispatch<React.SetStateAction<string>>;
  attributeValue: string;
}) => {
  const getInput = (attributeName: string) => {
    switch (attributeName) {
      case "Date":
        return (
          <>
            <input
              type="date"
              id="start"
              name="trip-start"
              value={attributeValue}
              onChange={(event) => setAttribute(event.target.value)}
            />
          </>
        );
      case "Visibility":
        return (
          <>
            {
              <RadioButtons
                buttons={["great", "good", "ok", "poor"]}
                setAttribute={setAttribute}
              />
            }
          </>
        );
      case "Weather":
        return (
          <>
            {
              <RadioButtons
                buttons={["sunny", "rainy", "cloudy", "stromy", "windy"]}
                setAttribute={setAttribute}
              />
            }
          </>
        );
      default:
        return (
          <>
            <input
              style={{ height: 11 }}
              value={attributeValue}
              onChange={(event) => setAttribute(event.target.value)}
            />
          </>
        );
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "left",
      }}
    >
      <p style={{ padding: 3 }}>{attributeName}</p>
      {getInput(attributeName)}
    </div>
  );
};

const AddDiary = ({
  setDiaries,
}: {
  setDiaries: React.Dispatch<React.SetStateAction<DiaryEntry[]>>;
}) => {
  const [date, setDate] = useState<string>(String(new Date()));
  const [visibility, setVisibility] = useState<string>("");
  const [weather, setWeather] = useState<string>("");
  const [comment, setComment] = useState<string>("");
  const [error, setError] = useState<string>("");

  const onClickSubmit = async (): Promise<void> => {
    const visibilityWithType: Visibility = visibility as Visibility;
    const weatherWithType: Weather = weather as Weather;
    const newEntry: NewDiaryEntry = {
      date,
      visibility: visibilityWithType,
      weather: weatherWithType,
      comment,
    };

    const result = await diaryService.addNew(newEntry);
    if (result as DiaryEntry) {
      setDate("");
      setVisibility("");
      setWeather("");
      setComment("");
      setDiaries(await diaryService.getAll());
    }
    if (typeof result === "string") {
      setError(result);
      setTimeout(() => {
        setError("");
      }, 3000);
    }
  };

  return (
    <div>
      {error && <p style={{ color: "red" }}>Error: {error}</p>}
      <NewEntryAttribute
        attributeName="Date"
        setAttribute={setDate}
        attributeValue={date}
      />
      <NewEntryAttribute
        attributeName="Visibility"
        setAttribute={setVisibility}
        attributeValue={visibility}
      />
      <NewEntryAttribute
        attributeName="Weather"
        setAttribute={setWeather}
        attributeValue={weather}
      />
      <NewEntryAttribute
        attributeName="comment"
        setAttribute={setComment}
        attributeValue={comment}
      />
      <button onClick={onClickSubmit}>Submit</button>
    </div>
  );
};

function App() {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);
  useEffect(() => {
    const getDiariesFromBackend = async () => {
      setDiaries(await diaryService.getAll());
    };
    getDiariesFromBackend();
  }, []);

  return (
    <div>
      <h1>Add new Entry</h1>
      <AddDiary setDiaries={setDiaries} />
      <h1>Diary Entries</h1>
      {diaries.map((diary) => (
        <div key={diary.date}>
          <h2>
            <b>{diary.date}</b>
          </h2>
          <p>Visibility: {diary.visibility}</p>
          <p>Weather: {diary.weather}</p>
          {diary.comment ? (
            <p>
              Comment: <i>{diary.comment}</i>
            </p>
          ) : (
            <></>
          )}
        </div>
      ))}
    </div>
  );
}

export default App;
