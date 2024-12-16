import { useState } from "react";

export default function SearchForm({setSearchParams, query}) {

    const [search, setSearch] = useState(query);

    const handleSearch = (e) => {
        e.preventDefault();
        const search = e.target.search.value;
        setSearchParams({ post: search });
    };

    return (
        <form onSubmit={handleSearch} className="d-flex basis-50 ml-auto">
            <input name="search" type="text" placeholder="Search" value={search} 
            onChange={e => setSearch(e.target.value)}/>
            <button className="btn btn-blue-dimm" type="submit">
                Search
            </button>
        </form>
    );
}
