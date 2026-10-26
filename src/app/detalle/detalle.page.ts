import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import {
  IonHeader,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonTitle,
  IonContent,
  IonChip,
  IonSpinner,
} from '@ionic/angular';

@Component({
  selector: 'app-detalle',
  templateUrl: 'detalle.page.html',
  imports: [
    IonHeader,
    IonToolbar,
    IonButtons,
    IonBackButton,
    IonTitle,
    IonContent,
    IonChip,
    IonSpinner,
  ],
})
export class DetallePage {
  private ruta = inject(ActivatedRoute);
  private http = inject(HttpClient);

  // Aquí guardamos los datos que llegan de internet (al inicio no hay nada)
  pokemon = signal<any>(null);

  constructor() {
    // Leemos el número que viene en la dirección: /detalle/25
    const id = this.ruta.snapshot.paramMap.get('id');

    // Pedimos los datos de ese Pokémon a la PokéAPI
    this.http
      .get<any>(`https://pokeapi.co/api/v2/pokemon/${id}`)
      .subscribe((datos) => this.pokemon.set(datos));
  }

  imagen(id: number): string {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
  }
}