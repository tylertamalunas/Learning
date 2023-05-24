import { Component, ElementRef, AfterViewInit, Renderer2 } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-map-view',
  templateUrl: './map-view.component.html',
  styleUrls: ['./map-view.component.css']
})
export class MapViewComponent implements AfterViewInit {
  constructor(private elementRef: ElementRef, private renderer: Renderer2, private apiService: ApiService) {}

  ngAfterViewInit() {
    const paths = this.elementRef.nativeElement.querySelectorAll('path');

    paths.forEach((path: SVGPathElement) => {
      this.renderer.listen(path, 'mouseenter', () => {
        this.handleMouseEnter(path);
      });

      this.renderer.listen(path, 'mouseleave', () => {
        this.handleMouseLeave(path);
      });

      this.renderer.listen(path, 'click', () => {
        this.handleClick(path);
      });
    });
  }

  handleMouseEnter(pathElement: SVGPathElement) {
    pathElement.style.fill = 'orange';
  }

  handleMouseLeave(pathElement: SVGPathElement) {
    pathElement.style.fill = 'black';
  }
  selectedCountry: any; // stores country info

  handleClick(pathElement: SVGPathElement) {
    const countryName = pathElement.getAttribute('name');
    const countryISO2 = pathElement.getAttribute('id');
    // Handle the click event for the specific country

    if (countryName && countryISO2) { 
      this.apiService.getCountryInfo(countryISO2).subscribe(
        (data) => {
          // handle response data for country
          const country = data[1][0]; // worldbank stores the data in the 2nd element of the array
          
          this.selectedCountry = {
          name: countryName,
          capitalCity: country.capitalCity,
          region: country.region,
          incomeLevel: country.incomeLevel,
          longitude: country.longitude,
          latitude: country.latitude
          };
        },
        (error) => {
          console.error('Failed to fetch country information', error);
        }
      );
    }
  }
}
