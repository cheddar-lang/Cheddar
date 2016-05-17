// TODO: tests
import {sleep} from 'sleep';

async function juic(froot) {
    await sleep(30 * 60 * 1000);
    return `tried fo thirtee minut an no ${froot} juic`
}

juic('avocad')