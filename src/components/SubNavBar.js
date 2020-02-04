import React, {useCallback, useContext} from 'react';
import {useHttp} from "../hooks/http.hook";
import {AuthContext} from "../context/AuthContext";

export const SubNavBar = (props) => {
    const {token} = useContext(AuthContext);
    const {request} = useHttp();

    const deleteData = useCallback(async (e) => {
        e.preventDefault();
        const input = document.querySelector("#remove-input");

        try {
            const data = await request('/api/collected/remove', 'POST', {ip: input.value.trim()}, {
                Authorization: `Bearer ${token}`
            });
            console.log("Remove from Database: ", data);
            props.reload()

        } catch (e) {}
    }, [request, token, props]);

    const openRemoveForm = () => {
        const form = document.querySelector("#form").classList.toggle("active")
    };

    return (
        <div className="subNavBar-container">
            <span onClick={() => props.reload()}><i className="material-icons">autorenew</i></span>
            <span onClick={() => props.sortFromMinToMax()}><i className="material-icons">call_received</i></span>
            <span onClick={() => props.sortFromMaxToMin()}><i className="material-icons">call_made</i></span>
            <span onClick={() => openRemoveForm()}><i className="material-icons">clear</i></span>
                <form id={"form"}>
                    <input type="text" placeholder={"IP address"} id={"remove-input"}/>
                    <button type="submit" onClick={(e) => deleteData(e)}>Delete</button>
                </form>
        </div>
    )
};