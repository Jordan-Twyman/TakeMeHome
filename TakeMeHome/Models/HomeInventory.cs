namespace TakeMeHome.Models
{
    public class HomeInventory
    {
        public int Id { get; set; }
        public string Brand { get; set; }
        public int Count { get; set; }
        public int Age { get; set; }
        public int HomeId { get; set; }
        public Home Home { get; set; }
        public int InventoryId { get; set; }
        public Inventory Inventory { get; set; }

    }
}
