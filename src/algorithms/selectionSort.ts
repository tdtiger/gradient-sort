// セレクションソートを行う関数
export function* selectionSort(input: readonly number[]): Generator<number[], void, unknown>{
    const values = [...input];

    for(let end = values.length - 1; end > 0; end--){
        let minIndex = end;

        for(let i = 0; i < end; i++){
            if(values[i] < values[minIndex]){
                minIndex = i;
            }
        }

        if(minIndex !== end){
            [values[minIndex], values[end]] = [values[end], values[minIndex]];
        }

        yield [...values];
    }
}