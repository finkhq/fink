/**
 * fink - Frontend application for interact with fink API.
 * @version 0.0.0
 * @link    https://github.com/finkhq/fink-www
 * @author  fink (https://github.com/finkhq)
 * @license MIT
 */
riot.tag2("timer","<p>Seconds Elapsed: {time}</p>","","",function(t){this.time=t.start||0,this.tick=function(){this.update({time:++this.time})}.bind(this);var i=setInterval(this.tick,1e3);this.on("unmount",function(){clearInterval(i)})},"{ }");