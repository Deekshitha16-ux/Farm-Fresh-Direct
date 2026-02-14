import BlogAssistantClient from "@/components/dashboard/blog-assistant-client";

export default function DashboardBlogPage() {
    return (
        <div>
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="font-headline text-4xl">Blog Assistant</h1>
                    <p className="text-muted-foreground">Use our AI-powered tool to generate blog post ideas and content.</p>
                </div>
            </div>

            <div className="mt-8">
                <BlogAssistantClient />
            </div>
        </div>
    );
}
