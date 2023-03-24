import { Fragment, FC, useState, useEffect } from 'react';
// styles
import styles from "./index.module.scss";
// components  
import LIST from './components/list';
// layouts
import SIDEBAR from '../../layouts/sidebar';
import SEARCH from '../../layouts/search';
import axios from "axios";
import { useUsername } from "../../hooks/userUsername";
import { useAtom } from "jotai";
import { useNavigate } from 'react-router-dom';

const MAIN: FC = () => {

  const navigate = useNavigate();

  const username = localStorage.getItem("isUser");
  const status = localStorage.getItem("status");

  useEffect(() => {
    if (!status || !username) {
      navigate('/')
    }
  }, [username, status])


  return (
    <Fragment>
      {username && status == 'true' ?
        <div className={styles.main}>
          <SIDEBAR />

          <div className={styles.main_list}>
            <SEARCH />
            <LIST />
          </div>

        </div> : <div>you're not registered or most probably blocked</div>
      }
    </Fragment>
  )
}

export default MAIN;