'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { Textarea } from "@/components/ui/textarea";

export default function SettingsPage() {
    const { user } = useAuth();

    if (!user) {
        return (
            <div>
                <h1 className="font-headline text-4xl">Settings</h1>
                <p className="text-muted-foreground">You need to be logged in to view this page.</p>
            </div>
        );
    }
    
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
                    <CardContent className="space-y-6">
                        <div className="grid gap-2">
                            <Label htmlFor="full-name">Full Name</Label>
                            <Input id="full-name" defaultValue={user.name} />
                        </div>
                         <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" type="email" defaultValue={user.email} />
                        </div>
                        {user.role === 'farmer' && (
                            <div className="grid gap-2">
                                <Label htmlFor="farm-details">Farm Details</Label>
                                <Textarea id="farm-details" defaultValue={user.farmDetails} />
                            </div>
                        )}
                        <Button>Save Changes</Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
