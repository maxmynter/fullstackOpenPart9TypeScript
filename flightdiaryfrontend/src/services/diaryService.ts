import axios from "axios";
import { apiBaseUrl } from "../constants";
import { DiaryEntry, NewDiaryEntry } from "../types";

const getAll = async (): Promise<DiaryEntry[]> => {
  const response = await axios.get<DiaryEntry[]>(`${apiBaseUrl}/diaries`);

  return response.data;
};

const addNew = async (newDiaryEntry: NewDiaryEntry): Promise<DiaryEntry> => {
  const response = await axios.post<DiaryEntry>(
    `${apiBaseUrl}/diaries`,
    newDiaryEntry
  );
  return response.data;
};

export default { getAll, addNew };
