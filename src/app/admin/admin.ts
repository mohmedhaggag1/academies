import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { NgxPaginationModule } from 'ngx-pagination';

import { SearchComponent } from '../core/components/search.component';
import { RectangleSkeletonComponent } from '../core/components/rectangle-skeleton.component';
import { MagicScrollDirective } from '../core/directives/magic-scroll.directive';
import { MatMenuModule } from '@angular/material/menu';
import { LanguageComponent } from "../core/components/language.component";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.html',
  styleUrl: './admin.scss',
  standalone: true,

  imports: [
    CommonModule,
    TranslateModule,
    NgxPaginationModule,
    SearchComponent,
    RectangleSkeletonComponent,
    MagicScrollDirective,
    MatMenuModule,
    LanguageComponent
]
})
export class Admin {

  // =========================
  // Loading
  // =========================

  loading = false;


  // =========================
  // Pagination
  // =========================

  currentPage = 1;

  pageSize = 15;

  maxSize = 7;


  // =========================
  // Static Data
  // =========================

  allHouseUnits = [

    {
      id: 1,
      buildingName: 'Building A',
      floorName: 'Ground Floor',
      name: 'Unit 101',
      userName: 'Ahmed Mohamed'
    },

    {
      id: 2,
      buildingName: 'Building A',
      floorName: 'Ground Floor',
      name: 'Unit 102',
      userName: 'Mohamed Ali'
    },

    {
      id: 3,
      buildingName: 'Building A',
      floorName: 'First Floor',
      name: 'Unit 201',
      userName: 'Omar Ahmed'
    },

    {
      id: 4,
      buildingName: 'Building A',
      floorName: 'First Floor',
      name: 'Unit 202',
      userName: 'Karim Hassan'
    },

    {
      id: 5,
      buildingName: 'Building A',
      floorName: 'Second Floor',
      name: 'Unit 301',
      userName: 'Mostafa Ahmed'
    },

    {
      id: 6,
      buildingName: 'Building A',
      floorName: 'Second Floor',
      name: 'Unit 302',
      userName: 'Hassan Ali'
    },

    {
      id: 7,
      buildingName: 'Building A',
      floorName: 'Third Floor',
      name: 'Unit 401',
      userName: 'Youssef Mohamed'
    },

    {
      id: 8,
      buildingName: 'Building A',
      floorName: 'Third Floor',
      name: 'Unit 402',
      userName: 'Mahmoud Ahmed'
    },

    {
      id: 9,
      buildingName: 'Building A',
      floorName: 'Fourth Floor',
      name: 'Unit 501',
      userName: 'Ibrahim Hassan'
    },

    {
      id: 10,
      buildingName: 'Building A',
      floorName: 'Fourth Floor',
      name: 'Unit 502',
      userName: 'Amr Khaled'
    },

    {
      id: 11,
      buildingName: 'Building A',
      floorName: 'Fifth Floor',
      name: 'Unit 601',
      userName: 'Tarek Ahmed'
    },

    {
      id: 12,
      buildingName: 'Building A',
      floorName: 'Fifth Floor',
      name: 'Unit 602',
      userName: 'Ali Hassan'
    },
    {
      id: 13,
      buildingName: 'Building A',
      floorName: 'Fifth Floor',
      name: 'Unit 602',
      userName: 'Ali Hassan'
    },
    {
      id: 14,
      buildingName: 'Building A',
      floorName: 'Fifth Floor',
      name: 'Unit 602',
      userName: 'Ali Hassan'
    },
    {
      id: 15,
      buildingName: 'Building A',
      floorName: 'Fifth Floor',
      name: 'Unit 602',
      userName: 'Ali Hassan'
    },
    
    {
      id: 16,
      buildingName: 'Building A',
      floorName: 'Fifth Floor',
      name: 'Unit 602',
      userName: 'Ali Hassan'
    },
    
    {
      id: 17,
      buildingName: 'Building A',
      floorName: 'Fifth Floor',
      name: 'Unit 602',
      userName: 'Ali Hassan'
    }

  ];


  houseUnits = [...this.allHouseUnits];

deleteAcademy (){}
  // =========================
  // Search
  // =========================

  search(value: any): void {

    const searchValue = value
      ?.trim()
      .toLowerCase();

    // رجوع لأول صفحة بعد البحث
    this.currentPage = 1;


    // Empty search

    if (!searchValue) {

      this.houseUnits = [
        ...this.allHouseUnits
      ];

      return;
    }


    // Filter

    this.houseUnits =
      this.allHouseUnits.filter(unit =>

        unit.name
          .toLowerCase()
          .includes(searchValue)

        ||

        unit.floorName
          .toLowerCase()
          .includes(searchValue)

        ||

        unit.userName
          .toLowerCase()
          .includes(searchValue)

        ||

        unit.buildingName
          .toLowerCase()
          .includes(searchValue)

        ||

        unit.id
          .toString()
          .includes(searchValue)

      );

  }


  // =========================
  // Add
  // =========================

  addHouseUnit(): void {

    const newId =
      this.allHouseUnits.length + 1;


    const newUnit = {

      id: newId,

      buildingName: 'Building A',

      floorName: 'New Floor',

      name: `Unit ${100 + newId}`,

      userName: 'New User'

    };


    this.allHouseUnits.push(newUnit);


    this.houseUnits = [
      ...this.allHouseUnits
    ];

  }


  // =========================
  // Page Changed
  // =========================

  pageChanged(page: number): void {

    this.currentPage = page;

  }


  // =========================
  // Track By
  // =========================

  trackBy(
    index: number,
    item: any
  ): number {

    return item.id;

  }

}