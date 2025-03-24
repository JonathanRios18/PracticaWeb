import { Component, OnInit } from '@angular/core';
import { CharacterService, Character } from '../../services/character.service';
import { CommonModule } from '@angular/common';
import { AdminNavbarComponent } from '../../components/admin-navbar/admin-navbar.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.css'],
  standalone: true,
  imports: [AdminNavbarComponent, CommonModule, FormsModule]
})
export class CharactersComponent implements OnInit {
  characters: Character[] = [];
  selectedCharacter: Character | null = null;
  showModal: boolean = false; 
  newCharacter: Character = {
    name: '',
    level: 1,
    health: 100
  };

  constructor(private characterService: CharacterService) {}

  ngOnInit(): void {
    this.loadCharacters();
  }

  loadCharacters(): void {
    this.characterService.getCharacters().subscribe(
      (data) => {
        this.characters = data;
      },
      (error) => {
        console.error('Error al cargar los personajes:', error);
      }
    );
  }

  openModal(): void {
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
  }

  addCharacter(): void {
    this.characterService.createCharacter(this.newCharacter).subscribe(
      (response) => {
        this.characters.push(response);
        this.closeModal();
        this.loadCharacters();},
      (error) => {
        console.error('Error al agregar personaje:', error);
      }
    );
  }
}
