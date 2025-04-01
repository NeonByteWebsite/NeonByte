// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}

	// Project interfaces for Svelte components
	interface Project {
		title: string;
		category: string;
		image: string;
		secondaryImage?: string;
		description: string;
		type: 'image' | 'video';
	}
	
	interface TeamMember {
		name: string;
		role: string;
		image: string;
	}
	
	interface Service {
		icon: string;
		title: string;
		description: string;
	}
}

export {};
