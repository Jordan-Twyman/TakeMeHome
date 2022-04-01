using System;

namespace TakeMeHome.Models
{
    public class Task
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Details { get; set; }
        public DateTime Duration { get; set; }
        public int NumberOfMonths { get; set; }
        public DateTime TaskDate { get; set; }

        public int Cost     { get; set; }
        public int Count { get; set; }
        public int InventoryId { get; set; }
        public Inventory Inventory { get; set; }
    }
}
