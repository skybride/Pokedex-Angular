import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../pokemon.service';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css'],
})
export class PokemonListComponent implements OnInit {
  pokemonList: any[] = [];

  constructor(private pokemonService: PokemonService) {}

  ngOnInit(): void {
    this.pokemonService.getPokemonList(10).subscribe((data) => {
      const pokemonURLs = data.results.map((pokemon: any) => pokemon.url);

      pokemonURLs.forEach((url: string) => {
        this.pokemonService.getPokemonDetails(url).subscribe((details: any) => {
          this.pokemonList.push({
            name: details.name,
            image: details.sprites.front_default,
          });
        });
      });
    });
  }
}
