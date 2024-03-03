import { writable } from 'svelte/store';

export const currentPoll = writable();

export const showModal = writable(false);

export const isLoggedIn = writable(false);

export const currentUsername = writable('');

export const hasVoted = writable(false)