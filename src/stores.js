import { writable } from 'svelte/store';

export const fetchOrder = writable('DESC');

//* AUTH

export const isAuthed = writable(false);

export const user = writable({});
