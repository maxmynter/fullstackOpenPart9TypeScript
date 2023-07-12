import axios from "axios";
import { apiBaseUrl } from "../constants";
import { DiaryEntry, NewDiaryEntry } from "../types";

const getAll = async (): Promise<DiaryEntry[]> => {
  const response = await axios.get<DiaryEntry[]>(`${apiBaseUrl}/diaries`);

  return response.data;
};

const addNew = async (
  newDiaryEntry: NewDiaryEntry
): Promise<string | DiaryEntry> => {
  try {
    const response = await axios.post<DiaryEntry>(
      `${apiBaseUrl}/diaries`,
      newDiaryEntry
    );
    return response.data;
  } catch (e) {
    console.log("🚀 ~ file: diaryService.ts:21 ~ e:", e);
    if (axios.isAxiosError(e)) {
      const error = e;
      return error.request.response;
    } else {
      console.error("Something went terribly wrong", e);
      return e as string;
    }
  }
};

export default { getAll, addNew };
