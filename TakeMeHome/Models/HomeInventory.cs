using System;
using System.Collections.Generic;

namespace TakeMeHome.Models
{
    public class HomeInventory
    {
        public int Id { get; set; }
        public string Brand { get; set; }
        public string ModelNumber { get; set; }
        public DateTime PurchaseDate { get; set; }
        public int HomeId { get; set; }
        public Home Home { get; set; }
        public int InventoryId { get; set; }
        public Inventory Inventory { get; set; }

        public List <Upkeep> Upkeeps { get; set; }

    }
}
