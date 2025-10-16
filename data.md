import { TrendingUp, DollarSign, ShoppingCart, Eye } from "lucide-react";

const statsData = [
  {
    title: "Total Revenue",
    value: "$56,800",
    change: "+12.5%",
    trend: "up",
    icon: DollarSign,
    color: "from-green-500 to-emerald-600",
    bgColor: "bg-green-50 dark:bg-green-900/20",
    textColor: "text-green-600 dark:text-green-400",
  },
  {
    title: "Total Sales",
    value: "12,340",
    change: "+8.1%",
    trend: "up",
    icon: ShoppingCart,
    color: "from-purple-500 to-pink-600",
    bgColor: "bg-purple-50 dark:bg-purple-900/20",
    textColor: "text-purple-600 dark:text-purple-400",
  },
  {
    title: "Active Users",
    value: "8,245",
    change: "+3.4%",
    trend: "up",
    icon: TrendingUp,
    color: "from-blue-500 to-cyan-600",
    bgColor: "bg-blue-50 dark:bg-blue-900/20",
    textColor: "text-blue-600 dark:text-blue-400",
  },
  {
    title: "Page Views",
    value: "45,892",
    change: "-2.1%",
    trend: "down",
    icon: Eye,
    color: "from-orange-500 to-red-600",
    bgColor: "bg-orange-50 dark:bg-orange-900/20",
    textColor: "text-orange-600 dark:text-orange-400",
  },
];


<!-- Revenue Chart -->

# 📊 Revenue and Expenses Data

```js
const data = [
  { month: "Jan", revenue: 45000, expenses: 32000 },
  { month: "Feb", revenue: 52000, expenses: 38000 },
  { month: "Mar", revenue: 48000, expenses: 35000 },
  { month: "Apr", revenue: 61000, expenses: 42000 },
  { month: "May", revenue: 55000, expenses: 40000 },
  { month: "Jun", revenue: 67000, expenses: 45000 },
  { month: "Jul", revenue: 72000, expenses: 48000 },
  { month: "Aug", revenue: 69000, expenses: 46000 },
  { month: "Sep", revenue: 78000, expenses: 52000 },
  { month: "Oct", revenue: 74000, expenses: 50000 },
  { month: "Nov", revenue: 82000, expenses: 55000 },
  { month: "Dec", revenue: 89000, expenses: 58000 },
];


BarChart,
Bar,
XAxis,
YAxis,
CartesianGrid,
ResponsiveContainer,
Tooltip,

// sales Chart

import {PieChart, Pie, Cell, ResponsiveContainer, Tooltip} from "recharts";

const data = [
    {name: "Electronics", value:45, color:"#3b82f6" },
    {name: "Clothing", value:30, color:"#8b5cf6" },
    {name: "Books", value:15, color:"#10b981" },
    {name: "Other", value:10, color:"#f59e0b" },
];