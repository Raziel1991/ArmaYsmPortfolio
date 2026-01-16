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
            Description = "GUI-driven maintenance windows with dynamic JSON payloads and scoped targeting.",
            Tech = new[] { "PowerShell", "Dynatrace API", "Automation" },
            GitHubUrl = "https://github.com/Raziel1991",
            Badge = "OPS"
        },
        new()
        {
            Title = "Unity AI Enemy Controller",
            Subtitle = "State-driven enemy behaviors",
            Description = "NavMesh movement, attack states, and projectile spawning with clean transitions.",
            Tech = new[] { "Unity", "C#", "AI", "State Machines" },
            GitHubUrl = "https://github.com/Raziel1991",
            Badge = "GAME"
        }
    };
}
