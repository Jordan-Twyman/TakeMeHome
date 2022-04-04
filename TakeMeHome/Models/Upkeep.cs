using System;

namespace TakeMeHome.Models
{
    public class Upkeep
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public DateTime Duration { get; set; }
        public int NumberOfMonths { get; set; }
        public int InventoryId { get; set; }
        public Inventory Inventory { get; set; }
    }
}
