using System.Collections.Generic;

namespace TakeMeHome.Models
{
    public class Inventory
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int AreaId { get; set; }
        public Area Area { get; set; }

        public List<HomeUpkeep> Upkeeps { get; set; }

    }
}
