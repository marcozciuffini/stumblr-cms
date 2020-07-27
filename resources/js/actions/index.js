import {
    SET_TOWN
} from "../constants";

export function setTownId(id) {
    return { type: SET_TOWN, payload: id }
}
