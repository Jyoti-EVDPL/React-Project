const DisplayClaims = ({ id, register, claimsData }) => {
    const [claims, setClaims] = useState([]);
    const [data, setData] = useState([]);

    useEffect(() => {
        (async () => {
            if (id)
 {
                const res = await axios.get("http://localhost:3000/list-claims/" + id);
                setClaims(res.data);
                const apiClaims = [];
                for (let index = 0; index < res.data.length; index++) {
                    apiClaims[res.data[index].id] = claimsData.includes(res.data[index].claimName);
                    // apiClaims.set(res.data[index].id, true);
                }
                setData(apiClaims);
                return;
            }
        })();
        return;
    }, [id, claimsData]);

    function setClaimData(e, id) {
        data[id] = e.target.checked;
        setData([...data]);
    }


    return (
        <>
            <div>
                {claims && claims.map((ele, i) => {
                    return (
                        <React.Fragment key={ele.id}>
                            <div className="form-check my-2">
                                <input className="form-check-input" checked={data[ele.id]} type="checkbox" id={`claimCheck3${ele.id}`} value={ele.id} onChange={(e) => setClaimData(e, ele.id)} />
                                <label htmlFor={`claimCheck3${ele.id}`} className=" form-check-label" >
                                    {ele.claimName.split("_")[1]}
                                </label>
                            </div>
                        </React.Fragment>
                    )
                })}
            </div>
        </>
    )
}