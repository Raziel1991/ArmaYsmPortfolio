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
            Badge = "BUILD"
        },
        new()
        {
            Title = "Dynatrace Maintenance Windows",
            Subtitle = "Automated MW creation via API",
            Description = "GUI-driven maintenance windows with dynamic JSON payloads and scoped targeting for enterprise monitoring.",
            Tech = new[] { "PowerShell", "Dynatrace API", "Automation" },
            GitHubUrl = "https://github.com/Raziel1991",
            Badge = "OPS"
        },
        new()
        {
            Title = "Unity AI Enemy Controller",
            Subtitle = "State-driven enemy behaviors",
            Description = "NavMesh movement, attack states, and projectile spawning with clean state machine transitions.",
            Tech = new[] { "Unity", "C#", "AI", "State Machines" },
            GitHubUrl = "https://github.com/Raziel1991",
            Badge = "GAME"
        },
        new()
        {
            Title = "Ansible Automation Framework",
            Subtitle = "Playbook-driven server provisioning",
            Description = "Ansible roles for Windows/Linux server hardening, application deployment, and compliance auditing across hybrid environments.",
            Tech = new[] { "Ansible", "YAML", "Windows", "Linux" },
            GitHubUrl = "https://github.com/Raziel1991",
            Badge = "OPS"
        },
        new()
        {
            Title = "Hyper-V Cluster Orchestrator",
            Subtitle = "Automated VM lifecycle management",
            Description = "PowerShell module for orchestrating Hyper-V live migrations, cluster-aware patching, and automated VM failover testing.",
            Tech = new[] { "PowerShell", "Hyper-V", "Failover Clustering" },
            DemoUrl = "#",
            Badge = "OPS"
        },
        new()
        {
            Title = "Unreal 5 Procedural Dungeon",
            Subtitle = "Runtime level generation system",
            Description = "Procedural dungeon generation in Unreal Engine 5 using BSP-like room placement, corridor carving, and runtime mesh creation.",
            Tech = new[] { "Unreal 5", "C++", "Procedural", "HLSL" },
            Badge = "GAME"
        }
    };
}
