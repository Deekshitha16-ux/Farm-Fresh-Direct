
"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Wand2, Loader2, Lightbulb, FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { generateBlogContent } from '@/lib/actions';
import { Separator } from '../ui/separator';

export default function BlogAssistantClient() {
    const [isGenerating, setIsGenerating] = useState(false);
    const { toast } = useToast();
    
    // Form state
    const [farmProduce, setFarmProduce] = useState('Apples, Carrots, Strawberries');
    const [customerSegments, setCustomerSegments] = useState('Health-conscious families, local restaurants');
    const [regionalEvents, setRegionalEvents] = useState('Local farmers market festival, harvest fair');
    const [topicPreference, setTopicPreference] = useState('Seasonal recipes');

    // AI output state
    const [suggestedIdeas, setSuggestedIdeas] = useState<string[]>([]);
    const [draftBlogPost, setDraftBlogPost] = useState('');

    const handleGenerate = async () => {
        setIsGenerating(true);
        setSuggestedIdeas([]);
        setDraftBlogPost('');

        try {
            const result = await generateBlogContent({
                farmProduce: farmProduce.split(',').map(s => s.trim()).filter(Boolean),
                customerSegments: customerSegments.split(',').map(s => s.trim()).filter(Boolean),
                regionalEvents: regionalEvents.split(',').map(s => s.trim()).filter(Boolean),
                topicPreference,
            });

            if (result && (result.suggestedIdeas.length > 0 || result.draftBlogPost)) {
                setSuggestedIdeas(result.suggestedIdeas);
                setDraftBlogPost(result.draftBlogPost);
                toast({
                    title: "Content Generated!",
                    description: "AI has created new ideas and a draft for you.",
                });
            } else {
                throw new Error("AI returned empty or invalid content.");
            }
        } catch (error) {
             toast({
                title: "Generation Failed",
                description: (error as Error).message || "An unexpected error occurred. Please try again.",
                variant: "destructive",
            });
        } finally {
            setIsGenerating(false);
        }
    };

    return (
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            <div className="lg:col-span-1">
                <Card>
                    <CardHeader>
                        <CardTitle>Content Generator</CardTitle>
                        <CardDescription>Provide some details and let AI do the heavy lifting.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid gap-2">
                            <Label htmlFor="farm-produce">Your Produce</Label>
                            <Input id="farm-produce" value={farmProduce} onChange={e => setFarmProduce(e.target.value)} placeholder="e.g., Apples, Carrots" />
                             <p className="text-xs text-muted-foreground">Separate items with commas.</p>
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="customer-segments">Customer Segments</Label>
                            <Input id="customer-segments" value={customerSegments} onChange={e => setCustomerSegments(e.target.value)} placeholder="e.g., Families, Restaurants" />
                             <p className="text-xs text-muted-foreground">Separate items with commas.</p>
                        </div>
                         <div className="grid gap-2">
                            <Label htmlFor="regional-events">Regional Events</Label>
                            <Input id="regional-events" value={regionalEvents} onChange={e => setRegionalEvents(e.target.value)} placeholder="e.g., Harvest festival" />
                             <p className="text-xs text-muted-foreground">Separate items with commas.</p>
                        </div>
                         <div className="grid gap-2">
                            <Label htmlFor="topic-preference">Topic Preference (Optional)</Label>
                            <Input id="topic-preference" value={topicPreference} onChange={e => setTopicPreference(e.target.value)} placeholder="e.g., Sustainability" />
                        </div>
                        <Button onClick={handleGenerate} disabled={isGenerating} className="w-full">
                            {isGenerating ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Wand2 className="mr-2 h-4 w-4" />}
                            Generate Content
                        </Button>
                    </CardContent>
                </Card>
            </div>
            <div className="lg:col-span-2">
                <Card className="min-h-[600px]">
                     <CardHeader>
                        <CardTitle>AI Generated Content</CardTitle>
                        <CardDescription>Here are the ideas and a draft post generated by the AI.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        {isGenerating && (
                            <div className="flex flex-col items-center justify-center pt-16">
                                <Loader2 className="h-12 w-12 animate-spin text-primary" />
                                <p className="mt-4 text-muted-foreground">Generating inspiration...</p>
                            </div>
                        )}

                        {!isGenerating && suggestedIdeas.length === 0 && !draftBlogPost && (
                            <div className="flex flex-col items-center justify-center pt-16 text-center">
                                 <Wand2 className="h-12 w-12 text-muted-foreground" />
                                <p className="mt-4 text-muted-foreground">Your generated content will appear here.</p>
                            </div>
                        )}
                        
                        {suggestedIdeas.length > 0 && (
                            <div>
                                <h3 className="flex items-center font-headline text-xl"><Lightbulb className="mr-2 h-5 w-5 text-accent"/> Suggested Ideas</h3>
                                <ul className="mt-4 list-disc space-y-2 pl-5">
                                    {suggestedIdeas.map((idea, index) => (
                                        <li key={index}>{idea}</li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {draftBlogPost && (
                            <div className="mt-8">
                                <Separator className="my-6"/>
                                <h3 className="flex items-center font-headline text-xl"><FileText className="mr-2 h-5 w-5 text-accent"/> Draft Blog Post</h3>
                                <Textarea value={draftBlogPost} onChange={e => setDraftBlogPost(e.target.value)} rows={15} className="mt-4" />
                                <Button className="mt-4">Save and Publish</Button>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
