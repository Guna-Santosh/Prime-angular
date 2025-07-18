import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { ImportsModule } from './imports';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Product } from '@/domain/product';
import { ProductService } from '@/service/productservice';
import { Dialog } from 'primeng/dialog';
import { Ripple } from 'primeng/ripple';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { FileUpload } from 'primeng/fileupload';
import { Tag } from 'primeng/tag';
import { RadioButton } from 'primeng/radiobutton';
import { Rating } from 'primeng/rating';
import { InputNumber } from 'primeng/inputnumber';
import { Table } from 'primeng/table';
import { TieredMenuModule } from 'primeng/tieredmenu';
import { AutoComplete } from 'primeng/autocomplete';
import { FloatLabel } from 'primeng/floatlabel';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { MenuItem } from 'primeng/api';
import { DropdownModule } from 'primeng/dropdown';
import { RouterModule } from '@angular/router';
import { FieldsetModule } from 'primeng/fieldset';

interface Column {
  field: string;
  header: string;
  customExportHeader?: string;
}

interface ExportColumn {
  title: string;
  dataKey: string;
}

@Component({
  selector: 'app-root',
  // template: `<router-outlet></router-outlet>`,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  standalone: true,
  imports: [ImportsModule, FloatLabelModule, InputTextModule, FormsModule,DropdownModule,RouterModule,FieldsetModule],
  providers: [MessageService, ConfirmationService, ProductService],
  // styles: [
  //   `:host ::ng-deep .p-dialog .product-image {
  //           width: 150px;
  //           margin: 0 auto 2rem auto;
  //           display: block;
  //       }`,
  // ],
})
export class AppComponent implements OnInit {
[x: string]: any;
  productDialog: boolean = false;

  products!: Product[];

  product!: Product;
  value1: string | undefined;

  value2: string | undefined;
  selectedProducts!: Product[] | null;
    datetime24h: Date[] | undefined;

  submitted: boolean = false;
isDark = false;
addressline1: any;

  // toggleTheme() {
  //   this.isDark = !this.isDark;
  //   document.body.classList.toggle('dark-theme', this.isDark);
  // }
    showSidebar = false;
isLoading = false;

  search() {
    this.isLoading = true;

    // Simulate an async operation (e.g., API call)
    setTimeout(() => {
      this.isLoading = false;
      // do something with result
    }, 2000); // show spinner for 2 seconds
  }


expandedLabels: { [key: string]: boolean } = {};



