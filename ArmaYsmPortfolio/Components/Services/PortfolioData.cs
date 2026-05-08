using ArmaYsmPortfolio.Components.Models;

namespace ArmaYsmPortfolio.Services;

public sealed class PortfolioData
{
    public IReadOnlyList<ProjectItem> Projects => new List<ProjectItem>
    {
        new()
        {
            Title = "WeatherBotAPITelegram",
            Subtitle = "Telegram bot + Weather API integration",
            Description = "Two-step API calls (geocoding + weather), formatted output, and automation-friendly design.",
            Tech = new[] { "C#", "Java", "REST", "Telegram Bot API" },
            GitHubUrl = "https://github.com/Raziel1991",
            Badge = "BUILD",
            Screenshots = new ScreenshotPlaceholder[]
            {
                new() { Label = "Bot Interface", Gradient = "linear-gradient(135deg, #0ea5e9, #2563eb)", Icon = "fab fa-telegram" },
                new() { Label = "API Flow", Gradient = "linear-gradient(135deg, #f59e0b, #d97706)", Icon = "fas fa-exchange-alt" },
                new() { Label = "Response", Gradient = "linear-gradient(135deg, #10b981, #059669)", Icon = "fas fa-check-circle" },
            }
        },
        new()
        {
            Title = "Dynatrace Maintenance Windows",
            Subtitle = "Automated MW creation via API",
            Description = "GUI-driven maintenance windows with dynamic JSON payloads and scoped targeting for enterprise monitoring.",
            Tech = new[] { "PowerShell", "Dynatrace API", "Automation" },
            GitHubUrl = "https://github.com/Raziel1991",
            Badge = "OPS",
            Screenshots = new ScreenshotPlaceholder[]
            {
                new() { Label = "Dashboard", Gradient = "linear-gradient(135deg, #7c3aed, #a855f7)", Icon = "fas fa-chart-bar" },
                new() { Label = "Config Panel", Gradient = "linear-gradient(135deg, #2563eb, #3b82f6)", Icon = "fas fa-cog" },
                new() { Label = "Logs", Gradient = "linear-gradient(135deg, #059669, #10b981)", Icon = "fas fa-terminal" },
            }
        },
        new()
        {
            Title = "Unity AI Enemy Controller",
            Subtitle = "State-driven enemy behaviors",
            Description = "NavMesh movement, attack states, and projectile spawning with clean state machine transitions.",
            Tech = new[] { "Unity", "C#", "AI", "State Machines" },
            GitHubUrl = "https://github.com/Raziel1991",
            Badge = "GAME",
            Screenshots = new ScreenshotPlaceholder[]
            {
                new() { Label = "State Machine", Gradient = "linear-gradient(135deg, #ec4899, #f43f5e)", Icon = "fas fa-project-diagram" },
                new() { Label = "NavMesh", Gradient = "linear-gradient(135deg, #06b6d4, #0ea5e9)", Icon = "fas fa-route" },
                new() { Label = "Combat", Gradient = "linear-gradient(135deg, #f97316, #ef4444)", Icon = "fas fa-crosshairs" },
            }
        },
        new()
        {
            Title = "Ansible Automation Framework",
            Subtitle = "Playbook-driven server provisioning",
            Description = "Ansible roles for Windows/Linux server hardening, application deployment, and compliance auditing across hybrid environments.",
            Tech = new[] { "Ansible", "YAML", "Windows", "Linux" },
            GitHubUrl = "https://github.com/Raziel1991",
            Badge = "OPS",
            Screenshots = new ScreenshotPlaceholder[]
            {
                new() { Label = "Playbook View", Gradient = "linear-gradient(135deg, #ee0000, #dc2626)", Icon = "fas fa-cogs" },
                new() { Label = "Inventory", Gradient = "linear-gradient(135deg, #6366f1, #4f46e5)", Icon = "fas fa-server" },
                new() { Label = "Run Report", Gradient = "linear-gradient(135deg, #22c55e, #16a34a)", Icon = "fas fa-check-double" },
            }
        },
        new()
        {
            Title = "Hyper-V Cluster Orchestrator",
            Subtitle = "Automated VM lifecycle management",
            Description = "PowerShell module for orchestrating Hyper-V live migrations, cluster-aware patching, and automated VM failover testing.",
            Tech = new[] { "PowerShell", "Hyper-V", "Failover Clustering" },
            DemoUrl = "#",
            Badge = "OPS",
            Screenshots = new ScreenshotPlaceholder[]
            {
                new() { Label = "Cluster View", Gradient = "linear-gradient(135deg, #00bcf2, #0284c7)", Icon = "fas fa-network-wired" },
                new() { Label = "Migration", Gradient = "linear-gradient(135deg, #8b5cf6, #6d28d9)", Icon = "fas fa-arrows-alt" },
                new() { Label = "Health", Gradient = "linear-gradient(135deg, #10b981, #047857)", Icon = "fas fa-heartbeat" },
            }
        },
        new()
        {
            Title = "Unreal 5 Procedural Dungeon",
            Subtitle = "Runtime level generation system",
            Description = "Procedural dungeon generation in Unreal Engine 5 using BSP-like room placement, corridor carving, and runtime mesh creation.",
            Tech = new[] { "Unreal 5", "C++", "Procedural", "HLSL" },
            Badge = "GAME",
            Screenshots = new ScreenshotPlaceholder[]
            {
                new() { Label = "Generation", Gradient = "linear-gradient(135deg, #f59e0b, #b45309)", Icon = "fas fa-layer-group" },
                new() { Label = "Viewport", Gradient = "linear-gradient(135deg, #a855f7, #7c3aed)", Icon = "fas fa-cube" },
                new() { Label = "Lighting", Gradient = "linear-gradient(135deg, #f97316, #ea580c)", Icon = "fas fa-lightbulb" },
                new() { Label = "Materials", Gradient = "linear-gradient(135deg, #06b6d4, #0891b2)", Icon = "fas fa-palette" },
            }
        }
    };
}
