import { writable } from 'svelte/store';

export const currentPoll = writable();

export const showModal = writable(false);