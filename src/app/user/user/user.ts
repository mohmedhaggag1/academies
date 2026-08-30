import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatMenuModule } from '@angular/material/menu';
import { TranslateModule } from '@ngx-translate/core';
import { NgxPaginationModule } from 'ngx-pagination';

import { NotFoundComponent } from '../../core/components/not-found.component';
import { RectangleSkeletonComponent } from '../../core/components/rectangle-skeleton.component';
import { MagicScrollDirective } from '../../core/directives/magic-scroll.directive';
import { MatDialog } from '@angular/material/dialog';
import { AlertService } from '../../core/services/alert.service';
import { ActivatedRoute, RouterLink, RouterModule } from '@angular/router';
import { CountryReceiptFilterComponent } from "../../core/components/country-receipt-filter/country-receipt-filter.component";
import { PaymentStatusComponent } from "../../core/components/payment-status/payment-status";
import { BankAccountStatusFilter } from "../../core/components/bank-account-status-filter/bank-account-status-filter";
import { DateRange } from "../../core/components/date-range/date-range";
import { TransferStatus } from "../../core/components/transfer-status/transfer-status"
import { MatCheckboxModule } from '@angular/material/checkbox';
import { BulkInvoiceDialogComponent } from '../../core/components/bulk-invoice-dialog/bulk-invoice-dialog';
import { NavbarComponent } from "../../core/components/navbar.component";

@Component({
    selector: 'academy-details',
    imports: [
    CommonModule,
    FormsModule,
    TranslateModule,
    NgxPaginationModule,
    RectangleSkeletonComponent,
    MagicScrollDirective,
    MatMenuModule,
    MatCheckboxModule,
    NotFoundComponent,
    CountryReceiptFilterComponent,
    PaymentStatusComponent,
    BankAccountStatusFilter,
    DateRange,
    RouterModule,
    TransferStatus,
    NavbarComponent
],

  templateUrl: './user.html',
  styleUrl: './user.scss',
})
export class User {

    loading = false;
    selectedAcademies: any[] = [];

    currentPage = 1;

    pageSize = 15;

    maxSize = 7;

    isRtl = document.dir === 'rtl';

    alert = inject(AlertService);

    activeRoute = inject(ActivatedRoute);

    dialog = inject(MatDialog);

    academyId = inject(ActivatedRoute)
        .snapshot
        .paramMap
        .get('id');

    editingId: number | null = null;

