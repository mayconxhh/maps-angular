import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Marker } from '../../class/marker.class';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MapEditComponent } from './map-edit.component';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

	markers: Marker[] = [];

	lat: number = 51.673858;
  lng: number = 7.815982;

  constructor( private snackBar: MatSnackBar,
  							public dialog: MatDialog ) {

  	if (localStorage.getItem('markers')) {
  		const markers = JSON.parse(localStorage.getItem('markers'));
	  	this.markers = markers;
  	}
  }

  ngOnInit() {
  }

  addMarker(ev){

    console.log(ev)

  	const coords:{ lat:number, lng:number} = ev.coords;
  	const marker = new Marker(coords.lat, coords.lng);
  	this.markers.push(marker);
  	this.saveInStorage();
  	this.snackBar.open('Marcador agregado', 'Cerrar', { duration: 3000 });

  }

  deleteMarker(i:number){
  	this.markers.splice(i, 1);
  	this.saveInStorage();
  	this.snackBar.open('Marcador eliminado', 'Cerrar', { duration: 3000 });
  }

  editMarker(marker:Marker){
  	const dialogRef = this.dialog.open(MapEditComponent, {
  		width: '250px',
  		data: {
  			title: marker.title,
  			description: marker.description
  		}
  	});

    dialogRef.afterClosed().subscribe(result => {

      if (!result) {
        return;
      }

      marker.title = result.title;
      marker.description = result.description;
      this.snackBar.open('Marcador actualizado', 'Cerrar', { duration: 3000 });
      this.saveInStorage();

    });
  }

  saveInStorage(){
  	localStorage.setItem('markers',JSON.stringify(this.markers));
  }

}