  menuItems = [
    { label: 'Shipping', icon: 'pi pi-home' },
    { label: 'LTL Shipping', icon: 'pi pi-id-card' },
    { label: 'Adhoc Shipping', icon: 'pi pi-table' },
    { label: 'Tracking', icon: 'pi pi-check-square' },
    {
        label: 'Analytics ',
        icon: 'pi pi-file-edit',
        items: [
          {
            label: 'Shipment Per Carrier',
            icon: 'pi pi-copy',
          },
          {
            label: 'Transportation Spend',
            icon: 'pi pi-times',
          },
        ],
      },
    { label: 'Batch Update ERP', icon: 'pi pi-link' },
    { label: 'Import Orders', icon: 'pi pi-chart-bar' },
    { label: 'Reports', icon: 'pi pi-file' },
    { label: 'Shipment Per Carrier', icon: 'pi pi-comments' },
    {
        label: 'Analytics ',
        icon: 'pi pi-file-edit',
        items: [
          {
            label: 'Shipment Per Carrier',
            icon: 'pi pi-copy',
          },
          {
            label: 'Transportation Spend',
            icon: 'pi pi-times',
          },
        ],
      },
       {
                label: 'Pages',
                icon: 'pi pi-fw pi-briefcase',
                routerLink: ['/pages'],
                items: [
                    {
                        label: 'Landing',
                        icon: 'pi pi-fw pi-globe',
                        routerLink: ['/landing']
                    },
                    {
                        label: 'Auth',
                        icon: 'pi pi-fw pi-user',
                        items: [
                            {
                                label: 'Login',
                                icon: 'pi pi-fw pi-sign-in',
                                routerLink: ['/auth/login']
                            },
                            {
                                label: 'Error',
                                icon: 'pi pi-fw pi-times-circle',
                                routerLink: ['/auth/error']
                            },
                            {
                                label: 'Access Denied',
                                icon: 'pi pi-fw pi-lock',
                                routerLink: ['/auth/access']
                            }
                        ]
                    },
                    {
                        label: 'Crud',
                        icon: 'pi pi-fw pi-pencil',
                        routerLink: ['/pages/crud']
                    },
                    {
                        label: 'Not Found',
                        icon: 'pi pi-fw pi-exclamation-circle',
                        routerLink: ['/pages/notfound']
                    },
                    {
                        label: 'Empty',
                        icon: 'pi pi-fw pi-circle-off',
                        routerLink: ['/pages/empty']
                    }
                ]
            },
  ];
toggleSubmenu(item: any): void {
  item.expanded = !item.expanded;
}
   sidebarOpen = true;
  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }
  statuses!: any[];
  items: MenuItem[] | undefined;
   chartData: any;
  chartOptions: any;
  constructor(
    private productService: ProductService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    
  ) {
    this.chartData = {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      datasets: [
        {
          label: 'FedEx',
          data: [10, 50, 30, 80, 40, 70],
          borderColor: '#42A5F5',
          backgroundColor: 'rgba(66,165,245,0.3)',
          fill: true,
          tension: 0.4,
          pointRadius: 4,
          pointHoverRadius: 6,
        },
        {
          label: 'UPS',
          data: [20, 60, 40, 90, 50, 60],
          borderColor: '#66BB6A',
          backgroundColor: 'rgba(102,187,106,0.3)',
          fill: true,
          tension: 0.4,
          pointRadius: 4,
          pointHoverRadius: 6,
        }
      ]
    };

    this.chartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      animation: {
        duration: 2000, // total animation duration
        easing: 'easeInOutQuart'
      },
      plugins: {
        tooltip: {
          enabled: true,
          mode: 'index',
          intersect: false,
          usePointStyle: true,
          backgroundColor: '#fff',
          titleColor: '#000',
          bodyColor: '#000',
          borderColor: '#ccc',
          borderWidth: 1,
          padding: 12,
        },
        legend: {
          display: true,
          labels: {
            usePointStyle: true,
            color: '#333'
          }
        }
      },
      interaction: {
        mode: 'nearest',
        axis: 'x',
        intersect: false
      },
      scales: {
        x: {
          ticks: {
            color: '#999'
          },
          grid: {
            display: false
          }
        },
        y: {
          beginAtZero: true,
          ticks: {
            color: '#999'
          },
          grid: {
            color: '#eee'
          }
        }
      }
    };
  }
buttonLabel = 'Ship';
icons='pi pi-truck';
isButtonDisabled = false;

