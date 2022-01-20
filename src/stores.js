import { writable } from 'svelte/store';

//* to trigger refetch on login/logout
export const fetchNewsTrigger = writable(undefined);
//* options for the api calls
export const fetchOptions = writable({ order: 'DESC', filter: 'date' });

//* sidebar button in active state
export const activeButton = writable('new');

//* AUTH

export const user = writable({});
export const isAuthed = writable(false);
