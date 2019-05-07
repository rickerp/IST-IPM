import React, { useContext } from 'react'
import { AppContext } from "../context"
import User from "./User"
import styled from "styled-components"

export default function FriendsList(props) {
    const value = useContext(AppContext);

    return (
        <>
            <FriendsHeader>Friends</FriendsHeader>
            {value.state.usersData.map(item => {
                if (item.added) {
                    return <User key={item.id} item={item} />   
                }
            })}
        </>
    )
}

const FriendsHeader = styled.h3`
    text-align: center;
    margin-bottom: 10px;
`
