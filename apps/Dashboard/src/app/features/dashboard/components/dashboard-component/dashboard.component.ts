import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { CardModule } from 'primeng/card';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { ChartModule } from 'primeng/chart';
import { Router } from '@angular/router';
import { CategoriesService, Category } from '../../../../core/services/categories/categories.service';
import { InventoryService, LowStockProduct } from '../../../../core/services/inventory/inventory.service';
import { ProductsService } from '../../../../core/services/products/products.service';
import { StatisticsService } from '../../../../core/services/statistics/statistics.service';
import { Product } from '../../../../core/interfaces/products/products.interface';

import { ChartData, ChartOptions, ScriptableContext, TooltipItem } from 'chart.js';

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
  imports: [CommonModule, CardModule, TagModule, ButtonModule, ChartModule],
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

  chartData: ChartData<'line'> | undefined;
  chartOptions: ChartOptions<'line'> | undefined;
  
  doughnutData: ChartData<'doughnut'> | undefined;
  doughnutOptions: ChartOptions<'doughnut'> | undefined;
  
  private rawRevenueData: { daily: number[], monthly: number[] } = { daily: [], monthly: [] };

  ngOnInit(): void {
    this.initChartOptions();

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
            color: 'bg-red-500',
            offset: this.calculateOffset(canceled, total),
            rotation: ((completed + inProgressTotal) / total) * 360
          },
        ];

        // Update Revenue Charts
        this.rawRevenueData.daily = [...res.statistics.dailyRevenue].reverse().map(d => d.revenue);
        this.rawRevenueData.monthly = [...res.statistics.monthlyRevenue].reverse().map(d => d.revenue);
        
        this.updateChartData();
        this.updateDoughnutData();
      }
    });
  }

  private initChartOptions() {
    this.initDoughnutOptions();
    this.chartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      aspectRatio: 0.6,
      plugins: {
        legend: {
          display: false
        },
        tooltip: {
          mode: 'index',
          intersect: false,
          backgroundColor: '#A6252A',
          titleColor: '#fff',
          bodyColor: '#fff',
          bodyFont: {
            size: 13,
            weight: 'bold'
          },
          padding: 12,
          displayColors: false,
          callbacks: {
            label: (context: TooltipItem<'line'>) => {
              const value = context.parsed.y ?? 0;
              return ` Revenue: ${value.toLocaleString()} EGP`;
            }
          }
        }
      },
      layout: {
        padding: {
          top: 20,
          bottom: 30,
          left: 10,
          right: 10
        }
      },
      scales: {
        x: {
          display: true,
          position: 'bottom',
          grid: {
            display: false,
          },
          border: {
            display: false
          },
          ticks: {
            color: '#A1A1AA',
            padding: 10,
            font: {
              size: 11,
              weight: 600
            }
          }
        },
        y: {
          beginAtZero: true,
          grid: {
            color: '#F4F4F5',
            drawTicks: false,
          },
          border: {
            display: false
          },
          ticks: {
            color: '#D4D4D8',
            maxTicksLimit: 8,
            padding: 10,
            font: {
              weight: 'bold',
              size: 10
            },
            callback: (value: number | string) => {
              const numValue = typeof value === 'string' ? parseFloat(value) : value;
              if (numValue >= 1000000) return (numValue / 1000000).toFixed(1) + 'M';
              if (numValue >= 1000) return (numValue / 1000) + 'k';
              return numValue;
            }
          }
        }
      },
      elements: {
        line: {
          tension: 0.4,
          cubicInterpolationMode: 'monotone'
        },
        point: {
          radius: 0,
          hitRadius: 10,
          hoverRadius: 6,
          hoverBackgroundColor: '#A6252A',
          hoverBorderColor: '#fff',
          hoverBorderWidth: 2
        }
      }
    };
  }

  private updateChartData() {
    const isMonthly = this.revenueView === 'Monthly';
    const data = isMonthly ? this.rawRevenueData.monthly : this.rawRevenueData.daily;
    const labels = isMonthly 
      ? ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].slice(0, data.length)
      : ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].slice(0, data.length);

    this.chartData = {
      labels: labels,
      datasets: [
        {
          label: 'Revenue',
          data: data,
          fill: true,
          borderColor: '#A6252A',
          borderWidth: 3,
          backgroundColor: (context: ScriptableContext<'line'>) => {
            const chart = context.chart;
            const { ctx, chartArea } = chart;
            if (!chartArea) return undefined;
            const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
            gradient.addColorStop(0, 'rgba(166, 37, 42, 0.45)');
            gradient.addColorStop(1, 'rgba(166, 37, 42, 0)');
            return gradient;
          }
        }
      ]
    };
  }

  private updateDoughnutData() {
    this.doughnutData = {
      labels: this.orderStatus.map(s => s.label),
      datasets: [
        {
          data: this.orderStatus.map(s => s.value),
          backgroundColor: ['#00BC7D', '#2B7FFF', '#EF4444'], 
          hoverBackgroundColor: ['#00A36C', '#1E6CEB', '#DA3131'],
          borderWidth: 0,
          spacing: 2
        }
      ]
    };
  }

  private initDoughnutOptions() {
    this.doughnutOptions = {
      responsive: true,
      maintainAspectRatio: false,
      cutout: '70%',
      plugins: {
        legend: {
          display: false
        },
        tooltip: {
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          padding: 12,
          cornerRadius: 8,
          titleFont: {
            size: 14,
            weight: 'bold'
          },
          bodyFont: {
            size: 13
          },
          callbacks: {
            label: (context: TooltipItem<'doughnut'>) => {
              const label = context.label || '';
              const value = (context.parsed as number) || 0;
              const datasetData = context.dataset.data as number[];
              const total = datasetData.reduce((a: number, b: number) => a + b, 0);
              const percentage = Math.round((value / total) * 100) + '%';
              return ` ${label}: ${value} (${percentage})`;
            }
          }
        }
      },
      animation: {
        animateRotate: true,
        animateScale: true
      }
    };
  }

  private calculateOffset(count: number, total: number): number {
    if (!total) return 0;
    return (count / total) * 100;
  }

  setRevenueView(view: 'Monthly' | 'Weekly') {
    this.revenueView = view;
    this.updateChartData();
  }

  viewAllCategories() {
    this.router.navigate(['/categories']);
  }
}
