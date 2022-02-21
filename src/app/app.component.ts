import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {DogServiceService} from "../services/dog-service.service";

export interface Breeds {
  name: string;
}

type res = {
  "message": object,
  "status": string
}

type resImage = {
  "message": string,
  "status": string
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'dogAPI';

  public myControl = new FormControl();
  public filteredOptions: Observable<Breeds[]> | undefined;
  public breeds: string[] = [''];
  public formatedBreeds: Breeds[] = [];
  public imageDog = '';

  constructor(public dogService: DogServiceService) { }

  ngOnInit() {
    this.dogService.getBreedsNames().subscribe((data: res) => {
      this.breeds = Object.keys(data.message);
      this.breeds.map((item) => {
        this.formatedBreeds.push({
          name: item
        })
      })

      this.filteredOptions = this.myControl.valueChanges.pipe(
        startWith(''),
        map(value => (typeof value === 'string' ? value : value.name)),
        map(name => (name ? this._filter(name) : this.formatedBreeds.slice())),
      );
    })
  }

  displayFn(breed: Breeds): string {
    return breed && breed.name ? breed.name : '';
  }

  private _filter(name: string): Breeds[] {
    const filterValue = name.toLowerCase();

    return this.formatedBreeds.filter(option => option.name.toLowerCase().includes(filterValue));
  }

  public getImageDog(breed: string) {
    this.dogService.getBreedsImage(breed).subscribe((result: resImage) => {
      this.imageDog = result.message;
    })
  }
}
