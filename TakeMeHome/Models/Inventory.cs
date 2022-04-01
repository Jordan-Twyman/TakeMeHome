namespace TakeMeHome.Models
{
    public class Inventory
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int Price { get; set; }
        public string Brand { get; set; }
        public bool Fixed { get; set; }

        public int Age { get; set; }
        public int AreaId { get; set; }
        public Area Area { get; set; }
    }
}
