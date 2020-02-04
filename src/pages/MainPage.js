import React, {useCallback, useContext, useEffect, useState} from 'react';
import {useHttp} from "../hooks/http.hook";
import {AuthContext} from "../context/AuthContext";
import {Loader} from "../components/Loader"
import {SubNavBar} from "../components/SubNavBar"

export const MainPage = () => {
    const {token} = useContext(AuthContext);
    const {loading, request} = useHttp();
    const [ipData, setIpData] = useState([]);


    const sortFromMaxToMin = () => {
        const maxMin = (a, b) => {
            if ( a.view < b.view ){
                return 1;
            }
            if ( a.view > b.view ){
                return -1;
            }
            return 0;
        };

        setIpData([...ipData].sort(maxMin));
        console.log("Sorted data Max to Min: ", ipData);
    };

    const sortFromMinToMax = () => {
        const minMax = (a, b) => {
            if ( a.view > b.view ){
                return 1;
            }
            if ( a.view < b.view ){
                return -1;
            }
            return 0;
        };

        setIpData([...ipData].sort(minMax));
        console.log("Sorted data Min to Max: ", ipData);
    };

   const getAllData = useCallback(async () => {
        try {
            const data = await request('/api/collected/', 'GET', null, {
                Authorization: `Bearer ${token}`
            });
            console.log("All IPs from DB: ", data);
            setIpData(data)
        } catch (e) {}
    }, [request, token]);

   useEffect(() => {
       getAllData()
   },[getAllData]);


    return (
        <>
             <div className={"mainPage-container"}>
                <h2>All IP address from landing pages</h2>
                 <p className={"rules"}>if you want to track parameters Source and Campaign you need to fill in the appropriate fields in the link, example below: </p>
                 <p className={"example"}>
                     https://www.example.com/?utmSource=<span>Facebook</span>&utmCampaign=<span>Tesla</span>
                 </p>
                <SubNavBar reload={getAllData} sortFromMinToMax={sortFromMinToMax} sortFromMaxToMin={sortFromMaxToMin}/>
                {!loading ? <table className={"highlight centered responsive-table"}>
                    <thead>
                    <tr>
                        <th>№</th>
                        <th>Date</th>
                        <th>IP Address</th>
                        <th>Continent</th>
                        <th>Country</th>
                        <th>City</th>
                        <th>View</th>
                        <th>Source</th>
                        <th>Campaign</th>
                    </tr>
                    </thead>
                    <tbody>
                    {ipData ? Object.values(ipData).map((item, key) =>
                        <tr key={key}>
                            <td>{key + 1}</td>
                            <td>{item.date.slice(0, 10)}</td>
                            <td>{item.ip}</td>
                            <td>{item.continent}</td>
                            <td>{item.country}</td>
                            <td>{item.city}</td>
                            <td>{item.view}</td>
                            <td>{item.source}</td>
                            <td>{item.campaign}</td>
                        </tr>) : null}
                    </tbody>
                </table> : <Loader/>}
                {ipData.length ? <p>This is all data on database</p> : <p>No data on database</p>}
            </div>
        </>
    )
};