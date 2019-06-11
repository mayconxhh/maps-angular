export class Marker {
	public lat: number;
	public lng: number;
	public title: string = 'Sin título';
	public description: string = 'Sin descrición';
	
	constructor(lat: number, lng:number) {
		this.lat = lat;
		this.lng = lng;
	}
}