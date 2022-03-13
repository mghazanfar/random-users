import "./users.scss";
import { UserItem } from "./users.item";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const UsersContainer = () => {
const loc = useLocation();
let navigate = useNavigate();
  const [page, setPage] = useState(loc.pathname.replace("/",'') || 1);
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
      let nextPage = `${parseInt(page,10)+1}`
      setSearch("")
      setLoading(true);
      setPage(nextPage);
      fetchData(nextPage);
      
      navigate(`/${nextPage}`)
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
