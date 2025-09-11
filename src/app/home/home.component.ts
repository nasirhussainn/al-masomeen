import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgForOf, CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, NgForOf, CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent {
  topCourses = [
    {
      title: 'Tajweed & Recitation',
      description: 'Master the beautiful art of Quranic recitation with proper pronunciation and melodious rhythm.',
      level: 'Beginner',
      duration: '3 Months'
    },
    {
      title: 'Quran Memorization (Hifz)',
      description: 'Structured guidance and proven methods for memorizing the Holy Quran effectively.',
      level: 'All Levels',
      duration: '2-5 Years'
    },
    {
      title: 'Islamic Studies',
      description: 'Comprehensive understanding of Islamic principles, history, and contemporary applications.',
      level: 'Intermediate',
      duration: '6 Months'
    },
    {
      title: 'Arabic Language',
      description: 'Learn Classical Arabic to understand the Quran in its original language and beauty.',
      level: 'Beginner',
      duration: '12 Months'
    },
    {
      title: 'Tafseer & Commentary',
      description: 'Deep dive into Quranic interpretation and commentary by renowned Islamic scholars.',
      level: 'Advanced',
      duration: '18 Months'
    },
    {
      title: 'Islamic Ethics & Spirituality',
      description: 'Develop Islamic character and spiritual connection through Quranic guidance.',
      level: 'All Levels',
      duration: '4 Months'
    }
  ];
}