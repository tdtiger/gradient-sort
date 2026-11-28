// 渡された配列をコピーして、シャッフルして返す関数
export function shuffle(input: readonly number[]): number[] {
    const values = [...input];

    for(let i = values.length - 1; i > 0; i--){
        const j = Math.floor(Math.random() * (i + 1));
        [values[i], values[j]] = [values[j], values[i]];
    }

    return values;
}