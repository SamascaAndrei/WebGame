
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { ProgressBar } from 'react-bootstrap'
import { useState, useEffect, useMemo } from 'react';
import UsersService from '../../services/UsersService';
import ItemsService from '../../services/ItemsService';






const Fishing = () => {


  const [isActive, setIsActive] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [progressBar, setProgressBar] = useState('');
  const [item, setItem] = useState('');
  var user=JSON.parse(localStorage.getItem("userData"));
  useEffect(() => {
    let timer = null;
    if (isActive) {
      timer = setInterval(() => {
        if ( seconds< 101) {
          setSeconds((seconds) => seconds + 20);
          setProgressBar(<ProgressBar animated striped variant="success" now={seconds} style={{ marginTop: 100 }}></ProgressBar>)
        }
        else {
          UsersService.addItem(user.id, "64612add03420820d80e07a4");
          ItemsService.getItemById("64612add03420820d80e07a4").then((response)=>{
            setItem(response.data);
            
          }).catch(err=>{
            console.log(err);
          })
          setProgressBar(<div className="alert alert-success" role="alert" style={{ marginTop: 100 }}>
            <h4 className="alert-heading" >Action Complete</h4>
            <p>You caught a fish:</p>
            {item.name}
            <img src={item.image}></img>
          </div>)
          setSeconds(0)
          setIsActive(false)
        }
      }, 1000);
    }
    return () => {
      clearInterval(timer);
    };
  });
  return (
    <div>

      <br />
      <Link to="/jobs" className="btn btn-primary btn-sm" style={{ marginTop: 10 }}>Back</Link>
      <br />
      {progressBar}
      <br />
      <button onClick={() => {
        setIsActive(true);
      }}> Start </button>

    </div>
  );
};

export default Fishing