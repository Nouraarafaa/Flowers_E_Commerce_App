export interface OverallStatistics {
  totalProducts: number;
  totalOrders: number;
  totalCategories: number;
  totalRevenue: number;
}

export interface StatisticsResponse {
  message: string;
  statistics: OverallStatistics;
}

export interface OrderByStatus {
  _id: string | null;
  count: number;
}

export interface RevenueData {
  _id: string;
  revenue: number;
  count: number;
}

export interface OrderStatistics {
  ordersByStatus: OrderByStatus[];
  dailyRevenue: RevenueData[];
  monthlyRevenue: RevenueData[];
}

export interface OrderStatisticsResponse {
  message: string;
  statistics: OrderStatistics;
}
