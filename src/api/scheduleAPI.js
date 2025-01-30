import { useEffect, useState } from "react";
import axiosInstance from "./axiosInstance";

export const useScheduleDetail = (scheduleId) => {
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!scheduleId) return;

    const fetchEvent = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get(
          `/api/v1/wedding/schedules/${scheduleId}`
        );
        setEvent(response.data);
      } catch (err) {
        setError(err.response?.data?.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [scheduleId]);

  return { event, loading, error };
};
