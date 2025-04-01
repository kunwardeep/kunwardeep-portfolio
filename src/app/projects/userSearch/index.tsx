"use client";
import { useEffect, useRef, useState } from "react";
import SearchBar from "./components/SearchBar";
import useUsers from "./hooks/useUsers";
import { UserData } from "./types";
import UserDisplay from "./components/UserDisplay";
import Loading from "./components/Loading";
import NoResult from "./components/NoResult";
import { default as ErrorComponent } from "./components/Error";

const UsersDisplay = ({ users }: { users: Array<UserData> }) => {
  return (
    <div className=" flex flex-row flex-wrap p-10 justify-center gap-4">
      {users.map((u) => {
        return <UserDisplay key={u.login.uuid} {...u} />;
      })}
    </div>
  );
};

const DisplayResultsData = ({ count }: { count: number }) => {
  return (
    <>
      <div className="text-3xl p-3">
        <h1>UserDirectory</h1>
      </div>
      <div className="p-1">Total Users: {count}</div>
    </>
  );
};

const UserSearch = () => {
  const { loading, error, data } = useUsers();
  const originalUserData = useRef<Array<UserData>>(null);
  const [displayUsers, setDisplayUsers] = useState<Array<UserData>>();

  useEffect(() => {
    if (data) {
      setDisplayUsers(data);
      originalUserData.current = data;
    }
  }, [data]);

  const searchFn = (value: string) => {
    // do some debouncing here

    if (displayUsers) {
      if (originalUserData.current) {
        if (value === "") {
          setDisplayUsers(originalUserData.current);
        } else {
          const valueToSearch = value.toLowerCase();
          const filteredUsers = originalUserData.current.filter((d) => {
            console.log(d.name.first, d.name.first.includes(value));
            return (
              d.name.first.toLowerCase().includes(valueToSearch) ||
              d.name.last.toLowerCase().includes(valueToSearch)
            );
          });
          console.log(filteredUsers);
          setDisplayUsers(filteredUsers);
        }
      }
    }
  };

  return (
    <div className="bg-amber-300 flex w-full flex-col items-center">
      <DisplayResultsData count={displayUsers?.length ?? 0} />
      <SearchBar searchFn={searchFn} />
      {loading && <Loading />}
      {error && <ErrorComponent />}
      {displayUsers && displayUsers.length > 0 && (
        <UsersDisplay users={displayUsers} />
      )}
      {displayUsers && displayUsers.length === 0 && <NoResult />}
    </div>
  );
};

export default UserSearch;
