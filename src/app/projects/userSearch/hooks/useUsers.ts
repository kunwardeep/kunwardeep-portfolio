import { useEffect, useState } from "react";
import { UserData } from "../types";

const useUsers = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error>();
  const [data, setData] = useState<Array<UserData>>();

  useEffect(() => {
    const fn = async () => {
      setLoading(true);

      const url = "https://randomuser.me/api/?results=50";
      try {
        const response = await fetch(url);
        if (!response.ok) {
          setError(new Error(`Response status: ${response.status}`));
        }

        const json = await response.json();
        console.log(json.results);
        setData(json.results);
      } catch (error) {
        console.error("Error happened", error);
        setError(new Error("Error happened"));
      } finally {
        setLoading(false);
      }
    };

    fn();
  }, []);

  return { loading, error, data };
};

export default useUsers;
