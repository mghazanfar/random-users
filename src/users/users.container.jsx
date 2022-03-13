import "./users.scss";
import { UserItem } from "./users.item";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";

export const UsersContainer = () => {
  const [page, setPage] = useState(window.location.pathname.replace("/",'') || 1);
  debugger
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [searchData, setSearchData] = useState([]);

    const fetchData = (pageNumber) => {

    axios.get(`https://randomuser.me/api/?page=${pageNumber}&results=10`).then((res) => {
        setLoading(false);
        setData(res.data.results);
      });
    }

  useEffect(() => {
    setLoading(true);
    fetchData(page)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleNext = () => {
      setSearch("")
      setLoading(true);
      setPage(page+1);
      fetchData(page+1);
      window.history.pushState(undefined,undefined,`${page+1}`)
  }

  const handleChange = (e) => {
      setSearch(e.target.value);
      setSearchData(data.filter(user=> user.login.username.includes(e.target.value)))
  }

  const dataToRender = search.length > 0 ? searchData : data;

  return (
    <div className="mt-5">
      <div className="d-flex mb-3">
        <h2>Page {page}</h2>
        <button className="ml-5" disabled={loading} onClick={handleNext}>
          Next
        </button>
        <input className="input" placeholder="Search by username" type="text" onChange={handleChange} value={search}/>
      </div>
      {loading
        ? `Loading data for page ${page}`
        : dataToRender.map((user) => <UserItem user={user} />)}
    </div>
  );
};
