module.exports = function(){

  this.register( 'monitor-server', `Card (?<title>[a-zA-Z0-9 ]+) monitors (?<url>[a-zA-Z0-9./:]+) source code every (?<interval>[0-9]+) seconds for the presence of Google Analytics ID (?<string>[0-9A-Z-]+)` );

}