shipOptions = [
  {
    label: 'Update ERP',
    icon: 'pi pi-cloud-upload',
    command: () => this.updateERP()
  },
  {
    label: 'Re-Print',
    icon: 'pi  pi-print',
    command: () => this.rePrint()
  },
  {
    label: 'Documents',
    icon: 'pi pi-receipt',
    command: () => this.documents()
  },
    {
    label: 'PackSlip',
    icon: 'pi pi-book',
    command: () => this.updateERP()
  },
  {
    label: 'Void',
    icon: 'pi pi-ban',
    command: () => this.voidShipment()
  },
];
documents(){
  console.log('Documents');
          this.messageService.add({ severity: 'contrast', summary: 'Documents', detail: 'Documents Downloaded',icon:'pi pi-spin pi-receipt' });

}
updateERP() {
  console.log('ERP Updated');
          this.messageService.add({ severity: 'secondary', summary: 'ERP Update', detail: 'Sync Data ShipConsole To ERP',icon:'pi pi-spin pi-sync' });
// this.messageService.add({
//   key: 'customColor',
//   severity: 'info',
//   summary: '✔ Address Verified',
//   detail: 'Address is correct',
//   styleClass: 'purple-toast',
//   icon: 'pi pi-check-circle'
// });


}
rePrint(){
  console.log('Re Print');
            this.messageService.add({ severity: 'warn', summary: 'Re Print', detail: 'Printing the documents',icon:'pi pi-spin pi-print' });

}
    showSuccess() {
        this.messageService.add({ severity: 'success', summary: 'Ship', detail: 'Shiped SuccessFully', icon:'pi-truck' });
    }
    addressValidation() {
        this.messageService.add({ severity: 'success', summary: 'Address Verified', detail: 'Address is correct ',sticky: true });
    }

    showInfo() {
        this.messageService.add({ severity: 'info', summary: 'Ship Confirm', detail: 'Ship Confirmed', icon:'pi-box' });
    }

    showWarn() {
        this.messageService.add({ severity: 'warn', summary: 'Warn', detail: 'Message Content' });
    }

    delete() {
        this.messageService.add({ severity: 'error', summary: 'Void', detail: 'Data Void ' });
    }

    showContrast() {
        this.messageService.add({ severity: 'contrast', summary: 'Error', detail: 'Message Content' });
    }

    showSecondary() {
        this.messageService.add({ severity: 'secondary', summary: 'Secondary', detail: 'Message Content' });
    }
visible: boolean = false;

    showDialog() {
        this.visible = true;
    }
    
    
handleMainClick() {
  if (this.buttonLabel === 'Ship') {
    this.icons='pi pi-box';
    this.showSuccess()
    this.buttonLabel = 'Ship Confirm';
  } else if (this.buttonLabel === 'Ship Confirm') {
    // this.icons='pi pi-truck';

    this.confirmShip();
  }
}

// handleMainClick() {
//   if (this.buttonLabel === 'Ship') {
//     this.confirmationService.confirm({
//       message: 'Do you want to confirm shipment?',
//       header: 'Confirm Ship',
//       icon: 'pi pi-question-circle',
//       acceptLabel: 'Yes',
//       rejectLabel: 'No',
//       accept: () => {
//         this.icons = 'pi pi-box';
//         this.showSuccess();
//         this.buttonLabel = 'Ship Confirm';
//       },
//       reject: () => {
//         // Optional: Handle cancel
//         this.messageService.add({
//           severity: 'error',
//           summary: 'Cancelled',
//           detail: 'Shipment not confirmed'
//         });
//       }
//     });
//   } else if (this.buttonLabel === 'Ship Confirm') {
//     this.confirmShip();
//   }
// }

confirmShip() {
  console.log('Shipping Confirmed!');
  this.showInfo();
  // Perform your shipment logic here
}



