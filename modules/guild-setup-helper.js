const setupSteps = [
    {
        message: "How many days would you like to set the inactive threshold at?",
        action: (message, responseData) => {
            return new Promise((resolve, reject) => {
                //expect the message to be an integer value
                const response = parseInt(message.content);
                if (response && response > 0)
                    resolve(responseData.inactiveThresholdDays = response);
                else
                    reject("Value must be a whole number of days greater than 0");
            });
        }
    },
    {
        message: "Please @mention the role you wish to use to indicate an *active* user",
        action: (message, responseData) => {
            return new Promise((resolve, reject) => {
                //expect the message to be in the format @<snowflake>
                if (message.mentions.roles.size > 0)
                    resolve(responseData.activeRoleID = message.mentions.roles.first().id);
                else
                    reject("You must @mention an existing role");
            });
        }
    },
    {
        message: "Would you like the bot to *add* people to this role if they send a message and *don't* already have it? (yes/no)",
        action: (message, responseData) => {
            return new Promise((resolve, reject) => {
                //expect the message to be "yes" or "no"
                const msg = message.content.toLowerCase();
                if (msg === "yes" || msg === "no")
                    resolve(responseData.allowRoleAddition = msg === "yes");
                else
                    reject("Please respond with either 'yes' or 'no'");
            });
        }
    },
    {
        message: "Please @mention the role you wish to use to indicate an *inactive* user, or type 'disable' if you don't want this feature",
        action: (message, responseData) => {
            return new Promise((resolve, reject) => {
                if (message.mentions.roles.size > 0)
                    resolve(responseData.inactiveRoleID = message.mentions.roles.first().id);
                else if (message.content.toLowerCase() === "disable")
                    resolve(responseData.inactiveRoleID = "disabled");
                else
                    reject("Please @mention a role or say 'disable'");
            });
        }
    },
    {
        message: "Please @mention any *members* or *roles* who are to be exempt from being marked/unmarked as active (or type 'none')",
        action: (message, responseData) => {
            return new Promise((resolve, reject) => {
                responseData.ignoredUserIDs = [];
                responseData.ignoredRoleIDs = [];
                if (message.mentions.members.size > 0 || message.mentions.roles.size > 0) {
                    message.mentions.members.forEach(member => responseData.ignoredUserIDs.push(member.id));
                    message.mentions.roles.forEach(role => responseData.ignoredRoleIDs.push(role.id));
                    resolve();
                }
                else if (message.content.toLowerCase() !== "none")
                    reject("Please either @mention some members or type 'none'");
                else
                    resolve();
            });
        }
    }
];

function ask(client, textChannel, member, question) {
    //return a promise which will resolve once the user next sends a message in this textChannel
    return new Promise((resolve, reject) => {
        const cancelAsk = () => {
            client.removeListener("message", handler);
            textChannel.send("Response to question timed out");
        };

        const askTimeout = setTimeout(cancelAsk, 60000/*InternalConfig.askTimeout*/);

        const handler = responseMessage => {
            if (responseMessage.channel.id === textChannel.id && responseMessage.member && responseMessage.member.id === member.id) {
                clearTimeout(askTimeout);
                resolve(responseMessage);
            }
        };

        client.on("message", handler);

        textChannel.send(member.toString() + " " + question).catch(reject);
    });
}

module.exports = class {
    constructor(message) {
        this.guild = message.channel.guild;
    }

    walkThroughSetup(client, textChannel, member, existingUsers) {
        return new Promise((resolve, reject) => {
            var responseData = {};
            //use a closure to count up the steps
            const askNext = (() => {
                let i = 0;
                return (overrideMsg) => {
                    if (i <= setupSteps.length - 1)
                        //ask in the channel and wait for the promised response before asking the next question
                        ask(client, textChannel, member, overrideMsg || setupSteps[i].message)
                            .then(response => {
                                setupSteps[i].action(response, responseData)
                                    .then(() => { i++; askNext(); })
                                    .catch(e => askNext(e));
                            }).catch(reject);
                    else
                        resolve({
                            inactiveThresholdDays: responseData.inactiveThresholdDays,
                            activeRoleID: responseData.activeRoleID,
                            inactiveRoleID: responseData.inactiveRoleID,
                            users: existingUsers || {},
                            allowRoleAddition: responseData.allowRoleAddition,
                            ignoredUserIDs: responseData.ignoredUserIDs,
                            ignoredRoleIDs: responseData.ignoredRoleIDs
                        });
                };
            })();
            askNext();
        });
    }
};
