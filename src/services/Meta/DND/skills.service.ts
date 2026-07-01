

export async function calculateSkillAtributeRelation() {
    
}


export function calculateSkillCheckBonusString(e:number,pb:number,t:boolean):string{
    const value = Math.floor((e - 10) / 2)
    //Faz o calculo que já estamos acostumados mas somando o bonus de proficiencia se ele for treinado na skill
    const numeric_value = value + (t? pb : 0);
    return (numeric_value>0? "+" : " ") + String(numeric_value);
}