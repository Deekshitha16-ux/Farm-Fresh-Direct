
'use client';

import { useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { DollarSign, Package, Users, Activity } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useUserProfile } from "@/hooks/use-user-profile";
import type { Order, OrderItem } from "@/lib/types";
import { useFirestore, useCollection, useMemoFirebase } from "@/firebase";
import { collection, query, where } from "firebase/firestore";

function CustomerDashboard() {
    const { user } = useUserProfile();
    const firestore = useFirestore();

    const ordersQuery = useMemoFirebase(() => {
        if (!user) return null;
        return query(collection(firestore, 'orders'), where('customerId', '==', user.uid));
    }, [user, firestore]);

    const { data: myOrders, isLoading } = useCollection<Order>(ordersQuery);

    return (
        <div>
            <h1 className="font-headline text-4xl">My Dashboard</h1>
            <p className="text-muted-foreground">Welcome back, {user?.displayName}! Here are your recent orders.</p>

            <div className="mt-8">
                <Card>
                    <CardHeader>
                        <CardTitle>My Orders</CardTitle>
                        <CardDescription>An overview of your order history.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        {isLoading && <p>Loading orders...</p>}
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
                                {myOrders?.map(order => (
                                    <TableRow key={order.id}>
                                        <TableCell>
                                            <div className="font-medium truncate max-w-[100px]">{order.id}</div>
                                        </TableCell>
                                        <TableCell>{new Date(order.orderDate).toLocaleDateString()}</TableCell>
                                        <TableCell><Badge>{order.status}</Badge></TableCell>
                                        <TableCell className="text-right">${order.totalAmount.toFixed(2)}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                         {myOrders && myOrders.length === 0 && !isLoading && (
                            <p className="p-4 text-center text-muted-foreground">You haven't placed any orders yet.</p>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

function FarmerDashboard() {
    const { user } = useUserProfile();
    const firestore = useFirestore();

    const ordersQuery = useMemoFirebase(() => {
        if (!user) return null;
        return query(collection(firestore, 'orders'), where('farmerIds', 'array-contains', user.uid));
    }, [user, firestore]);

    const productsQuery = useMemoFirebase(() => {
        if(!user) return null;
        return query(collection(firestore, 'products'), where('farmerId', '==', user.uid));
    }, [user, firestore]);

    const { data: farmerOrders, isLoading: isLoadingOrders } = useCollection<Order>(ordersQuery);
    const { data: farmerProducts, isLoading: isLoadingProducts } = useCollection(productsQuery);

    const stats = useMemo(() => {
        if (!user || !farmerOrders || user.role !== 'farmer') {
            return {
                totalRevenue: 0,
                customerIds: new Set(),
                activeOrders: [],
                recentOrders: [],
            };
        }

        let totalRevenue = 0;
        const customerIds = new Set<string>();

        farmerOrders.forEach(order => {
            customerIds.add(order.customerId);
            order.items.forEach((item: OrderItem) => {
                if (item.farmerId === user.uid) {
                    totalRevenue += item.subtotal;
                }
            });
        });
        
        const activeOrders = farmerOrders.filter(o => o.status === 'Pending' || o.status === 'Shipped');

        return { totalRevenue, customerIds, activeOrders, recentOrders: farmerOrders };

    }, [user, farmerOrders]);

    const { totalRevenue, customerIds, activeOrders, recentOrders } = stats;

    return (
        <div>
            <h1 className="font-headline text-4xl">{user?.farmName} Dashboard</h1>
            <p className="text-muted-foreground">Welcome back, {user?.displayName}. Here's an overview of your farm.</p>

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
                        <div className="text-2xl font-bold">{farmerProducts?.length || 0}</div>
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
                        {isLoadingOrders && <p>Loading orders...</p>}
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
                                    return (
                                        <TableRow key={order.id}>
                                            <TableCell>
                                                <div className="font-medium">{order.customerName || 'Unknown'}</div>
                                            </TableCell>
                                            <TableCell><Badge>{order.status}</Badge></TableCell>
                                            <TableCell className="text-right">${order.totalAmount.toFixed(2)}</TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                         {recentOrders && recentOrders.length === 0 && !isLoadingOrders && (
                            <p className="p-4 text-center text-muted-foreground">You have no orders yet.</p>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

export default function DashboardPage() {
    const { user, isLoading } = useUserProfile();

    if (isLoading) {
        return (
             <div>
                <h1 className="font-headline text-4xl">Dashboard</h1>
                <p className="text-muted-foreground">Loading...</p>
            </div>
        )
    }

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
