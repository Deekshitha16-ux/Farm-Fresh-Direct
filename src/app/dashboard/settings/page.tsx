'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useState, useEffect } from "react";

export default function SettingsPage() {
    const { user, updateUser } = useAuth();
    const { toast } = useToast();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [farmDetails, setFarmDetails] = useState('');

    useEffect(() => {
        if (user) {
            setName(user.name);
            setEmail(user.email);
            setFarmDetails(user.farmDetails || '');
        }
    }, [user]);

    if (!user) {
        return (
            <div>
                <h1 className="font-headline text-4xl">Settings</h1>
                <p className="text-muted-foreground">You need to be logged in to view this page.</p>
            </div>
        );
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!user) return;
        
        updateUser({ name, email, farmDetails });

        toast({
            title: "Settings Saved",
            description: "Your profile information has been updated successfully.",
        });
    };
    
    return (
        <div>
            <h1 className="font-headline text-4xl">Settings</h1>
            <p className="text-muted-foreground">Manage your account and preferences.</p>

            <div className="mt-8">
                <Card>
                    <CardHeader>
                        <CardTitle>Profile</CardTitle>
                        <CardDescription>This is how others will see you on the site.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid gap-2">
                                <Label htmlFor="full-name">Full Name</Label>
                                <Input id="full-name" value={name} onChange={(e) => setName(e.target.value)} />
                            </div>
                             <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                            </div>
                            {user.role === 'farmer' && (
                                <div className="grid gap-2">
                                    <Label htmlFor="farm-details">Farm Details</Label>
                                    <Textarea id="farm-details" value={farmDetails} onChange={(e) => setFarmDetails(e.target.value)} />
                                </div>
                            )}
                            <Button type="submit">Save Changes</Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
