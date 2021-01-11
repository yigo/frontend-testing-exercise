import React, { useState } from "react";
import axios from "axios";
const fetchSearch = (q) =>
  axios
    .get(`https://api.giphy.com/v1/gifs/search`, {
      params: {
        q,
        api_key: "7jPydoo1ECn0sU8veaQV8W2FSvRVfqcr",
        limit: 10
      }
    }).then(response => response.data);

export default function GiphyClient() {
  const [search, setSearch] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);

  const handleSubmit = async (e) => {
    setError(null);
    setLoading(true);
    e.preventDefault();
    try {
      const { data } = await fetchSearch(search);
      setData(data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };
  const handleSearchInput = (e) => setSearch(e.target.value);

  return (
    <>
      <h1>Giphy search</h1>
      {error && <p role="alert">{error.message}</p>}
      <form onSubmit={handleSubmit}>
        <label htmlFor="searchinput">Search</label>
        <input
          id="searchinput"
          type="text"
          value={search}
          placeholder="search gif"
          onChange={handleSearchInput}
          disabled={loading}
        />
        <button disabled={loading}>{loading ? "Searching gifs" : "Go"}</button>
      </form>
      <div>
        {data?.length > 0 &&
          data.map(({ images, id, title }) => (
            <img key={id} src={images.fixed_width.url} alt={title} />
          ))}
        {data?.length === 0 && <>No content found.</>}
      </div>
    </>
  );
}
