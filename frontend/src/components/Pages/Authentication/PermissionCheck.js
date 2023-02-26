import React, { useContext } from 'react'
import jwt_decode from "jwt-decode";
import { UserContext } from '../../UserContextProvider';


function PermissionCheck(props) {
    const checkisClaimExist = (claim) => {
        const {user} = useContext(UserContext);
        console.log(user.logintoken)
        
        // const token = localStorage.getItem('logintoken')?.logintoken;
        // var decoded = jwt_decode(token);
        // const claims = decoded.claim;
        
        // const token1 = localStorage.getItem('logintoken')?.logintoken;
        // console.log(localStorage.getItem('logintoken'))
        // console.log(`#########`, {props}, token1);
        
        const token = user.logintoken
        console.log(`#########`, {props}, token);
        if(!token) return;
        var decoded = jwt_decode(token);
        const claims = decoded.claim;


        // const claims = [
        //     "emailtemplate_view",
        //     "emailtemplate_edit",
        //     "emailtemplate_add",
        //     "emailtemplate_delete",
        //     "userlist_view",
        //     "userlist_edit",
        //     "userlist_add",
        //     "userlist_delete",
        //     "configuration_view",
        //     "configuration_edit",
        //     "configuration_add",
        //     "configuration_delete",
        //     "blog_view",
        //     "blog_edit",
        //     "blog_add",
        //     "blog_delete"
        // ]
        // const claims = [
        //     "emailtemplate_add",
        //     "emailtemplate_delete",
        //     "emailtemplate_view"
        // ]
        return claims.includes(claim) || claims.some(el => el.startsWith(claim));
    }
    if (checkisClaimExist(props.claim))
        return <>
            {props.children}
        </>
    else return <></>;
}

export default PermissionCheck