    allHouseUnits: any[] = [

        {
            id: 1,
            code: 'ACAD-101',
            name: 'أكاديمية المجد السعودية',
            statusId: 2,
            status: 'not_paid',
            accountStatus: 'active',
            receiptNumber: '1500',
            paymentMethod: 'Transfer',
            exchangeRate: 12.9,
            totalEgp: 19350,
            date: '2026-08-16',
            invoiceUrl: '#'
        },

        {
            id: 2,
            code: 'ACAD-102',
            name: 'أكاديمية المستقبل',
            statusId: 1,
            status: 'paid',
            accountStatus: 'active',
            receiptNumber: '1501',
            paymentMethod: 'Transfer',
            exchangeRate: 12.9,
            totalEgp: 19350,
            date: '2026-08-15',
            invoiceUrl: '#'
        },

        {
            id: 3,
            code: 'ACAD-103',
            name: 'أكاديمية النخبة',
            statusId: 2,
            status: 'not_paid',
            accountStatus: 'inactive',
            receiptNumber: '1502',
            paymentMethod: 'Cash',
            exchangeRate: 12.9,
            totalEgp: 19350,
            date: '2026-08-14',
            invoiceUrl: '#'
        },

        {
            id: 4,
            code: 'ACAD-104',
            name: 'أكاديمية النجاح',
            statusId: 1,
            status: 'paid',
            accountStatus: 'active',
            receiptNumber: '1503',
            paymentMethod: 'Transfer',
            exchangeRate: 12.9,
            totalEgp: 19350,
            date: '2026-08-13',
            invoiceUrl: '#'
        },

        {
            id: 5,
            code: 'ACAD-105',
            name: 'أكاديمية التميز',
            statusId: 3,
            status: 'pending',
            accountStatus: 'inactive',
            receiptNumber: '1504',
            paymentMethod: 'Card',
            exchangeRate: 12.9,
            totalEgp: 19350,
            date: '2026-08-12',
            invoiceUrl: '#'
        },

        {
            id: 6,
            code: 'ACAD-106',
            name: 'أكاديمية الريادة',
            statusId: 1,
            status: 'paid',
            accountStatus: 'active',
            receiptNumber: '1505',
            paymentMethod: 'Transfer',
            exchangeRate: 12.9,
            totalEgp: 19350,
            date: '2026-08-11',
            invoiceUrl: '#'
        },

        {
            id: 7,
            code: 'ACAD-107',
            name: 'أكاديمية الإبداع',
            statusId: 2,
            status: 'not_paid',
            accountStatus: 'inactive',
            receiptNumber: '1506',
            paymentMethod: 'Transfer',
            exchangeRate: 12.9,
            totalEgp: 19350,
            date: '2026-08-10',
            invoiceUrl: '#'
        },

        {
            id: 8,
            code: 'ACAD-108',
            name: 'أكاديمية المعرفة',
            statusId: 1,
            status: 'paid',
            accountStatus: 'active',
            receiptNumber: '1507',
            paymentMethod: 'Transfer',
            exchangeRate: 12.9,
            totalEgp: 19350,
            date: '2026-08-09',
            invoiceUrl: '#'
        },

        {
            id: 9,
            code: 'ACAD-109',
            name: 'أكاديمية التفوق',
            statusId: 3,
            status: 'pending',
            accountStatus: 'inactive',
            receiptNumber: '1508',
            paymentMethod: 'Cash',
            exchangeRate: 12.9,
            totalEgp: 19350,
            date: '2026-08-08',
            invoiceUrl: '#'
        },

        {
            id: 10,
            code: 'ACAD-110',
            name: 'أكاديمية الأمل',
            statusId: 1,
            status: 'paid',
            accountStatus: 'active',
            receiptNumber: '1509',
            paymentMethod: 'Transfer',
            exchangeRate: 12.9,
            totalEgp: 19350,
            date: '2026-08-07',
            invoiceUrl: '#'
        },

        {
            id: 11,
            code: 'ACAD-111',
            name: 'أكاديمية القمة',
            statusId: 2,
            status: 'not_paid',
            accountStatus: 'active',
            receiptNumber: '1510',
            paymentMethod: 'Transfer',
            exchangeRate: 12.9,
            totalEgp: 19350,
            date: '2026-08-06',
            invoiceUrl: '#'
        },

        {
            id: 12,
            code: 'ACAD-112',
            name: 'أكاديمية الصفوة',
            statusId: 1,
            status: 'paid',
            accountStatus: 'active',
            receiptNumber: '1511',
            paymentMethod: 'Card',
            exchangeRate: 12.9,
            totalEgp: 19350,
            date: '2026-08-05',
            invoiceUrl: '#'
        },

        {
            id: 13,
            code: 'ACAD-113',
            name: 'أكاديمية العلوم',
            statusId: 2,
            status: 'not_paid',
            accountStatus: 'inactive',
            receiptNumber: '1512',
            paymentMethod: 'Transfer',
            exchangeRate: 12.9,
            totalEgp: 19350,
            date: '2026-08-04',
            invoiceUrl: '#'
        },

        {
            id: 14,
            code: 'ACAD-114',
            name: 'أكاديمية الرياض',
            statusId: 1,
            status: 'paid',
            accountStatus: 'active',
            receiptNumber: '1513',
            paymentMethod: 'Transfer',
            exchangeRate: 12.9,
            totalEgp: 19350,
            date: '2026-08-03',
            invoiceUrl: '#'
        },

        {
            id: 15,
            code: 'ACAD-115',
            name: 'أكاديمية التعليم الحديث',
            statusId: 3,
            status: 'pending',
            accountStatus: 'inactive',
            receiptNumber: '1514',
            paymentMethod: 'Cash',
            exchangeRate: 12.9,
            totalEgp: 19350,
            date: '2026-08-02',
            invoiceUrl: '#'
        },

        {
            id: 16,
            code: 'ACAD-116',
            name: 'أكاديمية المستقبل التعليمي',
            statusId: 1,
            status: 'paid',
            accountStatus: 'active',
            receiptNumber: '1515',
            paymentMethod: 'Transfer',
            exchangeRate: 12.9,
            totalEgp: 19350,
            date: '2026-08-01',
            invoiceUrl: '#'
        },

        {
            id: 17,
            code: 'ACAD-117',
            name: 'أكاديمية الجيل الجديد',
            statusId: 2,
            status: 'not_paid',
            accountStatus: 'inactive',
            receiptNumber: '1516',
            paymentMethod: 'Transfer',
            exchangeRate: 12.9,
            totalEgp: 19350,
            date: '2026-07-31',
            invoiceUrl: '#'
        }

    ];

    houseUnits = [...this.allHouseUnits];

    ngOnInit(): void {

        this.activeRoute.params.subscribe((params) => {

            const academyId = params['id'];

            if (academyId) {

                this.academyId = academyId;

            }

        });


    }


    toggleSelection(
        academy: any,
        checked: boolean
    ): void {

        if (checked) {

            const exists =
                this.selectedAcademies.some(
                    item => item.id === academy.id
                );

            if (!exists) {

                this.selectedAcademies = [
                    ...this.selectedAcademies,
                    academy
                ];

            }

        } else {

            this.selectedAcademies =
                this.selectedAcademies.filter(
                    item => item.id !== academy.id
                );

        }

    }


