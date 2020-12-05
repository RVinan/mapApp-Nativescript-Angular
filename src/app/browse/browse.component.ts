import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as Application from "@nativescript/core/application";
import {MapView, Marker, Position} from 'nativescript-google-maps-sdk';
import { registerElement } from "nativescript-angular/element-registry";



registerElement('MapView', () => MapView);

@Component({
    selector: "Browse",
    moduleId: module.id,
    templateUrl: "./browse.component.html"
})
export class BrowseComponent implements OnInit {
    @ViewChild('MapView', { static: false }) mapView: ElementRef;

    latitude =  -33.86;
    longitude = 151.20;
    zoom = 8;
    minZoom = 0;
    maxZoom = 22;
    bearing = 0;
    tilt = 0;
    padding = [40, 40, 40, 40];

    lastCamera: String;

    constructor() {
        // Use the component constructor to inject providers.
    }

    ngOnInit(): void {
        // Use the "ngOnInit" handler to initialize data for the view.
        
    }

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>Application.getRootView();
        sideDrawer.showDrawer();
    }
    onMapReady(event): void {
        console.log("Map Ready");

        let mapView = event.object as MapView;

        const NA_CENTER_LATITUDE = 39.8283459;
        const NA_CENTER_LONGITUDE = -98.5816737;

        mapView.latitude = NA_CENTER_LATITUDE;
        mapView.longitude = NA_CENTER_LONGITUDE;
        mapView.zoom = 3;

        let stLouisCoordinates = {
            latitude: 38.619081,
            longitude: -90.196846
        };

        let stLouisMarker = new Marker();
        stLouisMarker.position = Position.positionFromLatLng(stLouisCoordinates.latitude, stLouisCoordinates.longitude);
        stLouisMarker.title = "St. Louis, MO";
        stLouisMarker.snippet = "Go Cardinals!";
        stLouisMarker.color = "#6B8E23";
        mapView.addMarker(stLouisMarker);

        
        //this.mapView.addMarker(marker);
    }

    onCoordinateTapped(args) {
        console.log("Coordinate Tapped, Lat: " + args.position.latitude + ", Lon: " + args.position.longitude, args);
    }

    onMarkerEvent(args) {
        console.log("Marker Event: '" + args.eventName
            + "' triggered on: " + args.marker.title
            + ", Lat: " + args.marker.position.latitude + ", Lon: " + args.marker.position.longitude, args);
    }

    onCameraChanged(args) {
        console.log("Camera changed: " + JSON.stringify(args.camera), JSON.stringify(args.camera) === this.lastCamera);
        this.lastCamera = JSON.stringify(args.camera);
    }

    onCameraMove(args) {
        console.log("Camera moving: " + JSON.stringify(args.camera));
    }
}