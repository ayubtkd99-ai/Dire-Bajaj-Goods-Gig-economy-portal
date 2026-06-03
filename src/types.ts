/**
 * Types for Dire Dawa Gig Economy Portal & App Simulator
 */

export type LanguageCode = 'am' | 'om' | 'so' | 'en';

export type UserRole = 'guest' | 'driver' | 'customer' | 'merchant' | 'owner';

export interface Hub {
  id: string;
  name: {
    am: string;
    om: string;
    so: string;
    en: string;
  };
  type: 'station' | 'market';
  description: {
    am: string;
    om: string;
    so: string;
    en: string;
  };
  coords: { x: number; y: number }; // Percentage coords on the map canvas
}

export interface Order {
  id: string;
  type: 'ride' | 'delivery' | 'green';
  status: 'pending' | 'accepted' | 'completed';
  origin: string; // Hub ID
  destination: string; // Hub ID
  price: number; // in ETB
  commission: number; // in ETB (5%)
  customerName: string;
  itemsDescription?: string;
  time: string;
}

export interface FinancialStats {
  initialCapital: number;
  driverCount: number;
  riderCount: number;
  dailyAvgIncome: number;
  commissionRate: number; // default 5% (0.05)
}

export interface AppNotification {
  id: string;
  message: {
    am: string;
    om: string;
    so: string;
    en: string;
  };
  type: 'success' | 'info' | 'warning';
  time: string;
}
