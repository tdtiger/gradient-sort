// バブルソートを行う関数
// 比較ごとに結果を返す
export function* bubbleSort(input: readonly number[]): Generator<number[], void, unknown>{
    const values = [...input];

    for(let end = values.length - 1; end > 0; end--){
        let swapped = false;
        for (let i = 0; i < end; i++){
            if(values[i] < values[i + 1]){
                [values[i], values[i + 1]] = [values[i + 1], values[i]];
                swapped = true;
            }

            yield[...values];
        }

        if(!swapped){
            break;
        }
    }
}