// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

const functions = require('firebase-functions');
const request = require('request-promise');

const LINE_MESSAGING_API = 'https://api.line.me/v2/bot/message';
const LINE_HEADER = {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer 4VJajJD+7v5u0As86vRMWFuh7HGpJJvE3hdjT9lKE/1IVwapX9HOnrGtIkh2YiW21FNBaEkViUuBQALZ3iYoyi5piJN6/NtOzEv0eFYSVnRYSgw7Ph7EKACIukP73QGBz6AnMocajJ2adv8JASE23QdB04t89/1O/w1cDnyilFU='
};

exports.LineBot = functions.https.onRequest((req, res) => {
    if(req.body.events[0].message.type !== 'text'){
        return;
    }
    reply(req.body);
});

const reply = (bodyResponse) => {
    return request({
        method: 'Post',
        uri: '${LINE_MESSAGING_API}/reply',
        headers: LINE_HEADER,
        body: JSON.stringify({
            replyToken: bodyResponse.events[0].replyToken,
            message: [
                {
                    type: 'text',
                    text: bodyResponse.events[0].message.texdt
                }
            ]
        })
    });
}