import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { CardModule } from 'primeng/card';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';
import { CategoriesService, Category } from '../../../../core/services/categories/categories.service';
import { InventoryService, LowStockProduct } from '../../../../core/services/inventory/inventory.service';
import { ProductsService } from '../../../../core/services/products/products.service';
import { StatisticsService } from '../../../../core/services/statistics/statistics.service';
import { Product } from '../../../../core/interfaces/products/products.interface';

interface OrderStatus {
  label: string;
  value: number;
  percentage: string;
  color: string;
  offset: number;
  rotation: number;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, CardModule, TagModule, ButtonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  private readonly router = inject(Router);
  private readonly categoriesService = inject(CategoriesService);
  private readonly inventoryService = inject(InventoryService);
  private readonly productsService = inject(ProductsService);
  private readonly statisticsService = inject(StatisticsService);

  revenueView: 'Monthly' | 'Weekly' = 'Monthly';

  stats = [
    { label: 'Total products', value: '0', icon: 'pi pi-box', color: 'text-red-600', bgColor: 'bg-red-50', iconColor: 'text-red-500' },
    { label: 'Total orders', value: '1,284', icon: 'pi pi-file-edit', color: 'text-blue-600', bgColor: 'bg-blue-50', iconColor: 'text-blue-500' },
    { label: 'Total categories', value: '0', icon: 'pi pi-objects-column', color: 'text-purple-600', bgColor: 'bg-purple-50', iconColor: 'text-purple-500' },
    { label: 'Total revenue', value: '6,824,528', suffix: 'EGP', icon: 'pi pi-dollar', color: 'text-green-600', bgColor: 'bg-green-50', iconColor: 'text-green-500' },
  ];

  categories: Category[] = [];

  topSellingProducts: Product[] = [];

  lowStockProducts: LowStockProduct[] = [];

  orderStatus: OrderStatus[] = [
    { label: 'Completed', value: 216, percentage: '33%', color: 'bg-emerald-500', offset: 378.87, rotation: 0 },
    { label: 'In progress', value: 513, percentage: '57%', color: 'bg-blue-500', offset: 243.1, rotation: 118.8 },
    { label: 'Canceled', value: 19, percentage: '10%', color: 'bg-red-500', offset: 508.93, rotation: 324 },
  ];

  monthlyPath = "M0,220 C100,200 150,260 200,210 C250,160 300,240 350,180 C400,120 450,220 500,140 C550,60 600,180 650,80 C700,50 750,150 800,100 C850,50 900,140 1000,110";
  monthlyFill = "M0,220 C100,200 150,260 200,210 C250,160 300,240 350,180 C400,120 450,220 500,140 C550,60 600,180 650,80 C700,50 750,150 800,100 C850,50 900,140 1000,110 L1000,280 L0,280 Z";
  
  weeklyPath = "M0,250 C100,100 200,180 300,120 C400,140 500,60 600,100 C700,40 800,90 900,30 1000,70";
  weeklyFill = "M0,250 C100,100 200,180 300,120 C400,140 500,60 600,100 C700,40 800,90 900,30 1000,70 L1000,280 L0,280 Z";

  ngOnInit(): void {
    // Fetch Categories
    this.categoriesService.getCategories().subscribe({
      next: (res) => {
        this.categories = res.categories.map(cat => ({
          ...cat,
          productsCount: cat.productsCount ?? 0
        }));
      }
    });

    // Fetch Overall Statistics
    this.statisticsService.getOverallStatistics().subscribe({
      next: (res) => {
        this.stats[0].value = res.statistics.totalProducts.toLocaleString();
        this.stats[1].value = res.statistics.totalOrders.toLocaleString();
        this.stats[2].value = res.statistics.totalCategories.toLocaleString();
        this.stats[3].value = res.statistics.totalRevenue.toLocaleString();
      }
    });

    // Fetch Low Stock Products
    this.inventoryService.getLowStockProducts().subscribe({
      next: (res) => {
        this.lowStockProducts = res.products;
      }
    });

    // Fetch Products (Top Selling)
    this.productsService.getProducts().subscribe({
      next: (res) => {
        this.topSellingProducts = res.products
          .map(p => ({
            ...p,
            title: p.title || 'Untitled Product',
            sold: p.sold || 0
          }))
          .sort((a, b) => b.sold - a.sold)
          .slice(0, 10);
      }
    });

    // Fetch Order Statistics
    this.statisticsService.getOrderStatistics().subscribe({
      next: (res) => {
        const stats = res.statistics.ordersByStatus;
        const total = stats.reduce((sum, s) => sum + s.count, 0);
        
        const findCount = (id: string) => stats.find(s => s._id === id)?.count || 0;
        
        const completed = findCount('completed');
        const inProgress = findCount('inProgress');
        const canceled = findCount('canceled');
        const pending = findCount('pending');

        const inProgressTotal = inProgress + pending;

        this.orderStatus = [
          { 
            label: 'Completed', 
            value: completed, 
            percentage: total ? Math.round((completed / total) * 100) + '%' : '0%', 
            color: 'bg-emerald-500',
            offset: this.calculateOffset(completed, total),
            rotation: 0
          },
          { 
            label: 'In progress', 
            value: inProgressTotal, 
            percentage: total ? Math.round((inProgressTotal / total) * 100) + '%' : '0%', 
            color: 'bg-blue-500',
            offset: this.calculateOffset(inProgressTotal, total),
            rotation: (completed / total) * 360
          },
          { 
            label: 'Canceled', 
            value: canceled, 
            percentage: total ? Math.round((canceled / total) * 100) + '%' : '0%', 
            color: 'bg-red-50', // Matching the design color more closely if needed, but let's stick to consistent color names
            offset: this.calculateOffset(canceled, total),
            rotation: ((completed + inProgressTotal) / total) * 360
          },
        ];

        // Ensure Canceled color is consistent with the palette
        this.orderStatus[2].color = 'bg-red-500';

        // Update Revenue Charts
        const dailyData = [...res.statistics.dailyRevenue].reverse().map(d => d.revenue);
        const monthlyData = [...res.statistics.monthlyRevenue].reverse().map(d => d.revenue);

        if (dailyData.length > 0) {
          this.weeklyPath = this.generateSmoothPath(dailyData, 1000, 280);
          this.weeklyFill = this.weeklyPath + " L1000,280 L0,280 Z";
        }

        if (monthlyData.length > 0) {
          this.monthlyPath = this.generateSmoothPath(monthlyData, 1000, 280);
          this.monthlyFill = this.monthlyPath + " L1000,280 L0,280 Z";
        }
      }
    });
  }

  private generateSmoothPath(data: number[], width: number, height: number): string {
    if (!data.length) return "";
    const max = Math.max(...data, 1);
    const stepX = width / (data.length - 1);
    
    return data.reduce((path, val, i) => {
      const x = i * stepX;
      const y = height - (val / max) * (height * 0.8); // 0.8 to keep some padding at top
      return i === 0 ? `M${x},${y}` : `${path} L${x},${y}`;
    }, "");
  }

  private calculateOffset(count: number, total: number): number {
    if (!total) return 565.48;
    const circumference = 565.48;
    return circumference - ((count / total) * circumference);
  }

  setRevenueView(view: 'Monthly' | 'Weekly') {
    this.revenueView = view;
  }

  viewAllCategories() {
    this.router.navigate(['/categories']);
  }
}
