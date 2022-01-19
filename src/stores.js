import { writable } from 'svelte/store';

export const fetchOptions = writable({ order: 'DESC', filter: 'date' });

export const loading = writable(false);

//* AUTH

export const isAuthed = writable(false);

export const user = writable({});
