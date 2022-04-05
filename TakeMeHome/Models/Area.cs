using System.Collections.Generic;

namespace TakeMeHome.Models
{
    public class Area
    {
        public int Id { get; set; }
        public string Name { get; set; }

        public List <Inventory> InventoryItems { get; set; }
    }
}
