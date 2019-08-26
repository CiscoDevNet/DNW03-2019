/**
 * Posts a message to a Webex Teams space via a Bot account
 *
 * Prep work:
 *      from a ssh session, type the commands below:
 *      > xConfiguration HttpClient Mode: On
 *      > xConfiguration HttpClient AllowInsecureHTTPS: True
 *
 */

const xapi = require('xapi');

function push(msg, cb) {

    const token = "OGMyZDc3NWQtYTIyNi00MGM5LTk1YzAtMzFlMTc5ZmMwYTgwODdjZTM1ODQtMmRh_PF84_1eb65fdf-9643-417f-9974-ad72cae0e10f"
    // replace with a space your bot is part of
    const roomId = "Y2lzY29zcGFyazovL3VzL1JPT00vODJiY2FkNzAtYzgyMS0xMWU5LWI0YzQtYTU2OThlNTFjZTZj"

    // Post message
    let payload = {
        "markdown": msg,
        "roomId": roomId
    }
    xapi.command(
        'HttpClient Post',
        {
            Header: ["Content-Type: application/json", "Authorization: Bearer " + token],
            Url: "https://api.ciscospark.com/v1/messages",
            AllowInsecureHTTPS: "True"
        },
        JSON.stringify(payload))
        .then((response) => {
            if (response.StatusCode == 200) {
                console.log("message pushed to Webex Teams")
                if (cb) cb(null, response.StatusCode)
                return
            }

            console.log("failed with status code: " + response.StatusCode)
            if (cb) cb("failed with status code: " + response.StatusCode, response.StatusCode)
        })
        .catch((err) => {
            console.log("failed with err: " + err.message)
            if (cb) cb("Could not post message to Webex Teams")
        })
}

push('Hi, this is CHANGEME checking in...', console.log)
