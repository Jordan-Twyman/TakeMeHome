using System;
using System.Collections.Generic;

namespace TakeMeHome.Models
{
    public class Home
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public DateTime ConstructedDate { get; set; }

        public List <HomeInventory> Inventory { get; set; }

    }
}