productss = [
  {
    pkgNo: '001',
    weight: '5kg',
    dimensions: '10x10x10',
    length: '10',
    width: '10',
    height: '10',
    trackingNo: 'TRK123456',
    pkgOption: 'Standard'
  },
  {
    pkgNo: '002',
    weight: '3kg',
    dimensions: '8x8x8',
    length: '8',
    width: '8',
    height: '8',
    trackingNo: 'TRK654321',
    pkgOption: 'Express'
  },
  {
    pkgNo: '002',
    weight: '3kg',
    dimensions: '8x8x8',
    length: '8',
    width: '8',
    height: '8',
    trackingNo: 'TRK654321',
    pkgOption: 'Express'
  },
  {
    pkgNo: '002',
    weight: '3kg',
    dimensions: '8x8x8',
    length: '8',
    width: '8',
    height: '8',
    trackingNo: 'TRK654321',
    pkgOption: 'Express'
  },{
    pkgNo: '002',
    weight: '3kg',
    dimensions: '8x8x8',
    length: '8',
    width: '8',
    height: '8',
    trackingNo: 'TRK654321',
    pkgOption: 'Express'
  }
    // },{
  //   pkgNo: '002',
  //   weight: '3kg',
  //   dimensions: '8x8x8',
  //   length: '8',
  //   width: '8',
  //   height: '8',
  //   trackingNo: 'TRK654321',
  //   pkgOption: 'Express'
  // },
  // {
  //   pkgNo: '002',
  //   weight: '3kg',
  //   dimensions: '8x8x8',
  //   length: '8',
  //   width: '8',
  //   height: '8',
  //   trackingNo: 'TRK654321',
  //   pkgOption: 'Express'
  // },
  // {
  //   pkgNo: '002',
  //   weight: '3kg',
  //   dimensions: '8x8x8',
  //   length: '8',
  //   width: '8',
  //   height: '8',
  //   trackingNo: 'TRK654321',
  //   pkgOption: 'Express'
  // },
  // {
  //   pkgNo: '002',
  //   weight: '3kg',
  //   dimensions: '8x8x8',
  //   length: '8',
  //   width: '8',
  //   height: '8',
  //   trackingNo: 'TRK654321',
  //   pkgOption: 'Express'
  // },
  // {
  //   pkgNo: '002',
  //   weight: '3kg',
  //   dimensions: '8x8x8',
  //   length: '8',
  //   width: '8',
  //   height: '8',
  //   trackingNo: 'TRK654321',
  //   pkgOption: 'Express'
  // },
  // {
  //   pkgNo: '002',
  //   weight: '3kg',
  //   dimensions: '8x8x8',
  //   length: '8',
  //   width: '8',
  //   height: '8',
  //   trackingNo: 'TRK654321',
  //   pkgOption: 'Express'
  // },
  // {
  //   pkgNo: '002',
  //   weight: '3kg',
  //   dimensions: '8x8x8',
  //   length: '8',
  //   width: '8',
  //   height: '8',
  //   trackingNo: 'TRK654321',
  //   pkgOption: 'Express'
  // },
  // {
  //   pkgNo: '002',
  //   weight: '3kg',
  //   dimensions: '8x8x8',
  //   length: '8',
  //   width: '8',
  //   height: '8',
  //   trackingNo: 'TRK654321',
  //   pkgOption: 'Express'
  // },
  // {
  //   pkgNo: '002',
  //   weight: '3kg',
  //   dimensions: '8x8x8',
  //   length: '8',
  //   width: '8',
  //   height: '8',
  //   trackingNo: 'TRK654321',
  //   pkgOption: 'Express'
  // },
  // {
  //   pkgNo: '002',
  //   weight: '3kg',
  //   dimensions: '8x8x8',
  //   length: '8',
  //   width: '8',
  //   height: '8',
  //   trackingNo: 'TRK654321',
  //   pkgOption: 'Express'
  // }
];

rateServicesOptions = [
  { label: 'Rate Shopping', icon: 'pi pi-refresh', command: () => {} },
  { label: 'Get Rates', icon: 'pi pi-times', command: () => {} }
];

managePackageOptions = [
  { label: 'Add Package', icon: 'pi pi-plus', command: () => {} },
  { label: 'Remove Package', icon: 'pi pi-minus', command: () => {} }
];

showAllPackages: boolean = false;
showRemainingRows = false;
  collapsed = false; // false = initially expanded

get visiblePackages() {
  return this.showAllPackages ? this.productss : this.productss.slice(0, 5);
}
get firstFiveRows() {
  return this.productss.slice(0, 5);
}

get remainingRows() {
  return this.productss.slice(5);
}

  get visibleRows() {
    return this.collapsed ? this.productss : this.productss.slice(0, 5);
  }

  // Fieldset toggle event
  onFieldsetToggle(event: any) {
    this.collapsed = event.collapsed;
  }


voidShipment() {
  this.delete();
  console.log('Shipment Voided');
  // Reset the button
  this.buttonLabel = 'Ship';
  this.icons="pi pi-truck"
  this.isButtonDisabled = true;

  // Optionally re-enable after delay or condition
  setTimeout(() => {
    this.isButtonDisabled = false;
  }, 2000);
}

//  model: MenuItem[] = [];
  selectedCity: any;
shipMethods = [
  { label: 'FedEx', value: 'fedex' },
  { label: 'UPS', value: 'ups' },
  { label: 'DHL', value: 'dhl' }
];

