import React, { useState, useRef, useEffect } from 'react';
import '../CSS/devices.css';
import { useHistory, withRouter } from 'react-router-dom';
import { NotificationManager } from "react-notifications";
import _ from "lodash";
import axios from 'axios';
import {devicesAPI} from '../Url/ApiList';


const Devices = () => {
    const [activeDevices, setActiveDevices] = useState(3);
    const [activeUserData, setActiveUserData] = useState([]);
    const graph = useRef(null);

    const history = useHistory();

    // useEffect(() => {
    //     const interval = setInterval(async () => {
    //     //   setActiveDevices(activeDevices+1)
    //     try{
    //         let updatePoll = await axios.get(devicesAPI, null);
    //         let pollUserList = updatePoll.data.devices;
    //         setActiveUserData(pollUserList);
    //         setActiveDevices(pollUserList.length);
    //     }catch(error){
    //         if (error.response) {
    //             let message = "Some Error Occured"
    //             NotificationManager.error(message, "Error", 5000);
    //         } else if (error.request) {
    //             NotificationManager.error("Error Connecting...", "Error", 5000);
    //         } else if (error) {
    //             NotificationManager.error(error.toString(), "Error", 5000);
    //         }
    //     }
        
    //       }, 5000);          
    //     return () => clearInterval(interval);
    //   }, [activeDevices]);



    useEffect(() => {
        const ciclegraph = graph.current;
        const circleElements = ciclegraph.childNodes;


        let angle = 360 - 90;
        let dangle = 360 / circleElements.length;

        for (let i = 0; i < circleElements.length; i++) {
            let circle = circleElements[i];
            angle += dangle;
            circle.style.transform = `rotate(${angle}deg) translate(${ciclegraph.clientWidth / 2
                }px) rotate(-${angle}deg)`;
        }
    }, [activeDevices]);


    // Notify
    let notify = () =>{
        console.log("notify");
    }

    // Logout
    let logout =()=>{
        localStorage.removeItem('token');
        history.replace('/');
    }


    return (
        <div>
            <div id="showcase">
                <div className="home">
                    <div className="show">
                        <h3>{activeDevices}</h3>
                        <p>DEVICES ONLINE</p>
                    </div>

                    <div>                    
                    <div className="ciclegraph" ref={graph}>
                    {_.times(activeDevices, (i) => (
                        <div className="circle" key={i}/>
                      ))}
                    </div>
                    </div>

                   
                    

                </div>
            </div>
            <div id="footbar">
                <button type="button" className="btn btn-light" onClick={notify}>NOTIFY</button>
                <button type="button" className="btn btn-dark" onClick={logout}>LOG OUT</button>
            </div>
        </div>
    )
}

export default withRouter(Devices);
