from pathlib import Path

path=Path(__file__).resolve().parents[1]/"src"/"engine.ts"
s=path.read_text(encoding="utf-8")


def add_after(anchor, addition):
    global s
    if addition.strip() in s:
        return
    if anchor not in s:
        raise SystemExit(f"H069 anchor missing: {anchor[:120]}")
    s=s.replace(anchor, anchor+addition, 1)


def replace_once(old,new,marker):
    global s
    if marker in s:
        return
    if old not in s:
        raise SystemExit(f"H069 anchor missing: {old[:120]}")
    s=s.replace(old,new,1)

add_after(
    'import {buildTurnOrder,createEmptyTurnState,RoundPhase,TurnEntry} from "./turn-order.js";\n',
    'import {advanceResidenceRoundStart,applyMarriageResidence,finalizeResidenceEndRound,initializeCharacterResidence,markCharacterResidenceOriginImmigrant,reconcileResidenceAfterDeath} from "./residence.js";\n'
)
replace_once(
    '      households:{},\n      marriageProposals:{},',
    '      households:{},\n      residences:{},\n      marriageProposals:{},',
    '      residences:{},'
)
replace_once(
    '      id,ownerId,householdId:hId,npc,persona,ageStage:stage,alive:true,',
    '      id,ownerId,householdId:hId,npc,persona,ageStage:stage,alive:true,currentResidenceId:"",residenceAdultTransitionHandled:stage>=3,',
    'residenceAdultTransitionHandled:stage>=3'
)
add_after(
    '    this.state.households[hId]!.memberIds.push(id);\n',
    '    initializeCharacterResidence(this.state,c,parentHouseholdId);\n'
)
replace_once(
    '      c.immigrant=true;',
    '      c.immigrant=true;markCharacterResidenceOriginImmigrant(this.state,c);',
    'markCharacterResidenceOriginImmigrant(this.state,c)'
)
replace_once(
    '    if(paidBeforeMerge>0||resolved!==ha.status){\n      this.state.statusPurchases[ha.id]={householdId:ha.id,requested:desired,paid:required,purchaserCharacterId:ha.pendingStatusPurchaserId??a.id,round:this.state.round,resolvedStatus:resolved!==desired?resolved:undefined,refund:mergeRefund||undefined};\n    }\n  }\n\n  canInitiateBirth(h:Household){',
    '    if(paidBeforeMerge>0||resolved!==ha.status){\n      this.state.statusPurchases[ha.id]={householdId:ha.id,requested:desired,paid:required,purchaserCharacterId:ha.pendingStatusPurchaserId??a.id,round:this.state.round,resolvedStatus:resolved!==desired?resolved:undefined,refund:mergeRefund||undefined};\n    }\n    applyMarriageResidence(this.state,a,b);\n  }\n\n  canInitiateBirth(h:Household){',
    'applyMarriageResidence(this.state,a,b);'
)
replace_once(
    '    if(this.state.ended)throw Error("game ended");if(this.state.round>=this.cfg.game.totalRounds)throw Error("completed");this.state.round++;\n',
    '    if(this.state.ended)throw Error("game ended");if(this.state.round>=this.cfg.game.totalRounds)throw Error("completed");this.state.round++;\n    advanceResidenceRoundStart(this.state);\n',
    'advanceResidenceRoundStart(this.state);'
)
replace_once(
    '    this.recordLifecycleResult({type:"death",characterIds:[a.id,b.id],householdId:h.id,cause:reason,joint:true,medicalDue:null,medicalPaid:null,estateTotal:null,beneficiaries:[],governmentTransfer:0,playerId:null,queuePosition:null,assignmentReason:null});\n    this.settleEstate(h,h.childrenIds,[a.id,b.id],true);\n    this.state.chronology.push(`[Vòng ${this.state.round}] ${a.id} và ${b.id}: tử vong cùng cuối vòng; di sản hộ chia cho các con còn sống`);',
    '    this.recordLifecycleResult({type:"death",characterIds:[a.id,b.id],householdId:h.id,cause:reason,joint:true,medicalDue:null,medicalPaid:null,estateTotal:null,beneficiaries:[],governmentTransfer:0,playerId:null,queuePosition:null,assignmentReason:null});\n    this.settleEstate(h,h.childrenIds,[a.id,b.id],true);\n    reconcileResidenceAfterDeath(this.state);\n    this.state.chronology.push(`[Vòng ${this.state.round}] ${a.id} và ${b.id}: tử vong cùng cuối vòng; di sản hộ chia cho các con còn sống`);',
    'this.settleEstate(h,h.childrenIds,[a.id,b.id],true);\n    reconcileResidenceAfterDeath(this.state);'
)
replace_once(
    '    for(const c of [...this.alive()]){if(c.birthRound===this.state.round)continue;c.ageStage++;const cohort=this.cohort(c);if(c.ageStage===2)cohort.reachedStage2++;if(c.ageStage===3)cohort.reachedWorker++;if(c.ageStage===7)cohort.reachedElder++}\n    // Noble cap is decided after deaths/aging; pending status activates only now.',
    '    for(const c of [...this.alive()]){if(c.birthRound===this.state.round)continue;c.ageStage++;const cohort=this.cohort(c);if(c.ageStage===2)cohort.reachedStage2++;if(c.ageStage===3)cohort.reachedWorker++;if(c.ageStage===7)cohort.reachedElder++}\n    finalizeResidenceEndRound(this.state);\n    // Noble cap is decided after deaths/aging; pending status activates only now.',
    'finalizeResidenceEndRound(this.state);'
)
replace_once(
    '    }else{\n      const surviving=h.memberIds.map(id=>this.state.characters[id]).filter((x):x is Character=>!!x&&x.alive);\n      if(surviving.length===0)this.settleEstate(h,c.childrenIds,[c.id]);\n    }\n    this.state.chronology.push(`[Vòng ${this.state.round}] ${c.id}: ${reason}`);',
    '    }else{\n      const surviving=h.memberIds.map(id=>this.state.characters[id]).filter((x):x is Character=>!!x&&x.alive);\n      if(surviving.length===0)this.settleEstate(h,c.childrenIds,[c.id]);\n    }\n    reconcileResidenceAfterDeath(this.state);\n    this.state.chronology.push(`[Vòng ${this.state.round}] ${c.id}: ${reason}`);',
    'if(surviving.length===0)this.settleEstate(h,c.childrenIds,[c.id]);\n    }\n    reconcileResidenceAfterDeath(this.state);'
)
replace_once(
    '    this.settleEstate(h,h.childrenIds,members.map(c=>c.id),members.length>1);this.state.chronology.push(`[Vòng ${this.state.round}] Hộ ${h.id}: phá sản; mọi lượt còn lại bị hủy.`);',
    '    this.settleEstate(h,h.childrenIds,members.map(c=>c.id),members.length>1);reconcileResidenceAfterDeath(this.state);this.state.chronology.push(`[Vòng ${this.state.round}] Hộ ${h.id}: phá sản; mọi lượt còn lại bị hủy.`);',
    'members.length>1);reconcileResidenceAfterDeath(this.state);'
)

path.write_text(s,encoding="utf-8")
print("H069 Residence hooks applied/idempotent")