selectedShipMethod: any; // <== holds the selected item

payMethods = [
  { label: 'Prepaid', value: 'prepaid' },
  { label: 'Postpaid', value: 'postpaid' },
  { label: 'Recipient', value: 'recipient' },
  { label: 'Third Party', value: 'third_party' },
];


  cities = [
  { name: 'New York', code: 'NY' },
  { name: 'Rome', code: 'RM' },
  { name: 'London', code: 'LDN' },
  { name: 'Istanbul', code: 'IST' },
  { name: 'Paris', code: 'PRS' }
];

filteredCities: any[] = [];
// selectedCity: any;

filterCity(event: any) {
  const query = event.query.toLowerCase();
  this.filteredCities = this.cities.filter(city =>
    city.name.toLowerCase().includes(query)
  );
}
showAllCities() {
  // Display full list without filtering
  this.filteredCities = [...this.cities];
}


 model: MenuItem[] = [];

    ngOnInit() {
        this.model = [
            {
                label: 'Home',
                items: [{ label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/'] }]
            },
            {
                label: 'UI Components',
                items: [
                    { label: 'Form Layout', icon: 'pi pi-fw pi-id-card', routerLink: ['/uikit/formlayout'] },
                    { label: 'Input', icon: 'pi pi-fw pi-check-square', routerLink: ['/uikit/input'] },
                    { label: 'Button', icon: 'pi pi-fw pi-mobile', class: 'rotated-icon', routerLink: ['/uikit/button'] },
                    { label: 'Table', icon: 'pi pi-fw pi-table', routerLink: ['/uikit/table'] },
                    { label: 'List', icon: 'pi pi-fw pi-list', routerLink: ['/uikit/list'] },
                    { label: 'Tree', icon: 'pi pi-fw pi-share-alt', routerLink: ['/uikit/tree'] },
                    { label: 'Panel', icon: 'pi pi-fw pi-tablet', routerLink: ['/uikit/panel'] },
                    { label: 'Overlay', icon: 'pi pi-fw pi-clone', routerLink: ['/uikit/overlay'] },
                    { label: 'Media', icon: 'pi pi-fw pi-image', routerLink: ['/uikit/media'] },
                    { label: 'Menu', icon: 'pi pi-fw pi-bars', routerLink: ['/uikit/menu'] },
                    { label: 'Message', icon: 'pi pi-fw pi-comment', routerLink: ['/uikit/message'] },
                    { label: 'File', icon: 'pi pi-fw pi-file', routerLink: ['/uikit/file'] },
                    { label: 'Chart', icon: 'pi pi-fw pi-chart-bar', routerLink: ['/uikit/charts'] },
                    { label: 'Timeline', icon: 'pi pi-fw pi-calendar', routerLink: ['/uikit/timeline'] },
                    { label: 'Misc', icon: 'pi pi-fw pi-circle', routerLink: ['/uikit/misc'] }
                ]
            },
            {
                label: 'Pages',
                icon: 'pi pi-fw pi-briefcase',
                routerLink: ['/pages'],
                items: [
                    {
                        label: 'Landing',
                        icon: 'pi pi-fw pi-globe',
                        routerLink: ['/landing']
                    },
                    {
                        label: 'Auth',
                        icon: 'pi pi-fw pi-user',
                        items: [
                            {
                                label: 'Login',
                                icon: 'pi pi-fw pi-sign-in',
                                routerLink: ['/auth/login']
                            },
                            {
                                label: 'Error',
                                icon: 'pi pi-fw pi-times-circle',
                                routerLink: ['/auth/error']
                            },
                            {
                                label: 'Access Denied',
                                icon: 'pi pi-fw pi-lock',
                                routerLink: ['/auth/access']
                            }
                        ]
                    },
                    {
                        label: 'Crud',
                        icon: 'pi pi-fw pi-pencil',
                        routerLink: ['/pages/crud']
                    },
                    {
                        label: 'Not Found',
                        icon: 'pi pi-fw pi-exclamation-circle',
                        routerLink: ['/pages/notfound']
                    },
                    {
                        label: 'Empty',
                        icon: 'pi pi-fw pi-circle-off',
                        routerLink: ['/pages/empty']
                    }
                ]
            },
            {
                label: 'Hierarchy',
                items: [
                    {
                        label: 'Submenu 1',
                        icon: 'pi pi-fw pi-bookmark',
                        items: [
                            {
                                label: 'Submenu 1.1',
                                icon: 'pi pi-fw pi-bookmark',
                                items: [
                                    { label: 'Submenu 1.1.1', icon: 'pi pi-fw pi-bookmark' },
                                    { label: 'Submenu 1.1.2', icon: 'pi pi-fw pi-bookmark' },
                                    { label: 'Submenu 1.1.3', icon: 'pi pi-fw pi-bookmark' }
                                ]
                            },
                            {
                                label: 'Submenu 1.2',
                                icon: 'pi pi-fw pi-bookmark',
                                items: [{ label: 'Submenu 1.2.1', icon: 'pi pi-fw pi-bookmark' }]
                            }
                        ]
                    },
                    {
                        label: 'Submenu 2',
                        icon: 'pi pi-fw pi-bookmark',
                        items: [
                            {
                                label: 'Submenu 2.1',
                                icon: 'pi pi-fw pi-bookmark',
                                items: [
                                    { label: 'Submenu 2.1.1', icon: 'pi pi-fw pi-bookmark' },
                                    { label: 'Submenu 2.1.2', icon: 'pi pi-fw pi-bookmark' }
                                ]
                            },
                            {
                                label: 'Submenu 2.2',
                                icon: 'pi pi-fw pi-bookmark',
                                items: [{ label: 'Submenu 2.2.1', icon: 'pi pi-fw pi-bookmark' }]
                            }
                        ]
                    }
                ]
            },
            {
                label: 'Get Started',
                items: [
                    {
                        label: 'Documentation',
                        icon: 'pi pi-fw pi-book',
                        routerLink: ['/documentation']
                    },
                    {
                        label: 'View Source',
                        icon: 'pi pi-fw pi-github',
                        url: 'https://github.com/primefaces/sakai-ng',
                        target: '_blank'
                    }
                ]
            }
        ];
    }

  openNew() {
    this.product = {};
    this.submitted = false;
    this.productDialog = true;
  }

  deleteSelectedProducts() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete the selected products?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.products = this.products.filter(
          (val) => !this.selectedProducts?.includes(val)
        );
        this.selectedProducts = null;
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Products Deleted',
          life: 3000,
        });
      },
    });
  }

  editProduct(product: Product) {
    this.product = { ...product };
    this.productDialog = true;
  }

  deleteProduct(product: Product) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + product.name + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.products = this.products.filter((val) => val.id !== product.id);
        this.product = {};
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Product Deleted',
          life: 3000,
        });
      },
    });
  }

  hideDialog() {
    this.productDialog = false;
    this.submitted = false;
  }

  saveProduct() {
    this.submitted = true;

    if (this.product.name?.trim()) {
      if (this.product.id) {
        this.products[this.findIndexById(this.product.id)] = this.product;
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Product Updated',
          life: 3000,
        });
      } else {
        this.product.id = this.createId();
        this.product.image = 'product-placeholder.svg';
        this.products.push(this.product);
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Product Created',
          life: 3000,
        });
      }

      this.products = [...this.products];
      this.productDialog = false;
      this.product = {};
    }
  }

  findIndexById(id: string): number {
    let index = -1;
    for (let i = 0; i < this.products.length; i++) {
      if (this.products[i].id === id) {
        index = i;
        break;
      }
    }

    return index;
  }

  createId(): string {
    let id = '';
    var chars =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < 5; i++) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
  }

  getSeverity(status: string) {
    switch (status) {
      case 'Active':
        return 'success';
      case 'InActive':
        return 'danger';
    }
  }
  onCityChange(value: any) {
  console.log('City changed:', value);
}
onCityInputBlur() {
  console.log('Final input value:', this.selectedCity);
}


}

