module.exports = function(){
  this.register('monitor-server', `Card (?<title>[a-zA-Z0-9 ]+) monitors (?<url>[a-zA-Z0-9.]+) health every (?<interval>[0-9]+) minutes.`);
}
