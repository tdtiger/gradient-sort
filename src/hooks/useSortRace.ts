import { useCallback, useEffect, useRef, useState } from "react";

import { algorithms } from "../algorithms";
import { sortLanes } from "../data/sortLanes";
import { shuffle } from "../utils/shuffle";
import type { SortAlgorithm, SortId, SortStates } from "../types/sort";

type SortIterator = ReturnType<SortAlgorithm>;

// 全てのソート手法領域に、同じ並びの配列を提供
function createStates(input: readonly number[]): SortStates{
    return Object.fromEntries(
        sortLanes.map((lane) => [
            lane.id, {values: [...input], status: 'idle'}
        ])
    ) as SortStates;
}

export function useSortRace(initialValues: readonly number[]){
    const [states, setStates] = useState<SortStates>(
        () => createStates(initialValues)
    );

    // タイマーや関数から最新状態を参照するための参照
    const statesRef = useRef(states);

    // 一括実行時に渡す共通の初期配置への参照
    const sharedInputRef = useRef([...initialValues]);

    const iteratorsRef = useRef<Partial<Record<SortId, SortIterator>>>({});
    
    const publish = useCallback((next: SortStates) => {
        statesRef.current = next;
        setStates(next);
    }, []);

    useEffect(() => {
        const timer = window.setInterval(() => {
            const next = { ...statesRef.current };
            let changed = false;

            for(const lane of sortLanes){
                const iterator = iteratorsRef.current[lane.id];
                if(!iterator){
                    continue;
                }

                changed = true;

                try{
                    const step = iterator.next();

                    if(step.done === true){
                        delete iteratorsRef.current[lane.id];

                        next[lane.id] = { ...next[lane.id], status: 'done'};
                    }
                    else{
                        next[lane.id] = { values: step.value, status: 'running'};
                    }
                }
                catch(error){
                    delete iteratorsRef.current[lane.id];
                    next[lane.id] = { ...next[lane.id], status: 'error'};
                    console.error(`${lane.id}の実行に失敗`, error);
                }
            }

            if(changed){
                publish(next);
            }
        }, 100);

        return () => {
            window.clearInterval(timer);
            iteratorsRef.current = {};
        };
    }, [publish]);

    function run(id:SortId){
        const algorithm = algorithms[id];
        if(!algorithm || iteratorsRef.current[id]){
            return;
        }

        const current = statesRef.current;

        iteratorsRef.current[id] = algorithm(current[id].values);

        publish({
            ...current, [id]: { ...current[id], status: 'running'}
        });
    }

    function stop(id: SortId){
        if(!iteratorsRef.current[id]){
            return;
        }

        delete iteratorsRef.current[id];

        const current = statesRef.current;

        publish({
            ...current, [id]: {...current[id], states: 'stopped'}
        });
    }

    function shuffleOne(id: SortId){
        delete iteratorsRef.current[id];

        const current = statesRef.current;

        publish({
            ...current, [id]: {values: shuffle(current[id].values), status: 'idle'}
        });
    }

    function runAll(){
        iteratorsRef.current = {};

        const next = createStates(sharedInputRef.current);

        for(const lane of sortLanes){
            const algorithm = algorithms[lane.id];
            if(!algorithm){
                continue;
            }

            iteratorsRef.current[lane.id] = algorithm(next[lane.id].values);

            next[lane.id].status = 'running';
        }

        publish(next);
    }

    function stopAll(){
        iteratorsRef.current = {};

        const next = {...statesRef.current};

        for(const lane of sortLanes){
            if(next[lane.id].status === 'running'){
                next[lane.id] = {...next[lane.id], status: 'stopped'};
            }
        }

        publish(next);
    }

    function shuffleAll(){
        iteratorsRef.current = {};

        sharedInputRef.current = shuffle(sharedInputRef.current);

        publish(createStates(sharedInputRef.current));
    }

    return{
        states, run, stop, shuffleOne,
        runAll, stopAll, shuffleAll
    };
}