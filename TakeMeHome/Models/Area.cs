namespace TakeMeHome.Models
{
    public class Area
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Dimensions { get; set; }
        public string PaintColor { get; set; }
        public int HomeId { get; set; }
        public Home Home    { get; set; }
    }
}
