'use client';

import { useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { DollarSign, Package, Users, Activity } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { DUMMY_ORDERS, DUMMY_PRODUCTS, DUMMY_USERS } from "@/lib/dummy-data";
import { useAuth } from "@/hooks/use-auth";
import type { Order } from "@/lib/types";

function CustomerDashboard() {
    const { user } = useAuth();
    const myOrders = DUMMY_ORDERS.filter(o => o.userId === user?.id);

    return (
        <div>
            <h1 className="font-headline text-4xl">My Dashboard</h1>
            <p className="text-muted-foreground">Welcome back, {user?.name}! Here are your recent orders.</p>

            <div className="mt-8">
                <Card>
                    <CardHeader>
                        <CardTitle>My Orders</CardTitle>
                        <CardDescription>An overview of your order history.</CardDescription>
                    </CardHeader>
                    <CardContent>
                         <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Order ID</TableHead>
                                    <TableHead>Date</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="text-right">Amount</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {myOrders.map(order => (
                                    <TableRow key={order.id}>
                                        <TableCell>
                                            <div className="font-medium">{order.id}</div>
                                        </TableCell>
                                        <TableCell>{new Date(order.date).toLocaleDateString()}</TableCell>
                                        <TableCell><Badge>{order.status}</Badge></TableCell>
                                        <TableCell className="text-right">${order.total.toFixed(2)}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

function FarmerDashboard() {
    const { user } = useAuth();

    const stats = useMemo(() => {
        if (!user || user.role !== 'farmer' || !user.farmName) {
            return {
                totalRevenue: 0,
                customerIds: new Set(),
                productCount: 0,
                activeOrders: [],
                recentOrders: [],
            };
        }

        const myFarmName = user.farmName;
        let totalRevenue = 0;
        const customerIds = new Set<string>();
        const activeOrders: Order[] = [];
        const recentOrders: Order[] = [];

        const myProductIds = DUMMY_PRODUCTS
            .filter(p => p.farmer === myFarmName)
            .map(p => p.id);
        
        const productCount = myProductIds.length;

        for (const order of DUMMY_ORDERS) {
            let orderContainsMyProduct = false;
            let revenueFromThisOrder = 0;

            for (const item of order.items) {
                if (myProductIds.includes(item.product.id)) {
                    orderContainsMyProduct = true;
                    revenueFromThisOrder += item.product.price * item.quantity;
                    customerIds.add(order.userId);
                }
            }

            if (orderContainsMyProduct) {
                totalRevenue += revenueFromThisOrder;
                recentOrders.push(order);
                if (order.status === 'Pending' || order.status === 'Shipped') {
                    activeOrders.push(order);
                }
            }
        }
        
        return { totalRevenue, customerIds, productCount, activeOrders, recentOrders };

    }, [user]);

    const { totalRevenue, customerIds, productCount, activeOrders, recentOrders } = stats;

    return (
        <div>
            <h1 className="font-headline text-4xl">{user?.farmName} Dashboard</h1>
            <p className="text-muted-foreground">Welcome back, {user?.name}. Here's an overview of your farm.</p>

            <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">${totalRevenue.toFixed(2)}</div>
                        <p className="text-xs text-muted-foreground">From all processed orders</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Customers</CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{customerIds.size}</div>
                        <p className="text-xs text-muted-foreground">Unique customers</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Products</CardTitle>
                        <Package className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{productCount}</div>
                        <p className="text-xs text-muted-foreground">Currently listed</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Active Orders</CardTitle>
                        <Activity className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{activeOrders.length}</div>
                        <p className="text-xs text-muted-foreground">Orders awaiting shipment</p>
                    </CardContent>
                </Card>
            </div>

            <div className="mt-8">
                <Card>
                    <CardHeader>
                        <CardTitle>Recent Orders</CardTitle>
                        <CardDescription>A list of recent orders including your products.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Customer</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="text-right">Amount</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {recentOrders.slice(0, 5).map(order => {
                                    const customer = DUMMY_USERS.find(u => u.id === order.userId);
                                    return (
                                        <TableRow key={order.id}>
                                            <TableCell>
                                                <div className="font-medium">{customer?.name || 'Unknown'}</div>
                                                <div className="text-sm text-muted-foreground">{customer?.email || 'N/A'}</div>
                                            </TableCell>
                                            <TableCell><Badge>{order.status}</Badge></TableCell>
                                            <TableCell className="text-right">${order.total.toFixed(2)}</TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

export default function DashboardPage() {
    const { user } = useAuth();

    if (!user) {
        return (
             <div>
                <h1 className="font-headline text-4xl">Dashboard</h1>
                <p className="text-muted-foreground">Please log in to see your dashboard.</p>
            </div>
        )
    }

    if (user.role === 'customer') {
        return <CustomerDashboard />;
    }

    if (user.role === 'farmer') {
        return <FarmerDashboard />;
    }

    return null;
}
