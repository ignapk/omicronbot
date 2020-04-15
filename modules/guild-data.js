const DateDiff = require("date-diff");
module.exports = class GuildData {
  constructor({ guildID, inactiveThresholdDays, activeRoleID, inactiveRoleID, users, allowRoleAddition, ignoredUserIDs, ignoredRoleIDs }) {
    this.guildID=guildID;
    this.inactiveThresholdDays = inactiveThresholdDays;
//type: Number, default: 7, min: 1
    this.activeRoleID = activeRoleID;
    this.inactiveRoleID = inactiveRoleID;
    this.users = users instanceof Object ? users: {};
    this.allowRoleAddition = allowRoleAddition ? true: false;
    this.ignoredUserIDs = Array.isArray(ignoredUserIDs) ? ignoredUserIDs : [];
    this.ignoredRoleIDs = Array.isArray(ignoredRoleIDs) ? ignoredRoleIDs : [];
  }

  checkUsers(client) {
    const guild = client.guilds.get(this.guildID);
    if (!guild)
      return;

    const now = new Date();
    const role = guild.roles.find(x => x.id === this.activeRoleID);
    if (!role)
      return;

    role.members.forEach(member => {
            //don't ask me why, sometimes member is null, hence the if(member) check
      if (member && !this.users[member.id])
        this.users[member.id] = new Date();

      else if (this.shouldMarkInactive(member, now)) {
        this.doMarkInactive(member);
        delete this.users[member.id];
      }
    });
    client.guildsData.set(guild.name,this);
  }

  shouldMarkInactive(member, now) {
        // @ts-ignore because for whatever reason VSCode thinks .days() isn't available
    const isNowInactive = new DateDiff(now, Date.parse(this.users[member.id])).days() >= this.inactiveThresholdDays;
    return !this.memberIsIgnored(member) && isNowInactive;
  }

  doMarkInactive(member) {
    member.removeRole(this.activeRoleID);
//.catch(err => DiscordUtil.dateError("Error removing active role from user " + member.name + " in guild " + member.guild.name, err.message || err));
    if (this.inactiveRoleID && this.inactiveRoleID !== "disabled")
      member.addRole(this.inactiveRoleID);
  }

  shouldMarkActive(member) {
    const notAlreadyActive = !member.roles.get(this.activeRoleID);
    return !this.memberIsIgnored(member) && notAlreadyActive;
  }

  doMarkActive(member) {
    member.addRole(this.activeRoleID);
//.catch(err => DiscordUtil.dateError(`Error adding active role to user ${member.user.username} in guild ${member.guild.name}\n${err.message || err}`));
    if (this.inactiveRoleID && this.inactiveRoleID !== "disabled")
      member.removeRole(this.inactiveRoleID);
//.catch(err => DiscordUtil.dateError(`Error removing active role from user ${member.user.username} in guild ${member.guild.name}\n${err.message || err}`));
  }

  memberIsIgnored(member) {
    const isIgnoreduser = this.ignoredUserIDs.indexOf(member.id) >= 0;
    const hasIgnoredRole = member.roles.some(role => this.ignoredRoleIDs.indexOf(role.id) >= 0);
    return isIgnoreduser || hasIgnoredRole;
  }

  fromJSON(data) {
    return Object.assign(this, data);
  }
};
