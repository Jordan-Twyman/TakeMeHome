using System.Collections.Generic;

namespace TakeMeHome.Models
{
    public class Month
    {
        public string Name { get; set; }
        public int Year { get; set; }
        public string ItemName { get; set; }
     
        public List <HomeUpkeep> Upkeeps { get; set; }
    }
}
