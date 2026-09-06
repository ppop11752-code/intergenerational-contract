
import {GameEngine} from "./engine.js";
function make(ageWorkers,ageElders,reserve=0,budget=0,debt=300,lastIncome=100){
 const g=new GameEngine(); for(let i=0;i<ageWorkers+ageElders;i++)g.joinPlayer("S"+i);
 const chars=g.alive(); chars.forEach((c,i)=>c.ageStage=i<ageWorkers?4:7);
 g.state.socialSecurity.pensionReserve=reserve;g.state.socialSecurity.payg=0;g.state.socialSecurity.lastWorkerAverageIncome=lastIncome;
 g.state.government.budget=budget;g.state.debt=debt;
 g.startRound();
 return {workers:g.workers().length,elders:g.elders().length,ratio:g.elders().length/Math.max(1,g.workers().length),target:g.state.socialSecurity.pensionTargetThisRound,paid:g.state.socialSecurity.pensionPaidThisRound,payout:g.state.socialSecurity.pensionPayoutRatio,crisis:g.state.socialSecurity.pensionCrisis,reserve:g.state.socialSecurity.pensionReserve};
}
console.log(JSON.stringify({
 young:make(8,2,120,320),
 balanced:make(5,5,120,320),
 aged:make(2,8,20,80),
 extremeAged:make(1,9,0,0)
},null,2));
