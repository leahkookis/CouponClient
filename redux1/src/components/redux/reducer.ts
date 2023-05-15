import { Action } from "./action";
import { ActionType } from "./action-types";
import { AppState } from "./app-state";

export function reduce(oldAppState: AppState = {answer: 0}, action: Action): AppState {

    const newAppState = { ...oldAppState };

    switch (action.type) {
        case ActionType.Answer:
            newAppState.answer = action.payload.answer;
            break;
    }

    return newAppState;
}