
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useUserProfile } from "@/hooks/use-user-profile";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useState, useEffect } from "react";
import { useAuth, useFirestore, updateDocumentNonBlocking } from "@/firebase";
import { updateProfile } from "firebase/auth";
import { doc } from "firebase/firestore";

export default function SettingsPage() {
    const { user, isLoading } = useUserProfile();
    const auth = useAuth();
    const firestore = useFirestore();
    const { toast } = useToast();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [farmDetails, setFarmDetails] = useState('');

    useEffect(() => {
        if (user) {
            setName(user.displayName || '');
            setEmail(user.email || '');
            setFarmDetails(user.farmDetails || '');
        }
    }, [user]);

    if (isLoading) {
        return (
            <div>
                <h1 className="font-headline text-4xl">Settings</h1>
                <p className="text-muted-foreground">Loading...</p>
            </div>
        );
    }
    
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
        if (!user || !auth.currentUser) return;
        
        const userDocRef = doc(firestore, 'users', user.uid);
        
        const dataToUpdate: any = {
            displayName: name,
        };
        if (user.role === 'farmer') {
            dataToUpdate.farmDetails = farmDetails;
        }

        updateDocumentNonBlocking(userDocRef, dataToUpdate);

        if(auth.currentUser.displayName !== name) {
            updateProfile(auth.currentUser, { displayName: name });
        }

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
                                <Input id="email" type="email" value={email} disabled />
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
