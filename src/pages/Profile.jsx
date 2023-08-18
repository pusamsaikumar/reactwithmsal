import { ProfileData } from "../components/ProfileData";
import { useMsalAuthentication } from "@azure/msal-react";
import { InteractionType } from "@azure/msal-browser";
import React, { useEffect ,useState} from "react";
import { fetchData } from "../fetch";


export const Profile = () => {
 const [graphData , setGraphData] = useState(null);

 console.log("graph",graphData)
    const {result,error} = useMsalAuthentication(InteractionType.Popup,{
        scopes:["user.read"],
        claims:sessionStorage.getItem("claimsChallenge") ? window.atob(sessionStorage.getItem('claimsChallenge')) : undefined
    });
    useEffect(()=>{
        if(!!graphData){
            return; 
        }
        if(!!error){
            console.log(error);
            return;
        }
        if(result){
            const {accessToken} = result;
            fetchData('https://graph.microsoft.com/v1.0/me',accessToken)
            .then((response) =>{
                console.log("res",response);
                setGraphData(response)
            })
             
            .catch((error) => console.log(error))
        }
    },[graphData,result,error])
    return (
        <>
        {
            graphData ? <ProfileData graphData={graphData} /> : null        }
            {/* <ProfileData graphData={{
                displayName: 'Dummy Joe',
                jobTitle: 'Dummy Title',
                mail: 'dummy@mail.com',
                businessPhones: ['1234567890'],
                officeLocation: 'dummy address',
            }} /> */}
        </>
    )
}