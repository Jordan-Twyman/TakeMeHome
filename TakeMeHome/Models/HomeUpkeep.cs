using System;
using System.Collections.Generic;

namespace TakeMeHome.Models
{
    public class HomeUpkeep
    {
        public int Id { get; set; }
        public DateTime ScheduleDate { get; set; }
        public int UpkeepId { get; set; }
        public Upkeep Upkeep { get; set; }
        public int HomeId { get; set; }
        public Home Home { get; set; }
        public int? Cost { get; set; }
        public int? Count { get; set; }

        

    }
}
