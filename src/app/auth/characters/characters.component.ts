import { Component, OnInit } from '@angular/core';
import { CharacterService, Character } from '../../services/character.service';
import { CommonModule } from '@angular/common';
import { AdminNavbarComponent } from '../../components/admin-navbar/admin-navbar.component';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.css'],
  standalone: true,
  imports: [AdminNavbarComponent, CommonModule]
})
export class CharactersComponent implements OnInit {
  characters: Character[] = [];
  selectedCharacter: Character | null = null;

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
}
