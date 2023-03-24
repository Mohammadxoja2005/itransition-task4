import React, { FC, useState, useEffect, useRef } from 'react'
// styles 
import styles from "./index.module.scss";
//  services
import { useGetUsersQuery } from "../../../../../services/users";
// icons
import CHECK from "../../../../../assets/icons/check.png";
// jotai 
import { useAtom } from "jotai";
import { useSearch } from '../../../../../hooks/useSearch';
import axios from "axios";

const TABLE: FC = (): any => {
    const { data, isLoading }: any = useGetUsersQuery('');
    const [usersArr, setUsersArr] = useState<Array<String | Number>>([]);

    const checkbox = useRef<Array<HTMLInputElement | null>>([]);

    useEffect(() => {

        const arr: any = new Set();
        const checkboxDefault: any = document.querySelector("#checkboxDefault");

        checkboxDefault.addEventListener('click', () => {
            checkbox.current.forEach((value: any) => {
                if (checkboxDefault.checked) {
                    value.checked = true;
                    arr.add(value.getAttribute('data-id'));
                    setUsersArr([...arr])
                } else { 
                    value.checked = false;
                    arr.delete(value.getAttribute('data-id'))
                    setUsersArr([...arr])
                }
            })
        })

        checkbox.current.forEach((value: any) => {

            value.addEventListener('click', () => {

                if (value.checked) {
                    arr.add(value.getAttribute('data-id'));
                    setUsersArr([...arr])
                } else {
                    arr.delete(value.getAttribute('data-id'))
                    setUsersArr([...arr])
                }

            })

        })
    }, [data])

    const deleteUsers = () => {
        for (let i = 0; i < usersArr.length; ++i) {
            if (data[i].id == usersArr[i]) {
                if (data[i].username == localStorage.getItem("isUser")) {
                    localStorage.removeItem("isUser");
                    localStorage.removeItem("status");
                }
            }
        }

        axios.delete(`http://localhost:3003/auth/delete/${usersArr}`);

        window.location.reload();
    }

    const blockUsers = () => {

        axios.put(`http://localhost:3003/auth/block/${usersArr}`);

        for (let i = 0; i < usersArr.length; ++i) {
            if (data[i].id == usersArr[i]) {
                if (data[i].username == localStorage.getItem("isUser")) {
                    localStorage.removeItem("isUser");
                    localStorage.removeItem("status");
                }
            }
        }

        window.location.reload();
    }

    const unblockUsers = () => {
        axios.put(`http://localhost:3003/auth/unblock/${usersArr}`);
        window.location.reload();
    }

    return (
        <div className={styles.table}>

            <div className={styles.btn_div}>
                <button className={styles.block} onClick={() => blockUsers()}>
                    Block
                </button>
                <button className={styles.unblock} onClick={() => unblockUsers()}>
                    Unblock
                </button>
                <button className={styles.delete} onClick={() => deleteUsers()} >
                    Delete
                </button>
            </div>

            <table className={styles.table_table}>
                <tr className={styles.table_tr}>
                    <div className={styles.table_th}>
                        <input
                            type="checkbox"
                            defaultValue=""
                            id="checkboxDefault"
                        />
                    </div>
                    {/* <th className={styles.table_th}><img className={styles.table_img} src={CHECK} alt="" /></th> */}
                    <th className={styles.table_th}>Id</th>
                    <th className={styles.table_th}>Name</th>
                    <th className={styles.table_th}>E-mail</th>
                    <th className={styles.table_th}>Last Login Time</th>
                    <th className={styles.table_th}>Registration Time</th>
                    <th className={styles.table_th}>Status</th>
                </tr>
                {data && data.map((value: any, index: number) => {
                    return (
                        <tr key={index}>
                            {/* <td className={styles.table_td}><img className={styles.table_img} src={CHECK} alt="" /></td> */}
                            <td className={styles.table_td}>
                                <input
                                    type="checkbox"
                                    defaultValue=""
                                    id="checkboxDefault"
                                    ref={el => checkbox.current[index] = el}
                                    data-id={value.id}
                                />
                            </td>
                            <td className={styles.table_td}>{value.id}</td>
                            <td className={styles.table_td}>{value.username}</td>
                            <td className={styles.table_td}>{value.email}</td>
                            <td className={styles.table_td}>{value.login_time}</td>
                            <td className={styles.table_td}>{value.register_time}</td>
                            <td className={styles.table_td}>{value.status ? "Active" : "Blocked"}</td>
                        </tr>
                    )
                })}
            </table>
        </div>
    )
}

export default TABLE;