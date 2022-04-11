using System.Collections.Generic;

namespace TakeMeHome.Models
{
    public class Month
    {
        public int Id { get; set; }  
        public int Name { get; set; }
        public int Year { get; set; }
     
        public List <HomeInventory> Inventory { get; set; }

       /* var GroupBy = upKeeps.GroupBy(u => new Month
        {
            Year = u.ScheduleDate.Year,
            Name = u.ScheduleDate.Month,
            Inventory = new List<HomeInventory>()
            {

            }
        }).Select(uk => uk.ToList()).ToList();*/
    }
}
