// home.component.ts
import { Component, AfterViewInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';
import { NgForOf } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  imports: [NavbarComponent, FooterComponent, NgForOf]
})

export class HomeComponent implements AfterViewInit {

  ngAfterViewInit() {
    const statsSection = document.getElementById("statsSection");
    const stats = [
      { id: "graduateStudents", targetValue: 1500 },
      { id: "enrolledStudents", targetValue: 5000 },
      { id: "countriesCount", targetValue: 25 },
    ];

    const animateValue = (id: string, start: number, end: number, duration: number) => {
      const obj = document.getElementById(id);
      if (!obj) return;
      const range = end - start;
      let startTime: number | null = null;

      const step = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        obj.textContent = Math.floor(progress * range + start).toString();
        if (progress < 1) {
          requestAnimationFrame(step);
        }
      };

      requestAnimationFrame(step);
    };

    const observer = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            stats.forEach((stat) =>
              animateValue(stat.id, 0, stat.targetValue, 2000)
            );
            observer.disconnect(); // Stop observing after animation triggers
          }
        });
      },
      { threshold: 0.5 } // Trigger animation when 50% of the section is visible
    );

    if (statsSection) {
      observer.observe(statsSection);
    }
  }

  topCourses = [
    {
      title: 'Tajweed Basics',
      description: 'Master the rules of Tajweed to recite the Quran with proper pronunciation.',
      // link: '/courses',
    },
    {
      title: 'Quran Memorization',
      description: 'Structured guidance for memorizing the Quran effectively and efficiently.',
      // link: '/courses',
    },
    {
      title: 'Quran Translation',
      description: 'Understand the meanings and context of the Quran in your native language.',
      // link: '/courses',
    },
  ];
}