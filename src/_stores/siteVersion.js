import { browser } from '$app/env';
import { readable, writable } from 'svelte/store';
import { version } from '../../package.json';

export const siteVersion = readable(version);
export const showReleaseNotes = writable(false);

function init() {
	const versionLastSeen = browser ? window.localStorage.getItem('versionLastSeen') : '1.0.0';
	if (version !== versionLastSeen) showReleaseNotes.set(true);
}

init();
