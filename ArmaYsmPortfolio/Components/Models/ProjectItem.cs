namespace ArmaYsmPortfolio.Components.Models
{
    public sealed class ProjectItem
    {
        public string Title { get; init; } = "";
        public string Subtitle { get; init; } = "";
        public string Description { get; init; } = "";
        public string[] Tech { get; init; } = [];
        public string? GitHubUrl { get; init; }
        public string? DemoUrl { get; init; }
        public string Badge { get; init; } = "LIVE";
        public ScreenshotPlaceholder[] Screenshots { get; init; } = [];
    }

    public sealed class ScreenshotPlaceholder
    {
        public string Label { get; init; } = "";
        public string Gradient { get; init; } = "";
        public string Icon { get; init; } = "";
    }
}
