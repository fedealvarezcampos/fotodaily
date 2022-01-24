import { writable } from 'svelte/store';

//* trigger refetch on login/logout
export const fetchNewsTrigger = writable(undefined);

//* trigger resetItems function
export const resetTrigger = writable('default');

//* options for the api calls
export const fetchOptions = writable({ order: 'DESC', filter: 'date', page: 1 });

//* checking for sidebar presence to avoid layout shift
export const sidebarOut = writable(false);

//* currently active sidebar button
export const activeButton = writable('new');

//* AUTH
export const user = writable({});
export const isAuthed = writable(false);