    // ==========================================
    // Is Selected
    // ==========================================

    isSelected(academy: any): boolean {

        return this.selectedAcademies.some(
            item => item.id === academy.id
        );

    }


    // ==========================================
    // Select All
    // ==========================================

    toggleSelectAll(
        checked: boolean
    ): void {

        if (checked) {

            /*
             * Select all academies
             */

            this.selectedAcademies = [
                ...this.houseUnits
            ];

        } else {

            /*
             * Clear selection
             */

            this.selectedAcademies = [];

        }

    }

    isAllSelected(): boolean {

        return (
            this.houseUnits.length > 0 &&
            this.selectedAcademies.length ===
            this.houseUnits.length
        );

    }

    isSomeSelected(): boolean {

        return (
            this.selectedAcademies.length > 0 &&
            this.selectedAcademies.length <
            this.houseUnits.length
        );

    }


    get selectedAcademyIds(): number[] {

        return this.selectedAcademies.map(
            academy => academy.id
        );

    }


sendBulkInvoices(): void {

    if (this.selectedAcademies.length === 0) {
        return;
    }

    const selectedIds =
        this.selectedAcademyIds;


    const dialogRef =
        this.dialog.open(
            BulkInvoiceDialogComponent,
            {
                maxWidth: '95vw',
        panelClass: 'large-dialog',
                data: {

                    academyIds:
                        selectedIds,

                    academies:
                        this.selectedAcademies

                }

            }
        );


    dialogRef.afterClosed().subscribe((result) => {

        if (!result) {
            return;
        }


        console.log(
            'Academy IDs:',
            result.academyIds
        );


        console.log(
            'Cropped Image:',
            result.image
        );

    });

}


    pageChanged(page: number): void {

        this.currentPage = page;

    }

    search(value: any): void {

        const searchValue =
            value
                ?.trim()
                .toLowerCase();


        this.currentPage = 1;


        if (!searchValue) {

            this.houseUnits = [
                ...this.allHouseUnits
            ];

            return;

        }


        this.houseUnits =
            this.allHouseUnits.filter(
                academy =>

                    academy.code
                        ?.toLowerCase()
                        .includes(searchValue)

                    ||

                    academy.name
                        ?.toLowerCase()
                        .includes(searchValue)

                    ||

                    academy.status
                        ?.toLowerCase()
                        .includes(searchValue)

                    ||

                    academy.accountStatus
                        ?.toLowerCase()
                        .includes(searchValue)

                    ||

                    academy.receiptNumber
                        ?.toString()
                        .includes(searchValue)

                    ||

                    academy.paymentMethod
                        ?.toLowerCase()
                        .includes(searchValue)

                    ||

                    academy.exchangeRate
                        ?.toString()
                        .includes(searchValue)

                    ||

                    academy.totalEgp
                        ?.toString()
                        .includes(searchValue)

                    ||

                    academy.date
                        ?.toString()
                        .includes(searchValue)

                    ||

                    academy.id
                        ?.toString()
                        .includes(searchValue)

            );


        /*
         * Remove selected items
         * that no longer exist in filtered list
         */

        this.selectedAcademies =
            this.selectedAcademies.filter(
                selected =>
                    this.houseUnits.some(
                        academy =>
                            academy.id === selected.id
                    )
            );

    }


    onDateRangeChange(event: {
        startDate: Date | null;
        endDate: Date | null;
    }): void {

        console.log(
            'Start:',
            event.startDate
        );

        console.log(
            'End:',
            event.endDate
        );

    }

    editAcademy(
        academy: any
    ): void {

        this.editingId = academy.id;


        academy._original = {
            ...academy
        };

    }

    saveAcademy(
        academy: any
    ): void {

        console.log(
            'Updated Academy:',
            academy
        );


        this.editingId = null;


        delete academy._original;


        this.alert.showAlert(
            'academy_updated',
            'bg-success'
        );

    }

    cancelEdit(
        academy: any
    ): void {

        if (academy._original) { 

            Object.assign(
                academy,
                academy._original
            );


            delete academy._original;

        }

        this.editingId = null;

    }

    deleteAcademy(
        academy: any
    ): void {

        console.log(
            'Delete Academy:',
            academy
        );


        /*
         * Remove from selected list
         */

        this.selectedAcademies =
            this.selectedAcademies.filter(
                item => item.id !== academy.id
            );


        this.alert.showAlert(
            'academy_deleted',
            'bg-success'
        );

    }


    // ==========================================
    // Add
    // ==========================================

    addAcademy(): void {

        console.log(
            'Add Academy'
        );

    }

    trackBy(
        index: number,
        item: any
    ): number {

        return item.id;

    }


    onAccountStatusChanged(
        academy: any,
        newStatus: any
    ): void {

    }

}
