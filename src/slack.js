import axios from 'axios';
import qs from 'qs';
import dotenv from 'dotenv';

dotenv.config({ path: '../.env'});

const getMessages = async function () {
    const token = process.env.SLACK_TOKEN;
    const url = 'https://slack.com/api/channels.history';

    console.log("token", token)
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
   console.log(array)
   return array;
};

export default getMessages;
