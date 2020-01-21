/// <reference types="@types/segment-analytics" />

// declare global type definitions
declare global {
	interface Window {
		analytics: SegmentAnalytics.AnalyticsJS;
	}
}

export const load = () => {
	window.analytics.load('o70p979wkDHRD0Rahy0mEMMN2xhovIDL');
};

export const page = () => {
	window.analytics.page();
};
export const track = (name: string, properties: any) => {
	window.analytics.track(name, properties);
};
