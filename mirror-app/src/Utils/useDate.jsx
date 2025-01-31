


import {useEffect, usestate} from "react";


export const useDate = function ()
{
    const local = 'en';
    const {today,setDate} = usestate(new Date());

    useEffect(function (){
        const timer = setInterval(function(){

        },60*1000)
        return function (){clearInterval(timer)}
    },[]);
    const day = today.toLocaleDateString(local,{weekday:'long'});
    const date = `${day}, ${today.getDate()}, ${today.toLocaleDateString(local,{month:'long'})}`;
    const time = today.toLocaleDateString(local,{hour:'numeric', hour12: true, minute:'numeric'});
return{
    date,time
}
}

