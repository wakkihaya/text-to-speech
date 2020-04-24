import axios from 'axios';
import qs from 'qs';
require('dotenv').config();


const getMessages = async function () {
    const token = process.env.SLACK_TOKEN;
    const url = 'https://slack.com/api/channels.history';

    const payload = {
        "token": token,
        "channel": 'CST6SDG2F',
        "pretty": 1
    };
    let array =[];

   await axios.get(url + '?' + qs.stringify(payload), {
            headers: {
                'Content-Type': 'application/json;utf-8',
            }
        }).then(res => {
            return res["data"]["messages"];
        }).then(docs =>{
            docs.forEach(doc =>{
                if(doc.type === "message") {
                    array.push(doc.text);
                }
            });
   });
   return array;
};

export default getMessages;
